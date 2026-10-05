import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const EnquiryModal = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, courses, addEnquiry, siteConfig } = useApp();

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    mobile: '',
    course: courses[0]?.title || 'Java Fullstack Masterclass',
    batch: 'Weekday Regular',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isDone, setIsDone] = useState(false);

  if (!isEnquiryModalOpen) return null;

  // Validation Helper
  const validate = () => {
    const newErrors = {};

    // Validate Student Name
    const nameTrimmed = formData.studentName.trim();
    if (!nameTrimmed) {
      newErrors.studentName = "Full Name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.studentName = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'.]+$/.test(nameTrimmed)) {
      newErrors.studentName = "Name can only contain alphabets.";
    }

    // Validate Email
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Validate Mobile
    const cleanedMobile = formData.mobile.replace(/[^0-9]/g, '');
    if (!cleanedMobile) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (cleanedMobile.length !== 10) {
      newErrors.mobile = "Must be 10 digits.";
    } else if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      newErrors.mobile = "Must start with 6, 7, 8, or 9.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addEnquiry({
      ...formData,
      mobile: formData.mobile.replace(/[^0-9]/g, '')
    });

    setIsDone(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    } catch (e) {}
  };

  const handleClose = () => {
    setIsDone(false);
    setErrors({});
    setIsEnquiryModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Enquiry Received!</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Your inquiry has been stored in our system and an alert has been dispatched to <strong>{siteConfig.adminNotifyEmail}</strong>.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Quick Registration</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Enquire For Next Batch</h3>
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Student Full Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white text-sm focus:outline-none ${
                  errors.studentName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-blue-500'
                }`}
              />
              {errors.studentName && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.studentName}</span>
                </p>
              )}
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email ID *</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white text-sm focus:outline-none ${
                    errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={formData.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white text-sm focus:outline-none ${
                    errors.mobile ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-blue-500'
                  }`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.mobile}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Course</label>
              <select
                value={formData.course}
                onChange={(e) => handleChange('course', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Batch Preference</label>
              <select
                value={formData.batch}
                onChange={(e) => handleChange('batch', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Weekday Regular">Weekday Regular</option>
                <option value="Weekend Special">Weekend Special</option>
                <option value="Online Live Interactive">Online Live Interactive</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Message / Questions</label>
              <textarea
                rows="2"
                placeholder="Optional query..."
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Receive Call Back</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
