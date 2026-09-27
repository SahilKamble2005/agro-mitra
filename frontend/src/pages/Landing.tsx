import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, CheckCircle2, ArrowRight, BarChart3, Globe, Lock, Cpu } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-400 flex items-center justify-center font-bold text-white text-lg">
            🧅
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-primary-900 dark:text-white leading-none">Agro Mitra</h1>
            <p className="text-[11px] text-gray-500 font-medium">Agricultural Quality Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/marketplace')}
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-800 px-3 py-2"
          >
            Public Marketplace
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary text-sm font-semibold px-5 py-2 rounded-xl"
          >
            Sign In / Demo
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 text-center flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-900 dark:bg-primary-950 dark:text-primary-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
          <Sparkles size={14} className="text-gold-500" />
          <span>Next-Gen Agricultural AI • Maharashtra Procurement</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight max-w-4xl">
          Transparent quality. Fair pricing. Trusted procurement.
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Software-only AI platform using YOLOv8-seg, explainable AI, and blockchain verification to streamline onion grading and prevent fraud across procurement centers.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-primary-900 hover:bg-primary-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-base transition hover:scale-105"
          >
            <span>Launch Platform Demo</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/verify-certificate/CERT-2026-0892')}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 font-bold px-6 py-3.5 rounded-xl shadow-sm hover:bg-gray-50 transition"
          >
            Verify Certificate (QR Demo)
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 flex items-center justify-center mb-4">
              <Cpu size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">AI Defect Segmentation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Detect rot, bruising, sprouting, cuts, and discoloration with YOLOv8-seg and explainable Grad-CAM overlays.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Blockchain Provenance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Immutable batch certificates recorded on-chain with QR codes to eliminate grading disputes and fraud.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-gold-100 dark:bg-gold-900/30 text-gold-700 flex items-center justify-center mb-4">
              <Globe size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">GIS & Market Forecasts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Regional risk mapping across Nashik, Pune, Solapur with AI mandi price and shelf-life predictions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 px-6 text-center text-xs text-gray-500">
        Agro Mitra © 2026 • Indian Agricultural Quality Platform Prototype
      </footer>
    </div>
  );
}
