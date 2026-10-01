import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { COMPANY_DETAILS } = useApp();

  const defaultMessage = `Hello PP LANDS & PLOTS, I am visiting your website and would like to inquire about land & plot opportunities in Shankarpally, Hyderabad.`;
  const whatsappUrl = `https://wa.me/919553428583?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      
      {/* Tooltip text bubble (visible on desktop hover & mobile pulse) */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <span>Chat on WhatsApp (9553428583)</span>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with PP LANDS & PLOTS on WhatsApp"
        className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageSquare className="w-7 h-7 fill-current relative z-10" />

        {/* Online Indicator Badge */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-slate-950 rounded-full z-20" />
      </a>
    </div>
  );
}
