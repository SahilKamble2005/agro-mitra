import React from 'react';
import { digitalTwinCenters } from '@/data/mockData';
import { Box, Activity, Clock, CheckCircle2, AlertTriangle, Cpu, RefreshCw } from 'lucide-react';
import { StatusBadge, GradeBadge } from '@/components/ui/Cards';

export default function DigitalTwinPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Box size={22} className="text-gold-500" /> Software-Based Digital Twin
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time software simulation of procurement center queue length, processing load, and system health status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {digitalTwinCenters.map(center => (
          <div
            key={center.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">{center.name}</h3>
                <p className="text-xs text-gray-500">Center Twin ID: {center.id}</p>
              </div>
              <StatusBadge status={center.healthStatus} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500">Queue Length</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{center.queueLength} batches</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500">Active Inference</p>
                <p className="text-xl font-bold text-green-600 mt-0.5">{center.activeAssessments} running</p>
              </div>
            </div>

            {/* Capacity Meter */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span>Processing Capacity</span>
                <span>{center.capacityUsed} / {center.processingCapacity} q/hr</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-primary-800 rounded-full"
                  style={{ width: `${(center.capacityUsed / center.processingCapacity) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Average Grade Output:</span>
                <GradeBadge grade={center.averageGrade} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Offline Sessions:</span>
                <strong className="text-gray-900 dark:text-white">{center.offlineSessions} devices</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Quality Trend:</span>
                <strong className="text-green-600 capitalize">{center.qualityTrend}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
