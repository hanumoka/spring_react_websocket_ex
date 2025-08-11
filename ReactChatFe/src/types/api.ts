// 사용자 정보 타입은 user.ts에서 import
export type { User } from "./user";

// 회원가입 요청 타입
export interface MemberSaveReqDto {
  name: string;
  email: string;
  password: string;
}

// 로그인 요청 타입
export interface MemberLoginReqDto {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  id: number;
  token: string;
}

// 회원 목록 응답 타입
export interface MemberListResDto {
  id: number;
  name: string;
  email: string;
}

// 채팅 메시지 요청/응답 타입 (백엔드 ChatMessageReqDto와 일치)
export interface ChatMessageDto {
  message: string;
  sender: string;
  timestamp: string; // LocalDateTime는 ISO string으로 변환
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
