import React, { useState, useEffect } from 'react';
import { Home, Building, TrendingUp, ShieldCheck, Key, Globe, ArrowRight } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';

import { FALLBACK_SERVICES } from '../data/fallbackData';

export default function ServicesPage() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(false);
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


  return (
    <div className="min-h-screen pt-28 pb-20 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
            Professional Real Estate Services
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            End-To-End Luxury <span className="gold-gradient-text">Property Advisory</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Customized solutions for buyers, sellers, corporate tenants, and NRI investors.
          </p>
        </div>

        {loading ? (
          <div className="h-96 bg-charcoal-900/60 rounded-2xl animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((serv) => (
              <div
                key={serv.id}
                className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 transition-transform">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-100 mb-3 group-hover:text-gold-400 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setSelectedService(serv.title);
                      setModalOpen(true);
                    }}
                    className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          propertyTitle={`Service Consultation: ${selectedService}`}
          source={`Services Page - ${selectedService}`}
        />
      )}
    </div>
  );
}
