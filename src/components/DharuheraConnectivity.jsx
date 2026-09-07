import React from 'react';
import { MapPin, Navigation, Car, Plane, Train, Building2, School, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DharuheraConnectivity() {
  const landmarks = [
    {
      title: 'NH-48 Delhi-Jaipur Highway',
      distance: '2 Mins Drive',
      desc: 'Seamless highway connectivity to Gurgaon, Delhi NCR & Jaipur corridor.',
      icon: Car,
      color: 'border-gold-500/50 bg-cream'
    },
    {
      title: 'Anandam Awas SCO Market',
      distance: '0 Mins (At Doorstep)',
      desc: 'Located at SCO-02, Anandam Awaas main commercial marketplace.',
      icon: Building2,
      color: 'border-gold-500/50 bg-cream'
    },
    {
      title: 'Shree Academy & Schools',
      distance: '1 Min Walk',
      desc: 'Top educational institutions and schools right next door.',
      icon: School,
      color: 'border-gold-500/50 bg-cream'
    },
    {
      title: 'Multi-Specialty Hospitals',
      distance: '5 Mins Drive',
      desc: '24x7 emergency medical centers and specialty clinics in Sector 19.',
      icon: Stethoscope,
      color: 'border-gold-500/50 bg-cream'
    },
    {
      title: 'Rewari District Railway Junction',
      distance: '15 Mins Drive',
      desc: 'Major railway transit corridor connecting Delhi & Rajasthan.',
      icon: Train,
      color: 'border-gold-500/50 bg-cream'
    },
    {
      title: 'IGI Airport Delhi',
      distance: '45 Mins Drive',
      desc: 'Direct signal-free highway drive to Indira Gandhi International Airport.',
      icon: Plane,
      color: 'border-gold-500/50 bg-cream'
    }
  ];

  return (
    <section className="py-16 bg-cream border-y border-borderlight relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3 shadow-sm">
            <Navigation className="w-3.5 h-3.5" /> Sector 19 Dharuhera Location Advantage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 tracking-tight">
            Strategic Location & <span className="gold-gradient-text font-serif">Connectivity Guide</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-medium">
            Vedik Reality headquarters at Anandam Awaas, SCO-02, Sector 19 Dharuhera is positioned at the heart of Haryana’s prime industrial and residential hub.
          </p>
        </div>

        {/* Landmarks Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white border border-borderlight hover:border-gold-500 shadow-sm hover:shadow-lg transition-all flex items-start gap-4"
              >
                <div className="p-3.5 rounded-2xl bg-cream border border-borderlight text-gold-700 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-serif font-bold text-charcoal-800 text-base">
                      {item.title}
                    </h3>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/15 text-gold-800 border border-gold-500/30 mb-2">
                    {item.distance}
                  </span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
