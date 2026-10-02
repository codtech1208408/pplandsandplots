import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PolicyBanner from './PolicyBanner';
import { X, ArrowLeft, MapPin, Maximize2, ShieldCheck, Phone, MessageSquare, Mail, CheckCircle2, Eye } from 'lucide-react';

export default function PropertyDetailsModal({ property, onClose }) {
  const { openEnquiry, COMPANY_DETAILS } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const whatsappMessage = `Hello PP LANDS & PLOTS, I am interested in property details: "${property.title}" (${property.size}, Location: ${property.location}). Please provide complete details.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border-0 md:border border-slate-200 dark:border-slate-800 rounded-none md:rounded-3xl max-w-4xl w-full min-h-screen md:min-h-0 md:max-h-[90vh] overflow-y-auto shadow-2xl relative my-0 md:my-8 flex flex-col justify-between">
        
        <div>
          {/* Mobile Back Arrow Header (Screen 7 top bar) */}
          <div className="md:hidden flex items-center justify-between p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
            <button
              onClick={onClose}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">Property Details</span>
            <div className="w-9" />
          </div>

          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gallery Section */}
          <div className="relative bg-slate-950 aspect-[16/10] md:aspect-[21/9] overflow-hidden md:rounded-t-3xl">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Mobile For Sale badge top left & 1/5 counter bottom right */}
            <div className="absolute top-3 left-3">
              <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                For Sale
              </span>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
              {activeImageIndex + 1}/{property.images.length || 5}
            </div>
            
            <div className="hidden md:flex absolute bottom-4 left-4 right-4 items-end justify-between text-white">
              <div>
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-md">
                  {property.category}
                </span>
                <h2 id="property-modal-title" className="text-xl md:text-3xl font-extrabold text-white">
                  {property.title}
                </h2>
                <p className="flex items-center gap-1.5 text-xs md:text-sm text-slate-300 mt-1">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{property.location}</span>
                </p>
              </div>
              
              <span className="bg-slate-900/90 text-emerald-400 font-extrabold text-sm md:text-lg px-4 py-2 rounded-xl border border-emerald-500/30">
                {property.price}
              </span>
            </div>
          </div>

          {/* Thumbnails if multiple images */}
          {property.images.length > 1 && (
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-red-500 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Modal Content Body */}
          <div className="p-4 md:p-8 space-y-5">
            
            {/* Title & Location on Mobile (Screen 7 layout) */}
            <div className="space-y-1">
              <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                {property.title}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>{property.location}</span>
              </p>
            </div>

            {/* Price & Size Row */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-red-600 dark:text-red-400">
                {property.price}
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-lg shadow-sm">
                {property.size}
              </span>
            </div>

            {/* Feature Badges: DTCP Approved, West Facing, Clear Title */}
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

            {/* Property Highlights Checkmark List (Screen 7 layout) */}
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

            {/* Policy Banner */}
            <PolicyBanner />

          </div>
        </div>

        {/* Sticky Bottom Action Bar matching Screen 7 */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-20 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              openEnquiry(property);
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
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
