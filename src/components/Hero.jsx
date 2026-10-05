import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2, Search, Award, Users, Building2, TrendingUp, Play } from 'lucide-react';

export const Hero = () => {
  const { siteConfig, setIsEnquiryModalOpen, setSelectedCourseModal, courses } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = searchQuery
    ? courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    : [];

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Ambient glowing radial lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs sm:text-sm font-medium text-slate-300 backdrop-blur-md shadow-lg shadow-blue-500/10">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
            <span className="text-cyan-400 font-semibold">New Batches Starting Next Week!</span>
            <span className="text-slate-500">•</span>
            <span className="hidden sm:inline">Flat 20% Early Bird Scholarship</span>
          </div>
        </div>

        {/* Hero Main Heading & Subtitle */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Transform Your Career With <br className="hidden sm:inline" />
            <span className="text-gradient">THE INNOVATOR OF IT</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            {siteConfig.heroSubheadline}
          </p>

          {/* Feature Highlights Pills */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Placement Assistance</span>
            </span>
            <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Real Industrial Projects</span>
            </span>
            <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>1-on-1 Expert Mentorship</span>
            </span>
          </div>

          {/* Interactive Course Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search courses (e.g. Java, Web Dev, Python, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-4 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm sm:text-base"
              />
              <button
                onClick={scrollToCourses}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all flex items-center space-x-1"
              >
                <span>Find</span>
              </button>
            </div>

            {/* Live Search Dropdown */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 max-h-60 overflow-y-auto text-left">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <div
                      key={course.id}
                      onClick={() => {
                        setSelectedCourseModal(course);
                        setSearchQuery('');
                      }}
                      className="p-3 hover:bg-slate-800/80 cursor-pointer border-b border-slate-800 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-white text-sm">{course.title}</p>
                        <p className="text-xs text-slate-400">{course.category} • {course.duration} • {course.fee}</p>
                      </div>
                      <span className="text-xs text-blue-400 font-medium flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-sm">No courses matching "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={scrollToCourses}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 text-blue-400" />
              <span>Explore All Courses</span>
            </button>
          </div>

        </div>

        {/* Live Key Metrics Stats Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-5 rounded-2xl text-center border border-slate-800">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">{siteConfig.placedStudentsCount}</h4>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Students Placed</p>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border border-slate-800">
            <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">{siteConfig.hiringPartnersCount}</h4>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Tie-up Companies</p>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border border-slate-800">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">{siteConfig.averagePackage}</h4>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Average Salary CTC</p>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center border border-slate-800">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">{siteConfig.highestPackage}</h4>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Highest Package</p>
          </div>
        </div>

      </div>
    </section>
  );
};
