'use client';

import { LogOut, Search, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800/60 sticky top-0 z-20 shadow-sm transition-colors backdrop-blur-sm bg-white/90 dark:bg-gray-950/90">
      <div className="flex flex-1 items-center">
        <div className="max-w-md w-full lg:max-w-xs relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-800 rounded-full leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
            placeholder="Search..."
            type="search"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3 ml-4">
        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-950"></span>
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1"></div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
