package com.example.springchatbe.chat.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final SimpleWebSocketHandler simpleWebSocketHandler;

    public WebSocketConfig(SimpleWebSocketHandler simpleWebSocketHandler) {
        this.simpleWebSocketHandler = simpleWebSocketHandler;
    }

    /**
     * 웹소켓 핸들러를 등록하는 메소드
     *
     * 웹 소켓요청은 http 요청이 아니므로 jwt 인증을 하지 앟음(filter 에서 제외 처리 필요) (filter를 거치기는 한다.)
     * 웹 소켓요청은 http 요청이 아니므로 별도의 cors 설정을 해줘야 한다.
     *
     * @param registry
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // connect url로 websocket 연결요청이 들어오면, 헨들러 클래스가 처리
        registry.addHandler(simpleWebSocketHandler, "/ws/connect")
                .setAllowedOrigins("http://localhost:3000", "http://localhost:5173"); // STOMP와 동일한 CORS 설정
    }

}
