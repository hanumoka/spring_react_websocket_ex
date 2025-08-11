package com.example.springchatbe.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@EnableWebSocketMessageBroker // Enable STOMP over WebSocket
@Configuration
public class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;

    public StompWebSocketConfig(StompHandler stompHandler) {
        this.stompHandler = stompHandler;
    }

    /**
     * STOMP 엔드포인트 설정
     * - /ws/stomp로 접속할 수 있다.
     * - SockJS를 사용하여 ws://가 아닌 http://로 연결할 수 있도록 한다.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/stomp")
                .setAllowedOriginPatterns("http://localhost:*") // 개발 환경에서 유연한 포트 허용
                .setAllowedOrigins("http://localhost:3000", "http://localhost:5173") // React 개발 서버 포트들
                .withSockJS() // ws://가 아닌 http://로 연결할 수 있도록 SockJS를 사용 (frontend에서도 sockjs-client 사용)
                .setSessionCookieNeeded(false); // 세션 쿠키 불필요
    }

    /**
     * 메세지 브로커 설정
     * - /publish로 시작하는 메세지를 발행할 수 있다.
     * - /topic으로 시작하는 메세지를 구독할 수 있다.
     *
     * - /publish로 시작하는 url 패턴으로 메세지를 발생되면 @Controller에서 @MessageMapping 어노테이션을 사용하여 메세지를 처리할 수 있다.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/publish");  // 메세지 발행규칙 설정, /publish로 시작하을 해야지 메세지가 발행 된다. ex) /publish/chat, /publish/1

        registry.enableSimpleBroker("/topic");  //메세지 구독 규칙 설정, /topic으로 시작하는 메세지를 구독할 수 있다. ex) /topic/chat, /topic/1

    }
    @Override

    /**
     * 클라이언트로부터 들어오는 메세지를 처리할 때 필요한 설정
     *
     * Stomp 모든 명령어에는(connect, subscribe, disconnect 특정 시점) 요청시에는 http header등 http메세지를 넣어올수 있고,
     * 이를 interceptor를 통해 가로체 토큰등을 검증 할수 있다.
     *
     * 사용자 -> filter -> config -> interceptor -> handler 이 흐름에서 interceptor를 사용하여 인가된 사용자만 커넥션을 생성, 메세지 송수신 가능하도록 설정할 수 있다.
     */
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // 클라이언트로부터 들어오는 메세지를 처리할 때 필요한 설정을 여기에 추가할 수 있습니다.
        // 예를 들어, 인증이나 권한 검사를 위한 핸들러를 추가할 수 있습니다.
         registration.interceptors(stompHandler);
    }

}
