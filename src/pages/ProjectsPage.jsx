import React, { useState, useEffect } from 'react';
import { MapPin, Building, ShieldCheck, PhoneCall, Sparkles, X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from '../components/EnquiryModal';
import { FALLBACK_PROJECTS } from '../data/fallbackData';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selectedProj, setSelectedProj] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length > 0) setProjects(data.projects);
      })
      .catch(err => console.error(err));
  }, []);

  const handleCardClick = (project) => {
    setSelectedProj(project);
    setActiveImageIdx(0);
  };

  const getImages = (proj) => {
    if (!proj) return [];
    if (Array.isArray(proj.images)) return proj.images;
    if (typeof proj.images === 'string') {
      try { return JSON.parse(proj.images); } catch (e) { return [proj.image || '/anandam/logo.png']; }
    }
    return [proj.image || '/anandam/logo.png'];
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Anandam Awaas & Anandam Estate | Residential Plots in Dharuhera"
        description="Explore Anandam Awaas and Anandam Estate by MGH in Sector 19 & 24, Dharuhera. Residential plots from 72–519 sq. yards across a 71-acre project."
        keywords="Anandam Awaas Dharuhera, Anandam Estate Dharuhera, MGH Dharuhera, Plots in Dharuhera Sector 19, Plots in Sector 24 Dharuhera"
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
            Explore 71-Acre RERA approved integrated townships, gated residential plot schemes, and commercial SCO markets in Dharuhera, Haryana.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const imagesList = getImages(project);
            const projectCoverImg = imagesList[0] || project.image || '/anandam/logo.png';
            const projectTitle = project.name || project.title || 'Anandam Awaas & Anandam Estate';
            const projectPrice = project.price_range || project.price_starting || '72 Sq.Yds to 519 Sq.Yds Plots';
            const projectDeveloper = project.developer || project.builder_name || 'MGH';

            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => handleCardClick(project)}
                className="group glass-card rounded-2xl overflow-hidden border border-borderlight bg-white hover:border-gold-500/80 transition-all duration-300 shadow-md hover:shadow-[0_15px_35px_rgba(197,155,39,0.18)] flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream border-b border-gold-100 flex items-center justify-center">
                    <img
                      src={projectCoverImg}
                      alt={projectTitle}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-md">
                      By {projectDeveloper}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs text-gold-400 font-bold block">{projectPrice}</span>
                      <h3 className="font-serif text-lg font-bold line-clamp-1 text-white">{projectTitle}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{project.location}</span>
                    </p>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Status: <strong className="text-emerald-700 font-bold">{project.status || 'Ready for Construction'}</strong></span>
                      <span className="text-gold-700 font-bold underline">Click for Full Photos & Details →</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(project);
                    }}
                    className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>View Photos & Project Details</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Project Details Modal */}
      <AnimatePresence>
        {selectedProj && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProj(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-gold-200 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-charcoal-900 text-white p-5 flex items-center justify-between border-b border-gold-500/30">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">By {selectedProj.developer || selectedProj.builder_name || 'MGH'}</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{selectedProj.name || selectedProj.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProj(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                {/* Image Gallery Viewer */}
                {(() => {
                  const projImgs = getImages(selectedProj);
                  return (
                    <div className="space-y-3">
                      <div className="relative aspect-[16/9] max-h-[400px] rounded-2xl overflow-hidden bg-charcoal-950/5 border border-borderlight">
                        <img
                          src={projImgs[activeImageIdx] || projImgs[0]}
                          alt={selectedProj.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Thumbnails list */}
                      {projImgs.length > 1 && (
                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                          {projImgs.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveImageIdx(i)}
                              className={`w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                                activeImageIdx === i ? 'border-gold-500 scale-105 shadow-md ring-2 ring-gold-400' : 'border-borderlight opacity-70'
                              }`}
                            >
                              <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Project Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-ivory border border-gold-200 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Location</span>
                    <strong className="text-charcoal-800 text-sm font-bold block">{selectedProj.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Plot Size Options</span>
                    <strong className="text-gold-700 text-sm font-bold block">{selectedProj.price_range || '72 – 519 Sq. Yds'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Status</span>
                    <strong className="text-emerald-700 text-sm font-bold block">{selectedProj.status || 'Ready for Immediate Registry'}</strong>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="font-serif text-base font-bold text-charcoal-900 border-b border-borderlight pb-1">
                    Project Overview & Details
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {selectedProj.description}
                  </p>
                </div>

                {/* Amenities */}
                {selectedProj.amenities && (
                  <div className="space-y-2">
                    <h4 className="font-serif text-base font-bold text-charcoal-900 border-b border-borderlight pb-1">
                      Township Features & Amenities
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(Array.isArray(selectedProj.amenities) ? selectedProj.amenities : JSON.parse(selectedProj.amenities || '[]')).map((am, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-800 bg-cream p-2.5 rounded-lg border border-borderlight font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer CTAs */}
              <div className="p-5 bg-ivory border-t border-borderlight flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="tel:+919053848222"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-charcoal-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-gold-400" />
                  <span>Call Advisor: +91 90538 48222</span>
                </a>

                <button
                  onClick={() => {
                    setEnquiryModalOpen(true);
                  }}
                  className="w-full sm:w-auto gold-button px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  Request Rate Chart & Site Visit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          propertyTitle={selectedProj ? selectedProj.name : 'Anandam Awaas & Anandam Estate'}
          source={`Projects Page Modal - ${selectedProj ? selectedProj.name : 'Anandam'}`}
        />
      )}
    </div>
  );
}
