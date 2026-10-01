import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/properties';

export default function PolicyBanner({ compact = false, className = '' }) {
  return (
    <div
      className={`policy-banner p-4 md:p-5 my-4 border border-amber-200 dark:border-amber-900/40 ${className}`}
      role="region"
      aria-label="Booking and Site Visit Policy"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1">
            <span>IMPORTANT BUSINESS POLICY</span>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full font-medium">
              Booking & Site Visits
            </span>
          </h4>
          <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            "{COMPANY_DETAILS.policy.text}"
          </p>
        </div>
      </div>
    </div>
  );
}
