# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the React frontend (`ReactChatFe`) for a Spring Boot + React WebSocket chat application. It's part of a monorepo structure that includes:

- `ReactChatFe/` - React frontend (this directory)
- `SpringChatBe/` - Spring Boot backend 
- `docker/` - Database infrastructure (MySQL, Redis)

The application implements real-time chat functionality using WebSocket/STOMP protocols with JWT authentication.

## Development Commands

### Core Development
- `npm run dev` - Start Vite development server (default port 5173)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

### Code Quality
- `npx prettier --write .` - Format code (Prettier is installed as dependency)
- `npm run lint` - Check linting issues
- `npm run build` - Includes TypeScript type checking

## Architecture & Tech Stack

### Frontend Technologies
- **React 19** with TypeScript and Vite as build tool
- **Styling**: Tailwind CSS for utility-first styling
- **WebSocket Integration**: `socketjs-client` + `webstomp-client` for real-time chat
- **State Management**: Zustand for lightweight state management
- **HTTP Client**: Axios for API communication
- **Authentication**: JWT tokens with `jwt-decode`
- **Routing**: React Router DOM v7
- **UI Feedback**: React Hot Toast for notifications

### Project Structure
```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout wrapper with Header + Outlet
│   ├── Header.tsx      # Navigation header
│   └── [Page].tsx      # Route components (Home, About, Contact)
├── App.tsx             # Main app with routing setup
├── main.tsx            # React app entry point
└── *.css               # Styling files
```

### Backend Integration
- **API Base**: Spring Boot backend (typically localhost:8080)
- **Authentication**: JWT-based auth via `/members/doLogin` endpoint
- **WebSocket**: Real-time chat features using STOMP over WebSocket
- **Database**: Backend uses MySQL + Redis (via Docker)

## Development Workflow

### Local Development
1. Ensure backend infrastructure is running: `cd ../docker && docker-compose up -d`
2. Start backend: `cd ../SpringChatBe && ./gradlew bootRun`  
3. Start frontend: `npm run dev`

### Key Integration Points
- Backend API endpoints for member management and authentication
- WebSocket connection for real-time chat functionality
- JWT token handling for secure API requests
- CORS configuration between frontend (port 5173) and backend (port 8080)

## Component Architecture
- **Layout Pattern**: Uses React Router's `<Outlet>` pattern with shared Header
- **Route Structure**: Nested routing with Layout as wrapper component
- **State Management**: Zustand stores for application state (auth, chat, etc.)
- **Type Safety**: Full TypeScript implementation with strict type checking

## Testing & Quality
- ESLint configuration with React Hooks and TypeScript rules
- Prettier for consistent code formatting
- TypeScript strict mode for type safety
- Vite's fast HMR for development efficiency