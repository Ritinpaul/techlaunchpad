'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, signUp, signInWithGoogle } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

// ── Google Icon SVG ──
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') || '/dashboard';

  const [mode, setMode]         = useState('login'); // login | signup | forgot
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [college, setCollege]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [showPwd, setShowPwd]   = useState(false);

  // If already logged in → redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(redirect);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);

    if (mode === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) { setError(err.message); setLoading(false); return; }
      router.replace(redirect);

    } else if (mode === 'signup') {
      if (!name.trim()) { setError('Please enter your full name.'); setLoading(false); return; }
      const { error: err } = await signUp(email, password, { full_name: name, college });
      if (err) { setError(err.message); setLoading(false); return; }
      setSuccess('Account created! Check your email to confirm, then sign in.');
      setMode('login');

    } else if (mode === 'forgot') {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?mode=reset`,
      });
      if (err) { setError(err.message); setLoading(false); return; }
      setSuccess('Password reset email sent! Check your inbox.');
    }

    setLoading(false);
  }

  async function handleGoogle() {
    setError(''); setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  }

  const titles = { login: 'Welcome Back', signup: 'Create Your Account', forgot: 'Reset Password' };
  const subs   = {
    login:  'Sign in to access your dashboard, mocks, and tracker.',
    signup: 'Join 200+ MBA students who prep smarter with MBA Partner.',
    forgot: "We'll send a reset link to your email.",
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: 24 }}>
            <div style={{ fontFamily: 'Kodchasan, sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
              MBA<span style={{ color: 'var(--purple)' }}>Partner</span>
            </div>
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{titles[mode]}</h1>
          <p style={{ fontSize: 15, color: 'var(--slate)', lineHeight: 1.5 }}>{subs[mode]}</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '40px' }}>

          {/* Error / Success banners */}
          {error && (
            <div role="alert" style={{ background: 'rgba(239,68,68,0.1)', border: '1.5px solid var(--error)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: 'var(--error)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span aria-hidden="true">⚠️</span> {error}
            </div>
          )}
          {success && (
            <div role="status" style={{ background: 'rgba(16,185,129,0.1)', border: '1.5px solid var(--success)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: 'var(--success)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span aria-hidden="true">✅</span> {success}
            </div>
          )}

          {/* Google button — only for login + signup */}
          {mode !== 'forgot' && (
            <>
              <button
                id="btn-google-signin"
                onClick={handleGoogle}
                disabled={loading}
                style={{ width: '100%', height: 52, border: '2px solid var(--black)', borderRadius: 'var(--radius-btn)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 15, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer', transition: 'background 200ms ease', fontFamily: 'inherit' }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--bg-main)'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--white)'}
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--hairline)', opacity: 0.15 }} />
                <span style={{ fontSize: 13, color: 'var(--slate)' }}>or with email</span>
                <div style={{ flex: 1, height: 1, background: 'var(--hairline)', opacity: 0.15 }} />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {mode === 'signup' && (
              <>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" htmlFor="inp-name">Full Name</label>
                  <input id="inp-name" type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Aarav Sharma" required autoComplete="name" />
                </div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" htmlFor="inp-college">College (optional)</label>
                  <input id="inp-college" type="text" className="form-input" value={college} onChange={e => setCollege(e.target.value)} placeholder="IIM Lucknow, XLRI..." autoComplete="organization" />
                </div>
              </>
            )}

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label" htmlFor="inp-email">Email Address</label>
              <input id="inp-email" type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@college.edu" required autoComplete="email" />
            </div>

            {mode !== 'forgot' && (
              <div className="form-group" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" htmlFor="inp-password">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('forgot')} style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="inp-password"
                    type={showPwd ? 'text' : 'password'}
                    className="form-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                    required
                    minLength={8}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    style={{ paddingRight: 52 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(p => !p)}
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--slate)' }}
                  >
                    {showPwd ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
            )}

            {mode === 'forgot' && <div style={{ marginBottom: 24 }} />}

            <button
              id="btn-auth-submit"
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 16, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  {mode === 'login' ? 'Signing in…' : mode === 'signup' ? 'Creating account…' : 'Sending…'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In →' : mode === 'signup' ? 'Create Account →' : 'Send Reset Link →'
              )}
            </button>
          </form>
        </div>

        {/* Mode switcher */}
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--slate)' }}>
          {mode === 'login' ? (
            <>Don&apos;t have an account?{' '}
              <button onClick={() => { setMode('signup'); setError(''); setSuccess(''); }} style={{ color: 'var(--purple)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                Sign up free
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => { setMode('login'); setError(''); setSuccess(''); }} style={{ color: 'var(--purple)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link href="/" style={{ fontSize: 13, color: 'var(--slate)' }}>← Back to mbapartner.in</Link>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
