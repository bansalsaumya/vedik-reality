import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, BedDouble, Maximize2, ShieldCheck, PhoneCall, MessageCircle,
  Share2, Heart, CheckCircle2, ChevronRight, ArrowLeft, Loader2
} from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import { useSettings } from '../context/SettingsContext';
import { FALLBACK_PROPERTIES } from '../data/fallbackData';
import SEO from '../components/SEO';

export default function PropertyDetailPage() {
  const { slugOrId } = useParams();
  const { settings } = useSettings();

  const [property, setProperty] = useState(() => {
    return FALLBACK_PROPERTIES.find(p => p.slug === slugOrId || p.alternate_slug === slugOrId || String(p.id) === String(slugOrId)) || FALLBACK_PROPERTIES[0];
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Inline Enquiry Form state for sticky sidebar
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  useEffect(() => {
    const localMatch = FALLBACK_PROPERTIES.find(p => p.slug === slugOrId || p.alternate_slug === slugOrId || String(p.id) === String(slugOrId));
    if (localMatch) {
      setProperty(localMatch);
    }

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
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          property_id: property.id,
          property_title: property.title,
          source: 'Property Detail Sidebar Form'
        })
      });
      setLeadSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const imagesList = Array.isArray(property.images)
    ? property.images
    : (typeof property.images === 'string' ? JSON.parse(property.images || '[]') : []);

  const amenitiesList = Array.isArray(property.amenities)
    ? property.amenities
    : (typeof property.amenities === 'string' ? JSON.parse(property.amenities || '[]') : []);

  const propImages = imagesList.length > 0 ? imagesList : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80'];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi Vedik Realty, I am interested in ${property.title} in Dharuhera. Please share complete details.`);
    window.open(`https://wa.me/${settings.whatsapp || '919053848222'}?text=${text}`, '_blank');
  };

  // SEO Fallbacks matching prompts
  const pageSeoTitle = property.meta_title || `${property.title} | Residential Plots | Vedik Realty`;
  const pageSeoDesc = property.meta_description || `Explore ${property.title} in Dharuhera, Haryana with Vedik Realty. View residential plot options and project details.`;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title={pageSeoTitle}
        description={pageSeoDesc}
        keywords={`${property.title}, ${property.title} Sector 19, Residential Plots in Dharuhera, Residential Plots in Sector 19 Dharuhera, MGH ${property.title}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-gold-700 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Listings</span>
        </Link>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-borderlight">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950">
                {property.type}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cream text-charcoal-800 border border-borderlight">
                {property.status || 'Available'}
              </span>
              {property.rera_number && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" /> RERA Approved
                </span>
              )}
            </div>

            {/* H1 */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800">
              {property.title}
            </h1>
            
            {/* H1 ke neeche intro */}
            {property.subtitle ? (
              <p className="mt-2 text-sm text-slate-700 font-medium max-w-3xl leading-relaxed">
                {property.subtitle}
              </p>
            ) : (
              <p className="mt-1 text-sm text-slate-600 font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{property.location}</span>
              </p>
            )}
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs text-slate-500 font-semibold uppercase block">Offered At</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-700 block">
              {property.price}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden border border-borderlight shadow-md bg-cream">
            <img
              src={propImages[selectedImage] || propImages[0]}
              alt={property.title}
              className="w-full h-full object-contain bg-charcoal-950/5"
            />
          </div>

          {propImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {propImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === idx ? 'border-gold-500 scale-105 shadow-md ring-2 ring-gold-400' : 'border-borderlight opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          
          {/* Left 2 Cols: Overview, Specs, Amenities */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Specs Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-borderlight shadow-sm">
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase block">Bedrooms</span>
                <span className="text-sm font-bold text-charcoal-800 flex items-center gap-1.5 mt-1">
                  <BedDouble className="w-4 h-4 text-gold-700" /> {property.bhk || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase block">Super Area</span>
                <span className="text-sm font-bold text-charcoal-800 flex items-center gap-1.5 mt-1">
                  <Maximize2 className="w-4 h-4 text-gold-700" /> {property.area}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase block">Property Type</span>
                <span className="text-sm font-bold text-charcoal-800 mt-1 block">{property.type}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase block">RERA Number</span>
                <span className="text-xs font-bold text-emerald-700 mt-1 block line-clamp-1">{property.rera_number || 'Verified'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-charcoal-800 border-b border-borderlight pb-3">
                Property Overview & Highlights
              </h3>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line space-y-3">
                {property.description}
              </div>
            </div>

            {/* Amenities Grid */}
            {amenitiesList.length > 0 && (
              <div className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-charcoal-800 border-b border-borderlight pb-3">
                  World-Class Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenitiesList.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-charcoal-800 bg-cream p-3 rounded-xl border border-borderlight">
                      <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Col: Sticky Lead Capture Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-28 glass-card p-6 rounded-3xl border border-borderlight bg-white shadow-lg space-y-6">
              
              <div className="border-b border-borderlight pb-4">
                <span className="text-xs text-gold-700 font-bold uppercase tracking-wider block mb-1">Direct Advisory</span>
                <h3 className="font-serif text-xl font-bold text-charcoal-800">Schedule Private Visit</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Get floor plans, price breakdown & brochure.</p>
              </div>

              {leadSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-emerald-800">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
                  <p className="text-xs font-bold">Request Submitted!</p>
                  <p className="text-[11px] font-medium">Our advisor will call you within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSidebarLeadSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-charcoal-800 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Ananya Roy"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-white border border-borderlight rounded-xl px-3.5 py-2 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-charcoal-800 uppercase mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 90538 48222"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-white border border-borderlight rounded-xl px-3.5 py-2 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md mt-2"
                  >
                    {leadSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PhoneCall className="w-4 h-4" />}
                    <span>Request Callback</span>
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-borderlight space-y-2">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-600 flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Connect</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Project CTA */}
        <div className="pt-12 border-t border-borderlight">
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-borderlight bg-cream text-center shadow-md">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
              {property.cta_heading || `Interested in ${property.title}?`}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-xl mx-auto font-medium">
              {property.cta_subheading || 'Get project details and enquire with Vedik Realty.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/919053848222?text=${encodeURIComponent(`Hi Vedik Realty, I am interested in ${property.title}. Please share project details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
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
        </div>

      </div>

      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          propertyTitle={property.title}
          propertyId={property.id}
          source={`Property Detail Page - ${property.title}`}
        />
      )}
    </div>
  );
}
