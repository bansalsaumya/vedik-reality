import React, { useState } from 'react';
import { X, Play, RotateCw, Sparkles, MapPin, Compass, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';

export default function VirtualTourModal({ isOpen, onClose, property }) {
  const [activeTab, setActiveTab] = useState('3d');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const defaultProperty = {
    title: property?.title || "Anandam Awaas Luxury Sector 19 Plot Layout",
    location: property?.location || "Sector 19, Dharuhera, Haryana",
    price: property?.price || "₹35 Lacs Onwards",
    type: property?.type || "Residential Plots",
    embedUrl: property?.virtualTourUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14068.7495045437!2d76.7865!3d28.2092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d4538df0b5b15%3A0xc07dbdd17b707447!2sDharuhera%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-charcoal-900 rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-charcoal-800 bg-charcoal-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <RotateCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-400/20">
                  Virtual 360° Site View
                </span>
                <span className="text-xs text-cream-300/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" /> {defaultProperty.location}
                </span>
              </div>
              <h3 className="text-lg font-bold font-serif text-cream-100">{defaultProperty.title}</h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2.5 text-cream-400 hover:text-white bg-charcoal-800 hover:bg-charcoal-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Viewer Body */}
        <div className="relative flex-1 min-h-[350px] sm:min-h-[450px] bg-charcoal-950 flex flex-col">
          {activeTab === '3d' && (
            <div className="relative w-full h-full min-h-[350px] sm:min-h-[450px] overflow-hidden">
              <iframe
                title="Virtual 360 Site Tour"
                src={defaultProperty.embedUrl}
                className="w-full h-full border-0 filter brightness-90 contrast-105"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 bg-charcoal-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-500/30 text-xs text-cream-100 flex items-center gap-2 shadow-lg">
                <Compass className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Drag to explore Dharuhera Sector 19 Layout & Surrounding Roads</span>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="w-full h-full min-h-[350px] sm:min-h-[450px] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-cream-100 text-center">
              <div className="w-full max-w-xl bg-charcoal-800/60 p-6 rounded-2xl border border-amber-500/20">
                <h4 className="text-lg font-bold text-amber-300 font-serif mb-3">Master Plot Layout Details</h4>
                <div className="grid grid-cols-2 gap-4 text-left text-xs mb-4">
                  <div className="p-3 bg-charcoal-900/80 rounded-xl border border-charcoal-700">
                    <span className="text-charcoal-400 block text-[10px] uppercase">Plot Sizes Available</span>
                    <strong className="text-cream-100 text-sm">100 sq.yd – 300 sq.yd</strong>
                  </div>
                  <div className="p-3 bg-charcoal-900/80 rounded-xl border border-charcoal-700">
                    <span className="text-charcoal-400 block text-[10px] uppercase">Road Width</span>
                    <strong className="text-cream-100 text-sm">30 ft & 40 ft Wide Roads</strong>
                  </div>
                  <div className="p-3 bg-charcoal-900/80 rounded-xl border border-charcoal-700">
                    <span className="text-charcoal-400 block text-[10px] uppercase">Status</span>
                    <strong className="text-emerald-400 text-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> HRERA Approved / Demarcated
                    </strong>
                  </div>
                  <div className="p-3 bg-charcoal-900/80 rounded-xl border border-charcoal-700">
                    <span className="text-charcoal-400 block text-[10px] uppercase">Possession</span>
                    <strong className="text-amber-400 text-sm">Immediate Registry & Mutation</strong>
                  </div>
                </div>
                <p className="text-xs text-cream-300/70">Contact Manish or Deepak Lamba for current plot number availability.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-charcoal-900 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tab Selector */}
          <div className="flex items-center bg-charcoal-800 p-1 rounded-xl border border-charcoal-700 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('3d')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === '3d'
                  ? 'bg-amber-500 text-charcoal-950 shadow-md'
                  : 'text-cream-300 hover:text-white'
              }`}
            >
              360° Location Map
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'layout'
                  ? 'bg-amber-500 text-charcoal-950 shadow-md'
                  : 'text-cream-300 hover:text-white'
              }`}
            >
              Sector Layout Info
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/919053848222?text=Hello%20Vedik%20Reality,%20I%20explored%20the%20Virtual%20Tour%20and%20want%20to%20book%20an%20actual%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> Book On-Site Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
