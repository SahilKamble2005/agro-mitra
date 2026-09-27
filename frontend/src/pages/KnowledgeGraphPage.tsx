import React, { useState } from 'react';
import { knowledgeGraphNodes, knowledgeGraphEdges } from '@/data/mockData';
import { GitBranch, Search, Sparkles, Database, ArrowRight } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState(knowledgeGraphNodes[0]);
  const [activeQuery, setActiveQuery] = useState('');

  const sampleQueries = [
    '“Which farmers consistently provide Grade A onions to Center B?”',
    '“Show the complete digital history of batch ON-2026-1042.”',
    '“Which region currently has the lowest defect rate?”',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <GitBranch size={22} className="text-purple-600" /> Supply Chain Knowledge Graph
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Neo4j graph abstraction linking Farmer → Batch → Assessment → Grade → Center → Mandi → Price → Payment.
          </p>
        </div>
      </div>

      {/* Natural Language Query Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-3">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">Cypher / Natural Language Graph Queries</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ask graph query e.g. Which farmers provide Grade A in Nashik?"
            value={activeQuery}
            onChange={e => setActiveQuery(e.target.value)}
            className="input-field pl-10 py-3"
          />
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-gray-400 font-medium">Sample Queries:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setActiveQuery(q.replace(/”|“/g, ''))}
              className="text-primary-700 dark:text-primary-300 font-semibold hover:underline"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Visual Canvas & Node Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Interactive Canvas Simulation */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-card min-h-[420px] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 z-10">
            <span className="flex items-center gap-1"><Database size={14} className="text-purple-400" /> Graph Schema Nodes (11)</span>
            <span className="text-green-400">Neo4j Driver Ready</span>
          </div>

          {/* Node Nodes Network */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 my-auto py-8 z-10">
            {knowledgeGraphNodes.map(node => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                  selectedNode.id === node.id
                    ? 'bg-purple-600 text-white border-purple-300 shadow-lg scale-105'
                    : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-purple-500'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-purple-300">{node.type}</span>
                <span className="font-bold text-xs">{node.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 z-10">
            Click any node above to inspect graph relationships & property values.
          </div>
        </div>

        {/* Right Side: Node Inspector Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
            <span className="text-xs font-bold text-purple-600 uppercase">{selectedNode.type} Node Properties</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{selectedNode.label}</h3>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-gray-700 dark:text-gray-300 uppercase">Attributes & Keys</h4>
            {Object.entries(selectedNode.properties).map(([k, v]) => (
              <div key={k} className="flex justify-between p-2 rounded bg-gray-50 dark:bg-gray-900/50">
                <span className="text-gray-500 font-mono">{k}</span>
                <strong className="text-gray-900 dark:text-white font-mono">{String(v)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
