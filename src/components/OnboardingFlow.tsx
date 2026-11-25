import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';
import { SafraLogo } from './SafraLogo';

export type OnboardingStage = 'splash' | 'privacy' | 'auth' | 'done';

interface OnboardingFlowProps {
  onComplete: (userName: string, email: string) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'splash' | 'privacy' | 'auth'>('splash');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedKyc, setAgreedKyc] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (stage !== 'splash') return;
    const timer = window.setTimeout(() => {
      setStage('privacy');
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [stage]);

  // 1. Animated Logo Splash Screen
  if (stage === 'splash') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          padding: '2rem',
          background:
            'radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--primary) 20%, var(--bg)), var(--bg))',
        }}
      >
        <div style={{ transform: 'scale(1.45)', animation: 'dialog-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <SafraLogo size={64} showText={false} />
        </div>
        <div style={{ textAlign: 'center', animation: 'fade-slide-in 0.7s ease' }}>
          <h1
            style={{
              fontSize: '2.2rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--primary), #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SAFRA
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', fontWeight: 600, marginTop: '0.25rem' }}>
            Voyage, Compagnons, Bagages & Services Vérifiés
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ marginTop: '1rem', fontSize: '0.78rem', padding: '0.4rem 0.9rem' }}
          onClick={() => setStage('privacy')}
        >
          Continuer →
        </button>
      </div>
    );
  }

  // 2. Privacy & Security Consent Screen
  if (stage === 'privacy') {
    const canProceed = agreedTerms && agreedKyc;
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
        }}
      >
        <div className="card animate-in" style={{ maxWidth: '480px', width: '100%', padding: '1.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="icon-box" style={{ width: 44, height: 44 }}>
              <ShieldCheck size={22} />
            </span>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.2rem' }}>Étape 1 / 2</span>
              <h1 style={{ fontSize: '1.3rem' }}>Confidentialité & Sécurité</h1>
            </div>
          </div>

          <p style={{ fontSize: '0.86rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            Chez <strong>SAFRA</strong>, ta sécurité et la protection de tes données personnelles sont prioritaires. Merci de lire et d’accepter nos engagements avant d’accéder à l’application :
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              padding: '0.9rem',
              borderRadius: '14px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              marginBottom: '1.1rem',
              fontSize: '0.84rem',
            }}
          >
            <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <span>
                <strong>Politique de Confidentialité :</strong> J’accepte les conditions d’utilisation et le chiffrement de mes données de voyage et de messagerie.
              </span>
            </label>

            <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreedKyc}
                onChange={(e) => setAgreedKyc(e.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <span>
                <strong>Charte de Confiance :</strong> J’accepte la vérification d’identité (CIN / Passeport) pour les paiements Escrow, le partage de bagages et l’assistance SOS.
              </span>
            </label>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', opacity: canProceed ? 1 : 0.55 }}
            disabled={!canProceed}
            onClick={() => setStage('auth')}
          >
            <CheckCircle2 size={17} /> J’accepte et je continue (Agree)
          </button>
        </div>
      </div>
    );
  }

  // 3. Sign In / Create Account Screen
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
    >
      <div className="card animate-in" style={{ maxWidth: '460px', width: '100%', padding: '1.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <SafraLogo size={38} />
          <span className="badge badge-primary">Étape 2 / 2</span>
        </div>

        {/* Toggle Sign In / Create Account */}
        <div className="grid-2" style={{ gap: '0.5rem', marginBottom: '1.1rem' }}>
          <button
            type="button"
            className={authMode === 'signup' ? 'btn btn-primary' : 'btn btn-ghost'}
            onClick={() => setAuthMode('signup')}
          >
            <UserPlus size={15} /> Créer un compte
          </button>
          <button
            type="button"
            className={authMode === 'login' ? 'btn btn-primary' : 'btn btn-ghost'}
            onClick={() => setAuthMode('login')}
          >
            <LogIn size={15} /> Se connecter
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const finalName =
              authMode === 'signup' && fullName.trim()
                ? fullName.trim()
                : email.split('@')[0] || 'Voyageur';
            onComplete(finalName, email.trim());
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
        >
          {authMode === 'signup' && (
            <div>
              <label htmlFor="auth-name" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                Nom & Prénom
              </label>
              <input
                id="auth-name"
                className="safra-input"
                required
                minLength={3}
                data-error="auth-name-err"
                placeholder="Ex: Youssef Ben Ali"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div id="auth-name-err" className="error-msg">
                <span role="img" aria-label="Erreur">⚠️</span> Saisis au moins 3 caractères.
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              Adresse Email
            </label>
            <input
              id="auth-email"
              type="email"
              className="safra-input"
              required
              autoComplete="email"
              data-error="auth-email-err"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="auth-email-err" className="error-msg">
              <span role="img" aria-label="Erreur">⚠️</span> Saisis une adresse email valide.
            </div>
          </div>

          <div>
            <label htmlFor="auth-pass" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              Mot de passe
            </label>
            <input
              id="auth-pass"
              type="password"
              className="safra-input"
              required
              minLength={6}
              autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
              data-error="auth-pass-err"
              placeholder="Minimum 6 caractères"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="auth-pass-err" className="error-msg">
              <span role="img" aria-label="Erreur">⚠️</span> Minimum 6 caractères requis.
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.3rem', padding: '0.75rem' }}>
            <Lock size={15} />
            {authMode === 'signup' ? 'Créer mon compte Safra' : 'Accéder à mon compte'}
            <ArrowRight size={15} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border)' }}>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ width: '100%', fontSize: '0.8rem' }}
            onClick={() => onComplete('Invité Safra', 'demo@safra.app')}
          >
            Aperçu rapide (Mode Démo)
          </button>
        </div>
      </div>
    </div>
  );
};
