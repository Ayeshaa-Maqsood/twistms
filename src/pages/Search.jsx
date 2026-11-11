import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertiesData } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';
import InteractiveMapView from '../components/common/InteractiveMapView';
import ScrollReveal from '../components/common/ScrollReveal';

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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

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
      <ScrollReveal direction="down">
        <div>
          <div className="text-[#BFA668] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">USA Nationwide Database</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2315] tracking-tight font-editorial">Browse & Filter Acquisitions</h1>
          <p className="text-sm text-[#596638] mt-1.5 font-medium">Search verified residential estates, commercial facilities, timberland, and luxury rentals across all 50 states.</p>
        </div>
      </ScrollReveal>

      {/* Control Bar & Filter System */}
      <ScrollReveal direction="up" delay={100}>
        <div className="glass-panel-luxury p-6 rounded-3xl border border-[#3E4E31]/15 bg-white shadow-md space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            
            {/* Keyword Input */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-mono text-[#1A2315] uppercase tracking-wider mb-1.5 font-bold">Search City / ZIP / Landmark</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Austin, Aspen, 78701..."
                className="w-full bg-[#FFFFFF] text-xs text-[#1A2315] font-medium border border-[#3E4E31]/20 rounded-xl px-3.5 py-2.5 placeholder:text-[#838961] focus:outline-none focus:border-[#BFA668] shadow-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-mono text-[#1A2315] uppercase tracking-wider mb-1.5 font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#FFFFFF] text-xs text-[#1A2315] font-semibold border border-[#3E4E31]/20 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#BFA668] cursor-pointer shadow-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-white text-[#1A2315]">{c}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-[11px] font-mono text-[#1A2315] uppercase tracking-wider mb-1.5 font-bold">Listing Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-[#FFFFFF] text-xs text-[#1A2315] font-semibold border border-[#3E4E31]/20 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#BFA668] cursor-pointer shadow-sm"
              >
                <option value="All" className="bg-white text-[#1A2315]">All (Sale & Rent)</option>
                <option value="Sale" className="bg-white text-[#1A2315]">For Sale Only</option>
                <option value="Rent" className="bg-white text-[#1A2315]">For Rent Only</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-[11px] font-mono text-[#1A2315] uppercase tracking-wider mb-1.5 font-bold">State</label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full bg-[#FFFFFF] text-xs text-[#1A2315] font-semibold border border-[#3E4E31]/20 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#BFA668] cursor-pointer shadow-sm"
              >
                <option value="" className="bg-white text-[#1A2315]">All 50 US States</option>
                <option value="TX" className="bg-white text-[#1A2315]">Texas (TX)</option>
                <option value="CO" className="bg-white text-[#1A2315]">Colorado (CO)</option>
                <option value="FL" className="bg-white text-[#1A2315]">Florida (FL)</option>
                <option value="CA" className="bg-white text-[#1A2315]">California (CA)</option>
                <option value="MT" className="bg-white text-[#1A2315]">Montana (MT)</option>
                <option value="NY" className="bg-white text-[#1A2315]">New York (NY)</option>
              </select>
            </div>

          </div>

          {/* Count, View Toggle & Sorting Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3.5 border-t border-[#3E4E31]/10 text-xs text-[#596638] font-medium">
            <div>
              Showing <span className="text-[#1A2315] font-extrabold">{filteredProperties.length}</span> curated properties
            </div>
            
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              {/* View Mode Toggle */}
              <div className="flex bg-[#F4EDDA]/50 p-1 rounded-xl border border-[#BFA668]/20">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#3E4E31] text-white shadow-sm'
                      : 'text-[#596638] hover:text-[#3E4E31]'
                  }`}
                >
                  ⊞ Grid View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'map'
                      ? 'bg-[#3E4E31] text-white shadow-sm'
                      : 'text-[#596638] hover:text-[#3E4E31]'
                  }`}
                >
                  📍 Satellite Map
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#1A2315]">Sort:</span>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="bg-[#FFFFFF] text-[#1A2315] font-semibold border border-[#3E4E31]/20 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#BFA668] shadow-sm"
                >
                  <option value="default">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid or Map View Container */}
      {viewMode === 'map' ? (
        <InteractiveMapView properties={filteredProperties} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop, idx) => (
              <ScrollReveal key={prop.id} direction="up" delay={(idx % 6) * 80} duration={600}>
                <PropertyCard property={prop} />
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass-panel-luxury rounded-3xl border border-[#3E4E31]/15 bg-white">
              <p className="text-[#596638] text-sm font-semibold">No properties match your exact filters.</p>
              <button
                onClick={() => { setQuery(''); setCategory('All'); setStateCode(''); setTypeFilter('All'); }}
                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold btn-luxury"
              >
                Clear Filter Query
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
