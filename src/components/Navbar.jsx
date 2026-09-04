import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
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
          ? 'bg-ivory/95 backdrop-blur-md py-3.5 border-b border-borderlight shadow-lg'
          : 'bg-gradient-to-b from-ivory via-ivory/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-charcoal-800 group-hover:border-gold-500 transition-colors shadow-md">
              <span className="font-serif text-xl font-bold gold-gradient-text">V</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-charcoal-800 group-hover:text-gold-500 transition-colors">
                VEDIK <span className="gold-gradient-text font-normal">REALITY</span>
              </span>
              <p className="text-[10px] tracking-widest text-slate-500 uppercase -mt-1 font-semibold">
                LUXURY ESTATES
              </p>
            </div>
          </Link>

          {/* Right Navigation & Phone CTA */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 ${
                      isActive ? 'text-gold-600 font-bold' : 'text-charcoal-800 hover:text-gold-500'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500 to-amber-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2 text-xs font-bold text-white bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-800 border border-gold-500/40 px-4 py-2.5 rounded-full transition-all shadow-md whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="whitespace-nowrap">{settings.phone}</span>
              </a>
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
              className="p-2 text-charcoal-800 hover:text-gold-500 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory/98 backdrop-blur-xl border-b border-borderlight px-6 pt-4 pb-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 border-b border-borderlight ${
                  location.pathname === link.path ? 'text-gold-600 font-bold' : 'text-charcoal-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full text-center py-2.5 rounded-lg gold-button font-bold text-sm"
            >
              Call {settings.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
