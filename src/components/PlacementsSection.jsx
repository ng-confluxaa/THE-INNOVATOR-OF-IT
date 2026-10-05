import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Building2, Quote, Award, Sparkles } from 'lucide-react';

export const PlacementsSection = () => {
  const { placedStudents, siteConfig } = useApp();

  return (
    <section id="placements" className="py-20 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Our Placed <span className="text-gradient-gold">Students & Success Stories</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Over {siteConfig.placedStudentsCount} students have successfully launched their tech careers at top product and service MNCs.
          </p>
        </div>

        {/* Placed Students Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placedStudents.map(student => (
            <div
              key={student.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between relative group hover:border-amber-500/50 transition-all duration-300"
            >
              <div>
                {/* CTC Package Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40 shadow-sm flex items-center space-x-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{student.ctc}</span>
                </div>

                {/* Avatar Image */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl mb-4 group-hover:border-amber-400 transition-colors">
                  <img
                    src={student.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Student Info */}
                <h3 className="text-lg font-bold text-white">{student.name}</h3>
                
                <div className="mt-1 flex items-center space-x-1 text-xs text-slate-300 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-cyan-400">{student.company}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 line-clamp-1">{student.role}</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 font-medium">
                  Course: <span className="text-slate-300">{student.course}</span>
                </p>

                {/* Testimonial Quote */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 relative">
                  <Quote className="w-4 h-4 text-slate-600 absolute -top-2 left-0 bg-slate-900 px-0.5" />
                  <p className="text-xs text-slate-300 italic leading-relaxed pt-1">
                    "{student.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
