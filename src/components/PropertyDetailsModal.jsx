import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PolicyBanner from './PolicyBanner';
import { X, MapPin, Maximize2, ShieldCheck, Phone, MessageSquare, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PropertyDetailsModal({ property, onClose }) {
  const { openEnquiry, COMPANY_DETAILS } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const whatsappMessage = `Hello PP LANDS & PLOTS, I am interested in inquiring about property details: "${property.title}" (${property.size}, Location: ${property.location}). Please provide complete details.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="relative bg-slate-950 aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-t-3xl">
          <img
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
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
          <div className="flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-emerald-500 scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Plot Size</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <Maximize2 className="w-4 h-4 text-amber-500" />
                {property.size}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Approval Status</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {property.approval}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Availability</span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {property.status}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Property ID</span>
              <span className="text-base font-mono font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">
                {property.id}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Property Overview</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              {property.description}
            </p>
          </div>

          {/* Features List */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Key Highlights & Layout Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Policy Banner */}
          <PolicyBanner />

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                onClose();
                openEnquiry(property);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Official Enquiry</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href={COMPANY_DETAILS.contact.telUrl}
              className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call: {COMPANY_DETAILS.contact.phone}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
