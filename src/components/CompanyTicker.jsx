import React from 'react';
import { useApp } from '../context/AppContext';
import { Building } from 'lucide-react';

export const CompanyTicker = () => {
  const { companies } = useApp();

  // Duplicate company list for seamless continuous infinite marquee loop
  const marqueeList = [...companies, ...companies, ...companies];

  return (
    <section className="py-8 bg-slate-900 border-y border-slate-800/80 overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center justify-center space-x-2">
          <Building className="w-4 h-4 text-cyan-400" />
          <span>OUR TOP HIRING PARTNERS & RECRUITING COMPANIES</span>
        </p>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left & Right gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee space-x-6 sm:space-x-8">
          {marqueeList.map((comp, idx) => (
            <div
              key={`${comp.id}-${idx}`}
              className="px-6 py-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center space-x-3 shadow-md hover:border-blue-500/50 transition-all flex-shrink-0"
            >
              <span className="text-xl">{comp.logo || '🏢'}</span>
              <span className="text-sm font-semibold text-slate-200 whitespace-nowrap">{comp.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
