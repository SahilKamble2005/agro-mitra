import React, { useState } from 'react';
import { batches } from '@/data/mockData';
import { GradeBadge, StatusBadge } from '@/components/ui/Cards';
import { CheckCircle2, AlertTriangle, Layers, Save, Sliders, ShieldCheck } from 'lucide-react';

export default function BatchGrading() {
  const [selectedBatch, setSelectedBatch] = useState(batches[0]);
  const [manualGrade, setManualGrade] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [isFinalized, setIsFinalized] = useState(false);

  const handleSaveOverride = () => {
    if (!manualGrade || !overrideReason) return;
    alert(`Grade overridden to ${manualGrade} for reason: ${overrideReason}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Batch Grading Workspace</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review multi-sample onion batches, compare AI vs. human grades, and finalize procurement certificates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFinalized(true)}
            className="btn-primary text-xs font-semibold py-2.5 px-4 flex items-center gap-1.5"
          >
            <CheckCircle2 size={16} /> Finalize Batch Grade
          </button>
        </div>
      </div>

      {/* Batch Header Summary Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Selected Batch</span>
            <h2 className="text-2xl font-black text-primary-900 dark:text-white mt-0.5">{selectedBatch.id}</h2>
            <p className="text-xs text-gray-500">
              Farmer: <strong>{selectedBatch.farmerName}</strong> • Center: <strong>{selectedBatch.procurementCenter}</strong> • Variety: <strong>{selectedBatch.variety}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Final Batch Grade</p>
              <div className="mt-1"><GradeBadge grade={selectedBatch.finalGrade} /></div>
            </div>
            <div className="text-right pl-4 border-l border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500">AI Confidence</p>
              <p className="text-lg font-bold text-green-600 mt-0.5">{selectedBatch.confidence}%</p>
            </div>
          </div>
        </div>

        {/* Batch Stats KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="text-[11px] text-gray-500">Total Samples</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{selectedBatch.sampleCount}</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-[11px] text-green-700">Grade A</p>
            <p className="text-lg font-bold text-green-800 dark:text-green-300 mt-0.5">{selectedBatch.gradeDistribution.A}</p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-[11px] text-amber-700">Grade B</p>
            <p className="text-lg font-bold text-amber-800 dark:text-amber-300 mt-0.5">{selectedBatch.gradeDistribution.B}</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-[11px] text-orange-700">Grade C</p>
            <p className="text-lg font-bold text-orange-800 dark:text-orange-300 mt-0.5">{selectedBatch.gradeDistribution.C}</p>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-[11px] text-red-700">Rejected</p>
            <p className="text-lg font-bold text-red-800 dark:text-red-300 mt-0.5">{selectedBatch.gradeDistribution.Rejected}</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="text-[11px] text-gray-500">Defect Rate</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{selectedBatch.defectRate}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample Image Grid (12 Thumbnails) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">Sample Image Grid</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, idx) => {
              const sampleGrade = idx < 8 ? 'A' : idx < 10 ? 'B' : 'C';
              return (
                <div key={idx} className="relative rounded-xl border border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900 hover:border-primary-600 transition group cursor-pointer">
                  <div className="w-full h-24 rounded-lg bg-amber-800/40 flex items-center justify-center relative overflow-hidden">
                    <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-[10px] text-white font-bold">
                      Sample #{idx + 1}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Score: {85 - idx * 2}</span>
                    <GradeBadge grade={sampleGrade} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Manual Override & AI vs Human Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">Manual Override & Auditor Controls</h3>

          {/* Comparison */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Original AI Grade:</span>
              <GradeBadge grade={selectedBatch.finalGrade} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Auditor Status:</span>
              <strong className="text-green-600">AI-Human Agreement 94%</strong>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Override Grade (Requires Audit Logging)
            </label>
            <select
              value={manualGrade}
              onChange={e => setManualGrade(e.target.value)}
              className="input-field text-xs"
            >
              <option value="">Select Override Grade...</option>
              <option value="A">Grade A — Premium</option>
              <option value="B">Grade B — Standard</option>
              <option value="C">Grade C — Below Standard</option>
              <option value="Rejected">Rejected</option>
            </select>

            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Override Reason (Mandatory)
            </label>
            <textarea
              placeholder="Specify reason for manual override e.g. lighting correction, neck moisture check..."
              value={overrideReason}
              onChange={e => setOverrideReason(e.target.value)}
              rows={3}
              className="input-field text-xs"
            />

            <button
              type="button"
              onClick={handleSaveOverride}
              disabled={!manualGrade || !overrideReason}
              className="w-full btn-secondary text-xs py-2.5 font-bold flex items-center justify-center gap-1.5"
            >
              <Save size={14} /> Record Manual Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
