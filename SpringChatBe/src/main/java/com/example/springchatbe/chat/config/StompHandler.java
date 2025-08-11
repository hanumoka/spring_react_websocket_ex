package com.example.springchatbe.chat.config;


import com.example.springchatbe.common.BizRuntimeException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;

@Slf4j
@Component
public class StompHandler implements ChannelInterceptor {

    @Value("${jwt.secretKey}")
    private String secretKey;

    /**
     * 메세지를 처리하기 전에 호출되는 메소드
     * - Stomp 의 모든 명령어 요청에 대해 호출된다.
     *
     * @param message
     * @param channel
     * @return
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        final StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);


        if (StompCommand.CONNECT == accessor.getCommand()) {
            log.info("stomp connect 요청시 토큰 유효성 검증");
            String bearerToken = accessor.getFirstNativeHeader("Authorization");

            if(bearerToken == null || !bearerToken.startsWith("Bearer ")) {
                log.error("Authorization 헤더가 없거나 Bearer 형식이 아닙니다.");
                throw new BizRuntimeException("UNAUTHORIZED", "Invalid authentication token");
            }

            String jwtToken = bearerToken.substring(7);

            // 토큰 유효성 검증 로직 추가
            byte[] keyBytes = Base64.getDecoder().decode(secretKey);
            SecretKey key = Keys.hmacShaKeyFor(keyBytes);
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();

            log.info("토큰 유효성 검증 성공, 사용자 ID: {}", claims.getSubject());
        } //if

        return message;
    }


}
