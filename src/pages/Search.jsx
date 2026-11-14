import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { propertiesData } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';
import InteractiveMapView from '../components/common/InteractiveMapView';
import ScrollReveal from '../components/common/ScrollReveal';
import SplitText from '../components/motion/SplitText';
import { EASE, SPRING_SOFT } from '../lib/motion';

const fieldClass =
  'input-luxury w-full bg-white text-xs text-[#111111] font-semibold border border-[#2B2B2B]/20 rounded-xl px-3 py-2.5 focus:outline-none shadow-sm';

export default function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('cat') || 'All';
  const initialState = searchParams.get('st') || '';
  const reduce = useReducedMotion();

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

  const viewModes = [
    { id: 'grid', label: '⊞ Grid View' },
    { id: 'map', label: '📍 Satellite Map' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      {/* Header Banner */}
      <div>
        <ScrollReveal direction="down" distance={12} duration={600}>
          <div className="text-[#B4B4B4] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">USA Nationwide Database</div>
        </ScrollReveal>
        <SplitText
          as="h1"
          text="Browse & Filter Acquisitions"
          className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight font-editorial"
          delay={0.1}
        />
        <ScrollReveal direction="up" distance={12} delay={250} duration={600}>
          <p className="text-sm text-[#555555] mt-1.5 font-medium">Search verified residential estates, commercial facilities, timberland, and luxury rentals across all 50 states.</p>
        </ScrollReveal>
      </div>

      {/* Control Bar & Filter System */}
      <ScrollReveal direction="up" delay={100}>
        <div className="glass-panel-luxury p-6 rounded-3xl border border-[#2B2B2B]/15 bg-white shadow-md space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">

            {/* Keyword Input */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-mono text-[#111111] uppercase tracking-wider mb-1.5 font-bold" htmlFor="search-q">Search City / ZIP / Landmark</label>
              <input
                id="search-q"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Austin, Aspen, 78701..."
                className={`${fieldClass} font-medium px-3.5 placeholder:text-[#8A8A8A]`}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-mono text-[#111111] uppercase tracking-wider mb-1.5 font-bold" htmlFor="search-cat">Category</label>
              <select id="search-cat" value={category} onChange={(e) => setCategory(e.target.value)} className={`${fieldClass} cursor-pointer`}>
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-white text-[#111111]">{c}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-[11px] font-mono text-[#111111] uppercase tracking-wider mb-1.5 font-bold" htmlFor="search-type">Listing Type</label>
              <select id="search-type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={`${fieldClass} cursor-pointer`}>
                <option value="All" className="bg-white text-[#111111]">All (Sale & Rent)</option>
                <option value="Sale" className="bg-white text-[#111111]">For Sale Only</option>
                <option value="Rent" className="bg-white text-[#111111]">For Rent Only</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-[11px] font-mono text-[#111111] uppercase tracking-wider mb-1.5 font-bold" htmlFor="search-state">State</label>
              <select id="search-state" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className={`${fieldClass} cursor-pointer`}>
                <option value="" className="bg-white text-[#111111]">All 50 US States</option>
                <option value="TX" className="bg-white text-[#111111]">Texas (TX)</option>
                <option value="CO" className="bg-white text-[#111111]">Colorado (CO)</option>
                <option value="FL" className="bg-white text-[#111111]">Florida (FL)</option>
                <option value="CA" className="bg-white text-[#111111]">California (CA)</option>
                <option value="MT" className="bg-white text-[#111111]">Montana (MT)</option>
                <option value="NY" className="bg-white text-[#111111]">New York (NY)</option>
              </select>
            </div>

          </div>

          {/* Count, View Toggle & Sorting Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3.5 border-t border-[#2B2B2B]/10 text-xs text-[#555555] font-medium gap-3">
            <div className="flex items-center gap-1">
              Showing
              <span className="relative inline-flex min-w-[1.2rem] justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={filteredProperties.length}
                    initial={reduce ? false : { y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="text-[#111111] font-extrabold tabular-nums"
                  >
                    {filteredProperties.length}
                  </motion.span>
                </AnimatePresence>
              </span>
              curated properties
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle with sliding indicator */}
              <div className="flex bg-[#EFEFEF]/50 p-1 rounded-xl border border-[#B4B4B4]/20" role="tablist" aria-label="View mode">
                {viewModes.map((vm) => {
                  const active = viewMode === vm.id;
                  return (
                    <button
                      key={vm.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setViewMode(vm.id)}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 ${
                        active ? 'text-white' : 'text-[#555555] hover:text-[#2B2B2B]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="search-view-pill"
                          className="absolute inset-0 rounded-lg bg-[#2B2B2B] shadow-sm"
                          transition={reduce ? { duration: 0 } : SPRING_SOFT}
                        />
                      )}
                      <span className="relative z-10">{vm.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-[#111111]">Sort:</span>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  aria-label="Sort properties"
                  className="input-luxury bg-white text-[#111111] font-semibold border border-[#2B2B2B]/20 rounded-lg px-2.5 py-1 text-xs focus:outline-none shadow-sm"
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

      {/* Grid or Map View Container: crossfade between views */}
      <AnimatePresence mode="wait" initial={false}>
        {viewMode === 'map' ? (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
          >
            <InteractiveMapView properties={filteredProperties} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((prop, idx) => (
                  <motion.div
                    key={prop.id}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: (idx % 6) * 0.06,
                      layout: { duration: 0.5, ease: EASE, delay: 0 },
                    }}
                  >
                    <PropertyCard property={prop} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty"
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center glass-panel-luxury rounded-3xl border border-[#2B2B2B]/15 bg-white"
                >
                  <p className="text-[#555555] text-sm font-semibold">No properties match your exact filters.</p>
                  <button
                    onClick={() => { setQuery(''); setCategory('All'); setStateCode(''); setTypeFilter('All'); }}
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold btn-luxury"
                  >
                    Clear Filter Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
