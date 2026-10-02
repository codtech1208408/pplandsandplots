import React from 'react';
import { ShieldCheck, Users, BarChart3, FileCheck } from 'lucide-react';

export default function MobileWhyChooseUs() {
  const features = [
    {
      id: '1',
      title: 'Transparent Process',
      desc: 'Clear information and straightforward property transactions.',
      icon: ShieldCheck
    },
    {
      id: '2',
      title: 'Trusted Property Guidance',
      desc: 'Professional assistance throughout your property journey.',
      icon: Users
    },
    {
      id: '3',
      title: 'Investment Opportunities',
      desc: 'Discover land opportunities suitable for different investment goals.',
      icon: BarChart3
    },
    {
      id: '4',
      title: 'Documentation Focused',
      desc: 'Property documentation and title-related information presented clearly.',
      icon: FileCheck
    }
  ];

  return (
    <div className="md:hidden space-y-4 py-4">
      {/* Tag */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-0.5 bg-amber-500 rounded-full" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          WHY CHOOSE US
        </span>
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Why PP LANDS & PLOTS?
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Your trusted partner in land and plot investments across Telangana.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
