import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Star, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export const CourseModal = () => {
  const { selectedCourseModal, setSelectedCourseModal, setIsEnquiryModalOpen } = useApp();

  if (!selectedCourseModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Image Banner Header */}
        <div className="relative h-48 sm:h-56">
          <img
            src={selectedCourseModal.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
            alt={selectedCourseModal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          <button
            onClick={() => setSelectedCourseModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md">
              {selectedCourseModal.category}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-2 leading-tight">
              {selectedCourseModal.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">Duration: <strong>{selectedCourseModal.duration}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-slate-300">Rating: <strong>{selectedCourseModal.rating} / 5.0</strong></span>
            </div>
            <div>
              <span className="text-emerald-400 font-extrabold text-base">{selectedCourseModal.fee}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-2">Program Overview</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedCourseModal.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Syllabus & Module Breakdown</span>
            </h4>

            <div className="space-y-2">
              {selectedCourseModal.modules && selectedCourseModal.modules.map((mod, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 text-xs sm:text-sm font-medium">{mod}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setSelectedCourseModal(null)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            Close
          </button>

          <button
            onClick={() => {
              setSelectedCourseModal(null);
              setIsEnquiryModalOpen(true);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center space-x-1"
          >
            <span>Register Interest Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
