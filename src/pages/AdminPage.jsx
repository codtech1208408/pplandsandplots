import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { uploadImageToCloudinary } from '../lib/cloudinary';
import { 
  Lock, 
  User, 
  Key, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  UploadCloud, 
  Layers, 
  Home, 
  Sliders, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ExternalLink,
  Search,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  MapPin,
  Menu,
  ChevronRight,
  ArrowRight,
  Mail,
  RefreshCw,
  Send
} from 'lucide-react';

export default function AdminPage() {
  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    services, 
    addService, 
    updateService, 
    deleteService, 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    banners, 
    addBanner, 
    updateBanner, 
    deleteBanner, 
    enquiries, 
    deleteEnquiry,
    navigate,
    COMPANY_DETAILS,
    updateAdminPassword
  } = useApp();

  // Login Form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Forgot / Reset Password state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: enter email, 2: enter code & new pass, 3: success
  const [resetEmail, setResetEmail] = useState('pplp3008@gmail.com');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Open Reset Password Modal
  const handleOpenForgotModal = () => {
    setIsForgotModalOpen(true);
    setResetStep(1);
    setResetError('');
    setResetSuccessMsg('');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Step 1: Send OTP to email via Nodemailer SMTP endpoint
  const handleSendResetCode = async (e) => {
    e?.preventDefault();
    if (!resetEmail) {
      setResetError('Please enter admin email address.');
      return;
    }
    setResetLoading(true);
    setResetError('');
    setResetSuccessMsg('');

    try {
      const response = await fetch('/api/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await response.json();

      if (data.success) {
        setResetStep(2);
        setResetSuccessMsg(`Verification code sent to ${resetEmail}! Check your inbox.`);
      } else {
        setResetError(data.error || 'Failed to send verification code.');
      }
    } catch (err) {
      console.error(err);
      setResetError('Error connecting to server. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  // Step 2: Verify Code and Reset Admin Password
  const handleVerifyAndResetPassword = async (e) => {
    e?.preventDefault();
    if (!resetCode || resetCode.trim().length !== 6) {
      setResetError('Please enter the 6-digit verification code.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setResetError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }

    setResetLoading(true);
    setResetError('');

    try {
      const response = await fetch('/api/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, code: resetCode })
      });
      const data = await response.json();

      if (data.success) {
        updateAdminPassword(newPassword);
        setResetStep(3);
        setResetSuccessMsg('Your admin password has been reset successfully!');
      } else {
        setResetError(data.error || 'Invalid verification code.');
      }
    } catch (err) {
      console.error(err);
      setResetError('Verification failed. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  // Active Tab state: 'properties' | 'services' | 'banners' | 'enquiries'
  const [activeTab, setActiveTab] = useState('properties');

  // Mobile Sidebar Toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modal / Form States
  const [activeModal, setActiveModal] = useState(null); // 'add_property' | 'edit_property' | 'add_service' | 'edit_service' | 'add_banner' | 'edit_banner' | null
  const [selectedItem, setSelectedItem] = useState(null);

  // Upload progress state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Property Form State
  const [propForm, setPropForm] = useState({
    title: '',
    category: 'Open Plots',
    location: 'Shankarpally, Hyderabad',
    size: '200 Sq. Yards',
    price: 'Price on Request',
    approval: 'HMDA Approved',
    status: 'Available',
    featured: true,
    description: '',
    images: [],
    featuresText: ''
  });

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    name: '',
    shortDesc: '',
    fullDesc: '',
    icon: 'MapPin'
  });

  // Banner Form State
  const [bannerForm, setBannerForm] = useState({
    title: '',
    highlight: '',
    subtitle: '',
    badge: '',
    image: '',
    active: true
  });

  // Search Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdmin(usernameInput, passwordInput);
    if (!res.success) {
      setLoginError(res.error);
    }
  };

  // --- PROPERTY MODAL HANDLERS ---
  const openAddProperty = () => {
    setPropForm({
      title: '',
      category: 'Open Plots',
      location: 'Shankarpally, Hyderabad',
      size: '200 Sq. Yards',
      price: 'Price on Request',
      approval: 'HMDA Approved',
      status: 'Available',
      featured: true,
      description: '',
      images: [],
      featuresText: '30ft Wide Roads\n100% Clear Title\nSpot Registration'
    });
    setSelectedItem(null);
    setActiveModal('add_property');
  };

  const openEditProperty = (prop) => {
    setSelectedItem(prop);
    setPropForm({
      title: prop.title || '',
      category: prop.category || 'Open Plots',
      location: prop.location || '',
      size: prop.size || '',
      price: prop.price || 'Price on Request',
      approval: prop.approval || 'HMDA Approved',
      status: prop.status || 'Available',
      featured: Boolean(prop.featured),
      description: prop.description || '',
      images: prop.images || [],
      featuresText: Array.isArray(prop.features) ? prop.features.join('\n') : ''
    });
    setActiveModal('edit_property');
  };

  const handlePropertyImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadMessage('Uploading image(s) to Cloudinary...');

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const res = await uploadImageToCloudinary(file);
        if (res.url) {
          uploadedUrls.push(res.url);
        }
      }
      setPropForm(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
      setUploadMessage('Uploaded successfully!');
    } catch (err) {
      alert('Cloudinary Upload Failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const savePropertySubmit = (e) => {
    e.preventDefault();
    const featuresArray = propForm.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const payload = {
      ...propForm,
      features: featuresArray,
      images: propForm.images.length > 0 ? propForm.images : [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
      ]
    };

    if (activeModal === 'add_property') {
      addProperty(payload);
    } else if (activeModal === 'edit_property' && selectedItem) {
      updateProperty(selectedItem.id, payload);
    }
    setActiveModal(null);
  };

  // --- SERVICE MODAL HANDLERS ---
  const openAddService = () => {
    setServiceForm({
      name: '',
      shortDesc: '',
      fullDesc: '',
      icon: 'MapPin'
    });
    setSelectedItem(null);
    setActiveModal('add_service');
  };

  const openEditService = (srv) => {
    setSelectedItem(srv);
    setServiceForm({
      name: srv.name || '',
      shortDesc: srv.shortDesc || '',
      fullDesc: srv.fullDesc || '',
      icon: srv.icon || 'MapPin'
    });
    setActiveModal('edit_service');
  };

  const saveServiceSubmit = (e) => {
    e.preventDefault();
    if (activeModal === 'add_service') {
      addService(serviceForm);
    } else if (activeModal === 'edit_service' && selectedItem) {
      updateService(selectedItem.id, serviceForm);
    }
    setActiveModal(null);
  };

  // --- BANNER MODAL HANDLERS ---
  const openAddBanner = () => {
    setBannerForm({
      title: '',
      highlight: '',
      subtitle: '',
      badge: 'Shankarpally • Hyderabad - Telangana',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      active: true
    });
    setSelectedItem(null);
    setActiveModal('add_banner');
  };

  const openEditBanner = (bnr) => {
    setSelectedItem(bnr);
    setBannerForm({
      title: bnr.title || '',
      highlight: bnr.highlight || '',
      subtitle: bnr.subtitle || '',
      badge: bnr.badge || '',
      image: bnr.image || '',
      active: bnr.active !== undefined ? bnr.active : true
    });
    setActiveModal('edit_banner');
  };

  const handleBannerImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage('Uploading banner to Cloudinary...');

    try {
      const res = await uploadImageToCloudinary(file);
      if (res.url) {
        setBannerForm(prev => ({ ...prev, image: res.url }));
        setUploadMessage('Uploaded successfully!');
      }
    } catch (err) {
      alert('Cloudinary Upload Failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const saveBannerSubmit = (e) => {
    e.preventDefault();
    if (activeModal === 'add_banner') {
      addBanner(bannerForm);
    } else if (activeModal === 'edit_banner' && selectedItem) {
      updateBanner(selectedItem.id, bannerForm);
    }
    setActiveModal(null);
  };

  // IF NOT LOGGED IN -> RENDER ADMIN LOGIN SCREEN
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-950 text-white">
        <div className="w-full max-w-md space-y-6 bg-slate-900/90 border border-rose-500/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-3">
            <img
              src="/image-removebg-preview.png"
              alt="PP LANDS & PLOTS Logo"
              className="h-20 sm:h-24 w-auto object-contain mx-auto drop-shadow-lg"
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wider uppercase mx-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ADMIN SECURITY PORTAL</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight pt-1">
              Administrator<br />Control Center
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Authorized PP LANDS & PLOTS personnel only
            </p>
          </div>

          {loginError && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1.5">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>Admin Email</span>
              </div>
              <input
                type="text"
                required
                placeholder="enter email or username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/90 border border-rose-500/40 rounded-2xl text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1.5">
                <Lock className="w-4 h-4 text-rose-500" />
                <span>Master Password</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
              <div className="text-right pt-1.5">
                <button
                  type="button"
                  onClick={handleOpenForgotModal}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-lg shadow-rose-600/25 transition-all text-sm flex items-center justify-between group mt-3"
            >
              <Key className="w-4 h-4 opacity-90 group-hover:scale-110 transition-transform" />
              <span>Access Admin Control Center</span>
              <ArrowRight className="w-4 h-4 opacity-90 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <div className="text-center pt-1">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mx-auto transition-colors"
            >
              <span>Return to Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* FORGOT PASSWORD MODAL */}
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative text-left">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto text-rose-500">
                  <Key className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-white">Reset Admin Password</h2>
                <p className="text-xs text-slate-400">
                  {resetStep === 1 && 'Enter your admin email address to receive a 6-digit verification code.'}
                  {resetStep === 2 && 'Enter the 6-digit code sent to your email and set your new password.'}
                  {resetStep === 3 && 'Password successfully updated! You can now log in.'}
                </p>
              </div>

              {resetError && (
                <div className="bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {resetSuccessMsg && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{resetSuccessMsg}</span>
                </div>
              )}

              {resetStep === 1 && (
                <form onSubmit={handleSendResetCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Admin Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="pplp3008@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-2xl text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-rose-600/25 text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {resetLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Code via SMTP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Verification Code</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {resetStep === 2 && (
                <form onSubmit={handleVerifyAndResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="e.g. 581932"
                      className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-slate-950 border border-rose-500/40 rounded-2xl text-rose-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-semibold text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-semibold text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setResetStep(1)}
                      className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-2xl text-xs"
                    >
                      Resend
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="w-2/3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold py-3 rounded-2xl shadow-lg shadow-rose-600/25 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {resetLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>Reset Password</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {resetStep === 3 && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotModalOpen(false);
                      setLoginError('');
                    }}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-2xl text-sm"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD VIEW WITH VERTICAL SIDEBAR LAYOUT
  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { id: 'properties', label: 'Portfolio & Properties', count: properties.length, icon: Home },
    { id: 'services', label: 'Services', count: services.length, icon: Layers },
    { id: 'banners', label: 'Banners & Hero Slides', count: banners.length, icon: ImageIcon },
    { id: 'enquiries', label: 'Customer Enquiries', count: enquiries.length, icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      
      {/* ============================================================================== */}
      {/* VERTICAL SIDEBAR (Desktop fixed left nav & Mobile overlay drawer) */}
      {/* ============================================================================== */}

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
        />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-80 bg-slate-900 border-r border-slate-800 
        flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header / Brand */}
        <div className="p-5 border-b border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <img 
              src="/image-removebg-preview.png" 
              alt="PP LANDS & PLOTS Logo" 
              className="h-16 sm:h-20 w-auto object-contain max-w-[240px] drop-shadow-md"
            />

            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black tracking-wider uppercase shadow-sm">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Super Admin Portal</span>
            </div>
          </div>
        </div>

        {/* Vertical Navigation Menu */}
        <div className="px-4 py-6 flex-1 space-y-1.5 overflow-y-auto">

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all group ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                }`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer (View Live Site & Logout) */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900/90">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700/80 transition-all"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-rose-400" />
              <span>View Public Website</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 text-xs font-bold transition-all"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>

      {/* ============================================================================== */}
      {/* MAIN RIGHT CONTENT AREA */}
      {/* ============================================================================== */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* Top Header Bar */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-lg font-black text-white capitalize">
                {activeTab === 'properties' && 'Portfolio & Properties Management'}
                {activeTab === 'services' && 'Real Estate Services'}
                {activeTab === 'banners' && 'Hero & Mobile Banners'}
                {activeTab === 'enquiries' && 'Customer Enquiries & Leads'}
              </h2>
              <span className="text-[11px] text-slate-400 font-semibold block">
                Manage live content displayed on PP LANDS & PLOTS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Online</span>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Body */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* TOP SUMMARY STATS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('properties')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'properties' ? 'bg-slate-900 border-rose-500/50 shadow-lg' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs text-slate-400 font-bold uppercase">Total Listings</span>
              <div className="text-3xl font-black text-rose-400 mt-1">{properties.length}</div>
              <p className="text-[11px] text-slate-500 mt-1">Portfolio Land & Plots</p>
            </div>

            <div 
              onClick={() => setActiveTab('services')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'services' ? 'bg-slate-900 border-amber-500/50 shadow-lg' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs text-slate-400 font-bold uppercase">Services</span>
              <div className="text-3xl font-black text-amber-400 mt-1">{services.length}</div>
              <p className="text-[11px] text-slate-500 mt-1">Active Services Offered</p>
            </div>

            <div 
              onClick={() => setActiveTab('banners')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'banners' ? 'bg-slate-900 border-emerald-500/50 shadow-lg' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs text-slate-400 font-bold uppercase">Hero Banners</span>
              <div className="text-3xl font-black text-emerald-400 mt-1">{banners.length}</div>
              <p className="text-[11px] text-slate-500 mt-1">Active Banner Slides</p>
            </div>

            <div 
              onClick={() => setActiveTab('enquiries')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'enquiries' ? 'bg-slate-900 border-cyan-500/50 shadow-lg' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-xs text-slate-400 font-bold uppercase">Customer Enquiries</span>
              <div className="text-3xl font-black text-cyan-400 mt-1">{enquiries.length}</div>
              <p className="text-[11px] text-slate-500 mt-1">Customer Leads</p>
            </div>
          </div>

          {/* TAB 1: PORTFOLIO & PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search properties by title, category, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <button
                  onClick={openAddProperty}
                  className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Property Listing</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={prop.images && prop.images[0] ? prop.images[0] : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {prop.category}
                        </div>
                        <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {prop.status}
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="font-extrabold text-base text-white leading-snug line-clamp-2">
                          {prop.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            {prop.location}
                          </span>
                          <span className="font-bold text-amber-400">
                            {prop.size}
                          </span>
                          <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                            {prop.approval}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 pt-1 leading-relaxed">
                          {prop.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 pt-4">
                      <span className="text-xs font-black text-emerald-400">
                        {prop.price}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditProperty(prop)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Edit Property"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                              deleteProperty(prop.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h2 className="text-base font-extrabold text-white">
                  Real Estate Services ({services.length})
                </h2>

                <button
                  onClick={openAddService}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-lg text-white">
                        {srv.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {srv.shortDesc}
                      </p>
                      {srv.fullDesc && (
                        <p className="text-[11px] text-slate-500 line-clamp-3">
                          {srv.fullDesc}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
                      <button
                        onClick={() => openEditService(srv)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Service</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${srv.name}"?`)) {
                            deleteService(srv.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BANNERS & HERO SLIDES MANAGEMENT */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="text-base font-extrabold text-white">
                    Hero & Mobile Banners ({banners.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Control hero banner slides displayed on mobile and desktop viewports.
                  </p>
                </div>

                <button
                  onClick={openAddBanner}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Banner</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {banners.map((bnr) => (
                  <div
                    key={bnr.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
                  >
                    <div className="relative aspect-[21/8] bg-slate-950 overflow-hidden">
                      <img
                        src={bnr.image}
                        alt={bnr.title}
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute top-2.5 left-3 bg-slate-950/80 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {bnr.badge || 'Banner Slide'}
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 space-y-0.5">
                        <h3 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                          {bnr.title} <span className="text-rose-500">{bnr.highlight}</span>
                        </h3>
                        <p className="text-[11px] text-slate-300 line-clamp-1">
                          {bnr.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 py-2.5 flex items-center justify-between border-t border-slate-800/60 bg-slate-900/90">
                      <span className="text-xs text-slate-400 font-semibold">
                        ID: <span className="font-mono text-slate-300">{bnr.id}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditBanner(bnr)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete banner "${bnr.title}"?`)) {
                              deleteBanner(bnr.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER ENQUIRIES / LEADS */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h2 className="text-base font-extrabold text-white">
                  Customer Inquiries & Leads ({enquiries.length})
                </h2>
              </div>

              {enquiries.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-2">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="font-extrabold text-white text-base">No enquiries received yet</p>
                  <p className="text-xs">When users submit contact or property inquiry forms on the site, they will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-black text-white text-base">{enq.name}</h3>
                          <a
                            href={`tel:${enq.phone}`}
                            className="text-xs font-extrabold text-rose-400 hover:underline block mt-0.5"
                          >
                            📞 {enq.phone}
                          </a>
                          {enq.email && (
                            <span className="text-xs text-slate-400 block">{enq.email}</span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Delete enquiry from ${enq.name}?`)) {
                              deleteEnquiry(enq.id, enq);
                            }
                          }}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {enq.property_title && (
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Property Selection</span>
                          <span className="font-extrabold text-white">{enq.property_title}</span>
                        </div>
                      )}

                      {enq.message && (
                        <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed italic">
                          "{enq.message}"
                        </p>
                      )}

                      <div className="text-[10px] text-slate-500 pt-1">
                        Submitted: {new Date(enq.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* ============================================================================== */}
      {/* MODAL DIALOG FOR ADDING / EDITING PROPERTIES, SERVICES & BANNERS */}
      {/* ============================================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* PROPERTY MODAL FORM */}
            {(activeModal === 'add_property' || activeModal === 'edit_property') && (
              <form onSubmit={savePropertySubmit} className="space-y-4">
                <h2 className="text-xl font-black text-white">
                  {activeModal === 'add_property' ? 'Add New Property Listing' : 'Edit Property Listing'}
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Property Title *</label>
                    <input
                      type="text"
                      required
                      value={propForm.title}
                      onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                      placeholder="e.g. Premium Residential Venture Plot - Shankarpally"
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Category *</label>
                      <select
                        value={propForm.category}
                        onChange={(e) => setPropForm({ ...propForm, category: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="Open Plots">Open Plots</option>
                        <option value="Venture Plots">Venture Plots</option>
                        <option value="Agriculture Land">Agriculture Land</option>
                        <option value="Commercial Properties">Commercial Properties</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={propForm.location}
                        onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                        placeholder="e.g. Shankarpally, Hyderabad"
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Plot / Land Size *</label>
                      <input
                        type="text"
                        required
                        value={propForm.size}
                        onChange={(e) => setPropForm({ ...propForm, size: e.target.value })}
                        placeholder="e.g. 200 Sq. Yards or 1.5 Acres"
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Price</label>
                      <input
                        type="text"
                        value={propForm.price}
                        onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                        placeholder="Price on Request or ₹ 35 Lakhs"
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Approval Standard</label>
                      <select
                        value={propForm.approval}
                        onChange={(e) => setPropForm({ ...propForm, approval: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="HMDA Approved">HMDA Approved</option>
                        <option value="DTCP Layout">DTCP Layout</option>
                        <option value="GHMC Approved">GHMC Approved</option>
                        <option value="Gram Panchayat / Pattadar">Gram Panchayat / Pattadar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={propForm.description}
                      onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                      placeholder="Enter detailed description of plot, road width, surrounding features..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Key Highlights / Features (One per line)</label>
                    <textarea
                      rows={3}
                      value={propForm.featuresText}
                      onChange={(e) => setPropForm({ ...propForm, featuresText: e.target.value })}
                      placeholder="30ft Blacktop Roads&#10;Underground Drainage&#10;100% Clear Title"
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  {/* CLOUDINARY IMAGE UPLOAD BLOCK */}
                  <div className="space-y-2 pt-1">
                    <label className="block font-bold text-slate-300">
                      Upload Images to Cloudinary
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all">
                        <UploadCloud className="w-4 h-4" />
                        <span>Choose Images...</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePropertyImageUpload}
                          className="hidden"
                        />
                      </label>
                      {isUploading && <span className="text-xs text-amber-400 font-bold">{uploadMessage}</span>}
                    </div>

                    {propForm.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {propForm.images.map((img, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700">
                            <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setPropForm(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== idx)
                              }))}
                              className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-extrabold text-white shadow-md"
                  >
                    Save Property Listing
                  </button>
                </div>
              </form>
            )}

            {/* SERVICE MODAL FORM */}
            {(activeModal === 'add_service' || activeModal === 'edit_service') && (
              <form onSubmit={saveServiceSubmit} className="space-y-4">
                <h2 className="text-xl font-black text-white">
                  {activeModal === 'add_service' ? 'Add New Service' : 'Edit Service'}
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      placeholder="e.g. Land Sales"
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Short Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={serviceForm.shortDesc}
                      onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                      placeholder="Brief summary displayed on cards..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Full Description</label>
                    <textarea
                      rows={4}
                      value={serviceForm.fullDesc}
                      onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                      placeholder="Comprehensive overview of service..."
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-extrabold text-white shadow-md"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            )}

            {/* BANNER MODAL FORM */}
            {(activeModal === 'add_banner' || activeModal === 'edit_banner') && (
              <form onSubmit={saveBannerSubmit} className="space-y-4">
                <h2 className="text-xl font-black text-white">
                  {activeModal === 'add_banner' ? 'Add New Hero Banner' : 'Edit Hero Banner'}
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Banner Title *</label>
                    <input
                      type="text"
                      required
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="e.g. Find the Right Land."
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Highlighted Red Text</label>
                    <input
                      type="text"
                      value={bannerForm.highlight}
                      onChange={(e) => setBannerForm({ ...bannerForm, highlight: e.target.value })}
                      placeholder="e.g. Build Your Future."
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Subtitle / Supporting Text</label>
                    <input
                      type="text"
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="e.g. Trusted Lands & Plots for Smart Buyers in Telangana."
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={bannerForm.badge}
                      onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                      placeholder="e.g. Shankarpally • Hyderabad - Telangana"
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  {/* CLOUDINARY UPLOAD FOR BANNER */}
                  <div className="space-y-2 pt-1">
                    <label className="block font-bold text-slate-300">
                      Upload Banner Image to Cloudinary
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Image...</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerImageUpload}
                          className="hidden"
                        />
                      </label>
                      {isUploading && <span className="text-xs text-amber-400 font-bold">{uploadMessage}</span>}
                    </div>

                    {bannerForm.image && (
                      <div className="relative aspect-[16/9] w-full max-w-xs rounded-xl overflow-hidden border border-slate-700 mt-2">
                        <img src={bannerForm.image} alt="Banner Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-extrabold text-white shadow-md"
                  >
                    Save Banner Slide
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
