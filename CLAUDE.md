# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real-time chat application built with Spring Boot + React + WebSocket. The project is organized as a monorepo with two main applications:

- `SpringChatBe/` - Spring Boot backend with WebSocket support
- `ReactChatFe/` - React frontend with TypeScript and Vite
- `docker/` - Database infrastructure (MySQL, Redis)

## Development Commands

### Backend (SpringChatBe/)
- `./gradlew bootRun` - Start Spring Boot application (port 8080)
- `./gradlew build` - Build the application
- `./gradlew test` - Run unit tests
- `./gradlew clean` - Clean build artifacts

### Frontend (ReactChatFe/)
- `npm run dev` - Start Vite development server (port 5173)
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build
- `npx prettier --write .` - Format code with Prettier

### Infrastructure (docker/)
- `docker-compose up -d` - Start MySQL (port 53306) and Redis (port 56379)
- `docker-compose down` - Stop all services
- `docker-compose logs -f [service]` - View logs for specific service

## Architecture Overview

### Backend Architecture
- **Framework**: Spring Boot 3.5.4 with Java 21
- **WebSocket**: STOMP over WebSocket for real-time messaging
  - Connection endpoint: `/ws/stomp` with SockJS fallback
  - Publish prefix: `/publish` (handled by controllers)  
  - Subscribe prefix: `/topic` (message broker destinations)
- **Database**: MySQL 8.0 with JPA/Hibernate
- **Authentication**: JWT-based auth with custom security configuration
- **Key Dependencies**: Spring Security, Spring WebSocket, MySQL Connector, JWT (io.jsonwebtoken)

### Frontend Architecture
- **Framework**: React 19 with TypeScript, built with Vite
- **WebSocket Client**: `socketjs-client` + `webstomp-client` for STOMP protocol
- **State Management**: Zustand for lightweight state management
- **Styling**: Tailwind CSS for utility-first styling
- **HTTP Client**: Axios for REST API calls
- **Routing**: React Router DOM v7 with layout pattern

### Database Configuration
- **MySQL**: Accessible on localhost:53306 (mapped from container port 3306)
- **Redis**: Accessible on localhost:56379 (mapped from container port 6379)
- **Database**: `chatserver` with auto DDL generation
- **Connection**: Spring Boot connects using custom port configuration

## Key Integration Points

### WebSocket Communication Flow
1. Frontend connects to `/ws/stomp` endpoint with SockJS
2. Messages published to `/publish/*` are handled by Spring controllers with `@MessageMapping`
3. Responses are sent to `/topic/*` destinations that clients can subscribe to
4. STOMP configuration allows seamless bi-directional real-time communication

### Authentication Flow
- JWT tokens issued via `/members/doLogin` endpoint
- Frontend stores JWT and includes in API requests
- Backend validates JWT using custom `JwtTokenProvider` and `JwtAuthFilter`
- Token expiration set to 5 minutes (3000 seconds in config)

### Development Setup Dependencies
1. **Database Infrastructure**: Must run `docker-compose up -d` first
2. **Backend**: Requires database to be running before starting with `./gradlew bootRun`
3. **Frontend**: Can run independently but needs backend for full functionality

## Package Structure

### Backend (`SpringChatBe/src/main/java/com/example/springchatbe/`)
```
├── chat/
│   ├── config/          # WebSocket configurations (STOMP, handlers)
│   └── controller/      # Chat-related REST and WebSocket controllers
├── member/
│   ├── domain/          # JPA entities (Member, ROLE)
│   ├── dto/             # Request/response DTOs
│   ├── repository/      # Data access layer
│   └── service/         # Business logic
└── common/
    ├── auth/            # JWT authentication components
    └── config/          # Security configuration
```

### Frontend (`ReactChatFe/src/`)
```
├── components/          # React components
│   ├── Layout.tsx      # Main layout with Header + Outlet pattern
│   ├── *Chat*.tsx      # Chat-related components
│   └── [Page].tsx      # Route components
├── services/           # API service layers
├── stores/             # Zustand state management
└── types/              # TypeScript type definitions
```

## Critical Configuration Notes

- **CORS**: Backend allows all origins in development (`setAllowedOrigins("**")`)
- **JWT Secret**: Configured in `application.yaml` (should be environment-specific in production)
- **Database Ports**: Custom ports to avoid conflicts (MySQL: 53306, Redis: 56379)
- **WebSocket Origin Policy**: Currently permissive for development, needs production hardening