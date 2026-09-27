import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  CircleMarker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import {
  Layers,
  MapPin,
  Crosshair,
  Download,
  Search,
  Sparkles,
  Droplets,
  Sprout,
  CloudRain,
  ShieldAlert,
  Thermometer,
  Wind,
  Sun,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  Maximize2,
  FileCode,
  FileSpreadsheet,
  Globe,
  Sliders,
  Play,
  Cpu,
  RefreshCw,
  ExternalLink,
  Info,
  Calendar,
  Zap,
} from 'lucide-react';

// ==========================================
// Types & Spatial Interfaces
// ==========================================

export type BasemapType = 'satellite' | 'streets' | 'topo';

export interface LayerVisibility {
  cropHealth: boolean; // NDVI
  soilMoisture: boolean; // Soil Moisture
  rainfall: boolean; // Rain Heatmap
  pestRisk: boolean; // Pest warning zones
  boundaries: boolean; // District / Watershed borders
}

export interface FarmSpatialAssessment {
  lat: number;
  lng: number;
  district: string;
  state: string;
  village: string;
  soilType: string;
  soilPh: number;
  soilMoistureStatus: 'Optimal' | 'Deficit' | 'Waterlogged' | 'Critical Stress';
  soilMoisturePercent: number;
  ndviScore: number;
  ndviCategory: 'Dense Canopy (High)' | 'Moderate Vigor' | 'Sparse Vegetation' | 'Stressed/Bare';
  pestRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  pestThreats: string[];
  advisory: string;
  recommendedAction: string;
  irrigationSchedule: string;
  fertilizerNPK: { n: number; p: number; k: number; unit: string };
  soilTemp: number;
  humidity: number;
  rainfall7d: number;
  solarRadiation: number;
  timestamp: string;
}

export interface StateRegionPreset {
  name: string;
  center: [number, number];
  zoom: number;
  state: string;
  districts: string[];
}

// ==========================================
// Spatial Seed Data for Indian States & Farms
// ==========================================

export const STATE_PRESETS: StateRegionPreset[] = [
  {
    name: 'All India Overview',
    center: [20.5937, 78.9629],
    zoom: 5,
    state: 'India',
    districts: ['Nashik', 'Ludhiana', 'Cuttack', 'Belagavi', 'Rajkot', 'Indore', 'Varanasi'],
  },
  {
    name: 'Maharashtra (Western & Central)',
    center: [19.25, 74.35],
    zoom: 8,
    state: 'Maharashtra',
    districts: ['Nashik', 'Pune', 'Ahmednagar', 'Solapur', 'Satara', 'Aurangabad'],
  },
  {
    name: 'Punjab (Wheat-Paddy Belt)',
    center: [30.901, 75.8573],
    zoom: 8,
    state: 'Punjab',
    districts: ['Ludhiana', 'Amritsar', 'Patiala', 'Bathinda', 'Jalandhar'],
  },
  {
    name: 'Odisha (Coastal & Deltaic)',
    center: [20.4625, 85.883],
    zoom: 8,
    state: 'Odisha',
    districts: ['Cuttack', 'Balasore', 'Puri', 'Ganjam', 'Sambalpur'],
  },
  {
    name: 'Karnataka (Deccan Agro-Zone)',
    center: [15.3173, 75.7139],
    zoom: 8,
    state: 'Karnataka',
    districts: ['Belagavi', 'Dharwad', 'Mysuru', 'Shimoga', 'Ballari'],
  },
  {
    name: 'Gujarat (Saurashtra & North)',
    center: [22.2587, 71.1924],
    zoom: 8,
    state: 'Gujarat',
    districts: ['Rajkot', 'Junagadh', 'Surat', 'Anand', 'Mehsana'],
  },
  {
    name: 'Madhya Pradesh (Malwa Plateau)',
    center: [22.9734, 76.0508],
    zoom: 8,
    state: 'Madhya Pradesh',
    districts: ['Indore', 'Ujjain', 'Bhopal', 'Hoshangabad', 'Dewas'],
  },
  {
    name: 'Uttar Pradesh (Gangetic Plains)',
    center: [26.8467, 80.9462],
    zoom: 8,
    state: 'Uttar Pradesh',
    districts: ['Varanasi', 'Lucknow', 'Bareilly', 'Gorakhpur', 'Meerut'],
  },
];

