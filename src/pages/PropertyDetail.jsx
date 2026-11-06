import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertiesData } from '../data/properties';

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
      <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
        <Link to="/" className="hover:text-[#1A202C]">Marketplace</Link>
        <span>/</span>
        <Link to="/search" className="hover:text-[#1A202C]">Properties</Link>
        <span>/</span>
        <span className="text-[#C5A880] font-semibold">{property.id.toUpperCase()}</span>
      </div>

      {/* Main Showcase Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Photo Banner with Glass Overlays */}
          <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#2C3539]/10 shadow-2xl bg-[#E2E3E5]">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/90 via-[#1A202C]/20 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#FFFFFF]/95 text-[#1A202C] shadow-sm backdrop-blur-md">
                {property.category}
              </span>
              <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#F4ECE1]/95 text-[#64748B] shadow-sm backdrop-blur-md">
                For {property.type}
              </span>
              {property.verified && (
                <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#FFFFFF]/95 text-[#1A202C] shadow-sm backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
                  Verified Deed
                </span>
              )}
            </div>

            {/* Title & Price overlay at bottom */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-3xl sm:text-5xl font-normal text-white font-editorial drop-shadow-md">
                ${property.price.toLocaleString()}
                {property.pricePeriod && (
                  <span className="text-sm font-sans font-normal text-white/90 ml-1">{property.pricePeriod}</span>
                )}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 font-editorial tracking-wide">
                {property.title}
              </h1>
              <p className="text-xs font-mono text-[#D8C29D] mt-1 flex items-center gap-1">
                📍 {property.address}, {property.city}, {property.stateCode} {property.zip}
              </p>
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="glass-panel-luxury p-5 rounded-2xl border border-[#2C3539]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center bg-white">
            <div className="border-r border-[#2C3539]/10 last:border-0">
              <span className="block text-2xl font-bold text-[#1A202C] font-editorial">{property.bedrooms || '—'}</span>
              <span className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider">Bedrooms</span>
            </div>
            <div className="border-r border-[#2C3539]/10 last:border-0">
              <span className="block text-2xl font-bold text-[#1A202C] font-editorial">{property.bathrooms || '—'}</span>
              <span className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider">Bathrooms</span>
            </div>
            <div className="border-r border-[#2C3539]/10 last:border-0">
              <span className="block text-2xl font-bold text-[#A6885E] font-editorial">
                {property.acreage > 0 ? `${property.acreage} AC` : property.sqft ? `${property.sqft.toLocaleString()} SF` : '—'}
              </span>
              <span className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider">Parcel Size</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#1A202C] font-editorial">100% Vetted</span>
              <span className="text-[10px] text-[#64748B] uppercase font-mono tracking-wider">Deed Status</span>
            </div>
          </div>

          {/* Interactive Information Tabs */}
          <div className="glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-[#2C3539]/10 space-y-6 bg-white">
            <div className="flex border-b border-[#2C3539]/10 gap-6 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'text-[#1A202C] border-b-2 border-[#C5A880]'
                    : 'text-[#64748B] hover:text-[#1A202C]'
                }`}
              >
                PROPERTY OVERVIEW
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === 'documents'
                    ? 'text-[#1A202C] border-b-2 border-[#C5A880]'
                    : 'text-[#64748B] hover:text-[#1A202C]'
                }`}
              >
                LEGAL VERIFICATION
              </button>
              <button
                onClick={() => setActiveTab('agent')}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === 'agent'
                    ? 'text-[#1A202C] border-b-2 border-[#C5A880]'
                    : 'text-[#64748B] hover:text-[#1A202C]'
                }`}
              >
                ASSIGNED AGENT
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-[#1A202C] font-editorial">Property Narrative & Features</h3>
                <p className="text-xs sm:text-sm text-[#2C3539] leading-relaxed font-light">
                  {property.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3.5 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10 text-xs">
                    <span className="text-[#64748B] block font-mono text-[10px] uppercase">Zoning Classification</span>
                    <span className="text-[#1A202C] font-semibold">Verified Residential / Agricultural</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10 text-xs">
                    <span className="text-[#64748B] block font-mono text-[10px] uppercase">Road Access</span>
                    <span className="text-[#1A202C] font-semibold">Paved County Road Frontage</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10 text-xs">
                    <span className="text-[#64748B] block font-mono text-[10px] uppercase">Utilities & Water</span>
                    <span className="text-[#1A202C] font-semibold">Municipal Electric, Private Well / Septic</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10 text-xs">
                    <span className="text-[#64748B] block font-mono text-[10px] uppercase">Syndication Tier</span>
                    <span className="text-[#A6885E] font-semibold">{property.plan} Verified Tier</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Legal Verification */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F4ECE1] border border-[#C5A880]/30 text-[#1A202C] text-xs">
                  <span className="font-bold">✓ Administrative Compliance Passed:</span> All ownership deeds, property tax receipts, and boundary surveys have been filed and vetted.
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10">
                    <span className="text-[#1A202C] font-medium">Grant Deed / Title Policy Record</span>
                    <span className="text-[#A6885E] font-mono text-[11px] font-bold">VERIFIED ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10">
                    <span className="text-[#1A202C] font-medium">County Property Tax Assessment</span>
                    <span className="text-[#A6885E] font-mono text-[11px] font-bold">CURRENT ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F2] border border-[#2C3539]/10">
                    <span className="text-[#1A202C] font-medium">Boundary & Topographic Survey</span>
                    <span className="text-[#A6885E] font-mono text-[11px] font-bold">ON FILE ✓</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Agent Profile */}
            {activeTab === 'agent' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A202C] text-[#FBF8F2] flex items-center justify-center font-editorial font-bold text-xl">
                    {property.agent.name[0]}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1A202C] font-editorial">{property.agent.name}</h4>
                    <p className="text-xs text-[#A6885E] font-mono font-medium">{property.agent.agency}</p>
                    <p className="text-[11px] text-[#64748B]">Licensed Real Estate Representative • USA</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#2C3539]/10 text-xs space-y-2 text-[#2C3539]">
                  <p>Direct Phone: <span className="text-[#1A202C] font-mono font-semibold">{property.agent.phone}</span></p>
                  <p>Inquiry Email: <span className="text-[#1A202C] font-mono font-semibold">{property.agent.email}</span></p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Inquiry / Appointment Form (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-luxury p-6 sm:p-7 rounded-3xl border border-[#2C3539]/10 space-y-6 sticky top-28 bg-white">
            <div>
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold">Direct Escrow & Contact</span>
              <h3 className="text-xl font-normal text-[#1A202C] font-editorial mt-1">Schedule Consultation</h3>
              <p className="text-xs text-[#64748B] mt-1 font-light">Inquire directly with the verified listing representative.</p>
            </div>

            {inquirySent ? (
              <div className="p-5 rounded-2xl bg-[#F4ECE1] border border-[#C5A880]/30 text-center space-y-2">
                <p className="font-bold text-sm text-[#1A202C]">Inquiry Transmitted Successfully!</p>
                <p className="text-[#64748B] text-[11px]">The agent will reach out via email or WhatsApp within 2 hours.</p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="mt-3 text-[#A6885E] underline text-xs font-semibold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-[#64748B] uppercase mb-1 font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-2.5 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#64748B] uppercase mb-1 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-2.5 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#64748B] uppercase mb-1 font-semibold">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-2.5 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#64748B] uppercase mb-1 font-semibold">Message or Viewing Request</label>
                  <textarea
                    rows={3}
                    placeholder={`I am interested in inspecting ${property.title}...`}
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-2.5 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold btn-luxury"
                >
                  Request Appointment & Details →
                </button>
              </form>
            )}

            {/* Quick WhatsApp Action */}
            <div className="pt-4 border-t border-[#2C3539]/10">
              <a
                href={`https://wa.me/15550199000?text=Hi,%20I%20am%20inquiring%20about%20TwistMS%20Property%20${property.id}%20(${encodeURIComponent(property.title)})`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold btn-luxury-outline flex items-center justify-center gap-2"
              >
                Instant WhatsApp Agent Chat
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
