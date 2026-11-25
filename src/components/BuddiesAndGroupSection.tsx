import React, { useRef, useState } from 'react';
import {
  Users,
  MessageCircle,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Send,
  Star,
  ShieldCheck,
  Sparkles,
  PlusCircle,
} from 'lucide-react';
import { TRAVEL_BUDDIES, type TravelBuddyPost } from '../data/safraData';

interface BuddiesAndGroupSectionProps {
  groupMessages: { id: string; sender: string; text: string; time: string }[];
  onSendGroupMessage: (text: string) => void;
  isVerified: boolean;
  onRequireVerify: () => void;
}

export const BuddiesAndGroupSection: React.FC<BuddiesAndGroupSectionProps> = ({
  groupMessages,
  onSendGroupMessage,
  isVerified,
  onRequireVerify,
}) => {
  const [buddies, setBuddies] = useState<TravelBuddyPost[]>(TRAVEL_BUDDIES);
  const [filterDest, setFilterDest] = useState('All');
  const [filterInterest, setFilterInterest] = useState('');
  const [joinedIds, setJoinedIds] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Video call state inside native dialog
  const videoCallRef = useRef<HTMLDialogElement>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // New trip post state
  const [newDest, setNewDest] = useState('Istanbul, Turkey');
  const [newDate, setNewDate] = useState('21 Août');
  const [newAgeRange, setNewAgeRange] = useState('22 – 29 ans');
  const [newInterests, setNewInterests] = useState('Street Food, Shopping, Bosphorus');
  const [newNote, setNewNote] = useState('');

  // Group Expense Splitter
  const [expenses, setExpenses] = useState<{ id: string; title: string; amount: number; by: string }[]>([
    { id: 'e1', title: 'Acompte Hôtel Sirkeci', amount: 420, by: 'Youssef' },
    { id: 'e2', title: 'Navette Aéroport & Istanbulkart', amount: 120, by: 'Meriem' },
  ]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPersonShare = Math.round(totalExpenses / 3);

  const filteredBuddies = buddies.filter((b) => {
    const matchDest = filterDest === 'All' || b.destination.includes(filterDest);
    const matchInt =
      !filterInterest.trim() ||
      b.interests.some((i) => i.toLowerCase().includes(filterInterest.toLowerCase())) ||
      b.vibe.toLowerCase().includes(filterInterest.toLowerCase()) ||
      b.culture.toLowerCase().includes(filterInterest.toLowerCase());
    return matchDest && matchInt;
  });

  const handleAddBuddyPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      onRequireVerify();
      return;
    }
    if (!newNote.trim()) return;
    const post: TravelBuddyPost = {
      id: `b-${Date.now()}`,
      countryId: 'custom',
      userName: 'Moi (Vérifié)',
      avatarColor: '#0284c7',
      age: 25,
      stars: 5.0,
      verified: true,
      destination: newDest,
      date: newDate,
      lookingFor: 'Groupe 2–4 amis',
      ageRange: newAgeRange,
      culture: 'Tunisien / Open-minded',
      interests: newInterests.split(',').map((s) => s.trim()).filter(Boolean),
      vibe: 'Même énergie & Centres d’intérêt',
      note: newNote.trim(),
    };
    setBuddies([post, ...buddies]);
    setNewNote('');
  };

  return (
    <section className="animate-in" aria-label="Compagnons de voyage et chat de groupe">
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Solo Traveler Matcher */}
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.45rem' }}>
              <Users size={13} /> Matcher par Âge, Culture & Centres d’Intérêt
            </span>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>
              Tu voyages seul(e) ? Trouve ton groupe !
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>
              Filtre par destination, tranche d’âge et vibe (jaw) pour voyager avec des personnes qui te ressemblent.
            </p>

            <div className="grid-2" style={{ gap: '0.65rem' }}>
              <select
                aria-label="Filtrer par destination"
                className="safra-select"
                value={filterDest}
                onChange={(e) => setFilterDest(e.target.value)}
              >
                <option value="All">🌍 Toutes les destinations</option>
                <option value="Istanbul">🇹🇷 Istanbul (ex: 21 Août)</option>
                <option value="Paris">🇫🇷 Paris</option>
                <option value="Dubai">🇦🇪 Dubai</option>
              </select>
              <input
                aria-label="Filtrer par centre d'intérêt"
                className="safra-input"
                placeholder="Ex: Shopping, Street Food, Art..."
                value={filterInterest}
                onChange={(e) => setFilterInterest(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem' }}>
            {filteredBuddies.map((b) => {
              const joined = joinedIds.includes(b.id);
              return (
                <article key={b.id} className="card card-hover">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background: b.avatarColor,
                          color: '#fff',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {b.userName[0]}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <strong>{b.userName}, {b.age} ans</strong>
                          {b.verified && (
                            <span className="badge badge-success" style={{ padding: '0.1rem 0.45rem' }}>
                              <ShieldCheck size={12} /> CIN Vérifiée
                            </span>
                          )}
                          <span className="badge badge-accent" style={{ padding: '0.1rem 0.45rem' }}>
                            <Star size={11} fill="currentColor" /> {b.stars}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                          ✈️ {b.destination} · 📅 <strong>{b.date}</strong> · {b.lookingFor}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.86rem', margin: '0.7rem 0' }}>{b.note}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                    <span className="badge badge-primary">🎂 Âge souhaité : {b.ageRange}</span>
                    <span className="badge">🌍 {b.culture}</span>
                    {b.interests.map((int) => (
                      <span key={int} className="badge">
                        <Sparkles size={11} /> {int}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={joined ? 'btn btn-ghost' : 'btn btn-primary'}
                    onClick={() => {
                      if (!joined) {
                        setJoinedIds([...joinedIds, b.id]);
                        onSendGroupMessage(`👋 J'ai demandé à rejoindre le voyage de ${b.userName} (${b.destination} - ${b.date}) !`);
                      }
                    }}
                  >
                    {joined ? 'Demande envoyée ✓' : 'Rejoindre ce groupe'}
                  </button>
                </article>
              );
            })}
          </div>

          {/* Post your own trip */}
          <form className="card" onSubmit={handleAddBuddyPost}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PlusCircle size={17} /> Publier mon départ & chercher des compagnons
            </h3>
            <div className="grid-2" style={{ gap: '0.6rem', marginBottom: '0.6rem' }}>
              <input
                className="safra-input"
                value={newDest}
                onChange={(e) => setNewDest(e.target.value)}
                required
                placeholder="Destination"
              />
              <input
                className="safra-input"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                placeholder="Date (ex: 21 Août)"
              />
              <input
                className="safra-input"
                value={newAgeRange}
                onChange={(e) => setNewAgeRange(e.target.value)}
                placeholder="Tranche d'âge souhaitée"
              />
              <input
                className="safra-input"
                value={newInterests}
                onChange={(e) => setNewInterests(e.target.value)}
                placeholder="Centres d'intérêt"
              />
            </div>
            <div>
              <textarea
                className="safra-textarea"
                rows={2}
                required
                minLength={8}
                data-error="buddy-note-err"
                placeholder="Décris ton programme et le style de groupe que tu cherches..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div id="buddy-note-err" className="error-msg">
                <span role="img" aria-label="Erreur">⚠️</span> Écris au moins 8 caractères pour décrire ton voyage.
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.65rem' }}>
              Publier mon annonce
            </button>
          </form>
        </div>

        {/* Right: Friends Group Chat & Video Call */}
        <div className="card" style={{ position: 'sticky', top: '5.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '0.3rem' }}>
                <MessageCircle size={12} /> Groupe d’Amis · Safra Istanbul
              </span>
              <h3 style={{ fontSize: '1.15rem' }}>Discussion & Propositions</h3>
            </div>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => videoCallRef.current?.showModal()}
            >
              <Video size={16} /> Appel Vidéo
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              maxHeight: '360px',
              overflowY: 'auto',
              padding: '0.85rem 0',
            }}
          >
            {groupMessages.map((m) => (
              <div
                key={m.id}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '14px',
                  background: m.sender === 'Moi' ? 'color-mix(in srgb, var(--primary) 16%, var(--surface-2))' : 'var(--surface-2)',
                  alignSelf: m.sender === 'Moi' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                }}
              >
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.15rem' }}>
                  {m.sender} · <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{m.time}</span>
                </div>
                <div style={{ fontSize: '0.86rem' }}>{m.text}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!chatInput.trim()) return;
              onSendGroupMessage(chatInput.trim());
              setChatInput('');
            }}
            style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border)' }}
          >
            <input
              aria-label="Message au groupe d'amis"
              className="safra-input"
              placeholder="Proposer un hôtel, une date ou une offre..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" aria-label="Envoyer">
              <Send size={16} />
            </button>
          </form>

          {/* Group Expense Splitter */}
          <div style={{ marginTop: '1rem', paddingTop: '0.9rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.92rem' }}>💸 Partage de Frais (3 amis)</strong>
              <span className="badge badge-primary">{perPersonShare} TND / pers.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.6rem', fontSize: '0.8rem' }}>
              {expenses.map((ex) => (
                <div key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0.55rem', borderRadius: '8px', background: 'var(--surface-2)' }}>
                  <span>{ex.title} ({ex.by})</span>
                  <strong>{ex.amount} TND</strong>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const amt = Number(expAmount);
                if (!expTitle.trim() || !amt) return;
                setExpenses([...expenses, { id: `e-${Date.now()}`, title: expTitle.trim(), amount: amt, by: 'Moi' }]);
                setExpTitle('');
                setExpAmount('');
              }}
              style={{ display: 'flex', gap: '0.4rem' }}
            >
              <input className="safra-input" placeholder="Dépense (ex: Dîner)" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} style={{ flex: 2, padding: '0.45rem 0.65rem', fontSize: '0.8rem' }} />
              <input type="number" className="safra-input" placeholder="TND" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} style={{ flex: 1, padding: '0.45rem 0.65rem', fontSize: '0.8rem' }} />
              <button type="submit" className="btn btn-ghost" style={{ padding: '0.45rem 0.65rem', fontSize: '0.8rem' }}>+</button>
            </form>
          </div>
        </div>
      </div>

      {/* Native Video Call Dialog */}
      <dialog ref={videoCallRef} closedby="closerequest" aria-labelledby="video-call-title">
        <div style={{ padding: '1.25rem' }}>
          <h1 id="video-call-title" style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            📹 Appel Vidéo de Groupe — Préparation Safra
          </h1>
          <div className="grid-2" style={{ gap: '0.65rem', marginBottom: '1rem' }}>
            {['Moi (Caméra)', 'Youssef', 'Meriem', 'Amine'].map((person, i) => (
              <div
                key={person}
                style={{
                  height: '125px',
                  borderRadius: '14px',
                  background: i === 0 && !camOn ? '#1e293b' : 'linear-gradient(135deg, #0f172a, #1d4ed8)',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '1.6rem' }}>{i === 0 && !camOn ? '📷' : '🧑🏽‍✈️'}</div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '0.25rem' }}>{person}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setMicOn(!micOn)}>
              {micOn ? <Mic size={16} /> : <MicOff size={16} />} {micOn ? 'Micro ON' : 'Muet'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setCamOn(!camOn)}>
              {camOn ? <Video size={16} /> : <VideoOff size={16} />} {camOn ? 'Cam ON' : 'Cam OFF'}
            </button>
            <form method="dialog">
              <button type="submit" value="end" className="btn btn-danger" autoFocus>
                <PhoneOff size={16} /> Quitter
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};
