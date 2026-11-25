import React, { useRef, useState } from 'react';
import {
  Wifi,
  ArrowLeftRight,
  CalendarDays,
  Languages,
  FolderLock,
  CheckCircle2,
  Share2,
  QrCode,
  Volume2,
  Sparkles,
} from 'lucide-react';
import type { Destination } from '../data/safraData';

interface SuperAppToolkitProps {
  destination: Destination;
  onShareToGroup: (message: string) => void;
}

const CURRENCY_RATES: Record<string, { code: string; symbol: string; perTnd: number }> = {
  istanbul: { code: 'TRY', symbol: '₺', perTnd: 10.95 },
  paris: { code: 'EUR', symbol: '€', perTnd: 0.295 },
  rome: { code: 'EUR', symbol: '€', perTnd: 0.295 },
  dubai: { code: 'AED', symbol: 'AED', perTnd: 1.17 },
  tunis: { code: 'USD', symbol: '$', perTnd: 0.32 },
};

const LOCAL_PHRASES: Record<string, { fr: string; local: string; phonetic: string }[]> = {
  istanbul: [
    { fr: 'Combien ça coûte ?', local: 'Ne kadar?', phonetic: 'Né ka-dar' },
    { fr: 'Où est le métro / tram ?', local: 'Metro nerede?', phonetic: 'Mé-tro né-ré-dé' },
    { fr: 'J’ai besoin d’un médecin', local: 'Doktora ihtiyacım var', phonetic: 'Dok-to-ra ih-ti-ya-djem var' },
    { fr: 'Merci beaucoup', local: 'Çok teşekkür ederim', phonetic: 'Tchok té-chèk-kür é-dé-rim' },
  ],
  paris: [
    { fr: 'Où est la station de métro ?', local: 'Où est le métro le plus proche ?', phonetic: 'FR' },
    { fr: 'Une carafe d’eau svp', local: 'Une carafe d’eau, s’il vous plaît (Gratuit)', phonetic: 'FR' },
    { fr: 'Urgence médicale', local: 'Appelez le 15 (SAMU) svp', phonetic: 'FR' },
  ],
  dubai: [
    { fr: 'Combien ça coûte ?', local: 'بكم هذا؟ / How much?', phonetic: 'Bikam hatha' },
    { fr: 'À l’aéroport svp', local: 'إلى المطار من فضلك', phonetic: 'Ila al-matar' },
    { fr: 'J’ai besoin d’aide', local: 'أحتاج مساعدة / I need help', phonetic: 'Ahtaj mousaada' },
  ],
  rome: [
    { fr: 'Combien ça coûte ?', local: 'Quanto costa?', phonetic: 'Kwan-to kos-ta' },
    { fr: 'Où est la gare ?', local: 'Dov’è la stazione?', phonetic: 'Do-vè la stat-zyo-né' },
    { fr: 'Merci beaucoup', local: 'Grazie mille!', phonetic: 'Grat-zyé mil-lé' },
  ],
  tunis: [
    { fr: 'Combien ça coûte ?', local: 'B’qadeh hedha?', phonetic: 'Tunisien' },
    { fr: 'Où est l’arrêt ?', local: 'Win el mahatta?', phonetic: 'Tunisien' },
    { fr: 'Merci beaucoup', local: 'Yaatik essaha / Merci', phonetic: 'Tunisien' },
  ],
};

