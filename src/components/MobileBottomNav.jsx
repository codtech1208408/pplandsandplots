import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Building2, Mail, User } from 'lucide-react';

export default function MobileBottomNav() {
  const { currentRoute, navigate, openEnquiry } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => navigate('/'),
      isActive: currentRoute === '/'
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: Building2,
      action: () => navigate('/portfolio'),
      isActive: currentRoute === '/portfolio'
    },
    {
      id: 'enquiry',
      label: 'Enquiry',
      icon: Mail,
      action: () => openEnquiry(null),
      isActive: false
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      action: () => navigate('/contact'),
      isActive: currentRoute === '/contact'
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-2 px-4 shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center gap-1 transition-colors py-1 px-3 rounded-xl ${
                item.isActive
                  ? 'text-red-600 dark:text-red-500 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.isActive ? 'text-red-600 dark:text-red-500' : ''}`} />
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
