import React, { useState } from 'react';
import { disputes } from '@/data/mockData';
import type { Dispute } from '@/types';
import { GradeBadge, StatusBadge } from '@/components/ui/Cards';
import { AlertTriangle, ShieldCheck, CheckCircle2, Lock, UserCheck, MessageSquare, Scale } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute>(disputes[0]);
  const [expertComment, setExpertComment] = useState('');

  const handleResolve = (newGrade: 'A' | 'B' | 'C') => {
    alert(`Dispute ${selectedDispute.id} resolved with grade ${newGrade}. Escrow released.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispute Resolution Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Agricultural expert review panel for resolving grading conflicts, confidence gaps, and locked escrows.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Dispute Queue Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Active Disputes Queue (12)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                  <th className="py-3 px-4 font-semibold">Dispute ID</th>
                  <th className="py-3 px-4 font-semibold">Batch</th>
                  <th className="py-3 px-4 font-semibold">Farmer</th>
                  <th className="py-3 px-4 font-semibold">AI Grade</th>
                  <th className="py-3 px-4 font-semibold">Gap</th>
                  <th className="py-3 px-4 font-semibold">Value</th>
                  <th className="py-3 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {disputes.map(disp => (
                  <tr
                    key={disp.id}
                    onClick={() => setSelectedDispute(disp)}
                    className={`hover:bg-gray-50/70 dark:hover:bg-gray-700/40 cursor-pointer transition ${
                      selectedDispute.id === disp.id ? 'bg-primary-50/50 dark:bg-primary-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-xs text-gray-900 dark:text-white">{disp.id}</td>
                    <td className="py-3 px-4 font-bold text-primary-800 dark:text-primary-300 text-xs">{disp.batchId}</td>
                    <td className="py-3 px-4 text-xs text-gray-700 dark:text-gray-300">{disp.farmerName}</td>
                    <td className="py-3 px-4"><GradeBadge grade={disp.originalGrade} /></td>
                    <td className="py-3 px-4 font-bold text-xs text-amber-600">{disp.confidenceGap}%</td>
                    <td className="py-3 px-4 font-semibold text-xs text-gray-900 dark:text-white">{formatCurrency(disp.batchValue)}</td>
                    <td className="py-3 px-4 text-right"><StatusBadge status={disp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Dispute Detail & Expert Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-5">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Selected Dispute</span>
              <StatusBadge status={selectedDispute.status} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{selectedDispute.id}</h3>
            <p className="text-xs text-gray-500">Batch {selectedDispute.batchId} • Value: {formatCurrency(selectedDispute.batchValue)}</p>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-xs space-y-1">
            <p className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
              <Lock size={12} /> Escrow Status: Locked (₹{selectedDispute.batchValue.toLocaleString('en-IN')})
            </p>
            <p className="text-amber-800 dark:text-amber-400">
              Payment is held safely in smart contract escrow until expert reassessment is finalized.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <MessageSquare size={14} className="text-primary-700" /> Farmer's Appeal Comment:
              </p>
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-700 dark:text-gray-300 italic border border-gray-100 dark:border-gray-700">
                “{selectedDispute.farmerComment}”
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Expert Review Comments
              </label>
              <textarea
                placeholder="Add agricultural expert technical findings and reassessment notes..."
                value={expertComment}
                onChange={e => setExpertComment(e.target.value)}
                rows={3}
                className="input-field text-xs"
              />
            </div>

            <div className="pt-2">
              <p className="font-bold text-gray-700 dark:text-gray-300 mb-2">Final Expert Decision & Escrow Release:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleResolve('A')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-xs"
                >
                  Upgrade to Grade A
                </button>
                <button
                  onClick={() => handleResolve('B')}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg text-xs"
                >
                  Confirm Grade B
                </button>
                <button
                  onClick={() => handleResolve('C')}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg text-xs"
                >
                  Downgrade Grade C
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
