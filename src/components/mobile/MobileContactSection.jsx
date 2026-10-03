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
    <div className="md:hidden space-y-3.5 py-2">
      {/* Heading */}
      <div className="space-y-0.5" data-aos="fade-up">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Get In Touch
        </h2>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
          Have questions? Reach out to us for direct property guidance.
        </p>
      </div>

      {/* 2x2 Compact Grid Contact Quick Links */}
      <div className="grid grid-cols-2 gap-2" data-aos="fade-up" data-aos-delay="100">
        <a
          href={COMPANY_DETAILS.contact.telUrl}
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500/50 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[9px] text-slate-400 font-semibold uppercase">Call Us</span>
            <span className="text-[11px] font-extrabold text-slate-900 dark:text-white truncate block">
              {COMPANY_DETAILS.contact.phone}
            </span>
          </div>
        </a>

        <a
          href={COMPANY_DETAILS.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="min-w-0">
            <span className="block text-[9px] text-slate-400 font-semibold uppercase">WhatsApp</span>
            <span className="text-[11px] font-extrabold text-slate-900 dark:text-white truncate block">
              {COMPANY_DETAILS.contact.whatsapp}
            </span>
          </div>
        </a>

        <a
          href={COMPANY_DETAILS.contact.mailtoUrl}
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500/50 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[9px] text-slate-400 font-semibold uppercase">Email</span>
            <span className="text-[11px] font-extrabold text-slate-900 dark:text-white truncate block">
              Email Us
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="block text-[9px] text-slate-400 font-semibold uppercase">Location</span>
            <span className="text-[11px] font-extrabold text-slate-900 dark:text-white truncate block">
              Shankarpally
            </span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3" data-aos="fade-up" data-aos-delay="150">
        {submitted ? (
          <div className="text-center py-4 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Enquiry Submitted!
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              We will call you on {formData.phone} shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[11px] font-bold text-red-600 hover:underline"
            >
              Send Another Requirement
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Name & Phone side by side */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                Interested In
              </label>
              <select
                value={formData.interestedIn}
                onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Select option">Select Property Type</option>
                <option value="Open Plots">Open Plots</option>
                <option value="Venture Plots">Venture Plots</option>
                <option value="Agricultural Lands">Agricultural Lands</option>
                <option value="Commercial Lands">Commercial Lands</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                Message
              </label>
              <textarea
                rows={2}
                placeholder="Brief requirement..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold py-2.5 rounded-lg text-xs shadow-md flex items-center justify-center gap-1.5 transition-all mt-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
