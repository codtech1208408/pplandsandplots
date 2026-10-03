import React from 'react';
import { Eye, Target } from 'lucide-react';

export default function MobileVisionMission() {
  return (
    <div className="md:hidden space-y-3 py-2">
      {/* Banner Container Header */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white p-3.5 space-y-1 text-center shadow-md border border-slate-800" data-aos="fade-up">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
          alt="Vision Mission Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        
        <div className="relative z-10 text-left">
          <h2 className="text-lg font-extrabold text-white">
            Our Vision & Mission
          </h2>
          <p className="text-[10px] text-slate-300">
            Building a stronger Telangana, one plot at a time.
          </p>
        </div>
      </div>

      {/* Vertical Stacked Cards */}
      <div className="space-y-3">
        {/* Vision Card */}
        <div className="w-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-3.5 space-y-2 shadow-sm" data-aos="fade-right">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-amber-200">
              Our Vision
            </h3>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-normal font-medium">
            To be the most trusted real estate partner in Telangana, making land and plot ownership achievable and affordable for every family.
          </p>
        </div>

        {/* Mission Card */}
        <div className="w-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl p-3.5 space-y-2 shadow-sm" data-aos="fade-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-red-200">
              Our Mission
            </h3>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-normal font-medium">
            To empower Telangana buyers with transparent, reliable real estate services, ensuring families and investors buy with complete legal confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
