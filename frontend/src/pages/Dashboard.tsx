import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardKPIs, assessments, regionalRisks } from '@/data/mockData';
import { KPICard, StatusBadge, GradeBadge } from '@/components/ui/Cards';
import {
  Upload, ArrowUpRight, AlertTriangle, ShieldCheck, Sparkles,
  TrendingUp, BarChart3, Clock, CheckCircle2, ChevronRight, Bell
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend,
  BarChart, Bar
} from 'recharts';
import { gradeDistributionData, weeklyAssessmentTrend, defectDistributionData } from '@/data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const nashikRisk = regionalRisks.find(r => r.region === 'Nashik') || regionalRisks[0];

  return (
    <div className="space-y-6">
      {/* Date & Welcome Banner - Matches Uploaded Reference UI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">
            Tuesday, 16 September 2026
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
            Good morning, {user?.name.split(' ')[0] || 'Sahil'}
          </h1>
        </div>
        <button
          onClick={() => navigate('/assessments/new')}
          className="btn-primary flex items-center justify-center gap-2 shadow-md bg-black text-white hover:bg-gray-800 rounded-xl px-5 py-2.5 font-medium text-sm"
        >
          <Upload size={16} />
          <span>New assessment</span>
        </button>
      </div>

      {/* 4 Main KPI Cards - Matches Uploaded Reference UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total assessments"
          value="1,248"
          change="+12.8%"
          changeType="positive"
        />
        <KPICard
          title="Average quality"
          value="87.4"
          change="+3.6%"
          changeType="positive"
        />
        <KPICard
          title="Grade A batches"
          value="68%"
          change="+5.2%"
          changeType="positive"
        />
        <KPICard
          title="Active disputes"
          value="12"
          subtitle="Needs review"
          subtitleColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* Main Grid: Quality Overview Table + Harvest Watch Card (Matches Uploaded Reference UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quality Overview Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Quality overview</h3>
            <button
              onClick={() => navigate('/assessments')}
              className="text-xs text-primary-700 font-semibold hover:underline flex items-center gap-1"
            >
              View all <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-xs text-gray-400 uppercase">
                  <th className="py-2.5 font-medium">Batch</th>
                  <th className="py-2.5 font-medium">Farmer</th>
                  <th className="py-2.5 font-medium">Score</th>
                  <th className="py-2.5 font-medium">Grade</th>
                  <th className="py-2.5 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                  <td className="py-3 font-semibold text-primary-800 dark:text-primary-300">B-2291</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">R. Deshmukh</td>
                  <td className="py-3 font-bold text-gray-900 dark:text-white">92/100</td>
                  <td className="py-3"><GradeBadge grade="A" /></td>
                  <td className="py-3 text-right"><StatusBadge status="Approved" /></td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                  <td className="py-3 font-semibold text-primary-800 dark:text-primary-300">B-2288</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">A. Shinde</td>
                  <td className="py-3 font-bold text-gray-900 dark:text-white">76/100</td>
                  <td className="py-3"><GradeBadge grade="B" /></td>
                  <td className="py-3 text-right"><StatusBadge status="Review needed" /></td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                  <td className="py-3 font-semibold text-primary-800 dark:text-primary-300">B-2285</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">V. Jadhav</td>
                  <td className="py-3 font-bold text-gray-900 dark:text-white">93/100</td>
                  <td className="py-3"><GradeBadge grade="A" /></td>
                  <td className="py-3 text-right"><StatusBadge status="Approved" /></td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                  <td className="py-3 font-semibold text-primary-800 dark:text-primary-300">B-2281</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">S. Gaikwad</td>
                  <td className="py-3 font-bold text-gray-900 dark:text-white">62/100</td>
                  <td className="py-3"><GradeBadge grade="C" /></td>
                  <td className="py-3 text-right"><StatusBadge status="Review needed" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Harvest Watch - Dark Green Card matching uploaded UI reference */}
        <div className="bg-primary-900 text-white rounded-xl p-6 flex flex-col justify-between shadow-card">
          <div>
            <p className="text-xs text-primary-300 font-medium">Harvest watch</p>
            <h3 className="text-xl font-bold text-white mt-1">Maharashtra field pulse</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 my-6 pt-4 border-t border-primary-800">
            <div>
              <p className="text-xs text-primary-300">Risk</p>
              <p className="text-base font-bold text-white mt-0.5">Low</p>
            </div>
            <div>
              <p className="text-xs text-primary-300">Rainfall</p>
              <p className="text-base font-bold text-white mt-0.5">12 mm</p>
            </div>
            <div>
              <p className="text-xs text-primary-300">Price</p>
              <p className="text-base font-bold text-green-400 mt-0.5">+6.2%</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/regional-intelligence')}
            className="w-full bg-primary-800 hover:bg-primary-700 text-white py-2 rounded-lg text-xs font-semibold text-center transition"
          >
            Explore regional intelligence
          </button>
        </div>
      </div>

      {/* Field Note Banner (Matches Uploaded Reference UI) */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 flex items-center gap-3">
        <Bell size={18} className="text-amber-700 dark:text-amber-400 flex-shrink-0" />
        <p className="text-sm font-medium text-amber-900 dark:text-amber-300">
          Field note: 7 new batch photos are waiting for quality review.
        </p>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Grade distribution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {gradeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val}%`, 'Batches']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Trend Line/Area Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-card lg:col-span-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">Weekly assessment volume</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAssessmentTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="assessments" stroke="#16a34a" fill="#22c55e" fillOpacity={0.2} name="Assessments" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
