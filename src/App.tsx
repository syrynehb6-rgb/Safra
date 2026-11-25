import React, { useEffect, useRef, useState } from 'react';
import {
  Compass,
  Users,
  Luggage,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Settings,
  Star,
  Wallet,
  Globe,
} from 'lucide-react';
import { DESTINATIONS, type CountryShop } from './data/safraData';
import { SafraLogo } from './components/SafraLogo';
import { ExploreSection } from './components/ExploreSection';
import { BuddiesAndGroupSection } from './components/BuddiesAndGroupSection';
import { LuggageAndShopSection, type EscrowOrder } from './components/LuggageAndShopSection';
import { SmartTagAndAiSection } from './components/SmartTagAndAiSection';
import { SosAndRelocationSection } from './components/SosAndRelocationSection';
import {
  KycDialog,
  SettingsDialog,
  type ThemeChoice,
} from './components/KycAndSettingsDialogs';
import { OnboardingFlow } from './components/OnboardingFlow';

type TabId = 'explore' | 'buddies' | 'luggage' | 'smart-ai' | 'sos';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('safra_user'));
    } catch {
      return false;
    }
  });
  const [selectedCountryId, setSelectedCountryId] = useState<string>('istanbul');
  const [activeTab, setActiveTab] = useState<TabId>('explore');
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState<string>('');
  const [walletBalance, setWalletBalance] = useState<number>(185);
  const [starsCount, setStarsCount] = useState<number>(48);
  const [escrowOrders, setEscrowOrders] = useState<EscrowOrder[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const selectedDest =
    DESTINATIONS.find((d) => d.id === selectedCountryId) ?? DESTINATIONS[0];

  const [groupMessages, setGroupMessages] = useState([
    {
      id: 'm1',
      sender: 'Youssef',
      text: 'Sbeh el khir l’équipe ! Le 21 Août nchallah l Istanbul, chkoun 3ajbou Sirkeci Mansion ?',
      time: '10:12',
    },
    {
      id: 'm2',
      sender: 'Meriem',
      text: 'Ena 3jebni barcha w qrib lel tram T1 ! Nzidou nchoufou offre Medina Tours.',
      time: '10:15',
    },
  ]);

  const [theme, setTheme] = useState<ThemeChoice>(() => {
    try {
      const saved = localStorage.getItem('color-scheme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'system';
  });

  const kycDialogRef = useRef<HTMLDialogElement>(null);
  const settingsDialogRef = useRef<HTMLDialogElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleChangeTheme = (choice: ThemeChoice) => {
    setTheme(choice);
    const meta = document.querySelector('meta[name="color-scheme"]');
    try {
      if (choice === 'system') {
        localStorage.removeItem('color-scheme');
        if (meta) meta.setAttribute('content', 'light dark');
      } else {
        localStorage.setItem('color-scheme', choice);
        if (meta) meta.setAttribute('content', choice);
      }
    } catch {}
  };

  useEffect(() => {
    if ('closedBy' in HTMLDialogElement.prototype) return;
    const outside = (e: PointerEvent, dialog: HTMLDialogElement) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    const cleanups: (() => void)[] = [];
    for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog[closedby="any"]')) {
      let pressedOutside = false;
      const onDown = (e: PointerEvent) => {
        pressedOutside = outside(e, dialog);
      };
      const onUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e, dialog)) dialog.close();
      };
      dialog.addEventListener('pointerdown', onDown);
      dialog.addEventListener('pointerup', onUp);
      cleanups.push(() => {
        dialog.removeEventListener('pointerdown', onDown);
        dialog.removeEventListener('pointerup', onUp);
      });
    }
    return () => cleanups.forEach((fn) => fn());
  }, [activeTab]);

  const handleShareToGroup = (message: string) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setGroupMessages((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, sender: 'Moi', text: message, time },
    ]);
    showToast('Partagé dans le chat de groupe d’amis !');
  };

  const handleAddToEscrow = (
    shop: CountryShop,
    city: string,
    customItem?: { name: string; priceTND: number }
  ) => {
    const itemName = customItem ? customItem.name : shop.name;
    const itemPrice = customItem ? customItem.priceTND : shop.priceTND;
    setEscrowOrders((prev) => [
      {
        id: `ord-${Date.now()}`,
        name: itemName,
        boutique: shop.boutique,
        city,
        priceTND: itemPrice,
        status: 'Held in Safra Escrow',
      },
      ...prev,
    ]);
    showToast(`"${itemName}" (${itemPrice} TND) ajouté au Panier Escrow !`);
  };

  const handleConfirmPaid = (orderId: string) => {
    setEscrowOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Delivered · Paid' } : o))
    );
    setWalletBalance((w) => w + 10);
    setStarsCount((s) => s + 10);
    showToast('Fonds libérés au voyageur · +10 Étoiles !');
  };

  if (!isAuthenticated) {
    return (
      <OnboardingFlow
        onComplete={(userName, email) => {
          try {
            localStorage.setItem('safra_user', JSON.stringify({ userName, email }));
          } catch {}
          setIsAuthenticated(true);
          showToast(`Bienvenue sur SAFRA, ${userName} !`);
        }}
      />
    );
  }

  const tabs: { id: TabId; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: 'explore', label: `${selectedDest.flag} Explorer ${selectedDest.city}`, shortLabel: 'Explorer', icon: <Compass size={17} /> },
    { id: 'buddies', label: 'Compagnons & Groupe', shortLabel: 'Groupe', icon: <Users size={17} /> },
    { id: 'luggage', label: `Bagages & Escrow (${escrowOrders.length})`, shortLabel: 'Bagages', icon: <Luggage size={17} /> },
    { id: 'smart-ai', label: 'Smart Tag & Coach IA', shortLabel: 'Smart IA', icon: <Radar size={17} /> },
    { id: 'sos', label: 'SOS & Urgences', shortLabel: 'SOS', icon: <ShieldAlert size={17} /> },
  ];

  return (
    <div className="app-shell">
      <header className="glass-header">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.85rem',
          }}
        >
          <SafraLogo size={42} />

          {/* Global Country Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flex: '1 1 240px', maxWidth: '340px' }}>
            <Globe size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            <select
              aria-label="Choisir le pays ou la ville"
              className="safra-select"
              style={{ fontWeight: 700, padding: '0.45rem 0.75rem' }}
              value={selectedCountryId}
              onChange={(e) => {
                setSelectedCountryId(e.target.value);
                setActiveTab('explore');
              }}
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.flag} {d.country} — {d.city}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success" title="Portefeuille Safra">
              <Wallet size={13} /> {walletBalance} TND
            </span>
            <span className="badge badge-accent" title="Points de Confiance">
              <Star size={13} fill="currentColor" /> {starsCount} Étoiles
            </span>
            <button
              type="button"
              className={isVerified ? 'btn btn-ghost' : 'btn btn-primary'}
              style={{ padding: '0.42rem 0.8rem', fontSize: '0.8rem' }}
              onClick={() => kycDialogRef.current?.showModal()}
            >
              <ShieldCheck size={15} />
              {isVerified ? `Vérifié (${verifiedName})` : 'Vérifier CIN / Passeport'}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: '0.45rem 0.65rem' }}
              aria-label="Préférences d'apparence"
              onClick={() => settingsDialogRef.current?.showModal()}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-tabs" aria-label="Modules Safra" style={{ marginTop: '0.65rem', borderTop: '1px solid var(--border)', paddingTop: '0.45rem' }}>
          <div role="tablist" aria-label="Sections principales de Safra">
            {tabs.map((t) => {
              const selected = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  className="safra-tab"
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            right: '1.25rem',
            zIndex: 60,
            padding: '0.75rem 1.1rem',
            borderRadius: '14px',
            background: 'var(--primary)',
            color: '#fff',
            fontWeight: 600,
            boxShadow: '0 12px 30px rgb(0 0 0 / 0.25)',
          }}
        >
          ✓ {toast}
        </div>
      )}

      <main>
        <div role="tabpanel" aria-labelledby="tab-explore" hidden={activeTab !== 'explore'}>
          {activeTab === 'explore' && (
            <ExploreSection
              key={selectedDest.id}
              destination={selectedDest}
              onSelectCountry={(id) => setSelectedCountryId(id)}
              onShareToGroup={handleShareToGroup}
              onAddToEscrow={handleAddToEscrow}
              isVerified={isVerified}
              onRequireVerify={() => kycDialogRef.current?.showModal()}
            />
          )}
        </div>

        <div role="tabpanel" aria-labelledby="tab-buddies" hidden={activeTab !== 'buddies'}>
          {activeTab === 'buddies' && (
            <BuddiesAndGroupSection
              groupMessages={groupMessages}
              onSendGroupMessage={handleShareToGroup}
              isVerified={isVerified}
              onRequireVerify={() => kycDialogRef.current?.showModal()}
            />
          )}
        </div>

        <div role="tabpanel" aria-labelledby="tab-luggage" hidden={activeTab !== 'luggage'}>
          {activeTab === 'luggage' && (
            <LuggageAndShopSection
              walletBalance={walletBalance}
              starsCount={starsCount}
              escrowOrders={escrowOrders}
              countryShops={selectedDest.shops}
              countryCity={selectedDest.city}
              onAddToEscrow={handleAddToEscrow}
              onConfirmPaid={handleConfirmPaid}
              onEarnWalletAndStars={(amt, bonus) => {
                setWalletBalance((w) => w + amt);
                setStarsCount((s) => s + bonus);
                showToast(`+${amt} TND & +${bonus} Étoiles ajoutés !`);
              }}
              isVerified={isVerified}
              onRequireVerify={() => kycDialogRef.current?.showModal()}
            />
          )}
        </div>

        <div role="tabpanel" aria-labelledby="tab-smart-ai" hidden={activeTab !== 'smart-ai'}>
          {activeTab === 'smart-ai' && <SmartTagAndAiSection />}
        </div>

        <div role="tabpanel" aria-labelledby="tab-sos" hidden={activeTab !== 'sos'}>
          {activeTab === 'sos' && (
            <SosAndRelocationSection
              destination={selectedDest}
              isVerified={isVerified}
              onRequireVerify={() => kycDialogRef.current?.showModal()}
            />
          )}
        </div>
      </main>

      <KycDialog
        dialogRef={kycDialogRef}
        isVerified={isVerified}
        onVerifySuccess={(docType, name) => {
          setIsVerified(true);
          setVerifiedName(name);
          setStarsCount((s) => s + 20);
          showToast(`Identité vérifiée (${docType}) · +20 Étoiles !`);
        }}
      />
      <SettingsDialog
        dialogRef={settingsDialogRef}
        theme={theme}
        onChangeTheme={handleChangeTheme}
        onLogout={() => {
          try {
            localStorage.removeItem('safra_user');
          } catch {}
          setIsAuthenticated(false);
        }}
      />

      {/* Mobile Bottom Tab Bar (Figma Travel App Style) */}
      <nav className="bottom-nav" aria-label="Navigation mobile Safra">
        {tabs.map((t) => {
          const selected = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className="bottom-nav-btn"
              aria-selected={selected}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon}
              <span>{t.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
