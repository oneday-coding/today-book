import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 쿼리 클라이언트 생성
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 쿼리 클라이언트 제공 컴포넌트 */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
