import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import './index.css'
import App from './App.tsx'

// 앱 시작 시 인증 상태 초기화
useAuthStore.getState().initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#10b981',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#ef4444',
          },
        },
      }}
    />
  </StrictMode>,
)