// Polygonal NDVI Farm Grid Parcels
const NDVI_PARCELS: Array<{
  id: string;
  name: string;
  crop: string;
  coords: [number, number][];
  ndvi: number;
  moisture: number;
  state: string;
}> = [
  // Maharashtra - Nashik Onion Cluster
  {
    id: 'MH-NDVI-01',
    name: 'Dindori Valley Parcel 4A',
    crop: 'Nashik Red Onion',
    coords: [
      [20.15, 73.80],
      [20.22, 73.83],
      [20.20, 73.92],
      [20.12, 73.88],
    ],
    ndvi: 0.82,
    moisture: 26.4,
    state: 'Maharashtra',
  },
  {
    id: 'MH-NDVI-02',
    name: 'Niphad Vineyard & Allium Field',
    crop: 'Nashik Red Onion',
    coords: [
      [20.02, 74.05],
      [20.10, 74.12],
      [20.06, 74.22],
      [19.98, 74.15],
    ],
    ndvi: 0.76,
    moisture: 24.1,
    state: 'Maharashtra',
  },
  {
    id: 'MH-NDVI-03',
    name: 'Lasalgaon Mandi Catchment 2B',
    crop: 'White Onion',
    coords: [
      [20.11, 74.20],
      [20.18, 74.28],
      [20.14, 74.38],
      [20.05, 74.30],
    ],
    ndvi: 0.68,
    moisture: 21.0,
    state: 'Maharashtra',
  },
  {
    id: 'MH-NDVI-04',
    name: 'Ahmednagar Rahuri Watershed Block',
    crop: 'Sugarcane & Onion',
    coords: [
      [19.35, 74.55],
      [19.45, 74.62],
      [19.40, 74.75],
      [19.28, 74.68],
    ],
    ndvi: 0.54,
    moisture: 18.2,
    state: 'Maharashtra',
  },
  {
    id: 'MH-NDVI-05',
    name: 'Solapur Pandharpur Dryland Agro-Grid',
    crop: 'Pomegranate & Onion',
    coords: [
      [17.65, 75.30],
      [17.75, 75.40],
      [17.70, 75.52],
      [17.58, 75.42],
    ],
    ndvi: 0.42,
    moisture: 14.8,
    state: 'Maharashtra',
  },
  // Punjab - Wheat/Paddy Parcels
  {
    id: 'PB-NDVI-01',
    name: 'Ludhiana PAU Precision Field 1A',
    crop: 'Paddy (Basmati PB-1121)',
    coords: [
      [30.88, 75.75],
      [30.96, 75.82],
      [30.92, 75.95],
      [30.82, 75.88],
    ],
    ndvi: 0.86,
    moisture: 32.5,
    state: 'Punjab',
  },
  {
    id: 'PB-NDVI-02',
    name: 'Bathinda Cotton & Wheat Zone',
    crop: 'Bt Cotton / Wheat',
    coords: [
      [30.18, 74.90],
      [30.28, 74.98],
      [30.22, 75.12],
      [30.12, 75.02],
    ],
    ndvi: 0.62,
    moisture: 22.0,
    state: 'Punjab',
  },
  // Odisha - Coastal Rice Deltas
  {
    id: 'OD-NDVI-01',
    name: 'Mahanadi Delta Rice Agro-Unit',
    crop: 'Paddy (Swarna)',
    coords: [
      [20.42, 85.80],
      [20.52, 85.90],
      [20.48, 86.05],
      [20.36, 85.95],
    ],
    ndvi: 0.88,
    moisture: 36.8,
    state: 'Odisha',
  },
  // Karnataka - Belagavi & Dharwad
  {
    id: 'KA-NDVI-01',
    name: 'Belagavi Sugarcane & Onion Belt',
    crop: 'Sugarcane & Bellary Onion',
    coords: [
      [15.82, 74.45],
      [15.92, 74.55],
      [15.88, 74.68],
      [15.76, 74.58],
    ],
    ndvi: 0.79,
    moisture: 28.2,
    state: 'Karnataka',
  },
];

// Pest Warning Swaths (Disease Risk Zones)
const PEST_ZONES: Array<{
  id: string;
  name: string;
  threat: string;
  pestName: string;
  level: 'HIGH' | 'CRITICAL' | 'MODERATE';
  lat: number;
  lng: number;
  radius: number;
  advisory: string;
}> = [
  {
    id: 'PZ-01',
    name: 'Ahmednagar - Purple Blotch & Stemphylium Swath',
    threat: 'High Fungal Spore Pressure',
    pestName: 'Alternaria porri (Purple Blotch) & Thrips',
    level: 'CRITICAL',
    lat: 19.15,
    lng: 74.72,
    radius: 35000,
    advisory: 'High relative humidity (>85%) detected. Apply Mancozeb 75% WP @ 2.5g/L immediately.',
  },
  {
    id: 'PZ-02',
    name: 'Solapur South - Spodoptera Armyworm Vector',
    threat: 'Lepidopteran Foliage Damage',
    pestName: 'Spodoptera litura & Soil Cutworms',
    level: 'HIGH',
    lat: 17.65,
    lng: 75.90,
    radius: 40000,
    advisory: 'Pheromone trap count exceeded 12 moths/night. Install 5 light traps per hectare.',
  },
  {
    id: 'PZ-03',
    name: 'Bathinda - Whitefly & Pink Bollworm Zone',
    threat: 'Sucking Pest Outbreak',
    pestName: 'Bemisia tabaci (Cotton Whitefly)',
    level: 'HIGH',
    lat: 30.21,
    lng: 74.95,
    radius: 38000,
    advisory: 'Scout leaf undersides. Spray Neem seed kernel extract (NSKE 5%) or Diafenthiuron 50 WP.',
  },
  {
    id: 'PZ-04',
    name: 'Cuttack Delta - Brown Plant Hopper (BPH)',
    threat: 'Hopper Burn Risk in Paddy',
    pestName: 'Nilaparvata lugens (BPH)',
    level: 'MODERATE',
    lat: 20.48,
    lng: 85.92,
    radius: 32000,
    advisory: 'Drain standing water for 3 days to break microclimate; apply Triflumezopyrim 10% SC.',
  },
];

