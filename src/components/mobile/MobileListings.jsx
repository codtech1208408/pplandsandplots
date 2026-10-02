import React from 'react';
import { useApp } from '../../context/AppContext';
import MobilePropertyCard from './MobilePropertyCard';

export default function MobileListings() {
  const { properties, setSelectedProperty } = useApp();

  return (
    <div className="md:hidden space-y-4 py-4">
      {/* Section Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Explore Our Listings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
          Showing {properties.length} properties
        </p>
      </div>

      {/* Listings Cards Stack */}
      <div className="space-y-4 pt-1">
        {properties.map((prop) => (
          <MobilePropertyCard
            key={prop.id}
            property={prop}
            onSelect={(p) => setSelectedProperty(p)}
          />
        ))}
      </div>
    </div>
  );
}
