import React from 'react';
import { ShieldCheck, Award, Users, TrendingUp, CheckCircle2, Building, Star } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

export default function AboutPage() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="About Vedik Reality | Real Estate Agent & Property Consultant in Dharuhera"
        description="Learn about Vedik Reality, a leading real estate company and property consultant in Dharuhera, Haryana. Serving clients with verified residential & commercial property deals."
        keywords="Real Estate Company in Dharuhera, Property Consultant in Dharuhera, Real Estate Agent in Dharuhera, Property Dealer in Dharuhera, Sector 19 Dharuhera, Anandam Awaas Dharuhera"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <Award className="w-3.5 h-3.5" /> Real Estate Consultant in Dharuhera
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            About Vedik Reality – <span className="gold-gradient-text font-serif">Your Real Estate Partner in Dharuhera</span>
          </h1>
          <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
            Founded on the pillars of integrity, deep local market intelligence, and uncompromised transparency, Vedik Reality is your premier real estate agent and property consultant in Dharuhera, Haryana.
          </p>
        </div>

        {/* Brand Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
            <h2 className="font-serif text-2xl font-bold text-charcoal-800">
              Trusted Property Consultancy in <span className="gold-gradient-text font-serif">Dharuhera & Sector 19</span>
            </h2>
            <p>
              Helmed by founders <strong className="text-gold-700 font-bold">Deepak Lamba & Manish</strong> and located at First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana – 123106, we specialize in residential plots, ready-to-move 2/3 BHK flats, independent houses, and high-yield commercial property investments near NH-48.
            </p>
            <p>
              Every property listed under Vedik Reality undergoes strict legal title scrutiny, registry verification, and fair-market valuation checks to ensure complete peace of mind for buyers and investors.
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

          <div className="relative rounded-3xl overflow-hidden border border-borderlight shadow-xl aspect-[4/3] bg-cream">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Vedik Reality real estate office in Sector 19 Dharuhera"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-widest block mb-1">Sector 19 Dharuhera</span>
              <p className="font-serif text-lg font-bold">Vedik Reality Real Estate Office</p>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="pt-8">
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
                Micro-market analytics focused on capital appreciation and rental yield corridors along Golf Course Extension & SPR.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-borderlight bg-white shadow-sm">
              <Users className="w-8 h-8 text-gold-700 mb-4" />
              <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-2">NRI Portfolio Desk</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Dedicated virtual tours, power of attorney advisory, tax compliance, and end-to-end leasing management for overseas buyers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
