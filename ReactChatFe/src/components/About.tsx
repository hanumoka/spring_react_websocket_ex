const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About ChatApp</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          ChatApp은 WebSocket과 STOMP 프로토콜을 활용한 실시간 채팅 애플리케이션입니다.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">기술 스택</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Frontend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• React 19 + TypeScript</li>
              <li>• Vite 빌드 시스템</li>
              <li>• Tailwind CSS</li>
              <li>• React Router DOM</li>
              <li>• Zustand (상태 관리)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Backend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Spring Boot</li>
              <li>• WebSocket + STOMP</li>
              <li>• MySQL Database</li>
              <li>• Redis Cache</li>
              <li>• JWT Authentication</li>
            </ul>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">주요 기능</h2>
        <ul className="text-gray-600 space-y-2">
          <li>• 실시간 메시지 송수신</li>
          <li>• 사용자 인증 및 권한 관리</li>
          <li>• 다중 채팅방 지원</li>
          <li>• 회원 관리 시스템</li>
          <li>• 반응형 웹 디자인</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
