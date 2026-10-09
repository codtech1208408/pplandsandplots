import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, ArrowUp, Instagram, Facebook, Youtube } from 'lucide-react';
import Logo from '../Logo';

export default function MobileFooter() {
  const { navigate, COMPANY_DETAILS } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="md:hidden bg-slate-950 text-slate-200 border-t border-slate-800 pt-8 pb-20 px-4 space-y-6 relative">
      {/* Brand Header */}
      <div className="space-y-2">
        <Logo size="md" />
        <p className="text-xs text-slate-400 font-semibold tracking-wide">
          Lands • Plots • Investments
        </p>
      </div>

      {/* Quick Links */}
      <div className="space-y-3 pt-2 border-t border-slate-900">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
          Quick Links
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { label: 'Home', route: '/' },
            { label: 'Properties', route: '/portfolio' },
            { label: 'About Us', route: '/about' },
            { label: 'Services', route: '/services' },
            { label: 'Locations', route: '/portfolio' },
            { label: 'Contact', route: '/contact' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.route)}
              className="w-full flex items-center justify-between text-slate-300 hover:text-white py-1 transition-colors text-left"
            >
              <span>→ {item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="space-y-3 pt-2 border-t border-slate-900">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
          Services
        </h3>
        <div className="space-y-2 text-xs">
          {[
            'Buy Property',
            'Sell Property',
            'Investments',
            'Commercial Lands',
            'Agricultural Lands',
            'Open Plots',
            'Venture Plots'
          ].map((srv, idx) => (
            <button
              key={idx}
              onClick={() => navigate('/services')}
              className="w-full flex items-center justify-between text-slate-300 hover:text-white py-1 transition-colors text-left"
            >
              <span>→ {srv}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Follow Us */}
      <div className="space-y-3 pt-2 border-t border-slate-900">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
          Follow Us
        </h3>
        <div className="flex items-center gap-3">
          <a
            href={COMPANY_DETAILS.social?.instagram || "https://www.instagram.com/pplandsandplots?obrf=MXQ2NXY2YnFpY3k5Zg%3D%3D&utm_source=qr"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={COMPANY_DETAILS.social?.youtube || "http://www.youtube.com/@PPLP-3008"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            title="YouTube"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href={COMPANY_DETAILS.social?.facebook || "https://www.facebook.com/share/19g2oXzEYi/?mibextid=wwXIfr"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            title="Facebook"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 fill-current" />
          </a>
        </div>
      </div>

      {/* Back to Top Yellow Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-36 right-4 md:bottom-24 md:right-6 z-40 w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shadow-xl hover:bg-amber-500 active:scale-95 transition-all"
        title="Back to Top"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
      </button>

      {/* Copyright */}
      <div className="pt-4 border-t border-slate-900 text-center text-[10px] text-slate-500 font-medium">
        © {new Date().getFullYear()} PP LANDS & PLOTS. All rights reserved.
      </div>
    </footer>
  );
}
