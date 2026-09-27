import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  subtitleColor?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  changeType = 'positive',
  subtitle,
  subtitleColor,
  icon,
  highlight,
}: KPICardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-card transition-all duration-200 hover:shadow-card-hover',
        highlight && 'bg-primary-900 text-white dark:bg-primary-950 border-primary-800'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('text-xs font-medium text-gray-500 dark:text-gray-400', highlight && 'text-primary-200')}>
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className={cn('text-2xl font-bold text-gray-900 dark:text-white', highlight && 'text-white')}>
              {value}
            </h3>
            {change && (
              <span
                className={cn(
                  'inline-flex items-center text-xs font-semibold',
                  changeType === 'positive' && 'text-green-600 dark:text-green-400',
                  changeType === 'negative' && 'text-red-600 dark:text-red-400',
                  changeType === 'neutral' && 'text-gray-500',
                  highlight && 'text-gold-300'
                )}
              >
                {changeType === 'positive' && <ArrowUpRight size={14} className="mr-0.5" />}
                {changeType === 'negative' && <ArrowDownRight size={14} className="mr-0.5" />}
                {changeType === 'neutral' && <Minus size={14} className="mr-0.5" />}
                {change}
              </span>
            )}
          </div>
          {subtitle && (
            <p
              className={cn(
                'text-xs mt-1.5 font-medium',
                subtitleColor ? subtitleColor : 'text-gray-500 dark:text-gray-400',
                highlight && 'text-primary-200'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
              highlight && 'bg-primary-800 text-white'
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case 'approved': case 'completed': case 'verified': case 'active': case 'synced': case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'review needed': case 'pending': case 'under_review': case 'analyzing': case 'warning':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'rejected': case 'failed': case 'offline': case 'critical': case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1', getBadgeStyle())}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status.replace('_', ' ')}
    </span>
  );
}

export function GradeBadge({ grade }: { grade: string }) {
  const getGradeStyle = () => {
    switch (grade) {
      case 'A': return 'bg-green-600 text-white';
      case 'B': return 'bg-amber-500 text-white';
      case 'C': return 'bg-orange-500 text-white';
      case 'Rejected': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <span className={cn('px-2 py-0.5 rounded font-bold text-xs inline-block text-center min-w-[24px]', getGradeStyle())}>
      {grade}
    </span>
  );
}
