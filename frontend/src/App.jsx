import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router';
import ChatPage from './pages/ChatPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import PageLoader from './components/PageLoader.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.2),transparent_35%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/5 blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-7xl rounded-[32px] border border-white/10 bg-slate-950/70 p-2 shadow-[0_40px_120px_-40px_rgba(2,132,199,0.75)] backdrop-blur-2xl sm:p-3">
          <div className="min-h-[calc(100vh-1rem)] overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/55 shadow-inner shadow-slate-900/60 sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)]">
            <Routes>
              <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
              <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'rounded-2xl border border-white/10 bg-slate-900/90 text-slate-100 shadow-xl',
          duration: 4000,
        }}
      />
    </div>
  )
}

export default App