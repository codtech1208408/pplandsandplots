import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Search, 
  Building2, 
  Sprout, 
  Home, 
  Trees, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function MobileHeroAndSearch() {
  const { navigate, banners } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Buy');
  const [selectedType, setSelectedType] = useState('Commercial');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const slides = banners && banners.length > 0 ? banners : [
    {
      id: 1,
      badge: 'Shankarpally • Hyderabad - Telangana',
      title: 'Find the Right Land.',
      highlight: 'Build Your Future.',
      subtitle: 'Trusted Lands & Plots for Smart Buyers and Investors in Telangana.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const propertyTypes = [
    { id: 'Commercial', label: 'Commercial', icon: Building2 },
    { id: 'Agricultural', label: 'Agricultural', icon: Sprout },
    { id: 'Open Plot', label: 'Open Plot', icon: Home },
    { id: 'Venture Plot', label: 'Venture Plot', icon: Trees }
  ];

  const handleSearch = () => {
    navigate('/portfolio');
  };

  const activeSlideData = slides[currentSlide] || slides[0];

  return (
    <div className="md:hidden space-y-4 pb-2">
      {/* 1. AUTO-SCROLLING HERO BANNER SLIDER (Matching Reference Banner Format) */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[210px] w-full rounded-2xl overflow-hidden bg-slate-950 text-white p-4 shadow-xl border border-slate-800 flex flex-col justify-between">
        
        {/* Background Image Slides with Vivid Clarity & Smooth Fade */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />
          </div>
        ))}

        {/* Banner Content Overlay */}
        <div className="relative z-10 space-y-1 pt-1">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            {activeSlideData.title} <br />
            <span className="text-red-500">{activeSlideData.highlight}</span>
          </h1>

          <p className="text-[11px] text-slate-200 font-medium leading-normal line-clamp-2 drop-shadow-sm max-w-[90%]">
            {activeSlideData.subtitle}
          </p>
        </div>

        {/* Bottom Row on Banner: Embedded Action Button & Slide Dots */}
        <div className="relative z-10 flex items-center justify-between pt-2">
          {/* Main Action Button */}
          <button
            onClick={() => navigate('/portfolio')}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-2 px-3.5 rounded-xl text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Slide Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-5 bg-red-500' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CARD ("What are you looking for?") */}
      <div id="search-filter-section" className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md space-y-3.5">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
          What are you looking for?
        </h2>

        {/* Tab Switcher: Buy / Sell / Invest */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {['Buy', 'Sell', 'Invest'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Property Type Grid Icons */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Property Type
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all text-center ${
                    isSelected
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[9px] leading-tight font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Location & Budget Select Inputs (Side by Side to Save Height!) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-7 pr-2 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Location</option>
                <option value="Shankarpally">Shankarpally</option>
                <option value="Mokila">Mokila</option>
                <option value="Chevella">Chevella</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Budget
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">₹ Budget</option>
              <option value="15-20">₹ 15L - ₹ 25L</option>
              <option value="25-50">₹ 25L - ₹ 50L</option>
              <option value="50-100">₹ 50L - ₹ 1Cr</option>
              <option value="100+">₹ 1Cr+</option>
            </select>
          </div>
        </div>

        {/* Search Properties Red CTA */}
        <button
          onClick={handleSearch}
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-2.5 rounded-lg text-xs shadow-md flex items-center justify-center gap-1.5 transition-all mt-1"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  );
}
