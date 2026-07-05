'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Building, Briefcase, Heart, Box, BarChart2, Bell } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Organizations', href: '/organizations', icon: Building },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Beneficiaries', href: '/beneficiaries', icon: Heart },
  { name: 'Distributions', href: '/distributions', icon: Box },
  { name: 'Reports', href: '/reports', icon: BarChart2 },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gray-900 h-full border-r border-gray-800 text-white transition-all shadow-xl z-10">
      <div className="flex items-center justify-center h-16 border-b border-gray-800 bg-gray-950/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="font-bold text-white text-lg">U</span>
          </div>
          <span className="text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">URA</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-3 space-y-1">
          <div className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                  isActive 
                    ? 'bg-blue-600/15 text-blue-400 shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-800/80 hover:text-gray-50'
                )}
              >
                <Icon className={cn('mr-3 flex-shrink-0 h-5 w-5 transition-colors', isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800 bg-gray-950/30">
        <div className="flex items-center px-3 py-2 space-x-3 bg-gray-800/50 rounded-xl">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex flex-shrink-0 items-center justify-center text-sm font-bold shadow-md">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white truncate">Admin User</span>
            <span className="text-xs text-gray-400 truncate">admin@ura.org</span>
          </div>
        </div>
      </div>
    </div>
  );
}
