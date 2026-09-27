import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { ArrowLeft, CheckCircle2, User, Building, Store, ShieldCheck } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('farmer');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    region: 'Nashik',
    centerName: '',
    businessName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-800 mb-6"
        >
          <ArrowLeft size={16} /> Back to Sign In
        </button>

        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Agro Mitra Onboarding
          </h2>
          <p className="text-xs text-gray-500 text-center mt-1 mb-6">
            Register your profile to participate in verified quality procurement.
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {(['farmer', 'procurement_officer', 'buyer', 'agricultural_expert'] as UserRole[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition flex flex-col items-center gap-1.5 ${
                  role === r
                    ? 'border-primary-900 bg-primary-50 text-primary-900 dark:bg-primary-950 dark:text-primary-300 dark:border-primary-400'
                    : 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400'
                }`}
              >
                {r === 'farmer' && <User size={18} />}
                {r === 'procurement_officer' && <Building size={18} />}
                {r === 'buyer' && <Store size={18} />}
                {r === 'agricultural_expert' && <ShieldCheck size={18} />}
                <span className="capitalize">{r.replace('_', ' ')}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Rajesh Deshmukh"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rajesh@demo.oniontrust.ai"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Region / District</label>
              <select
                value={formData.region}
                onChange={e => setFormData({ ...formData, region: e.target.value })}
                className="input-field"
              >
                <option value="Nashik">Nashik</option>
                <option value="Pune">Pune</option>
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="Solapur">Solapur</option>
                <option value="Satara">Satara</option>
              </select>
            </div>

            {role === 'procurement_officer' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Procurement Center Name</label>
                <input
                  type="text"
                  required
                  placeholder="Nashik Central APMC"
                  value={formData.centerName}
                  onChange={e => setFormData({ ...formData, centerName: e.target.value })}
                  className="input-field"
                />
              </div>
            )}

            {role === 'buyer' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Company / Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="Agro Global Traders Ltd."
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  className="input-field"
                />
              </div>
            )}

            <button type="submit" className="w-full btn-primary py-2.5 font-bold mt-4">
              Complete Onboarding & Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
