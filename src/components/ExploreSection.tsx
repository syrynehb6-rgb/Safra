import React, { useRef, useState } from 'react';
import {
  Plane,
  Hotel,
  MapPin,
  Building2,
  Star,
  Navigation,
  Compass,
  Video,
  CheckCircle2,
  Share2,
  ShoppingBag,
  Stethoscope,
  Home,
  Phone,
  ShieldCheck,
  Search,
  Utensils,
  FileCheck,
  Train,
  CreditCard,
  Lightbulb,
  LayoutGrid,
} from 'lucide-react';
import { DESTINATIONS, type Destination, type CountryShop, type MapPinItem } from '../data/safraData';
import { SafePhoto } from './SafePhoto';
import { SafraMap } from './SafraMap';
import { SuperAppToolkit } from './SuperAppToolkit';

interface ExploreSectionProps {
  destination: Destination;
  onSelectCountry: (countryId: string) => void;
  onShareToGroup: (message: string) => void;
  onAddToEscrow: (
    shop: CountryShop,
    city: string,
    customItem?: { name: string; priceTND: number }
  ) => void;
  isVerified: boolean;
  onRequireVerify: () => void;
}

type CountryCategory = 'all' | 'hotels' | 'shops' | 'services' | 'housing' | 'places';

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  destination: dest,
  onSelectCountry,
  onShareToGroup,
  onAddToEscrow,
  isVerified,
  onRequireVerify,
}) => {
  const [origin, setOrigin] = useState('Tunis (TUN)');
  const [days, setDays] = useState<number>(dest.recommendedDays);
  const [category, setCategory] = useState<CountryCategory>('hotels');
  const [showMap, setShowMap] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookedHotel, setBookedHotel] = useState<string | null>(null);
  const [contactedIds, setContactedIds] = useState<string[]>([]);
  const [activeVideoHotel, setActiveVideoHotel] = useState<string>('');
  const [partnerAgencyName, setPartnerAgencyName] = useState<string>('');
  const [partnerSent, setPartnerSent] = useState(false);
  const [activeShop, setActiveShop] = useState<CountryShop | null>(null);
  const [boutiquePartnerSent, setBoutiquePartnerSent] = useState(false);
  const videoDialogRef = useRef<HTMLDialogElement>(null);
  const partnerDialogRef = useRef<HTMLDialogElement>(null);
  const shopDialogRef = useRef<HTMLDialogElement>(null);
  const boutiquePartnerDialogRef = useRef<HTMLDialogElement>(null);

  const sortedHotels = [...dest.hotels].sort(
    (a, b) => a.pricePerNightTND - b.pricePerNightTND
  );
  const sortedAgencies = [...dest.agencies].sort(
    (a, b) => a.packagePriceTND - b.packagePriceTND
  );
  const cheapestHotelPerNight = sortedHotels[0]?.pricePerNightTND ?? dest.hotelPerNightTND;
  const hotelTotal = cheapestHotelPerNight * Math.max(1, days - 1);
  const livingTotal = dest.dailyFoodTransportTND * days;
  const grandTotal = dest.flightFromTunisTND + hotelTotal + livingTotal + dest.visaFeeTND;

  const mapPins: MapPinItem[] = [
    ...dest.hotels.map((h) => ({
      id: h.id,
      category: 'hotel' as const,
      title: h.name,
      subtitle: h.district,
      price: `${h.pricePerNightTND} TND/nuit · ★ ${h.stars}`,
      coords: h.coords,
    })),
    ...dest.shops.map((s) => ({
      id: s.id,
      category: 'shop' as const,
      title: `${s.boutique} (${s.type})`,
      subtitle: s.address,
      price: `${s.priceTND} TND · Livraison ${s.deliveryTND} TND`,
      coords: s.coords,
    })),
    ...dest.services.map((srv) => ({
      id: srv.id,
      category: 'service' as const,
      title: srv.profession,
      subtitle: `${srv.providerName} · ${srv.cityArea}`,
      price: srv.priceLabel,
      coords: srv.coords,
    })),
    ...dest.housing.map((ho) => ({
      id: ho.id,
      category: 'housing' as const,
      title: `${ho.mode}: ${ho.title}`,
      subtitle: ho.district,
      price: ho.priceLabel,
      coords: ho.coords,
    })),
    ...dest.places.map((pl) => ({
      id: pl.id,
      category: 'place' as const,
      title: pl.name,
      subtitle: pl.exactLocation,
      price: pl.entryFee,
      coords: pl.coords,
    })),
  ];

  const q = searchTerm.trim().toLowerCase();
  const showSection = (sec: CountryCategory) => category === 'all' || category === sec;

  const filteredShops = dest.shops.filter(
    (s) =>
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.boutique.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q)
  );
  const filteredServices = dest.services.filter(
    (srv) =>
      !q ||
      srv.profession.toLowerCase().includes(q) ||
      srv.providerName.toLowerCase().includes(q) ||
      srv.description.toLowerCase().includes(q)
  );
  const filteredHousing = dest.housing.filter(
    (h) =>
      !q ||
      h.title.toLowerCase().includes(q) ||
      h.district.toLowerCase().includes(q) ||
      h.mode.toLowerCase().includes(q)
  );

  const quickTiles: {
    id: CountryCategory;
    label: string;
    sub: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'all', label: 'Vue Complète', sub: 'Tout le pays', icon: <LayoutGrid size={18} /> },
    { id: 'hotels', label: 'Hôtels & Agences', sub: `${dest.hotels.length} hôtels · ${dest.agencies.length} agences`, icon: <Hotel size={18} /> },
    { id: 'shops', label: 'Malls, Fripes & Boutiques', sub: `${dest.shops.length} adresses`, icon: <ShoppingBag size={18} /> },
    { id: 'services', label: 'Métiers & Médecins', sub: `${dest.services.length} pros vérifiés`, icon: <Stethoscope size={18} /> },
    { id: 'housing', label: 'Logements', sub: `${dest.housing.length} offres`, icon: <Home size={18} /> },
    { id: 'places', label: 'Lieux & Guide', sub: `${dest.places.length} incontournables`, icon: <Compass size={18} /> },
  ];

  return (
    <section className="animate-in" aria-label={`Tout sur ${dest.city}, ${dest.country}`}>
      {/* Figma-Style Horizontal Country Story Strip */}
      <div className="story-strip" role="group" aria-label="Destinations populaires">
        {DESTINATIONS.map((d) => (
          <button
            key={d.id}
            type="button"
            className="story-pill"
            aria-pressed={d.id === dest.id}
            onClick={() => onSelectCountry(d.id)}
          >
            <img
              src={d.heroPhoto}
              alt=""
              className="story-avatar"
              width={30}
              height={30}
              loading="lazy"
            />
            <span>{d.flag} {d.city}</span>
          </button>
        ))}
      </div>

      {/* Hero Banner with Full-Bleed Overlay Photo + Cost Calculator */}
      <div
        className="card"
        style={{
          marginBottom: '1.15rem',
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, var(--surface)), color-mix(in srgb, #f59e0b 6%, var(--surface)))',
        }}
      >
        <div className="grid-2" style={{ alignItems: 'center', gap: '1.25rem' }}>
          <div className="hero-media">
            <SafePhoto
              src={dest.heroPhoto}
              alt={`${dest.city}, ${dest.country}`}
              fallbackEmoji={dest.flag}
              priority
              height={240}
            />
            <div className="hero-overlay">
              <span className="badge" style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.18)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(6px)', marginBottom: '0.4rem' }}>
                {dest.flag} {dest.country} · {dest.bestSeason}
              </span>
              <h2 style={{ fontSize: '1.65rem', color: '#fff' }}>{dest.city}</h2>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.88)', marginTop: '0.15rem' }}>
                {dest.tagline}
              </p>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Calculateur Budget Safra
                </div>
                <h3 style={{ fontSize: '1.3rem' }}>Estimation pour {days} jours</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }} className="price-num">
                  {grandTotal.toLocaleString()} TND
                </div>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '0.6rem', marginTop: '0.85rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                Départ depuis
                <input
                  className="safra-input"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </label>
              <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                Durée : <strong>{days} jours</strong>
                <input
                  type="range"
                  min={3}
                  max={15}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '0.65rem' }}
                />
              </label>
            </div>

            <div className="grid-4" style={{ marginTop: '0.75rem', gap: '0.5rem' }}>
              <div className="card" style={{ padding: '0.55rem 0.7rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Plane size={12} /> Avion
                </div>
                <strong style={{ fontSize: '0.92rem' }}>{dest.flightFromTunisTND} TND</strong>
              </div>
              <button
                type="button"
                className="card"
                onClick={() => {
                  setCategory('hotels');
                  setTimeout(() => {
                    document.getElementById('hotels-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                style={{
                  padding: '0.55rem 0.7rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderColor: 'color-mix(in srgb, var(--primary) 45%, var(--border))',
                }}
                title="Cliquer pour voir tous les hôtels et agences du moins cher au plus cher"
              >
                <div style={{ fontSize: '0.72rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
                  <Hotel size={12} /> Hôtel (dès {cheapestHotelPerNight} TND/n)
                </div>
                <strong style={{ fontSize: '0.92rem' }}>{hotelTotal} TND</strong>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>Voir hôtels & agences ↓</div>
              </button>
              <div className="card" style={{ padding: '0.55rem 0.7rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Utensils size={12} /> Vie
                </div>
                <strong style={{ fontSize: '0.92rem' }}>{livingTotal} TND</strong>
              </div>
              <div className="card" style={{ padding: '0.55rem 0.7rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FileCheck size={12} /> Visa
                </div>
                <strong style={{ fontSize: '0.92rem' }}>
                  {dest.visaFeeTND === 0 ? 'Gratuit' : `${dest.visaFeeTND} TND`}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Travel Super-App Bento Toolkit (eSIM, Currency, Itinerary, Translator, Vault) */}
      <SuperAppToolkit destination={dest} onShareToGroup={onShareToGroup} />

      {/* Organized Icon Quick-Launcher + Search */}
      <div style={{ marginBottom: '1.1rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.7rem',
          }}
        >
          <h3 style={{ fontSize: '1.05rem', color: 'var(--muted)' }}>
            Accès rapide par catégorie à {dest.city}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', flex: '0 1 auto' }}>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => setShowMap((v) => !v)}
            >
              <MapPin size={15} /> {showMap ? 'Masquer Carte' : 'Afficher Carte'}
            </button>
            <div style={{ position: 'relative', minWidth: '230px' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '0.8rem', color: 'var(--muted)' }} />
              <input
                aria-label={`Rechercher dans ${dest.city}`}
                className="safra-input"
                style={{ paddingLeft: '2.2rem' }}
                placeholder={`Chercher médecin, fripe, abaya...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.trim()) setCategory('all');
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: '0.65rem' }}>
          {quickTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              className="quick-tile"
              aria-pressed={category === tile.id}
              onClick={() => setCategory(tile.id)}
            >
              <span className="icon-box">{tile.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{tile.label}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>{tile.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Interactive Country Map */}
      {showMap && (
        <div style={{ marginBottom: '1.25rem' }}>
          <SafraMap center={dest.centerCoords} cityLabel={`${dest.city}, ${dest.country}`} pins={mapPins} height={310} />
        </div>
      )}

      {/* 1. HOTELS & AGENCIES (SORTED CHEAPEST FIRST) */}
      {showSection('hotels') && (
        <div id="hotels-section" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="icon-box"><Hotel size={18} /></span>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Hôtels & Agences — Du Moins Cher au Plus Cher</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                  Classés par prix croissant pour {days - 1} nuits à {dest.city}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-accent"
              style={{ padding: '0.42rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => {
                setPartnerAgencyName('Nouvelle Agence Partenaire');
                setPartnerSent(false);
                partnerDialogRef.current?.showModal();
              }}
            >
              <Building2 size={15} /> Devenir Agence Partenaire B2B
            </button>
          </div>
          <div className="grid-3">
            {sortedHotels.map((h, idx) => (
              <article key={h.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <div className="media-wrap">
                  <SafePhoto src={h.photo} alt={h.name} fallbackEmoji="🏨" height={170} />
                  {idx === 0 && (
                    <span className="floating-badge-left">#1 Moins Cher</span>
                  )}
                  <span className="floating-badge">
                    <Star size={11} fill="currentColor" color="#fbbf24" /> {h.stars}
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: '1.02rem' }}>{h.name}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                    <MapPin size={12} /> {h.district}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', background: 'var(--surface-2)', padding: '0.55rem', borderRadius: '10px', display: 'flex', gap: '0.4rem' }}>
                  <Train size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }} />
                  <span>{h.howToReach}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div>
                    <strong style={{ color: 'var(--primary)', fontSize: '1.05rem' }}>{h.pricePerNightTND} TND/nuit</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                      Total {days - 1} nuits : {(h.pricePerNightTND * Math.max(1, days - 1)).toLocaleString()} TND
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {h.hasVideoAd && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.76rem' }}
                        onClick={() => {
                          if (!isVerified) {
                            onRequireVerify();
                            return;
                          }
                          setActiveVideoHotel(h.name);
                          videoDialogRef.current?.showModal();
                        }}
                      >
                        <Video size={14} /> Vidéo
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem' }}
                      onClick={() => setBookedHotel(h.name)}
                    >
                      <CheckCircle2 size={14} /> {bookedHotel === h.name ? 'Réservé' : 'Réserver'}
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <article className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <span className="badge badge-primary" style={{ alignSelf: 'flex-start' }}>
                <Building2 size={12} /> Agences de Voyage (Prix Croissant)
              </span>
              {sortedAgencies.map((ag, idx) => (
                <div
                  key={ag.name}
                  style={{
                    padding: '0.7rem',
                    borderRadius: '12px',
                    background: 'var(--surface-2)',
                    border: idx === 0 ? '1.5px solid var(--success)' : '1px solid var(--border)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                    <div>
                      {idx === 0 && (
                        <span className="badge badge-success" style={{ padding: '0.08rem 0.45rem', marginRight: '0.35rem' }}>
                          #1 Moins Chère
                        </span>
                      )}
                      <strong style={{ fontSize: '0.9rem' }}>{ag.name}</strong>
                    </div>
                    <strong style={{ color: 'var(--primary)' }}>{ag.packagePriceTND} TND</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0.25rem 0 0.45rem' }}>
                    {ag.includes} · ★ {ag.rating}
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: '0.28rem 0.6rem', fontSize: '0.74rem' }}
                      onClick={() => {
                        setPartnerAgencyName(ag.name);
                        setPartnerSent(false);
                        partnerDialogRef.current?.showModal();
                      }}
                    >
                      <Phone size={12} /> Contacter / Partenariat
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ padding: '0.28rem 0.6rem', fontSize: '0.74rem' }}
                      onClick={() => onShareToGroup(`Offre ${ag.name} pour ${dest.city} à ${ag.packagePriceTND} TND`)}
                    >
                      <Share2 size={12} /> Groupe
                    </button>
                  </div>
                </div>
              ))}
            </article>
          </div>
        </div>
      )}

      {/* 2. MALLS, FRIPES, BOUTIQUES, MEDAYNIN & KHYATA */}
      {showSection('shops') && filteredShops.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="icon-box"><ShoppingBag size={18} /></span>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Malls, Fripes, Boutiques, Medaynin & Khyata</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                  Entre dans chaque boutique ou mall pour voir tous les vêtements & prix
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-accent"
              style={{ padding: '0.42rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => {
                setBoutiquePartnerSent(false);
                boutiquePartnerDialogRef.current?.showModal();
              }}
            >
              <ShoppingBag size={15} /> Inscrire ma Boutique B2B
            </button>
          </div>
          <div className="grid-3">
            {filteredShops.map((shop) => (
              <article key={shop.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div className="media-wrap">
                  <SafePhoto src={shop.photo} alt={shop.name} fallbackEmoji="🛍️" height={160} />
                  {shop.modestFriendly && (
                    <span className="floating-badge-left">Medaynin ✓</span>
                  )}
                  <span className="floating-badge">
                    <Star size={11} fill="currentColor" color="#fbbf24" /> {shop.rating}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="badge badge-accent">{shop.type}</span>
                  <span className="badge">{shop.articles.length} articles</span>
                </div>
                <div>
                  <strong style={{ fontSize: '1rem' }}>{shop.boutique}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                    <MapPin size={12} /> {shop.address}
                  </div>
                </div>
                {shop.insideStores && shop.insideStores.length > 0 && (
                  <div style={{ fontSize: '0.75rem', background: 'var(--surface-2)', padding: '0.5rem', borderRadius: '10px' }}>
                    <strong>Boutiques dans ce Mall :</strong> {shop.insideStores.join(' · ')}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '0.4rem' }}>
                  <div>
                    <strong style={{ color: 'var(--primary)' }}>Dès {Math.min(...shop.articles.map((a) => a.priceTND))} TND</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>+ {shop.deliveryTND} TND livraison</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '0.42rem 0.8rem', fontSize: '0.78rem' }}
                    onClick={() => {
                      setActiveShop(shop);
                      shopDialogRef.current?.showModal();
                    }}
                  >
                    <ShoppingBag size={14} /> Voir les articles
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 3. ALL PROFESSIONS / MÉTIERS */}
      {showSection('services') && filteredServices.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <span className="icon-box"><Stethoscope size={18} /></span>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Tous les Métiers & Services Vérifiés</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Médecins (Tbib), Femme de ménage, Plombier, Dépannage à {dest.city}</div>
            </div>
          </div>
          <div className="grid-3">
            {filteredServices.map((srv) => {
              const contacted = contactedIds.includes(srv.id);
              return (
                <article key={srv.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <SafePhoto src={srv.photo} alt={srv.profession} fallbackEmoji={srv.categoryIcon} height={160} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="badge badge-primary">{srv.profession}</span>
                    <span className="badge badge-accent"><Star size={11} fill="currentColor" /> {srv.stars}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <strong>{srv.providerName}</strong>
                      {srv.verified && (
                        <span className="badge badge-success" style={{ padding: '0.08rem 0.4rem' }}>
                          <ShieldCheck size={11} /> Vérifié
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                      {srv.cityArea} · Langues : {srv.languages}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{srv.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{srv.priceLabel}</strong>
                    <button
                      type="button"
                      className={contacted ? 'btn btn-ghost' : 'btn btn-primary'}
                      style={{ padding: '0.38rem 0.75rem', fontSize: '0.78rem' }}
                      onClick={() => setContactedIds([...contactedIds, srv.id])}
                    >
                      <Phone size={13} /> {contacted ? srv.phone : 'Contacter'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. HOUSING */}
      {showSection('housing') && filteredHousing.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <span className="icon-box"><Home size={18} /></span>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Logements (Location & Achat)</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Appartements et studios vérifiés à {dest.city}</div>
            </div>
          </div>
          <div className="grid-3">
            {filteredHousing.map((ho) => {
              const contacted = contactedIds.includes(ho.id);
              return (
                <article key={ho.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <SafePhoto src={ho.photo} alt={ho.title} fallbackEmoji="🏠" height={160} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-primary">{ho.mode}</span>
                    {ho.verified && (
                      <span className="badge badge-success">
                        <ShieldCheck size={11} /> Vérifié
                      </span>
                    )}
                  </div>
                  <div>
                    <strong>{ho.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                      <MapPin size={12} /> {ho.district} · {ho.area}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <strong style={{ color: 'var(--primary)' }}>{ho.priceLabel}</strong>
                    <button
                      type="button"
                      className={contacted ? 'btn btn-ghost' : 'btn btn-primary'}
                      style={{ padding: '0.38rem 0.75rem', fontSize: '0.78rem' }}
                      onClick={() => setContactedIds([...contactedIds, ho.id])}
                    >
                      {contacted ? 'Visite demandée ✓' : 'Réserver Visite'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. PLACES & GUIDE */}
      {showSection('places') && (
        <div className="grid-2">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <span className="icon-box"><Navigation size={18} /></span>
              <h3 style={{ fontSize: '1.15rem' }}>Lieux à Visiter & Trajets Exacts</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {dest.places.map((pl) => (
                <article key={pl.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <SafePhoto src={pl.photo} alt={pl.name} fallbackEmoji="📍" height={150} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{pl.name}</strong>
                    <span className="badge">{pl.category}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} /> {pl.exactLocation}
                  </div>
                  <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Train size={13} color="var(--primary)" /> <strong>Trajet :</strong> {pl.howToGo}
                  </div>
                  <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CreditCard size={13} color="var(--accent)" /> <strong>À payer :</strong> {pl.entryFee}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Lightbulb size={13} /> {pl.tip}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <span className="icon-box"><Compass size={18} /></span>
              <h3 style={{ fontSize: '1.15rem' }}>Guide Pratique du Voyageur</h3>
            </div>
            <div className="card">
              <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileCheck size={14} /> {dest.visaNote} · Meilleure période : {dest.bestSeason}
              </p>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {dest.guideSteps.map((step, i) => (
                  <li key={i} style={{ fontSize: '0.88rem' }}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Video Ad Modal */}
      <dialog ref={videoDialogRef} closedby="any" aria-labelledby="hotel-video-title">
        <div style={{ padding: '1.25rem' }}>
          <h1 id="hotel-video-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Video size={20} color="var(--primary)" /> Visite Vidéo — {activeVideoHotel}
          </h1>
          <div
            style={{
              height: '200px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.9rem',
            }}
          >
            <Video size={36} />
            <strong>Visite 360° & Avis vérifiés par les membres Safra</strong>
          </div>
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" autoFocus>Fermer</button>
          </form>
        </div>
      </dialog>

      {/* B2B Agency Partnership / Contact Modal */}
      <dialog ref={partnerDialogRef} closedby="any" aria-labelledby="partner-dialog-title">
        <div style={{ padding: '1.35rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.45rem' }}>
            <Building2 size={13} /> Espace Agences & Partenariat B2B
          </span>
          <h1 id="partner-dialog-title" style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
            {partnerAgencyName}
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>
            Connecte ton agence de voyage à SAFRA pour publier tes offres (vols + hôtels), recevoir des réservations directes et collaborer avec les voyageurs.
          </p>
          {partnerSent ? (
            <div className="card" style={{ background: 'color-mix(in srgb, var(--success) 12%, var(--surface-2))', marginBottom: '0.9rem' }}>
              <strong>✅ Demande enregistrée !</strong> L’équipe SAFRA B2B te contactera pour activer l’accord avec {partnerAgencyName}.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPartnerSent(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.75rem' }}
            >
              <input className="safra-input" required placeholder="Nom de l'agence / Responsable" autoFocus />
              <input className="safra-input" type="email" required placeholder="Email professionnel (contact@agence.tn)" />
              <input className="safra-input" required placeholder="Commission / Tarif préférentiel proposé (ex: -10%)" />
              <button type="submit" className="btn btn-primary">
                Envoyer la demande de partenariat
              </button>
            </form>
          )}
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-ghost">Fermer</button>
          </form>
        </div>
      </dialog>
      {/* Boutique Storefront Modal (Articles & Prices) */}
      <dialog ref={shopDialogRef} closedby="any" aria-labelledby="shop-storefront-title">
        <div style={{ padding: '1.35rem', maxHeight: '82vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '0.3rem' }}>
                {activeShop?.type} · {dest.city}
              </span>
              <h1 id="shop-storefront-title" style={{ fontSize: '1.25rem' }}>
                {activeShop?.boutique}
              </h1>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                📍 {activeShop?.address} · ★ {activeShop?.rating}
              </div>
            </div>
          </div>

          {activeShop?.insideStores && activeShop.insideStores.length > 0 && (
            <div style={{ marginBottom: '0.9rem', padding: '0.65rem', borderRadius: '12px', background: 'var(--surface-2)', fontSize: '0.8rem' }}>
              <strong>🏬 Enseignes présentes dans ce Mall :</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                {activeShop.insideStores.map((st) => (
                  <span key={st} className="badge badge-primary">{st}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1rem' }}>
            {activeShop?.articles.map((art) => (
              <div
                key={art.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  padding: '0.65rem',
                  borderRadius: '14px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <img
                    src={art.photo}
                    alt={art.name}
                    width={58}
                    height={58}
                    style={{ width: 58, height: 58, borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>{art.name}</strong>
                    <div style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                      {art.category} · Tailles : <strong>{art.sizes}</strong>
                    </div>
                    <strong style={{ color: 'var(--primary)', fontSize: '0.92rem' }}>{art.priceTND} TND</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '0.38rem 0.7rem', fontSize: '0.76rem', flexShrink: 0 }}
                  onClick={() => {
                    if (activeShop) {
                      onAddToEscrow(activeShop, dest.city, { name: art.name, priceTND: art.priceTND });
                    }
                  }}
                >
                  + Panier
                </button>
              </div>
            ))}
          </div>

          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-ghost" autoFocus>Fermer</button>
          </form>
        </div>
      </dialog>

      {/* B2B Boutique Onboarding Modal */}
      <dialog ref={boutiquePartnerDialogRef} closedby="any" aria-labelledby="boutique-b2b-title">
        <div style={{ padding: '1.35rem' }}>
          <span className="badge badge-accent" style={{ marginBottom: '0.45rem' }}>
            <ShoppingBag size={13} /> Espace Boutiques & Malls B2B
          </span>
          <h1 id="boutique-b2b-title" style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
            Intégrer ma Boutique sur SAFRA
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '0.9rem' }}>
            Ajoute ton magasin, tes vêtements (prêt-à-porter, medaynin, khyata, fripe) et tes prix pour vendre aux voyageurs et locaux avec paiement garanti Escrow.
          </p>
          {boutiquePartnerSent ? (
            <div className="card" style={{ background: 'color-mix(in srgb, var(--success) 12%, var(--surface-2))', marginBottom: '0.9rem' }}>
              <strong>✅ Demande enregistrée !</strong> Ton espace vendeur SAFRA sera activé sous 24h.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBoutiquePartnerSent(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.75rem' }}
            >
              <input className="safra-input" required placeholder="Nom de la boutique / Mall" autoFocus />
              <input className="safra-input" required placeholder="Ville & Adresse exacte" />
              <input className="safra-input" required placeholder="Catégorie (Medaynin, Khyata, Fripe, Prêt-à-porter...)" />
              <button type="submit" className="btn btn-primary">
                Envoyer mon inscription Boutique
              </button>
            </form>
          )}
          <form method="dialog" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-ghost">Fermer</button>
          </form>
        </div>
      </dialog>
    </section>
  );
};
