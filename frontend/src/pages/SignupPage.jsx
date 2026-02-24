import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimation from "../components/BorderAnimation";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router";

function SignupPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
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
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 font-['Plus_Jakarta_Sans']">Create Account</h2>
                  <p className="text-slate-400">Join our community and start chatting</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative group">
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
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    className="auth-btn mt-6 group flex items-center justify-center gap-2" 
                    type="submit" 
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-7 text-center">
                  <p className="text-slate-400">Already have an account?</p>
                  <Link to="/login" className="auth-link-secondary mt-3">
                    Sign in here
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 mb-6 mx-auto">
                  <MessageCircleIcon className="w-10 h-10 text-primary-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-100 mb-4 font-['Plus_Jakarta_Sans']">Welcome to Hush</h3>
                <p className="text-slate-400 mb-8">Your secure messaging platform</p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">No Ads</p>
                      <p className="text-sm text-slate-400">100% ad-free experience</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">Always Free</p>
                      <p className="text-sm text-slate-400">No subscriptions or hidden fees</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">Global Community</p>
                      <p className="text-sm text-slate-400">Connect with people worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 border border-primary-500/30 flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary-400">✓</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-200">Easy to Use</p>
                      <p className="text-sm text-slate-400">Intuitive interface for everyone</p>
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

export default SignupPage
