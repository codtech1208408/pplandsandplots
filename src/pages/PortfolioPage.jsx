import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import PolicyBanner from '../components/PolicyBanner';
import { Search } from 'lucide-react';

export default function PortfolioPage() {
  const { properties, selectedProperty, setSelectedProperty } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Commercial Properties',
    'Agriculture Land',
    'Open Plots',
    'Venture Plots'
  ];

  const statuses = ['All', 'Available', 'Reserved', 'Sold', 'Coming Soon'];

  // Filter properties dynamically
  const filteredProperties = properties.filter((prop) => {
    const matchesCategory = activeCategory === 'All' || prop.category === activeCategory;
    const matchesStatus = activeStatus === 'All' || prop.status === activeStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.approval.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8" data-aos="fade-up">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Dynamic Property Portfolio
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Land & Plot Listings
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Explore available, reserved, and upcoming plots and agricultural land around Shankarpally and Hyderabad.
          </p>
        </div>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 md:p-6 shadow-sm space-y-4" data-aos="fade-up" data-aos-delay="100">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="md:col-span-7 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location (e.g. Shankarpally), approval..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Filter Status:
            </span>
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All Statuses' : st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-2">
        <span>Showing {filteredProperties.length} property listings</span>
        {(activeCategory !== 'All' || activeStatus !== 'All' || searchQuery !== '') && (
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveStatus('All');
              setSearchQuery('');
            }}
            className="text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop, idx) => (
            <div key={prop.id} data-aos="fade-up" data-aos-delay={idx * 100}>
              <PropertyCard
                property={prop}
                onSelect={(p) => setSelectedProperty(p)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-700 space-y-4" data-aos="fade-up">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 text-slate-500 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No Properties Match Your Search
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try adjusting your search query, selecting a different category, or resetting status filters.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveStatus('All');
              setSearchQuery('');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Mandatory Policy Banner */}
      <div data-aos="fade-up">
        <PolicyBanner />
      </div>

    </div>
  );
}
