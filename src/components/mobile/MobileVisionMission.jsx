import React from 'react';
import { Eye, Target } from 'lucide-react';

export default function MobileVisionMission() {
  return (
    <div className="md:hidden space-y-4 py-4">
      {/* Banner Container */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-6 space-y-2 text-center shadow-lg border border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
          alt="Vision Mission Background"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl font-extrabold text-white">
            Our Vision & Mission
          </h2>
          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            Building a stronger and more prosperous Telangana, one plot at a time.
          </p>
        </div>
      </div>

      {/* Vision Card */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-5 space-y-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <Eye className="w-5 h-5" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-amber-200">
          Our Vision
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          To be the most trusted real estate partner in Telangana, making land and plot ownership achievable and affordable for every family, regardless of their financial background.
        </p>
      </div>

      {/* Mission Card */}
      <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-3xl p-5 space-y-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
          <Target className="w-5 h-5" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-red-200">
          Our Mission
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          To empower the people of Telangana by providing transparent, reliable, and accessible real estate services, ensuring that everyone, from modest families to seasoned investors, can confidently buy, sell, and invest in property.
        </p>
      </div>

      {/* Tagline */}
      <div className="text-center pt-2">
        <span className="text-xs font-extrabold text-red-600 dark:text-red-400 uppercase tracking-widest">
          Trusted Lands <span className="text-slate-400">|</span> Better Future
        </span>
      </div>
    </div>
  );
}
