import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyTicker } from './components/CompanyTicker';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { PlacementsSection } from './components/PlacementsSection';
import { InternshipsSection } from './components/InternshipsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminPanel } from './components/AdminPanel';

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CompanyTicker />
        <AboutSection />
        <CoursesSection />
        <PlacementsSection />
        <InternshipsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Global Modals & Overlays */}
      <CourseModal />
      <EnquiryModal />
      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
