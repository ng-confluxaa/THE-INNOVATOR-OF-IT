import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, MapPin, Calendar, DollarSign, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const InternshipsSection = () => {
  const { internships, setIsEnquiryModalOpen } = useApp();

  return (
    <section id="internships" className="py-20 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            Career Kickstart
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Active <span className="text-gradient">Internship Opportunities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Gain real-world experience, monthly stipends, and Pre-Placement Offers (PPO) through our hiring partner internship programs.
          </p>
        </div>

        {/* Internship Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {internships.map(intern => (
            <div
              key={intern.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    {intern.stipend}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{intern.role}</h3>
                <p className="text-xs text-indigo-300 font-medium mt-1">{intern.company}</p>

                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{intern.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Duration: {intern.duration}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400">Key Requirements:</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{intern.requirements}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Apply For Internship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
