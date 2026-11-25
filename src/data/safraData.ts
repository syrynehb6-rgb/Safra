export interface MapPinItem {
  id: string;
  category: 'hotel' | 'shop' | 'service' | 'housing' | 'place' | 'luggage';
  title: string;
  subtitle: string;
  price: string;
  coords: [number, number];
  photo?: string;
}

export interface CountryHotel {
  id: string;
  name: string;
  stars: number;
  pricePerNightTND: number;
  district: string;
  howToReach: string;
  photo: string;
  coords: [number, number];
  hasVideoAd: boolean;
}

export interface BoutiqueArticle {
  id: string;
  name: string;
  category: string;
  sizes: string;
  priceTND: number;
  photo: string;
}

export interface CountryShop {
  id: string;
  name: string;
  boutique: string;
  type: 'Mall' | 'Fripe' | 'Boutique' | 'Medaynin' | 'Khyata';
  address: string;
  priceTND: number;
  deliveryTND: number;
  rating: number;
  photo: string;
  coords: [number, number];
  modestFriendly: boolean;
  insideStores?: string[];
  articles: BoutiqueArticle[];
}

export interface CountryService {
  id: string;
  profession: string;
  categoryIcon: string;
  providerName: string;
  cityArea: string;
  priceLabel: string;
  stars: number;
  verified: boolean;
  languages: string;
  phone: string;
  photo: string;
  coords: [number, number];
  description: string;
}

export interface CountryHousing {
  id: string;
  mode: 'Location' | 'Achat';
  title: string;
  district: string;
  priceLabel: string;
  area: string;
  verified: boolean;
  photo: string;
  coords: [number, number];
}

export interface CountryPlace {
  id: string;
  name: string;
  category: string;
  exactLocation: string;
  howToGo: string;
  entryFee: string;
  tip: string;
  photo: string;
  coords: [number, number];
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  flag: string;
  centerCoords: [number, number];
  heroPhoto: string;
  tagline: string;
  flightFromTunisTND: number;
  hotelPerNightTND: number;
  dailyFoodTransportTND: number;
  visaFeeTND: number;
  recommendedDays: number;
  bestSeason: string;
  visaNote: string;
  hotels: CountryHotel[];
  agencies: {
    name: string;
    rating: number;
    packagePriceTND: number;
    includes: string;
  }[];
  shops: CountryShop[];
  services: CountryService[];
  housing: CountryHousing[];
  places: CountryPlace[];
  guideSteps: string[];
}

export interface TravelBuddyPost {
  id: string;
  countryId: string;
  userName: string;
  avatarColor: string;
  age: number;
  stars: number;
  verified: boolean;
  destination: string;
  date: string;
  lookingFor: string;
  ageRange: string;
  culture: string;
  interests: string[];
  vibe: string;
  note: string;
}

export interface LuggageOffer {
  id: string;
  countryId: string;
  travelerName: string;
  stars: number;
  verified: boolean;
  from: string;
  to: string;
  date: string;
  availableKg: number;
  pricePerKgTND: number;
  accepts: string;
}

