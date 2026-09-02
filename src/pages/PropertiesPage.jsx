import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, MapPin, Building, Home, DollarSign, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [bhk, setBhk] = useState(searchParams.get('bhk') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sort, setSort] = useState('newest');

  const fetchProperties = async () => {
    setLoading(true);
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
      if (data.properties) {
        setProperties(data.properties);
        setTotalCount(data.total || data.properties.length);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams, sort]);

  const handleApplyFilters = (e) => {
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

  const handleReset = () => {
    setSearch('');
    setLocation('');
    setType('');
    setBhk('');
    setMaxPrice('');
    setStatus('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Luxury Real Estate <span className="gold-gradient-text">Portfolio</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Discover thoughtfully selected residential, commercial, villa, and penthouses.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filter Panel */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleApplyFilters}
              className="glass-panel p-5 rounded-2xl border border-gold-500/30 sticky top-28 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-serif text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-gold-500" /> Filter Portfolio
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-gold-400 hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Search Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Golf Course, Villa..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3 py-2 pl-8 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Location Corridor
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">All Locations</option>
                  <option value="Golf Course Road">Golf Course Road</option>
                  <option value="Golf Course Extension">Golf Course Extension</option>
                  <option value="SPR">SPR Corridor</option>
                  <option value="Dwarka Expressway">Dwarka Expressway</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Asset Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Luxury Apartment</option>
                  <option value="Villa">Independent Villa</option>
                  <option value="Commercial">Commercial Office</option>
                  <option value="Plot">Villa Plot / Land</option>
                </select>
              </div>

              {/* BHK */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Bedrooms / BHK
                </label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">Any Configuration</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="5 BHK">5 BHK / Penthouse</option>
                </select>
              </div>

              {/* Max Budget */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Max Budget
                </label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                >
                  <option value="">Any Price</option>
                  <option value="30000000">Up to ₹ 3.0 Cr</option>
                  <option value="50000000">Up to ₹ 5.0 Cr</option>
                  <option value="100000000">Up to ₹ 10.0 Cr</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full gold-button py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Apply Filters
              </button>
            </form>
          </div>

          {/* Property Cards Grid */}
          <div className="lg:col-span-3">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
              <span className="text-xs text-slate-400 font-medium">
                Showing <strong className="text-gold-400">{properties.length}</strong> matching properties
              </span>

              {/* Sort Order */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Sort By:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-charcoal-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                >
                  <option value="newest">Newest Added</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 4].map(i => (
                  <div key={i} className="h-96 rounded-2xl bg-charcoal-900/60 animate-pulse border border-slate-800" />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20 bg-charcoal-900/40 rounded-2xl border border-slate-800 space-y-4">
                <Building className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-slate-200">No Properties Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try broadening your search criteria or reset filters to view all listings.
                </p>
                <button
                  onClick={handleReset}
                  className="gold-button px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
