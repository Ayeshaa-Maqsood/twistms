import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertiesData } from '../data/properties';
import ScrollReveal from '../components/common/ScrollReveal';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = propertiesData.find((p) => p.id === id) || propertiesData[0];
  const [inquirySent, setInquirySent] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, documents, agent

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Navigation Breadcrumb */}
      <ScrollReveal direction="down">
        <div className="flex items-center gap-2 text-xs font-mono text-[#596638] font-bold">
          <Link to="/" className="hover:text-[#BFA668]">Marketplace</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-[#BFA668]">Properties</Link>
          <span>/</span>
          <span className="text-[#BFA668] font-extrabold">{property.id.toUpperCase()}</span>
        </div>
      </ScrollReveal>

      {/* Main Showcase Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Photo Banner with Glass Overlays */}
          <ScrollReveal direction="up">
            <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#3E4E31]/15 shadow-2xl bg-[#F4EDDA]">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2315]/95 via-[#1A2315]/30 to-transparent" />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white text-[#1A2315] shadow-md backdrop-blur-md border border-[#3E4E31]/20">
                  {property.category}
                </span>
                <span className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#3E4E31]/90 text-white shadow-md backdrop-blur-md">
                  For {property.type}
                </span>
                {property.verified && (
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white text-[#1A2315] shadow-md backdrop-blur-md flex items-center gap-1.5 border border-[#3E4E31]/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BFA668]"></span>
                    Verified Deed
                  </span>
                )}
              </div>

              {/* Title & Price overlay at bottom */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-3xl sm:text-5xl font-extrabold text-white font-editorial drop-shadow-md">
                  ${property.price.toLocaleString()}
                  {property.pricePeriod && (
                    <span className="text-sm font-sans font-medium text-white/90 ml-1">{property.pricePeriod}</span>
                  )}
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-editorial tracking-wide">
                  {property.title}
                </h1>
                <p className="text-xs font-mono text-[#D4C28E] mt-1 flex items-center gap-1 font-semibold">
                  📍 {property.address}, {property.city}, {property.stateCode} {property.zip}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Key Specs Bar */}
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-panel-luxury p-5 rounded-2xl border border-[#3E4E31]/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center bg-white shadow-md">
              <div className="border-r border-[#3E4E31]/10 last:border-0">
                <span className="block text-2xl font-extrabold text-[#1A2315] font-editorial">{property.bedrooms || '—'}</span>
                <span className="text-[10px] text-[#596638] uppercase font-mono tracking-wider font-bold">Bedrooms</span>
              </div>
              <div className="border-r border-[#3E4E31]/10 last:border-0">
                <span className="block text-2xl font-extrabold text-[#1A2315] font-editorial">{property.bathrooms || '—'}</span>
                <span className="text-[10px] text-[#596638] uppercase font-mono tracking-wider font-bold">Bathrooms</span>
              </div>
              <div className="border-r border-[#3E4E31]/10 last:border-0">
                <span className="block text-2xl font-extrabold text-[#BFA668] font-editorial">
                  {property.acreage > 0 ? `${property.acreage} AC` : property.sqft ? `${property.sqft.toLocaleString()} SF` : '—'}
                </span>
                <span className="text-[10px] text-[#596638] uppercase font-mono tracking-wider font-bold">Parcel Size</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#596638] font-editorial">100% Vetted</span>
                <span className="text-[10px] text-[#596638] uppercase font-mono tracking-wider font-bold">Deed Status</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Information Tabs */}
          <ScrollReveal direction="up" delay={150}>
            <div className="glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-[#3E4E31]/15 space-y-6 bg-white shadow-md">
              <div className="flex border-b border-[#3E4E31]/10 gap-6 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 font-bold transition-colors ${
                    activeTab === 'overview'
                      ? 'text-[#1A2315] border-b-2 border-[#BFA668]'
                      : 'text-[#596638] hover:text-[#3E4E31]'
                  }`}
                >
                  PROPERTY OVERVIEW
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`pb-3 font-bold transition-colors ${
                    activeTab === 'documents'
                      ? 'text-[#1A2315] border-b-2 border-[#BFA668]'
                      : 'text-[#596638] hover:text-[#3E4E31]'
                  }`}
                >
                  LEGAL VERIFICATION
                </button>
                <button
                  onClick={() => setActiveTab('agent')}
                  className={`pb-3 font-bold transition-colors ${
                    activeTab === 'agent'
                      ? 'text-[#1A2315] border-b-2 border-[#BFA668]'
                      : 'text-[#596638] hover:text-[#3E4E31]'
                  }`}
                >
                  ASSIGNED AGENT
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1A2315] font-editorial">Property Narrative & Features</h3>
                  <p className="text-xs sm:text-sm text-[#596638] leading-relaxed font-normal">
                    {property.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                    <div className="p-3.5 rounded-xl bg-[#F4EDDA]/60 border border-[#BFA668]/30 text-xs">
                      <span className="text-[#596638] block font-mono text-[10px] uppercase font-bold">Zoning Classification</span>
                      <span className="text-[#1A2315] font-bold">Verified Residential / Agricultural</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F4EDDA]/60 border border-[#BFA668]/30 text-xs">
                      <span className="text-[#596638] block font-mono text-[10px] uppercase font-bold">Road Access</span>
                      <span className="text-[#1A2315] font-bold">Paved County Road Frontage</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F4EDDA]/60 border border-[#BFA668]/30 text-xs">
                      <span className="text-[#596638] block font-mono text-[10px] uppercase font-bold">Utilities & Water</span>
                      <span className="text-[#1A2315] font-bold">Municipal Electric, Private Well / Septic</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F4EDDA]/60 border border-[#BFA668]/30 text-xs">
                      <span className="text-[#596638] block font-mono text-[10px] uppercase font-bold">Syndication Tier</span>
                      <span className="text-[#BFA668] font-bold">{property.plan} Verified Tier</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Legal Verification */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#F4EDDA]/60 border border-[#BFA668]/30 text-[#1A2315] text-xs">
                    <span className="font-bold text-[#3E4E31]">✓ Administrative Compliance Passed:</span> All ownership deeds, property tax receipts, and boundary surveys have been filed and vetted.
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4EDDA]/40 border border-[#BFA668]/20">
                      <span className="text-[#1A2315] font-bold">Grant Deed / Title Policy Record</span>
                      <span className="text-[#596638] font-mono text-[11px] font-extrabold">VERIFIED ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4EDDA]/40 border border-[#BFA668]/20">
                      <span className="text-[#1A2315] font-bold">County Property Tax Assessment</span>
                      <span className="text-[#596638] font-mono text-[11px] font-extrabold">CURRENT ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4EDDA]/40 border border-[#BFA668]/20">
                      <span className="text-[#1A2315] font-bold">Boundary & Topographic Survey</span>
                      <span className="text-[#596638] font-mono text-[11px] font-extrabold">ON FILE ✓</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Agent Profile */}
              {activeTab === 'agent' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#3E4E31] text-white flex items-center justify-center font-editorial font-bold text-xl">
                      {property.agent.name[0]}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1A2315] font-editorial">{property.agent.name}</h4>
                      <p className="text-xs text-[#BFA668] font-mono font-bold">{property.agent.agency}</p>
                      <p className="text-[11px] text-[#596638] font-medium">Licensed Real Estate Representative • USA</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F4EDDA]/40 border border-[#BFA668]/20 text-xs space-y-2 text-[#596638]">
                    <p>Direct Phone: <span className="text-[#1A2315] font-mono font-bold">{property.agent.phone}</span></p>
                    <p>Inquiry Email: <span className="text-[#1A2315] font-mono font-bold">{property.agent.email}</span></p>
                  </div>
                </div>
              )}

            </div>
          </ScrollReveal>

        </div>

        {/* Right Column: Inquiry / Appointment Form (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <ScrollReveal direction="up" delay={200}>
            <div className="glass-panel-luxury p-6 sm:p-7 rounded-3xl border border-[#3E4E31]/15 space-y-6 sticky top-28 bg-white shadow-xl">
              <div>
                <span className="text-[10px] font-mono text-[#BFA668] uppercase tracking-widest font-extrabold">Direct Escrow & Contact</span>
                <h3 className="text-xl font-bold text-[#1A2315] font-editorial mt-1">Schedule Consultation</h3>
                <p className="text-xs text-[#596638] mt-1 font-medium">Inquire directly with the verified listing representative.</p>
              </div>

              {inquirySent ? (
                <div className="p-5 rounded-2xl bg-[#F4EDDA] border border-[#BFA668]/40 text-center space-y-2">
                  <p className="font-bold text-sm text-[#3E4E31]">Inquiry Transmitted Successfully!</p>
                  <p className="text-[#596638] text-[11px] font-medium">The agent will reach out via email or WhatsApp within 2 hours.</p>
                  <button
                    onClick={() => setInquirySent(false)}
                    className="mt-3 text-[#BFA668] underline text-xs font-bold cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#1A2315] uppercase mb-1 font-bold">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-white text-xs text-[#1A2315] font-medium border border-[#3E4E31]/20 rounded-xl px-3.5 py-2.5 placeholder:text-[#838961] focus:outline-none focus:border-[#BFA668] shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1A2315] uppercase mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="w-full bg-white text-xs text-[#1A2315] font-medium border border-[#3E4E31]/20 rounded-xl px-3.5 py-2.5 placeholder:text-[#838961] focus:outline-none focus:border-[#BFA668] shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1A2315] uppercase mb-1 font-bold">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white text-xs text-[#1A2315] font-medium border border-[#3E4E31]/20 rounded-xl px-3.5 py-2.5 placeholder:text-[#838961] focus:outline-none focus:border-[#BFA668] shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#1A2315] uppercase mb-1 font-bold">Message or Viewing Request</label>
                    <textarea
                      rows={3}
                      placeholder={`I am interested in inspecting ${property.title}...`}
                      className="w-full bg-white text-xs text-[#1A2315] font-medium border border-[#3E4E31]/20 rounded-xl px-3.5 py-2.5 placeholder:text-[#838961] focus:outline-none focus:border-[#BFA668] shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold btn-luxury"
                  >
                    Request Appointment & Details →
                  </button>
                </form>
              )}

              {/* Quick WhatsApp Action */}
              <div className="pt-4 border-t border-[#3E4E31]/10">
                <a
                  href={`https://wa.me/15550199000?text=Hi,%20I%20am%20inquiring%20about%20TwistMS%20Property%20${property.id}%20(${encodeURIComponent(property.title)})`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold btn-luxury-outline flex items-center justify-center gap-2"
                >
                  Instant WhatsApp Agent Chat
                </a>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>

    </div>
  );
}
