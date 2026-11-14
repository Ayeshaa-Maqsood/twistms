import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { propertiesData, platformStats, listingPlans } from '../data/properties';
import PropertyCard from '../components/common/PropertyCard';
import MortgageCalculator from '../components/common/MortgageCalculator';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import HeroBlueprint from '../components/sections/HeroBlueprint';
import SearchConsole from '../components/sections/SearchConsole';
import CategoryShowcase from '../components/sections/CategoryShowcase';
import ScrollReveal from '../components/common/ScrollReveal';
import SplitText from '../components/motion/SplitText';
import ImageReveal from '../components/motion/ImageReveal';
import SectionRule from '../components/motion/SectionRule';
import BlueprintLines from '../components/motion/BlueprintLines';
import ParallaxLayer from '../components/motion/ParallaxLayer';
import MagneticButton from '../components/motion/MagneticButton';
import { StaggerGroup, StaggerItem } from '../components/motion/StaggerGroup';
import { EASE, SPRING_SOFT } from '../lib/motion';

const CTA_IMG =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=70';

/** Eyebrow + masked headline + subline, consistent across homepage sections. */
function SectionHeading({ eyebrow, title, sub, align = 'left', className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} ${className}`}>
      <ScrollReveal direction="up" distance={14} duration={600}>
        <div className="text-[#B4B4B4] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">{eyebrow}</div>
      </ScrollReveal>
      <SplitText
        as="h2"
        text={title}
        inView
        stagger={0.035}
        duration={0.8}
        className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-editorial"
      />
      {sub && (
        <ScrollReveal direction="up" distance={12} duration={600} delay={200}>
          <p className={`text-sm text-[#555555] mt-2 font-medium leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>{sub}</p>
        </ScrollReveal>
      )}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
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
    // Only include filters that are actually set, e.g. /search?cat=Land&st=TX
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (activeCategory && activeCategory !== 'All') params.set('cat', activeCategory);
    if (selectedState) params.set('st', selectedState);
    const qs = params.toString();
    navigate(qs ? `/search?${qs}` : '/search');
  };

  const usStates = [
    { code: 'TX', name: 'Texas', count: '140+ Listings', tag: 'Ranches & Suburbs', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=600&q=80' },
    { code: 'CO', name: 'Colorado', count: '85+ Listings', tag: 'Mountain & Timber', img: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=600&q=80' },
    { code: 'FL', name: 'Florida', count: '115+ Listings', tag: 'Coastal & Waterfront', img: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&q=80' },
    { code: 'CA', name: 'California', count: '90+ Listings', tag: 'Tech Hubs & Estates', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80' },
    { code: 'MT', name: 'Montana', count: '45+ Listings', tag: 'Agricultural Acreage', img: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=600&q=80' },
    { code: 'NY', name: 'New York', count: '65+ Listings', tag: 'Commercial & Metro', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  ];

  const trustSteps = [
    {
      n: '01',
      title: 'Title & Deed Review',
      body: 'Mandatory check of ownership deeds, tax records, and boundary surveys prior to granting the Verified Property badge.',
    },
    {
      n: '02',
      title: 'Multi-Channel Promotion',
      body: 'Paid and premium listings automatically syndicate to official social media pipelines for targeted nationwide buyer reach.',
    },
    {
      n: '03',
      title: 'Direct Agent Representation',
      body: 'Licensed US agents and verified sellers collaborate transparently with calendar viewing slots and WhatsApp messaging.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">

      {/* =========================================================================
          1. BLUEPRINT-TO-REALITY 3D HERO (pinned scroll journey)
      ========================================================================= */}
      <div>
        <HeroBlueprint />

        {/* Marketplace search console: lands directly after the journey */}
        <SearchConsole
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        onSubmit={handleSearchSubmit}
        stats={platformStats}
      />
      </div>

      {/* =========================================================================
          2. BROWSE BY US STATE SHOWCASE (PRD §20.7)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !mt-10 sm:!mt-12" aria-labelledby="regional-heading">
        <div className="relative rounded-3xl bg-white/80 border border-[#2B2B2B]/10 shadow-[0_20px_50px_-30px_rgba(17, 17, 17,0.35)] py-10 sm:py-12 px-4 sm:px-8 overflow-hidden">
        <div aria-hidden="true" className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-48 rounded-full bg-[#B4B4B4]/15 blur-[80px] pointer-events-none" />
        <SectionHeading
          align="center"
          eyebrow="Regional Portfolios"
          title="Browse Properties by State"
          sub="Pick a state to see every home, ranch, land parcel and commercial listing we have there. Each card shows the number of active listings and the type of property the region is known for."
          className="relative mb-8"
        />

        <StaggerGroup className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto" stagger={0.07}>
          {usStates.map((st, idx) => (
            <StaggerItem key={st.code}>
              <motion.div
                role="link"
                tabIndex={0}
                aria-label={`Browse ${st.name} listings`}
                onClick={() => navigate(`/search?st=${st.code}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/search?st=${st.code}`);
                  }
                }}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={SPRING_SOFT}
                className="glow-border rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-44 relative shadow-sm hover:shadow-xl border border-[#2B2B2B]/15 bg-[#111111] transition-shadow duration-500"
              >
                <ImageReveal className="absolute inset-0" direction="up" delay={idx * 0.04} duration={1}>
                  <img
                    src={st.img}
                    alt={st.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </ImageReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/35 to-transparent" />

                <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                  <span className="self-start px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-white text-[#111111] shadow-md border border-[#2B2B2B]/10">
                    {st.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white font-editorial tracking-wide">{st.name}</h3>
                    <p className="text-[11px] text-[#D0D0D0] font-mono mt-0.5 font-semibold">{st.count}</p>
                    <p className="text-[10px] text-white/60 font-medium mt-1 max-h-0 overflow-hidden opacity-0 group-hover:max-h-6 group-hover:opacity-100 transition-all duration-500">
                      {st.tag}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="relative mt-8 text-center">
          <Link
            to="/search"
            className="link-draw text-xs font-bold text-[#111111] hover:text-[#6E6E6E] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All 50 States</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        </div>
      </section>

      {/* =========================================================================
          2b. WHAT YOU'LL FIND: scroll-linked parallax category showcase
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="showcase-heading">
        <SectionHeading
          eyebrow="What You'll Find"
          title="Homes, Land, Ranches & More"
          sub="TwistMS lists every kind of US property. Scroll through the four main categories below, then tap one to see all matching listings."
          className="mb-8"
        />
        <CategoryShowcase />
      </section>

      {/* =========================================================================
          3. FEATURED PROPERTIES
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionRule index="02" label="Featured Portfolio" className="mb-6" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeading
            eyebrow="Featured Listings"
            title="Featured Properties"
            sub="Hand-picked listings whose title, tax receipts and ownership deeds we have already checked. Use the buttons to filter by property type, or open any card for full details."
          />

          {/* Category Filter Pills with a sliding active indicator */}
          <ScrollReveal direction="up" distance={12} delay={200} duration={600}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {categories.map((c) => {
                const active = activeCategory === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(c)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors duration-300 cursor-pointer ${
                      active
                        ? 'text-white'
                        : 'bg-white text-[#555555] border border-[#2B2B2B]/20 hover:text-[#111111] hover:border-[#B4B4B4]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="home-category-pill"
                        className="absolute inset-0 rounded-xl bg-[#2B2B2B] shadow-md"
                        transition={SPRING_SOFT}
                      />
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Property Grid: staggered reveal on scroll, smooth reflow on filter change */}
        <motion.div layout className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    duration: 0.75,
                    ease: EASE,
                    delay: (idx % 6) * 0.07,
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
                className="col-span-full py-16 text-center glass-panel-luxury rounded-3xl border border-[#2B2B2B]/15"
              >
                <p className="text-[#555555] text-sm font-medium">No properties match your current filters.</p>
                <button
                  onClick={() => { setActiveCategory('All'); setSearchTerm(''); setSelectedState(''); }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold btn-luxury"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <ScrollReveal direction="up" delay={200}>
          <div className="mt-12 text-center">
            <MagneticButton>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold btn-luxury-outline"
              >
                Explore Complete 500+ Property Database →
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          4. VERIFICATION & TRUST FRAMEWORK (PRD §10)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionRule index="03" label="Trust & Escrow Protocol" className="mb-6" />

        <ScrollReveal direction="up">
          <div className="glass-panel-luxury p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#2B2B2B]/15 relative overflow-hidden bg-white">
            {/* Blueprint line drawing, revealed on scroll */}
            <BlueprintLines variant="plan" tone="dark" className="hidden md:block" />
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#B4B4B4]/10 blur-[90px] pointer-events-none" />

            <div className="relative z-10">
              <div className="max-w-2xl mb-8">
                <SectionHeading
                  eyebrow="How We Verify Listings"
                  title="Three Checks Before Any Property Goes Live"
                  sub="Every listing passes these steps before buyers can see it, so you know the seller really owns the property and the details are accurate."
                />
              </div>

              <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
                {trustSteps.map((step) => (
                  <StaggerItem key={step.n}>
                    <motion.div
                      whileHover={reduce ? undefined : { y: -4 }}
                      transition={SPRING_SOFT}
                      className="glow-border h-full p-6 rounded-2xl bg-[#EFEFEF]/40 border border-[#B4B4B4]/20 hover:shadow-lg transition-shadow duration-500 group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFEFEF] text-[#2B2B2B] flex items-center justify-center font-bold text-sm font-mono border border-[#B4B4B4]/30 group-hover:bg-[#2B2B2B] group-hover:text-[#EFEFEF] transition-colors duration-500">
                          {step.n}
                        </div>
                        <span className="h-px flex-1 bg-gradient-to-r from-[#B4B4B4]/50 to-transparent" />
                      </div>
                      <h3 className="text-lg font-bold text-[#111111] font-editorial">{step.title}</h3>
                      <p className="text-xs text-[#555555] mt-2 leading-relaxed font-medium">{step.body}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          5. FINANCIAL CALCULATOR & CLIENT TESTIMONIALS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionRule index="04" label="Financial Instruments" className="mb-6" />
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
        <SectionRule index="05" label="Listing Packages" className="mb-6" />

        <SectionHeading
          align="center"
          eyebrow="Transparent Monetization"
          title="Listing Packages & Syndication Tiers"
          sub="Choose how long your listing stays live and how widely we promote it. Start free for 45 days, or upgrade for a verified badge and social media promotion."
          className="max-w-3xl mb-12"
        />

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" stagger={0.12}>
          {listingPlans.map((plan, idx) => (
            <StaggerItem key={idx} className="h-full">
              <motion.div
                whileHover={reduce ? undefined : { y: -8 }}
                transition={SPRING_SOFT}
                style={{ scale: plan.highlight ? 1.04 : 1 }}
                className={`glow-border rounded-3xl p-8 flex flex-col justify-between relative h-full transition-shadow duration-500 ${
                  plan.highlight
                    ? 'is-active glass-panel-luxury border border-[#B4B4B4] shadow-2xl bg-white'
                    : 'glass-panel-luxury border border-[#2B2B2B]/15 shadow-sm hover:shadow-xl bg-white'
                }`}
              >
                {plan.highlight && (
                  <>
                    <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#B4B4B4] to-transparent" />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#2B2B2B] text-white text-[10px] font-bold uppercase tracking-widest font-mono shadow-md">
                      {plan.badge}
                    </div>
                  </>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[#111111] font-editorial">{plan.name}</h3>
                  <p className="text-xs text-[#555555] mt-1 font-medium">{plan.description}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#111111] font-editorial">{plan.price}</span>
                    <span className="text-xs text-[#555555] font-mono font-bold">/ {plan.period}</span>
                  </div>

                  <div className="mt-8 space-y-3">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#111111] font-medium">
                        <svg className="w-4 h-4 text-[#B4B4B4] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#2B2B2B]/10">
                  <Link
                    to="/contact"
                    className={`block text-center py-3 px-4 rounded-xl text-xs font-bold ${plan.highlight ? 'btn-luxury' : 'btn-luxury-outline'}`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* =========================================================================
          7. CALL TO ACTION BANNER: parallax photography, drifting gradient, blueprint frame
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale" duration={800}>
          <div className="relative rounded-3xl overflow-hidden text-white shadow-2xl border border-[#555555]/60 bg-[#111111]">
            <ParallaxLayer amount={-45} className="absolute inset-0" innerClassName="h-[125%] -mt-[12%]">
              <img src={CTA_IMG} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </ParallaxLayer>
            <div className="absolute inset-0 gradient-drift bg-gradient-to-br from-[#111111]/95 via-[#2B2B2B]/80 to-[#0A0A0A]/92" />
            <div className="absolute inset-0 grid-fine-light grid-drift opacity-70 pointer-events-none" />
            <div className="absolute -left-20 bottom-0 w-96 h-96 rounded-full bg-[#B4B4B4]/15 blur-[110px] ambient-pulse pointer-events-none" />
            <BlueprintLines variant="corners" tone="light" />

            <div className="relative z-10 p-10 sm:p-16 text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <SplitText
                  as="h2"
                  text="Ready to Syndicate Your Property to 5,000+ Buyers?"
                  inView
                  stagger={0.04}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight font-editorial text-balance"
                />
                <ScrollReveal direction="up" distance={14} delay={300}>
                  <p className="text-sm text-[#D0D0D0] font-medium leading-relaxed">
                    Submit your property details, upload photos, and attach ownership documentation. Our review desk verifies submissions in under 24 hours.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" distance={14} delay={450}>
                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <MagneticButton>
                      <Link
                        to="/submit"
                        className="inline-block py-3 px-6 rounded-xl text-xs font-bold bg-[#B4B4B4] text-[#111111] hover:bg-[#E0E0E0] transition-colors duration-300 shadow-lg shadow-black/20"
                      >
                        Submit Property for Approval →
                      </Link>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href="https://wa.me/15550199000"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost-light inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs"
                      >
                        Chat on WhatsApp Desk
                      </a>
                    </MagneticButton>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
