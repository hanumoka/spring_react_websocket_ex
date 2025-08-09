import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface ChatMessage {
  message: string;
  timestamp: string;
  sender?: string;
}

const BasicWebSocketChat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToWebSocket = () => {
    if (!username.trim()) {
      toast.error("사용자명을 입력해주세요.");
      return;
    }

    try {
      const ws = new WebSocket("ws://localhost:8080/ws/connect");
      
      ws.onopen = () => {
        console.log("WebSocket 연결됨");
        setIsConnected(true);
        setSocket(ws);
        toast.success("채팅방에 연결되었습니다!");
        
        // 연결 후 입장 메시지 전송
        const joinMessage = {
          message: `${username}님이 입장했습니다.`,
          timestamp: new Date().toISOString(),
          sender: "system"
        };
        setMessages(prev => [...prev, joinMessage]);
      };

      ws.onmessage = (event) => {
        try {
          const messageData = JSON.parse(event.data);
          setMessages(prev => [...prev, messageData]);
        } catch (error) {
          // JSON이 아닌 경우 단순 텍스트로 처리
          const messageData: ChatMessage = {
            message: event.data,
            timestamp: new Date().toISOString(),
            sender: "unknown"
          };
          setMessages(prev => [...prev, messageData]);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket 연결 종료됨");
        setIsConnected(false);
        setSocket(null);
        toast.error("채팅방 연결이 끊어졌습니다.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket 오류:", error);
        toast.error("연결 중 오류가 발생했습니다.");
      };

    } catch (error) {
      console.error("WebSocket 연결 실패:", error);
      toast.error("WebSocket 연결에 실패했습니다.");
    }
  };

  const disconnectFromWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
      setMessages([]);
      toast.success("채팅방에서 나갔습니다.");
    }
  };

  const sendMessage = () => {
    if (!socket || !isConnected) {
      toast.error("먼저 채팅방에 연결해주세요.");
      return;
    }

    if (!inputMessage.trim()) {
      toast.error("메시지를 입력해주세요.");
      return;
    }

    try {
      const messageData: ChatMessage = {
        message: inputMessage,
        timestamp: new Date().toISOString(),
        sender: username
      };

      // WebSocket으로 메시지 전송
      socket.send(JSON.stringify(messageData));
      
      // 내가 보낸 메시지를 화면에 추가
      setMessages(prev => [...prev, { ...messageData, sender: "me" }]);
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
        <h1 className="text-xl font-bold text-gray-900">기본 WebSocket 채팅</h1>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isConnected ? '연결됨' : '연결 안됨'}
          </span>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사용자명
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="사용자명을 입력하세요"
              className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && connectToWebSocket()}
            />
          </div>
          <button
            onClick={connectToWebSocket}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors"
          >
            채팅방 입장
          </button>
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
                      <div className={`text-xs mt-1 ${
                        msg.sender === "me" ? "text-blue-100" : "text-gray-400"
                      }`}>
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
              onClick={disconnectFromWebSocket}
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

export default BasicWebSocketChat;