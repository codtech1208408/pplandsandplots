import React from 'react';
import { useApp } from '../context/AppContext';
import PolicyBanner from '../components/PolicyBanner';
import { COMPANY_VALUES } from '../data/properties';
import { ShieldCheck, Compass, Eye, Phone, MessageSquare } from 'lucide-react';

export default function AboutPage() {
  const { COMPANY_DETAILS } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Offline Business Established 2023</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          About PP LANDS & PLOTS
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Your trusted, transparent, and reliable real estate partner for land and plot ownership across Telangana.
        </p>
      </div>

      {/* Our Story & Background */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6" data-aos="fade-right">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Story & Operational Roots
          </h2>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {COMPANY_DETAILS.name} was established offline in <strong>2023</strong> in <strong>Shankarpally, Hyderabad, Telangana</strong>. From day one, our mission has been clear: to eliminate complexity and lack of clarity in real estate transactions.
          </p>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Land and plots represent security, wealth growth, and homebuilding dreams for families. We serve both modest families purchasing their first residential open plot and seasoned investors acquiring agricultural or commercial land parcels in high-potential growth zones.
          </p>

          <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Established</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">2023</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Offline Foundations</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Location</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">Shankarpally</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Hyderabad, Telangana</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative" data-aos="fade-left" data-aos-delay="200">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
              alt="Land opportunities in Telangana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 p-5 rounded-2xl shadow-xl backdrop-blur-md">
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                Primary Business Focus
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Land Sales • Plot Sales • Property Buying • Property Selling • Real Estate Investments
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Vision & Mission Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vision Card */}
        <div 
          data-aos="fade-right"
          className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl border border-emerald-800/60 shadow-xl space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
            Company Vision
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            Our Vision
          </h3>
          <p className="text-base text-slate-200 leading-relaxed font-medium">
            "{COMPANY_DETAILS.vision}"
          </p>
        </div>

        {/* Mission Card */}
        <div 
          data-aos="fade-left"
          className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
            Company Mission
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            Our Mission
          </h3>
          <p className="text-base text-slate-200 leading-relaxed font-medium">
            "{COMPANY_DETAILS.mission}"
          </p>
        </div>

      </div>

      {/* Core Values */}
      <div className="space-y-8" data-aos="fade-up">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Guiding Principles
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Business Values
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            We adhere strictly to factual business practices without false guarantees or exaggerated numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_VALUES.map((val, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                {val.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Booking & Site Visit Policy */}
      <div data-aos="fade-up">
        <PolicyBanner />
      </div>

      {/* Contact CTA Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6" data-aos="zoom-in">
        <h2 className="text-3xl font-extrabold text-white">
          Speak Directly With PP LANDS & PLOTS
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Located in Shankarpally, Hyderabad. Contact us via phone or WhatsApp to schedule a site visit or inquire about land opportunities.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href={COMPANY_DETAILS.contact.telUrl}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {COMPANY_DETAILS.contact.formattedPhone}</span>
          </a>

          <a
            href={COMPANY_DETAILS.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

    </div>
  );
}
