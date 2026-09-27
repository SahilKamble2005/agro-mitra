import React from 'react';
import { procurementCenters } from '@/data/mockData';
import { Building2, AlertTriangle, CheckCircle2, Clock, Activity, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '@/components/ui/Cards';

export default function ProcurementCentersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Procurement Center Analytics</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor center performance, volume, grading accuracy, dispute rates, and offline synchronization states.
          </p>
        </div>
      </div>

      {/* Warning Callout Box for Center C / Ahmednagar East (Prompt Section 12 Requirement) */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-700 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-amber-400 text-amber-950 rounded-xl flex-shrink-0">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm">Integrity Warning Notice</h4>
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 mt-1">
            “Center C (Ahmednagar East) shows significant grading variation compared with other centers. Grade A output is 23% below network average with a 12% dispute rate.”
          </p>
        </div>
      </div>

      {/* Procurement Center Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {procurementCenters.map(center => (
          <div
            key={center.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-900 dark:bg-primary-950 dark:text-primary-300 flex items-center justify-center font-bold">
                  {center.code}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{center.name}</h3>
                  <p className="text-xs text-gray-500">{center.region} Region</p>
                </div>
              </div>
              <StatusBadge status={center.offlineSyncStatus} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500">Average Quality</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{center.averageQuality}/100</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500">Daily Volume</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{center.processingVolume} q</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Grade A Distribution:</span>
                <strong className="text-green-600">{center.gradeAPercentage}%</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Grade B Distribution:</span>
                <strong className="text-amber-600">{center.gradeBPercentage}%</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Grade C Distribution:</span>
                <strong className="text-orange-600">{center.gradeCPercentage}%</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Rejection Rate:</span>
                <strong className="text-red-600">{center.rejectionRate}%</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-500">Avg Processing Speed:</span>
                <strong className="text-gray-900 dark:text-white">{center.avgAssessmentTime} mins</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
