import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PolicyBanner from '../components/PolicyBanner';
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2, Loader2, ShieldCheck, Clock } from 'lucide-react';

export default function ContactPage() {
  const { COMPANY_DETAILS, submitEnquiry } = useApp();

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

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        requirement: formData.requirement,
        message: formData.message
      });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4" data-aos="fade-up">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Contact PP LANDS & PLOTS
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          We are ready to assist you with plot enquiries, land purchases, property selling, and site visit scheduling in Shankarpally and Hyderabad.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Phone */}
        <a
          href={COMPANY_DETAILS.contact.telUrl}
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold uppercase text-slate-400 block">Phone Call</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              {COMPANY_DETAILS.contact.formattedPhone}
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span>Tap to Call</span>
            <Send className="w-3 h-3" />
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={COMPANY_DETAILS.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 fill-current" />
            </div>
            <span className="text-xs font-extrabold uppercase text-slate-400 block">WhatsApp Chat</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
              {COMPANY_DETAILS.contact.whatsapp}
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span>Open WhatsApp Chat</span>
            <Send className="w-3 h-3" />
          </span>
        </a>

        {/* Email */}
        <a
          href={COMPANY_DETAILS.contact.mailtoUrl}
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold uppercase text-slate-400 block">Official Email</span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors break-all">
              {COMPANY_DETAILS.contact.email}
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <span>Send Email</span>
            <Send className="w-3 h-3" />
          </span>
        </a>

        {/* Location */}
        <div 
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xs font-extrabold uppercase text-slate-400 block">Office Location</span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {COMPANY_DETAILS.location.fullAddress}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Shankarpally • Hyderabad
          </span>
        </div>

      </div>

      {/* Main Section: Form & Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-md" data-aos="fade-right">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Thank You for Reaching Out!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Your message has been logged. Representative from <strong>{COMPANY_DETAILS.name}</strong> will contact you at <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                  Enquiry Form
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Send Your Property Requirement
                </h2>
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
                  className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9553428583"
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Property Requirement */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Property Requirement
                </label>
                <select
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  Message / Site Visit Preference
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your preferred location, size requirement, or budget..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Policy checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policyAccepted}
                    onChange={(e) => setPolicyAccepted(e.target.checked)}
                    className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    I acknowledge: <span className="font-semibold text-slate-800 dark:text-slate-200">"{COMPANY_DETAILS.policy.text}"</span>
                  </span>
                </label>
                {errors.policy && <p className="text-xs text-rose-500 mt-1">{errors.policy}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Form...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Form Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Business Policy & Trust Info Column */}
        <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
          
          <PolicyBanner />

          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Trust & Business Guarantee</h3>
                <span className="text-xs text-slate-400">Established Offline in 2023</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              We operate strictly on genuine documentation, transparent plot dimensions, and verified property records. We never issue fake promises, zero-risk legal claims, or exaggerated customer counts.
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Office Hours: Monday - Sunday (9:00 AM - 7:00 PM)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Shankarpally, Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