export const SuperAppToolkit: React.FC<SuperAppToolkitProps> = ({
  destination,
  onShareToGroup,
}) => {
  const esimRef = useRef<HTMLDialogElement>(null);
  const currencyRef = useRef<HTMLDialogElement>(null);
  const itineraryRef = useRef<HTMLDialogElement>(null);
  const translatorRef = useRef<HTMLDialogElement>(null);
  const vaultRef = useRef<HTMLDialogElement>(null);

  const [esimActive, setEsimActive] = useState(false);
  const [esimPlan, setEsimPlan] = useState<'5Go' | '10Go' | '20Go'>('10Go');
  const [tndAmount, setTndAmount] = useState<number>(500);
  const [reversed, setReversed] = useState(false);
  const [spokenIdx, setSpokenIdx] = useState<number | null>(null);

  const rate = CURRENCY_RATES[destination.id] ?? CURRENCY_RATES.tunis;
  const convertedVal = reversed
    ? (tndAmount / rate.perTnd).toFixed(2)
    : (tndAmount * rate.perTnd).toFixed(2);

  const phrases = LOCAL_PHRASES[destination.id] ?? LOCAL_PHRASES.istanbul;

  const itineraryDays = [
    { day: 'Jour 1', plan: `Arrivée à ${destination.city}, check-in ${destination.hotels[0]?.name ?? 'Hôtel'} & balade découverte.` },
    { day: 'Jour 2', plan: `${destination.places[0]?.name ?? 'Visite culturelle'} le matin + déjeuner street food.` },
    { day: 'Jour 3', plan: `Shopping ${destination.shops[0]?.boutique ?? 'Malls & Fripes'} + coucher de soleil.` },
    { day: 'Jour 4', plan: `${destination.places[1]?.name ?? 'Excursion locale'} & préparation bagages (Smart Tag actif).` },
  ];

  const tools = [
    {
      id: 'esim',
      title: 'eSIM 5G',
      sub: esimActive ? `${esimPlan} Active ✓` : 'Dès 25 TND',
      icon: <Wifi size={18} />,
      color: '#0ea5e9',
      onClick: () => esimRef.current?.showModal(),
    },
    {
      id: 'currency',
      title: 'Convertisseur',
      sub: `100 TND = ${(100 * rate.perTnd).toFixed(0)} ${rate.code}`,
      icon: <ArrowLeftRight size={18} />,
      color: '#10b981',
      onClick: () => currencyRef.current?.showModal(),
    },
    {
      id: 'itinerary',
      title: 'Itinéraire IA',
      sub: `${destination.recommendedDays} jours prêts`,
      icon: <CalendarDays size={18} />,
      color: '#8b5cf6',
      onClick: () => itineraryRef.current?.showModal(),
    },
    {
      id: 'translator',
      title: 'Traducteur',
      sub: 'Phrases & SOS',
      icon: <Languages size={18} />,
      color: '#f59e0b',
      onClick: () => translatorRef.current?.showModal(),
    },
    {
      id: 'vault',
      title: 'Coffre-fort',
      sub: 'Billets Offline',
      icon: <FolderLock size={18} />,
      color: '#ec4899',
      onClick: () => vaultRef.current?.showModal(),
    },
  ];

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={14} color="var(--primary)" /> BOÎTE À OUTILS VOYAGEUR PRO ({destination.city.toUpperCase()})
        </span>
        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>● Prêt Hors-Ligne</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.65rem' }}>
        {tools.map((tool, i) => (
          <button
            key={tool.id}
            type="button"
            className="bento-card"
            onClick={tool.onClick}
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              animationDelay: `${i * 55}ms`,
            }}
          >
            <span
              className="icon-box"
              style={{
                background: `color-mix(in srgb, ${tool.color} 16%, var(--surface-2))`,
                color: tool.color,
                borderColor: `color-mix(in srgb, ${tool.color} 32%, transparent)`,
              }}
            >
              {tool.icon}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>{tool.title}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{tool.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* 1. eSIM Modal */}
      <dialog ref={esimRef} closedby="any" aria-labelledby="esim-title">
        <div style={{ padding: '1.35rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            <Wifi size={12} /> eSIM Instantanée · {destination.country}
          </span>
          <h1 id="esim-title" style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
            Internet 5G dès ton arrivée à {destination.city}
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>
            Sans changer ta carte SIM tunisienne : garde ton numéro pour les codes bancaires et active tes données en 1 clic.
          </p>

          <div className="grid-3" style={{ gap: '0.55rem', marginBottom: '1rem' }}>
            {[
              { id: '5Go' as const, price: '25 TND', days: '7 jours' },
              { id: '10Go' as const, price: '39 TND', days: '15 jours' },
              { id: '20Go' as const, price: '59 TND', days: '30 jours' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                className={esimPlan === p.id ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flexDirection: 'column', padding: '0.7rem' }}
                onClick={() => setEsimPlan(p.id)}
              >
                <strong>{p.id}</strong>
                <span style={{ fontSize: '0.74rem' }}>{p.price} · {p.days}</span>
              </button>
            ))}
          </div>

          {esimActive ? (
            <div className="card" style={{ background: 'color-mix(in srgb, var(--success) 12%, var(--surface-2))', marginBottom: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <QrCode size={28} color="var(--success)" />
              <div>
                <strong>eSIM {esimPlan} ({destination.country}) Activée !</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Profil installé · Roaming 5G prêt à l’atterrissage.</div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-shimmer"
              style={{ width: '100%', marginBottom: '0.85rem' }}
              onClick={() => setEsimActive(true)}
            >
              <CheckCircle2 size={16} /> Activer eSIM {esimPlan} maintenant
            </button>
          )}

          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-ghost" autoFocus>Fermer</button>
          </form>
        </div>
      </dialog>

      {/* 2. Currency Converter Modal */}
      <dialog ref={currencyRef} closedby="any" aria-labelledby="currency-title">
        <div style={{ padding: '1.35rem' }}>
          <h1 id="currency-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            💱 Convertisseur Rapide — TND ↔ {rate.code}
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.85rem' }}>
            <input
              type="number"
              className="safra-input"
              value={tndAmount}
              onChange={(e) => setTndAmount(Math.max(0, Number(e.target.value)))}
              aria-label="Montant à convertir"
              autoFocus
            />
            <button type="button" className="btn btn-ghost" onClick={() => setReversed(!reversed)} aria-label="Inverser">
              <ArrowLeftRight size={16} />
            </button>
          </div>
          <div className="card" style={{ background: 'var(--surface-2)', textAlign: 'center', marginBottom: '0.9rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              {tndAmount} {reversed ? rate.code : 'TND'} =
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }} className="price-num">
              {convertedVal} {reversed ? 'TND' : rate.code}
            </div>
          </div>
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">Fermer</button>
          </form>
        </div>
      </dialog>

      {/* 3. AI Day-by-Day Itinerary Modal */}
      <dialog ref={itineraryRef} closedby="any" aria-labelledby="itinerary-title">
        <div style={{ padding: '1.35rem' }}>
          <h1 id="itinerary-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            🗓️ Itinéraire IA — {destination.city} ({destination.recommendedDays} jours)
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}>
            {itineraryDays.map((d) => (
              <div key={d.day} style={{ padding: '0.65rem', borderRadius: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <strong style={{ color: 'var(--primary)' }}>{d.day} :</strong>{' '}
                <span style={{ fontSize: '0.85rem' }}>{d.plan}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onShareToGroup(`🗓️ Programme IA pour ${destination.city} : ${itineraryDays.map((d) => `${d.day}: ${d.plan}`).join(' | ')}`);
                itineraryRef.current?.close();
              }}
            >
              <Share2 size={15} /> Partager au Groupe
            </button>
            <form method="dialog">
              <button type="submit" className="btn btn-ghost" autoFocus>Fermer</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* 4. Local Translator Modal */}
      <dialog ref={translatorRef} closedby="any" aria-labelledby="translator-title">
        <div style={{ padding: '1.35rem' }}>
          <h1 id="translator-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            🗣️ Phrases Utiles & Urgences — {destination.country}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}>
            {phrases.map((ph, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem',
                  borderRadius: '12px',
                  background: 'var(--surface-2)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{ph.fr}</div>
                  <strong style={{ fontSize: '0.95rem' }}>{ph.local}</strong>
                  <div style={{ fontSize: '0.74rem', color: 'var(--primary)' }}>{ph.phonetic}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ padding: '0.35rem 0.6rem' }}
                  onClick={() => setSpokenIdx(idx)}
                  aria-label={`Écouter ${ph.local}`}
                >
                  <Volume2 size={15} /> {spokenIdx === idx ? '✓' : ''}
                </button>
              </div>
            ))}
          </div>
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" autoFocus>Fermer</button>
          </form>
        </div>
      </dialog>

      {/* 5. Offline Document Vault Modal */}
      <dialog ref={vaultRef} closedby="any" aria-labelledby="vault-title">
        <div style={{ padding: '1.35rem' }}>
          <h1 id="vault-title" style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
            🛂 Coffre-Fort Documents (Disponible Hors-Ligne)
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.85rem' }}>
            Tous tes billets, réservations et documents chiffrés accessibles même en mode avion.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}>
            {[
              { title: `Carte d’Embarquement · TUN → ${destination.city}`, meta: 'Vol Confirmé · Siège 14A · Sync Offline ✓' },
              { title: `Bon Hôtel · ${destination.hotels[0]?.name ?? 'Hôtel Safra'}`, meta: `${destination.recommendedDays - 1} nuits · Payé via Safra ✓` },
              { title: 'Passeport & Assurance Voyage Safra', meta: 'Chiffré AES-256 · Prêt en cas de contrôle ✓' },
            ].map((doc, idx) => (
              <div key={idx} className="card" style={{ padding: '0.7rem', background: 'var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.88rem' }}>{doc.title}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>{doc.meta}</div>
                </div>
                <QrCode size={22} color="var(--primary)" />
              </div>
            ))}
          </div>
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" autoFocus>Fermer</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};
