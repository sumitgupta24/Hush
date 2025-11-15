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

  console.log({authUser})

  if(isCheckingAuth) return <PageLoader/>

  return (
    <div className='min-h-screen bg-black relative flex items-center justify-center p-4 overflow-hidden'>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d430_1px,transparent_1px),linear-gradient(to_bottom,#06b6d430_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="absolute top-0 -left-4 size-96 bg-fuchsia-600 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-600 opacity-20 blur-[100px]" />
      <div className="relative z-10 text-white" />
      <Routes>
        <Route path="/" element = {authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
        <Route path="/login" element = {!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/signup" element = {!authUser ? <SignupPage /> : <Navigate to={"/"}/>} />
      </Routes>
      <Toaster/>
    </div>
  );
} 

export default App;