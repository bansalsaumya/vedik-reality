import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, BedDouble, Maximize2, ShieldCheck, PhoneCall, MessageCircle,
  Building, CheckCircle2, Share2, ArrowLeft, Eye, Award
} from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import { useSettings } from '../context/SettingsContext';

import { FALLBACK_PROPERTIES } from '../data/fallbackData';

export default function PropertyDetailPage() {
  const { slugOrId } = useParams();
  const { settings } = useSettings();

  const [property, setProperty] = useState(() => {
    return FALLBACK_PROPERTIES.find(p => p.slug === slugOrId || String(p.id) === String(slugOrId)) || FALLBACK_PROPERTIES[0];
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Inline Enquiry Form state for sticky sidebar
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${slugOrId}`);
        const data = await res.json();
        if (res.ok && data && data.title) {
          setProperty(data);
        }
      } catch (err) {
        console.error('Error fetching property details, using fallback:', err);
      }
    };

    fetchProperty();
  }, [slugOrId]);


  const handleSidebarLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          property_title: property.title,
          property_id: property.id,
          message: leadForm.message,
          source: `Property Detail Sidebar - ${property.title}`
        })
      });
      if (res.ok) {
        setLeadSuccess(true);
      }
    } catch (err) {
      console.error('Lead error:', err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-96 rounded-2xl bg-charcoal-900 mb-8" />
        <div className="h-40 rounded-2xl bg-charcoal-900" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Property Not Found</h2>
        <Link to="/properties" className="gold-button px-6 py-2 rounded-xl text-xs">
          Return to Properties
        </Link>
      </div>
    );
  }

  const images = Array.isArray(property.images) ? property.images : [];
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const mainImage = images[selectedImage] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80';

  return (
    <div className="min-h-screen pt-28 pb-24 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Listing</span>
        </Link>

        {/* Property Main Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950">
                {property.status}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-charcoal-900 border border-slate-700 text-slate-300">
                {property.type}
              </span>
              {property.rera_number && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> RERA Registered
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100">
              {property.title}
            </h1>
            <p className="mt-2 text-sm text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{property.address || property.location}</span>
            </p>
          </div>

          {/* Price & Views */}
          <div className="text-left lg:text-right">
            <span className="text-xs text-slate-400 block uppercase tracking-wider">Offered At</span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-400 block">
              {property.price}
            </span>
            <span className="text-[11px] text-slate-500 flex items-center lg:justify-end gap-1 mt-1">
              <Eye className="w-3.5 h-3.5" /> {property.views || 1} Views
            </span>
          </div>
        </div>

        {/* Image Gallery Lightbox */}
        <div className="space-y-4 mb-12">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-charcoal-900">
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnail Bar */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === selectedImage ? 'border-gold-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Property Overview */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Specs Summary Grid */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Configuration</span>
                <span className="font-serif text-lg font-bold text-slate-100">{property.bhk || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Super Area</span>
                <span className="font-serif text-lg font-bold text-slate-100">{property.area}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Developer</span>
                <span className="font-serif text-sm font-bold text-gold-400">{property.builder_name || 'Vedik Partner'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <span className="font-serif text-sm font-bold text-emerald-400">{property.status}</span>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-100 border-l-2 border-gold-500 pl-3">
                Property Overview & Architecture
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            {amenities.length > 0 && (
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="font-serif text-xl font-bold text-slate-100 border-l-2 border-gold-500 pl-3">
                  World-Class Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-charcoal-900/80 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RERA Verification Details */}
            {property.rera_number && (
              <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-100">RERA Registration Status</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    This project is registered under the Real Estate Regulatory Authority.
                  </p>
                  <p className="text-xs font-mono font-bold text-emerald-400 mt-2">
                    RERA ID: {property.rera_number}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar Lead Capture Form */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold-500/40 sticky top-28 space-y-6 shadow-2xl">
              
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block mb-1">
                  Direct Developer Access
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-100">
                  Enquire About Property
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Request floor plans, price breakup, or schedule a private site visit.
                </p>
              </div>

              {leadSuccess ? (
                <div className="text-center py-6 space-y-3 bg-emerald-950/50 rounded-2xl p-4 border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-base font-bold text-slate-100">Request Sent</h4>
                  <p className="text-xs text-slate-300">
                    Our luxury estate advisor will contact you within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSidebarLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">Notes / Date Preferred</label>
                    <textarea
                      rows="2"
                      placeholder="Interested in site visit on..."
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:border-gold-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xl"
                  >
                    {leadSubmitting ? 'Submitting...' : 'Instant Callback Request'}
                  </button>
                </form>
              )}

              {/* Direct Instant Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-gold-500" />
                  <span>Call {settings.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hi%20Vedik%20Reality,%20I%20am%20inquiring%20about%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
