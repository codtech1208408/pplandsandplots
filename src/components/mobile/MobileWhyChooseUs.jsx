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
      title: 'Trusted Guidance',
      desc: 'Professional assistance throughout your property journey.',
      icon: Users
    },
    {
      id: '3',
      title: 'Investment Growth',
      desc: 'Discover land opportunities suitable for your financial goals.',
      icon: BarChart3
    },
    {
      id: '4',
      title: 'Verified Titles',
      desc: 'Clear title documentation & legal safety guaranteed.',
      icon: FileCheck
    }
  ];

  return (
    <div className="md:hidden space-y-3 py-2">
      {/* Header */}
      <div className="space-y-0.5" data-aos="fade-up">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 bg-amber-500 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            WHY CHOOSE US
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Why PP LANDS & PLOTS?
        </h2>
      </div>

      {/* Vertical Grid Feature Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
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
