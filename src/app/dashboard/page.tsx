'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Users, Building, Briefcase, Heart, Box } from 'lucide-react';

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/summary')
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const stats = [
    { name: 'Total Organizations', value: summary?.totalOrganizations || 0, icon: Building, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Total Projects', value: summary?.totalProjects || 0, icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { name: 'Total Beneficiaries', value: summary?.totalBeneficiaries || 0, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { name: 'Distributions Made', value: summary?.totalDistributions || 0, icon: Box, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Total Users', value: summary?.totalUsers || 0, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
            <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back to the URA admin portal.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-900 overflow-hidden rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow group">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-xl p-3 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 min-h-[400px] flex items-center justify-center">
         <p className="text-gray-400 dark:text-gray-500 text-sm">Dashboard Widgets Configuration Coming Soon</p>
      </div>
    </div>
  );
}
