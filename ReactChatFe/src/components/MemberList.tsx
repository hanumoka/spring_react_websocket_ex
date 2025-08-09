import { useEffect, useState } from "react";
import { memberService } from "../services/memberService";
import type { MemberListResDto } from "../types/api";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";

const MemberList = () => {
  const { isLoggedIn } = useAuthStore();
  const [members, setMembers] = useState<MemberListResDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMembers();
    }
  }, [isLoggedIn]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const memberList = await memberService.getMemberList();
      setMembers(memberList);
    } catch (error: any) {
      console.error("회원 목록 조회 오류:", error);
      if (error.response?.status === 401) {
        toast.error("로그인이 필요합니다.");
      } else {
        toast.error("회원 목록을 불러오는 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl transform rotate-1"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">회원 목록</h1>
          <p className="text-gray-600 mb-8">로그인 후 이용 가능합니다.</p>
          <a
            href="/login"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            로그인하기
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 rounded-2xl transform -rotate-1"></div>
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">회원 목록</h1>
            <p className="text-gray-600">등록된 회원들을 확인할 수 있습니다</p>
          </div>
          <button
            onClick={fetchMembers}
            disabled={isLoading}
            className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="flex items-center">
              {isLoading ? "새로고침 중..." : "새로고침"}
              {!isLoading && (
                <svg className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
              <svg
                className="animate-spin h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium">회원 정보를 불러오는 중...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-2">등록된 회원이 없습니다</p>
            <p className="text-gray-600">아직 가입한 회원이 없어요.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={member.id} className="group relative">
                <div className={`absolute inset-0 rounded-xl transform transition-transform duration-300 group-hover:rotate-1 ${
                  index % 3 === 0 ? 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10' :
                  index % 3 === 1 ? 'bg-gradient-to-r from-purple-600/10 to-pink-600/10' :
                  'bg-gradient-to-r from-green-600/10 to-emerald-600/10'
                }`}></div>
                <div className="relative bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{member.email}</p>
                      <p className="text-xs text-gray-400">ID: {member.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;
