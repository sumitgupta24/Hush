import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimation from '../components/BorderAnimation';
import { MessageCircleIcon, LockIcon, MailIcon, Loader2, ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const login = useAuthStore((state) => state.login);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const highlights = [
    { title: 'Private by design', text: 'Encrypted conversations with a calm, secure experience.', icon: ShieldCheck },
    { title: 'Instant delivery', text: 'Real-time chat that feels quick and effortless.', icon: Zap },
    { title: 'Beautiful by default', text: 'A refined interface designed for focus and comfort.', icon: Sparkles },
  ];

  return (
    <div className="flex min-h-[calc(100vh-2rem)] w-full items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="relative w-full max-w-6xl">
        <BorderAnimation>
          <div className="flex w-full flex-col overflow-hidden bg-slate-950/70 md:flex-row">
            <div className="flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.15),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-6 sm:p-8 md:w-[48%] md:p-10 lg:p-12">
              <div className="w-full max-w-md">
                <div className="mb-8 text-center md:text-left">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-500/30 bg-primary-500/10">
                    <MessageCircleIcon className="h-8 w-8 text-primary-400" />
                  </div>
                  <p className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                    Welcome back
                  </p>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-100 sm:text-4xl">Sign in to Hush</h2>
                  <p className="mt-2 text-sm text-slate-400 sm:text-base">Pick up where you left off in a polished, private space.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="auth-input-label">Email Address</label>
                    <div className="group relative">
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

                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="group relative">
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

                  <button className="auth-btn group mt-6 flex items-center justify-center gap-2" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center md:text-left">
                  <p className="text-sm text-slate-400">New here?</p>
                  <Link to="/signup" className="auth-link-secondary mt-3">
                    Create an account
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-center bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-8 md:flex md:w-[52%] lg:p-10">
              <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <MessageCircleIcon className="h-10 w-10 text-primary-400" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-100">A calmer way to connect</h3>
                <p className="mx-auto mt-3 max-w-sm text-slate-400">Secure messaging, expressive conversations, and a beautifully simple experience.</p>

                <div className="mt-8 space-y-3 text-left">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-500/20 bg-primary-500/10">
                          <Icon className="h-5 w-5 text-primary-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-400">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </BorderAnimation>
      </div>
    </div>
  );
}

export default LoginPage;