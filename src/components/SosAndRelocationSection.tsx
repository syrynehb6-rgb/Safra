import React, { useRef, useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Star,
  PhoneCall,
  MapPin,
  Languages,
  Stethoscope,
} from 'lucide-react';
import type { Destination } from '../data/safraData';

interface SosAndRelocationSectionProps {
  destination: Destination;
  isVerified: boolean;
  onRequireVerify: () => void;
}

export const SosAndRelocationSection: React.FC<SosAndRelocationSectionProps> = ({
  destination,
  isVerified,
  onRequireVerify,
}) => {
  const [sosSent, setSosSent] = useState(false);
  const [contactedIds, setContactedIds] = useState<string[]>([]);
  const sosDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="animate-in" aria-label="SOS et Assistance à l'étranger">
      <div
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.25rem',
          borderColor: 'color-mix(in srgb, var(--danger) 40%, var(--border))',
          background: 'color-mix(in srgb, var(--danger) 7%, var(--surface))',
        }}
      >
        <div>
          <span className="badge badge-danger" style={{ marginBottom: '0.35rem' }}>
            <ShieldAlert size={13} /> Assistance Sécurisée à {destination.city} ({destination.country})
          </span>
          <h2 style={{ fontSize: '1.25rem' }}>
            Malade, bloqué ou à court d’argent en voyage solo ?
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
            Contacte un compatriote ou un professionnel vérifié proche de toi à {destination.city} avec garantie d’identité & Escrow.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            if (!isVerified) {
              onRequireVerify();
              return;
            }
            sosDialogRef.current?.showModal();
          }}
        >
          <PhoneCall size={16} /> Envoyer Alerte SOS Sécurisée
        </button>
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        Contacts d’Urgence & Métiers Vérifiés à {destination.city}
      </h3>
      <div className="grid-3">
        {destination.services.map((srv) => {
          const isContacted = contactedIds.includes(srv.id);
          return (
            <article key={srv.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem' }}>
                  <span className="badge badge-primary">
                    <Stethoscope size={12} /> {srv.profession}
                  </span>
                  <span className="badge badge-accent">
                    <Star size={11} fill="currentColor" /> {srv.stars}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{srv.providerName}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {srv.cityArea}</span>
                  {srv.verified && (
                    <span className="badge badge-success" style={{ padding: '0.08rem 0.4rem' }}>
                      <ShieldCheck size={11} /> Vérifié
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '0.3rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>{srv.priceLabel}</span> · <Languages size={13} /> <span>{srv.languages}</span>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--muted)', marginTop: '0.45rem' }}>
                  {srv.description}
                </p>
              </div>

              <button
                type="button"
                className={isContacted ? 'btn btn-ghost' : 'btn btn-primary'}
                onClick={() => setContactedIds([...contactedIds, srv.id])}
              >
                {isContacted ? `📞 ${srv.phone}` : 'Contacter en sécurité'}
              </button>
            </article>
          );
        })}
      </div>

      {/* Native SOS Dialog */}
      <dialog ref={sosDialogRef} closedby="any" aria-labelledby="sos-dialog-title">
        <div style={{ padding: '1.25rem' }}>
          <h1 id="sos-dialog-title" style={{ fontSize: '1.2rem', color: 'var(--danger)', marginBottom: '0.5rem' }}>
            🆘 Demande d’Assistance d’Urgence à {destination.city}
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--muted)', marginBottom: '0.85rem' }}>
            Ta position et ton profil vérifié seront partagés uniquement avec les ambassadeurs et médecins Safra vérifiés dans un rayon de 5 km.
          </p>
          {sosSent ? (
            <div className="card" style={{ background: 'color-mix(in srgb, var(--success) 12%, var(--surface-2))', marginBottom: '0.85rem' }}>
              <strong>✅ Alerte envoyée !</strong> L’ambassadeur Safra le plus proche à {destination.city} a reçu ta demande et va te contacter.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              <button type="button" className="btn btn-danger" onClick={() => setSosSent(true)}>
                Urgence Médicale / Traduction
              </button>
              <button type="button" className="btn btn-accent" onClick={() => setSosSent(true)}>
                Besoin Dépannage Cash Escrow
              </button>
            </div>
          )}
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-ghost" autoFocus>
              Fermer
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
};
