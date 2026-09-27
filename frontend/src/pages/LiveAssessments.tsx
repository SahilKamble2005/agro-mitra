import React, { useState, useEffect } from 'react';
import { Radio, CheckCircle2, RefreshCw, Layers, ShieldCheck, Activity } from 'lucide-react';
import { GradeBadge } from '@/components/ui/Cards';

export default function LiveAssessments() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Socket.IO simulated live feed
    const initialLogs = [
      { id: '1', batchId: 'ON-2026-1042', step: 'Blockchain Recording', status: 'completed', time: '12:05:10', score: 91, grade: 'A' },
      { id: '2', batchId: 'ON-2026-1041', step: 'Defect Segmentation (YOLOv8)', status: 'processing', time: '12:05:14', score: 76, grade: 'B' },
      { id: '3', batchId: 'ON-2026-1040', step: 'Image Quality Check', status: 'completed', time: '12:05:01', score: 93, grade: 'A' },
      { id: '4', batchId: 'ON-2026-1039', step: 'Variety Classification', status: 'completed', time: '12:04:45', score: 62, grade: 'C' },
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const randomId = Math.floor(Math.random() * 9000 + 1000);
      const newLog = {
        id: String(Date.now()),
        batchId: `ON-2026-${randomId}`,
        step: (['Preprocessing', 'Defect Segmentation', 'Grade Generation', 'Price Estimation', 'Blockchain Recording'])[Math.floor(Math.random() * 5)],
        status: 'processing',
        time: new Date().toLocaleTimeString(),
        score: Math.floor(Math.random() * 30 + 70),
        grade: (['A', 'B', 'A', 'A', 'C'])[Math.floor(Math.random() * 5)],
      };
      setLogs(prev => [newLog, ...prev.slice(0, 10)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Radio size={22} className="text-red-500 animate-pulse" /> Live Assessment Stream
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time Socket.IO feed monitoring active onion batch inference steps across centers.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card p-6 space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">Socket.IO Inference Pipeline Logs</h3>

        <div className="space-y-3">
          {logs.map(log => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 text-xs animate-fadeIn"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300 flex items-center justify-center font-bold">
                  <Activity size={16} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{log.batchId}</p>
                  <p className="text-gray-500">{log.step}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-mono">{log.time}</span>
                <span className="font-bold text-gray-900 dark:text-white">{log.score}/100</span>
                <GradeBadge grade={log.grade} />
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px] flex items-center gap-1">
                  <RefreshCw size={10} className="animate-spin" /> Live
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
