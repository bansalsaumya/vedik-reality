import React, { useState } from 'react';
import { MessageCircle, Phone, X, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export default function FloatingContactWidget({ onEnquireClick }) {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi Vedik Reality, I am inquiring from your website regarding property listings & site visit in Dharuhera.');
    window.open(`https://wa.me/${settings.whatsapp || '919053848222'}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-5 lg:right-8 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-4 w-80 sm:w-88 rounded-2xl bg-white border border-borderlight p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-borderlight">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-gold-500/50 flex items-center justify-center text-gold-400 font-serif font-bold text-lg">
                    V
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-charcoal-800 text-sm">Vedik Advisory Desk</h4>
                  <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online | Sector 19 Dharuhera
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-charcoal-800 hover:bg-cream transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="py-4 space-y-3 text-xs font-medium text-slate-600">
              <p className="flex items-center justify-between bg-cream/70 p-2.5 rounded-xl border border-borderlight text-slate-700">
                <span className="font-semibold text-charcoal-800">Owners & Advisory:</span>
                <strong className="text-gold-700 font-bold">{settings.owners || 'Deepak Lamba, Manish'}</strong>
              </p>

              <div className="space-y-2 pt-1">
                {/* WhatsApp Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </motion.button>

                {/* Primary Call */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${(settings.phone || '+91 90538 48222').replace(/\s+/g, '')}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-900 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-colors border border-gold-500/40"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call {settings.phone || '+91 90538 48222'}</span>
                </motion.a>

                {/* Secondary Call */}
                {settings.alt_phone && (
                  <a
                    href={`tel:${settings.alt_phone.replace(/\s+/g, '')}`}
                    className="w-full py-2 px-4 rounded-xl bg-cream hover:bg-sand text-charcoal-800 text-[11px] font-semibold flex items-center justify-center gap-2 border border-borderlight transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-700" />
                    <span>Alt Call: {settings.alt_phone}</span>
                  </a>
                )}

                {/* Schedule Site Visit */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onEnquireClick) onEnquireClick();
                  }}
                  className="w-full py-2 px-4 rounded-xl gold-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Site Visit / Consultation</span>
                </button>
              </div>
            </div>

            {/* Footer Badge */}
            <div className="pt-2 border-t border-borderlight flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3 h-3" /> Verified Real Estate Agent
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-700" /> SCO-02, Sector 19
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-charcoal-800 hover:bg-gold-500 text-white hover:text-charcoal-950 border border-gold-500/60 shadow-2xl backdrop-blur-md transition-all duration-300 group"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-gold-400 group-hover:text-charcoal-950 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-charcoal-800 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-charcoal-800 rounded-full"></span>
        </div>
        <span className="text-xs font-bold tracking-wider uppercase hidden sm:inline">
          {isOpen ? 'Close' : 'Quick Contact'}
        </span>
      </motion.button>
    </div>
  );
}
