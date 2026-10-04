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

  // Dynamic Services State
  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem('pp_services');
    if (savedServices) {
      try {
        return JSON.parse(savedServices);
      } catch (e) {
        console.error('Failed to parse saved services', e);
      }
    }
    return SERVICES_LIST;
  });

  // Dynamic Banners State
  const [banners, setBanners] = useState(() => {
    const savedBanners = localStorage.getItem('pp_banners');
    if (savedBanners) {
      try {
        return JSON.parse(savedBanners);
      } catch (e) {
        console.error('Failed to parse saved banners', e);
      }
    }
    return INITIAL_BANNERS;
  });

  // Enquiries / Leads State
  const [deletedEnquiries, setDeletedEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('pp_deleted_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    const savedEnquiries = localStorage.getItem('pp_enquiries');
    if (savedEnquiries) {
      try {
        const parsed = JSON.parse(savedEnquiries);
        return parsed.filter(item => {
          const isIdDel = item.id && deletedEnquiries.includes(String(item.id));
          const isPhoneDel = item.phone && deletedEnquiries.includes(String(item.phone));
          const isNameDel = item.name && deletedEnquiries.includes(String(item.name));
          return !isIdDel && !isPhoneDel && !isNameDel;
        });
      } catch (e) {
        console.error('Failed to parse saved enquiries', e);
      }
    }
    return [];
  });

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

  // Fetch initial data directly from Supabase DB (Single Source of Truth for Localhost & Vercel)
  useEffect(() => {
    async function fetchSupabaseData() {
      try {
        // 1. Fetch properties from Supabase
        const { data: propsData, error: propsErr } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
        if (!propsErr && propsData && propsData.length > 0) {
          const formatted = propsData.map(p => ({
            ...p,
            categorySlug: p.category_slug || p.categorySlug,
            created_at: p.created_at,
            updated_at: p.updated_at
          }));
          setProperties(formatted);
          localStorage.setItem('pp_properties', JSON.stringify(formatted));
        }

        // 2. Fetch services from Supabase
        const { data: srvData, error: srvErr } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (!srvErr && srvData && srvData.length > 0) {
          const formattedSrv = srvData.map(s => ({
            id: s.id,
            name: s.name,
            shortDesc: s.short_desc || s.shortDesc,
            fullDesc: s.full_desc || s.fullDesc,
            icon: s.icon || 'MapPin'
          }));
          setServices(formattedSrv);
          localStorage.setItem('pp_services', JSON.stringify(formattedSrv));
        }

        // 3. Fetch banners from Supabase
        const { data: bnrData, error: bnrErr } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
        if (!bnrErr && bnrData) {
          if (bnrData.length > 0) {
            setBanners(bnrData);
            localStorage.setItem('pp_banners', JSON.stringify(bnrData));
          } else {
            // If table exists but is empty, sync local banners to cloud
            const savedLocal = JSON.parse(localStorage.getItem('pp_banners') || '[]');
            if (savedLocal.length > 0) {
              await supabase.from('banners').upsert(savedLocal, { onConflict: 'id' });
              setBanners(savedLocal);
            }
          }
        } else if (bnrErr) {
          console.warn('Supabase Banners Sync Notice:', bnrErr.message);
        }

        // 4. Fetch enquiries from Supabase
        const { data: enqData, error: enqErr } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
        if (!enqErr && enqData) {
          const savedDeleted = JSON.parse(localStorage.getItem('pp_deleted_enquiries') || '[]');
          const filteredEnquiries = enqData.filter(item => {
            const isIdDel = item.id && savedDeleted.includes(String(item.id));
            const isPhoneDel = item.phone && savedDeleted.includes(String(item.phone));
            const isNameDel = item.name && savedDeleted.includes(String(item.name));
            return !isIdDel && !isPhoneDel && !isNameDel;
          });
          setEnquiries(filteredEnquiries);
          localStorage.setItem('pp_enquiries', JSON.stringify(filteredEnquiries));
        }
      } catch (err) {
        console.log('Supabase sync notice:', err);
      }
    }
    fetchSupabaseData();
  }, []);

  // Sync properties to localStorage
  useEffect(() => {
    localStorage.setItem('pp_properties', JSON.stringify(properties));
  }, [properties]);

  // Sync services to localStorage
  useEffect(() => {
    localStorage.setItem('pp_services', JSON.stringify(services));
  }, [services]);

  // Sync banners to localStorage
  useEffect(() => {
    localStorage.setItem('pp_banners', JSON.stringify(banners));
  }, [banners]);

  // Sync enquiries to localStorage
  useEffect(() => {
    localStorage.setItem('pp_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

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
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pp_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password!' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pp_admin_auth');
  };

  // --- CRUD ACTIONS --- //

  // SERVICES: Add, Edit/Update, Delete
  const addService = async (serviceData) => {
    const newService = {
      id: serviceData.id || `service-${Date.now()}`,
      name: serviceData.name,
      shortDesc: serviceData.shortDesc || '',
      fullDesc: serviceData.fullDesc || '',
      icon: serviceData.icon || 'MapPin'
    };

    setServices(prev => {
      const updated = [newService, ...prev.filter(s => s.id !== newService.id)];
      localStorage.setItem('pp_services', JSON.stringify(updated));
      return updated;
    });

    try {
      await supabase.from('services').upsert([{
        id: newService.id,
        name: newService.name,
        short_desc: newService.shortDesc,
        full_desc: newService.fullDesc,
        icon: newService.icon
      }], { onConflict: 'id' });
    } catch (e) {
      console.error('Supabase error saving service', e);
    }
  };

  const updateService = async (id, updatedFields) => {
    setServices(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...updatedFields } : s);
      localStorage.setItem('pp_services', JSON.stringify(updated));
      return updated;
    });

    try {
      await supabase.from('services').update({
        name: updatedFields.name,
        short_desc: updatedFields.shortDesc,
        full_desc: updatedFields.fullDesc,
        icon: updatedFields.icon
      }).eq('id', id);
    } catch (e) {
      console.error('Supabase error updating service', e);
    }
  };

  const deleteService = async (id) => {
    setServices(prev => {
      const updated = prev.filter(s => s.id !== id);
      localStorage.setItem('pp_services', JSON.stringify(updated));
      return updated;
    });

    try {
      await supabase.from('services').delete().eq('id', id);
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
      categorySlug: propData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      location: propData.location,
      size: propData.size,
      price: propData.price || 'Price on Request',
      approval: propData.approval || 'HMDA Approved',
      status: propData.status || 'Available',
      featured: Boolean(propData.featured),
      description: propData.description || '',
      images: propData.images && propData.images.length > 0 ? propData.images : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
      features: propData.features || [],
      created_at: new Date().toISOString().split('T')[0]
    };

    setProperties(prev => {
      const updated = [newProp, ...prev.filter(p => p.id !== newProp.id)];
      localStorage.setItem('pp_properties', JSON.stringify(updated));
      return updated;
    });

    try {
      await supabase.from('properties').upsert([{
        id: newProp.id,
        title: newProp.title,
        slug: newProp.slug,
        category: newProp.category,
        category_slug: newProp.categorySlug,
        location: newProp.location,
        size: newProp.size,
        price: newProp.price,
        approval: newProp.approval,
        status: newProp.status,
        featured: newProp.featured,
        description: newProp.description,
        images: newProp.images,
        features: newProp.features
      }], { onConflict: 'id' });
    } catch (e) {
      console.error('Supabase error adding property', e);
    }
  };

  const updateProperty = async (id, updatedFields) => {
    setProperties(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      localStorage.setItem('pp_properties', JSON.stringify(updated));
      return updated;
    });

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
    } catch (e) {
      console.error('Supabase error updating property', e);
    }
  };

  const deleteProperty = async (id) => {
    setProperties(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('pp_properties', JSON.stringify(updated));
      return updated;
    });

    try {
      await supabase.from('properties').delete().eq('id', id);
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

    setBanners(prev => {
      const updated = [newBanner, ...prev.filter(b => b.id !== newBanner.id)];
      localStorage.setItem('pp_banners', JSON.stringify(updated));
      return updated;
    });

    try {
      const { error } = await supabase.from('banners').upsert([newBanner], { onConflict: 'id' });
      if (error) {
        console.error('Supabase banner upsert error:', error);
        if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('banners')) {
          alert('NOTICE: The "banners" table has not been created in Supabase yet!\n\nPlease run the SQL snippet in your Supabase SQL Editor (https://ixeeledgwublgaqrzlnf.supabase.co) so banners can sync across Localhost and Vercel.');
        }
      }
    } catch (e) {
      console.error('Supabase error adding banner', e);
    }
  };

  const updateBanner = async (id, updatedFields) => {
    setBanners(prev => {
      const updated = prev.map(b => b.id === id ? { ...b, ...updatedFields } : b);
      localStorage.setItem('pp_banners', JSON.stringify(updated));
      return updated;
    });

    try {
      const { error } = await supabase.from('banners').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase error updating banner', error);
    } catch (e) {
      console.error('Supabase error updating banner', e);
    }
  };

  const deleteBanner = async (id) => {
    setBanners(prev => {
      const updated = prev.filter(b => b.id !== id);
      localStorage.setItem('pp_banners', JSON.stringify(updated));
      return updated;
    });

    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) console.error('Supabase error deleting banner', error);
    } catch (e) {
      console.error('Supabase error deleting banner', e);
    }
  };

  // ENQUIRIES: Add lead, Update status, Delete lead
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
      const { data, error } = await supabase.from('enquiries').insert([payload]).select().single();
      const newEnquiry = (!error && data) ? data : {
        id: `enq-${Date.now()}`,
        ...payload,
        created_at: new Date().toISOString()
      };

      setEnquiries(prev => {
        const updated = [newEnquiry, ...prev.filter(e => String(e.id) !== String(newEnquiry.id))];
        localStorage.setItem('pp_enquiries', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Supabase error submitting enquiry', e);
      const fallbackEnquiry = {
        id: `enq-${Date.now()}`,
        ...payload,
        created_at: new Date().toISOString()
      };
      setEnquiries(prev => {
        const updated = [fallbackEnquiry, ...prev];
        localStorage.setItem('pp_enquiries', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deleteEnquiry = async (id, targetItem = null) => {
    const idStr = String(id);
    const phoneStr = targetItem?.phone || '';
    const nameStr = targetItem?.name || '';

    // 1. Save identifiers to persistent deleted blacklist
    setDeletedEnquiries(prev => {
      const updated = Array.from(new Set([...prev, idStr, phoneStr, nameStr].filter(Boolean)));
      localStorage.setItem('pp_deleted_enquiries', JSON.stringify(updated));
      return updated;
    });

    // 2. Remove from local state & localStorage immediately
    setEnquiries(prev => {
      const updated = prev.filter(e => 
        String(e.id) !== idStr &&
        (!phoneStr || e.phone !== phoneStr) &&
        (!nameStr || e.name !== nameStr)
      );
      localStorage.setItem('pp_enquiries', JSON.stringify(updated));
      return updated;
    });

    // 3. Perform deletion in Supabase DB safely
    const isValidUuid = typeof id === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);

    try {
      let isDeleted = false;
      if (isValidUuid) {
        const { error, count } = await supabase.from('enquiries').delete({ count: 'exact' }).eq('id', id);
        if (!error && count > 0) {
          isDeleted = true;
        }
      }

      // If not deleted by UUID, delete by matching phone or name in Supabase
      if (!isDeleted) {
        if (phoneStr) {
          await supabase.from('enquiries').delete().eq('phone', phoneStr);
        }
        if (nameStr) {
          await supabase.from('enquiries').delete().eq('name', nameStr);
        }
      }
    } catch (e) {
      console.error('Supabase error deleting enquiry:', e);
      if (phoneStr) {
        try {
          await supabase.from('enquiries').delete().eq('phone', phoneStr);
        } catch (err) {
          // ignore fallback error
        }
      }
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
