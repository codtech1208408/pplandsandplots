import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Search, Building2, Sprout, Home, Trees, ArrowRight } from 'lucide-react';

export default function MobileHeroAndSearch() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState('Buy');
  const [selectedType, setSelectedType] = useState('Commercial');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const propertyTypes = [
    { id: 'Commercial', label: 'Commercial', icon: Building2 },
    { id: 'Agricultural', label: 'Agricultural', icon: Sprout },
    { id: 'Open Plot', label: 'Open Plot', icon: Home },
    { id: 'Venture Plot', label: 'Venture Plot', icon: Trees }
  ];

  const handleSearch = () => {
    navigate('/portfolio');
  };

  return (
    <div className="md:hidden space-y-6 pb-4">
      {/* 1. HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-6 pt-8 space-y-6 shadow-xl border border-slate-800">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
            alt="Land and Plots Shankarpally"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 space-y-5">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-semibold shadow-sm backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>Shankarpally • Hyderabad - Telangana</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-snug">
            Find the Right Land. <br />
            <span className="text-red-500">Build Your Future.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Trusted Lands & Plots for Smart Buyers and Investors in Telangana.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/portfolio')}
              className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-extrabold py-3 px-5 rounded-xl text-xs shadow-md transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CARD ("What are you looking for?") */}
      <div id="search-filter-section" className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg space-y-5">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
          What are you looking for?
        </h2>

        {/* Tab Switcher: Buy / Sell / Invest */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          {['Buy', 'Sell', 'Invest'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Property Type Grid Icons */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Property Type
          </label>
          <div className="grid grid-cols-4 gap-2">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                    isSelected
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4 text-red-500" />
                  <span className="text-[10px] leading-tight font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Select Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-9 pr-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Location</option>
              <option value="Shankarpally">Shankarpally, Hyderabad</option>
              <option value="Mokila">Mokila, Hyderabad</option>
              <option value="Chevella">Chevella Road</option>
              <option value="Telangana">Across Telangana</option>
            </select>
          </div>
        </div>

        {/* Budget Select Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Budget
          </label>
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">₹ Select Budget</option>
            <option value="15-20">₹ 15 Lakhs - ₹ 25 Lakhs</option>
            <option value="25-50">₹ 25 Lakhs - ₹ 50 Lakhs</option>
            <option value="50-100">₹ 50 Lakhs - ₹ 1 Crore</option>
            <option value="100+">₹ 1 Crore+</option>
          </select>
        </div>

        {/* Search Properties Red CTA */}
        <button
          onClick={handleSearch}
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  );
}
