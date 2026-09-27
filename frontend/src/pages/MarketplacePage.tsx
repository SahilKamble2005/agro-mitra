import React, { useState } from 'react';
import { marketListings } from '@/data/mockData';
import { GradeBadge } from '@/components/ui/Cards';
import { ShoppingCart, ShieldCheck, Star, MapPin, Calendar, ExternalLink, Filter } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [gradeFilter, setGradeFilter] = useState('all');

  const filteredListings = marketListings.filter(item =>
    gradeFilter === 'all' || item.grade === gradeFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certified Onion Marketplace</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Direct buyer access to verified Grade A and B onion batches backed by blockchain certificates.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Filter Grade:</span>
          {['all', 'A', 'B'].map(g => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                gradeFilter === g
                  ? 'bg-primary-900 text-white dark:bg-primary-950 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {g === 'all' ? 'All Certified Batches' : `Grade ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden flex flex-col justify-between hover:shadow-card-hover transition"
          >
            <div>
              {/* Header Badge */}
              <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{item.variety}</h3>
                  <p className="text-xs text-amber-200 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {item.region} District
                  </p>
                </div>
                <GradeBadge grade={item.grade} />
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="flex justify-between items-baseline border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div>
                    <p className="text-gray-500">Estimated Price Range</p>
                    <p className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">
                      {formatCurrency(item.estimatedPrice.min)} – {formatCurrency(item.estimatedPrice.max)} <span className="text-xs font-normal text-gray-500">/q</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Quantity</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{item.quantity} {item.unit}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Quality Score:</span>
                    <strong className="text-green-600 font-bold">{item.qualityScore}/100</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Condition:</span>
                    <strong>{item.storageType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Shelf Life:</span>
                    <strong>{item.shelfLife.min}–{item.shelfLife.max} days</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Farmer Reputation:</span>
                    <strong className="flex items-center gap-1 text-gold-600 font-bold">
                      <Star size={12} fill="currentColor" /> {item.reputationScore}% Verified
                    </strong>
                  </div>
                </div>

                {item.certificateVerified && (
                  <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 font-bold flex items-center gap-1.5 text-[11px]">
                    <ShieldCheck size={14} className="text-purple-600" />
                    <span>Blockchain Certificate Verified</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <button
                onClick={() => navigate(`/verify-certificate/${item.batchId}`)}
                className="btn-secondary flex-1 text-xs py-2 font-semibold"
              >
                View Certificate
              </button>
              <button
                onClick={() => alert(`Inquiry sent to seller ${item.farmerName} for batch ${item.batchId}!`)}
                className="btn-primary flex-1 text-xs py-2 font-semibold"
              >
                Express Buying Interest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
