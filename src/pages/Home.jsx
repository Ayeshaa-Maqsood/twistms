import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertiesData, platformStats, listingPlans } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';
import InteractiveWaveCanvas from '../components/common/InteractiveWaveCanvas';
import MortgageCalculator from '../components/common/MortgageCalculator';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AnimatedCounter from '../components/common/AnimatedCounter';
import ScrollReveal from '../components/common/ScrollReveal';

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
          1. HERO SECTION WITH CHAMPAGNE INTERACTIVE WAVE CANVAS & HIGH CONTRAST
      ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        
        {/* INTERACTIVE PHYSICS WAVE & PARTICLE CANVAS */}
        <InteractiveWaveCanvas />

        {/* Soft Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-100/40 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* High-Contrast Nationwide Pill */}
          <ScrollReveal direction="down" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-warm text-[#0F172A] text-xs font-semibold mb-8 shadow-sm border border-stone-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-widest uppercase font-mono text-[11px] text-[#0F172A] font-bold">
                USA Nationwide Marketplace • All 50 States
              </span>
            </div>
          </ScrollReveal>

          {/* Hero Headline: Redesigned modern, high-contrast, bold, distinct (No Beige!) */}
          <ScrollReveal direction="up" delay={100} duration={750}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] max-w-5xl mx-auto leading-[1.08] font-editorial">
              Architectural Living, <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0284C7] font-black">
                  Verified & Engineered Across America.
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 rounded-full opacity-80" />
              </span>
            </h1>

            <p className="mt-7 text-base sm:text-lg text-[#334155] max-w-2xl mx-auto font-medium leading-relaxed">
              Curating premier residential sanctuaries, high-yield commercial assets, and sprawling timberland with verified ownership deeds across America.
            </p>
          </ScrollReveal>

          {/* Frosted Alabaster Glass Search Console with Scroll Reveal */}
          <ScrollReveal direction="up" delay={200} duration={700}>
            <div className="mt-12 max-w-4xl mx-auto">
              <form
                onSubmit={handleSearchSubmit}
                className="glass-panel-luxury p-3 sm:p-4 rounded-3xl shadow-xl shadow-stone-900/5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center relative z-20 border border-slate-300"
              >
                {/* Category Dropdown */}
                <div className="sm:col-span-3">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full bg-[#FFFFFF] text-xs text-[#0F172A] font-semibold border border-slate-300 rounded-2xl px-3.5 py-3.5 focus:outline-none focus:border-[#0284C7] cursor-pointer shadow-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-white text-[#0F172A]">
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
                    className="w-full bg-[#FFFFFF] text-xs text-[#0F172A] font-medium border border-slate-300 rounded-2xl px-4 py-3.5 placeholder:text-[#64748B] focus:outline-none focus:border-[#0284C7] shadow-sm"
                  />
                </div>

                {/* State Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-[#FFFFFF] text-xs text-[#0F172A] font-semibold border border-slate-300 rounded-2xl px-3.5 py-3.5 focus:outline-none focus:border-[#0284C7] cursor-pointer shadow-sm"
                  >
                    <option value="" className="bg-white text-[#0F172A]">All 50 US States</option>
                    <option value="TX" className="bg-white text-[#0F172A]">Texas (TX)</option>
                    <option value="CO" className="bg-white text-[#0F172A]">Colorado (CO)</option>
                    <option value="FL" className="bg-white text-[#0F172A]">Florida (FL)</option>
                    <option value="CA" className="bg-white text-[#0F172A]">California (CA)</option>
                    <option value="MT" className="bg-white text-[#0F172A]">Montana (MT)</option>
                    <option value="NY" className="bg-white text-[#0F172A]">New York (NY)</option>
                  </select>
                </div>

                {/* Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold btn-luxury flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>

          {/* Telemetry Stats Strip with Animated Number Counters */}
          <ScrollReveal direction="up" delay={300} duration={700}>
            <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {platformStats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-panel-luxury p-5 rounded-2xl border border-slate-200 text-center hover:border-sky-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <p className="text-3xl font-extrabold font-editorial text-[#0F172A] tracking-tight group-hover:text-[#0284C7] transition-colors">
                    <AnimatedCounter target={stat.value} />
                  </p>
                  <p className="text-[11px] text-[#334155] mt-1.5 uppercase tracking-wider font-mono font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          2. BROWSE BY US STATE SHOWCASE (PRD §20.7) WITH STAGGERED SCROLL REVEAL
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-blue-700 text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
                Regional Portfolios
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-editorial">
                Explore Prime US Territories
              </h2>
              <p className="text-xs text-[#334155] mt-1 font-medium">
                Direct access to state-regulated deeds and regional MLS syndications.
              </p>
            </div>
            <Link
              to="/search"
              className="text-xs font-bold text-[#0F172A] hover:text-[#0284C7] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All 50 States</span>
              <span>→</span>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {usStates.map((st, idx) => (
            <ScrollReveal key={st.code} direction="up" delay={idx * 75} duration={600}>
              <div
                onClick={() => navigate(`/search?st=${st.code}`)}
                className="glass-panel-luxury glass-card-interactive rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-44 relative shadow-sm hover:shadow-xl border border-slate-200"
              >
                <img
                  src={st.img}
                  alt={st.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-65 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/40 to-transparent" />
                
                <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                  <span className="self-start px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-[#FFFFFF] text-[#0F172A] shadow-md border border-slate-200">
                    {st.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white font-editorial tracking-wide">
                      {st.name}
                    </h3>
                    <p className="text-[11px] text-sky-200 font-mono mt-0.5 font-semibold">{st.count}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED PROPERTIES WITH SCROLL REVEAL & CRISP HIGH-CONTRAST CARDS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-blue-700 text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
                Vetted Acquisitions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-editorial">
                Featured Marketplace Portfolio
              </h2>
              <p className="text-xs text-[#334155] mt-1 font-medium">
                Directly vetted titles, tax receipts, and ownership deeds.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeCategory === c
                      ? 'bg-[#0F172A] text-white shadow-md'
                      : 'bg-white text-[#334155] border border-slate-300 hover:text-[#0F172A] hover:border-[#0284C7]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Property Grid with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop, idx) => (
              <ScrollReveal key={prop.id} direction="up" delay={(idx % 6) * 100} duration={650}>
                <PropertyCard property={prop} />
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-16 text-center glass-panel-luxury rounded-3xl border border-slate-200">
              <p className="text-[#334155] text-sm font-medium">No properties match your current filters.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchTerm(''); setSelectedState(''); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold btn-luxury"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        <ScrollReveal direction="up" delay={200}>
          <div className="mt-12 text-center">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold btn-luxury-outline"
            >
              Explore Complete 500+ Property Database →
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          4. VERIFICATION & TRUST FRAMEWORK (PRD §10) WITH SCROLL ENTRANCE
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="glass-panel-luxury p-8 sm:p-14 rounded-3xl border border-slate-200 relative overflow-hidden bg-[#FFFFFF]">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold">
                Trust & Escrow Protocol
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-2 font-editorial">
                Administrative Verification for American Real Estate
              </h2>
              <p className="text-sm text-[#334155] mt-2 font-normal leading-relaxed">
                Every listing undergoes rigorous administrative document verification before entering public marketplace syndication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm mb-4 font-mono border border-blue-200">
                  01
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] font-editorial">Title & Deed Review</h3>
                <p className="text-xs text-[#334155] mt-2 leading-relaxed font-medium">
                  Mandatory check of ownership deeds, tax records, and boundary surveys prior to granting the Verified Property badge.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm mb-4 font-mono border border-blue-200">
                  02
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] font-editorial">Multi-Channel Promotion</h3>
                <p className="text-xs text-[#334155] mt-2 leading-relaxed font-medium">
                  Paid and premium listings automatically syndicate to official social media pipelines for targeted nationwide buyer reach.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-sm mb-4 font-mono border border-blue-200">
                  03
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] font-editorial">Direct Agent Representation</h3>
                <p className="text-xs text-[#334155] mt-2 leading-relaxed font-medium">
                  Licensed US agents and verified sellers collaborate transparently with calendar viewing slots and WhatsApp messaging.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          5. FINANCIAL CALCULATOR & CLIENT TESTIMONIALS WITH SCROLL DELIGHT
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={700}>
          <MortgageCalculator defaultPrice={1850000} />
        </ScrollReveal>
      </section>

      <ScrollReveal direction="up" duration={700}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* =========================================================================
          6. LISTING PLANS & PRICING
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-blue-700 text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
              Transparent Monetization
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-editorial">
              Listing Packages & Syndication Tiers
            </h2>
            <p className="text-xs text-[#334155] mt-2 font-medium">
              Designed for individual property owners, high-volume brokers, and land developers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listingPlans.map((plan, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 120} duration={650}>
              <div
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative h-full ${
                  plan.highlight
                    ? 'glass-panel-luxury border-2 border-sky-600 shadow-2xl scale-105 bg-[#FFFFFF]'
                    : 'glass-panel-luxury border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-xl bg-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-widest font-mono shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] font-editorial">{plan.name}</h3>
                  <p className="text-xs text-[#334155] mt-1 font-medium">{plan.description}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#0F172A] font-editorial">{plan.price}</span>
                    <span className="text-xs text-[#475569] font-mono font-bold">/ {plan.period}</span>
                  </div>

                  <div className="mt-8 space-y-3">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#1E293B] font-medium">
                        <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <Link
                    to="/contact"
                    className={`block text-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                      plan.highlight
                        ? 'btn-luxury'
                        : 'btn-luxury-outline'
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. CALL TO ACTION BANNER WITH AMBIENT SCALE REVEAL
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale" duration={700}>
          <div className="rounded-3xl p-10 sm:p-14 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-center relative overflow-hidden text-white shadow-2xl border border-slate-700">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-editorial">
                Ready to Syndicate Your Property to 5,000+ Buyers?
              </h2>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                Submit your property details, upload photos, and attach ownership documentation. Our review desk verifies submissions in under 24 hours.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  to="/submit"
                  className="py-3 px-6 rounded-xl text-xs font-bold bg-white text-[#0F172A] hover:bg-sky-50 transition-all shadow-lg"
                >
                  Submit Property for Approval →
                </Link>
                <a
                  href="https://wa.me/15550199000"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-6 rounded-xl text-xs font-bold text-white border border-white/40 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Chat on WhatsApp Desk
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
