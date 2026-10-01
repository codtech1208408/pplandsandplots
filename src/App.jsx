import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

import AOS from 'aos';
import 'aos/dist/aos.css';

function MainRouter() {
  const { currentRoute } = useApp();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 80
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentRoute]);

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden relative">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <EnquiryModal />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
