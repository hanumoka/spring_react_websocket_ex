import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string; // subject (email)
  iat?: number; // issued at
  exp?: number; // expiration
  [key: string]: any; // 기타 클레임들
}

/**
 * JWT 토큰에서 사용자 이메일(sub)을 추출
 * @param token JWT 토큰
 * @returns 사용자 이메일 또는 null
 */
export const getUserEmailFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub || null;
  } catch (error) {
    console.error('JWT 토큰 디코딩 실패:', error);
    return null;
  }
};

/**
 * JWT 토큰이 만료되었는지 확인
 * @param token JWT 토큰
 * @returns 만료 여부
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('JWT 토큰 만료 확인 실패:', error);
    return true;
  }
};

/**
 * JWT 토큰에서 전체 페이로드를 추출
 * @param token JWT 토큰
 * @returns JWT 페이로드 또는 null
 */
export const getTokenPayload = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('JWT 토큰 페이로드 추출 실패:', error);
    return null;
  }
};