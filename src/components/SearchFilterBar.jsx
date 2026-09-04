import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, DollarSign, Home } from 'lucide-react';

export default function SearchFilterBar({ className = "" }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [bhk, setBhk] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (budget) params.append('maxPrice', budget);
    if (bhk) params.append('bhk', bhk);
    if (status) params.append('status', status);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`glass-panel p-4 md:p-6 rounded-2xl border border-borderlight shadow-xl bg-white/95 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 items-end">
        
        {/* Location Filter */}
        <div>
          <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gold-600" /> Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-white border border-borderlight rounded-xl px-4 py-3 text-xs text-charcoal-800 font-medium focus:border-gold-500 focus:outline-none transition-all custom-select shadow-sm"
          >
            <option value="">All Prime Locations</option>
            <option value="Golf Course Road">Golf Course Road, Gurgaon</option>
            <option value="Golf Course Extension">Golf Course Extension Road</option>
            <option value="SPR">Southern Peripheral Road (SPR)</option>
            <option value="Dwarka Expressway">Dwarka Expressway Corridor</option>
            <option value="Noida Expressway">Noida Expressway</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-gold-600" /> Property Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-white border border-borderlight rounded-xl px-4 py-3 text-xs text-charcoal-800 font-medium focus:border-gold-500 focus:outline-none transition-all custom-select shadow-sm"
          >
            <option value="">All Categories</option>
            <option value="Apartment">Luxury Apartment</option>
            <option value="Villa">Independent Villa</option>
            <option value="Commercial">Commercial Office / Retail</option>
            <option value="Plot">Freehold Plot / Land</option>
          </select>
        </div>

        {/* BHK Filter */}
        <div>
          <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-gold-600" /> Bedrooms / BHK
          </label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="w-full bg-white border border-borderlight rounded-xl px-4 py-3 text-xs text-charcoal-800 font-medium focus:border-gold-500 focus:outline-none transition-all custom-select shadow-sm"
          >
            <option value="">Any Configuration</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK / 4.5 BHK</option>
            <option value="5 BHK">5 BHK / Penthouse</option>
          </select>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-[11px] font-bold text-gold-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-gold-600" /> Max Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-white border border-borderlight rounded-xl px-4 py-3 text-xs text-charcoal-800 font-medium focus:border-gold-500 focus:outline-none transition-all custom-select shadow-sm"
          >
            <option value="">Any Budget</option>
            <option value="30000000">Up to ₹ 3.0 Cr</option>
            <option value="50000000">Up to ₹ 5.0 Cr</option>
            <option value="100000000">Up to ₹ 10.0 Cr</option>
            <option value="200000000">Above ₹ 10.0 Cr+</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            <span>Search Properties</span>
          </button>
        </div>

      </div>
    </form>
  );
}
