import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { regionalRisks } from '@/data/mockData';
import type { RegionalRisk } from '@/types';

// Fix default Leaflet marker icon
const customMarkerIcon = new L.DivIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color: #1a3a2a; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #f59e0b; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px; font-weight: bold;">🧅</span></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface RegionalMapProps {
  onSelectRegion?: (region: RegionalRisk) => void;
  selectedRegion?: string;
}

export default function RegionalMap({ onSelectRegion, selectedRegion }: RegionalMapProps) {
  // Center of Maharashtra
  const position: [number, number] = [19.2, 74.5];

  const getRiskColor = (score: number) => {
    if (score < 30) return '#22c55e'; // Green
    if (score < 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-700">
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full min-h-[400px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {regionalRisks.map(risk => (
          <React.Fragment key={risk.region}>
            <Circle
              center={[risk.lat, risk.lng]}
              radius={risk.totalBatches * 120}
              pathOptions={{
                color: getRiskColor(risk.riskScore),
                fillColor: getRiskColor(risk.riskScore),
                fillOpacity: selectedRegion === risk.region ? 0.5 : 0.25,
                weight: selectedRegion === risk.region ? 3 : 1.5,
              }}
              eventHandlers={{
                click: () => onSelectRegion?.(risk),
              }}
            />
            <Marker
              position={[risk.lat, risk.lng]}
              icon={customMarkerIcon}
              eventHandlers={{
                click: () => onSelectRegion?.(risk),
              }}
            >
              <Popup>
                <div className="p-1 max-w-xs font-sans">
                  <h4 className="font-bold text-gray-900 text-sm">{risk.region} Region</h4>
                  <div className="mt-1 text-xs space-y-1 text-gray-600">
                    <p><strong>Avg Quality Score:</strong> {risk.qualityScore}/100</p>
                    <p><strong>Quality-Risk Score:</strong> <span style={{ color: getRiskColor(risk.riskScore) }}>{risk.riskScore}/100</span></p>
                    <p><strong>Defect Rate:</strong> {risk.defectRate}%</p>
                    <p><strong>Rainfall:</strong> {risk.rainfall} mm | <strong>Humidity:</strong> {risk.humidity}%</p>
                    <p><strong>Satellite Health Index:</strong> {risk.satelliteHealth}/100</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}
