import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Sprout, Home, Trees, ArrowRight } from 'lucide-react';

export default function MobileServices() {
  const { navigate } = useApp();

  const services = [
    {
      id: 'commercial',
      title: 'Commercial Lands',
      desc: 'Prime commercial properties for business and investment.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      icon: Building2
    },
    {
      id: 'agricultural',
      title: 'Agricultural Lands',
      desc: 'Agricultural land opportunities across promising locations.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      icon: Sprout
    },
    {
      id: 'openplots',
      title: 'Open Plots',
      desc: 'Residential plots for building your dream home.',
      image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=600&q=80',
      icon: Home
    },
    {
      id: 'ventureplots',
      title: 'Venture Plots',
      desc: 'Plotted developments with suitable documentation.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      icon: Trees
    }
  ];

  return (
    <div className="md:hidden space-y-4 py-4">
      {/* Tag */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-0.5 bg-amber-500 rounded-full" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          OUR SERVICES
        </span>
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Explore Properties
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Find the perfect land or plot for your business, home, or future investment.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              onClick={() => navigate('/portfolio')}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                <button className="pt-2 text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline">
                  <span>View Properties</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
