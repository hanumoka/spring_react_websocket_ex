package com.example.springchatbe.common;

import lombok.Getter;

@Getter
public class BizRuntimeException extends RuntimeException {
    private final String errorCode;
    private final String errorMessage;


    public BizRuntimeException(String errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
