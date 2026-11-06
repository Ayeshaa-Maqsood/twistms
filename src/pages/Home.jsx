import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertiesData, platformStats, listingPlans } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const categories = ['All', 'Residential', 'Land', 'Commercial', 'Rental'];

  const filteredProperties = propertiesData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || item.stateCode === selectedState;
    return matchesCategory && matchesSearch && matchesState;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}&cat=${activeCategory}&st=${selectedState}`);
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION WITH AMBIENT CYBER GLOW */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/20 to-violet-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>USA Nationwide Real Estate Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Acquire & List Prime <br />
            <span className="text-gradient-cyan">Properties Across America.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Residential sanctuaries, high-yield commercial hubs, and sprawling timberland. Fully verified ownership deeds, agent representation, and multi-channel promotion.
          </p>

          {/* Search Box Console */}
          <div className="mt-10 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="glass-panel p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              {/* Category Dropdown */}
              <div className="sm:col-span-3">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-slate-900/80 text-xs text-white border border-white/10 rounded-2xl px-3 py-3 focus:outline-none focus:border-cyan-400"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-slate-900 text-white">
                      {c === 'All' ? 'All Categories' : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keyword / City Search Input */}
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="City, ZIP, or landmark (e.g. Austin, Aspen)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900/80 text-xs text-white border border-white/10 rounded-2xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* State Filter */}
              <div className="sm:col-span-3">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-900/80 text-xs text-white border border-white/10 rounded-2xl px-3 py-3 focus:outline-none focus:border-cyan-400"
                >
                  <option value="" className="bg-slate-900 text-white">All 50 States</option>
                  <option value="TX" className="bg-slate-900 text-white">Texas (TX)</option>
                  <option value="CO" className="bg-slate-900 text-white">Colorado (CO)</option>
                  <option value="FL" className="bg-slate-900 text-white">Florida (FL)</option>
                  <option value="CA" className="bg-slate-900 text-white">California (CA)</option>
                  <option value="MT" className="bg-slate-900 text-white">Montana (MT)</option>
                  <option value="NY" className="bg-slate-900 text-white">New York (NY)</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-[#040711] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Key Stats Counter */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
                <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. CATEGORY PILL SELECTOR & FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Verified US Listings</div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Featured Marketplace Portfolio</h2>
            <p className="text-sm text-slate-400 mt-1">Directly vetted titles and legal verification records.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeCategory === c
                    ? 'bg-cyan-500 text-[#040711] shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center glass-panel rounded-3xl border border-white/10">
              <p className="text-slate-400 text-sm">No properties match your exact filters.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchTerm(''); setSelectedState(''); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/50"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
          >
            Explore Complete 500+ Property Database →
          </Link>
        </div>
      </section>

      {/* 3. VERIFICATION & TRUST FRAMEWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Trust & Legal Integrity</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
              Why TwistMS Marketplace Outperforms Typical Portals
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Every listing undergoes administrative document verification before entering public syndication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-semibold text-white">Title & Deed Review</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Mandatory review of ownership deeds, tax records, and boundary surveys prior to granting the Verified Property badge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-semibold text-white">Multi-Channel Promotion</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Paid and premium listings automatically stream to official Facebook, Instagram, and TikTok media networks for viral reach.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-semibold text-white">Direct Agent Representation</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Licensed US agents and verified sellers collaborate transparently with calendar booking and instant WhatsApp communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LISTING PLANS & PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Fair Monetization Model</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Listing & Promotion Tiers
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Designed for individual homeowners, high-volume real estate agents, and land developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlight
                  ? 'glass-panel border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20 scale-105'
                  : 'glass-panel border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-[#040711] text-xs font-bold uppercase tracking-wider font-mono">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-mono">/ {plan.period}</span>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <Link
                  to="/contact"
                  className={`block text-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    plan.highlight
                      ? 'bg-cyan-400 text-[#040711] hover:bg-cyan-300 shadow-lg shadow-cyan-500/25'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-violet-950/80 border border-cyan-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Showcase Your Property to 5,000+ Buyers?
            </h2>
            <p className="text-sm text-slate-300">
              Submit your property details, upload photos and legal documentation. Our review team verifies submissions in under 24 hours.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="py-3 px-6 rounded-2xl text-xs font-bold text-[#040711] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition-all"
              >
                Submit Property for Approval →
              </Link>
              <a
                href="https://wa.me/15550199000"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-6 rounded-2xl text-xs font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Chat on WhatsApp Desk
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
