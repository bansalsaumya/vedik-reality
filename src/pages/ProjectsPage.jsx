import React, { useState, useEffect } from 'react';
import { MapPin, Building, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';

import { FALLBACK_PROJECTS } from '../data/fallbackData';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [selectedProj, setSelectedProj] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length > 0) setProjects(data.projects);
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <div className="min-h-screen pt-28 pb-20 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
            Flagship Developments
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Real Estate <span className="gold-gradient-text">Projects & Townships</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Explore mega integrated residential townships and commercial towers across NCR.
          </p>
        </div>

        {loading ? (
          <div className="h-96 rounded-2xl bg-charcoal-900/60 animate-pulse border border-slate-800" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => {
              const images = typeof proj.images === 'string' ? JSON.parse(proj.images) : proj.images || [];
              const img = images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';

              return (
                <div
                  key={proj.id}
                  className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col justify-between shadow-2xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={img} alt={proj.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block mb-1">
                        {proj.type}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-slate-100">{proj.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-500" /> {proj.location}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>

                    {proj.rera_number && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
                        <ShieldCheck className="w-4 h-4" />
                        <span>RERA ID: {proj.rera_number}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block">Investment Range</span>
                        <span className="font-serif text-lg font-bold text-gold-400">{proj.price_range}</span>
                      </div>
                      <button
                        onClick={() => setSelectedProj(proj)}
                        className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Enquire Project
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {selectedProj && (
        <EnquiryModal
          isOpen={!!selectedProj}
          onClose={() => setSelectedProj(null)}
          propertyTitle={selectedProj.name}
          source={`Projects Page - ${selectedProj.name}`}
        />
      )}
    </div>
  );
}
