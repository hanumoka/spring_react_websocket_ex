import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "../stores/authStore";
import type { ChatMessageDto } from "../types/api";
import { getUserEmailFromToken } from "../utils/jwtUtils";

interface ChatMessage extends ChatMessageDto {
  sender: string; // sender를 필수로 만들고, 화면 표시용 추가 속성 확장 가능
}

const BasicStompChat = () => {
  const { token, isLoggedIn } = useAuthStore();
  const location = useLocation();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState("room1");
  const subscriptionRef = useRef<any>(null);

  // JWT 토큰에서 사용자 이메일(사용자명) 추출
  const username = token ? getUserEmailFromToken(token) : null;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 3;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 영구적 오류와 일시적 오류를 구분하는 함수
  const isPermanentError = (frame: {
    headers?: Record<string, string>;
  }): boolean => {
    const errorCode = frame.headers?.["error-code"];
    const errorMessage = frame.headers?.["message"] || "";

    // 영구적 오류 유형들
    const permanentErrorCodes = ["UNAUTHORIZED", "FORBIDDEN", "BAD_REQUEST"];
    const permanentErrorMessages = [
      "authentication",
      "authorization",
      "invalid token",
      "access denied",
    ];

    return (
      (errorCode && permanentErrorCodes.includes(errorCode)) ||
      permanentErrorMessages.some((msg) =>
        errorMessage.toLowerCase().includes(msg.toLowerCase())
      )
    );
  };

  // 오류 타입별 사용자 피드백 처리
  const handleStompError = (
    frame: { headers?: Record<string, string> },
    client: Client
  ) => {
    console.error("STOMP 오류:", frame);
    console.log("STOMP 오류 헤더:", frame.headers);

    const errorMessage = frame.headers?.["message"] || "";

    // 서버에서 오는 일반적인 오류 메시지 패턴 확인
    const isAuthError =
      errorMessage.toLowerCase().includes("authentication") ||
      errorMessage.toLowerCase().includes("unauthorized") ||
      errorMessage.toLowerCase().includes("token") ||
      errorMessage.toLowerCase().includes("login");

    const isForbiddenError =
      errorMessage.toLowerCase().includes("forbidden") ||
      errorMessage.toLowerCase().includes("access denied") ||
      errorMessage.toLowerCase().includes("permission");

    // 현재 받은 오류는 서버 내부 오류일 가능성이 높으므로 영구적 오류로 처리
    const isServerError =
      errorMessage.includes("ExecutorSubscribableChannel") ||
      errorMessage.includes("Failed to send message");

    if (
      isPermanentError(frame) ||
      isAuthError ||
      isForbiddenError ||
      isServerError
    ) {
      // 영구적 오류 - 재연결 중단
      client.reconnectDelay = 0;
      client.deactivate();
      setIsConnected(false);
      setStompClient(null);
      setReconnectAttempts(0);

      if (isAuthError) {
        toast.error("인증이 실패했습니다. 다시 로그인해주세요.");
        // 토큰 만료 시 로그아웃 처리
        const { logout } = useAuthStore.getState();
        logout();
      } else if (isForbiddenError) {
        toast.error("접근 권한이 없습니다. 관리자에게 문의하세요.");
      } else if (isServerError) {
        toast.error("서버 설정 오류입니다. 관리자에게 문의하세요.");
      } else {
        toast.error("연결이 거부되었습니다. 설정을 확인해주세요.");
      }
    } else {
      // 일시적 오류 - 제한된 재시도
      const currentAttempts = reconnectAttempts + 1;
      setReconnectAttempts(currentAttempts);

      if (currentAttempts >= maxReconnectAttempts) {
        client.reconnectDelay = 0;
        client.deactivate();
        setIsConnected(false);
        setStompClient(null);
        setReconnectAttempts(0);
        toast.error(
          `연결 시도 횟수(${maxReconnectAttempts}회)를 초과했습니다. 잠시 후 다시 시도해주세요.`
        );
      } else {
        toast.error(
          `연결에 실패했습니다. 재시도 중... (${currentAttempts}/${maxReconnectAttempts})`
        );
      }
    }
  };

  // STOMP 연결 정리 함수
  const cleanupConnection = (reason: string) => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
      console.log(`구독 취소됨 (${reason})`);
    }
    if (stompClient && isConnected) {
      stompClient.deactivate();
      console.log(`STOMP 연결 해제됨 (${reason})`);
    }
  };

  // 창/탭 닫을 때 및 페이지 이동 시 STOMP 연결 정리
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupConnection("beforeunload");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트 언마운트 시 연결 정리
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      cleanupConnection("컴포넌트 언마운트");
    };
  }, [stompClient, isConnected]);

  // 라우트 변경 시 STOMP 연결 정리
  useEffect(() => {
    return () => {
      cleanupConnection("라우트 변경");
    };
  }, [location.pathname]);

  const connectToStompServer = () => {
    if (!isLoggedIn || !token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (!username) {
      toast.error("사용자 정보를 가져올 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (!roomId.trim()) {
      toast.error("채팅방 ID를 입력해주세요.");
      return;
    }

    try {
      // 최신 @stomp/stompjs 라이브러리 사용
      const client = new Client({
        webSocketFactory: () => {
          console.log("🔗 SockJS 연결 시도 중...");
          const sockjs = new SockJS("http://localhost:8080/ws/stomp");

          sockjs.onopen = () => console.log("✅ SockJS 연결 성공");
          sockjs.onclose = (e) => console.log("❌ SockJS 연결 종료:", e);
          sockjs.onerror = (e) => console.error("🚨 SockJS 오류:", e);

          return sockjs;
        },
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log("📨 STOMP Debug:", str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame) => {
          console.log("STOMP 연결 성공:", frame);
          setIsConnected(true);
          setStompClient(client);
          setReconnectAttempts(0); // 성공 시 재연결 카운터 리셋
          toast.success(`채팅방 '${roomId}'에 연결되었습니다!`);

          // 채팅방 구독
          subscriptionRef.current = client.subscribe(`/topic/${roomId}`, (message) => {
            try {
              const receivedMessage: ChatMessage = JSON.parse(message.body);
              console.log("메시지 수신:", receivedMessage);

              // 받은 메시지를 화면에 추가 (내가 보낸 메시지가 아닌 경우)
              if (receivedMessage.sender !== username) {
                setMessages((prev) => [...prev, receivedMessage]);
              }
            } catch (error) {
              console.error("메시지 파싱 오류:", error);
              // JSON이 아닌 경우 단순 텍스트로 처리
              const messageData: ChatMessage = {
                message: message.body,
                timestamp: new Date().toISOString(),
                sender: "unknown",
              };
              setMessages((prev) => [...prev, messageData]);
            }
          });

          // 입장 메시지 전송 (로컬 표시용)
          const joinMessage: ChatMessage = {
            message: `${username}님이 입장했습니다.`,
            timestamp: new Date().toISOString(),
            sender: "system",
          };
          setMessages((prev) => [...prev, joinMessage]);
        },
        onStompError: (frame) => {
          handleStompError(frame, client);
        },
        onWebSocketError: (error) => {
          console.error("WebSocket 오류:", error);
          toast.error("WebSocket 연결에 실패했습니다.");
        },
      });

      // STOMP 연결 활성화
      client.activate();
    } catch (error) {
      console.error("STOMP 연결 실패:", error);
      toast.error("STOMP 연결에 실패했습니다.");
    }
  };

  const disconnectFromStompServer = () => {
    cleanupConnection("수동 연결 해제");
    setStompClient(null);
    setIsConnected(false);
    setMessages([]);
    toast.success("채팅방에서 나갔습니다.");
  };

  const sendMessage = () => {
    if (!stompClient || !isConnected) {
      toast.error("먼저 채팅방에 연결해주세요.");
      return;
    }

    if (!inputMessage.trim()) {
      toast.error("메시지를 입력해주세요.");
      return;
    }

    try {
      // 백엔드 DTO 형식에 맞춘 메시지 데이터
      const chatMessageDto: ChatMessageDto = {
        message: inputMessage,
        sender: username,
        timestamp: new Date().toISOString(),
      };

      // STOMP로 메시지 발행 (백엔드 ChatMessageReqDto 형식)
      stompClient.publish({
        destination: `/publish/${roomId}`,
        body: JSON.stringify(chatMessageDto),
      });

      // 내가 보낸 메시지를 화면에 추가 (표시용)
      const displayMessage: ChatMessage = { ...chatMessageDto, sender: "me" };
      setMessages((prev) => [...prev, displayMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      toast.error("메시지 전송에 실패했습니다.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">기본 STOMP 채팅</h1>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              isConnected
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isConnected ? "연결됨" : "연결 안됨"}
          </span>
          {isConnected && (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              방: {roomId}
            </span>
          )}
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>사용자:</strong> {username || "로그인 정보 없음"}
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                채팅방 ID
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="채팅방 ID를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && connectToStompServer()}
              />
            </div>
          </div>
          <button
            onClick={connectToStompServer}
            disabled={!username}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              username
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            채팅방 입장
          </button>
          <div className="mt-4 text-sm text-gray-500">
            <p>STOMP 프로토콜을 사용한 실시간 채팅</p>
            <p>로그인한 사용자만 채팅에 참여할 수 있습니다</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-96">
          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-4 mb-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                메시지가 없습니다. 첫 번째 메시지를 보내보세요!
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "me"
                          ? "bg-blue-600 text-white"
                          : msg.sender === "system"
                            ? "bg-gray-300 text-gray-700 text-sm"
                            : "bg-white border border-gray-300 text-gray-900"
                      }`}
                    >
                      {msg.sender !== "me" && msg.sender !== "system" && (
                        <div className="text-xs text-gray-500 mb-1">
                          {msg.sender}
                        </div>
                      )}
                      <div className="break-words">{msg.message}</div>
                      <div
                        className={`text-xs mt-1 ${
                          msg.sender === "me"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* 메시지 입력 영역 */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              전송
            </button>
            <button
              onClick={disconnectFromStompServer}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              나가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicStompChat;
