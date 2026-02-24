import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { Navigate } from 'react-router';
import PageLoader from './components/PageLoader.jsx';
import {Toaster} from "react-hot-toast"

function App() {
  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth) return <PageLoader/>

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden'>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e920_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e920_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
        <div className="absolute top-0 -left-4 size-96 bg-primary-600 opacity-10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-4 size-96 bg-secondary-600 opacity-10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-cyan-600 opacity-5 blur-[120px] rounded-full" />
      </div>
      
      <div className="relative z-10 w-full h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)]">
        <Routes>
          <Route path="/" element = {authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
          <Route path="/login" element = {!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
          <Route path="/signup" element = {!authUser ? <SignupPage /> : <Navigate to={"/"}/>} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
} 

export default App;