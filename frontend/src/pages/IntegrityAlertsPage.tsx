import React from 'react';
import { integrityAlerts } from '@/data/mockData';
import { ShieldAlert, AlertTriangle, Eye, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { StatusBadge } from '@/components/ui/Cards';

export default function IntegrityAlertsPage() {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Integrity & Anomaly Alerts</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Automated detection via Isolation Forest models & statistical baselines monitoring officer overrides, duplicate photos & location anomalies.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {integrityAlerts.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card flex flex-col md:flex-row items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl border ${getSeverityStyle(item.severity)} flex-shrink-0`}>
                <ShieldAlert size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{item.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${getSeverityStyle(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-xs border border-gray-100 dark:border-gray-700 mt-2">
                  <p className="font-bold text-gray-700 dark:text-gray-300">Empirical Evidence:</p>
                  <p className="text-gray-600 dark:text-gray-400 font-mono mt-0.5">{item.evidence}</p>
                </div>
                <p className="text-xs text-primary-800 dark:text-primary-300 font-semibold pt-1">
                  <strong>Recommended Action:</strong> {item.recommendedAction}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0 w-full md:w-auto pt-2 md:pt-0">
              <StatusBadge status={item.status} />
              <button
                onClick={() => alert(`Investigating alert ${item.id}...`)}
                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 w-full md:w-auto justify-center"
              >
                <Eye size={12} /> Investigate Alert
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
