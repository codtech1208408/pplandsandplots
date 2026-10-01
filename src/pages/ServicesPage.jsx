import React from 'react';
import { useApp } from '../context/AppContext';
import PolicyBanner from '../components/PolicyBanner';
import { SERVICES_LIST } from '../data/properties';
import { Landmark, Layout, Home, TrendingUp, PieChart, ArrowRight, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

export default function ServicesPage() {
  const { openEnquiry, COMPANY_DETAILS, navigate } = useApp();

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'MapPin':
        return <Landmark className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      case 'Layout':
        return <Layout className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      case 'Home':
        return <Home className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      case 'PieChart':
        return <PieChart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Landmark className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4" data-aos="fade-up">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Professional Real Estate Assistance
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Our Real Estate Services
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Transparent, reliable, and accessible land and plot services across Shankarpally, Hyderabad, and Telangana.
        </p>
      </div>

      {/* Services Breakdown List */}
      <div className="space-y-8">
        {SERVICES_LIST.map((service, index) => (
          <div
            key={service.id}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 shrink-0">
                  {getServiceIcon(service.icon)}
                </div>
                <div>
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                    Service 0{index + 1}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {service.name}
                  </h2>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {service.fullDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {[
                  "Verified documentation check",
                  "Direct owner & plot buyer coordination",
                  "Transparent pricing guidance",
                  "Site visit arrangements in Shankarpally"
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-3 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-700/60">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Interested in {service.name}?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Contact our Shankarpally team to explore available choices or list your property.
              </p>

              <button
                onClick={() => openEnquiry(null)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Enquire About {service.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={COMPANY_DETAILS.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Policy Banner */}
      <div data-aos="fade-up">
        <PolicyBanner />
      </div>

      {/* Final Contact Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6" data-aos="zoom-in">
        <h2 className="text-3xl font-extrabold text-white">
          Need Custom Property Consultation?
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Contact PP LANDS & PLOTS directly or send an enquiry form. We are ready to assist you with plot buying, selling, or agricultural land investments.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/contact')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
          >
            <span>Go to Contact Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={COMPANY_DETAILS.contact.telUrl}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call: {COMPANY_DETAILS.contact.formattedPhone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
