import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Map as MapIcon,
  Hotel,
  ShoppingBag,
  Stethoscope,
  Home,
  MapPin,
  Luggage,
  Layers,
} from 'lucide-react';
import type { MapPinItem } from '../data/safraData';

interface SafraMapProps {
  center: [number, number];
  cityLabel: string;
  pins: MapPinItem[];
  height?: number;
}

const CATEGORY_META: Record<
  MapPinItem['category'],
  { emoji: string; label: string; color: string; icon: React.ReactNode }
> = {
  hotel: { emoji: '🏨', label: 'Hôtels', color: '#0284c7', icon: <Hotel size={14} /> },
  shop: { emoji: '🛍️', label: 'Boutiques & Malls', color: '#d97706', icon: <ShoppingBag size={14} /> },
  service: { emoji: '🩺', label: 'Métiers & Médecins', color: '#16a34a', icon: <Stethoscope size={14} /> },
  housing: { emoji: '🏠', label: 'Logements', color: '#7c3aed', icon: <Home size={14} /> },
  place: { emoji: '📍', label: 'Lieux à visiter', color: '#e11d48', icon: <MapPin size={14} /> },
  luggage: { emoji: '🧳', label: 'Ma Valise', color: '#0f172a', icon: <Luggage size={14} /> },
};

export const SafraMap: React.FC<SafraMapProps> = ({
  center,
  cityLabel,
  pins,
  height = 350,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [filter, setFilter] = useState<'all' | MapPinItem['category']>('all');

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom: 12,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const group = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerGroupRef.current = group;

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, 12, { animate: true });
  }, [center]);

  useEffect(() => {
    const group = layerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    const visiblePins =
      filter === 'all' ? pins : pins.filter((p) => p.category === filter);

    for (const pin of visiblePins) {
      const meta = CATEGORY_META[pin.category];
      const icon = L.divIcon({
        className: 'safra-map-pin',
        html: `<div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:${meta.color};color:#fff;border:2.5px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-size:16px;">${meta.emoji}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker(pin.coords, { icon });
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${pin.coords[0]},${pin.coords[1]}`;
      marker.bindPopup(`
        <div style="min-width:190px;font-family:system-ui,sans-serif;">
          <div style="font-size:11px;font-weight:700;color:${meta.color};margin-bottom:2px;">${meta.label}</div>
          <div style="font-weight:700;font-size:14px;margin-bottom:2px;">${pin.title}</div>
          <div style="font-size:12px;color:#475569;margin-bottom:4px;">${pin.subtitle}</div>
          <div style="font-weight:700;font-size:12px;color:#0284c7;margin-bottom:6px;">${pin.price}</div>
          <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:4px 8px;background:#0284c7;color:#fff;border-radius:6px;text-decoration:none;font-size:11px;font-weight:600;">Itinéraire Maps ↗</a>
        </div>
      `);
      marker.addTo(group);
    }
  }, [pins, filter]);

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span className="icon-box">
            <MapIcon size={18} />
          </span>
          <div>
            <strong style={{ fontSize: '1.02rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              Carte Interactive — {cityLabel} <span className="live-dot" aria-hidden="true" />
            </strong>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
              Clique sur un marqueur pour voir les détails et l’itinéraire
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          <button
            type="button"
            className={filter === 'all' ? 'btn btn-primary' : 'btn btn-ghost'}
            style={{ padding: '0.35rem 0.7rem', fontSize: '0.76rem' }}
            onClick={() => setFilter('all')}
          >
            <Layers size={14} /> Tout ({pins.length})
          </button>
          {(Object.keys(CATEGORY_META) as MapPinItem['category'][]).map((cat) => {
            const count = pins.filter((p) => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                type="button"
                className={filter === cat ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ padding: '0.35rem 0.7rem', fontSize: '0.76rem' }}
                onClick={() => setFilter(cat)}
              >
                {CATEGORY_META[cat].icon} {CATEGORY_META[cat].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={containerRef}
        aria-label={`Carte interactive de ${cityLabel}`}
        style={{
          width: '100%',
          height: `${height}px`,
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          zIndex: 1,
        }}
      />
    </div>
  );
};
