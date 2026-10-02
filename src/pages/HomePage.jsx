import React from 'react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import PolicyBanner from '../components/PolicyBanner';
import MobileHeroAndSearch from '../components/mobile/MobileHeroAndSearch';
import MobileServices from '../components/mobile/MobileServices';
import MobileListings from '../components/mobile/MobileListings';
import MobileWhyChooseUs from '../components/mobile/MobileWhyChooseUs';
import MobileVisionMission from '../components/mobile/MobileVisionMission';
import MobileLocations from '../components/mobile/MobileLocations';
import MobileContactSection from '../components/mobile/MobileContactSection';
import { 
  PROPERTY_CATEGORIES, 
  APPROVAL_TYPES, 
  SERVICES_LIST, 
  COMPANY_VALUES 
} from '../data/properties';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Landmark, 
  Eye,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const { 
    properties, 
    navigate, 
    openEnquiry, 
    selectedProperty, 
    setSelectedProperty, 
    COMPANY_DETAILS 
  } = useApp();

  const featuredProperties = properties.filter(p => p.featured || p.status === 'Available').slice(0, 3);

  return (
    <div className="pb-16">
      
      {/* MOBILE VIEW (MATCHES USER SCREENSHOT EXACTLY ON MOBILE) */}
      <div className="block md:hidden px-4 space-y-4">
        <MobileHeroAndSearch />
        <MobileServices />
        <MobileListings />
        <MobileWhyChooseUs />
        <MobileVisionMission />
        <MobileLocations />
        <MobileContactSection />
      </div>

      {/* DESKTOP VIEW (100% UNCHANGED FOR DESKTOP SCREENS) */}
      <div className="hidden md:block space-y-16 md:space-y-24">
        
        {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white rounded-b-3xl md:rounded-b-[2.5rem] shadow-2xl">
        
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
            alt="Land and plots in Shankarpally Hyderabad"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          
          {/* Established Tag */}
          <div 
            data-aos="zoom-in" 
            data-aos-duration="600"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Offline Established Real Estate Enterprise • 2023</span>
          </div>

          {/* Headline */}
          <h1 
            data-aos="fade-up" 
            data-aos-duration="800"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Find the Right Land. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400">
              Build Your Future.
            </span>
          </h1>

          {/* Supporting Description */}
          <p 
            data-aos="fade-up" 
            data-aos-delay="150"
            data-aos-duration="800"
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Trusted land and plot solutions for families, buyers, sellers and investors across Telangana. Based in Shankarpally, Hyderabad.
          </p>

          {/* CTA Buttons */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => navigate('/portfolio')}
              className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-rose-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base flex items-center gap-2"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-8 py-4 rounded-2xl shadow-md transition-all hover:-translate-y-0.5 text-base"
            >
              Contact Us
            </button>

            <a
              href={COMPANY_DETAILS.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold px-6 py-4 rounded-2xl backdrop-blur-md transition-all text-base flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Key Trust Pillars Bar */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="400"
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto border-t border-slate-800/80"
          >
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Location</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                Shankarpally, Hyd
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Core Focus</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Landmark className="w-4 h-4 text-amber-400" />
                Land & Plot Sales
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Est. Year</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                2023 (Offline)
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold uppercase">Trust Standard</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Transparent Titles
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION & TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700/80 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
                <span>About PP LANDS & PLOTS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Empowering Telangana Families & Investors With Transparent Property Solutions
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Established offline in <strong>2023</strong> in <strong>Shankarpally, Hyderabad, Telangana</strong>, {COMPANY_DETAILS.name} was founded with a singular purpose: making land and plot ownership achievable, transparent, and dependable for everyone.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Whether you are a modest family seeking an open plot to build your dream home or a seasoned investor looking for agricultural and commercial land opportunities in high-growth corridors, we provide direct, honest property assistance built on verified title documentation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "100% Verified Layout & Document Guidance",
                  "Direct Phone & WhatsApp Support",
                  "Focus on Shankarpally & Greater Hyderabad",
                  "Support for Buyers, Sellers & Investors"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => navigate('/about')}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative" data-aos="fade-left" data-aos-delay="200">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
                <img
                  src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
                  alt="Plot venture development in Hyderabad"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block uppercase">Headquarters</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Shankarpally, Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROPERTY TYPES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3" data-aos="fade-up">
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400">
            Property Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Explore Property Opportunities
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            We specialize in diverse land and plot categories tailored to your family goals or investment portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPERTY_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group property-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {cat.badge}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <button
                  onClick={() => navigate('/portfolio')}
                  className="w-full bg-slate-100 dark:bg-slate-700/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 text-slate-800 dark:text-slate-200 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" data-aos="zoom-in">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                  Comprehensive Services
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  How PP LANDS & PLOTS Assists You
                </h2>
              </div>
              <button
                onClick={() => navigate('/services')}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 w-fit"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SERVICES_LIST.map((srv, idx) => (
                <div
                  key={srv.id}
                  data-aos="zoom-in-up"
                  data-aos-delay={idx * 100}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-rose-400 transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  <button
                    onClick={() => openEnquiry(null)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-2"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. PROPERTY APPROVALS TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8" data-aos="fade-up">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Documentation & Authorities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Understanding Layout & Government Approvals
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We guide buyers on layout approval classifications. <strong className="text-slate-900 dark:text-white">Note:</strong> Approval status varies depending on the individual property. Customers are advised to verify legal title and documentation for their specific plot selection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APPROVAL_TYPES.map((app, idx) => (
              <div
                key={app.name}
                data-aos="flip-up"
                data-aos-delay={idx * 100}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-black text-lg shadow-sm">
                  {app.name}
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {app.fullName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mandatory Business Policy Reminder */}
          <PolicyBanner />

        </div>
      </section>

      {/* 6. VISION & MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div 
            data-aos="fade-right"
            className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border border-rose-800/60 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400 block">
                Company Vision
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Our Vision for Telangana Real Estate
              </h3>
              <blockquote className="text-base text-slate-200 italic leading-relaxed border-l-4 border-rose-400 pl-4 py-1">
                "{COMPANY_DETAILS.vision}"
              </blockquote>
            </div>
            <div className="text-xs font-semibold text-slate-400">
              PP LANDS & PLOTS • Shankarpally, Hyderabad
            </div>
          </div>

          {/* Mission */}
          <div 
            data-aos="fade-left"
            className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
                Company Mission
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Our Mission & Client Commitment
              </h3>
              <blockquote className="text-base text-slate-200 italic leading-relaxed border-l-4 border-amber-400 pl-4 py-1">
                "{COMPANY_DETAILS.mission}"
              </blockquote>
            </div>
            <div className="text-xs font-semibold text-slate-400">
              Serving Families & Investors Since 2023
            </div>
          </div>

        </div>
      </section>

      {/* 7. FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4" data-aos="fade-up">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Dynamic Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Land & Plot Listings
            </h2>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2 w-fit shadow-md"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop, idx) => (
            <div key={prop.id} data-aos="fade-up" data-aos-delay={idx * 150}>
              <PropertyCard
                property={prop}
                onSelect={(p) => setSelectedProperty(p)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHY CHOOSE PP LANDS & PLOTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-8 sm:p-12 space-y-8" data-aos="fade-up">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Our Values & Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Partner With PP LANDS & PLOTS?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Built on transparency, reliability, and customer-first guidance in Shankarpally.
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
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
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
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="zoom-in">
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white rounded-3xl p-8 sm:p-14 text-center shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Ready to Buy, Sell, or Invest in Land?
            </h2>
            <p className="text-rose-100 text-base sm:text-lg">
              Contact PP LANDS & PLOTS today for transparent guidance, site visits, and verified plot choices across Shankarpally & Hyderabad.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={COMPANY_DETAILS.contact.telUrl}
              className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all text-base flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-rose-600" />
              <span>Call Now ({COMPANY_DETAILS.contact.phone})</span>
            </a>

            <a
              href={COMPANY_DETAILS.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all text-base flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-current text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={() => openEnquiry(null)}
              className="bg-rose-950 hover:bg-slate-900 text-amber-300 border border-amber-400/40 font-bold px-8 py-4 rounded-2xl transition-all text-base"
            >
              Send Form Enquiry
            </button>
          </div>

        </div>
      </section>

      </div> {/* End DESKTOP VIEW */}

      {/* Property Details Modal Renderer */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

    </div>
  );
}
