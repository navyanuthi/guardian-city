import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { streetLights, facilities, CITY_CENTER_COORDS } from '../data/mockData';
import type { StreetLight, CityFacility } from '../types';

interface CityMapProps {
  onLightClick?: (light: StreetLight) => void;
  onFacilityClick?: (facility: CityFacility) => void;
  showFacilities?: boolean;
  showLights?: boolean;
  height?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

function statusColor(status: string): string {
  if (status === 'Emergency') return '#ef4444';
  if (status === 'Warning') return '#fbbf24';
  return '#10d98a';
}

function facilityColor(type: string): string {
  switch (type) {
    case 'Police Station': return '#3b82f6';
    case 'Hospital': return '#ec4899';
    case 'Fire Station': return '#ef4444';
    case 'Safe Zone': return '#10d98a';
    case 'Danger Zone': return '#f97316';
    default: return '#64748b';
  }
}

export function CityMap({
  onLightClick,
  onFacilityClick,
  showFacilities = true,
  showLights = true,
  height = '400px',
  center = CITY_CENTER_COORDS,
  zoom = 13,
}: CityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, { center: [center.lat, center.lng], zoom, zoomControl: false });
    mapInstance.current = map;

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    if (showLights) {
      streetLights.forEach((light) => {
        const color = statusColor(light.status);
        const pulseClass = light.status === 'Emergency' ? 'marker-pulse-red' : light.status === 'Warning' ? 'marker-pulse' : '';
        const icon = L.divIcon({
          html: `<div class="w-3 h-3 rounded-full ${pulseClass}" style="background:${color};box-shadow:0 0 8px ${color}"></div>`,
          className: 'custom-marker',
          iconSize: [12, 12],
        });
        const marker = L.marker([light.lat, light.lng], { icon }).addTo(map);
        marker.bindPopup(`
          <div style="min-width:200px">
            <div style="font-weight:700;color:#00e5ff;font-size:13px;margin-bottom:4px">${light.id}</div>
            <div style="font-size:12px;color:#94a3b8">${light.name}</div>
            <div style="font-size:11px;color:${color};margin-top:4px">● ${light.status}</div>
            <div style="font-size:11px;color:#64748b;margin-top:4px">Zone: ${light.zone}</div>
            <div style="font-size:11px;color:#64748b">Battery: ${light.battery}% | AI: ${light.aiHealth}%</div>
          </div>
        `);
        if (onLightClick) marker.on('click', () => onLightClick(light));
      });
    }

    if (showFacilities) {
      facilities.forEach((f) => {
        const color = facilityColor(f.type);
        const icon = L.divIcon({
          html: `<div class="w-4 h-4 rounded-sm" style="background:${color};border:2px solid white;box-shadow:0 0 6px ${color}"></div>`,
          className: 'custom-marker',
          iconSize: [16, 16],
        });
        const marker = L.marker([f.lat, f.lng], { icon }).addTo(map);
        marker.bindPopup(`
          <div style="min-width:180px">
            <div style="font-weight:700;color:${color};font-size:13px">${f.name}</div>
            <div style="font-size:11px;color:#94a3b8;margin-top:2px">${f.type}</div>
            <div style="font-size:11px;color:#64748b;margin-top:4px">${f.address}</div>
            <div style="font-size:11px;color:#64748b">${f.phone}</div>
          </div>
        `);
        if (onFacilityClick) marker.on('click', () => onFacilityClick(f));
      });
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapRef} className="w-full rounded-2xl overflow-hidden border border-guardian-border" style={{ height }} />;
}
