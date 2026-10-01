import React from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import PolicyBanner from './PolicyBanner';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { PROPERTY_CATEGORIES } from '../data/properties';

export default function Footer() {
  const { navigate, COMPANY_DETAILS } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      {/* Top Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-slate-400 leading-relaxed">
              {COMPANY_DETAILS.name} is an offline-established real estate enterprise in Shankarpally, Hyderabad (est. 2023). Dedicated to transparent, reliable, and accessible land & plot solutions for families and investors across Telangana.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-lg px-3 py-2 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Offline Business Established 2023</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base tracking-wide uppercase">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home Page', route: '/' },
                { name: 'About PP LANDS & PLOTS', route: '/about' },
                { name: 'Our Real Estate Services', route: '/services' },
                { name: 'Property Portfolio', route: '/portfolio' },
                { name: 'Contact & Enquiries', route: '/contact' }
              ].map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => navigate(link.route)}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Property Categories */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base tracking-wide uppercase">Property Focus</h3>
            <ul className="space-y-2 text-sm">
              {PROPERTY_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate('/portfolio')}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group text-slate-400 hover:translate-x-1 duration-200 text-left"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base tracking-wide uppercase">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={COMPANY_DETAILS.contact.telUrl}
                  className="flex items-start gap-3 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block">Phone Call</span>
                    <span className="font-semibold">{COMPANY_DETAILS.contact.formattedPhone}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_DETAILS.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block">WhatsApp Chat</span>
                    <span className="font-semibold">{COMPANY_DETAILS.contact.whatsapp}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_DETAILS.contact.mailtoUrl}
                  className="flex items-start gap-3 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block">Official Email</span>
                    <span className="font-semibold">{COMPANY_DETAILS.contact.email}</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs text-slate-400 block">Office Location</span>
                    <span>{COMPANY_DETAILS.location.fullAddress}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Policy Notice Banner */}
        <PolicyBanner className="bg-slate-800/80 border-amber-500/30 text-slate-200" />

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {COMPANY_DETAILS.name}. Established 2023 in Shankarpally, Hyderabad, Telangana. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-500">Transparent • Reliable • Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
