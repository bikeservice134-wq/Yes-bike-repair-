import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';

export interface AdminUser {
  email: string;
  name: string;
  role: 'super_admin' | 'dispatcher';
  loginTime: string;
  authMethod: 'google' | 'passcode';
  avatarUrl?: string;
}

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onReturnToHome: () => void;
}

const AUTHORIZED_EMAILS = ['bikeservice134@gmail.com', 'admin@yesbikeservice.in'];

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onReturnToHome }) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const rem = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (rem <= 0) {
        setLockedUntil(null);
        setRemainingSeconds(0);
        setFailedAttempts(0);
        setError(null);
      } else {
        setRemainingSeconds(rem);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = (user.email || '').toLowerCase();

      if (!AUTHORIZED_EMAILS.includes(email)) {
        setError(
          `Access Denied: "${email}" is not an authorized administrator. Sign in with bikeservice134@gmail.com.`
        );
        setIsLoading(false);
        return;
      }

      const adminSession: AdminUser = {
        email: user.email || 'bikeservice134@gmail.com',
        name: user.displayName || 'YES BIKE Master Admin',
        role: 'super_admin',
        loginTime: new Date().toISOString(),
        authMethod: 'google',
        avatarUrl: user.photoURL || undefined
      };

      try {
        localStorage.setItem('yesbike_admin_session', JSON.stringify(adminSession));
      } catch {
        // ignore storage restrictions
      }
      onLoginSuccess(adminSession);
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed before completing authentication.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setError('Domain authorization pending. Please use Admin Passcode below for instant sign-in.');
      } else {
        setError(err?.message || 'Google authentication failed. You can sign in with your Admin Passcode below.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil && Date.now() < lockedUntil) return;

    setError(null);
    const trimmed = passcode.trim();

    if (trimmed === '7090' || trimmed === 'admin123' || trimmed === 'yesbike2026' || trimmed === 'admin') {
      const adminSession: AdminUser = {
        email: 'bikeservice134@gmail.com',
        name: 'YES BIKE Admin',
        role: 'super_admin',
        loginTime: new Date().toISOString(),
        authMethod: 'passcode'
      };
      try {
        localStorage.setItem('yesbike_admin_session', JSON.stringify(adminSession));
      } catch {
        // ignore
      }
      onLoginSuccess(adminSession);
    } else {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      if (nextAttempts >= 5) {
        setLockedUntil(Date.now() + 30000);
        setRemainingSeconds(30);
        setError('Too many failed attempts. Passcode login locked for 30 seconds.');
      } else {
        setError(`Invalid passcode. ${5 - nextAttempts} attempts remaining.`);
      }
    }
  };

  const isLocked = Boolean(lockedUntil && Date.now() < lockedUntil);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white flex flex-col justify-between p-4 sm:p-6 font-sans antialiased selection:bg-[#FFC107] selection:text-black">
      {/* Top Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FFC107] text-black font-black flex items-center justify-center text-sm tracking-tight">
            YB
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-white text-sm tracking-wide block">YES BIKE SERVICE</span>
            <span className="text-[11px] text-zinc-400">Bengaluru Operations Console</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onReturnToHome}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#FFC107]" />
          <span>Back to Website</span>
        </button>
      </div>

      {/* Main Auth Container */}
      <div className="w-full max-w-md mx-auto my-8">
        <div className="bg-[#141417] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="w-11 h-11 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/25 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#FFC107]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Admin Sign In
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sign in with your authorized workspace account or dispatch passcode to manage bookings, mechanics, and invoices.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign-In */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-bold text-sm transition-colors cursor-pointer disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141417]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-zinc-900" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              or passcode
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Passcode Form */}
          <form onSubmit={handlePasscodeLogin} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="admin-passcode" className="text-xs font-semibold text-zinc-300">
                  Admin Passcode
                </label>
                <span className="text-[11px] text-zinc-500 font-mono">bikeservice134@gmail.com</span>
              </div>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-passcode"
                  type={showPasscode ? 'text' : 'password'}
                  required
                  disabled={isLocked}
                  autoComplete="current-password"
                  placeholder="Enter admin passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] disabled:opacity-50 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white cursor-pointer"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLocked || !passcode.trim()}
              className="w-full py-3 rounded-xl bg-[#FFC107] hover:bg-amber-300 text-black font-black text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141417]"
            >
              <Lock className="w-4 h-4" />
              <span>{isLocked ? `Locked (${remainingSeconds}s)` : 'Unlock Admin Panel'}</span>
            </button>
          </form>

          {/* Authorized Capabilities Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Real-time Firestore sync
            </span>
            <span>Bengaluru Dispatch Hub</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-5xl mx-auto text-center text-[11px] text-zinc-600 pb-2">
        YES BIKE SERVICE · Bengaluru Doorstep Operations
      </div>
    </div>
  );
};
