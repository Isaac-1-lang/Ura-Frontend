'use client';

import { ReactNode, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('access_token');
    if (!token && pathname !== '/login') {
      router.push('/login');
    }
  }, [pathname, router]);

  if (!mounted) return null;

  if (pathname === '/login') {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
