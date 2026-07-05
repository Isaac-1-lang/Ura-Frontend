'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { BarChart2, Download, PieChart, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const [districtData, setDistrictData] = useState<any[]>([]);
  const [provinceData, setProvinceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/reports/beneficiaries-per-district'),
      api.get('/reports/beneficiaries-per-province')
    ]).then(([districts, provinces]) => {
      setDistrictData(districts);
      setProvinceData(provinces);
      setLoading(false);
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View insights and export data.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-xl shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-3">
                <PieChart className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Beneficiaries by Province</h2>
            </div>
            <div className="space-y-5">
              {provinceData.map((item, idx) => {
                // Simplified percentage logic for UI purposes
                const max = Math.max(...provinceData.map(d => d._count._all), 1);
                const percent = (item._count._all / max) * 100;
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.province}</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{item._count._all}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {provinceData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <PieChart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No province data available</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mr-3">
                <BarChart2 className="h-5 w-5 text-indigo-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Beneficiaries by District</h2>
            </div>
            <div className="space-y-5">
              {districtData.map((item, idx) => {
                const max = Math.max(...districtData.map(d => d._count._all), 1);
                const percent = (item._count._all / max) * 100;
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.district}</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{item._count._all}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {districtData.length === 0 && (
                 <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                 <BarChart2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                 <p>No district data available</p>
               </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
