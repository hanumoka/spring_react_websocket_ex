import { useAuthStore } from "../stores/authStore";

const Home = () => {
  const { isLoggedIn, user } = useAuthStore();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* 메인 컨텐츠 영역 */}
      <div className="lg:col-span-2 space-y-4">
        {/* 환영 메시지 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {isLoggedIn ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                안녕하세요, {user?.name}님! 👋
              </h1>
              <p className="text-gray-600 mb-4">
                실시간 채팅 서비스에 로그인되었습니다. 다양한 기능을 이용해보세요.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="/chat" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  채팅 시작하기
                </a>
                <a 
                  href="/members" 
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  회원 목록 보기
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                실시간 채팅 서비스
              </h1>
              <p className="text-gray-600 mb-4">
                WebSocket과 STOMP를 활용한 실시간 채팅 애플리케이션입니다.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  로그인하고 시작하기
                </a>
                <a 
                  href="/about" 
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  더 알아보기
                </a>
              </div>
            </>
          )}
        </div>

        {/* 최근 활동 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">홍</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">홍길동님이 채팅방에 참여했습니다</p>
                <p className="text-xs text-gray-500">5분 전</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">김</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">김철수님이 새 메시지를 보냈습니다</p>
                <p className="text-xs text-gray-500">10분 전</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">이</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">이영희님이 회원가입했습니다</p>
                <p className="text-xs text-gray-500">1시간 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사이드 정보 영역 */}
      <div className="space-y-4">
        {/* 서비스 기능 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">주요 기능</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">실시간 채팅</h3>
                <p className="text-xs text-gray-600">WebSocket 기반 실시간 메시징</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">회원 관리</h3>
                <p className="text-xs text-gray-600">사용자 인증 및 프로필 관리</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">채팅방 관리</h3>
                <p className="text-xs text-gray-600">다중 채팅방 생성 및 관리</p>
              </div>
            </div>
          </div>
        </div>

        {/* 온라인 사용자 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">온라인 사용자</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">홍</span>
              </div>
              <span className="text-sm text-gray-700">홍길동</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">김</span>
              </div>
              <span className="text-sm text-gray-700">김철수</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">이</span>
              </div>
              <span className="text-sm text-gray-700">이영희</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 시스템 상태 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">시스템 상태</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">서버 상태</span>
              <span className="text-sm font-medium text-green-600">정상</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">응답 시간</span>
              <span className="text-sm font-medium text-gray-900">12ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">활성 연결</span>
              <span className="text-sm font-medium text-gray-900">56</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;