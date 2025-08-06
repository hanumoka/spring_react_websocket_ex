# Spring React WebSocket 채팅 예제

실시간 채팅 애플리케이션 (Spring Boot + React + WebSocket)

## 프로젝트 구조

```
spring_react_websocket/
├── ReactChatFe/          # React Frontend (Vite + TypeScript)
├── SpringChatBe/         # Spring Boot Backend
├── docker/               # Docker 설정 파일들
└── README.md
```

## 시작하기

### 필수 요구사항
- Node.js 18+
- Java 17+
- Docker & Docker Compose

### 데이터베이스 설정
```sql
create database chatdb;
```

### 개발 환경 실행

1. **백엔드 실행**
   ```bash
   cd SpringChatBe
   ./gradlew bootRun
   ```

2. **프론트엔드 실행**
   ```bash
   cd ReactChatFe
   npm install
   npm run dev
   ```

3. **Docker로 실행**
   ```bash
   cd docker
   docker-compose up -d
   ```

## 기술 스택

### Frontend
- React 19
- TypeScript
- Vite
- WebSocket/Socket.IO

### Backend
- Spring Boot
- Spring WebSocket
- MySQL
- Gradle

### DevOps
- Docker
- Docker Compose