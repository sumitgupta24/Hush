import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimation from '../components/BorderAnimation';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, Loader2, ArrowRight, Sparkles, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from 'react-router';

function SignupPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const highlights = [
    { title: 'No ads, no clutter', text: 'A focused space that feels clean, premium, and calm.', icon: Sparkles },
    { title: 'Always free', text: 'Start chatting without subscriptions or pressure.', icon: ShieldCheck },
    { title: 'Global community', text: 'Connect with people around the world in one beautiful app.', icon: Globe2 },
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
                    Create account
                  </p>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-slate-100 sm:text-4xl">Join the conversation</h2>
                  <p className="mt-2 text-sm text-slate-400 sm:text-base">Start your secure messaging journey in a refined new experience.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="group relative">
                      <UserIcon className="auth-input-icon group-focus-within:text-primary-400" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input pl-11"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>

                  <button className="auth-btn group mt-6 flex items-center justify-center gap-2" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center md:text-left">
                  <p className="text-sm text-slate-400">Already have an account?</p>
                  <Link to="/login" className="auth-link-secondary mt-3">
                    Sign in here
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-center bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-8 md:flex md:w-[52%] lg:p-10">
              <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <MessageCircleIcon className="h-10 w-10 text-primary-400" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-100">Welcome to Hush</h3>
                <p className="mx-auto mt-3 max-w-sm text-slate-400">A simple, secure, and elegant place to stay close to the people that matter.</p>

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

export default SignupPage;
