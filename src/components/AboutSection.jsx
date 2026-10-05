import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, BookOpen, CheckCircle, ShieldCheck, Laptop, Users, Target, Rocket } from 'lucide-react';

export const AboutSection = () => {
  const { siteConfig } = useApp();

  return (
    <section id="about" className="py-20 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            About Institute
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Why Learn At <span className="text-gradient">{siteConfig.instituteName}</span>?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            We bridge the gap between academic education and real-world tech industry demands through practical coding, real client projects, and rigorous placement preparation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Practical Coding</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              No boring slides. 80% of class time is spent writing clean code, building fullstack software architectures, and handling real production bugs.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Guaranteed Placement Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dedicated placement cell providing unlimited interview calls, resume formatting, GitHub profile polishing, and 1-on-1 mock technical interviews.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Industry Veteran Faculty</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Learn directly from Senior Architects & Tech Leads working in Fortune 500 companies with 10+ years of hands-on software development experience.
            </p>
          </div>

        </div>

        {/* Detailed Breakdown Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-8 lg:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Our Vision: Building Industry-Ready Software Engineers
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              At <strong className="text-blue-400">{siteConfig.instituteName}</strong>, we believe every passionate student deserves top-tier technical guidance. Whether you are a college graduate or looking for a career transition into IT, our curriculum is engineered to match current hiring standards.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Flexible Regular Weekday & Hybrid Weekend Batches for working professionals.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Dedicated doubt-solving labs open 12 hours a day with TA support.</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Lifetime recorded session backup & downloadable source code repositories.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Students learning in institute lab"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">ISO 9001:2015 Certified Training Center</p>
                    <p className="text-sm font-bold text-white">Recognized by Leading Tech Employers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
