import React from 'react';
import { useNavigate } from 'react-router-dom';
import { certificates } from '@/data/mockData';
import { ShieldCheck, QrCode, ExternalLink, Copy, CheckCircle2, Download } from 'lucide-react';
import { GradeBadge } from '@/components/ui/Cards';

export default function BlockchainCertificatesPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blockchain Quality Certificates</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Tamper-proof batch certificates stored on Polygon sidechain with cryptographic image hashes & QR code verification.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Certificate ID</th>
                <th className="py-3 px-4 font-semibold">Batch ID</th>
                <th className="py-3 px-4 font-semibold">Farmer</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Blockchain Hash</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {certificates.map(cert => (
                <tr key={cert.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-xs text-purple-700 dark:text-purple-300">{cert.id}</td>
                  <td className="py-3 px-4 font-bold text-primary-800 dark:text-primary-300 text-xs">{cert.batchId}</td>
                  <td className="py-3 px-4 text-xs text-gray-700 dark:text-gray-300">{cert.farmerName}</td>
                  <td className="py-3 px-4 font-bold text-xs text-gray-900 dark:text-white">{cert.qualityScore}/100</td>
                  <td className="py-3 px-4"><GradeBadge grade={cert.grade} /></td>
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{cert.blockchainHash.slice(0, 16)}...</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => navigate(`/verify-certificate/${cert.id}`)}
                      className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 ml-auto"
                    >
                      <QrCode size={14} /> Verify QR
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
