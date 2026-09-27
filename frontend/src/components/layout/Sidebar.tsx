import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard, ClipboardCheck, Layers, Radio, BarChart3, Globe2,
  Building2, Shield, FileText, AlertTriangle, ShoppingCart, TrendingUp,
  MessageCircle, History, GitBranch, Box, Settings, Users, Cpu, RefreshCw,
  Activity, ScrollText, ChevronLeft, ChevronRight, RefreshCcw, Wheat,
  Scale
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  roles?: string[];
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Assessments', path: '/assessments', icon: <ClipboardCheck size={18} />, badge: 12 },
      { label: 'Batch Grading', path: '/batch-grading', icon: <Scale size={18} />, roles: ['procurement_officer', 'agricultural_expert', 'admin'] },
      { label: 'Live Assessments', path: '/live-assessments', icon: <Radio size={18} />, roles: ['procurement_officer', 'admin'] },
      { label: 'Farmers', path: '/assessment-history', icon: <Wheat size={18} />, roles: ['procurement_officer', 'admin'] },
      { label: 'Centers', path: '/procurement-centers', icon: <Building2 size={18} />, roles: ['procurement_officer', 'admin'] },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Quality Analytics', path: '/quality-analytics', icon: <BarChart3 size={18} /> },
      { label: 'Regional Intelligence', path: '/regional-intelligence', icon: <Globe2 size={18} /> },
      { label: 'Price Insights', path: '/price-insights', icon: <TrendingUp size={18} /> },
      { label: 'Knowledge Graph', path: '/knowledge-graph', icon: <GitBranch size={18} />, roles: ['admin', 'agricultural_expert'] },
    ],
  },
  {
    title: 'Trust & Verification',
    items: [
      { label: 'Certificates', path: '/blockchain-certificates', icon: <Shield size={18} /> },
      { label: 'Reports', path: '/reports', icon: <FileText size={18} /> },
      { label: 'Disputes', path: '/disputes', icon: <AlertTriangle size={18} />, badge: 12 },
      { label: 'Integrity Alerts', path: '/integrity-alerts', icon: <AlertTriangle size={18} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Marketplace',
    items: [
      { label: 'Marketplace', path: '/marketplace', icon: <ShoppingCart size={18} /> },
      { label: 'Digital Twin', path: '/digital-twin', icon: <Box size={18} />, roles: ['admin', 'procurement_officer'] },
      { label: 'WhatsApp AI', path: '/whatsapp-ai', icon: <MessageCircle size={18} />, roles: ['admin', 'procurement_officer'] },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'User Management', path: '/admin/users', icon: <Users size={18} />, roles: ['admin'] },
      { label: 'Model Management', path: '/admin/model-management', icon: <Cpu size={18} />, roles: ['admin'] },
      { label: 'Retraining Queue', path: '/admin/retraining-queue', icon: <RefreshCw size={18} />, roles: ['admin'] },
      { label: 'System Health', path: '/admin/system-health', icon: <Activity size={18} />, roles: ['admin'] },
      { label: 'Audit Logs', path: '/admin/audit-logs', icon: <ScrollText size={18} />, roles: ['admin'] },
    ],
  },
];

export default function Sidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredSections = navSections
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        !item.roles || (user && item.roles.includes(user.role))
      ),
    }))
    .filter(section => section.items.length > 0);

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-sidebar-bg min-h-screen flex flex-col transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold-400 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">🧅</span>
        </div>
        {!collapsed && (
          <span className="text-white font-semibold text-lg tracking-tight">Agro Mitra</span>
        )}
      </div>

      {/* Current Workspace */}
      {!collapsed && user?.procurementCenter && (
        <div className="mx-3 mb-4 px-3 py-2.5 bg-sidebar-hover rounded-lg">
          <p className="text-xs text-sidebar-text/60 mb-1">Current workspace</p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gold-400/20 flex items-center justify-center text-gold-400 text-xs font-bold">
              NC
            </div>
            <span className="text-white text-sm font-medium">{user.procurementCenter}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto scrollbar-thin">
        {filteredSections.map((section, sIdx) => (
          <div key={sIdx} className="mb-4">
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[11px] uppercase tracking-wider text-sidebar-text/40 font-medium">
                {section.title}
              </p>
            )}
            {section.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-sidebar-active text-white'
                      : 'text-sidebar-text/70 hover:bg-sidebar-hover hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-gold-400 text-primary-900 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Field Sync */}
      {!collapsed && (
        <div className="mx-3 mb-4 px-3 py-3 bg-sidebar-hover rounded-lg">
          <div className="flex items-center gap-2 text-sidebar-text">
            <RefreshCcw size={14} />
            <span className="text-sm font-medium">{t('sync.fieldSync')}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-sidebar-text/60">{t('sync.lastSync')} 2 min ago</span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="px-3 mb-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive ? 'bg-sidebar-active text-white' : 'text-sidebar-text/70 hover:bg-sidebar-hover hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`
          }
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-800 transition z-10"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