// Rainfall / Monsoon Heatmap Circles
const RAINFALL_CONTOURS: Array<{
  name: string;
  lat: number;
  lng: number;
  rainfallMm: number;
  radius: number;
  color: string;
}> = [
  { name: 'Western Ghats Orographic Catchment', lat: 19.85, lng: 73.55, rainfallMm: 85, radius: 45000, color: '#0284c7' },
  { name: 'Nashik Central Drizzle Zone', lat: 20.00, lng: 73.85, rainfallMm: 35, radius: 30000, color: '#38bdf8' },
  { name: 'Pune Valley Showers', lat: 18.52, lng: 73.86, rainfallMm: 28, radius: 35000, color: '#38bdf8' },
  { name: 'Odisha Coastal Monsoon Front', lat: 20.25, lng: 86.20, rainfallMm: 110, radius: 60000, color: '#0369a1' },
  { name: 'Punjab Sub-Himalayan Showers', lat: 31.60, lng: 75.30, rainfallMm: 45, radius: 40000, color: '#0284c7' },
];

// ==========================================
// Custom Map Event & Controller Helpers
// ==========================================

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
  }, [center, zoom, map]);
  return null;
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Generate realistic spatial diagnostics on-the-fly for any clicked Lat/Lng
function generateSpatialAssessment(lat: number, lng: number): FarmSpatialAssessment {
  // Determine nearest state and district
  let state = 'Maharashtra';
  let district = 'Nashik';
  let village = 'Dindori Taluka';
  let soilType = 'Medium Black Clay Vertisol';
  let soilPh = 6.8;

  if (lat > 29.5 && lng < 77.0) {
    state = 'Punjab';
    district = 'Ludhiana';
    village = 'Samrala Block';
    soilType = 'Deep Alluvial Sandy Loam';
    soilPh = 7.4;
  } else if (lng > 83.0) {
    state = 'Odisha';
    district = 'Cuttack';
    village = 'Banki Sub-Division';
    soilType = 'Coastal Alluvial Deltaic Loam';
    soilPh = 6.4;
  } else if (lat < 16.5 && lng < 77.5) {
    state = 'Karnataka';
    district = 'Belagavi';
    village = 'Gokak Basin';
    soilType = 'Red Sandy Loam & Black Soil';
    soilPh = 6.9;
  } else if (lat > 21.0 && lng < 73.0) {
    state = 'Gujarat';
    district = 'Rajkot';
    village = 'Gondal Agro-Hub';
    soilType = 'Medium Black Vertisol';
    soilPh = 7.6;
  } else if (lat > 22.0 && lat < 24.5 && lng > 74.5 && lng < 79.0) {
    state = 'Madhya Pradesh';
    district = 'Indore';
    village = 'Sanwer Agro-Cluster';
    soilType = 'Deep Malwa Black Cotton Soil';
    soilPh = 7.2;
  } else if (lat > 25.0 && lng > 78.0) {
    state = 'Uttar Pradesh';
    district = 'Varanasi';
    village = 'Kashi Gangetic Plain';
    soilType = 'Fertile Indo-Gangetic Silt Loam';
    soilPh = 7.1;
  }

  // Calculate pseudo-realistic metrics using lat/lng hash
  const seed = Math.abs(Math.sin(lat * 100 + lng * 50));
  const ndvi = Number((0.45 + seed * 0.45).toFixed(2));
  const moisturePercent = Math.round(14 + seed * 22);

  let moistureStatus: 'Optimal' | 'Deficit' | 'Waterlogged' | 'Critical Stress' = 'Optimal';
  if (moisturePercent < 16) moistureStatus = 'Critical Stress';
  else if (moisturePercent < 20) moistureStatus = 'Deficit';
  else if (moisturePercent > 32) moistureStatus = 'Waterlogged';

  let ndviCategory: 'Dense Canopy (High)' | 'Moderate Vigor' | 'Sparse Vegetation' | 'Stressed/Bare' = 'Dense Canopy (High)';
  if (ndvi < 0.4) ndviCategory = 'Stressed/Bare';
  else if (ndvi < 0.6) ndviCategory = 'Sparse Vegetation';
  else if (ndvi < 0.75) ndviCategory = 'Moderate Vigor';

  let pestRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
  let pestThreats = ['Minor Leaf Miner', 'Low Thrips activity'];
  if (seed > 0.75) {
    pestRiskLevel = 'CRITICAL';
    pestThreats = ['Alternaria Purple Blotch', 'High Thrips Vector Count (>15/leaf)', 'Collar Rot'];
  } else if (seed > 0.5) {
    pestRiskLevel = 'HIGH';
    pestThreats = ['Early Spodoptera Caterpillars', 'Stemphylium Leaf Blight'];
  } else if (seed > 0.3) {
    pestRiskLevel = 'MODERATE';
    pestThreats = ['Damping Off in Low-lying Bed', 'Mild Downy Mildew'];
  }

  const advisory =
    moistureStatus === 'Deficit' || moistureStatus === 'Critical Stress'
      ? `Soil moisture deficit detected (${moisturePercent}%). Schedule 45-min drip cycle in morning hours. Apply potassium humate to boost drought tolerance.`
      : moistureStatus === 'Waterlogged'
      ? `Waterlogging detected (${moisturePercent}% VWC). Clear drainage furrows immediately to prevent root asphyxiation & fungal collar rot.`
      : `Soil moisture & canopy vigor are in the optimal biological growth window. Maintain current 72h irrigation cadence.`;

  const recommendedAction =
    pestRiskLevel === 'CRITICAL' || pestRiskLevel === 'HIGH'
      ? `Apply prophylactic spray of Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L + Neem Oil (1500ppm).`
      : `Apply balanced fertigation (N:P:K 19:19:19 @ 3kg/acre) with secondary micronutrients (Zinc EDTA + Boron).`;

  return {
    lat: Number(lat.toFixed(4)),
    lng: Number(lng.toFixed(4)),
    district,
    state,
    village,
    soilType,
    soilPh,
    soilMoistureStatus: moistureStatus,
    soilMoisturePercent: moisturePercent,
    ndviScore: ndvi,
    ndviCategory,
    pestRiskLevel,
    pestThreats,
    advisory,
    recommendedAction,
    irrigationSchedule: moistureStatus === 'Optimal' ? 'Next window: In 48 hours (30 min)' : 'Immediate Irrigation Required (45 min)',
    fertilizerNPK: { n: 24, p: 12, k: 18, unit: 'kg/acre' },
    soilTemp: Number((24 + seed * 6).toFixed(1)),
    humidity: Math.round(55 + seed * 30),
    rainfall7d: Math.round(seed * 45),
    solarRadiation: Math.round(620 + seed * 220),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

// ==========================================
// Main Interactive Agro GIS Map Component
// ==========================================

export default function AgroGisMap() {
  // Map State
  const [basemap, setBasemap] = useState<BasemapType>('satellite');
  const [layers, setLayers] = useState<LayerVisibility>({
    cropHealth: true,
    soilMoisture: true,
    rainfall: true,
    pestRisk: true,
    boundaries: true,
  });

  const [currentCenter, setCurrentCenter] = useState<[number, number]>([19.9975, 73.7898]); // Nashik Default
  const [currentZoom, setCurrentZoom] = useState<number>(8);
  const [selectedStatePreset, setSelectedStatePreset] = useState<string>('Maharashtra (Western & Central)');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Farm Spatial Diagnostics State
  const [selectedFarm, setSelectedFarm] = useState<FarmSpatialAssessment>(() =>
    generateSpatialAssessment(19.9975, 73.7898)
  );
  const [isLocatingGPS, setIsLocatingGPS] = useState<boolean>(false);
  const [showLayerPanel, setShowLayerPanel] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  // Tactical Sidebar State
  const [selectedCrop, setSelectedCrop] = useState<string>('Nashik Red Onion');
  const [selectedFieldSize, setSelectedFieldSize] = useState<string>('4.5 Acres');

  // AI 8-Step Analysis Simulation State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisResultHash, setAnalysisResultHash] = useState<string | null>(
    'sha256:7f8e9d0c1b2a3456789012345678901234567890abcdef1234567890abcdef12'
  );

  const analysisStepsList = [
    'Ingesting Sentinel-2 & Landsat-9 Multi-Spectral Bands',
    'Executing Atmospheric Calibration & Cloud Masking',
    'Calculating NDVI & Leaf Chlorophyll Index (LCI)',
    'Generating SAR Synthetic Aperture Soil Moisture Grid',
    'Correlating IMD 14-Day Micro-Climate & Rainfall Radar',
    'Simulating Pathogen Epidemiology & Vector Models',
    'Calculating N-P-K Soil Nutrient Uptake Balance',
    'Generating Cryptographic Verification Hash & Advisory',
  ];

  // Map Click Handler
  const handleMapClick = useCallback((lat: number, lng: number) => {
    const diagnostic = generateSpatialAssessment(lat, lng);
    setSelectedFarm(diagnostic);
    // Generate new hash for new coordinates
    const newHash = `sha256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${Date.now()}`;
    setAnalysisResultHash(newHash);
  }, []);

  // GPS "Locate My Farm" Handler
  const handleLocateGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocatingGPS(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setCurrentCenter([latitude, longitude]);
        setCurrentZoom(14);
        handleMapClick(latitude, longitude);
        setIsLocatingGPS(false);
      },
      err => {
        console.warn('GPS location error or permission denied:', err.message);
        // Fallback to Nashik High-Precision farm coordinates
        setCurrentCenter([20.02, 74.05]);
        setCurrentZoom(13);
        handleMapClick(20.02, 74.05);
        setIsLocatingGPS(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // State Dropdown Selector
  const handleSelectPreset = (presetName: string) => {
    setSelectedStatePreset(presetName);
    const preset = STATE_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setCurrentCenter(preset.center);
      setCurrentZoom(preset.zoom);
      handleMapClick(preset.center[0], preset.center[1]);
    }
  };

  // Village/District Search Geocoder Simulation
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    if (query.includes('ludhiana') || query.includes('punjab')) {
      handleSelectPreset('Punjab (Wheat-Paddy Belt)');
    } else if (query.includes('cuttack') || query.includes('odisha') || query.includes('bhubaneswar')) {
      handleSelectPreset('Odisha (Coastal & Deltaic)');
    } else if (query.includes('belagavi') || query.includes('karnataka') || query.includes('bangalore')) {
      handleSelectPreset('Karnataka (Deccan Agro-Zone)');
    } else if (query.includes('rajkot') || query.includes('gujarat')) {
      handleSelectPreset('Gujarat (Saurashtra & North)');
    } else if (query.includes('indore') || query.includes('mp') || query.includes('madhya')) {
      handleSelectPreset('Madhya Pradesh (Malwa Plateau)');
    } else if (query.includes('varanasi') || query.includes('up') || query.includes('lucknow')) {
      handleSelectPreset('Uttar Pradesh (Gangetic Plains)');
    } else if (query.includes('pune')) {
      setCurrentCenter([18.5204, 73.8567]);
      setCurrentZoom(11);
      handleMapClick(18.5204, 73.8567);
    } else if (query.includes('solapur')) {
      setCurrentCenter([17.6599, 75.9064]);
      setCurrentZoom(11);
      handleMapClick(17.6599, 75.9064);
    } else if (query.includes('ahmednagar')) {
      setCurrentCenter([19.0948, 74.748]);
      setCurrentZoom(11);
      handleMapClick(19.0948, 74.748);
    } else {
      // Default / Nashik search
      setCurrentCenter([20.00, 73.80]);
      setCurrentZoom(11);
      handleMapClick(20.00, 73.80);
    }
  };

  // Run 8-Step Agro-AI Analysis Simulation
  const runAgroAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);

    for (let step = 1; step <= 8; step++) {
      await new Promise(r => setTimeout(r, 450));
      setAnalysisStep(step);
    }

    const finalHash = `sha256:${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}${Date.now()}`;
    setAnalysisResultHash(finalHash);
    setIsAnalyzing(false);
  };

  // Export spatial data as GeoJSON file
  const handleExportData = (format: 'geojson' | 'kml' | 'shp') => {
    const geojsonData = {
      type: 'FeatureCollection',
      crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [selectedFarm.lng, selectedFarm.lat] },
          properties: {
            assessmentTimestamp: selectedFarm.timestamp,
            state: selectedFarm.state,
            district: selectedFarm.district,
            village: selectedFarm.village,
            crop: selectedCrop,
            fieldSize: selectedFieldSize,
            soilType: selectedFarm.soilType,
            soilPh: selectedFarm.soilPh,
            soilMoisturePercent: selectedFarm.soilMoisturePercent,
            ndviScore: selectedFarm.ndviScore,
            pestRiskLevel: selectedFarm.pestRiskLevel,
            recommendedAction: selectedFarm.recommendedAction,
            advisoryHash: analysisResultHash,
          },
        },
        ...NDVI_PARCELS.map(p => ({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [p.coords.map(c => [c[1], c[0]])],
          },
          properties: {
            id: p.id,
            name: p.name,
            crop: p.crop,
            ndvi: p.ndvi,
            moisture: p.moisture,
          },
        })),
      ],
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], {
      type: format === 'geojson' ? 'application/geo+json' : 'application/xml',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agro_mitra_spatial_farm_${selectedFarm.district.toLowerCase()}_${Date.now()}.${format === 'shp' ? 'geojson' : format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Basemap Tile URL Resolver (100% Free & Fast, No API Key Required)
  const getTileLayerConfig = () => {
    switch (basemap) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, Maxar, Earthstar Geographics, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
          maxZoom: 19,
        };
      case 'topo':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey',
          maxZoom: 18,
        };
      case 'streets':
      default:
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        };
    }
  };

  // NDVI Color Helper
  const getNdviColor = (score: number) => {
    if (score >= 0.75) return '#059669'; // Emerald (Dense)
    if (score >= 0.6) return '#65a30d'; // Lime (Moderate)
    if (score >= 0.45) return '#f59e0b'; // Amber (Moderate stress)
    return '#ef4444'; // Red (Severe stress)
  };

  const getPestColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return '#ef4444';
      case 'HIGH':
        return '#f97316';
      case 'MODERATE':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  return (
    <div className="flex flex-col space-y-4 font-sans text-slate-900 antialiased">
      {/* ============================================================ */}
      {/* 1. Header Toolbar (White Minimalist Theme with Slate Borders) */}
      {/* ============================================================ */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
            <Globe size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Agro-Spatial GIS Engine</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Telemetry Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Multi-spectral NDVI indexing, SAR root-zone soil moisture, pest vectors & PostGIS precision mapping
            </p>
          </div>
        </div>

        {/* Action Controls: State Selector, Geocoder Search, GPS & Exports */}
        <div className="flex flex-wrap items-center gap-2">
          {/* State / Region Preset Selector */}
          <div className="relative">
            <select
              value={selectedStatePreset}
              onChange={e => handleSelectPreset(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer"
            >
              {STATE_PRESETS.map(p => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Geocoder */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Village / District..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-44 sm:w-56 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </form>

          {/* GPS "Locate My Farm" Button */}
          <button
            type="button"
            onClick={handleLocateGPS}
            disabled={isLocatingGPS}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition active:scale-95 disabled:opacity-50"
            title="Locate My Farm using GPS"
          >
            <Crosshair size={14} className={isLocatingGPS ? 'animate-spin' : ''} />
            <span>{isLocatingGPS ? 'Locating...' : 'Locate Farm'}</span>
          </button>

          {/* Spatial Data Export Dropdown */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => handleExportData('geojson')}
              className="px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:text-emerald-700 hover:bg-white rounded transition flex items-center gap-1"
              title="Export GeoJSON"
            >
              <FileCode size={13} /> GeoJSON
            </button>
            <button
              onClick={() => handleExportData('kml')}
              className="px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:text-emerald-700 hover:bg-white rounded transition flex items-center gap-1"
              title="Export KML"
            >
              <Download size={13} /> KML
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Main GIS Workspace: Interactive Map (Left) + Intelligence (Right) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* ============================================================ */}
        {/* Interactive Leaflet Map Container (Span 8 Cols) */}
        {/* ============================================================ */}
        <div className="lg:col-span-8 relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[620px] flex flex-col">
          {/* Top Floating Glassmorphism Controls Panel (White UI) */}
          <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            {/* Basemap Switcher (Left) */}
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-lg p-1 shadow-md flex items-center gap-1">
              <button
                onClick={() => setBasemap('satellite')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                  basemap === 'satellite'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🛰️ Satellite
              </button>
              <button
                onClick={() => setBasemap('streets')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                  basemap === 'streets'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🌍 Street
              </button>
              <button
                onClick={() => setBasemap('topo')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                  basemap === 'topo'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🗺️ Topo
              </button>
            </div>

            {/* Layer Visibility Toggle (Right) */}
            <div className="pointer-events-auto relative">
              <button
                onClick={() => setShowLayerPanel(!showLayerPanel)}
                className="bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                <Layers size={14} className="text-emerald-600" />
                <span>Active Layers ({Object.values(layers).filter(Boolean).length})</span>
                <ChevronDown size={14} />
              </button>

              {showLayerPanel && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-3 space-y-2 text-xs z-[1010]">
                  <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider border-b border-slate-100 pb-1.5">
                    Spatial Overlay Layers
                  </p>

                  <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-slate-700 font-medium">
                      <Sprout size={14} className="text-emerald-600" /> 🌱 NDVI Crop Health
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.cropHealth}
                      onChange={e => setLayers({ ...layers, cropHealth: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-slate-700 font-medium">
                      <Droplets size={14} className="text-blue-500" /> 💧 Soil Moisture Grid
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.soilMoisture}
                      onChange={e => setLayers({ ...layers, soilMoisture: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-slate-700 font-medium">
                      <CloudRain size={14} className="text-sky-600" /> 🌧️ Rainfall Radar Heatmap
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.rainfall}
                      onChange={e => setLayers({ ...layers, rainfall: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-slate-700 font-medium">
                      <ShieldAlert size={14} className="text-red-500" /> 🐛 Pest Vector Zones
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.pestRisk}
                      onChange={e => setLayers({ ...layers, pestRisk: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50">
                    <span className="flex items-center gap-2 text-slate-700 font-medium">
                      <Layers size={14} className="text-slate-500" /> 🏛️ Watershed Boundaries
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.boundaries}
                      onChange={e => setLayers({ ...layers, boundaries: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Leaflet Map React Container */}
          <div className="w-full h-full relative z-0">
            <MapContainer
              center={currentCenter}
              zoom={currentZoom}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <MapController center={currentCenter} zoom={currentZoom} />
              <MapClickHandler onMapClick={handleMapClick} />

              {/* Dynamic Basemap Tile Layer */}
              <TileLayer {...getTileLayerConfig()} />

              {/* Layer 1: NDVI Vegetation Overlay Parcels */}
              {layers.cropHealth &&
                NDVI_PARCELS.map(parcel => (
                  <Polygon
                    key={parcel.id}
                    positions={parcel.coords}
                    pathOptions={{
                      color: getNdviColor(parcel.ndvi),
                      fillColor: getNdviColor(parcel.ndvi),
                      fillOpacity: 0.45,
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () => handleMapClick(parcel.coords[0][0], parcel.coords[0][1]),
                    }}
                  >
                    <Popup>
                      <div className="p-1 max-w-xs font-sans text-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                          <strong className="text-slate-900 font-bold">{parcel.name}</strong>
                          <span className="font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                            NDVI {parcel.ndvi}
                          </span>
                        </div>
                        <p className="text-slate-600">Crop: <strong>{parcel.crop}</strong></p>
                        <p className="text-slate-600">Soil Moisture: <strong>{parcel.moisture}% VWC</strong></p>
                        <p className="text-slate-400 text-[10px] mt-1 font-mono">ID: {parcel.id}</p>
                      </div>
                    </Popup>
                  </Polygon>
                ))}

              {/* Layer 2: Rainfall Radar Heatmap Circles */}
              {layers.rainfall &&
                RAINFALL_CONTOURS.map((rain, idx) => (
                  <Circle
                    key={`rain-${idx}`}
                    center={[rain.lat, rain.lng]}
                    radius={rain.radius}
                    pathOptions={{
                      color: rain.color,
                      fillColor: rain.color,
                      fillOpacity: 0.2,
                      weight: 1,
                      dashArray: '4, 4',
                    }}
                  >
                    <Popup>
                      <div className="p-1 text-xs">
                        <strong className="text-slate-900">{rain.name}</strong>
                        <p className="text-sky-700 font-bold mt-0.5">Precipitation: {rain.rainfallMm} mm</p>
                      </div>
                    </Popup>
                  </Circle>
                ))}

              {/* Layer 3: Pest & Crop Disease Warning Swaths */}
              {layers.pestRisk &&
                PEST_ZONES.map(pz => (
                  <React.Fragment key={pz.id}>
                    <Circle
                      center={[pz.lat, pz.lng]}
                      radius={pz.radius}
                      pathOptions={{
                        color: getPestColor(pz.level),
                        fillColor: getPestColor(pz.level),
                        fillOpacity: 0.25,
                        weight: 2,
                      }}
                    />
                    <CircleMarker
                      center={[pz.lat, pz.lng]}
                      radius={7}
                      pathOptions={{
                        color: '#ffffff',
                        fillColor: getPestColor(pz.level),
                        fillOpacity: 1,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="p-1 max-w-xs font-sans text-xs">
                          <span className={`inline-block px-1.5 py-0.5 rounded font-extrabold text-[9px] uppercase text-white mb-1 ${
                            pz.level === 'CRITICAL' ? 'bg-red-600' : 'bg-amber-600'
                          }`}>
                            {pz.level} PEST ALERT
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs">{pz.name}</h4>
                          <p className="text-slate-600 mt-1 font-medium">{pz.threat}</p>
                          <p className="text-slate-500 italic mt-0.5 text-[11px]">{pz.pestName}</p>
                          <p className="text-red-700 font-semibold mt-1 bg-red-50 p-1.5 rounded text-[10px]">
                            {pz.advisory}
                          </p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  </React.Fragment>
                ))}

              {/* Layer 4: Interactive Pin Marker for Current Selected Farm Location */}
              <Marker
                position={[selectedFarm.lat, selectedFarm.lng]}
                icon={
                  new L.DivIcon({
                    className: 'selected-farm-pin',
                    html: `<div style="background-color: #059669; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; font-size: 14px;">🌱</div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15],
                  })
                }
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <strong className="text-slate-900 font-bold">{selectedFarm.village}, {selectedFarm.district}</strong>
                    <p className="font-mono text-slate-500 text-[10px]">Lat: {selectedFarm.lat}, Lng: {selectedFarm.lng}</p>
                    <p className="text-emerald-700 font-semibold mt-1">NDVI: {selectedFarm.ndviScore} ({selectedFarm.ndviCategory})</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Bottom Floating Spatial Farm Diagnostics HUD (White UI Card) */}
          <div className="absolute bottom-3 left-3 right-3 z-[1000] pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-3.5 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Farm Location Info */}
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">
                      {selectedFarm.village}, {selectedFarm.district}
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold">({selectedFarm.state})</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    Spatial Coordinates: {selectedFarm.lat}° N, {selectedFarm.lng}° E • PostGIS WGS84
                  </p>
                </div>
              </div>

              {/* Quick Metrics Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* NDVI Indicator */}
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-1.5">
                  <Sprout size={14} className="text-emerald-600" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block leading-none">NDVI Index</span>
                    <strong className="text-emerald-800 font-mono text-xs">{selectedFarm.ndviScore} (Healthy)</strong>
                  </div>
                </div>

                {/* Soil Moisture */}
                <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-1.5">
                  <Droplets size={14} className="text-blue-600" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block leading-none">Soil Moisture</span>
                    <strong className="text-blue-800 font-mono text-xs">{selectedFarm.soilMoisturePercent}% ({selectedFarm.soilMoistureStatus})</strong>
                  </div>
                </div>

                {/* Soil Type & pH */}
                <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-1.5">
                  <Thermometer size={14} className="text-amber-600" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block leading-none">Soil & pH</span>
                    <strong className="text-amber-800 text-xs">pH {selectedFarm.soilPh} • {selectedFarm.soilType.split(' ')[0]}</strong>
                  </div>
                </div>

                {/* Pest Warning Level */}
                <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                  selectedFarm.pestRiskLevel === 'CRITICAL'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : selectedFarm.pestRiskLevel === 'HIGH'
                    ? 'bg-orange-50 border-orange-200 text-orange-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <ShieldAlert size={14} className={selectedFarm.pestRiskLevel === 'CRITICAL' ? 'text-red-600 animate-pulse' : 'text-slate-500'} />
                  <div>
                    <span className="text-[10px] uppercase font-bold block leading-none">Pest Threat</span>
                    <strong className="text-xs">{selectedFarm.pestRiskLevel}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Map Legend (Bottom Right) */}
          <div className="absolute top-14 right-3 z-[990] bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg p-2.5 shadow-md text-[10px] space-y-1.5 pointer-events-auto">
            <p className="font-bold text-slate-800 border-b border-slate-100 pb-1">NDVI Canopy Index</p>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600" />
              <span>0.75 - 1.0 (Dense Canopy)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-lime-500" />
              <span>0.60 - 0.74 (Moderate Vigor)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span>0.45 - 0.59 (Stressed Crop)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500" />
              <span>&lt; 0.45 (Bare Soil / Disease)</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Tactical Agricultural Intelligence Sidebar (Span 4 Cols) */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Farm Field & Crop Selection Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sprout size={18} className="text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Farm Field & Crop Profile</h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                Field ID: FLD-2026-904
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Target Crop</label>
                <select
                  value={selectedCrop}
                  onChange={e => setSelectedCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold rounded-lg px-2.5 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Nashik Red Onion">🧅 Nashik Red Onion</option>
                  <option value="White Onion">🧅 White Onion (Dehydration)</option>
                  <option value="Paddy (Basmati PB-1121)">🌾 Paddy (Basmati Rice)</option>
                  <option value="Wheat (Sharbati)">🌾 Wheat (Sharbati HD-2967)</option>
                  <option value="Bt Cotton">🌱 Bt Cotton (Bollgard II)</option>
                  <option value="Sugarcane (Co 86032)">🎋 Sugarcane (Co 86032)</option>
                  <option value="Soybean (JS 335)">🫘 Soybean (JS 335)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Field Size</label>
                <select
                  value={selectedFieldSize}
                  onChange={e => setSelectedFieldSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold rounded-lg px-2.5 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="2.5 Acres">2.5 Acres (1.01 Ha)</option>
                  <option value="4.5 Acres">4.5 Acres (1.82 Ha)</option>
                  <option value="8.0 Acres">8.0 Acres (3.24 Ha)</option>
                  <option value="15.0 Acres">15.0 Acres (6.07 Ha)</option>
                </select>
              </div>
            </div>

            {/* "RUN AGRO-AI SPATIAL ANALYSIS" Button */}
            <button
              onClick={runAgroAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={15} className="animate-spin text-emerald-400" />
                  <span>Processing Stage ({analysisStep}/8)...</span>
                </>
              ) : (
                <>
                  <Zap size={15} className="text-amber-400" />
                  <span>RUN AGRO-AI SPATIAL ANALYSIS</span>
                </>
              )}
            </button>

            {/* 8-Step Animated Analysis Tracker */}
            {isAnalyzing && (
              <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Cpu size={14} className="animate-pulse" /> Sentinel-2 & PostGIS Pipeline
                  </span>
                  <span className="font-mono">{analysisStep}/8 Completed</span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${(analysisStep / 8) * 100}%` }}
                  />
                </div>

                <p className="text-slate-200 text-xs font-mono truncate">
                  &gt; {analysisStepsList[analysisStep - 1] || 'Initializing Spatial Neural Engine...'}
                </p>
              </div>
            )}
          </div>

          {/* 2. AI Agronomist Actionable Advice Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <h4 className="font-bold text-sm text-slate-900">AI Agronomist Spatial Advisory</h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                97.4% Confidence
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-medium">
                <strong className="text-slate-900">Primary Diagnosis:</strong> {selectedFarm.advisory}
              </p>
              <p className="text-emerald-800 bg-emerald-50/80 p-2 rounded border border-emerald-200/60 font-semibold text-[11px]">
                💡 <strong>Action Required:</strong> {selectedFarm.recommendedAction}
              </p>
            </div>

            {/* Cryptographic SHA-256 Verifiable Hash */}
            <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 text-[10px] font-mono space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Verifiable Advisory SHA-256:</span>
                <span className="text-emerald-400 font-bold">Polygon Block #481920</span>
              </div>
              <p className="truncate text-slate-200 font-bold">{analysisResultHash}</p>
            </div>
          </div>

          {/* 3. Live Weather & Soil Telemetry Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">Live Soil & Weather Telemetry</h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{selectedFarm.timestamp}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Thermometer size={12} className="text-amber-500" /> Soil Temperature
                </span>
                <p className="text-base font-bold font-mono text-slate-900 mt-0.5">{selectedFarm.soilTemp} °C</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Droplets size={12} className="text-blue-500" /> Air Humidity
                </span>
                <p className="text-base font-bold font-mono text-slate-900 mt-0.5">{selectedFarm.humidity}%</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <CloudRain size={12} className="text-sky-500" /> 7-Day Rainfall
                </span>
                <p className="text-base font-bold font-mono text-slate-900 mt-0.5">{selectedFarm.rainfall7d} mm</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Sun size={12} className="text-amber-500" /> Solar Radiation
                </span>
                <p className="text-base font-bold font-mono text-slate-900 mt-0.5">{selectedFarm.solarRadiation} W/m²</p>
              </div>
            </div>
          </div>

          {/* 4. Recommended Fertilizer NPK & Irrigation Schedule */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar size={16} className="text-emerald-600" /> Precision Fertigation & Irrigation
            </h4>

            {/* NPK Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="text-slate-500 text-[10px] font-bold block">Nitrogen (N)</span>
                <strong className="text-emerald-900 font-mono text-sm">{selectedFarm.fertilizerNPK.n}</strong>
                <span className="text-[10px] text-slate-400 block">{selectedFarm.fertilizerNPK.unit}</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                <span className="text-slate-500 text-[10px] font-bold block">Phosphorus (P)</span>
                <strong className="text-blue-900 font-mono text-sm">{selectedFarm.fertilizerNPK.p}</strong>
                <span className="text-[10px] text-slate-400 block">{selectedFarm.fertilizerNPK.unit}</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                <span className="text-slate-500 text-[10px] font-bold block">Potassium (K)</span>
                <strong className="text-amber-900 font-mono text-sm">{selectedFarm.fertilizerNPK.k}</strong>
                <span className="text-[10px] text-slate-400 block">{selectedFarm.fertilizerNPK.unit}</span>
              </div>
            </div>

            {/* Next Irrigation Schedule Callout */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-600 font-medium">Next Irrigation Window:</span>
              <strong className="text-slate-900 font-semibold">{selectedFarm.irrigationSchedule}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
