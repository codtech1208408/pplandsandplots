import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, ArrowRight } from 'lucide-react';

export default function MobileLocations() {
  const { navigate } = useApp();

  const locations = [
    {
      id: 'shankarpally',
      name: 'Shankarpally',
      desc: 'Premium plots & lands with great connectivity.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      desc: 'Growing opportunities in the heart of the city.',
      image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'telangana',
      name: 'Telangana',
      desc: 'Wide range of land & plot options across Telangana.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="md:hidden space-y-4 py-4">
      {/* Tag */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-0.5 bg-amber-500 rounded-full" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          LOCATIONS
        </span>
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Explore Our Locations
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Find the best land and plot opportunities in key locations across Telangana.
        </p>
      </div>

      {/* Location Cards List */}
      <div className="space-y-3 pt-2">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => navigate('/portfolio')}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Image Thumbnail */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {loc.name}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {loc.desc}
                </p>
              </div>

              <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Red CTA Button */}
      <button
        onClick={() => navigate('/portfolio')}
        className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-2"
      >
        <span>Explore Properties Near You</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
