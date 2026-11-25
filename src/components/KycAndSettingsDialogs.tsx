import React, { useState } from 'react';
import { ShieldCheck, Sun, Moon, Monitor } from 'lucide-react';

interface KycDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  isVerified: boolean;
  onVerifySuccess: (docType: string, fullName: string) => void;
}

export const KycDialog: React.FC<KycDialogProps> = ({
  dialogRef,
  isVerified,
  onVerifySuccess,
}) => {
  const [docType, setDocType] = useState('CIN (Bitaqt Taarif)');
  const [fullName, setFullName] = useState('');
  const [docNumber, setDocNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !docNumber.trim()) return;
    onVerifySuccess(docType, fullName.trim());
    dialogRef.current?.close('verified');
  };

  return (
    <dialog ref={dialogRef} closedby="any" aria-labelledby="kyc-dialog-title">
      <div style={{ padding: '1.35rem' }}>
        <span className="badge badge-success" style={{ marginBottom: '0.45rem' }}>
          <ShieldCheck size={13} /> Sécurité & Confiance Safra
        </span>
        <h1 id="kyc-dialog-title" style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
          Vérification d’Identité (CIN ou Passeport)
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '1rem' }}>
          Obligatoire avant de publier des vidéos, transporter des colis (1kg+), ou utiliser les alertes SOS afin de protéger toute la communauté.
        </p>

        {isVerified ? (
          <div style={{ marginBottom: '1rem' }}>
            <div className="card" style={{ background: 'color-mix(in srgb, var(--success) 12%, var(--surface-2))' }}>
              <strong>✅ Ton identité est déjà vérifiée !</strong> Tu as accès à toutes les fonctionnalités (vidéos, bagages, SOS, escrow).
            </div>
            <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.85rem' }}>
              <button type="submit" className="btn btn-primary" autoFocus>Fermer</button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              Type de document
              <select
                className="safra-select"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
              >
                <option value="CIN (Bitaqt Taarif)">🪪 Carte d’Identité Nationale (CIN)</option>
                <option value="Passeport">🛂 Passeport Biométrique</option>
              </select>
            </label>

            <div>
              <label htmlFor="kyc-name" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                Nom & Prénom (exactement comme sur le document)
              </label>
              <input
                id="kyc-name"
                className="safra-input"
                required
                minLength={3}
                data-error="kyc-name-err"
                placeholder="Ex: Youssef Ben Ali"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoFocus
              />
              <div id="kyc-name-err" className="error-msg">
                <span role="img" aria-label="Erreur">⚠️</span> Saisis ton nom complet (au moins 3 caractères).
              </div>
            </div>

            <div>
              <label htmlFor="kyc-num" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                Numéro de pièce + Photo Selfie de contrôle
              </label>
              <input
                id="kyc-num"
                className="safra-input"
                required
                pattern="[A-Za-z0-9]{6,14}"
                data-error="kyc-num-err"
                placeholder="Ex: 09876543 ou P1234567"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
              />
              <div id="kyc-num-err" className="error-msg">
                <span role="img" aria-label="Erreur">⚠️</span> Numéro invalide (6 à 14 caractères alphanumériques).
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.4rem' }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => dialogRef.current?.close('cancel')}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                Valider & Obtenir le Badge Vérifié
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export type ThemeChoice = 'system' | 'light' | 'dark';

interface SettingsDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  theme: ThemeChoice;
  onChangeTheme: (choice: ThemeChoice) => void;
  onLogout: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  dialogRef,
  theme,
  onChangeTheme,
  onLogout,
}) => {
  return (
    <dialog ref={dialogRef} closedby="any" aria-labelledby="settings-dialog-title">
      <div style={{ padding: '1.35rem' }}>
        <h1 id="settings-dialog-title" style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
          ⚙️ Préférences d’Apparence & Compte
        </h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '1rem' }}>
          Choisis le thème de l’application (synchronisé avec ton navigateur).
        </p>

        <div className="grid-3" style={{ gap: '0.65rem', marginBottom: '1rem' }}>
          <button
            type="button"
            className={theme === 'system' ? 'btn btn-primary' : 'btn btn-ghost'}
            onClick={() => onChangeTheme('system')}
          >
            <Monitor size={16} /> Système
          </button>
          <button
            type="button"
            className={theme === 'light' ? 'btn btn-primary' : 'btn btn-ghost'}
            onClick={() => onChangeTheme('light')}
          >
            <Sun size={16} /> Clair
          </button>
          <button
            type="button"
            className={theme === 'dark' ? 'btn btn-primary' : 'btn btn-ghost'}
            onClick={() => onChangeTheme('dark')}
          >
            <Moon size={16} /> Sombre
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ color: 'var(--danger)' }}
            onClick={() => {
              dialogRef.current?.close();
              onLogout();
            }}
          >
            Déconnexion / Revoir l’accueil
          </button>
          <form method="dialog">
            <button type="submit" className="btn btn-primary" autoFocus>
              Fermer
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
