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
              <div className="w-12 h-12 rounded-full border-2 border-gold-500/60 overflow-hidden bg-white group-hover:border-gold-500 transition-all shadow-md shrink-0 flex items-center justify-center p-0.5">
                <img 
                  src="/logo.png" 
                  alt="Vedik Reality Logo" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => { e.target.src = '/logo.jpg'; }}
                />
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
              <p className="flex items-center gap-2 text-charcoal-800 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                <span>Owners: <strong className="text-gold-700 font-bold">{settings.owners}</strong></span>
              </p>
            )}
            
            {/* Clickable Address Link to Google Maps */}
            <div className="flex items-start gap-2.5 text-slate-700 leading-relaxed pt-1">
              <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to open Google Maps"
                className="hover:text-gold-700 font-medium transition-colors"
              >
                {settings.address}
              </a>
            </div>

            {/* Clickable Phone & WhatsApp Links */}
            <div className="flex items-start gap-2.5 text-slate-700 pt-1">
              <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 font-semibold">
                <a 
                  href="https://wa.me/919053848222?text=Hello%20Vedik%20Reality,%20I%20want%20property%20details%20in%20Dharuhera." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-700 transition-colors"
                >
                  +91 90538 48222
                </a>
                <a 
                  href="https://wa.me/919728295353?text=Hello%20Vedik%20Reality,%20I%20want%20property%20details%20in%20Dharuhera." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-700 transition-colors"
                >
                  +91 97282 95353
                </a>
              </div>
            </div>

            {/* Clickable Mailto Link */}
            <div className="flex items-center gap-2.5 text-slate-700 pt-1">
              <Mail className="w-4 h-4 text-gold-600 shrink-0" />
              <a 
                href={`mailto:${settings.email}`} 
                className="hover:text-gold-700 font-semibold transition-colors"
              >
                {settings.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 pt-1">
              <Clock className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{settings.working_hours}</span>
            </div>
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
