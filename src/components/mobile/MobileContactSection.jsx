import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function MobileContactSection() {
  const { COMPANY_DETAILS } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interestedIn: 'Select option',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="md:hidden space-y-5 py-4">
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Get In Touch
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Have questions? We're here to help. Reach out to us for the best property guidance.
        </p>
      </div>

      {/* Contact Items List with Round Icons */}
      <div className="space-y-3">
        <a
          href={COMPANY_DETAILS.contact.telUrl}
          className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
            {COMPANY_DETAILS.contact.phone}
          </span>
        </a>

        <a
          href={COMPANY_DETAILS.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
            {COMPANY_DETAILS.contact.whatsapp}
          </span>
        </a>

        <a
          href={COMPANY_DETAILS.contact.mailtoUrl}
          className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
            {COMPANY_DETAILS.contact.email}
          </span>
        </a>

        <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
            Shankarpally, Hyderabad, Telangana
          </span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Our representative will contact you on {formData.phone} shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Send Another Requirement
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Interested In
              </label>
              <select
                value={formData.interestedIn}
                onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Select option">Select option</option>
                <option value="Open Plots">Open Plots</option>
                <option value="Venture Plots">Venture Plots</option>
                <option value="Agricultural Lands">Agricultural Lands</option>
                <option value="Commercial Lands">Commercial Lands</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your requirement..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-1"
            >
              <Send className="w-4 h-4" />
              <span>Send Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
