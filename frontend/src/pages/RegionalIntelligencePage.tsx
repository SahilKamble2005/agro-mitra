import React from 'react';
import AgroGisMap from '@/components/maps/AgroGisMap';
import { Sparkles, ShieldCheck, Database, Layers } from 'lucide-react';

export default function RegionalIntelligencePage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner Notice */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">National Precision Agriculture GIS Observatory</h2>
            <p className="text-xs text-slate-500">
              Integrated with Sentinel-2 L2A optical spectral bands, PostGIS spatial coordinates & IMD weather telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
          <span className="flex items-center gap-1">
            <Database size={13} className="text-emerald-600" /> PostGIS EPSG:4326
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-blue-600" /> WGS84 Calibrated
          </span>
        </div>
      </div>

      {/* Production-Grade Interactive Agro GIS Map Component */}
      <AgroGisMap />
    </div>
  );
}
