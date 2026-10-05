import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { siteConfig } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Institute Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                THE INNOVATOR <span className="text-gradient">OF IT</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Leading IT Training & Career Transformation Institute dedicated to producing industry-ready software engineering professionals.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-800 pb-2">Popular Programs</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Java Fullstack Masterclass</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Modern Web Development (MERN)</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Python & Data Science</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">AI & Machine Learning</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Cloud & DevOps Engineering</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-800 pb-2">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-blue-400 transition-colors">Home Page</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#placements" className="hover:text-blue-400 transition-colors">Placement Record</a></li>
              <li><a href="#internships" className="hover:text-blue-400 transition-colors">Internship Openings</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Student Enquiry</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-b border-slate-800 pb-2">Campus Office</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{siteConfig.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300">{siteConfig.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-slate-300">{siteConfig.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.instituteName}. All rights reserved.</p>
          
          <div className="flex items-center space-x-4">
            <button onClick={scrollToTop} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center space-x-1">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
