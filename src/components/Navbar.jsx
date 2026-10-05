import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, Menu, X, Sparkles, BookOpen, Users, Briefcase, Info, Send } from 'lucide-react';

export const Navbar = () => {
  const { siteConfig, setIsEnquiryModalOpen, isAdminPanelOpen, closeAdminPanel } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // URL Hash & Clean Route Navigation
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);

    if (isAdminPanelOpen) {
      closeAdminPanel();
    }

    // Clean pathname to '/' and set clean section route (e.g. http://localhost:5173/#courses)
    const cleanRoute = id === 'hero' ? '/' : `/#${id}`;
    if (window.history.pushState) {
      window.history.pushState(null, '', cleanRoute);
    } else {
      window.location.hash = id === 'hero' ? '' : `#${id}`;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Synchronize URL hash on mount & hash change
  useEffect(() => {
    const handleHashOrScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['hero', 'about', 'courses', 'placements', 'internships', 'contact'].includes(hash)) {
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashOrScroll();
    window.addEventListener('hashchange', handleHashOrScroll);
    return () => window.removeEventListener('hashchange', handleHashOrScroll);
  }, []);

  // Scroll Spy for highlighting active navigation link
  useEffect(() => {
    const sections = ['hero', 'about', 'courses', 'placements', 'internships', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 text-xs py-2 px-4 border-b border-slate-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{siteConfig.phone}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{siteConfig.email}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
              🎓 Admissions Open for Upcoming Batches
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institute Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                THE INNOVATOR <span className="text-gradient">OF IT</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
                {siteConfig.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items with Active State & URL Sync */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button
              onClick={() => scrollTo('hero')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'hero'
                  ? 'text-blue-400 border-blue-500 font-bold'
                  : 'text-slate-300 border-transparent hover:text-blue-400'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'about'
                  ? 'text-blue-400 border-blue-500 font-bold'
                  : 'text-slate-300 border-transparent hover:text-blue-400'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollTo('courses')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'courses'
                  ? 'text-blue-400 border-blue-500 font-bold'
                  : 'text-slate-300 border-transparent hover:text-blue-400'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => scrollTo('placements')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'placements'
                  ? 'text-blue-400 border-blue-500 font-bold'
                  : 'text-slate-300 border-transparent hover:text-blue-400'
              }`}
            >
              Placements
            </button>
            <button
              onClick={() => scrollTo('internships')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'internships'
                  ? 'text-blue-400 border-blue-500 font-bold'
                  : 'text-slate-300 border-transparent hover:text-blue-400'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'contact'
                  ? 'text-blue-400 border-blue-500 font-bold'
                  : 'text-slate-300 border-transparent hover:text-blue-400'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-xl"></span>
              <span className="relative block px-5 py-2.5 bg-slate-950 rounded-[11px] text-white transition-all group-hover:bg-opacity-0 flex items-center space-x-2">
                <Send className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                <span>Enquire Now</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <button onClick={() => scrollTo('hero')} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Home</span>
          </button>
          <button onClick={() => scrollTo('about')} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>About Us</span>
          </button>
          <button onClick={() => scrollTo('courses')} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Courses</span>
          </button>
          <button onClick={() => scrollTo('placements')} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Placements</span>
          </button>
          <button onClick={() => scrollTo('internships')} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Internships</span>
          </button>
          <button onClick={() => scrollTo('contact')} className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-800">
            <Phone className="w-4 h-4 text-rose-400" />
            <span>Contact Us</span>
          </button>
        </div>
      )}
    </header>
  );
};
