import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Maximize2, ShieldCheck, MessageSquare, Eye } from 'lucide-react';

export default function MobilePropertyCard({ property, onSelect }) {
  const whatsappMessage = `Hello PP LANDS & PLOTS, I am interested in property: "${property.title}" (${property.size}, Location: ${property.location}). Please send more details.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md space-y-3 p-3 flex flex-col justify-between">
      {/* Property Image Header */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* For Sale Badge top right */}
        <div className="absolute top-2.5 right-2.5">
          <span className="bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            For Sale
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-2.5 px-1">
        {/* Location Pin */}
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span>{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight line-clamp-1">
          {property.title}
        </h3>

        {/* Specs Chips: Size & Price */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 font-bold">
            <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
            <span>{property.size}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg text-slate-900 dark:text-white font-extrabold">
            <span className="text-red-500">₹</span>
            <span>{property.price.replace(/Price on Request/i, 'Call for Price')}</span>
          </div>
        </div>

        {/* Badges: DTCP Approved & Facing */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
            {property.approval}
          </span>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
            West Facing
          </span>
        </div>
      </div>

      {/* Action Buttons: View Details (Dark/Red) & WhatsApp (Green) */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => onSelect(property)}
          className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
