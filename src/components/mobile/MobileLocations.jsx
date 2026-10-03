import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MobileLocations() {
  const { navigate } = useApp();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const locations = [
    {
      id: 'shankarpally',
      name: 'Shankarpally',
      desc: 'Premium plots & lands with great connectivity.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      desc: 'Growing opportunities in the heart of the city.',
      image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'telangana',
      name: 'Telangana',
      desc: 'Wide range of land & plot options across Telangana.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollPosition / (width * 0.7));
      setActiveIndex(Math.min(Math.max(index, 0), locations.length - 1));
    }
  };

  const scrollTo = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden space-y-3 py-2">
      {/* Tag & Heading with Slider Controls */}
      <div className="flex items-center justify-between" data-aos="fade-up">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 bg-amber-500 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              LOCATIONS
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Explore Our Locations
          </h2>
        </div>

        {/* Left/Right Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollTo('left')}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all"
            aria-label="Previous location"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('right')}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all"
            aria-label="Next location"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Slider Location Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        data-aos="fade-up"
        data-aos-delay="100"
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar py-1"
      >
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => navigate('/portfolio')}
            className="snap-start shrink-0 w-[220px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 flex items-center gap-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Image Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                  {loc.name}
                </h3>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2">
                {loc.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-0.5">
        {locations.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'w-5 bg-red-600'
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
