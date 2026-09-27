import React from 'react';
import { reports } from '@/data/mockData';
import { FileText, Download, Share2, Printer, CheckCircle2 } from 'lucide-react';
import { GradeBadge } from '@/components/ui/Cards';

export default function ReportsPage() {
  const handleShareWhatsApp = (reportId: string) => {
    alert(`Sharing report ${reportId} via WhatsApp Business API...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Quality Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Download PDF reports containing segmentation evidence, explainable AI, shelf life, and QR hashes.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Report ID</th>
                <th className="py-3 px-4 font-semibold">Batch ID</th>
                <th className="py-3 px-4 font-semibold">Farmer</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {reports.map(rpt => (
                <tr key={rpt.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 transition">
                  <td className="py-3 px-4 font-medium text-xs text-gray-900 dark:text-white">{rpt.id}</td>
                  <td className="py-3 px-4 font-bold text-primary-800 dark:text-primary-300 text-xs">{rpt.batchId}</td>
                  <td className="py-3 px-4 text-xs text-gray-700 dark:text-gray-300">{rpt.farmerName}</td>
                  <td className="py-3 px-4 font-bold text-xs text-gray-900 dark:text-white">{rpt.qualityScore}/100</td>
                  <td className="py-3 px-4"><GradeBadge grade={rpt.grade} /></td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                      <CheckCircle2 size={12} /> {rpt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleShareWhatsApp(rpt.id)}
                      className="btn-secondary text-xs py-1.5 px-2.5 flex items-center gap-1"
                    >
                      <Share2 size={12} className="text-green-600" /> WhatsApp
                    </button>
                    <button
                      onClick={() => alert(`Downloading PDF for report ${rpt.id}...`)}
                      className="btn-primary text-xs py-1.5 px-2.5 flex items-center gap-1"
                    >
                      <Download size={12} /> PDF
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
