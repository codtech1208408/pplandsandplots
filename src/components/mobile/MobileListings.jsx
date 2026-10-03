import React from 'react';
import { useApp } from '../../context/AppContext';
import MobilePropertyCard from './MobilePropertyCard';
import { Sparkles } from 'lucide-react';

export default function MobileListings() {
  const { properties, setSelectedProperty } = useApp();

  return (
    <div className="md:hidden space-y-3 py-2">
      {/* Section Header */}
      <div className="space-y-0.5" data-aos="fade-up">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>FEATURED PLOTS</span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Explore Our Listings
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
          {properties.length} prime properties available
        </p>
      </div>

      {/* Vertical Stacked Property Cards */}
      <div className="space-y-3.5">
        {properties.map((prop, idx) => (
          <div 
            key={prop.id} 
            className="w-full"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <MobilePropertyCard
              property={prop}
              onSelect={(p) => setSelectedProperty(p)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
