import React, { useState } from 'react';
import { modelVersions } from '@/data/mockData';
import type { ModelVersion } from '@/types';
import { Cpu, RefreshCw, RotateCcw, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { StatusBadge } from '@/components/ui/Cards';

export default function ModelManagementPage() {
  const [models, setModels] = useState<ModelVersion[]>(modelVersions);

  const handleDeploy = (version: string) => {
    if (window.confirm(`Are you sure you want to deploy model version ${version} to production?`)) {
      setModels(prev =>
        prev.map(m => ({
          ...m,
          status: m.version === version ? 'deployed' : 'archived',
        }))
      );
      alert(`Model ${version} successfully deployed to production!`);
    }
  };

  const handleRollback = (version: string) => {
    if (window.confirm(`Are you sure you want to rollback to model version ${version}?`)) {
      setModels(prev =>
        prev.map(m => ({
          ...m,
          status: m.version === version ? 'deployed' : 'archived',
        }))
      );
      alert(`System rolled back to model version ${version}!`);
    }
  };

  const activeModel = models.find(m => m.status === 'deployed') || models[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Cpu size={24} className="text-primary-800" /> AI Model Lifecycle & Deployment
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor YOLOv8-seg model metrics, dataset size, drift score, and execute production deployments or rollbacks.
          </p>
        </div>
      </div>

      {/* Currently Deployed Active Model Card */}
      <div className="bg-primary-900 text-white p-6 rounded-2xl shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary-800 pb-3">
          <div>
            <span className="text-xs text-primary-300 uppercase font-bold">Currently Deployed Active Model</span>
            <h2 className="text-2xl font-black text-white mt-0.5">{activeModel.version}</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400 text-green-300 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 size={14} /> Deployed & Serving Inferences
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-primary-800 rounded-xl">
            <p className="text-[11px] text-primary-300">Accuracy</p>
            <p className="text-xl font-black text-white mt-0.5">{activeModel.accuracy}%</p>
          </div>
          <div className="p-3 bg-primary-800 rounded-xl">
            <p className="text-[11px] text-primary-300">Precision</p>
            <p className="text-xl font-black text-white mt-0.5">{activeModel.precision}%</p>
          </div>
          <div className="p-3 bg-primary-800 rounded-xl">
            <p className="text-[11px] text-primary-300">Recall</p>
            <p className="text-xl font-black text-white mt-0.5">{activeModel.recall}%</p>
          </div>
          <div className="p-3 bg-primary-800 rounded-xl">
            <p className="text-[11px] text-primary-300">F1 Score</p>
            <p className="text-xl font-black text-white mt-0.5">{activeModel.f1Score}%</p>
          </div>
          <div className="p-3 bg-primary-800 rounded-xl">
            <p className="text-[11px] text-primary-300">Model Drift</p>
            <p className="text-xl font-black text-gold-300 mt-0.5">{activeModel.modelDrift}%</p>
          </div>
        </div>
      </div>

      {/* Model Version Registry Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">Model Version Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Version</th>
                <th className="py-3 px-4 font-semibold">Accuracy</th>
                <th className="py-3 px-4 font-semibold">F1 Score</th>
                <th className="py-3 px-4 font-semibold">Dataset Size</th>
                <th className="py-3 px-4 font-semibold">Drift</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {models.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-xs text-gray-900 dark:text-white">{m.version}</td>
                  <td className="py-3 px-4 font-bold text-xs text-green-600">{m.accuracy}%</td>
                  <td className="py-3 px-4 text-xs font-bold text-gray-900 dark:text-white">{m.f1Score}%</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{m.datasetSize.toLocaleString('en-IN')} samples</td>
                  <td className="py-3 px-4 text-xs font-bold text-amber-600">{m.modelDrift}%</td>
                  <td className="py-3 px-4"><StatusBadge status={m.status} /></td>
                  <td className="py-3 px-4 text-right">
                    {m.status === 'testing' ? (
                      <button
                        onClick={() => handleDeploy(m.version)}
                        className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 ml-auto"
                      >
                        <RefreshCw size={12} /> Deploy Model
                      </button>
                    ) : m.status === 'archived' ? (
                      <button
                        onClick={() => handleRollback(m.version)}
                        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 ml-auto"
                      >
                        <RotateCcw size={12} /> Rollback
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-green-600">Active Production</span>
                    )}
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
