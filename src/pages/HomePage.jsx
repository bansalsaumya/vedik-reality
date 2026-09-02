import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Award, MapPin, Building, Home, TrendingUp, CheckCircle2,
  Users, Key, PhoneCall, ArrowRight, MessageSquare, Star, Sparkles
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import PropertyCard from '../components/PropertyCard';
import EnquiryModal from '../components/EnquiryModal';
import { useSettings } from '../context/SettingsContext';

import {
  FALLBACK_PROPERTIES, FALLBACK_PROJECTS, FALLBACK_LOCATIONS,
  FALLBACK_SERVICES, FALLBACK_TESTIMONIALS
} from '../data/fallbackData';

export default function HomePage() {
  const { settings } = useSettings();
  const [featuredProperties, setFeaturedProperties] = useState(FALLBACK_PROPERTIES.slice(0, 3));
  const [latestProperties, setLatestProperties] = useState(FALLBACK_PROPERTIES);
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [locations, setLocations] = useState(FALLBACK_LOCATIONS);
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [propsRes, projRes, locRes, servRes, testRes] = await Promise.all([
          fetch('/api/properties?limit=10'),
          fetch('/api/projects?is_featured=1'),
          fetch('/api/locations'),
          fetch('/api/services'),
          fetch('/api/testimonials')
        ]);

        const propsData = await propsRes.json();
        const projData = await projRes.json();
        const locData = await locRes.json();
        const servData = await servRes.json();
        const testData = await testRes.json();

        if (propsData.properties && propsData.properties.length > 0) {
          const featured = propsData.properties.filter(p => p.is_featured === 1);
          setFeaturedProperties(featured.length > 0 ? featured : propsData.properties.slice(0, 3));
          setLatestProperties(propsData.properties);
        }
        if (projData.projects && projData.projects.length > 0) setProjects(projData.projects);
        if (locData.locations && locData.locations.length > 0) setLocations(locData.locations);
        if (servData.services && servData.services.length > 0) setServices(servData.services);
        if (testData.testimonials && testData.testimonials.length > 0) setTestimonials(testData.testimonials);
      } catch (err) {
        console.error('API load error, using fallbacks:', err);
      }
    };

    loadHomeData();
  }, []);


  const whyChooseUsPillars = [
    {
      title: 'Professional Advisory',
      desc: 'Expert real estate consultants providing tailored investment guidance.',
      icon: ShieldCheck
    },
    {
      title: 'Verified Listings',
      desc: '100% RERA verified properties with complete title due diligence.',
      icon: CheckCircle2
    },
    {
      title: 'Prime Location Expertise',
      desc: 'Deep presence across Gurgaon, Golf Course Road, and Delhi NCR corridors.',
      icon: MapPin
    },
    {
      title: 'Diverse Portfolio',
      desc: 'Curated collection of luxury apartments, bespoke villas, and commercial suites.',
      icon: Building
    },
    {
      title: 'Transparent Transactions',
      desc: 'Direct developer partnerships ensuring genuine pricing with zero hidden costs.',
      icon: Key
    },
    {
      title: 'Customer-Centric Care',
      desc: 'End-to-end support from site visits to legal documentation and handover.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 text-slate-100">
      
      {/* 1. Full-Screen Hero Section with Auto Image Slider & Floating Search */}
      <HeroSlider />

      {/* 2. Featured Properties Section */}
      <section id="featured-properties" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-charcoal-900 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
              Featured <span className="gold-gradient-text">Luxury Properties</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Handpicked premium residential residences and high-yield commercial assets.
            </p>
          </div>
          <Link
            to="/properties"
            className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1 group"
          >
            <span>View All Listings ({latestProperties.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-charcoal-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Featured Flagship Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 bg-charcoal-900/80 border-y border-gold-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Mega Developments
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
                Featured <span className="gold-gradient-text">Real Estate Projects</span>
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                Pre-certified integrated townships and luxury developments by India's top builders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => {
                const images = typeof proj.images === 'string' ? JSON.parse(proj.images) : proj.images || [];
                const img = images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
                return (
                  <div
                    key={proj.id}
                    className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-gold-500/50 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 shadow-2xl"
                  >
                    <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                      <img
                        src={img}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-gold-500 text-charcoal-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {proj.status}
                      </div>
                    </div>
                    <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider block mb-1">
                          {proj.type}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-500" />
                          <span>{proj.location}</span>
                        </p>
                        <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase block">Price Range</span>
                          <span className="font-serif text-base font-bold text-gold-400">{proj.price_range}</span>
                        </div>
                        <button
                          onClick={() => setEnquiryModalOpen(true)}
                          className="gold-button px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                        >
                          Enquire Project
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Why Choose Vedik Reality */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
            The Vedik Advantage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
            Why Choose <span className="gold-gradient-text">Vedik Reality</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Built on integrity, deep market analytics, and uncompromising service standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-gold-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:border-gold-400 transition-all mb-4 shadow-lg">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-100 mb-2 group-hover:text-gold-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Property Categories */}
      <section className="py-20 bg-charcoal-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
              Browse Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
              Explore By <span className="gold-gradient-text">Asset Type</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { type: 'Apartment', title: 'Luxury Apartments', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
              { type: 'Villa', title: 'Private Villas', img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
              { type: 'Commercial', title: 'Grade-A Commercial', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
              { type: 'Plot', title: 'Land & Villa Plots', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={`/properties?type=${cat.type}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-gold-500/50 shadow-xl transition-all"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold block mb-1">
                    Explore
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 group-hover:text-gold-400 transition-colors">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Popular Locations */}
      {locations.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Prime Investment Hubs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
                Explore Properties by <span className="gold-gradient-text">Location</span>
              </h2>
            </div>
            <Link
              to="/locations"
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1"
            >
              <span>View All Corridors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                to={`/properties?location=${encodeURIComponent(loc.name)}`}
                className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-charcoal-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/30 text-xs text-gold-400 font-semibold">
                    {loc.property_count} Listings
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-slate-100 group-hover:text-gold-400 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {loc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 7. Real Estate Services Overview */}
      {services.length > 0 && (
        <section className="py-20 bg-charcoal-900/80 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Tailored Advisory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
                Our Real Estate <span className="gold-gradient-text">Services</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                      <Building className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-100 mb-2">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setEnquiryModalOpen(true)}
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Consult Specialist</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Verified Client Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
              Client Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">
              Trusted By <span className="gold-gradient-text">Discerning Buyers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.content}"
                </p>
                <div className="pt-3 border-t border-slate-800">
                  <h4 className="font-serif text-sm font-bold text-slate-100">{t.client_name}</h4>
                  <p className="text-[11px] text-gold-400">{t.location} • {t.property_purchased}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Lead Generation Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 border-t border-gold-500/30">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400">
            <PhoneCall className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 leading-tight">
            Ready to Find Your <span className="gold-gradient-text">Dream Estate?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Schedule a private consultation or request exclusive offline luxury floor plans directly from our advisory team.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="gold-button px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl"
            >
              Request Advisory Call
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hi%20Vedik%20Reality,%20I%20want%20to%20schedule%20a%20consultation.`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Instant Inquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Shared Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          source="Homepage - General Banner CTA"
        />
      )}
    </div>
  );
}
