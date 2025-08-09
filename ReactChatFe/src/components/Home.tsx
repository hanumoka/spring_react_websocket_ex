import { useAuthStore } from "../stores/authStore";

const Home = () => {
  const { isLoggedIn, user } = useAuthStore();
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        {isLoggedIn ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              안녕하세요, {user?.name}님! 👋
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              실시간 채팅 서비스에 로그인되었습니다. 다양한 기능을 이용해보세요.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/chat" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                채팅 시작하기
              </a>
              <a 
                href="/members" 
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                회원 목록 보기
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              실시간 채팅 서비스
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              WebSocket과 STOMP를 활용한 실시간 채팅 애플리케이션입니다.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                로그인하고 시작하기
              </a>
              <a 
                href="/about" 
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                더 알아보기
              </a>
            </div>
          </>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">실시간 채팅</h3>
          <p className="text-gray-600 text-sm">WebSocket 기술로 실시간 메시지 송수신</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">사용자 관리</h3>
          <p className="text-gray-600 text-sm">회원가입 및 로그인 시스템</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">채팅방 관리</h3>
          <p className="text-gray-600 text-sm">다양한 채팅방 생성 및 관리</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
