import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'A': return 'text-green-700 bg-green-100';
    case 'B': return 'text-amber-700 bg-amber-100';
    case 'C': return 'text-orange-700 bg-orange-100';
    case 'Rejected': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

export function getGradeBgColor(grade: string): string {
  switch (grade) {
    case 'A': return '#22c55e';
    case 'B': return '#f59e0b';
    case 'C': return '#f97316';
    case 'Rejected': return '#ef4444';
    default: return '#6b7280';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low': return 'text-blue-700 bg-blue-100';
    case 'medium': return 'text-amber-700 bg-amber-100';
    case 'high': return 'text-orange-700 bg-orange-100';
    case 'critical': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active': case 'synced': case 'verified': case 'completed': case 'resolved': case 'healthy': case 'deployed':
      return 'text-green-700 bg-green-100';
    case 'pending': case 'under_review': case 'analyzing': case 'warning': case 'testing':
      return 'text-amber-700 bg-amber-100';
    case 'offline': case 'failed': case 'rejected': case 'critical': case 'suspended':
      return 'text-red-700 bg-red-100';
    case 'draft': case 'new': case 'submitted':
      return 'text-blue-700 bg-blue-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getCurrentDateFormatted(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const DEFECT_COLORS: Record<string, string> = {
  rot: '#ef4444',
  bruising: '#f97316',
  sprouting: '#84cc16',
  cuts: '#ec4899',
  cracks: '#8b5cf6',
  discoloration: '#eab308',
};

export const GRADE_LABELS: Record<string, string> = {
  A: 'Grade A — Premium',
  B: 'Grade B — Standard',
  C: 'Grade C — Below Standard',
  Rejected: 'Rejected',
};

export const ROLE_LABELS: Record<string, string> = {
  farmer: 'Farmer',
  procurement_officer: 'Procurement Officer',
  agricultural_expert: 'Agricultural Expert',
  buyer: 'Buyer',
  admin: 'Admin',
};
