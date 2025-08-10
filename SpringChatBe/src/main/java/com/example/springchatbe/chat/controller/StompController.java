package com.example.springchatbe.chat.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class StompController {

    /**
     * StompWebSocketConfig.configureMessageBroker 설정 기반으로
     * /publish/{roomId}로 시작하는 메세지를 처리하는 메소드
     *
     * @DestinationVariable : @MessageMapping 어노테이션으로 정의된 Websocket Controller 내에서만 사용된다.
     * @SendTo("/topic/{roomId}") : 메세지를 구독하는 클라이언트에게 전송할 때 사용된다.
     *
     * 흐름도
     * 1. 클라이언트가 /ws/stomp로 연결한다. StompWebSocketConfig.registerStompEndpoints
     * 2. 클라이언트가 /publish/{roomId}로 메세지 를 보낸다. StompWebSocketConfig.configureMessageBroker
     * 3. StompController.handleMessage 메소드가 호출된다.
     * 4. 메세지를 처리하고, /topic/{roomId}로 구독한 클라이언트에게 메세지를 전송한다.
     * 5. 클라이언트는 /topic/{roomId}로 전송된 메세지를 수신한다
     */

    @MessageMapping("/{roomId}")
    @SendTo("/topic/{roomId}") // Sends the message to all subscribers of the topic
    public String handleMessage(@DestinationVariable String roomId, String message) {
        System.out.println("Received message: " + message);
        return message;
    }
}
