import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PolicyBanner from './PolicyBanner';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Eye, 
  MessageSquare,
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

export default function PropertyDetailsModal({ property, onClose }) {
  const { openEnquiry } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const isSold = property.status === 'Sold Out' || property.status === 'Sold';
  const whatsappMessage = isSold 
    ? `Hello PP LANDS & PLOTS, I noticed that property "${property.title}" (${property.size}, Location: ${property.location}) is marked as Sold Out. Do you have similar available plots/land in this area?`
    : `Hello PP LANDS & PLOTS, I am interested in property details: "${property.title}" (${property.size}, Location: ${property.location}). Please provide complete details.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed top-16 sm:top-20 md:top-28 bottom-14 md:bottom-0 left-0 right-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border-0 md:border border-slate-200 dark:border-slate-800 rounded-none md:rounded-3xl max-w-4xl w-full h-full md:h-auto md:max-h-[85vh] overflow-y-auto shadow-2xl relative my-0 flex flex-col justify-between">
        
        <div className="w-full shrink-0">
          {/* Main Image Banner - Large, Full Bleed Height on Mobile & Desktop */}
          <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] bg-slate-950 overflow-hidden shrink-0 rounded-t-none md:rounded-t-3xl">
            {/* Main Image */}
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Gradient Overlay for Top Bar readability */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

            {/* Floating Top Control Bar */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg active:scale-95 transition-all"
                aria-label="Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                {property.images.length > 1 && (
                  <span className="font-extrabold text-xs font-mono text-white bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                    {activeImageIndex + 1} / {property.images.length}
                  </span>
                )}

                <button
                  onClick={onClose}
                  className="hidden md:flex p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-lg active:scale-95 transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Floating Left & Right Overlay Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 active:scale-95 transition-all shadow-xl"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => {
                    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 active:scale-95 transition-all shadow-xl"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Modal Content Body */}
          <div className="p-4 md:p-8 space-y-5">
            {/* Title & Location */}
            <div className="space-y-1">
              <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                {property.title}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>{property.location}</span>
              </p>
            </div>

            {/* Price, Size & Status Row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xl font-extrabold text-red-600 dark:text-red-400">
                {property.price}
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-lg shadow-sm">
                {property.size}
              </span>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-lg border uppercase tracking-wider ${
                isSold
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                  : property.status === 'Reserved'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : property.status === 'Coming Soon'
                  ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              }`}>
                {property.status || 'Available'}
              </span>
            </div>

            {/* Feature Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                🏷️ {property.approval}
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                🧭 West Facing
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                📜 Clear Title
              </span>
            </div>

            {/* Property Highlights */}
            <div className="space-y-2.5 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Property Highlights
              </h3>
              <div className="space-y-2">
                {[
                  "Well developed area",
                  "Good connectivity to Hyderabad",
                  "Suitable for residential / investment"
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Overview</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            <PolicyBanner />
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-20 grid grid-cols-2 gap-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              openEnquiry(property);
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Enquire Now</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
