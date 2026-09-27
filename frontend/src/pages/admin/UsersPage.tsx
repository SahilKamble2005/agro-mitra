import React, { useState } from 'react';
import { demoUsers } from '@/contexts/AuthContext';
import { Users, UserPlus, Shield, CheckCircle2, UserX } from 'lucide-react';
import { StatusBadge } from '@/components/ui/Cards';

export default function UsersPage() {
  const usersList = Object.values(demoUsers);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin User Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage platform users, assign RBAC roles, and control procurement center access.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-xs text-gray-400 uppercase">
                <th className="py-3 px-4 font-semibold">User ID</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Region</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {usersList.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/40 transition">
                  <td className="py-3 px-4 font-mono font-medium text-xs text-gray-900 dark:text-white">{u.id}</td>
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white text-xs">{u.name}</td>
                  <td className="py-3 px-4 text-xs capitalize text-primary-800 dark:text-primary-300 font-semibold">{u.role.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-xs text-gray-700 dark:text-gray-300">{u.region}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{u.phone}</td>
                  <td className="py-3 px-4"><StatusBadge status={u.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
