import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    title: 'Real Estate Agent & Property Dealer in Dharuhera',
    location: 'Sector 19, Dharuhera',
    alt: 'Real Estate Agent in Dharuhera Haryana Sector 19'
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=85',
    title: 'Plots & Land for Sale in Dharuhera',
    location: 'Anandam Awaas, Dharuhera',
    alt: 'Plots for Sale in Dharuhera near Anandam Awaas'
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85',
    title: 'Ready to Move 2 BHK & 3 BHK Flats',
    location: 'Dharuhera, Haryana',
    alt: 'Flats for Sale in Dharuhera 2 BHK 3 BHK'
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
    title: 'Commercial Property & SCO Shops',
    location: 'NH-48 Corridor Dharuhera',
    alt: 'Commercial Property in Dharuhera Haryana'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    title: 'Independent Houses & Villas',
    location: 'Sector 19 & Rewari District',
    alt: 'House for Sale in Dharuhera'
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-3xl drop-shadow-lg">
          Find the Right Property in <br />
          <span className="gold-gradient-text font-serif">Dharuhera, Haryana</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-lg text-slate-200 font-normal max-w-xl leading-relaxed drop-shadow">
          Your trusted <strong className="text-gold-400 font-semibold">Property Dealer & Real Estate Agent in Dharuhera</strong>. Discover plots, flats, commercial property and verified investment opportunities near Sector 19 & NH-48.
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-semibold tracking-wider text-white bg-black/60 hover:bg-black/80 border border-gold-500/50 hover:border-gold-400 backdrop-blur-md flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <PhoneCall className="w-4 h-4 text-gold-500" />
            <span>Talk to Us</span>
          </button>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-gold-400' : 'w-2 bg-white/40 hover:bg-white/70'
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
          source="Hero Section - Talk To Us CTA"
        />
      )}
    </div>
  );
}
