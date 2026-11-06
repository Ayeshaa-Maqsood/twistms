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
  const [typeFilter, setTypeFilter] = useState('All'); // All, Sale, Rent
  const [priceSort, setPriceSort] = useState('default'); // default, low, high

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div>
        <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">USA Nationwide Database</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Browse & Filter Properties</h1>
        <p className="text-sm text-slate-400 mt-1">Search real-time residential, commercial, timberland, and rental properties.</p>
      </div>

      {/* Control Bar & Filters */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Keyword Input */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Search Keyword / City / ZIP</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Austin, Aspen, 78701..."
              className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Listing Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400"
            >
              <option value="All" className="bg-slate-900 text-white">All (Buy & Rent)</option>
              <option value="Sale" className="bg-slate-900 text-white">For Sale Only</option>
              <option value="Rent" className="bg-slate-900 text-white">For Rent Only</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">State</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400"
            >
              <option value="" className="bg-slate-900 text-white">All 50 States</option>
              <option value="TX" className="bg-slate-900 text-white">Texas</option>
              <option value="CO" className="bg-slate-900 text-white">Colorado</option>
              <option value="FL" className="bg-slate-900 text-white">Florida</option>
              <option value="CA" className="bg-slate-900 text-white">California</option>
              <option value="MT" className="bg-slate-900 text-white">Montana</option>
              <option value="NY" className="bg-slate-900 text-white">New York</option>
            </select>
          </div>

        </div>

        {/* Sorting & Result Counts Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
          <div>
            Found <span className="text-cyan-300 font-bold">{filteredProperties.length}</span> matching properties
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span>Sort by:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="bg-slate-900 text-white border border-white/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="default" className="bg-slate-900 text-white">Recommended</option>
              <option value="low" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="high" className="bg-slate-900 text-white">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass-panel rounded-3xl border border-white/10">
            <p className="text-slate-400 text-sm">No properties match your exact criteria.</p>
            <button
              onClick={() => { setQuery(''); setCategory('All'); setStateCode(''); setTypeFilter('All'); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/50"
            >
              Clear Filter Query
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
