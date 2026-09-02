import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import SearchFilterBar from './SearchFilterBar';
import EnquiryModal from './EnquiryModal';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    title: 'Luxury Residential Estates',
    location: 'Golf Course Road, Gurgaon',
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=85',
    title: 'Bespoke Private Villas & Sanctuaries',
    location: 'Golf Course Extension, Gurgaon',
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85',
    title: 'High-Rise Sky Residences',
    location: 'Dwarka Expressway Corridor',
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
    title: 'Grade-A Commercial Office Suites',
    location: 'Southern Peripheral Road (SPR)',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    title: 'Gated Luxury Townships',
    location: 'Delhi NCR Prime Growth Hubs',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  // Automatic slideshow transition every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-charcoal-950">
      
      {/* Background Images with Automatic Crossfade & Ken Burns Zoom */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover filter brightness-[0.65] contrast-[1.05] ${
                isActive ? 'animate-kenburns' : ''
              }`}
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/70" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 my-auto text-left w-full">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-900/90 border border-gold-500/40 backdrop-blur-md mb-6 shadow-xl">
          <ShieldCheck className="w-4 h-4 text-gold-500" />
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase">
            {HERO_SLIDES[currentSlide].location}
          </span>
        </div>

        {/* Main Hero Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-100 tracking-tight leading-[1.15] max-w-3xl">
          Find a Property That <br />
          <span className="text-gold-400 font-serif">Fits Your Future</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
          Discover thoughtfully selected residential and commercial properties with <strong className="text-gold-400 font-semibold">Vedik Reality</strong>. Verified luxury listings and personalized advisory.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-start">
          <Link
            to="/properties"
            className="w-full sm:w-auto gold-button px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-semibold tracking-wider text-slate-200 bg-charcoal-900/90 hover:bg-charcoal-800 border border-gold-500/40 hover:border-gold-400 backdrop-blur-md flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <PhoneCall className="w-4 h-4 text-gold-500" />
            <span>Talk to Us</span>
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="mt-8 flex items-center gap-2 justify-start">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>


      {/* Floating Property Search Filter Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <SearchFilterBar />
      </div>

      {/* Animated Scroll Indicator */}
      <div className="relative z-20 flex justify-center mt-6">
        <a
          href="#featured-properties"
          className="flex flex-col items-center text-xs text-slate-400 hover:text-gold-400 transition-colors group"
        >
          <span className="tracking-widest uppercase text-[10px] mb-1 font-medium group-hover:text-gold-400">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-gold-500" />
        </a>
      </div>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          source="Hero Section - Talk To Us CTA"
        />
      )}
    </div>
  );
}
