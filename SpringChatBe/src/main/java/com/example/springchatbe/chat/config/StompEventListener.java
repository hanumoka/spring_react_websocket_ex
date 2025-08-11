package com.example.springchatbe.chat.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * StompEventListener는 STOMP 이벤트를 처리하는 리스너 클래스입니다.(디버그 용)
 * 스프링와 stomp는 기본적으로 세션관리를 자동(내부적)으로 처리
 * 연결/해제 이벤트를 기록, 연결된 세션수를 실시간으로 학인할 목적으로이벤트 리스너를 생성 => 로그, 디버깅 목적
 */
@Slf4j
@Component
public class StompEventListener {
    private final Set<String> sessions = ConcurrentHashMap.newKeySet(); // 디버깅 목적의 세션 관리

    @EventListener
    public void connectHandle(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        sessions.add(accessor.getSessionId());
        log.info("connect session id: {}", accessor.getSessionId());
        log.info("total connected sessions: {}", sessions.size());
    }

    @EventListener
    public void disConnectHandler(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        sessions.remove(accessor.getSessionId());
        log.info("disconnect session id: {}", accessor.getSessionId());
        log.info("total connected sessions: {}", sessions.size());
    }
}
