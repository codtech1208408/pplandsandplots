import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, COMPANY_DETAILS, SERVICES_LIST, INITIAL_BANNERS } from '../data/properties';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pp_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Admin Login Authentication State (Temporary Credentials)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('pp_admin_auth') === 'true';
  });

  // Enquiries / Leads Blacklist State (Prevents deleted leads from reappearing)
  const [deletedEnquiries, setDeletedEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('pp_deleted_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Dynamic Properties State (100% Supabase Source of Truth)
  const [properties, setProperties] = useState([]);

  // Dynamic Services State (100% Supabase Source of Truth)
  const [services, setServices] = useState([]);

  // Dynamic Banners State (100% Supabase Source of Truth)
  const [banners, setBanners] = useState([]);

  // Enquiries / Leads State (100% Supabase Source of Truth)
  const [enquiries, setEnquiries] = useState([]);

  // Selected property detail for details view/modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Quick Enquiry Modal State
  const [enquiryProperty, setEnquiryProperty] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Active route state for client-side routing ('/', '/about', '/services', '/portfolio', '/contact', '/admin')
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    if (path === '/admin') return '/admin';
    if (path === '/about') return '/about';
    if (path === '/services') return '/services';
    if (path === '/portfolio') return '/portfolio';
    if (path === '/contact') return '/contact';
    return '/';
  });

  // Reusable Supabase Fetcher (Guarantees Localhost & Vercel Parity)
  const fetchSupabaseData = async () => {
    try {
      // Clear old local storage caches
      localStorage.removeItem('pp_properties');
      localStorage.removeItem('pp_services');
      localStorage.removeItem('pp_banners');
      localStorage.removeItem('pp_enquiries');

      // 1. Fetch properties from Supabase
      const { data: propsData, error: propsErr } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!propsErr && propsData) {
        const formatted = propsData.map(p => ({
          ...p,
          categorySlug: p.category_slug || p.categorySlug,
          created_at: p.created_at,
          updated_at: p.updated_at
        }));
        setProperties(formatted.length > 0 ? formatted : INITIAL_PROPERTIES);
      }

      // 2. Fetch services from Supabase
      const { data: srvData, error: srvErr } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!srvErr && srvData) {
        const formattedSrv = srvData.map(s => ({
          id: s.id,
          name: s.name,
          shortDesc: s.short_desc || s.shortDesc,
          fullDesc: s.full_desc || s.fullDesc,
          icon: s.icon || 'MapPin'
        }));
        setServices(formattedSrv.length > 0 ? formattedSrv : SERVICES_LIST);
      }

      // 3. Fetch banners from Supabase
      const { data: bnrData, error: bnrErr } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!bnrErr && bnrData) {
        setBanners(bnrData.length > 0 ? bnrData : INITIAL_BANNERS);
      }

      // 4. Fetch enquiries from Supabase
      const { data: enqData, error: enqErr } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!enqErr && enqData) {
        const savedDeleted = JSON.parse(localStorage.getItem('pp_deleted_enquiries') || '[]');
        const filteredEnquiries = enqData.filter(item => {
          const isIdDel = item.id && savedDeleted.includes(String(item.id));
          const isPhoneDel = item.phone && savedDeleted.includes(String(item.phone));
          const isNameDel = item.name && savedDeleted.includes(String(item.name));
          return !isIdDel && !isPhoneDel && !isNameDel;
        });
        setEnquiries(filteredEnquiries);
      }
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  // Apply dark class to HTML document root
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
      // fallback
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

  // Admin Authentication Login / Logout
  const loginAdmin = (username, password) => {
    const storedUsername = localStorage.getItem('pp_admin_username') || 'admin';
    const storedPassword = localStorage.getItem('pp_admin_password') || 'admin123';
    const emailDefault = 'pplp3008@gmail.com';

    if (
      (username.toLowerCase() === storedUsername.toLowerCase() || username.toLowerCase() === emailDefault) &&
      password === storedPassword
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pp_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid username/email or password!' };
  };

  const updateAdminPassword = (newPassword) => {
    localStorage.setItem('pp_admin_password', newPassword);
    return { success: true, message: 'Password updated successfully!' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pp_admin_auth');
  };

  // --- CRUD ACTIONS (100% Supabase DB Direct Mutations) --- //

  // SERVICES: Add, Edit/Update, Delete
  const addService = async (serviceData) => {
    const newService = {
      id: serviceData.id || `service-${Date.now()}`,
      name: serviceData.name,
      short_desc: serviceData.shortDesc || '',
      full_desc: serviceData.fullDesc || '',
      icon: serviceData.icon || 'MapPin'
    };

    try {
      await supabase.from('services').upsert([newService], { onConflict: 'id' });
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error saving service', e);
    }
  };

  const updateService = async (id, updatedFields) => {
    try {
      await supabase.from('services').update({
        name: updatedFields.name,
        short_desc: updatedFields.shortDesc,
        full_desc: updatedFields.fullDesc,
        icon: updatedFields.icon
      }).eq('id', id);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error updating service', e);
    }
  };

  const deleteService = async (id) => {
    try {
      await supabase.from('services').delete().eq('id', id);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error deleting service', e);
    }
  };

  // PROPERTIES / PORTFOLIO: Add, Edit/Update, Delete
  const addProperty = async (propData) => {
    const newProp = {
      id: propData.id || `pp-prop-${Date.now()}`,
      title: propData.title,
      slug: propData.slug || propData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: propData.category,
      category_slug: propData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      location: propData.location,
      size: propData.size,
      price: propData.price || 'Price on Request',
      approval: propData.approval || 'HMDA Approved',
      status: propData.status || 'Available',
      featured: Boolean(propData.featured),
      description: propData.description || '',
      images: propData.images && propData.images.length > 0 ? propData.images : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
      features: propData.features || []
    };

    try {
      await supabase.from('properties').upsert([newProp], { onConflict: 'id' });
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error adding property', e);
    }
  };

  const updateProperty = async (id, updatedFields) => {
    try {
      const dbPayload = {};
      if (updatedFields.title) dbPayload.title = updatedFields.title;
      if (updatedFields.category) {
        dbPayload.category = updatedFields.category;
        dbPayload.category_slug = updatedFields.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      if (updatedFields.location) dbPayload.location = updatedFields.location;
      if (updatedFields.size) dbPayload.size = updatedFields.size;
      if (updatedFields.price) dbPayload.price = updatedFields.price;
      if (updatedFields.approval) dbPayload.approval = updatedFields.approval;
      if (updatedFields.status) dbPayload.status = updatedFields.status;
      if (updatedFields.featured !== undefined) dbPayload.featured = updatedFields.featured;
      if (updatedFields.description) dbPayload.description = updatedFields.description;
      if (updatedFields.images) dbPayload.images = updatedFields.images;
      if (updatedFields.features) dbPayload.features = updatedFields.features;

      await supabase.from('properties').update(dbPayload).eq('id', id);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error updating property', e);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await supabase.from('properties').delete().eq('id', id);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error deleting property', e);
    }
  };

  // BANNERS: Add, Edit/Update, Delete
  const addBanner = async (bannerData) => {
    const newBanner = {
      id: bannerData.id || `banner-${Date.now()}`,
      title: bannerData.title,
      highlight: bannerData.highlight || '',
      subtitle: bannerData.subtitle || '',
      badge: bannerData.badge || '',
      image: bannerData.image,
      active: bannerData.active !== undefined ? bannerData.active : true
    };

    try {
      const { error } = await supabase.from('banners').upsert([newBanner], { onConflict: 'id' });
      if (error) console.error('Supabase banner upsert error:', error);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error adding banner', e);
    }
  };

  const updateBanner = async (id, updatedFields) => {
    try {
      const { error } = await supabase.from('banners').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase error updating banner', error);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error updating banner', e);
    }
  };

  const deleteBanner = async (id) => {
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) console.error('Supabase error deleting banner', error);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error deleting banner', e);
    }
  };

  // ENQUIRIES: Add lead, Delete lead
  const submitEnquiry = async (enquiryData) => {
    const payload = {
      name: enquiryData.name,
      phone: enquiryData.phone,
      email: enquiryData.email || '',
      service_type: enquiryData.service_type || enquiryData.serviceType || enquiryData.requirement || enquiryData.interestedIn || '',
      property_id: enquiryData.property_id || enquiryData.propertyId || null,
      property_title: enquiryData.property_title || enquiryData.propertyTitle || '',
      message: enquiryData.message || '',
      status: 'New'
    };

    try {
      await supabase.from('enquiries').insert([payload]);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error submitting enquiry', e);
    }
  };

  const deleteEnquiry = async (id, targetItem = null) => {
    const idStr = String(id);
    const phoneStr = targetItem?.phone || '';
    const nameStr = targetItem?.name || '';

    // 1. Add identifiers to deleted blacklist
    setDeletedEnquiries(prev => {
      const updated = Array.from(new Set([...prev, idStr, phoneStr, nameStr].filter(Boolean)));
      localStorage.setItem('pp_deleted_enquiries', JSON.stringify(updated));
      return updated;
    });

    // 2. Remove from state immediately
    setEnquiries(prev => prev.filter(e => 
      String(e.id) !== idStr &&
      (!phoneStr || e.phone !== phoneStr) &&
      (!nameStr || e.name !== nameStr)
    ));

    // 3. Perform deletion in Supabase DB
    try {
      if (idStr) await supabase.from('enquiries').delete().eq('id', idStr);
      if (phoneStr) await supabase.from('enquiries').delete().eq('phone', phoneStr);
      if (nameStr) await supabase.from('enquiries').delete().eq('name', nameStr);
      await fetchSupabaseData();
    } catch (e) {
      console.error('Supabase error deleting enquiry:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentRoute,
        navigate,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        properties,
        setProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        services,
        setServices,
        addService,
        updateService,
        deleteService,
        banners,
        setBanners,
        addBanner,
        updateBanner,
        deleteBanner,
        enquiries,
        submitEnquiry,
        deleteEnquiry,
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
