import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, TrendingUp, ShieldCheck, ArrowRight, PhoneCall, MessageCircle, MapPin } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import { FALLBACK_SERVICES } from '../data/fallbackData';
import SEO from '../components/SEO';

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const serviceIcons = {
    Home,
    Building,
    TrendingUp,
    ShieldCheck
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Real Estate Services in Dharuhera | Vedik Realty"
        description="Explore real estate services in Dharuhera with Vedik Realty. Get assistance with residential plots, residential properties, commercial properties and property enquiries."
        keywords="Real Estate Services in Dharuhera, Vedik Realty, Residential Property, Residential Plots, Commercial Property, Property Buying Assistance, Property Selling Assistance, Real Estate Investment Consultation"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Property Advisory & Services
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Real Estate Services in Dharuhera
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Vedik Realty provides real estate assistance in Dharuhera, Haryana, helping buyers explore residential plots, residential properties, commercial properties and suitable property opportunities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FALLBACK_SERVICES.map((service) => {
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
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-borderlight">
                  <Link
                    to={service.link || '/contact'}
                    className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Enquire Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Internal Links Hub (Relevant Projects & Quick Access) */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-borderlight bg-white shadow-sm space-y-6">
          <div className="border-b border-borderlight pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
              Quick Navigation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
              Explore Relevant Properties & Project Hubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Direct access to our dedicated property developments across Dharuhera, Haryana:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/properties"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Residential Plots
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Browse available plots on Properties page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/anandam-awaas-dharuhera"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Anandam Awaas
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Explore Sector 19 Project Page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/anandam-estate-dharuhera"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Anandam Estate
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Explore Sector 24 Project Page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/tulip-city-sector-3-dharuhera"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Tulip City
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Explore Sector 3 Project Page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/ekta-enclave-bhiwadi-alwar-highway"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Ekta Enclave
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Explore Bhiwadi–Alwar Highway Page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Contact
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Reach out to Vedik Realty on Contact Page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>

      </div>

      {/* Internal Link to Properties Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="p-6 rounded-2xl bg-cream border border-borderlight text-center space-y-2">
          <p className="text-sm font-semibold text-charcoal-800">
            Looking for property in Dharuhera?{' '}
            <Link
              to="/properties"
              className="font-bold text-gold-700 hover:text-charcoal-900 underline decoration-gold-500 decoration-2 underline-offset-4"
            >
              Explore Properties in Dharuhera
            </Link>{' '}
            with Vedik Realty.
          </p>
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
