import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, AlertCircle, Loader2, Send, ShieldAlert } from 'lucide-react';
import PolicyBanner from './PolicyBanner';

export default function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiry, enquiryProperty, COMPANY_DETAILS } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: 'Plot Sales',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(true);

  useEffect(() => {
    if (enquiryProperty) {
      setFormData(prev => ({
        ...prev,
        requirement: enquiryProperty.category || 'Plot Sales',
        message: `I am interested in inquiring about "${enquiryProperty.title}" (${enquiryProperty.size}, ${enquiryProperty.location}). Please contact me with details.`
      }));
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        requirement: 'Plot Sales',
        message: ''
      });
    }
    setSubmitted(false);
    setErrors({});
  }, [enquiryProperty, isEnquiryOpen]);

  if (!isEnquiryOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    
    // Phone validation
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (!policyAccepted) {
      errs.policy = 'You must acknowledge the Booking & Site Visit policy';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate backend submission API call cleanly
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={closeEnquiry}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Enquiry Received Successfully!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-bold text-slate-900 dark:text-white">{formData.name}</span>. The team at <span className="font-bold text-emerald-600">{COMPANY_DETAILS.name}</span> will contact you shortly at <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={closeEnquiry}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                Property Inquiry & Assistance
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {enquiryProperty ? 'Enquire About Listing' : 'Send Us an Enquiry'}
              </h3>
              {enquiryProperty && (
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 line-clamp-1">
                  Target: {enquiryProperty.title}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit mobile number (e.g. 9553428583)"
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.phone ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* Requirement Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Property Requirement
              </label>
              <select
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Plot Sales">Plot Sales (Open & Venture Plots)</option>
                <option value="Land Sales">Land Sales (Agricultural & General)</option>
                <option value="Property Buying">Property Buying Assistance</option>
                <option value="Property Selling">Property Selling / Listing</option>
                <option value="Real Estate Investments">Real Estate Investment</option>
                <option value="Commercial Properties">Commercial Properties</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Message / Details
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your preferred plot location, budget, or timeline..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Policy Acknowledgment */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={policyAccepted}
                  onChange={(e) => setPolicyAccepted(e.target.checked)}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  I acknowledge the policy: <span className="font-semibold text-slate-800 dark:text-slate-200">"{COMPANY_DETAILS.policy.text}"</span>
                </span>
              </label>
              {errors.policy && <p className="text-xs text-rose-500 mt-1">{errors.policy}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Property Enquiry</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
