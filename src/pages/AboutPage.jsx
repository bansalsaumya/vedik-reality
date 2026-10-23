import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, TrendingUp, CheckCircle2, Building, MapPin, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

export default function AboutPage() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="About Vedik Realty | Real Estate in Dharuhera"
        description="Learn about Vedik Realty, a real estate and property consultancy in Dharuhera, Haryana, helping buyers explore residential and commercial property opportunities."
        keywords="Vedik Realty, Real Estate in Dharuhera, Property Consultant in Dharuhera, Property in Dharuhera, Residential Property, Commercial Property, Residential Plots, Dharuhera Haryana"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <Award className="w-3.5 h-3.5" /> Real Estate Consultant in Dharuhera
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            About Vedik Realty – Real Estate in Dharuhera
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            Vedik Realty is a real estate and property consultancy based in Dharuhera, Haryana. We help buyers explore residential plots, residential properties, commercial properties and real estate opportunities across Dharuhera and nearby areas.
          </p>
        </div>

        {/* Brand Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
            <h2 className="font-serif text-2xl font-bold text-charcoal-800">
              Trusted Property Consultancy in <span className="gold-gradient-text font-serif">Dharuhera, Haryana</span>
            </h2>
            <p>
              At <strong className="text-charcoal-900 font-bold">Vedik Realty</strong>, we serve as your trusted <strong className="text-charcoal-900 font-bold">property consultant in Dharuhera</strong>. Whether you are searching for freehold <strong className="text-charcoal-900 font-bold">residential plots</strong>, premium <strong className="text-charcoal-900 font-bold">residential property</strong>, or high-potential <strong className="text-charcoal-900 font-bold">commercial property</strong>, our team provides end-to-end guidance tailored to your goals.
            </p>
            <p>
              Situated at First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, we bring on-ground market expertise in <strong className="text-charcoal-900 font-bold">real estate in Dharuhera</strong>, helping buyers evaluate legal title verification, project master plans, and long-term capital growth potential.
            </p>
            <p>
              Explore verified{' '}
              <Link
                to="/properties"
                className="font-bold text-gold-700 hover:text-charcoal-900 underline decoration-gold-500 decoration-2 underline-offset-4"
              >
                property in Dharuhera
              </Link>{' '}
              — from residential plots to commercial spaces — directly on our listings page.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white border border-borderlight shadow-sm">
                <span className="font-serif text-2xl font-bold text-gold-700 block">500+</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Verified Deals</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-borderlight shadow-sm">
                <span className="font-serif text-2xl font-bold text-gold-700 block">100%</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Legal Transparency</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-borderlight shadow-xl aspect-[3/4] max-h-[580px] w-full mx-auto bg-charcoal-900">
            <img
              src="/vedik-office.jpg"
              alt="Vedik Realty real estate office building in Sector 19 Dharuhera"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-widest block mb-1">SCO-02, Sector 19 Dharuhera</span>
              <p className="font-serif text-lg font-bold">Vedik Realty Headquarters</p>
            </div>
          </div>
        </div>

        {/* Internal Navigation & Projects Hub (SEO Structure Booster) */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-borderlight bg-white shadow-sm space-y-6">
          <div className="border-b border-borderlight pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
              Explore Our Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
              Featured Properties & Development Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Navigate directly to our verified listings and project pages in Dharuhera, Haryana:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/properties"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Properties
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Explore all residential & commercial properties</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/anandam-awaas-dharuhera"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Anandam Awaas
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Residential plots in Sector 19, Dharuhera</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/anandam-estate-dharuhera"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Anandam Estate
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Residential plots in Sector 24, Dharuhera</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/tulip-city-sector-3-dharuhera"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Tulip City
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Residential plotted township in Sector 3</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/properties/ekta-enclave-bhiwadi-alwar-highway"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Ekta Enclave
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Residential plots on Bhiwadi–Alwar Highway</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-2xl bg-ivory border border-borderlight hover:border-gold-500 transition-all flex items-center justify-between group shadow-2xs"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  Contact
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Connect with Vedik Realty for inquiries</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold-700 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>

        {/* Pillars */}
        <div className="pt-4">
          <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-8 text-center">
            Our Core <span className="gold-gradient-text font-serif">Pillars</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm">
              <ShieldCheck className="w-8 h-8 text-gold-700 mb-4" />
              <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-2">Legal Security</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Thorough title deeds verification, encumbrance certificates, and RERA compliance documentation for total peace of mind.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm">
              <TrendingUp className="w-8 h-8 text-gold-700 mb-4" />
              <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-2">High ROI Corridors</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Micro-market analytics focused on capital appreciation and rental yield corridors along NH-48 Dharuhera.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm">
              <Users className="w-8 h-8 text-gold-700 mb-4" />
              <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-2">Dedicated Advisory Desk</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Dedicated on-ground site visits, power of attorney advisory, and end-to-end registry management for all buyers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
