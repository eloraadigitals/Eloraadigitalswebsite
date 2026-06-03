"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";

export default function LoginContent() {
  const { user, loading, isConfigured, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Redirect if logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/profile");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        if (!displayName.trim()) {
          setErrorMsg("Please enter your full name.");
          setIsSubmitting(false);
          return;
        }
        await signUpWithEmail(email, password, displayName);
      }
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Authentication failed. Check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Google Sign-In failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-bg-main pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  return (
    <main className="w-full min-h-[80vh] bg-bg-main pt-28 pb-16 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {!isConfigured ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-card rounded-2xl p-8 border border-accent-gold/30 shadow-luxury text-center space-y-6"
          >
            <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto text-accent-gold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-display text-h3 text-text-primary">
              Firebase Required
            </h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              Authentication and database services are currently local placeholders. To activate customer login, booking management, and reviews:
            </p>
            <div className="bg-bg-premium p-4 rounded-xl border border-border-brand/40 text-left font-body text-xs space-y-2 text-text-secondary">
              <p>1. Copy your Web App config from the Firebase console.</p>
              <p>2. Create a <strong>.env.local</strong> file in the project root.</p>
              <p>3. Paste your credentials as NEXT_PUBLIC_FIREBASE_* parameters.</p>
              <p>4. Refer to <strong>FIREBASE_SETUP.md</strong> for the detailed instructions.</p>
            </div>
            <p className="font-body text-xs text-text-secondary/70 italic">
              (For previewing components, please complete the Firebase environment setup.)
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-card rounded-2xl p-8 border border-border-brand/40 shadow-luxury"
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-h2 text-text-primary">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="font-body text-xs text-text-secondary mt-2">
                {isLogin
                  ? "Access your consultation bookings & reviews"
                  : "Sign up to book appointments and leave feedback"}
              </p>
            </div>

            {errorMsg && (
              <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-body mb-6">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="truncate">{errorMsg}</span>
              </div>
            )}

            {/* Toggle tabs */}
            <div className="flex bg-bg-premium p-1 rounded-full border border-border-brand/60 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 rounded-full font-body text-xs font-semibold transition-all ${
                  isLogin
                    ? "bg-dark-accent text-bg-premium shadow-md"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 rounded-full font-body text-xs font-semibold transition-all ${
                  !isLogin
                    ? "bg-dark-accent text-bg-premium shadow-md"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Signup only) */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="E.g. Sneha Deshmukh"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-bg-premium border border-border-brand/60 rounded-xl pl-10 pr-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                    />
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary/60" />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bg-premium border border-border-brand/60 rounded-xl pl-10 pr-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                  />
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary/60" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-bg-premium border border-border-brand/60 rounded-xl pl-10 pr-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                  />
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-text-secondary/60" />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dark-accent hover:bg-dark-accent/90 text-bg-premium py-4 rounded-full font-body font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Google Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-brand/30"></div>
              </div>
              <span className="relative px-3 bg-bg-card font-body text-xs text-text-secondary/60">
                or continue with
              </span>
            </div>

            {/* Google Sign-in */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full border border-border-brand/60 hover:bg-bg-premium text-text-primary py-3 rounded-full font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-1 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 1.74 14.96 1 12 1 7.35 1 3.39 3.66 1.48 7.55l3.77 2.92C6.18 7.21 8.87 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.25 14.77c-.25-.76-.39-1.57-.39-2.41s.14-1.65.39-2.41L1.48 7.03C.54 8.94 0 11.07 0 13.33s.54 4.39 1.48 6.3l3.77-2.92c-.25-.76-.39-1.57-.39-2.41z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.76-2.91c-1.1.74-2.52 1.18-4.2 1.18-3.13 0-5.82-2.17-6.75-5.43L1.48 15.84C3.39 19.73 7.35 23 12 23z"
                />
              </svg>
              Google
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
