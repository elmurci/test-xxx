import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  coordinates?: [number, number];
  city?: string;
  country?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({ coordinates, city, country }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        attributionControl: false,
      });

      // Add dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    }

    // Remove existing marker
    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    // Add new marker if coordinates are provided
    if (coordinates && coordinates.length === 2) {
      const [lng, lat] = coordinates;
      
      // Create custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 16px;
            height: 16px;
            background: #93a2ff;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(147, 162, 255, 0.6);
            animation: pulse 2s infinite;
          "></div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.7; }
              100% { transform: scale(1); opacity: 1; }
            }
          </style>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      markerRef.current = L.marker([lat, lng], { icon: customIcon })
        .addTo(mapInstanceRef.current);

      // Center map on marker
      mapInstanceRef.current.setView([lat, lng], 4);
    }

    return () => {
      // Cleanup is handled by the outer useEffect
    };
  }, [coordinates]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-48 bg-[#0a0a0a] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      {(!coordinates || coordinates.length !== 2) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-white opacity-50 text-sm">
            Location data not available
          </div>
        </div>
      )}
    </div>
  );
};