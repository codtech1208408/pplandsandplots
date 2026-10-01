import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Maximize2, ShieldCheck, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export default function PropertyCard({ property, onSelect }) {
  const { openEnquiry } = useApp();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'Reserved':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Sold':
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
      case 'Coming Soon':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/30';
    }
  };

  const whatsappMessage = `Hello PP LANDS & PLOTS, I am interested in inquiring about property: "${property.title}" (${property.size}, Location: ${property.location}). Please share more details.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group property-card-hover">
      
      {/* Property Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        
        {/* Category & Status Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {property.category}
          </span>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full border backdrop-blur-md shadow-md ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
        </div>

        {/* Featured Tag if applicable */}
        {property.featured && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>FEATURED</span>
          </div>
        )}

        {/* Demo Data Tag if demo */}
        {property.isDemo && (
          <div className="absolute bottom-3 right-3 bg-slate-900/70 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
            Sample Listing
          </div>
        )}
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            <MapPin className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{property.location}</span>
          </p>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 py-3 px-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Maximize2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Plot Size</span>
              <span className="font-bold">{property.size}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Approval</span>
              <span className="font-bold truncate max-w-[100px] block" title={property.approval}>
                {property.approval}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Price</span>
            <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-md border border-rose-200 dark:border-rose-800/50">
              {property.price}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onSelect(property)}
              className="col-span-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 py-2 px-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => openEnquiry(property)}
              className="col-span-1 bg-rose-600 hover:bg-rose-700 text-white py-2 px-2 rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1"
            >
              <span>Enquire</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80 py-2 px-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