export interface SmartTag {
  code: string;
  label: string;
  owner: string;
  status: 'In Transit' | 'Airport Gate' | 'At Hotel' | 'In Taxi';
  battery: number;
  lastSeen: string;
  coords: [number, number];
  routeHistory: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turquie',
    flag: '🇹🇷',
    centerCoords: [41.015, 28.979],
    heroPhoto: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Bosphore, Malls géants, Fripes, Boutiques Medaynin, Médecins & Logements',
    flightFromTunisTND: 980,
    hotelPerNightTND: 145,
    dailyFoodTransportTND: 95,
    visaFeeTND: 0,
    recommendedDays: 6,
    bestSeason: 'Avril – Octobre',
    visaNote: 'Sans visa pour passeport tunisien (90 jours)',
    hotels: [
      {
        id: 'ist-h1',
        name: 'Sirkeci Mansion Boutique',
        stars: 4.7,
        pricePerNightTND: 145,
        district: 'Fatih / Sirkeci (2 min Tram T1)',
        howToReach: 'Bus Havaist HVIST-12 depuis IST jusqu’à Aksaray, puis Tram T1 → Sirkeci.',
        photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
        coords: [41.0128, 28.9772],
        hasVideoAd: true,
      },
      {
        id: 'ist-h2',
        name: 'Taksim Square Residence',
        stars: 4.5,
        pricePerNightTND: 185,
        district: 'Beyoğlu / Taksim',
        howToReach: 'Navette Havaist directe IST → Taksim (50 min).',
        photo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80',
        coords: [41.0369, 28.985],
        hasVideoAd: false,
      },
    ],
    agencies: [
      { name: 'Carthage Voyages Pro', rating: 4.8, packagePriceTND: 2150, includes: 'Vol + 5N Hôtel 4★ + Transfert' },
      { name: 'Medina Tours Tunis', rating: 4.6, packagePriceTND: 1980, includes: 'Vol + 5N Boutique + Croisière Bosphore' },
    ],
    shops: [
      {
        id: 'ist-s1',
        name: 'Abaya Soie de Médine & Hijab',
        boutique: 'Fatih Modest Gallery',
        type: 'Medaynin',
        address: 'Fevzipaşa Cd. No:42, Fatih',
        priceTND: 155,
        deliveryTND: 15,
        rating: 4.9,
        photo: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=80',
        coords: [41.0195, 28.9475],
        modestFriendly: true,
        articles: [
          { id: 'ist-a1', name: 'Abaya Soie de Médine (Noir / Beige)', category: 'Medaynin', sizes: 'S, M, L, XL', priceTND: 155, photo: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80' },
          { id: 'ist-a2', name: 'Ensemble Lin 2 Pièces Modest', category: 'Ensemble', sizes: 'S, M, L', priceTND: 135, photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
          { id: 'ist-a3', name: 'Coffret 3 Hijabs Crêpe Turque', category: 'Accessoires', sizes: 'Unique', priceTND: 65, photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=500&q=80' },
        ],
      },
      {
        id: 'ist-s2',
        name: 'Grand Mall Cevahir (300+ Boutiques)',
        boutique: 'Istanbul Cevahir AVM',
        type: 'Mall',
        address: 'Şişli, Büyükdere Cd.',
        priceTND: 120,
        deliveryTND: 18,
        rating: 4.8,
        photo: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=700&q=80',
        coords: [41.0628, 28.9927],
        modestFriendly: true,
        insideStores: ['LC Waikiki', 'Zara', 'Mango', 'Koton', 'Defacto'],
        articles: [
          { id: 'ist-a4', name: 'Trench Coat Automne (Zara Cevahir)', category: 'Veste', sizes: 'S, M, L', priceTND: 220, photo: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
          { id: 'ist-a5', name: 'Robe Longue Plissée (LC Waikiki)', category: 'Robe', sizes: 'S–XXL', priceTND: 120, photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
          { id: 'ist-a6', name: 'Baskets Urban Comfort (Koton)', category: 'Chaussures', sizes: '36–43', priceTND: 145, photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
        ],
      },
      {
        id: 'ist-s3',
        name: 'Fripe Vintage Kadıköy & Feriköy',
        boutique: 'Moda Vintage Bazaar',
        type: 'Fripe',
        address: 'Kadıköy / Moda',
        priceTND: 45,
        deliveryTND: 12,
        rating: 4.7,
        photo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80',
        coords: [40.9866, 29.0279],
        modestFriendly: true,
        articles: [
          { id: 'ist-a7', name: 'Veste Jean Levi’s Vintage 90s', category: 'Fripe', sizes: 'M, L', priceTND: 65, photo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=80' },
          { id: 'ist-a8', name: 'Pull Laine Oversize Sélection', category: 'Fripe', sizes: 'S–L', priceTND: 45, photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=500&q=80' },
        ],
      },
    ],
    services: [
      {
        id: 'ist-srv1',
        profession: 'Médecin Généraliste (Tbib)',
        categoryIcon: '🩺',
        providerName: 'Dr. Karim Ayadi (Tunisien)',
        cityArea: 'Fatih / Aksaray',
        priceLabel: '140 TND / consultation',
        stars: 5.0,
        verified: true,
        languages: 'Arabe, Français, Turc',
        phone: '+90 532 000 1122',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80',
        coords: [41.0086, 28.9522],
        description: 'Consultation rapide, ordonnance et traduction médicale si tu tombes malade.',
      },
      {
        id: 'ist-srv2',
        profession: 'Femme de Ménage & Baby-sitting',
        categoryIcon: '🧹',
        providerName: 'Amina & Fatma Services',
        cityArea: 'Şişli / Beşiktaş / Fatih',
        priceLabel: '65 TND / demi-journée',
        stars: 4.9,
        verified: true,
        languages: 'Arabe, Turc',
        phone: '+90 535 441 8899',
        photo: 'https://images.unsplash.com/photo-1581578731548-c64646cc6952?auto=format&fit=crop&w=700&q=80',
        coords: [41.049, 28.988],
        description: 'Ménage complet appartement ou Airbnb, repassage et garde d’enfants de confiance.',
      },
      {
        id: 'ist-srv3',
        profession: 'Plombier / Électricien / Dépannage',
        categoryIcon: '🔧',
        providerName: 'Yılmaz Express Teknik',
        cityArea: 'Tout Istanbul',
        priceLabel: '80 TND / intervention',
        stars: 4.8,
        verified: true,
        languages: 'Turc, Anglais',
        phone: '+90 541 223 7700',
        photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80',
        coords: [41.025, 29.005],
        description: 'Intervention en moins de 45 min pour fuite d’eau, climatisation ou serrurerie.',
      },
    ],
    housing: [
      {
        id: 'ist-ho1',
        mode: 'Location',
        title: 'Appartement S+2 Meublé Moderne',
        district: 'Şişli (3 min Métro M2)',
        priceLabel: '1,650 TND / mois',
        area: '85 m² · Fibre + Clim',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80',
        coords: [41.057, 28.985],
      },
      {
        id: 'ist-ho2',
        mode: 'Achat',
        title: 'Appartement Neuf Résidence Sécurisée',
        district: 'Beylikdüzü / Başakşehir',
        priceLabel: '295,000 TND (Achat)',
        area: '110 m² · S+2',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80',
        coords: [41.004, 28.902],
      },
    ],
    places: [
      {
        id: 'ist-p1',
        name: 'Sultanahmet & Sainte-Sophie',
        category: 'Histoire',
        exactLocation: 'Place Sultanahmet, Fatih',
        howToGo: 'Tram T1 → Arrêt Sultanahmet',
        entryFee: '25 EUR (Galerie) / Esplanade Gratuite',
        tip: 'Y aller à 8h30 pour éviter la foule.',
        photo: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=700&q=80',
        coords: [41.0086, 28.9802],
      },
      {
        id: 'ist-p2',
        name: 'Ortaköy & Pont du Bosphore',
        category: 'Vue & Street Food',
        exactLocation: 'Beşiktaş Waterfront',
        howToGo: 'Tram T1 Kabataş → Bus 22',
        entryFee: 'Gratuit (Kumpir ~180 TRY)',
        tip: 'Magique au coucher du soleil.',
        photo: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=700&q=80',
        coords: [41.0473, 29.0268],
      },
    ],
    guideSteps: [
      'Achète une Istanbulkart dès l’aéroport IST pour métro, tram et ferry.',
      'Change ton argent à Grand Bazaar ou Laleli pour les meilleurs taux.',
      'Utilise BiTaksi ou Uber pour des trajets sans surprise.',
    ],
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    centerCoords: [48.8566, 2.3522],
    heroPhoto: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Champs-Élysées, Fripes Guerrisol, Médecins Doctolib, Logements & Communauté',
    flightFromTunisTND: 890,
    hotelPerNightTND: 260,
    dailyFoodTransportTND: 140,
    visaFeeTND: 320,
    recommendedDays: 5,
    bestSeason: 'Mai – Septembre',
    visaNote: 'Visa Schengen requis (TLScontact Tunis)',
    hotels: [
      {
        id: 'par-h1',
        name: 'Hôtel Belleville Charm',
        stars: 4.5,
        pricePerNightTND: 260,
        district: '11e Arr. (Métro Couronnes)',
        howToReach: 'RER B depuis CDG → Châtelet, puis Métro Ligne 11.',
        photo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80',
        coords: [48.8692, 2.3797],
        hasVideoAd: true,
      },
    ],
    agencies: [
      { name: 'Horizon Bleu Travel', rating: 4.7, packagePriceTND: 2690, includes: 'Vol + 4N Hôtel + Pass Navigo' },
      { name: 'Tunisie Evasion', rating: 4.5, packagePriceTND: 2490, includes: 'Vol + 4N Hôtel + Croisière Seine' },
    ],
    shops: [
      {
        id: 'par-s1',
        name: 'Guerrisol Fripe Vintage',
        boutique: 'Guerrisol Barbès',
        type: 'Fripe',
        address: '19 Av. de Clichy / Barbès',
        priceTND: 55,
        deliveryTND: 15,
        rating: 4.8,
        photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80',
        coords: [48.8837, 2.3496],
        modestFriendly: true,
        articles: [
          { id: 'par-a1', name: 'Manteau Laine Vintage Paris', category: 'Fripe', sizes: 'M, L', priceTND: 85, photo: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
          { id: 'par-a2', name: 'Chemise Soie & Coton Sélection', category: 'Fripe', sizes: 'S, M', priceTND: 55, photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=500&q=80' },
        ],
      },
      {
        id: 'par-s2',
        name: 'Westfield Forum des Halles',
        boutique: 'Châtelet Mall',
        type: 'Mall',
        address: '101 Porte Berger, 75001 Paris',
        priceTND: 220,
        deliveryTND: 20,
        rating: 4.7,
        photo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=700&q=80',
        coords: [48.862, 2.3469],
        modestFriendly: false,
        insideStores: ['Zara Paris', 'Sephora', 'Nike', 'Pull&Bear', 'Uniqlo'],
        articles: [
          { id: 'par-a3', name: 'Coffret Parfum Sephora Paris', category: 'Beauté', sizes: '100 ml', priceTND: 290, photo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80' },
          { id: 'par-a4', name: 'Doudoune Ultra-Légère (Uniqlo)', category: 'Veste', sizes: 'S–XL', priceTND: 220, photo: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
        ],
      },
    ],
    services: [
      {
        id: 'par-srv1',
        profession: 'Médecin Généraliste & SOS',
        categoryIcon: '🩺',
        providerName: 'Dr. Sonia Gharbi (Conventionné)',
        cityArea: 'Paris 11e · République',
        priceLabel: '95 TND (30 EUR)',
        stars: 4.9,
        verified: true,
        languages: 'Français, Arabe',
        phone: '+33 1 42 00 88 11',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
        coords: [48.8675, 2.3638],
        description: 'Rendez-vous rapide même sans carte Vitale, ordonnance et suivi.',
      },
      {
        id: 'par-srv2',
        profession: 'Femme de Ménage / Aide à Domicile',
        categoryIcon: '🧹',
        providerName: 'Samira Propre Service',
        cityArea: 'Paris & Petite Couronne',
        priceLabel: '55 TND / heure',
        stars: 4.95,
        verified: true,
        languages: 'Français, Arabe',
        phone: '+33 6 12 34 56 78',
        photo: 'https://images.unsplash.com/photo-1581578731548-c64646cc6952?auto=format&fit=crop&w=700&q=80',
        coords: [48.848, 2.389],
        description: 'Ménage, état des lieux, repassage et aide aux nouveaux arrivants.',
      },
    ],
    housing: [
      {
        id: 'par-ho1',
        mode: 'Location',
        title: 'Studio Lumineux Proche Métro 7',
        district: 'Villejuif / Paris 13e',
        priceLabel: '2,400 TND / mois',
        area: '26 m² · Équipé',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=700&q=80',
        coords: [48.818, 2.361],
      },
    ],
    places: [
      {
        id: 'par-p1',
        name: 'Tour Eiffel & Trocadéro',
        category: 'Monument',
        exactLocation: 'Champ de Mars, 7e Arr.',
        howToGo: 'Métro Ligne 6 ou 9 → Trocadéro',
        entryFee: 'Esplanade Gratuite / 29 EUR Sommet',
        tip: 'Réserve les billets en ligne 3 semaines avant.',
        photo: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=700&q=80',
        coords: [48.8584, 2.2945],
      },
    ],
    guideSteps: [
      'Prends un Pass Navigo Semaine ou Easy pour le métro et RER.',
      'Profite du partage de bagage Paris ↔ Tunis pour amortir ton billet.',
    ],
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'Émirats Arabes Unis',
    flag: '🇦🇪',
    centerCoords: [25.2048, 55.2708],
    heroPhoto: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Dubai Mall, Burj Khalifa, Logements Expat, Médecins & Opportunités',
    flightFromTunisTND: 1650,
    hotelPerNightTND: 210,
    dailyFoodTransportTND: 130,
    visaFeeTND: 310,
    recommendedDays: 6,
    bestSeason: 'Novembre – Mars',
    visaNote: 'E-Visa Touriste Émirats',
    hotels: [
      {
        id: 'dxb-h1',
        name: 'Rove Downtown / Al Rigga',
        stars: 4.8,
        pricePerNightTND: 210,
        district: 'Deira / Al Rigga (Métro Red Line)',
        howToReach: 'Métro Red Line direct depuis DXB Terminal 1/3.',
        photo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80',
        coords: [25.263, 55.323],
        hasVideoAd: true,
      },
    ],
    agencies: [
      { name: 'Emirates Holidays TN', rating: 4.9, packagePriceTND: 3350, includes: 'Vol + Visa + 5N Hôtel + Desert Safari' },
    ],
    shops: [
      {
        id: 'dxb-s1',
        name: 'The Dubai Mall (1,200 Boutiques)',
        boutique: 'Downtown Dubai Mall',
        type: 'Mall',
        address: 'Financial Centre Rd',
        priceTND: 250,
        deliveryTND: 25,
        rating: 4.95,
        photo: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=700&q=80',
        coords: [25.1972, 55.2796],
        modestFriendly: true,
        insideStores: ['Al-Maha Abayas', 'Zara Dubai', 'Sephora', 'Apple', 'Adidas'],
        articles: [
          { id: 'dxb-a1', name: 'Abaya Prestige Émiratie Broderie Or', category: 'Medaynin', sizes: 'S–XXL', priceTND: 310, photo: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80' },
          { id: 'dxb-a2', name: 'Oud & Musc Royal Coffret', category: 'Parfum', sizes: '50 ml', priceTND: 250, photo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80' },
        ],
      },
    ],
    services: [
      {
        id: 'dxb-srv1',
        profession: 'Médecin & Clinique 24/7',
        categoryIcon: '🩺',
        providerName: 'Al Zahra Medical Express',
        cityArea: 'Al Barsha / Downtown',
        priceLabel: '220 TND / consultation',
        stars: 4.9,
        verified: true,
        languages: 'Arabe, Anglais',
        phone: '+971 4 378 6666',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80',
        coords: [25.118, 55.197],
        description: 'Prise en charge urgente et assurance voyage acceptée.',
      },
    ],
    housing: [
      {
        id: 'dxb-ho1',
        mode: 'Location',
        title: 'Studio Vue Marina (Expat Ready)',
        district: 'Dubai Marina',
        priceLabel: '3,800 TND / mois',
        area: '45 m² · Piscine + Gym',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80',
        coords: [25.08, 55.14],
      },
    ],
    places: [
      {
        id: 'dxb-p1',
        name: 'Burj Khalifa & Fontaines',
        category: 'Landmark',
        exactLocation: 'Downtown Dubai',
        howToGo: 'Métro Red Line → Burj Khalifa/Dubai Mall',
        entryFee: 'Fontaines Gratuites / 179 AED Observatoire',
        tip: 'Spectacle des fontaines toutes les 30 min dès 18h.',
        photo: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80',
        coords: [25.1972, 55.2744],
      },
    ],
    guideSteps: [
      'Achète une carte Nol Silver à l’aéroport pour le métro et les bus.',
      'Utilise Careem pour commander taxis et repas.',
    ],
  },
  {
    id: 'tunis',
    city: 'Tunis',
    country: 'Tunisie',
    flag: '🇹🇳',
    centerCoords: [36.8065, 10.1815],
    heroPhoto: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Médina, Khyata sur-mesure, Fripes, Boutiques Medaynin, Métiers & Logements',
    flightFromTunisTND: 0,
    hotelPerNightTND: 160,
    dailyFoodTransportTND: 65,
    visaFeeTND: 0,
    recommendedDays: 5,
    bestSeason: 'Toute l’année',
    visaNote: 'Pays de départ / Local',
    hotels: [
      {
        id: 'tun-h1',
        name: 'Dar El Medina Boutique',
        stars: 4.8,
        pricePerNightTND: 175,
        district: 'Médina de Tunis',
        howToReach: 'Taxi Bolt/InDrive depuis Aéroport Tunis-Carthage (15 min).',
        photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
        coords: [36.7989, 10.1706],
        hasVideoAd: true,
      },
    ],
    agencies: [
      { name: 'Safra Local Concierge', rating: 4.9, packagePriceTND: 650, includes: 'Circuit Sidi Bou Saïd + Carthage + Bardo' },
    ],
    shops: [
      {
        id: 'tun-s1',
        name: 'Kaftan & Robes Sur-Mesure (Khyata)',
        boutique: 'Dar El Khayata – Médina',
        type: 'Khyata',
        address: 'Rue de la Kasbah, Médina',
        priceTND: 240,
        deliveryTND: 8,
        rating: 4.95,
        photo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80',
        coords: [36.7975, 10.168],
        modestFriendly: true,
        articles: [
          { id: 'tun-a1', name: 'Kaftan Soie Brodé Sur-Mesure', category: 'Khyata', sizes: 'Sur-mesure', priceTND: 240, photo: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80' },
          { id: 'tun-a2', name: 'Robe Soirée Modest Dentelle', category: 'Medaynin', sizes: '36–48', priceTND: 195, photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
        ],
      },
      {
        id: 'tun-s2',
        name: 'Tunisia Mall & Lac 2 Boutiques',
        boutique: 'Tunisia Mall',
        type: 'Mall',
        address: 'Les Berges du Lac 2',
        priceTND: 145,
        deliveryTND: 8,
        rating: 4.8,
        photo: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=700&q=80',
        coords: [36.8475, 10.268],
        modestFriendly: true,
        insideStores: ['Zara Lac 2', 'Exist', 'Mango', 'Zen', 'Stradivarius'],
        articles: [
          { id: 'tun-a3', name: 'Costume / Blazer Femme Chic (Mango)', category: 'Prêt-à-porter', sizes: 'S–XL', priceTND: 185, photo: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
          { id: 'tun-a4', name: 'Ensemble Casual Coton (Zen)', category: 'Casual', sizes: 'S–XXL', priceTND: 110, photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
        ],
      },
      {
        id: 'tun-s3',
        name: 'Fripe El Hafsia & Ibn Khaldoun',
        boutique: 'Marché El Hafsia',
        type: 'Fripe',
        address: 'El Hafsia, Tunis',
        priceTND: 25,
        deliveryTND: 7,
        rating: 4.7,
        photo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80',
        coords: [36.8012, 10.1665],
        modestFriendly: true,
        articles: [
          { id: 'tun-a5', name: 'Sweat & Hoodie Marques Triées', category: 'Fripe', sizes: 'M, L, XL', priceTND: 25, photo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=80' },
          { id: 'tun-a6', name: 'Chaussures Sport Occasion Neuve', category: 'Fripe', sizes: '38–44', priceTND: 55, photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
        ],
      },
    ],
    services: [
      {
        id: 'tun-srv1',
        profession: 'Femme de Ménage de Confiance',
        categoryIcon: '🧹',
        providerName: 'Amina Kh. (Vérifiée CIN)',
        cityArea: 'Grand Tunis (Lac, Menzah, Marsa)',
        priceLabel: '45 TND / intervention',
        stars: 4.95,
        verified: true,
        languages: 'Arabe, Français',
        phone: '+216 22 000 111',
        photo: 'https://images.unsplash.com/photo-1581578731548-c64646cc6952?auto=format&fit=crop&w=700&q=80',
        coords: [36.842, 10.215],
        description: 'Ménage, cuisine maison et repassage. Profil vérifié par carte d’identité.',
      },
      {
        id: 'tun-srv2',
        profession: 'Médecin à Domicile / Cabinet',
        categoryIcon: '🩺',
        providerName: 'Dr. Mehdi Ben Amor',
        cityArea: 'Centre Urbain Nord',
        priceLabel: '70 TND / consultation',
        stars: 4.9,
        verified: true,
        languages: 'Arabe, Français, Anglais',
        phone: '+216 71 000 222',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80',
        coords: [36.846, 10.197],
        description: 'Consultation rapide avec déplacement possible.',
      },
    ],
    housing: [
      {
        id: 'tun-ho1',
        mode: 'Location',
        title: 'Appartement S+2 Haut Standing',
        district: 'Les Berges du Lac 2',
        priceLabel: '1,800 TND / mois',
        area: '105 m² · Résidence gardée',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80',
        coords: [36.846, 10.264],
      },
    ],
    places: [
      {
        id: 'tun-p1',
        name: 'Sidi Bou Saïd',
        category: 'Patrimoine',
        exactLocation: 'Banlieue Nord de Tunis',
        howToGo: 'Train TGM → Sidi Bou Saïd',
        entryFee: 'Gratuit',
        tip: 'Thé aux pignons au Café des Délices face à la mer.',
        photo: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=700&q=80',
        coords: [36.8705, 10.3474],
      },
    ],
    guideSteps: [
      'Utilise Bolt ou InDrive pour tes déplacements rapides à Tunis.',
      'Explore les boutiques de khyata sur-mesure à la Médina.',
    ],
  },
  {
    id: 'rome',
    city: 'Rome',
    country: 'Italie',
    flag: '🇮🇹',
    centerCoords: [41.9028, 12.4964],
    heroPhoto: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Colisée, Via del Corso, Médecins, Logements étudiants & Street Food',
    flightFromTunisTND: 640,
    hotelPerNightTND: 195,
    dailyFoodTransportTND: 110,
    visaFeeTND: 320,
    recommendedDays: 4,
    bestSeason: 'Avril – Juin, Septembre',
    visaNote: 'Visa Schengen requis',
    hotels: [
      {
        id: 'rom-h1',
        name: 'Hotel Contilia Termini',
        stars: 4.4,
        pricePerNightTND: 195,
        district: 'Esquilino (3 min Termini)',
        howToReach: 'Train Leonardo Express depuis Fiumicino (14 EUR).',
        photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
        coords: [41.8986, 12.5011],
        hasVideoAd: false,
      },
    ],
    agencies: [
      { name: 'Roma Express Tunis', rating: 4.6, packagePriceTND: 1790, includes: 'Vol + 3N Hôtel + Pass Colisée' },
    ],
    shops: [
      {
        id: 'rom-s1',
        name: 'Galleria Alberto Sordi & Via del Corso',
        boutique: 'Via del Corso Mall',
        type: 'Mall',
        address: 'Piazza Colonna, Rome',
        priceTND: 160,
        deliveryTND: 20,
        rating: 4.7,
        photo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=700&q=80',
        coords: [41.9006, 12.481],
        modestFriendly: false,
        insideStores: ['OVS Italia', 'Zara Roma', 'Benetton', 'Geox'],
        articles: [
          { id: 'rom-a1', name: 'Sac Cuir Italien Artisanal', category: 'Accessoires', sizes: 'Unique', priceTND: 190, photo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80' },
          { id: 'rom-a2', name: 'Mocassins Cuir (Geox Roma)', category: 'Chaussures', sizes: '37–44', priceTND: 160, photo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
        ],
      },
    ],
    services: [
      {
        id: 'rom-srv1',
        profession: 'Médecin & Traducteur Médical',
        categoryIcon: '🩺',
        providerName: 'Centro Medico Roma Termini',
        cityArea: 'Termini / Centro',
        priceLabel: '110 TND / visite',
        stars: 4.8,
        verified: true,
        languages: 'Italien, Français, Anglais',
        phone: '+39 06 440 0199',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80',
        coords: [41.901, 12.502],
        description: 'Prise en charge rapide des touristes et étudiants.',
      },
    ],
    housing: [
      {
        id: 'rom-ho1',
        mode: 'Location',
        title: 'Chambre Étudiante / Studio',
        district: 'San Lorenzo (Proche Sapienza)',
        priceLabel: '1,950 TND / mois',
        area: '30 m² · Wi-Fi',
        verified: true,
        photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=700&q=80',
        coords: [41.898, 12.515],
      },
    ],
    places: [
      {
        id: 'rom-p1',
        name: 'Colisée & Forum Romain',
        category: 'Histoire',
        exactLocation: 'Piazza del Colosseo',
        howToGo: 'Métro Ligne B → Colosseo',
        entryFee: '18 EUR',
        tip: 'Remplis ta gourde gratuitement aux fontaines Nasone.',
        photo: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=700&q=80',
        coords: [41.8902, 12.4922],
      },
    ],
    guideSteps: [
      'Prends le bus Terravision (6 EUR) depuis Fiumicino vers Termini.',
      'Valide toujours ton ticket dans le bus/tram.',
    ],
  },
];

export const TRAVEL_BUDDIES: TravelBuddyPost[] = [
  {
    id: 'b1',
    countryId: 'istanbul',
    userName: 'Youssef Ben Ali',
    avatarColor: '#0ea5e9',
    age: 26,
    stars: 4.9,
    verified: true,
    destination: 'Istanbul, Turquie',
    date: '21 Août',
    lookingFor: 'Groupe de 2–4 amis',
    ageRange: '22 – 30 ans',
    culture: 'Tunisien / Chill & Respectueux',
    interests: ['Street Food', 'Photographie', 'Bosphorus', 'Histoire'],
    vibe: 'Aventure & Découverte',
    note: 'Msefer le 21 Août l Istanbul wahdi, nlawj ala 2 wala 3 s’hab nafs el jaw w tokhmem qrib bsh naamlou programme mezyen.',
  },
  {
    id: 'b2',
    countryId: 'istanbul',
    userName: 'Meriem Khelifi',
    avatarColor: '#ec4899',
    age: 24,
    stars: 5.0,
    verified: true,
    destination: 'Istanbul, Turquie',
    date: '21 Août',
    lookingFor: '1–2 Filles (Bnet)',
    ageRange: '21 – 28 ans',
    culture: 'Tunisienne / Modest & Friendly',
    interests: ['Shopping Modest', 'Cafés', 'Bosphorus', 'Musées'],
    vibe: 'Shopping, Photos & Détente',
    note: 'Nheb bnet mte3 jaw behi w respect, nshoufo boutiques medaynin f Fatih w Cevahir.',
  },
  {
    id: 'b3',
    countryId: 'paris',
    userName: 'Amine Trabelsi',
    avatarColor: '#8b5cf6',
    age: 29,
    stars: 4.8,
    verified: true,
    destination: 'Paris, France',
    date: '14 Septembre',
    lookingFor: '1 Compagnon',
    ageRange: '25 – 34 ans',
    culture: 'Tech & Art Lover',
    interests: ['Musées', 'Fripes', 'Architecture', 'Tech'],
    vibe: 'Culture & Budget-Smart',
    note: 'Nlawj ala wehd yheb l’art w fripes Guerrisol, npartagiw chambre qriba lel metro.',
  },
  {
    id: 'b4',
    countryId: 'dubai',
    userName: 'Sarra Mansouri',
    avatarColor: '#f59e0b',
    age: 27,
    stars: 4.9,
    verified: true,
    destination: 'Dubai, Émirats',
    date: '05 Novembre',
    lookingFor: 'Groupe 3–5 personnes',
    ageRange: '24 – 32 ans',
    culture: 'Entrepreneur / Positif',
    interests: ['Desert Safari', 'Business', 'Malls', 'Plage'],
    vibe: 'Networking & Fun',
    note: 'Safra l Dubai 6 ayem, nlawj ala nes motivée nshoufo Dubai Mall w desert safari mabadhna.',
  },
];

export const LUGGAGE_OFFERS: LuggageOffer[] = [
  {
    id: 'l1',
    countryId: 'paris',
    travelerName: 'Skander Gharbi',
    stars: 4.95,
    verified: true,
    from: 'Paris (CDG) 🇫🇷',
    to: 'Tunis (TUN) 🇹🇳',
    date: '28 Août',
    availableKg: 4,
    pricePerKgTND: 35,
    accepts: 'Vêtements, cosmétiques, petits colis (non-fragile)',
  },
  {
    id: 'l2',
    countryId: 'istanbul',
    travelerName: 'Ines Bouazizi',
    stars: 4.85,
    verified: true,
    from: 'Istanbul (IST) 🇹🇷',
    to: 'Tunis (TUN) 🇹🇳',
    date: '24 Août',
    availableKg: 3,
    pricePerKgTND: 30,
    accepts: 'Prêt-à-porter, robes modestes, accessoires',
  },
  {
    id: 'l3',
    countryId: 'tunis',
    travelerName: 'Mehdi Jaziri',
    stars: 4.75,
    verified: true,
    from: 'Tunis (TUN) 🇹🇳',
    to: 'Lyon (LYS) 🇫🇷',
    date: '02 Septembre',
    availableKg: 2,
    pricePerKgTND: 32,
    accepts: 'Documents, épices emballées, cadeaux famille',
  },
];

export const INITIAL_SMART_TAGS: SmartTag[] = [
  {
    code: 'SFR-TAG-8842',
    label: 'Valise Principale Samsonite 23kg',
    owner: 'Moi (Vérifié CIN)',
    status: 'Airport Gate',
    battery: 92,
    lastSeen: 'Aéroport Istanbul (IST) · Terminal Arrivées Porte 4',
    coords: [41.2752, 28.7519],
    routeHistory: [
      '08:15 — Domicile (Tunis)',
      '09:42 — Tunis-Carthage Gate B2',
      '17:55 — Atterrissage Istanbul (IST) · Verrouillé',
    ],
  },
  {
    code: 'SFR-TAG-3109',
    label: 'Sac Cabine Business',
    owner: 'Moi (Vérifié CIN)',
    status: 'At Hotel',
    battery: 78,
    lastSeen: 'Sirkeci Mansion Boutique · Fatih',
    coords: [41.0128, 28.9772],
    routeHistory: [
      '14:10 — Check-in Hôtel',
      '18:18 — Chambre 304 (Signal actif)',
    ],
  },
];
