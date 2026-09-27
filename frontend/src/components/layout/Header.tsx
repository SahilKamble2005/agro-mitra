import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { notifications as mockNotifications } from '@/data/mockData';
import {
  Search, Bell, Sun, Moon, Globe, Wifi, WifiOff, ChevronDown,
  LogOut, Settings, User as UserIcon
} from 'lucide-react';
import type { Language } from '@/types';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isOnline] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const langLabels: Record<Language, string> = { en: 'EN', hi: 'HI', mr: 'MR' };
  const langNames: Record<Language, string> = { en: 'English', hi: 'हिंदी', mr: 'मराठी' };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Online Status */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
          isOnline
            ? 'text-green-700 bg-green-50 border-green-200'
            : 'text-red-700 bg-red-50 border-red-200'
        }`}>
          {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isOnline ? t('status.online') : t('status.offline')}
        </div>

        {/* Language */}
        <div className="relative">
          <button
            onClick={() => { setShowLangMenu(!showLangMenu); setShowNotifications(false); setShowProfile(false); }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300"
          >
            <Globe size={16} />
            <span className="font-medium">{langLabels[language]}</span>
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              {(Object.keys(langNames) as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    language === lang ? 'text-primary-700 font-medium' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {langNames[lang]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); setShowLangMenu(false); }}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.slice(0, 5).map(n => (
                  <button
                    key={n.id}
                    onClick={() => { if (n.link) navigate(n.link); setShowNotifications(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                      !n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); setShowLangMenu(false); }}
            className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-white text-xs font-bold">
              {user ? getInitials(user.name) : '?'}
            </div>
          </button>
          {showProfile && user && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary-100 text-primary-800">
                  {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <button
                onClick={() => { navigate('/settings'); setShowProfile(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <Settings size={14} /> Settings
              </button>
              <button
                onClick={() => { logout(); navigate('/login'); setShowProfile(false); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {(showNotifications || showProfile || showLangMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotifications(false); setShowProfile(false); setShowLangMenu(false); }}
        />
      )}
    </header>
  );
}
