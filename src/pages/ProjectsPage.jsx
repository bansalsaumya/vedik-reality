import React, { useState, useEffect } from 'react';
import { MapPin, Building, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import { FALLBACK_PROJECTS } from '../data/fallbackData';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
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
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Flagship Projects & Townships in Dharuhera | Vedik Reality"
        description="Explore upcoming flagship residential projects, townships, plots & commercial developments in Dharuhera Haryana with Vedik Reality."
        keywords="Projects in Dharuhera, Townships in Dharuhera, Plots in Dharuhera, Commercial Projects Dharuhera, Real Estate Agent in Dharuhera"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <Building className="w-3.5 h-3.5" /> Flagship Townships & Developments
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Developer <span className="gold-gradient-text font-serif">Flagship Projects</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium max-w-2xl">
            Integrated townships, golf residences, ultra-luxury high-rises, and Grade-A commercial complexes across North India.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const projectImg = project.image || (Array.isArray(project.images) ? project.images[0] : (typeof project.images === 'string' ? JSON.parse(project.images)[0] : null)) || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80';
            const projectTitle = project.title || project.name || 'Luxury Flagship Project';
            const projectPrice = project.price_starting || project.price_range || 'Price on Request';
            const projectDeveloper = project.developer || project.builder_name || 'Flagship Developer';

            return (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                    <img
                      src={projectImg}
                      alt={projectTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-md">
                      {projectDeveloper}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs text-gold-400 font-bold block">{projectPrice}</span>
                      <h3 className="font-serif text-lg font-bold line-clamp-1">{projectTitle}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{project.location}</span>
                    </p>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Status: <strong className="text-charcoal-800">{project.status || 'Under Construction'}</strong></span>
                      <span>Completion: <strong className="text-gold-700">{project.possession_date || '2026/27'}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedProj(project)}
                    className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Download Masterplan & Brochure</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>


      </div>

      {selectedProj && (
        <EnquiryModal
          isOpen={!!selectedProj}
          onClose={() => setSelectedProj(null)}
          propertyTitle={`Brochure Request - ${selectedProj.title}`}
          source={`Project Page - ${selectedProj.title}`}
        />
      )}
    </div>
  );
}
