import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Maximize2, ShieldCheck, PhoneCall, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import EnquiryModal from './EnquiryModal';
import { useSettings } from '../context/SettingsContext';

export default function PropertyCard({ property }) {
  const { settings } = useSettings();
  const [modalOpen, setModalOpen] = useState(false);

  const images = typeof property.images === 'string' ? JSON.parse(property.images) : property.images || [];
  const mainImage = images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Hi Vedik Reality, I am interested in inquiring about "${property.title}" (${property.price}) located at ${property.location}. Please share complete details.`);
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        whileHover={{ y: -8, scale: 1.01 }}
        className="group glass-card rounded-2xl overflow-hidden border border-borderlight hover:border-gold-500/80 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-[0_15px_35px_rgba(197,155,39,0.18)] bg-white relative"
      >
        
        {/* Image Container with Zoom & Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          <img
            src={mainImage}
            alt={`${property.title} - ${property.type || 'Property'} for sale in Dharuhera Haryana`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.is_featured === 1 && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gold-500 text-charcoal-950 shadow-md">
                FEATURED
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-charcoal-800 text-white border border-slate-700 backdrop-blur-md">
              {property.status || 'Available'}
            </span>
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
            <div className="bg-charcoal-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gold-500/40">
              <span className="text-[10px] text-slate-300 font-medium block leading-none mb-0.5 uppercase tracking-wider">Offered At</span>
              <span className="text-base sm:text-lg font-serif font-bold text-gold-400">
                {property.price}
              </span>
            </div>

            {property.rera_number && (
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-black/80 px-2 py-1 rounded-lg border border-emerald-500/40 backdrop-blur-md font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>RERA Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category & Type */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
              <span className="text-gold-700 uppercase tracking-wider text-[11px] font-bold">
                {property.type}
              </span>
              <span className="text-slate-500 font-semibold">{property.category || 'For Sale'}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg font-bold text-charcoal-800 group-hover:text-gold-600 transition-colors line-clamp-1">
              <Link to={`/properties/${property.slug || property.id}`}>
                {property.title}
              </Link>
            </h3>

            {/* Location */}
            <p className="mt-2 text-xs text-slate-600 flex items-center gap-1 line-clamp-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span>{property.location}</span>
            </p>

            {/* Specs Grid */}
            <div className="mt-4 pt-3 border-t border-borderlight grid grid-cols-2 gap-2 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-gold-700" />
                <span>{property.bhk || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Maximize2 className="w-3.5 h-3.5 text-gold-700" />
                <span>{property.area}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 pt-4 border-t border-borderlight flex items-center gap-2">
            <Link
              to={`/properties/${property.slug || property.id}`}
              className="flex-1 text-center py-2 rounded-xl bg-cream hover:bg-gold-500 hover:text-white text-charcoal-800 text-xs font-bold border border-borderlight transition-all duration-300 flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold-700 group-hover/btn:text-white" />
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="flex-1 py-2 rounded-xl gold-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Enquire</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="p-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-600 transition-colors shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.button>
          </div>

        </div>
      </motion.div>

      {/* Property Specific Enquiry Modal */}
      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          propertyTitle={property.title}
          propertyId={property.id}
          source={`Property Card - ${property.title}`}
        />
      )}
    </>
  );
}
