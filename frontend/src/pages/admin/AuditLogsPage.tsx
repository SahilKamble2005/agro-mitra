import React from 'react';
import { auditLogs } from '@/data/mockData';
import { ScrollText, Search, ShieldCheck } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ScrollText size={22} className="text-purple-600" /> Security Audit Event Logs
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Immutable event trails for certificate issuances, grade overrides, logins, and model deployments.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Action Event</th>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Details</th>
                <th className="py-3 px-4 font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 font-mono text-xs">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 transition">
                  <td className="py-3 px-4 text-gray-500">{formatDateTime(log.timestamp)}</td>
                  <td className="py-3 px-4 font-bold text-purple-700 dark:text-purple-300">{log.action}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold font-sans">{log.userName}</td>
                  <td className="py-3 px-4 capitalize font-sans text-gray-600 dark:text-gray-400">{log.userRole.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-sans">{log.details}</td>
                  <td className="py-3 px-4 text-gray-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
