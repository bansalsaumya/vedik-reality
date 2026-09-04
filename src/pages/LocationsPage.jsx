import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { FALLBACK_LOCATIONS } from '../data/fallbackData';
import SEO from '../components/SEO';

export default function LocationsPage() {
  const [locations, setLocations] = useState(FALLBACK_LOCATIONS);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        if (data.locations && data.locations.length > 0) setLocations(data.locations);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Property Locations in Dharuhera & Sector 19 | Vedik Reality"
        description="Explore top property locations in Dharuhera Haryana including Sector 19, Anandam Awaas, and NH-48 corridor properties."
        keywords="Property in Sector 19 Dharuhera, Anandam Awaas Dharuhera, Properties Near NH-48 Dharuhera, Real Estate Agent in Sector 19 Dharuhera, Dharuhera Haryana"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" /> Growth Corridors in Dharuhera
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Prime Property Locations in <span className="gold-gradient-text font-serif">Dharuhera</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium max-w-2xl">
            In-depth property analysis across Sector 19 Dharuhera, Anandam Awaas, NH-48 corridor, and Rewari District.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="glass-card rounded-2xl overflow-hidden border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-xl grid grid-cols-1 sm:grid-cols-2"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-cream">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-md">
                  {loc.properties_count || 12}+ Residences
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-800 mb-2">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                    {loc.description}
                  </p>
                </div>

                <Link
                  to={`/properties?location=${encodeURIComponent(loc.name)}`}
                  className="gold-button py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Explore Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
