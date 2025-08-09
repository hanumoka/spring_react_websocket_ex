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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              ChatApp
            </Link>
          </div>

          {/* 메인 네비게이션 */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              홈
            </Link>
            
            {isLoggedIn && (
              <>
                <Link 
                  to="/members" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  회원목록
                </Link>
                <Link 
                  to="/chatrooms" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  채팅방목록
                </Link>
                <Link 
                  to="/chat" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  채팅서비스
                </Link>
              </>
            )}
            
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
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
                    className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
                  >
                    <div className="hidden md:block text-right">
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="md:hidden px-4 py-2 border-b border-gray-100">
                        <div className="font-medium text-gray-900">{user?.name}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // 프로필 페이지로 이동 (추후 구현)
                          console.log('프로필 페이지로 이동');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        프로필 보기
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // 설정 페이지로 이동 (추후 구현)
                          console.log('설정 페이지로 이동');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        설정
                      </button>
                      
                      <hr className="my-1" />
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogoutClick();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              로그아웃 확인
            </h3>
            <p className="text-gray-600 mb-6">
              정말로 로그아웃하시겠습니까?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
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
