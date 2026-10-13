import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building, MapPin, Sparkles, ShieldCheck, ArrowRight, PhoneCall,
  TrendingUp, Award, ChevronRight, Star, ChevronDown, HelpCircle,
  MessageSquare
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
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [propsRes, projRes, locRes, testRes] = await Promise.all([
          fetch('/api/properties?limit=10'),
          fetch('/api/projects?is_featured=1'),
          fetch('/api/locations'),
          fetch('/api/testimonials')
        ]);

        const propsData = await propsRes.json();
        const projData = await projRes.json();
        const locData = await locRes.json();
        const testData = await testRes.json();

        if (propsData.properties && propsData.properties.length > 0) {
          const featured = propsData.properties.filter(p => p.is_featured === 1);
          setFeaturedProperties(featured.length > 0 ? featured : propsData.properties.slice(0, 3));
          setLatestProperties(propsData.properties);
        }
        if (projData.projects && projData.projects.length > 0) setProjects(projData.projects);
        if (locData.locations && locData.locations.length > 0) setLocations(locData.locations);
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

  const faqs = [
    {
      q: "Where can I buy the best residential plots in Dharuhera, Haryana?",
      a: "The most sought-after residential plots in Dharuhera are in Sector 19 & Sector 24 (Anandam Awaas & Anandam Estate 71-acre gated township) and Sector 3 (Tulip City). Both developments feature demarcated plots with wide interlocking paved roads, underground utilities, green parks, and immediate registry assistance provided by Vedik Realty."
    },
    {
      q: "What are the current plot prices & rates per Sq. Yard in Dharuhera?",
      a: "Plot rates in Anandam Awaas and Anandam Estate range between ₹65,000 to ₹70,000 per Sq. Yard (Gaj) for sizes from 72 to 519 Sq. Yards. In Tulip City Sector 3, plots range from 88 to 141 Sq. Yards with attractive investor pricing. Property rates in Dharuhera are approximately 1/4th of Gurugram, ensuring superior capital growth."
    },
    {
      q: "Why is Dharuhera a high ROI real estate investment corridor near Gurugram & Delhi NCR?",
      a: "Dharuhera is strategically situated on NH-48 (Delhi-Jaipur Highway), just 25 minutes from Rajiv Chowk Gurgaon. Major growth drivers include the Delhi-Mumbai Expressway, proximity to IMT Manesar and Bhiwadi industrial hubs, and the proposed Delhi-Alwar RRTS Rapid Metro corridor."
    },
    {
      q: "Who is the top property dealer and real estate consultant in Dharuhera?",
      a: "Vedik Realty is Dharuhera's premier real estate consultancy, located at First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana. Led by Deepak Lamba and Manish, we provide verified residential plots, commercial SCO spaces, flats, and 100% legal title assistance."
    },
    {
      q: "Are residential plots in Anandam Awaas and Tulip City RERA approved?",
      a: "Yes, flagship townships such as Anandam Awaas (Sector 19 & 24) and Tulip City (Sector 3) are HRERA approved and DTCP licensed with clear title deeds, bank loan assistance from leading PSU & private banks, and immediate registry readiness."
    }
  ];

  return (
    <div className="space-y-0 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Real Estate in Dharuhera | Property Dealer & Consultant | Vedik Realty"
        description="Explore property in Dharuhera with Vedik Realty. Find residential plots, residential and commercial properties and real estate opportunities in Dharuhera, Haryana."
        keywords="Property in Dharuhera, Real Estate in Dharuhera, Property Dealer in Dharuhera, Real Estate Agent in Dharuhera, Residential Plots in Dharuhera, Commercial Property in Dharuhera, Property for Sale in Dharuhera, Plots for Sale in Dharuhera"
      />
      
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. FLOATING SEARCH FILTER BAR */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 mb-20">
        <SearchFilterBar />
      </section>

      {/* OUT-OF-STATE & DELHI NCR INVESTOR HUB BANNER */}
      <section className="py-12 bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
              <span>Out-of-State & Delhi NCR Investor Zone</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Looking for High ROI Plots in Dharuhera Near Gurugram & Delhi NCR?
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed font-light">
              Get verified residential plots & SCO commercial land at 1/4th of Gurugram property rates. High capital appreciation & complete legal title assistance.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/invest-in-dharuhera"
              className="px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold rounded-xl shadow-lg transition duration-300 flex items-center space-x-2 text-xs uppercase tracking-wider"
            >
              <span>Explore Investor Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PROPERTIES IN DHARUHERA SECTION */}
      <section className="py-16 sm:py-24 bg-ivory relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Curated Collection
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 tracking-tight">
                Properties in <span className="gold-gradient-text font-serif">Dharuhera</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 max-w-2xl font-medium leading-relaxed">
                Explore residential plots, residential properties and commercial property opportunities in Dharuhera, Haryana. Vedik Realty helps buyers explore suitable properties and connect for genuine property enquiries.
              </p>
            </div>

            <Link
              to="/properties"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-charcoal-800 transition-colors"
            >
              <span>View Properties &rarr;</span>
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
              Why Discerning Buyers Choose <br />
              <span className="gold-gradient-text font-serif">Vedik Reality</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 rounded-3xl border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-xl space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cream border border-borderlight flex items-center justify-center text-gold-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-800">
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
                    src={proj.image || (proj.images && (typeof proj.images === 'string' ? JSON.parse(proj.images)[0] : proj.images[0])) || '/anandam/anandam-estate-logo.jpg'}
                    alt={proj.title || proj.name}
                    className={`w-full h-full ${proj.image?.includes('logo') || (proj.images && proj.images.includes('logo')) ? 'object-contain bg-white p-2' : 'object-cover group-hover:scale-105'} transition-transform duration-500`}
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
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{proj.location}</span>
                  </div>

                  <button
                    onClick={() => setEnquiryModalOpen(true)}
                    className="text-xs font-bold text-gold-700 hover:text-charcoal-800 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Enquire</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PRIME LOCATION CORRIDORS & PROJECTS */}
      <section className="py-20 bg-cream border-t border-borderlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3 shadow-sm">
              <MapPin className="w-3.5 h-3.5" /> Dharuhera, Haryana
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
              Explore Prime Properties in <span className="gold-gradient-text font-serif">Dharuhera, Haryana</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium">
              Verified residential plots, luxury villas, and commercial real estate across Dharuhera's top developments.
            </p>
            {/* Direct Project Links */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/properties/anandam-awaas-dharuhera"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-charcoal-800 border border-borderlight hover:border-gold-500 hover:text-gold-700 transition shadow-xs"
              >
                Anandam Awaas &rarr;
              </Link>
              <Link
                to="/properties/anandam-estate-dharuhera"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-charcoal-800 border border-borderlight hover:border-gold-500 hover:text-gold-700 transition shadow-xs"
              >
                Anandam Estate &rarr;
              </Link>
              <Link
                to="/properties/tulip-city-sector-3-dharuhera"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-charcoal-800 border border-borderlight hover:border-gold-500 hover:text-gold-700 transition shadow-xs"
              >
                Tulip City &rarr;
              </Link>
              <Link
                to="/properties"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-gold-500/10 text-gold-800 border border-gold-500/30 hover:bg-gold-500 hover:text-white transition shadow-xs"
              >
                View All Properties &rarr;
              </Link>
            </div>
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
                  alt={`${loc.name} - Dharuhera, Haryana Real Estate`}
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

      {/* 8. DHARUHERA REAL ESTATE GUIDE & FAQ (SEO RANKING HUB) */}
      <section className="py-20 bg-white border-t border-borderlight relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5" /> Buyer & Investor FAQ
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
              Dharuhera Property & Plot <span className="gold-gradient-text font-serif">Investment Guide</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium">
              Everything you need to know about buying freehold residential plots, commercial properties, and townships in Dharuhera, Haryana.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-borderlight bg-ivory/60 overflow-hidden transition-all duration-300 shadow-sm hover:border-gold-500/60"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-charcoal-800 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-cream border border-borderlight text-gold-700 text-xs flex items-center justify-center shrink-0 font-sans font-bold">
                        {idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-700 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-borderlight/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Top Search Corridors & Quick Links */}
          <div className="mt-14 pt-8 border-t border-borderlight text-center">
            <h3 className="font-serif text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Explore Popular Search Corridors in Dharuhera (Haryana)
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'Plots in Sector 19 Dharuhera', link: '/properties?location=Sector%2019%20%26%2024%20Dharuhera' },
                { label: 'Anandam Awaas Plots (72-177 Sq.Yd)', link: '/properties/anandam-awaas-anandam-estate-dharuhera' },
                { label: 'Tulip City Plots Sector 3 (88-141 Sq.Yd)', link: '/properties/tulip-city-sector-3-dharuhera' },
                { label: 'Anandam Estate Sector 24 Luxury Plots', link: '/projects' },
                { label: 'NH-48 Dharuhera Commercial SCO', link: '/properties?type=Commercial' },
                { label: 'Delhi NCR Investor Guide', link: '/invest-in-dharuhera' },
                { label: 'Property Dealer in Dharuhera', link: '/contact' }
              ].map((corridor, i) => (
                <Link
                  key={i}
                  to={corridor.link}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-cream border border-borderlight text-charcoal-800 hover:border-gold-500 hover:text-gold-700 transition-colors shadow-2xs"
                >
                  {corridor.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="py-20 bg-cream border-t border-borderlight relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Looking for a Property in <span className="gold-gradient-text font-serif">Dharuhera?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
            Talk to Vedik Realty for genuine property enquiries.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919053848222?text=Hi%20Vedik%20Realty,%20I%20am%20looking%20for%20property%20in%20Dharuhera.%20Please%20guide%20me."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+919053848222"
              className="gold-button px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Now</span>
            </a>
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
