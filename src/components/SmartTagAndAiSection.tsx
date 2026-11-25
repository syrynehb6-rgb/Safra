import React, { useState } from 'react';
import {
  Radar,
  BatteryCharging,
  Lock,
  Bot,
  Sparkles,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { DESTINATIONS, INITIAL_SMART_TAGS, type SmartTag, type MapPinItem } from '../data/safraData';
import { SafraMap } from './SafraMap';

export const SmartTagAndAiSection: React.FC = () => {
  const [tags, setTags] = useState<SmartTag[]>(INITIAL_SMART_TAGS);
  const [selectedTagCode, setSelectedTagCode] = useState<string>(INITIAL_SMART_TAGS[0].code);
  const [newTagCode, setNewTagCode] = useState('');
  const [newTagLabel, setNewTagLabel] = useState('');
  const [orderedTag, setOrderedTag] = useState(false);

  const activeTag = tags.find((t) => t.code === selectedTagCode) ?? tags[0];

  const [salary, setSalary] = useState<number>(2200);
  const [currentSavings, setCurrentSavings] = useState<number>(650);
  const [monthlySavePct, setMonthlySavePct] = useState<number>(22);
  const [targetDestId, setTargetDestId] = useState<string>('istanbul');
  const [userInterest, setUserInterest] = useState<string>('Culture, Shopping Modest & Street Food');

  const targetDest = DESTINATIONS.find((d) => d.id === targetDestId) ?? DESTINATIONS[0];
  const targetBudget =
    targetDest.flightFromTunisTND +
    targetDest.hotelPerNightTND * (targetDest.recommendedDays - 1) +
    targetDest.dailyFoodTransportTND * targetDest.recommendedDays +
    targetDest.visaFeeTND;

  const monthlySaving = Math.max(50, Math.round((salary * monthlySavePct) / 100));
  const remainingNeeded = Math.max(0, targetBudget - currentSavings);
  const monthsToGoal = remainingNeeded === 0 ? 0 : Math.ceil(remainingNeeded / monthlySaving);
  const progressPct = Math.min(100, Math.round((currentSavings / targetBudget) * 100));
  const cheapestAgency = [...targetDest.agencies].sort(
    (a, b) => a.packagePriceTND - b.packagePriceTND
  )[0];
  const cheapestHotel = [...targetDest.hotels].sort(
    (a, b) => a.pricePerNightTND - b.pricePerNightTND
  )[0];

  const luggagePins: MapPinItem[] = tags.map((t) => ({
    id: t.code,
    category: 'luggage',
    title: `${t.label} (${t.code})`,
    subtitle: t.lastSeen,
    price: `Batterie ${t.battery}% · ${t.status}`,
    coords: t.coords,
  }));

  const handlePairTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagCode.trim() || !newTagLabel.trim()) return;
    const created: SmartTag = {
      code: newTagCode.trim().toUpperCase(),
      label: newTagLabel.trim(),
      owner: 'Moi (Vérifié CIN)',
      status: 'In Transit',
      battery: 100,
      lastSeen: 'Synchronisé à l’instant · Signal GPS/BLE Actif',
      coords: [41.022, 28.972],
      routeHistory: ['Maintenant — Tag fixé & verrouillé dans la valise'],
    };
    setTags([created, ...tags]);
    setSelectedTagCode(created.code);
    setNewTagCode('');
    setNewTagLabel('');
  };

  return (
    <section className="animate-in" aria-label="Traceur valise intelligent et Coach IA">
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Smart Luggage Tracker with Live Leaflet Map */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
                <Radar size={13} /> Safra Smart Tag (Anti-Vol / Anti-Perte)
              </span>
              <h2 style={{ fontSize: '1.25rem' }}>Localiser ma valise sur Maps</h2>
            </div>
            <button
              type="button"
              className="btn btn-accent"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
              onClick={() => setOrderedTag(true)}
            >
              {orderedTag ? 'Tag Commandé (49 TND) ✓' : 'Commander Tag (49 TND)'}
            </button>
          </div>

          <div style={{ marginBottom: '0.9rem' }}>
            <SafraMap
              center={activeTag.coords}
              cityLabel={`Valise ${activeTag.code}`}
              pins={luggagePins}
              height={240}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {tags.map((t) => (
              <button
                key={t.code}
                type="button"
                className={t.code === activeTag.code ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ padding: '0.32rem 0.65rem', fontSize: '0.76rem' }}
                onClick={() => setSelectedTagCode(t.code)}
              >
                🧳 {t.code}
              </button>
            ))}
          </div>

          <div
            style={{
              padding: '0.85rem',
              borderRadius: '14px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              marginBottom: '0.9rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <strong>{activeTag.label}</strong>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <span className="badge badge-success">
                  <Lock size={12} /> Fixé & Indétachable
                </span>
                <span className="badge">
                  <BatteryCharging size={12} /> {activeTag.battery}%
                </span>
              </div>
            </div>
            <div style={{ fontSize: '0.83rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.35rem' }}>
              📍 {activeTag.lastSeen}
            </div>
            <ul style={{ margin: '0.55rem 0 0', paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
              {activeTag.routeHistory.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={handlePairTag} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <input
              className="safra-input"
              style={{ flex: '1 1 130px' }}
              placeholder="Code (ex: SFR-TAG-9021)"
              value={newTagCode}
              onChange={(e) => setNewTagCode(e.target.value)}
              required
            />
            <input
              className="safra-input"
              style={{ flex: '2 1 160px' }}
              placeholder="Nom valise"
              value={newTagLabel}
              onChange={(e) => setNewTagLabel(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={15} /> Associer
            </button>
          </form>
        </div>

        {/* Right: AI Financial & Trip Coach */}
        <div className="card">
          <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
            <Bot size={13} /> Guide AI Financier & Coach Safra
          </span>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
            Combien épargner par mois pour réaliser ta Safra ?
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>
            Entre ton salaire, ton épargne actuelle et tes goûts : l’IA calcule ton plan exact et trouve l’offre la moins chère.
          </p>

          <div className="grid-2" style={{ gap: '0.7rem', marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              Salaire mensuel (TND)
              <input
                type="number"
                min={300}
                className="safra-input"
                value={salary}
                onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              />
            </label>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              Argent déjà épargné (TND)
              <input
                type="number"
                min={0}
                className="safra-input"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
              />
            </label>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              Destination souhaitée
              <select
                className="safra-select"
                value={targetDestId}
                onChange={(e) => setTargetDestId(e.target.value)}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.flag} {d.city} ({d.recommendedDays}j)
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              Épargne mensuelle : <strong>{monthlySavePct}%</strong> ({monthlySaving} TND/mois)
              <input
                type="range"
                min={5}
                max={50}
                value={monthlySavePct}
                onChange={(e) => setMonthlySavePct(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.6rem' }}
              />
            </label>
          </div>

          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.85rem' }}>
            Tes centres d’intérêt
            <input
              className="safra-input"
              value={userInterest}
              onChange={(e) => setUserInterest(e.target.value)}
            />
          </label>

          <div
            style={{
              padding: '1rem',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--primary) 12%, var(--surface-2)), color-mix(in srgb, #f59e0b 10%, var(--surface-2)))',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={16} color="var(--primary)" /> Plan d’Épargne IA
              </strong>
              <span className="badge badge-primary">
                {monthsToGoal === 0 ? 'Prêt à partir ! 🎉' : `Dans ${monthsToGoal} mois`}
              </span>
            </div>

            <div style={{ height: '10px', borderRadius: '999px', background: 'var(--border)', overflow: 'hidden', marginBottom: '0.65rem' }}>
              <div
                style={{
                  width: `${progressPct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary), #f59e0b)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <div style={{ fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>
                🎯 <strong>Objectif {targetDest.city} :</strong> {targetBudget.toLocaleString()} TND ({progressPct}% réunis)
              </div>
              <div>
                💰 <strong>Conseil mensuel :</strong> Mets de côté <strong>{monthlySaving} TND / mois</strong> (il te manque {remainingNeeded.toLocaleString()} TND).
              </div>
              <div>
                ✈️ <strong>Agence la moins chère :</strong> {cheapestAgency.name} à <strong>{cheapestAgency.packagePriceTND} TND</strong>.
              </div>
              {cheapestHotel && (
                <div>
                  🏨 <strong>Meilleur hôtel économique :</strong> {cheapestHotel.name} ({cheapestHotel.pricePerNightTND} TND/nuit).
                </div>
              )}
              <div style={{ color: 'var(--primary)', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                <Sparkles size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Personnalisé pour : “{userInterest}”.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
