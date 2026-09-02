import React from 'react';
import { ShieldCheck, Award, Target, Eye, Users, Sparkles, Building2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function AboutPage() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block">
            About Vedik Reality
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Curating India's Premier <br />
            <span className="gold-gradient-text">Luxury Real Estate Portfolio</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Vedik Reality is a high-end real estate advisory firm specializing in luxury residential apartments, bespoke villas, commercial office spaces, and land investments across Delhi NCR and high-growth corridors.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-100">Our Mission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To simplify high-value property acquisition through rigorous legal due diligence, transparent developer negotiations, and personalized advisory tailored to each client's lifestyle and wealth objectives.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-100">Our Vision</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To be recognized as India's most trusted luxury real estate digital platform, empowering homebuyers and corporate investors with data-backed market intelligence and verified luxury listings.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-gold-500/30 mb-16 space-y-8">
          <h2 className="font-serif text-2xl font-bold text-center text-slate-100">
            Our Transparent Real Estate <span className="gold-gradient-text">Approach</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <ShieldCheck className="w-8 h-8 text-gold-500 mx-auto" />
              <h4 className="font-serif text-base font-bold text-slate-100">100% RERA Verified</h4>
              <p className="text-xs text-slate-400">Every listing undergoes comprehensive RERA registration and title check.</p>
            </div>
            <div className="space-y-2">
              <Building2 className="w-8 h-8 text-gold-500 mx-auto" />
              <h4 className="font-serif text-base font-bold text-slate-100">Direct Developer Access</h4>
              <p className="text-xs text-slate-400">Official channel partnerships with top tier Indian estate developers.</p>
            </div>
            <div className="space-y-2">
              <Users className="w-8 h-8 text-gold-500 mx-auto" />
              <h4 className="font-serif text-base font-bold text-slate-100">Dedicated Advisory</h4>
              <p className="text-xs text-slate-400">Single point of contact from first site visit to key handover.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
