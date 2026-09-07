import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, ShieldCheck, ExternalLink } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  const mapUrl = settings.google_map_link || "https://maps.app.goo.gl/bpCUi761odoyA34B7";

  return (
    <footer className="bg-cream border-t border-borderlight text-slate-600 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-borderlight">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-charcoal-800 group-hover:border-gold-500 transition-colors shadow-md">
                <span className="font-serif text-xl font-bold gold-gradient-text">V</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-charcoal-800">
                  VEDIK <span className="gold-gradient-text font-normal">REALITY</span>
                </span>
                <p className="text-[10px] tracking-widest text-slate-500 uppercase -mt-1 font-semibold">
                  LUXURY ESTATES
                </p>
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Real estate advisory in Dharuhera & Sector 19. Providing verified residential plots, 2 BHK / 3 BHK flats, commercial SCO investments, and Anandam Awaas properties.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings.instagram || "https://www.instagram.com/vedikrealty/"}
                target="_blank"
                rel="noreferrer"
                title="Instagram Page"
                className="p-2.5 rounded-full bg-white hover:bg-gold-500 hover:text-white text-charcoal-800 border border-borderlight transition-all shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebook || "https://www.facebook.com/VedikRealty/"}
                target="_blank"
                rel="noreferrer"
                title="Facebook Page"
                className="p-2.5 rounded-full bg-white hover:bg-gold-500 hover:text-white text-charcoal-800 border border-borderlight transition-all shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.youtube || "https://youtube.com/@vedikreality"}
                target="_blank"
                rel="noreferrer"
                title="YouTube Channel"
                className="p-2.5 rounded-full bg-white hover:bg-gold-500 hover:text-white text-charcoal-800 border border-borderlight transition-all shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                title="Google Maps Location"
                className="p-2.5 rounded-full bg-white hover:bg-amber-600 hover:text-white text-amber-700 border border-borderlight transition-all shadow-sm flex items-center gap-1 text-xs font-bold"
              >
                <MapPin className="w-4 h-4 text-amber-600 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-charcoal-800 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
              Explore Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/properties" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                  <span>All Properties Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Residential%20Plot" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                  <span>Residential Plots in Dharuhera</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Flats" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                  <span>2 BHK & 3 BHK Luxury Flats</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Commercial" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                  <span>SCO Commercial Plots</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                  <span>Flagship Projects & Anandam Awaas</span>
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                  <span>Sector 19 & Prime Locations</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-charcoal-800 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
              Vedik Advisory
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/about" className="hover:text-gold-600 transition-colors">
                  About Vedik Reality
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-600 transition-colors">
                  NRI & Investor Property Advisory
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-600 transition-colors">
                  Legal Title & Registry Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-600 transition-colors">
                  Contact Advisory Desk
                </Link>
              </li>
              <li>
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline flex items-center gap-1 pt-1 font-bold"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs font-medium">
            <h4 className="font-serif text-sm font-bold text-charcoal-800 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
              Corporate Office & Advisory
            </h4>
            {settings.owners && (
              <p className="flex items-center gap-2 text-slate-800 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                <span>Owners: <strong className="text-gold-700 font-bold">{settings.owners}</strong></span>
              </p>
            )}
            
            {/* Clickable Address Link to Google Maps */}
            <p className="flex items-start gap-2 text-slate-700 leading-relaxed group">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to open Google Maps"
                className="hover:text-amber-700 font-semibold underline decoration-amber-400/50 hover:decoration-amber-600 transition-all flex flex-col"
              >
                <span>{settings.address}</span>
                <span className="text-[10px] text-amber-600 font-bold mt-0.5 flex items-center gap-0.5">
                  📍 Click for Map Directions &rarr;
                </span>
              </a>
            </p>

            {/* Clickable Phone & WhatsApp Links */}
            <div className="flex items-start gap-2 text-slate-700 font-bold pt-1">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="flex flex-col gap-1">
                <a 
                  href="https://wa.me/919053848222?text=Hello%20Vedik%20Reality,%20I%20want%20property%20details%20in%20Dharuhera." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition-colors flex items-center justify-between gap-2"
                >
                  <span>Call / WhatsApp: +91 90538 48222</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-sans">Chat</span>
                </a>
                <a 
                  href="https://wa.me/919728295353?text=Hello%20Vedik%20Reality,%20I%20want%20property%20details%20in%20Dharuhera." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition-colors flex items-center justify-between gap-2"
                >
                  <span>Call / WhatsApp: +91 97282 95353</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-sans">Chat</span>
                </a>
              </span>
            </div>

            {/* Clickable Mailto Link */}
            <p className="flex items-center gap-2 text-slate-700 pt-1">
              <Mail className="w-4 h-4 text-gold-600 shrink-0" />
              <a 
                href={`mailto:${settings.email}`} 
                className="hover:text-gold-700 font-semibold underline decoration-gold-400/50 transition-colors"
              >
                {settings.email}
              </a>
            </p>

            <p className="flex items-center gap-2 text-slate-600 pt-1">
              <Clock className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{settings.working_hours}</span>
            </p>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} Vedik Reality. All Rights Reserved. Luxury Real Estate Digital Growth Platform.</p>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-gold-600 transition-colors">Contact Us</Link>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors">Site Map Location</a>
            <span className="text-emerald-700 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> RERA Compliance Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
