import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function StickyMobileBar({ onEnquireClick }) {
  const { settings } = useSettings();

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi Vedik Reality, I am reaching out from your website to inquire about luxury property listings.');
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-charcoal-950/95 backdrop-blur-lg border-t border-gold-500/30 p-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-2 bg-charcoal-800 border border-slate-700 rounded-xl text-slate-200 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-gold-500 mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call Now</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-2 bg-emerald-950/90 border border-emerald-500/40 rounded-xl text-emerald-400 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </button>

        <button
          onClick={onEnquireClick}
          className="flex flex-col items-center justify-center py-2 gold-button rounded-xl active:scale-95 transition-transform shadow-md"
        >
          <Calendar className="w-4 h-4 text-charcoal-950 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Enquire</span>
        </button>
      </div>
    </div>
  );
}
