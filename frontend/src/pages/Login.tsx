import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, demoUsers } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, Phone, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '@/types';

export default function Login() {
  const { login, loginWithCredentials, loginWithOTP, sendOTP } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'otp' | 'password'>('otp');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    await sendOTP(phone);
    setOtpSent(true);
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithOTP(phone, otp);
    setLoading(false);
    navigate('/dashboard');
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithCredentials(email, password);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemoRoleClick = (role: UserRole) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-900 flex items-center justify-center mx-auto shadow-lg mb-3">
          <span className="text-3xl">🧅</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Agro Mitra
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Transparent quality. Fair pricing. Trusted procurement.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700">
          {/* Mode Switcher */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setMode('otp')}
              className={`flex-1 py-2.5 text-sm font-semibold border-b-2 text-center transition ${
                mode === 'otp'
                  ? 'border-primary-900 text-primary-900 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Phone OTP Login
            </button>
            <button
              onClick={() => setMode('password')}
              className={`flex-1 py-2.5 text-sm font-semibold border-b-2 text-center transition ${
                mode === 'password'
                  ? 'border-primary-900 text-primary-900 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Email & Password
            </button>
          </div>

          {mode === 'otp' ? (
            !otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="input-field pl-9"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Enter 6-digit OTP sent to {phone}
                  </label>
                  <input
                    type="text"
                    placeholder="1 2 3 4 5 6"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="input-field text-center text-lg font-bold tracking-widest"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-2.5"
                >
                  {loading ? 'Verifying...' : 'Verify & Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-xs text-primary-700 dark:text-primary-400 text-center hover:underline"
                >
                  Change Phone Number
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="officer@oniontrust.ai"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="input-field pl-9"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="input-field pl-9"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2.5"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Quick Demo Login Section */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-3">
              Quick Demo Access (One-Click)
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleDemoRoleClick('procurement_officer')}
                className="w-full bg-primary-900 text-white hover:bg-primary-800 py-2 rounded-lg text-xs font-semibold flex items-center justify-between px-3 transition"
              >
                <span>Procurement Officer (Sahil Kamble)</span>
                <Sparkles size={14} className="text-gold-400" />
              </button>
              <button
                type="button"
                onClick={() => handleDemoRoleClick('farmer')}
                className="w-full bg-green-50 hover:bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-between px-3 transition"
              >
                <span>Farmer (Rajesh Deshmukh)</span>
                <CheckCircle2 size={14} className="text-green-600" />
              </button>
              <button
                type="button"
                onClick={() => handleDemoRoleClick('agricultural_expert')}
                className="w-full bg-amber-50 hover:bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-between px-3 transition"
              >
                <span>Agricultural Expert (Dr. Meena Kulkarni)</span>
                <CheckCircle2 size={14} className="text-amber-600" />
              </button>
              <button
                type="button"
                onClick={() => handleDemoRoleClick('buyer')}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-between px-3 transition"
              >
                <span>Buyer (Amit Sharma)</span>
                <CheckCircle2 size={14} className="text-blue-600" />
              </button>
              <button
                type="button"
                onClick={() => handleDemoRoleClick('admin')}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-between px-3 transition"
              >
                <span>Admin (Priya Joshi)</span>
                <ShieldCheck size={14} className="text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
