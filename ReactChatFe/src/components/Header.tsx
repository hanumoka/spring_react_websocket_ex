import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    toast.success("로그아웃되었습니다.");
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // 외부 클릭 시 사용자 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-3xl font-bold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
            >
              ChatApp
            </Link>
          </div>

          {/* 메인 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              홈
            </Link>
            
            {isLoggedIn && (
              <>
                <Link 
                  to="/members" 
                  className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  회원목록
                </Link>
                <Link 
                  to="/chatrooms" 
                  className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  채팅방목록
                </Link>
                <Link 
                  to="/chat" 
                  className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  채팅서비스
                </Link>
              </>
            )}
            
            <Link 
              to="/about" 
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About
            </Link>
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 px-6 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  회원가입
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* 사용자 정보 및 드롭다운 메뉴 */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <div className="hidden md:block text-right">
                      <div className="font-medium text-slate-900 dark:text-white">{user?.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</div>
                    </div>
                    <div className="w-8 h-8 bg-slate-600 dark:bg-slate-300 rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-slate-900 text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
                      <div className="md:hidden px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                        <div className="font-medium text-slate-900 dark:text-white">{user?.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // 프로필 페이지로 이동 (추후 구현)
                          console.log('프로필 페이지로 이동');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        프로필 보기
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // 설정 페이지로 이동 (추후 구현)
                          console.log('설정 페이지로 이동');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        설정
                      </button>
                      
                      <hr className="my-1 border-slate-200 dark:border-slate-600" />
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogoutClick();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              onClick={() => {
                console.log("모바일 메뉴 토글");
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 로그아웃 확인 모달 */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm w-full mx-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
              로그아웃 확인
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              정말로 로그아웃하시겠습니까?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
