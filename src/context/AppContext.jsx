import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, COMPANY_DETAILS } from '../data/properties';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state with system preference fallback and localStorage persistence
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pp_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Dynamic Properties State
  const [properties, setProperties] = useState(() => {
    const savedProps = localStorage.getItem('pp_properties');
    if (savedProps) {
      try {
        return JSON.parse(savedProps);
      } catch (e) {
        console.error('Failed to parse saved properties', e);
      }
    }
    return INITIAL_PROPERTIES;
  });

  // Selected property detail for details view/modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Quick Enquiry Modal State
  const [enquiryProperty, setEnquiryProperty] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Active route state for client-side routing ('/', '/about', '/services', '/portfolio', '/contact')
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    if (path === '/about') return '/about';
    if (path === '/services') return '/services';
    if (path === '/portfolio') return '/portfolio';
    if (path === '/contact') return '/contact';
    return '/';
  });

  // Effect to apply dark class to HTML document root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pp_theme', theme);
  }, [theme]);

  // Sync route with browser history
  const navigate = (route, propertyObj = null) => {
    setCurrentRoute(route);
    if (propertyObj) {
      setSelectedProperty(propertyObj);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', route);
    } catch (e) {
      // fallback for environments where pushState might be restricted
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const openEnquiry = (property = null) => {
    setEnquiryProperty(property);
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryOpen(false);
    setEnquiryProperty(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentRoute,
        navigate,
        properties,
        setProperties,
        selectedProperty,
        setSelectedProperty,
        enquiryProperty,
        isEnquiryOpen,
        openEnquiry,
        closeEnquiry,
        COMPANY_DETAILS
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
