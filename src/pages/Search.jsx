import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertiesData } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('cat') || 'All';
  const initialState = searchParams.get('st') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [stateCode, setStateCode] = useState(initialState);
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('default');

  const categories = ['All', 'Residential', 'Land', 'Commercial', 'Rental'];

  const filteredProperties = propertiesData
    .filter((item) => {
      const matchCat = category === 'All' || item.category === category;
      const matchType = typeFilter === 'All' || item.type === typeFilter;
      const matchState = !stateCode || item.stateCode === stateCode;
      const matchQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.city.toLowerCase().includes(query.toLowerCase()) ||
        item.state.toLowerCase().includes(query.toLowerCase()) ||
        item.zip.includes(query);
      return matchCat && matchType && matchState && matchQuery;
    })
    .sort((a, b) => {
      if (priceSort === 'low') return a.price - b.price;
      if (priceSort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div>
        <div className="text-[#C5A880] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">USA Nationwide Database</div>
        <h1 className="text-4xl sm:text-5xl font-normal text-[#1A202C] tracking-tight font-editorial">Browse & Filter Acquisitions</h1>
        <p className="text-xs text-[#64748B] mt-1.5 font-light">Search verified residential estates, commercial facilities, timberland, and luxury rentals.</p>
      </div>

      {/* Control Bar & Filter System */}
      <div className="glass-panel-luxury p-6 rounded-3xl border border-[#2C3539]/10 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* Keyword Input */}
          <div className="lg:col-span-2">
            <label className="block text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1.5 font-semibold">Search City / ZIP / Landmark</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Austin, Aspen, 78701..."
              className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/10 rounded-xl px-3.5 py-2.5 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1.5 font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-white text-[#1A202C]">{c}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1.5 font-semibold">Listing Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="All" className="bg-white text-[#1A202C]">All (Sale & Rent)</option>
              <option value="Sale" className="bg-white text-[#1A202C]">For Sale Only</option>
              <option value="Rent" className="bg-white text-[#1A202C]">For Rent Only</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1.5 font-semibold">State</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="" className="bg-white text-[#1A202C]">All 50 US States</option>
              <option value="TX" className="bg-white text-[#1A202C]">Texas</option>
              <option value="CO" className="bg-white text-[#1A202C]">Colorado</option>
              <option value="FL" className="bg-white text-[#1A202C]">Florida</option>
              <option value="CA" className="bg-white text-[#1A202C]">California</option>
              <option value="MT" className="bg-white text-[#1A202C]">Montana</option>
              <option value="NY" className="bg-white text-[#1A202C]">New York</option>
            </select>
          </div>

        </div>

        {/* Count & Sorting Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-3.5 border-t border-[#2C3539]/10 text-xs text-[#64748B]">
          <div>
            Showing <span className="text-[#1A202C] font-bold">{filteredProperties.length}</span> curated properties
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="text-[11px] font-mono">Sort Order:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="bg-[#FBF8F2] text-[#1A202C] border border-[#2C3539]/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#C5A880]"
            >
              <option value="default">Featured Selection</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass-panel-luxury rounded-3xl">
            <p className="text-[#64748B] text-sm">No properties match your exact filters.</p>
            <button
              onClick={() => { setQuery(''); setCategory('All'); setStateCode(''); setTypeFilter('All'); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold btn-luxury"
            >
              Clear Filter Query
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
