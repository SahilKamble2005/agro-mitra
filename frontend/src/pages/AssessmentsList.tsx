import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessments } from '@/data/mockData';
import { GradeBadge, StatusBadge } from '@/components/ui/Cards';
import { Search, Filter, Plus, FileText, ArrowUpDown } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AssessmentsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  const filteredAssessments = assessments.filter(a => {
    const matchesSearch = a.batchId.toLowerCase().includes(search.toLowerCase()) ||
                          a.farmer.toLowerCase().includes(search.toLowerCase()) ||
                          a.procurementCenter.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || a.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quality Assessments</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage and view AI onion defect segmentation reports & historical assessments.
          </p>
        </div>
        <button
          onClick={() => navigate('/assessments/new')}
          className="btn-primary flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4"
        >
          <Plus size={16} /> New Assessment
        </button>
      </div>

      {/* Filter and Search Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by batch ID, farmer, center..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-gray-400" />
          <select
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
            className="input-field text-xs py-2"
          >
            <option value="all">All Grades</option>
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">Assessment ID</th>
                <th className="py-3 px-4 font-semibold">Batch ID</th>
                <th className="py-3 px-4 font-semibold">Farmer</th>
                <th className="py-3 px-4 font-semibold">Variety</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Defects</th>
                <th className="py-3 px-4 font-semibold">Center</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredAssessments.map(asm => (
                <tr
                  key={asm.id}
                  onClick={() => navigate(`/assessments/${asm.id}`)}
                  className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 cursor-pointer transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white text-xs">{asm.id}</td>
                  <td className="py-3 px-4 font-bold text-primary-800 dark:text-primary-300 text-xs">{asm.batchId}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 text-xs">{asm.farmer}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{asm.variety}</td>
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white text-xs">{asm.qualityScore}/100</td>
                  <td className="py-3 px-4"><GradeBadge grade={asm.grade} /></td>
                  <td className="py-3 px-4 text-xs font-medium text-gray-500">{asm.totalDefectArea.toFixed(1)}%</td>
                  <td className="py-3 px-4 text-xs text-gray-600 dark:text-gray-400">{asm.procurementCenter}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/assessments/${asm.id}`); }}
                      className="text-xs text-primary-700 font-semibold hover:underline"
                    >
                      View Detail
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
