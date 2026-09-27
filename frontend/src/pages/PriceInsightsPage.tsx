import React, { useState } from 'react';
import { priceData } from '@/data/mockData';
import { TrendingUp, Calendar, Box, ShieldCheck, Info } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/utils';

export default function PriceInsightsPage() {
  const [storageType, setStorageType] = useState<'open_air' | 'sack' | 'cold_storage'>('cold_storage');

  const getShelfLifeDays = () => {
    switch (storageType) {
      case 'open_air': return { min: 7, max: 10, mult: 0.85 };
      case 'sack': return { min: 12, max: 15, mult: 0.95 };
      case 'cold_storage': return { min: 18, max: 24, mult: 1.15 };
    }
  };

  const shelfLifeInfo = getShelfLifeDays();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Price & Shelf-Life AI Insights</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Prophet & LSTM AI market price forecasting correlated with storage conditions and onion quality scores.
          </p>
        </div>
      </div>

      {/* Main Insight Header Banner */}
      <div className="bg-primary-900 text-white rounded-2xl p-6 shadow-card space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-400/20 text-gold-300 border border-gold-400/30 px-3 py-1 rounded-full text-xs font-bold">
          <TrendingUp size={14} /> Mandi Market Forecast (Lasalgaon APMC)
        </div>
        <h2 className="text-2xl font-black">
          Current Mandi Rate: ₹2,850 / quintal <span className="text-green-400 text-base font-semibold">(+6.2% 7-day trend)</span>
        </h2>
        <div className="p-4 rounded-xl bg-primary-800 border border-primary-700 text-xs leading-relaxed text-primary-100">
          “At the current quality score (91/100) and market trend, this Grade A Nashik Red batch is estimated to receive a premium price between ₹2,800 – ₹3,150/quintal in upcoming auction rounds.”
        </div>
      </div>

      {/* Interactive Storage Calculator */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">Storage Condition & Shelf-Life Calculator</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'open_air', label: 'Open Air Storage', desc: 'Standard field shade' },
            { id: 'sack', label: 'Sack Storage', desc: 'Jute bag stacked' },
            { id: 'cold_storage', label: 'Ventilated Cold Storage', desc: '0-2°C, 65-70% RH' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStorageType(s.id as any)}
              className={`p-4 rounded-xl border text-left transition ${
                storageType === s.id
                  ? 'bg-primary-50 dark:bg-primary-950 border-primary-800 text-primary-900 dark:text-primary-300 shadow-sm'
                  : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <p className="font-bold text-sm">{s.label}</p>
              <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-xs">
          <div>
            <p className="text-gray-500">Estimated Shelf Life</p>
            <p className="text-2xl font-black text-green-600 mt-1">{shelfLifeInfo.min} – {shelfLifeInfo.max} Days</p>
          </div>
          <div>
            <p className="text-gray-500">Predicted Revenue Impact</p>
            <p className="text-2xl font-black text-gold-600 mt-1">
              +{Math.round((shelfLifeInfo.mult - 1) * 100)}% Price Realization
            </p>
          </div>
        </div>
      </div>

      {/* 30-Day Mandi Price Trend Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-4">30-Day Mandi Price & Forecast Trend (₹/quintal)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} domain={['dataMin - 200', 'dataMax + 200']} />
              <Tooltip formatter={(val: number) => [`₹${val}`, 'Average Price']} />
              <Area type="monotone" dataKey="avgPrice" stroke="#f59e0b" fill="#fde68a" fillOpacity={0.3} name="Mandi Rate" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
