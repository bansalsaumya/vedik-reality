import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, ShieldCheck, User } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { settings } = useSettings();
  const { admin } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Projects', path: '/projects' },
    { name: 'Locations', path: '/locations' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal-950/90 backdrop-blur-md py-3 border-b border-gold-500/20 shadow-2xl'
          : 'bg-gradient-to-b from-charcoal-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-charcoal-900 group-hover:border-gold-400 transition-colors shadow-lg">
              <span className="font-serif text-xl font-bold gold-gradient-text">V</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-slate-100 group-hover:text-gold-400 transition-colors">
                VEDIK <span className="gold-gradient-text font-normal">REALITY</span>
              </span>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase -mt-1 font-medium">
                LUXURY ESTATES
              </p>
            </div>
          </Link>

          {/* Right Navigation & Action CTAs */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-widest font-medium transition-all relative py-1 ${
                      isActive ? 'text-gold-400 font-bold' : 'text-slate-300 hover:text-gold-400'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500 to-amber-300 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="h-5 w-[1px] bg-slate-800" />

            <div className="flex items-center space-x-3">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2 text-xs font-semibold text-slate-200 bg-charcoal-800/90 hover:bg-charcoal-700 border border-gold-500/30 hover:border-gold-400 px-4 py-2 rounded-full transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>{settings.phone}</span>
              </a>

              <Link
                to={admin ? "/admin/dashboard" : "/admin/login"}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-gold-400 transition-colors px-2 py-1"
                title="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 text-gold-500/80" />
                <span>{admin ? "Dashboard" : "Admin"}</span>
              </Link>
            </div>
          </div>


          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="p-2 rounded-full bg-charcoal-800 border border-gold-500/40 text-gold-400"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-gold-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-charcoal-900/95 backdrop-blur-xl border-b border-gold-500/20 px-6 pt-4 pb-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-slate-800 ${
                  location.pathname === link.path ? 'text-gold-500 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full text-center py-2.5 rounded-lg gold-button font-medium text-sm"
            >
              Call {settings.phone}
            </a>
            <Link
              to={admin ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium"
            >
              Admin Management Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
