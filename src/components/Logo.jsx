import React from 'react';
import { useApp } from '../context/AppContext';

export default function Logo({ size = 'md', className = '' }) {
  const { navigate } = useApp();

  const imgHeightClass = {
    sm: 'h-10 sm:h-12 md:h-14',
    md: 'h-12 sm:h-16 md:h-20',
    lg: 'h-16 sm:h-22 md:h-28'
  }[size] || 'h-12 sm:h-16 md:h-20';

  return (
    <button
      onClick={() => navigate('/')}
      className={`inline-flex items-center text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl transition-transform ${className}`}
      aria-label="PP LANDS & PLOTS Home"
    >
      <img
        src="/image-removebg-preview.png?v=4"
        alt="PP LANDS & PLOTS Logo"
        className={`${imgHeightClass} w-auto object-contain max-w-[200px] sm:max-w-[300px] md:max-w-[360px] hover:scale-105 transition-transform duration-300 drop-shadow-sm`}
        onError={(e) => {
          if (!e.target.src.includes('logo.png')) {
            e.target.src = '/logo.png';
          }
        }}
      />
    </button>
  );
}
