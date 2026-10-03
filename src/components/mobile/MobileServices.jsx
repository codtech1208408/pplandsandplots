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
    <div className="md:hidden space-y-3 py-2">
      {/* Section Header */}
      <div className="space-y-0.5" data-aos="fade-up">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 bg-amber-500 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            OUR SERVICES
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Explore Services
        </h2>
      </div>

      {/* Vertical Stacked Service Cards */}
      <div className="grid grid-cols-1 gap-3">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onClick={() => navigate('/portfolio')}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center p-2.5 gap-3 cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <Icon className="w-3 h-3" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                    {service.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2">
                  {service.desc}
                </p>

                <button className="pt-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
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
