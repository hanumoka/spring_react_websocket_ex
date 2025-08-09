const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">About ChatApp</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 개요</h2>
          <p className="text-gray-600 mb-4">
            ChatApp은 WebSocket과 STOMP 프로토콜을 활용한 실시간 채팅 애플리케이션입니다.
            Spring Boot와 React를 사용하여 안정적이고 확장 가능한 채팅 서비스를 제공합니다.
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-2">주요 특징</h3>
          <ul className="text-gray-600 space-y-1 text-sm">
            <li>• 실시간 메시지 송수신</li>
            <li>• JWT 기반 인증 시스템</li>
            <li>• 다중 채팅방 지원</li>
            <li>• 반응형 웹 디자인</li>
            <li>• REST API와 WebSocket 통합</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">기술 스택</h2>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React 19</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Vite</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Tailwind CSS</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Zustand</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Axios</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Spring Boot</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">WebSocket</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">STOMP</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">JWT</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">MySQL</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Redis</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">인프라</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Docker</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Docker Compose</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">실시간</div>
            <div className="text-sm text-gray-600">WebSocket 통신</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">안전</div>
            <div className="text-sm text-gray-600">JWT 인증</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">확장성</div>
            <div className="text-sm text-gray-600">마이크로서비스 지원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;