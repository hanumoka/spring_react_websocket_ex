import api from "./api";
import type {
  MemberSaveReqDto,
  MemberLoginReqDto,
  LoginResponse,
  MemberListResDto,
} from "../types/api";

export const memberService = {
  // 회원가입
  register: async (memberData: MemberSaveReqDto): Promise<number> => {
    const response = await api.post<number>("/members/create", memberData);
    return response.data;
  },

  // 로그인
  login: async (loginData: MemberLoginReqDto): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/members/doLogin",
      loginData
    );
    return response.data;
  },

  // 회원 목록 조회 (인증 필요)
  getMemberList: async (): Promise<MemberListResDto[]> => {
    const response = await api.get<MemberListResDto[]>("/members/list");
    return response.data;
  },
};

export default memberService;

