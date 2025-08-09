package com.example.springchatbe.chat.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * /ws/connect로 웹소켓 연결요청이 들어왔을때 이를 처리할 클래스
 * <p>
 * 주요 역할
 * - 접근산 사용자의 목록을 메모리에 관리
 * - 사용자가 보낸 메시지를 다른 사용자에게 전달
 * - 접근이 끊어진 사용자의 목록에서 제거
 */
@Slf4j
@Component
public class SimpleWebSocketHandler extends TextWebSocketHandler {

    /**
     * 현재 연결된 웹소켓 세션들을 저장하는 Set
     * ConcurrentHashMap을 사용하여 스레드 안전하게 관리
     */
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    /**
     * 웹소켓 연결이 수립되었을 때 호출되는 메소드
     *
     * @param session 웹소켓 세션
     * @throws Exception 예외 발생 시
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        log.info("WebSocket connection established: {}", session.getId());
    }

    /**
     * 클라이언트로부터 텍스트 메시지를 수신했을 때 호출되는 메소드
     *
     * @param session 웹소켓 세션
     * @param message 수신한 텍스트 메시지
     * @throws Exception 예외 발생 시
     */
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("Received message: {}", payload);

        // 모든 연결된 세션에 메시지를 브로드캐스트
        for (WebSocketSession s : sessions) {
            if (s.isOpen() && !s.getId().equals(session.getId())) { // 자신에게는 보내지 않음
                s.sendMessage(new TextMessage(payload));
            }//if
        }//for
    }

    /**
     * 웹소켓 연결이 끊어졌을 때 호출되는 메소드
     *
     * @param session 웹소켓 세션
     * @param status  연결 종료 상태
     * @throws Exception 예외 발생 시
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        log.info("WebSocket connection closed: {}, status: {}", session.getId(), status);
    }

}
