import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building, MapPin, Sparkles, ShieldCheck, ArrowRight, PhoneCall,
  TrendingUp, Award, Users, CheckCircle2, ChevronRight, Star
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import SearchFilterBar from '../components/SearchFilterBar';
import PropertyCard from '../components/PropertyCard';
import EnquiryModal from '../components/EnquiryModal';
import SEO from '../components/SEO';
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
      title: 'Real Estate Agent in Dharuhera',
      desc: 'Transparent valuation, legal title verification, and structured guidance near Anandam Awaas & Sector 19.',
      icon: ShieldCheck
    },
    {
      title: 'Prime Dharuhera Locations',
      desc: 'Verified residential plots, 2 BHK/3 BHK flats, and SCO commercial property near NH-48 Dharuhera.',
      icon: MapPin
    },
    {
      title: 'Hassle-Free Closing & Registry',
      desc: 'Complete documentation support, developer negotiation, and home loan assistance in Rewari District.',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-0 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Vedik Reality | Property Dealer & Real Estate Agent in Dharuhera"
        description="Vedik Reality is a real estate consultant in Dharuhera, Haryana, helping clients explore residential and commercial properties, flats, plots and property investment opportunities. Contact us for property enquiries and professional assistance."
        keywords="Real Estate Agent in Dharuhera, Property Dealer in Dharuhera, Properties for Sale in Dharuhera, Real Estate Company in Dharuhera, Property Consultant in Dharuhera, Buy Property in Dharuhera, Sell Property in Dharuhera, Best Property Dealer in Dharuhera, Real Estate Consultant Dharuhera, Sector 19 Dharuhera, Anandam Awaas Dharuhera, Plots for Sale in Dharuhera, Flats for Sale in Dharuhera"
      />
      
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. FLOATING SEARCH FILTER BAR */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 mb-20">
        <SearchFilterBar />
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="py-16 sm:py-24 bg-ivory relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Curated Collection
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 tracking-tight">
                Featured <span className="gold-gradient-text font-serif">Luxury Properties</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 max-w-xl font-medium">
                Handpicked premium residential residences and high-yield commercial assets.
              </p>
            </div>

            <Link
              to="/properties"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-charcoal-800 transition-colors"
            >
              <span>View All Listings ({latestProperties.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE VEDIK REALITY */}
      <section className="py-20 bg-cream border-y border-borderlight relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3 shadow-sm">
              <Award className="w-3.5 h-3.5" /> The Vedik Advantage
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 tracking-tight">
              Why Discerning Buyers <br />
              <span className="gold-gradient-text font-serif">Trust Vedik Reality</span>
            </h2>
            <p className="mt-4 text-sm text-slate-600 font-medium">
              We combine deep micro-market insight with ethical advisory to elevate your luxury real estate journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cream border border-borderlight flex items-center justify-center text-gold-700 mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-2 group-hover:text-gold-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. TOP DEVELOPER PROJECTS */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
                <Building className="w-3.5 h-3.5" /> Flagship Developments
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
                Exclusive <span className="gold-gradient-text font-serif">Developer Projects</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-charcoal-800 transition-colors flex items-center gap-1"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="group glass-card rounded-2xl overflow-hidden border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-md">
                    {proj.developer}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs text-gold-400 font-semibold block">{proj.price_starting}</span>
                    <h3 className="font-serif text-lg font-bold line-clamp-1">{proj.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span>{proj.location}</span>
                  </div>

                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="text-xs font-bold text-gold-700 hover:text-charcoal-800 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Brochure</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PRIME LOCATION CORRIDORS */}
      <section className="py-20 bg-cream border-t border-borderlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3 shadow-sm">
              <MapPin className="w-3.5 h-3.5" /> High Growth Hubs
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
              Explore Prime <span className="gold-gradient-text font-serif">Corridors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                to={`/properties?location=${encodeURIComponent(loc.name)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-borderlight shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] text-gold-400 font-bold uppercase tracking-wider block mb-1">
                    {loc.properties_count || 12}+ Properties
                  </span>
                  <h3 className="font-serif text-xl font-bold group-hover:text-gold-400 transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-normal">
                    {loc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
              <Star className="w-3.5 h-3.5" /> Client Experience
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
              Trusted by <span className="gold-gradient-text font-serif">HNIs & NRIs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-gold-500 mb-4">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                    "{test.content}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-borderlight flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-charcoal-800">{test.name}</h4>
                    <p className="text-[11px] text-gold-700 font-semibold">{test.role}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{test.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-20 bg-cream border-t border-borderlight relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Ready to Find Your <span className="gold-gradient-text font-serif">Dream Estate?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
            Connect with senior real estate advisors for confidential guidance, private listings, and personalized site visits.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="w-full sm:w-auto gold-button px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Private Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Global Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          source="Homepage Hero & CTA"
        />
      )}

    </div>
  );
}
