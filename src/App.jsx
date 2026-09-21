import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import EnquiryModal from './components/EnquiryModal';
import FloatingContactWidget from './components/FloatingContactWidget';

// Route Code Splitting for 5x Faster Initial Page Load
const HomePage = lazy(() => import('./pages/HomePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const InvestorGuidePage = lazy(() => import('./pages/InvestorGuidePage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-10 h-10 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin"></div>
    <span className="text-xs font-semibold uppercase tracking-widest text-charcoal-700">Loading Vedik Realty...</span>
  </div>
);

export default function App() {
  const [globalModalOpen, setGlobalModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-ivory text-charcoal-800 font-sans selection:bg-gold-500 selection:text-white">

      <Navbar />

      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/invest-in-dharuhera" element={<InvestorGuidePage />} />
            <Route path="/investor-guide" element={<InvestorGuidePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:slugOrId" element={<PropertyDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Mobile Sticky CTA Bar */}
      <StickyMobileBar onEnquireClick={() => setGlobalModalOpen(true)} />

      {/* Floating Quick WhatsApp & Call Widget */}
      <FloatingContactWidget onEnquireClick={() => setGlobalModalOpen(true)} />

      {/* Global Quick Enquiry Modal */}
      {globalModalOpen && (
        <EnquiryModal
          isOpen={globalModalOpen}
          onClose={() => setGlobalModalOpen(false)}
          source="Global Action Bar / Floating Contact Widget"
        />
      )}
    </div>
  );
}
