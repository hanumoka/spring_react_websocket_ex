import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, user } = useAuthStore();
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 via-slate-50/30 to-slate-100/50 dark:from-slate-800/50 dark:via-slate-700/30 dark:to-slate-800/50 rounded-2xl"></div>
        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl py-20 px-16 text-center">
          {isLoggedIn ? (
            <>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                온라인
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                안녕하세요, {user?.name}님! 👋
              </h1>
              <p className="text-2xl text-slate-600 dark:text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed">
                실시간 채팅 서비스에 로그인되었습니다. 
                <br className="hidden sm:block" />
                다양한 기능을 이용해보세요.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  to="/chat" 
                  className="group bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center">
                    채팅 시작하기
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  to="/members" 
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-200 backdrop-blur-sm"
                >
                  회원 목록 보기
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-300 text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                실시간 연결
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                실시간 채팅
                <br />
                <span className="text-5xl lg:text-7xl text-slate-700 dark:text-slate-300">서비스</span>
              </h1>
              <p className="text-2xl text-slate-600 dark:text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed">
                WebSocket과 STOMP를 활용한 
                <span className="font-semibold text-slate-900 dark:text-white"> 최신 기술</span>의 실시간 채팅 애플리케이션입니다.
                <br className="hidden sm:block" />
                빠르고 안정적인 메시징 경험을 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  to="/login" 
                  className="group bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center">
                    로그인하고 시작하기
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  to="/about" 
                  className="border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-200 backdrop-blur-sm"
                >
                  더 알아보기
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          강력한 기능들
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          최신 웹 기술로 구현된 안정적이고 빠른 채팅 서비스
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-slate-300/20 dark:from-slate-700/30 dark:to-slate-800/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-10 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
            <div className="w-20 h-20 bg-slate-600 dark:bg-slate-300 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white dark:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">실시간 채팅</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">WebSocket 기술로 지연 없는 실시간 메시지 송수신을 제공합니다</p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-slate-300/20 dark:from-slate-700/30 dark:to-slate-800/20 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-10 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
            <div className="w-20 h-20 bg-slate-600 dark:bg-slate-300 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white dark:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">사용자 관리</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">안전한 JWT 인증과 권한 관리 시스템으로 보안을 보장합니다</p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-slate-300/20 dark:from-slate-700/30 dark:to-slate-800/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-10 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
            <div className="w-20 h-20 bg-slate-600 dark:bg-slate-300 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white dark:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">채팅방 관리</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">유연한 채팅방 생성과 관리로 다양한 그룹 대화를 지원합니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
