import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertiesData, platformStats, listingPlans } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';
import InteractiveWaveCanvas from '../components/common/InteractiveWaveCanvas';

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

  const usStates = [
    { code: 'TX', name: 'Texas', count: '140+ Listings', tag: 'Ranches & Suburbs', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=600&q=80' },
    { code: 'CO', name: 'Colorado', count: '85+ Listings', tag: 'Mountain & Timber', img: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=600&q=80' },
    { code: 'FL', name: 'Florida', count: '115+ Listings', tag: 'Coastal & Waterfront', img: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&q=80' },
    { code: 'CA', name: 'California', count: '90+ Listings', tag: 'Tech Hubs & Estates', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80' },
    { code: 'MT', name: 'Montana', count: '45+ Listings', tag: 'Agricultural Acreage', img: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=600&q=80' },
    { code: 'NY', name: 'New York', count: '65+ Listings', tag: 'Commercial & Metro', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-28 pb-20">
      
      {/* =========================================================================
          1. HERO SECTION WITH INTERACTIVE WAVE CANVAS & GLASSMORPHIC HUD
      ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
        
        {/* INTERACTIVE PHYSICS WAVE & PARTICLE CANVAS */}
        <InteractiveWaveCanvas />

        {/* Ambient Radial Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-500/25 via-violet-600/20 to-pink-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Glass Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-subtle border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-2xl shadow-lg shadow-cyan-500/10 hover:border-cyan-400/60 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>USA REAL ESTATE MARKETPLACE • ALL 50 STATES</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
            Digital Real Estate, <br />
            <span className="text-gradient-cyan">Considered & Verified.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Move mouse to interact with the quantum field. Discover residential sanctuaries, commercial powerhouses, and sprawling timberland with 100% vetted deeds.
          </p>

          {/* Ultra Glassmorphic Search Console */}
          <div className="mt-12 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="glass-panel p-3.5 sm:p-5 rounded-3xl border border-white/15 shadow-2xl shadow-cyan-500/10 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center relative z-20 backdrop-blur-2xl"
            >
              {/* Category Dropdown */}
              <div className="sm:col-span-3">
                <div className="relative">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full bg-slate-900/80 text-xs text-white border border-white/10 rounded-2xl px-3.5 py-3.5 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-slate-950 text-white">
                        {c === 'All' ? 'All Categories' : c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Keyword / City Search Input */}
              <div className="sm:col-span-4">
                <input
                  type="text"
                  placeholder="City, ZIP, or landmark (e.g. Austin, Aspen)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900/80 text-xs text-white border border-white/10 rounded-2xl px-4 py-3.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 backdrop-blur-md transition-colors"
                />
              </div>

              {/* State Filter */}
              <div className="sm:col-span-3">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-900/80 text-xs text-white border border-white/10 rounded-2xl px-3.5 py-3.5 focus:outline-none focus:border-cyan-400 backdrop-blur-md cursor-pointer transition-colors"
                >
                  <option value="" className="bg-slate-950 text-white">All 50 US States</option>
                  <option value="TX" className="bg-slate-950 text-white">Texas (TX)</option>
                  <option value="CO" className="bg-slate-950 text-white">Colorado (CO)</option>
                  <option value="FL" className="bg-slate-950 text-white">Florida (FL)</option>
                  <option value="CA" className="bg-slate-950 text-white">California (CA)</option>
                  <option value="MT" className="bg-slate-950 text-white">Montana (MT)</option>
                  <option value="NY" className="bg-slate-950 text-white">New York (NY)</option>
                </select>
              </div>

              {/* Glowing Search CTA */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold glow-btn flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Inspect
                </button>
              </div>
            </form>
          </div>

          {/* Telemetry Counter Strip */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-colors text-center backdrop-blur-xl">
                <p className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">{stat.value}</p>
                <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-mono">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. BROWSE BY US STATE SHOWCASE (PRD §20.7)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1.5">Territory Telemetry</div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Explore Prime US Regions</h2>
            <p className="text-xs text-slate-400 mt-1">Direct access to state-regulated deeds and regional MLS listings.</p>
          </div>
          <Link
            to="/search"
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5"
          >
            <span>View All 50 States</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {usStates.map((st) => (
            <div
              key={st.code}
              onClick={() => navigate(`/search?st=${st.code}`)}
              className="glass-panel glass-panel-interactive rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-cyan-400/50 flex flex-col h-44 relative"
            >
              <img
                src={st.img}
                alt={st.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-40 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
              
              <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                <span className="self-start px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {st.code}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {st.name}
                  </h3>
                  <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{st.count}</p>
                  <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">{st.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED PROPERTIES WITH GLASSMORPHIC CARDS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Verified US Listings</div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Featured Marketplace Portfolio</h2>
            <p className="text-sm text-slate-400 mt-1">Directly vetted titles and legal verification records.</p>
          </div>

          {/* Glass Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-xl ${
                  activeCategory === c
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#030712] shadow-lg shadow-cyan-500/25'
                    : 'glass-panel-subtle text-slate-300 hover:text-white hover:border-cyan-400/40'
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold text-white glass-panel hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all shadow-xl"
          >
            Explore Complete 500+ Property Database →
          </Link>
        </div>
      </section>

      {/* =========================================================================
          4. VERIFICATION & TRUST FRAMEWORK (PRD §10)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/15 blur-[120px] pointer-events-none" />
          
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
            <div className="p-6 rounded-2xl glass-panel-subtle border border-white/10 hover:border-cyan-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-semibold text-white">Title & Deed Review</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Mandatory review of ownership deeds, tax records, and boundary surveys prior to granting the Verified Property badge.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-subtle border border-white/10 hover:border-violet-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-semibold text-white">Multi-Channel Promotion</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Paid and premium listings automatically stream to official Facebook, Instagram, and TikTok media networks for viral reach.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-400/30 transition-colors">
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

      {/* =========================================================================
          5. LISTING PLANS & PRICING
      ========================================================================= */}
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
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative backdrop-blur-2xl ${
                plan.highlight
                  ? 'glass-panel border-2 border-cyan-400 shadow-2xl shadow-cyan-500/25 scale-105'
                  : 'glass-panel border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-[#030712] text-xs font-bold uppercase tracking-wider font-mono shadow-md shadow-cyan-400/30">
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
                      ? 'glow-btn'
                      : 'glass-panel-subtle text-white hover:border-cyan-400/40'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. CALL TO ACTION BANNER
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-14 glass-panel border border-cyan-500/30 text-center relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-600/10 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Showcase Your Property to 5,000+ Buyers?
            </h2>
            <p className="text-sm text-slate-300">
              Submit your property details, upload photos and legal documentation. Our review team verifies submissions in under 24 hours.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="py-3 px-6 rounded-2xl text-xs font-bold glow-btn transition-all"
              >
                Submit Property for Approval →
              </Link>
              <a
                href="https://wa.me/15550199000"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-6 rounded-2xl text-xs font-bold text-white glass-panel-subtle hover:border-emerald-400/40 transition-all flex items-center gap-2"
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
