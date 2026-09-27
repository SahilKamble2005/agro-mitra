import React, { useState } from 'react';
import { Download, Filter, Calendar, BarChart3, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  gradeDistributionData, weeklyAssessmentTrend, defectDistributionData,
  monthlyDefectTrend, centerComparisonData
} from '@/data/mockData';

export default function QualityAnalytics() {
  const [dateRange, setDateRange] = useState('30d');

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(`Exporting analytics report in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quality Analytics Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Deep dive statistical trends, AI-human agreement, defect rates, and center-to-center comparisons.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleExport('csv')} className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => handleExport('pdf')} className="btn-primary text-xs flex items-center gap-1.5 py-2 px-3">
            <Download size={14} /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Time Range:</span>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {['7d', '30d', '90d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded text-xs font-semibold uppercase transition ${
                  dateRange === range
                    ? 'bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-300 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Showing data for <strong>All Procurement Centers (Maharashtra)</strong>
        </div>
      </div>

      {/* Grid of 4 Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Defect Trend by Month Stacked Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-4">Monthly Defect Trend (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDefectTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rot" fill="#ef4444" name="Rot" stackId="a" />
                <Bar dataKey="bruising" fill="#f97316" name="Bruising" stackId="a" />
                <Bar dataKey="sprouting" fill="#84cc16" name="Sprouting" stackId="a" />
                <Bar dataKey="discoloration" fill="#eab308" name="Discoloration" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Center-to-Center Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-4">Center-to-Center Grade Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={centerComparisonData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="center" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="gradeA" fill="#22c55e" name="Grade A %" />
                <Bar dataKey="gradeB" fill="#f59e0b" name="Grade B %" />
                <Bar dataKey="gradeC" fill="#f97316" name="Grade C %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI-Human Agreement Statistics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-3">AI vs. Human Expert Agreement</h3>
          <div className="space-y-4 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Overall Model Agreement Rate</span>
                <span className="text-green-600">94.2%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Grade A Agreement Rate</span>
                <span className="text-green-600">96.8%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '96.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Grade B/C Borderline Agreement Rate</span>
                <span className="text-amber-600">88.5%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '88.5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Defect Distribution Pie */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Overall Defect Distribution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defectDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                >
                  {defectDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
