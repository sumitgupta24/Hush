import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimation from '../components/BorderAnimation';
import { MessageCircleIcon, LockIcon, MailIcon, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const login = useAuthStore((state) => state.login);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        <BorderAnimation>
          <div className="w-full flex flex-col md:flex-row overflow-hidden">
            {/* Left Side - Form */}
            <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm md:border-r border-slate-700/30">
              <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 mb-4">
                    <MessageCircleIcon className="w-8 h-8 text-primary-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 font-['Plus_Jakarta_Sans']">Welcome Back</h2>
                  <p className="text-slate-400">Sign in to your account to continue</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="auth-input-label">Email Address</label>
                    <div className="relative group">
                      <MailIcon className="auth-input-icon group-focus-within:text-primary-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input pl-11"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative group">
                      <LockIcon className="auth-input-icon group-focus-within:text-primary-400" />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input pl-11"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    className="auth-btn mt-6 group flex items-center justify-center gap-2" 
                    type="submit" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-7 text-center">
                  <p className="text-slate-400">Don't have an account?</p>
                  <Link to="/signup" className="auth-link-secondary mt-3">
                    Create one now
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 mb-6 mx-auto">
                  <MessageCircleIcon className="w-10 h-10 text-primary-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-100 mb-4 font-['Plus_Jakarta_Sans']">Hush</h3>
                <p className="text-slate-400 mb-8">Secure, fast, and beautiful messaging</p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">End-to-End Encrypted</p>
                      <p className="text-sm text-slate-400">Your messages are always private</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">Lightning Fast</p>
                      <p className="text-sm text-slate-400">Real-time message delivery</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">Share Anything</p>
                      <p className="text-sm text-slate-400">Images, files, and more</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimation>
      </div>
    </div>
  )
}

export default LoginPage;