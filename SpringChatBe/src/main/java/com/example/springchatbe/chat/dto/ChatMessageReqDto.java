package com.example.springchatbe.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatMessageReqDto {
    private String message;
    private String sender;
    private LocalDateTime timestamp;
}
