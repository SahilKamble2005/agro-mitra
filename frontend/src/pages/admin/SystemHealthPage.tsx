import React from 'react';
import { Activity, Server, Database, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/ui/Cards';

export default function SystemHealthPage() {
  const services = [
    { name: 'Node.js Express API Server', status: 'active', latency: '45 ms', uptime: '99.98%' },
    { name: 'Python Flask ML Inference Service (YOLOv8)', status: 'active', latency: '320 ms', uptime: '99.95%' },
    { name: 'MongoDB Primary Database Cluster', status: 'active', latency: '12 ms', uptime: '99.99%' },
    { name: 'Neo4j Knowledge Graph Service', status: 'active', latency: '28 ms', uptime: '99.90%' },
    { name: 'Polygon Sidechain RPC Node', status: 'active', latency: '180 ms', uptime: '99.92%' },
    { name: 'WhatsApp Business API Gateway', status: 'active', latency: '95 ms', uptime: '99.85%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity size={24} className="text-green-500" /> Platform System Health & Telemetry
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Real-time status monitoring across backend API servers, ML inference engines, databases, and RPC nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">{svc.name}</h3>
              <StatusBadge status={svc.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500">API Latency</p>
                <p className="font-bold text-gray-900 dark:text-white mt-0.5">{svc.latency}</p>
              </div>
              <div className="p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500">Service Uptime</p>
                <p className="font-bold text-green-600 mt-0.5">{svc.uptime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
