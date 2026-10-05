import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, Tag, Star, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const CoursesSection = () => {
  const { courses, setSelectedCourseModal, setIsEnquiryModalOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Full Stack', 'Web Dev', 'Data & AI', 'Cloud'];

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  return (
    <section id="courses" className="py-20 bg-slate-900 text-slate-100 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Featured Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Industry-Oriented <span className="text-gradient">Tech Courses</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Master high-demand tech skills with 100% hands-on projects, live code reviews, and placement assistance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300"
            >
              <div>
                {/* Course Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-blue-600/90 text-white text-xs font-bold shadow-md">
                    {course.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center space-x-1 border border-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">{course.fee}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {course.tags && course.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags && course.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px]">
                        +{course.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-all border border-slate-700 text-center"
                >
                  View Syllabus
                </button>

                <button
                  onClick={() => {
                    setSelectedCourseModal(course);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
