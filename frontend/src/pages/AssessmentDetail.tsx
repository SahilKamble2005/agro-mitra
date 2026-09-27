import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assessments } from '@/data/mockData';
import type { Assessment } from '@/types';
import { GradeBadge, StatusBadge } from '@/components/ui/Cards';
import { ArrowLeft, FileText, ShieldCheck, Layers, Sparkles, AlertCircle } from 'lucide-react';

export default function AssessmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asm, setAsm] = useState<Assessment | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const found = assessments.find(a => a.id === id) || assessments[0];
    setAsm(found);
  }, [id]);

  if (!asm) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/assessments')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-800"
      >
        <ArrowLeft size={16} /> Back to Assessments
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assessment {asm.id}</h1>
            <GradeBadge grade={asm.grade} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Batch {asm.batchId} • Submitted by {asm.farmer} at {asm.procurementCenter}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/reports')} className="btn-secondary text-xs flex items-center gap-1">
            <FileText size={14} /> PDF Report
          </button>
          <button onClick={() => navigate('/blockchain-certificates')} className="btn-gold text-xs flex items-center gap-1">
            <ShieldCheck size={14} /> Blockchain Certificate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Segmentation Overlay Preview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Defect Instance Segmentation</h3>
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="text-xs font-semibold text-primary-700 flex items-center gap-1"
            >
              <Layers size={14} /> {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
            </button>
          </div>

          <div className="relative w-full h-80 rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <div className="w-52 h-52 rounded-full bg-amber-600/90 border-4 border-amber-400 relative flex items-center justify-center shadow-2xl">
              <span className="text-white font-extrabold text-sm tracking-widest uppercase opacity-80">
                {asm.variety}
              </span>
              {showOverlay && (
                <>
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-red-600/70 border border-red-300 flex items-center justify-center text-[9px] text-white font-bold animate-pulse">
                    Rot 1%
                  </div>
                  <div className="absolute bottom-6 right-8 w-16 h-12 rounded-full bg-orange-500/70 border border-orange-300 flex items-center justify-center text-[9px] text-white font-bold">
                    Bruise 3%
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Defect Legend */}
          <div className="grid grid-cols-3 gap-2 text-xs pt-2">
            <div className="flex items-center gap-2 p-2 rounded bg-red-50 text-red-800 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Rot: 1%
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-orange-50 text-orange-800 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Bruising: 3%
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-amber-50 text-amber-800 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Discoloration: 2%
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Assessment Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">Grading Metrics & Explainability</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
            <div>
              <p className="text-[11px] text-gray-500">Quality Score</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{asm.qualityScore}/100</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">AI Confidence</p>
              <p className="text-lg font-bold text-green-600 mt-1">{asm.confidence}%</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Model Version</p>
              <p className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300 mt-2">{asm.modelVersion}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Estimated Shelf Life</span>
              <strong className="text-gray-900 dark:text-white">{asm.shelfLife.min}–{asm.shelfLife.max} days</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Estimated Mandi Rate</span>
              <strong className="text-gray-900 dark:text-white">₹{asm.estimatedPrice.min} – ₹{asm.estimatedPrice.max} / q</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Total Defect Area</span>
              <strong className="text-gray-900 dark:text-white">{asm.totalDefectArea}%</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs space-y-2">
            <p className="font-bold text-primary-900 dark:text-primary-300 flex items-center gap-1.5">
              <Sparkles size={14} className="text-gold-500" /> Explainable AI Diagnosis:
            </p>
            <p className="text-primary-800 dark:text-primary-300 leading-relaxed">
              {asm.explanation}
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => navigate('/disputes')}
              className="flex-1 btn-secondary text-xs py-2.5 font-bold"
            >
              Submit Dispute
            </button>
            <button
              onClick={() => navigate('/blockchain-certificates')}
              className="flex-1 btn-primary text-xs py-2.5 font-bold"
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
