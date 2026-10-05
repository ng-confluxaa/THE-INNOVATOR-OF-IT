import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactSection = () => {
  const { siteConfig, courses, addEnquiry } = useApp();

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    mobile: '',
    course: courses[0]?.title || 'Java Fullstack Masterclass',
    batch: 'Weekday Regular',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field Validation Helper
  const validate = () => {
    const newErrors = {};

    // Validate Student Name
    const nameTrimmed = formData.studentName.trim();
    if (!nameTrimmed) {
      newErrors.studentName = "Student Full Name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.studentName = "Name must be at least 2 characters long.";
    } else if (!/^[a-zA-Z\s'.]+$/.test(nameTrimmed)) {
      newErrors.studentName = "Name can only contain alphabets and spaces.";
    }

    // Validate Email
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = "Please enter a valid email address (e.g., student@gmail.com).";
    }

    // Validate Mobile Number
    const cleanedMobile = formData.mobile.replace(/[^0-9]/g, '');
    if (!cleanedMobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (cleanedMobile.length !== 10) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    } else if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.";
    }

    // Validate Course
    if (!formData.course) {
      newErrors.course = "Please select a course.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    addEnquiry({
      ...formData,
      mobile: formData.mobile.replace(/[^0-9]/g, '')
    });
    
    setIsSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti effect executed.');
    }

    // Reset form data
    setFormData({
      studentName: '',
      email: '',
      mobile: '',
      course: courses[0]?.title || 'Java Fullstack Masterclass',
      batch: 'Weekday Regular',
      message: ''
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-slate-100 relative">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Details & Map Info */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
              Have Questions? <br />
              <span className="text-gradient">Talk To Our Career Counselor</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
              Fill out the student enquiry form to request a callback, book a free demo session, or receive detailed course brochures directly on your email and WhatsApp.
            </p>

            <div className="mt-8 space-y-6">
              
              <div className="flex items-start space-x-4 glass-card p-4 rounded-xl border border-slate-800">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Call / WhatsApp Support</p>
                  <p className="text-base font-bold text-white mt-0.5">{siteConfig.phone}</p>
                  <p className="text-xs text-slate-400">Mon - Sat: 9:00 AM to 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 glass-card p-4 rounded-xl border border-slate-800">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Official Admissions Mail</p>
                  <p className="text-base font-bold text-white mt-0.5">{siteConfig.email}</p>
                  <p className="text-xs text-cyan-400 mt-1">Enquiries auto-dispatched to: {siteConfig.adminNotifyEmail}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 glass-card p-4 rounded-xl border border-slate-800">
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Campus Address</p>
                  <p className="text-sm font-medium text-slate-200 mt-0.5">{siteConfig.address}</p>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Quick Chat CTA */}
            <div className="mt-8">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20The%20Innovator%20of%20IT,%20I%20want%20to%20enquire%20about%20your%20courses.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat Instantly On WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Student Enquiry Form with Full Validation */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative shadow-2xl">
            
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enquiry Submitted Successfully!</h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Thank you for expressing interest. Your details have been securely logged and an immediate notification email has been dispatched to <strong className="text-cyan-400">{siteConfig.adminNotifyEmail}</strong>.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  Our career counselor will reach out to you on your mobile number within 2 business hours.
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Student Lead Registration</span>
                  <h3 className="text-xl font-bold text-white mt-1">Book Free Counseling Session</h3>
                </div>

                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.studentName}
                    onChange={(e) => handleChange('studentName', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none text-sm transition-colors ${
                      errors.studentName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                    }`}
                  />
                  {errors.studentName && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.studentName}</span>
                    </p>
                  )}
                </div>

                {/* Email & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none text-sm transition-colors ${
                        errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white placeholder-slate-500 focus:outline-none text-sm transition-colors ${
                        errors.mobile ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                      }`}
                    />
                    {errors.mobile && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Course Selection & Batch Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Select Course <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => handleChange('course', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-xl text-white focus:outline-none text-sm ${
                        errors.course ? 'border-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                      }`}
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Batch Timing
                    </label>
                    <select
                      value={formData.batch}
                      onChange={(e) => handleChange('batch', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="Weekday Regular">Weekday Regular (Mon-Fri)</option>
                      <option value="Weekend Special">Weekend Special (Sat-Sun)</option>
                      <option value="Online Live Interactive">Online Live Interactive</option>
                    </select>
                  </div>
                </div>

                {/* Query / Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message / Specific Query
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your background or specific career goal..."
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-cyan-300" />
                  <span>Submit Enquiry & Get Call Back</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  🔒 Your contact information is strictly confidential and will never be spammed.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
