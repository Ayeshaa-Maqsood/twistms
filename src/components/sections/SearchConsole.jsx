import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';
import MagneticButton from '../motion/MagneticButton';
import { EASE } from '../../lib/motion';

const US_STATES = [
  { code: '', label: 'All 50 US States' },
  { code: 'TX', label: 'Texas (TX)' },
  { code: 'CO', label: 'Colorado (CO)' },
  { code: 'FL', label: 'Florida (FL)' },
  { code: 'CA', label: 'California (CA)' },
  { code: 'MT', label: 'Montana (MT)' },
  { code: 'NY', label: 'New York (NY)' },
];

const CATEGORY_LINKS = [
  { label: 'Residential', cat: 'Residential' },
  { label: 'Commercial', cat: 'Commercial' },
  { label: 'Land', cat: 'Land' },
  { label: 'Rentals', cat: 'Rental' },
];

/**
 * Marketplace search console that lands directly after the 3D journey.
 * Search state is owned by <Home/>; the live-filtered featured grid and the
 * /search navigation behave exactly as before.
 */
export default function SearchConsole({
  categories,
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
  selectedState,
  setSelectedState,
  onSubmit,
  stats,
}) {
  const reduce = useReducedMotion();
  const fieldClass =
    'input-luxury w-full bg-white text-xs text-[#1A2315] font-semibold border border-transparent rounded-2xl px-4 py-3.5 focus:outline-none shadow-sm';

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20" aria-label="Property search">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative overflow-hidden rounded-3xl p-4 sm:p-6 text-white bg-gradient-to-br from-[#171A1D] via-[#1A2315] to-[#172331] border border-white/10 shadow-[0_40px_80px_-30px_rgba(15,20,12,0.55)]"
      >
        {/* Category quick links: real routes into the search page */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FBF8F2]/60">
          <span className="text-[#D4C28E]">Browse</span>
          {CATEGORY_LINKS.map((c) => (
            <Link key={c.cat} to={`/search?cat=${c.cat}`} className="link-draw hover:text-[#E8DCB4] transition-colors">
              {c.label}
            </Link>
          ))}
        </div>

        <form onSubmit={onSubmit} role="search" className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
          <div className="sm:col-span-3">
            <label className="sr-only" htmlFor="console-category">Category</label>
            <select id="console-category" value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className={`${fieldClass} cursor-pointer`}>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-white text-[#1A2315]">{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-4">
            <label className="sr-only" htmlFor="console-query">City, ZIP or landmark</label>
            <input
              id="console-query"
              type="text"
              placeholder="City, ZIP, or landmark (e.g. Austin, Aspen)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${fieldClass} font-medium placeholder:text-[#838961]`}
            />
          </div>
          <div className="sm:col-span-3">
            <label className="sr-only" htmlFor="console-state">State</label>
            <select id="console-state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className={`${fieldClass} cursor-pointer`}>
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code} className="bg-white text-[#1A2315]">{s.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <MagneticButton className="block w-full" strength={0.18} radius={8}>
              <button type="submit" className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold btn-luxury flex items-center justify-center gap-2 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </MagneticButton>
          </div>
        </form>

        {/* Stats strip */}
        <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          {stats.map((stat, i) => (
            <div key={i} className="pl-4 border-l border-[#BFA668]/40">
              <p className="text-xl sm:text-2xl font-extrabold font-editorial text-white tracking-tight">
                <AnimatedCounter target={stat.value} delay={i * 120} />
              </p>
              <p className="text-[10px] text-[#D4C28E]/85 mt-1 uppercase tracking-[0.2em] font-mono font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
