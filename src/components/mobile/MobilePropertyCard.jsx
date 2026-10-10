import React from 'react';
import { MapPin, Maximize2, MessageSquare, Eye } from 'lucide-react';

export default function MobilePropertyCard({ property, onSelect }) {
  const isSold = property.status === 'Sold Out' || property.status === 'Sold';
  const whatsappMessage = isSold 
    ? `Hello PP LANDS & PLOTS, I noticed that property: "${property.title}" (${property.size}, Location: ${property.location}) is marked Sold Out. Do you have similar available plots/land in this area?`
    : `Hello PP LANDS & PLOTS, I am interested in property: "${property.title}" (${property.size}, Location: ${property.location}). Please send more details.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md space-y-2 p-2.5 flex flex-col justify-between h-full ${isSold ? 'opacity-95' : ''}`}>
      {/* Property Image Header */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-full object-cover ${isSold ? 'grayscale-[20%]' : ''}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Dynamic Status Badge top right */}
        <div className="absolute top-2 right-2">
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider ${
            isSold
              ? 'bg-rose-600 text-white'
              : property.status === 'Reserved'
              ? 'bg-amber-500 text-slate-950 font-black'
              : property.status === 'Coming Soon'
              ? 'bg-sky-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            {property.status || 'Available'}
          </span>
        </div>

        {/* Sold Out Visual Overlay on Mobile */}
        {isSold && (
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px] flex items-center justify-center pointer-events-none">
            <span className="bg-rose-600/95 text-white font-black text-xs px-3 py-1 rounded-lg border border-rose-300 uppercase tracking-widest shadow-xl rotate-[-6deg]">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="space-y-1.5 px-0.5">
        {/* Location Pin */}
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight line-clamp-1">
          {property.title}
        </h3>

        {/* Specs Chips: Size & Price */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-700 dark:text-slate-300 font-bold">
            <Maximize2 className="w-3 h-3 text-amber-500" />
            <span>{property.size}</span>
          </div>

          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-900 dark:text-white font-extrabold">
            <span className="text-red-500">₹</span>
            <span>{property.price.replace(/Price on Request/i, 'Call for Price')}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1 flex-wrap pt-0.5">
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            {property.approval}
          </span>
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            West Facing
          </span>
        </div>
      </div>

      {/* Action Buttons: View Details (Dark/Red) & WhatsApp (Green) */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <button
          onClick={() => onSelect(property)}
          className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold py-2 px-2.5 rounded-lg text-[11px] flex items-center justify-center gap-1 transition-all shadow-sm"
        >
          <Eye className="w-3 h-3" />
          <span>Details</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2.5 rounded-lg text-[11px] flex items-center justify-center gap-1 transition-all shadow-sm"
        >
          <MessageSquare className="w-3 h-3 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
