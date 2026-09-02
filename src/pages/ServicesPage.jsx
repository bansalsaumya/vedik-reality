import React, { useState, useEffect } from 'react';
import { Home, Building, TrendingUp, ShieldCheck, Key, Globe, ArrowRight } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import { FALLBACK_SERVICES } from '../data/fallbackData';

export default function ServicesPage() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.services && data.services.length > 0) setServices(data.services);
      })
      .catch(err => console.error(err));
  }, []);

  const serviceIcons = {
    Home,
    Building,
    TrendingUp,
    ShieldCheck,
    Key,
    Globe
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Real Estate Advisory
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Bespoke Real Estate <span className="gold-gradient-text font-serif">Services</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium">
            From strategic property acquisition to legal title verification and NRI investment management, Vedik Reality provides complete luxury solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComp = serviceIcons[service.icon] || ShieldCheck;
            return (
              <div
                key={service.id}
                className="glass-card p-8 rounded-2xl border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cream border border-borderlight flex items-center justify-center text-gold-700 mb-6 shadow-sm">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6">
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedService(service.title);
                    setModalOpen(true);
                  }}
                  className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          propertyTitle={`Service Request - ${selectedService}`}
          source={`Services Page - ${selectedService}`}
        />
      )}
    </div>
  );
}
