import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface AuthState {
  // 상태
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;

  // 액션
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;

  // 초기화
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isLoggedIn: false,
      user: null,
      token: null,

      // 로그인
      login: (token: string, user: User) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
        set({
          isLoggedIn: true,
          user,
          token,
        });
      },

      // 로그아웃 (Stateless 서버용 - 클라이언트에서만 토큰 제거)
      logout: () => {
        // 모든 인증 관련 데이터 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("auth-storage"); // Zustand persist 데이터도 제거

        // 상태 초기화
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        });

        console.log(
          "로그아웃 완료: 모든 토큰 및 사용자 정보가 제거되었습니다."
        );
      },

      // 사용자 정보 설정
      setUser: (user: User) => {
        localStorage.setItem("userInfo", JSON.stringify(user));
        set({ user });
      },

      // 앱 시작 시 localStorage에서 인증 정보 복원
      initialize: () => {
        const token = localStorage.getItem("accessToken");
        const userInfo = localStorage.getItem("userInfo");

        if (token && userInfo) {
          try {
            const user = JSON.parse(userInfo) as User;
            set({
              isLoggedIn: true,
              user,
              token,
            });
          } catch (error) {
            // 파싱 오류 시 로그아웃 처리
            console.error("Failed to parse user info:", error);
            get().logout();
          }
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        // persist할 상태만 선택 (token과 user는 localStorage에서 직접 관리)
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
