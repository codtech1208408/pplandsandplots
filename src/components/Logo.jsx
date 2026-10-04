import React from 'react';
import { useApp } from '../context/AppContext';

export default function Logo({ size = 'md', className = '' }) {
  const { navigate } = useApp();

  const imgHeightClass = {
    sm: 'h-12 sm:h-16 md:h-18',
    md: 'h-16 sm:h-20 md:h-24',
    lg: 'h-24 sm:h-32 md:h-40'
  }[size] || 'h-16 sm:h-20 md:h-24';

  return (
    <button
      onClick={() => navigate('/')}
      className={`inline-flex items-center text-left focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-xl transition-transform ${className}`}
      aria-label="PP LANDS & PLOTS Home"
    >
      <img
        src="/image-removebg-preview.png?v=4"
        alt="PP LANDS & PLOTS Logo"
        className={`${imgHeightClass} w-auto object-contain max-w-[340px] sm:max-w-[450px] md:max-w-[550px] hover:scale-105 transition-transform duration-300 drop-shadow-md`}
        onError={(e) => {
          if (!e.target.src.includes('logo.png')) {
            e.target.src = '/logo.png';
          }
        }}
      />
    </button>
  );
}
