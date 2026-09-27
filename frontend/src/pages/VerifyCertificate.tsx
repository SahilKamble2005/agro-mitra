import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { certificates } from '@/data/mockData';
import type { Certificate } from '@/types';
import { ShieldCheck, CheckCircle2, QrCode, ExternalLink, ArrowLeft, Copy, Share2 } from 'lucide-react';
import { GradeBadge } from '@/components/ui/Cards';

export default function VerifyCertificate() {
  const { certificateId } = useParams<{ certificateId: string }>();
  const navigate = useNavigate();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = certificates.find(c => c.id === certificateId || c.batchId === certificateId) || certificates[0];
    setCert(found);
  }, [certificateId]);

  if (!cert) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-800"
        >
          <ArrowLeft size={16} /> Back to Homepage
        </button>

        {/* Certificate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-primary-900 text-white p-8 text-center relative">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              <ShieldCheck size={16} className="text-green-400" />
              <span>OFFICIAL BLOCKCHAIN VERIFIED CERTIFICATE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Onion Quality Certificate</h1>
            <p className="text-xs text-primary-200 mt-1">Certificate ID: {cert.id}</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Key Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-center">
              <div>
                <p className="text-xs text-gray-500">Quality Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{cert.qualityScore}/100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Grade</p>
                <div className="mt-1"><GradeBadge grade={cert.grade} /></div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Variety</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{cert.variety}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-bold text-green-600 mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 size={14} /> Verified
                </p>
              </div>
            </div>

            {/* Batch & Procurement Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-gray-700 pb-2">
                  Batch Details
                </h4>
                <p><span className="text-gray-500">Batch ID:</span> <strong className="text-gray-900 dark:text-white">{cert.batchId}</strong></p>
                <p><span className="text-gray-500">Farmer:</span> <strong className="text-gray-900 dark:text-white">{cert.farmerName}</strong></p>
                <p><span className="text-gray-500">Procurement Center:</span> <strong className="text-gray-900 dark:text-white">{cert.procurementCenter}</strong></p>
                <p><span className="text-gray-500">Assessment Date:</span> <strong className="text-gray-900 dark:text-white">{new Date(cert.assessmentDate).toLocaleDateString('en-IN')}</strong></p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-gray-700 pb-2">
                  AI Model & Blockchain
                </h4>
                <p><span className="text-gray-500">Model Version:</span> <strong className="text-gray-900 dark:text-white">{cert.modelVersion}</strong></p>
                <p><span className="text-gray-500">Image Hash:</span> <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{cert.imageHash.slice(0, 18)}...</code></p>
                <p><span className="text-gray-500">Blockchain Hash:</span> <code className="text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-0.5 rounded font-mono">{cert.blockchainHash.slice(0, 16)}...</code></p>
                <p><span className="text-gray-500">Network:</span> <strong className="text-purple-600 font-semibold">Polygon Mainnet (Sidechain)</strong></p>
              </div>
            </div>

            {/* Note on On-Chain Hash */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 text-xs text-purple-900 dark:text-purple-300">
              <strong>Security Notice:</strong> Only cryptographic image hashes and quality assessment metadata are stored on the blockchain ledger. Personal identity details remain securely protected off-chain.
            </div>

            {/* QR Simulation & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                  <QrCode size={36} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Scan to verify anywhere</p>
                  <p className="text-[11px] text-gray-500">Tamper-proof digital certificate</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
                >
                  <Copy size={14} />
                  {copied ? 'Copied Link!' : 'Copy Verification Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
