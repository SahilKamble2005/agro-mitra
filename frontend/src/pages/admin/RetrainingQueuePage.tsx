import React from 'react';
import { assessments } from '@/data/mockData';
import { RefreshCw, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { GradeBadge } from '@/components/ui/Cards';

export default function RetrainingQueuePage() {
  const lowConfidenceItems = assessments.filter(a => a.confidence < 90 || a.status === 'review_needed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Retraining Queue</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Low-confidence assessments and human override samples queued for active learning model fine-tuning.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Assessment ID</th>
                <th className="py-3 px-4 font-semibold">Batch ID</th>
                <th className="py-3 px-4 font-semibold">Variety</th>
                <th className="py-3 px-4 font-semibold">Confidence</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Queue Reason</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {lowConfidenceItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 transition">
                  <td className="py-3 px-4 font-medium text-xs text-gray-900 dark:text-white">{item.id}</td>
                  <td className="py-3 px-4 font-bold text-primary-800 dark:text-primary-300 text-xs">{item.batchId}</td>
                  <td className="py-3 px-4 text-xs text-gray-700 dark:text-gray-300">{item.variety}</td>
                  <td className="py-3 px-4 font-bold text-xs text-amber-600">{item.confidence}%</td>
                  <td className="py-3 px-4"><GradeBadge grade={item.grade} /></td>
                  <td className="py-3 px-4 text-xs text-gray-500">Low AI Confidence &lt; 90%</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => alert(`Annotated and approved sample ${item.id} for dataset!`)}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      Annotate & Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
