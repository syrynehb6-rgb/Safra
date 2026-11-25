import React, { useRef, useState } from 'react';
import {
  Luggage,
  ShoppingBag,
  MessageSquareLock,
  ShieldCheck,
  Star,
  Wallet,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { LUGGAGE_OFFERS, type LuggageOffer, type CountryShop } from '../data/safraData';

export interface EscrowOrder {
  id: string;
  name: string;
  boutique: string;
  city: string;
  priceTND: number;
  status: 'Held in Safra Escrow' | 'Delivered · Paid';
}

interface LuggageAndShopSectionProps {
  walletBalance: number;
  starsCount: number;
  escrowOrders: EscrowOrder[];
  countryShops: CountryShop[];
  countryCity: string;
  onAddToEscrow: (shop: CountryShop, city: string) => void;
  onConfirmPaid: (orderId: string) => void;
  onEarnWalletAndStars: (amountTND: number, starsBonus: number) => void;
  isVerified: boolean;
  onRequireVerify: () => void;
}

export const LuggageAndShopSection: React.FC<LuggageAndShopSectionProps> = ({
  walletBalance,
  starsCount,
  escrowOrders,
  countryShops,
  countryCity,
  onAddToEscrow,
  onConfirmPaid,
  onEarnWalletAndStars,
  isVerified,
  onRequireVerify,
}) => {
  const [offers, setOffers] = useState<LuggageOffer[]>(LUGGAGE_OFFERS);
  const [kgToPost, setKgToPost] = useState(2);
  const [routeFrom, setRouteFrom] = useState('Paris (CDG) 🇫🇷');
  const [routeTo, setRouteTo] = useState('Tunis (TUN) 🇹🇳');
  const [pricePerKg, setPricePerKg] = useState(30);

  const prvChatRef = useRef<HTMLDialogElement>(null);
  const [activeOffer, setActiveOffer] = useState<LuggageOffer | null>(null);
  const [prvMessages, setPrvMessages] = useState<{ from: string; text: string }[]>([
    { from: 'Voyageur', text: 'Aslema! J’ai encore de la place dans ma valise, qu’est-ce que tu veux envoyer ?' },
  ]);
  const [prvInput, setPrvInput] = useState('');

  const handlePostLuggage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      onRequireVerify();
      return;
    }
    const newOffer: LuggageOffer = {
      id: `l-${Date.now()}`,
      countryId: 'custom',
      travelerName: 'Moi (Vérifié CIN)',
      stars: 5.0,
      verified: true,
      from: routeFrom,
      to: routeTo,
      date: 'Prochain Vol',
      availableKg: kgToPost,
      pricePerKgTND: pricePerKg,
      accepts: 'Colis vérifiés, vêtements, cadeaux',
    };
    setOffers([newOffer, ...offers]);
    onEarnWalletAndStars(kgToPost * pricePerKg, 15);
  };

  return (
    <section className="animate-in" aria-label="Partage de bagages et Panier Escrow">
      <div
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.25rem',
          background:
            'linear-gradient(135deg, color-mix(in srgb, #10b981 10%, var(--surface)), color-mix(in srgb, var(--primary) 10%, var(--surface)))',
        }}
      >
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.35rem' }}>
            <Wallet size={13} /> Portefeuille Safra & Points Étoiles
          </span>
          <h2 style={{ fontSize: '1.25rem' }}>
            Kilos Vides (1kg+) & Commandes Sécurisées (Escrow)
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          <div className="card" style={{ padding: '0.6rem 1rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>SOLDE</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>
              {walletBalance} TND
            </div>
          </div>
          <div className="card" style={{ padding: '0.6rem 1rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>ÉTOILES</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>
              ★ {starsCount}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Luggage Sharing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <span className="badge badge-primary" style={{ marginBottom: '0.45rem' }}>
              <Luggage size={13} /> Valise Vide (1kg+)
            </span>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>
              Voyageurs avec kilos disponibles
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {offers.map((of) => (
                <div
                  key={of.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '14px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <strong>{of.travelerName}</strong>
                      {of.verified && (
                        <span className="badge badge-success" style={{ padding: '0.1rem 0.45rem' }}>
                          <ShieldCheck size={12} /> Vérifié
                        </span>
                      )}
                      <span className="badge badge-accent" style={{ padding: '0.1rem 0.45rem' }}>
                        <Star size={11} fill="currentColor" /> {of.stars}
                      </span>
                    </div>
                    <span className="badge badge-primary">{of.availableKg} kg vide</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', marginTop: '0.35rem', fontWeight: 600 }}>
                    {of.from} → {of.to} · 📅 {of.date}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                    Accepte : {of.accepts}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>{of.pricePerKgTND} TND / kg</strong>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      onClick={() => {
                        setActiveOffer(of);
                        prvChatRef.current?.showModal();
                      }}
                    >
                      <MessageSquareLock size={14} /> Chat Privé
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="card" onSubmit={handlePostLuggage}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem' }}>
              Proposer mes kilos vides (Gagner des TND + Étoiles)
            </h3>
            <div className="grid-2" style={{ gap: '0.6rem' }}>
              <input className="safra-input" value={routeFrom} onChange={(e) => setRouteFrom(e.target.value)} required />
              <input className="safra-input" value={routeTo} onChange={(e) => setRouteTo(e.target.value)} required />
              <label style={{ fontSize: '0.82rem' }}>
                Kilos vides (kg)
                <input
                  type="number"
                  min={1}
                  max={23}
                  className="safra-input"
                  value={kgToPost}
                  onChange={(e) => setKgToPost(Number(e.target.value))}
                />
              </label>
              <label style={{ fontSize: '0.82rem' }}>
                Prix / kg (TND)
                <input
                  type="number"
                  min={10}
                  max={100}
                  className="safra-input"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-accent" style={{ marginTop: '0.75rem' }}>
              Publier & Créditer (+{kgToPost * pricePerKg} TND)
            </button>
          </form>
        </div>

        {/* Right: Quick Shop for Selected Country + Escrow Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
              <ShoppingBag size={13} /> Boutiques à {countryCity}
            </span>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem' }}>
              Commander via Voyageur (Garantie Escrow)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {countryShops.map((shop) => (
                <div
                  key={shop.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.7rem',
                    borderRadius: '12px',
                    background: 'var(--surface-2)',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>{shop.name}</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                      {shop.boutique} ({shop.type}) · {shop.priceTND} TND
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem' }}
                    onClick={() => onAddToEscrow(shop, countryCity)}
                  >
                    Panier Escrow
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              🔒 Mes Commandes Escrow ({escrowOrders.length})
            </h3>
            {escrowOrders.length === 0 ? (
              <p style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>
                Ajoute un article depuis les boutiques : ton argent reste bloqué en sécurité dans Safra jusqu’à ce que tu reçoives l’article et cliques sur <strong>« Reçu · Payé »</strong>.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {escrowOrders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem',
                      borderRadius: '10px',
                      background: 'var(--surface-2)',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.88rem' }}>{ord.name}</strong>
                      <div style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                        {ord.city} · <strong>{ord.status}</strong> ({ord.priceTND} TND)
                      </div>
                    </div>
                    {ord.status === 'Held in Safra Escrow' ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        onClick={() => onConfirmPaid(ord.id)}
                      >
                        <CheckCircle2 size={14} /> Reçu · Payé
                      </button>
                    ) : (
                      <span className="badge badge-success">Fonds libérés ✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Private Chat Dialog */}
      <dialog ref={prvChatRef} closedby="any" aria-labelledby="prv-chat-title">
        <div style={{ padding: '1.25rem' }}>
          <h1 id="prv-chat-title" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
            🔒 Chat Privé — {activeOffer?.travelerName} ({activeOffer?.from} → {activeOffer?.to})
          </h1>
          <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.65rem', background: 'var(--surface-2)', borderRadius: '12px', marginBottom: '0.75rem' }}>
            {prvMessages.map((m, idx) => (
              <div key={idx} style={{ fontSize: '0.86rem' }}>
                <strong>{m.from} :</strong> {m.text}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!prvInput.trim()) return;
              setPrvMessages([...prvMessages, { from: 'Moi', text: prvInput.trim() }]);
              setPrvInput('');
            }}
            style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}
          >
            <input
              className="safra-input"
              placeholder="Écrire un message privé..."
              value={prvInput}
              onChange={(e) => setPrvInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary" aria-label="Envoyer">
              <Send size={15} />
            </button>
          </form>
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-ghost">Fermer</button>
          </form>
        </div>
      </dialog>
    </section>
  );
};
