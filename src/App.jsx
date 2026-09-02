import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import EnquiryModal from './components/EnquiryModal';

import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import LocationsPage from './pages/LocationsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const [globalModalOpen, setGlobalModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-charcoal-950 font-sans text-slate-100 selection:bg-gold-500 selection:text-charcoal-950">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
      </main>

      <Footer />

      {/* Mobile Sticky CTA Bar */}
      <StickyMobileBar onEnquireClick={() => setGlobalModalOpen(true)} />

      {/* Global Quick Enquiry Modal */}
      {globalModalOpen && (
        <EnquiryModal
          isOpen={globalModalOpen}
          onClose={() => setGlobalModalOpen(false)}
          source="Mobile Sticky Action Bar"
        />
      )}
    </div>
  );
}
