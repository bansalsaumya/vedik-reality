import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        if (data.locations) setLocations(data.locations);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
            Prime Real Estate Hubs
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Explore Properties By <span className="gold-gradient-text">Location</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Handpicked corridors with maximum capital appreciation and high rental yields.
          </p>
        </div>

        {loading ? (
          <div className="h-96 bg-charcoal-900/60 rounded-2xl animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-gold-500/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-charcoal-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs text-gold-400 font-bold border border-gold-500/30">
                    {loc.property_count} Active Properties
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-gold-400 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {loc.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <Link
                      to={`/properties?location=${encodeURIComponent(loc.name)}`}
                      className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>Explore {loc.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
