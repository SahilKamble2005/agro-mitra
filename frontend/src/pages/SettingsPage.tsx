import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Bell, Globe, Moon, Sun, ShieldCheck } from 'lucide-react';
import type { Language } from '@/types';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings & Preferences</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage your user profile, regional preferences, language options, and theme settings.
        </p>
      </div>

      {/* User Profile Info */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-gray-700 pb-2">
          User Profile
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-500 mb-1">Full Name</label>
            <input type="text" readOnly value={user?.name || ''} className="input-field bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 mb-1">Role</label>
            <input type="text" readOnly value={user?.role || ''} className="input-field bg-gray-50 dark:bg-gray-700 capitalize" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 mb-1">Phone Number</label>
            <input type="text" readOnly value={user?.phone || ''} className="input-field bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 mb-1">Email Address</label>
            <input type="text" readOnly value={user?.email || ''} className="input-field bg-gray-50 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Language & Theme Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card space-y-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-gray-700 pb-2">
          Interface & Regional Preferences
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">System Language</p>
              <p className="text-gray-500">Switch between English, Hindi, and Marathi</p>
            </div>
            <div className="flex gap-2">
              {(['en', 'hi', 'mr'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${
                    language === l ? 'bg-primary-900 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">Appearance Theme</p>
              <p className="text-gray-500">Toggle between Light mode and Dark mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className="btn-secondary py-1.5 px-3 flex items-center gap-2"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span className="capitalize">{theme} Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
