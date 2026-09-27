import React from 'react';
import { assessments } from '@/data/mockData';
import { GradeBadge } from '@/components/ui/Cards';
import { History, Calendar, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function AssessmentHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Historical Assessments Timeline</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Complete historical record of all past onion quality assessments across procurement centers.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Assessment ID</th>
                <th className="py-3 px-4 font-semibold">Batch ID</th>
                <th className="py-3 px-4 font-semibold">Farmer</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Center</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {assessments.map(asm => (
                <tr
                  key={asm.id}
                  onClick={() => navigate(`/assessments/${asm.id}`)}
                  className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 cursor-pointer transition"
                >
                  <td className="py-3 px-4 text-xs text-gray-500">{formatDate(asm.createdAt)}</td>
                  <td className="py-3 px-4 font-medium text-xs text-gray-900 dark:text-white">{asm.id}</td>
                  <td className="py-3 px-4 font-bold text-primary-800 dark:text-primary-300 text-xs">{asm.batchId}</td>
                  <td className="py-3 px-4 text-xs text-gray-700 dark:text-gray-300">{asm.farmer}</td>
                  <td className="py-3 px-4 font-bold text-xs text-gray-900 dark:text-white">{asm.qualityScore}/100</td>
                  <td className="py-3 px-4"><GradeBadge grade={asm.grade} /></td>
                  <td className="py-3 px-4 text-xs text-gray-600 dark:text-gray-400">{asm.procurementCenter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
