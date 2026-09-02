import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-charcoal-900 border-t border-gold-500/20 text-slate-400 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-charcoal-950 group-hover:border-gold-400 transition-colors shadow-lg">
                <span className="font-serif text-xl font-bold gold-gradient-text">V</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-slate-100">
                  VEDIK <span className="gold-gradient-text font-normal">REALITY</span>
                </span>
                <p className="text-[10px] tracking-widest text-slate-400 uppercase -mt-1 font-medium">
                  LUXURY ESTATES
                </p>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier luxury real estate advisory. Providing verified luxury apartments, bespoke villas, commercial investments, and flagship developer projects.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-charcoal-800 hover:bg-gold-500/20 text-gold-400 border border-slate-700 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-charcoal-800 hover:bg-gold-500/20 text-gold-400 border border-slate-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-charcoal-800 hover:bg-gold-500/20 text-gold-400 border border-slate-700 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
              Explore Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/properties" className="hover:text-gold-400 transition-colors">
                  All Properties Listing
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Apartment" className="hover:text-gold-400 transition-colors">
                  Luxury High-Rise Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className="hover:text-gold-400 transition-colors">
                  Bespoke Independent Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Commercial" className="hover:text-gold-400 transition-colors">
                  Grade-A Commercial Offices
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-gold-400 transition-colors">
                  Flagship Townships & Projects
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-gold-400 transition-colors">
                  Prime Locations & Corridors
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
              Vedik Advisory
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  About Vedik Reality
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-400 transition-colors">
                  NRI Luxury Property Desk
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-400 transition-colors">
                  Legal & RERA Advisory
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">
                  Contact Advisory Team
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-gold-400 transition-colors text-slate-500">
                  Admin Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
              Corporate Headquarters
            </h4>
            <p className="flex items-start gap-2 text-slate-300 leading-relaxed">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{settings.phone}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{settings.email}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{settings.working_hours}</span>
            </p>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Vedik Reality. All Rights Reserved. Luxury Real Estate Digital Growth Platform.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> RERA Compliance Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
