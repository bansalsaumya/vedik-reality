import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const HERO_SLIDES = [
  {
    image: '/anandam/logo.png',
    title: 'Anandam Awaas & Anandam Estate by MGH',
    subTitle: '71-Acre Gated Residential Plot Township',
    location: 'Sector 19 & 24, Dharuhera',
    alt: 'Anandam Estate Sector 19 & 24 Dharuhera MGH Logo'
  },
  {
    image: '/anandam/housing.jpg',
    title: 'Residential Plots in Sector 19 & 24 Dharuhera',
    subTitle: 'Plot sizes from 72 Sq.Yds to 519 Sq.Yds',
    location: 'Sector 19 & 24, Dharuhera',
    alt: 'Anandam Awaas Housing & Row Houses Dharuhera'
  },
  {
    image: '/anandam/gate.jpg',
    title: 'Gated Society Entrance & Demarcated Roads',
    subTitle: 'Ready for Immediate Registry & Construction',
    location: 'Main Gate, Sector 19 Dharuhera',
    alt: 'Anandam Awaas Main Entrance Gate Sector 19 Dharuhera'
  },
  {
    image: '/anandam/temple.jpg',
    title: 'In-House Temple & Peaceful Living Environment',
    subTitle: 'Developed Society with 24x7 Security',
    location: 'Anandam Awaas Society Temple',
    alt: 'Anandam Awaas Society Temple Dharuhera'
  },
  {
    image: '/anandam/park.jpg',
    title: 'Kids Play Park & Lush Green Open Spaces',
    subTitle: 'Ideal Real Estate Investment Near Delhi NCR & Gurugram',
    location: 'Sector 19 & 24 Dharuhera',
    alt: 'Anandam Awaas Children Play Area Park'
  }
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
    <div className="relative min-h-[85vh] flex flex-col justify-between pt-28 pb-16 overflow-hidden bg-charcoal-950">
      
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
              alt={slide.alt || slide.title}
              className={`w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] ${
                isActive ? 'animate-kenburns' : ''
              }`}
            />
            {/* Dark Vignette Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 my-auto text-left w-full">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-gold-500/50 backdrop-blur-md mb-6 shadow-xl">
          <ShieldCheck className="w-4 h-4 text-gold-500" />
          <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase">
            {HERO_SLIDES[currentSlide].location}
          </span>
        </div>

        {/* Main Hero Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl drop-shadow-lg">
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-base sm:text-xl text-gold-300 font-medium max-w-2xl leading-relaxed drop-shadow">
          {HERO_SLIDES[currentSlide].subTitle}
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-start">
          <Link
            to="/properties"
            className="w-full sm:w-auto gold-button px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all"
          >
            <span>Explore Anandam Plots</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-semibold tracking-wider text-white bg-black/60 hover:bg-black/80 border border-gold-500/50 hover:border-gold-400 backdrop-blur-md flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-gold-500" />
            <span>Enquire Project Details</span>
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="mt-10 sm:mt-12 flex items-center gap-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-gold-400 shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          source="Hero Section - Anandam Project"
        />
      )}
    </div>
  );
}
