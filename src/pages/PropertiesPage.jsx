import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, MapPin, Building, Home, DollarSign, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { FALLBACK_PROPERTIES } from '../data/fallbackData';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [properties, setProperties] = useState(FALLBACK_PROPERTIES);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(FALLBACK_PROPERTIES.length);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [bhk, setBhk] = useState(searchParams.get('bhk') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sort, setSort] = useState('newest');

  const fetchProperties = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (location) params.append('location', location);
      if (type) params.append('type', type);
      if (bhk) params.append('bhk', bhk);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (status) params.append('status', status);
      if (sort) params.append('sort', sort);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.properties && data.properties.length > 0) {
        setProperties(data.properties);
        setTotalCount(data.total || data.properties.length);
      } else if (!search && !location && !type && !bhk && !maxPrice && !status) {
        setProperties(FALLBACK_PROPERTIES);
        setTotalCount(FALLBACK_PROPERTIES.length);
      } else {
        setProperties([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Error fetching properties, using fallback:', err);
      setProperties(FALLBACK_PROPERTIES);
      setTotalCount(FALLBACK_PROPERTIES.length);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams, sort]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (bhk) params.append('bhk', bhk);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (status) params.append('status', status);

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setType('');
    setBhk('');
    setMaxPrice('');
    setStatus('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <Building className="w-3.5 h-3.5" /> Luxury Real Estate Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 tracking-tight">
            Discover <span className="gold-gradient-text font-serif">Exclusive Residences</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium max-w-2xl">
            Explore verified luxury apartments, independent villas, commercial spaces, and high-yield real estate investments.
          </p>
        </div>

        {/* Filter Toolbar & Controls */}
        <form onSubmit={handleFilterSubmit} className="glass-panel p-6 rounded-2xl border border-borderlight bg-white mb-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            
            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1">Search Keywords</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Property name, builder, sector..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-borderlight rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none custom-select"
              >
                <option value="">All Locations</option>
                <option value="Golf Course Road">Golf Course Road</option>
                <option value="Golf Course Extension">Golf Course Extension</option>
                <option value="SPR">Southern Peripheral Road (SPR)</option>
                <option value="Dwarka Expressway">Dwarka Expressway</option>
                <option value="Noida Expressway">Noida Expressway</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none custom-select"
              >
                <option value="">All Categories</option>
                <option value="Apartment">Luxury Apartment</option>
                <option value="Villa">Independent Villa</option>
                <option value="Commercial">Commercial Office / Retail</option>
                <option value="Plot">Freehold Plot</option>
              </select>
            </div>

            {/* BHK */}
            <div>
              <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1">Bedrooms / BHK</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none custom-select"
              >
                <option value="">Any Configuration</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK / 4.5 BHK</option>
                <option value="5 BHK">5 BHK / Penthouse</option>
              </select>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-borderlight">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Apply Filters
              </button>
              {(search || location || type || bhk || maxPrice || status) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-cream hover:bg-sand border border-borderlight flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white border border-borderlight rounded-xl px-3 py-1.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none custom-select"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </form>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
            Showing <span className="text-gold-700 font-bold">{properties.length}</span> of {totalCount} Properties
          </p>
        </div>

        {/* Property Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-borderlight p-8">
            <h3 className="font-serif text-xl font-bold text-charcoal-800">No Properties Found</h3>
            <p className="text-xs text-slate-500 mt-2">Try relaxing your search filters or clearing location parameters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 gold-button px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
