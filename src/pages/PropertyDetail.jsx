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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link to="/" className="hover:text-cyan-300">Home</Link>
        <span>/</span>
        <Link to="/search" className="hover:text-cyan-300">Search</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">{property.id.toUpperCase()}</span>
      </div>

      {/* Main Showcase Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Photo Banner with Glass Overlays */}
          <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-90" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                {property.category}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-400/30 backdrop-blur-md">
                For {property.type}
              </span>
              {property.verified && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md flex items-center gap-1">
                  ✓ Verified Deed
                </span>
              )}
            </div>

            {/* Title & Price overlay at bottom */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">
                ${property.price.toLocaleString()}
                {property.pricePeriod && (
                  <span className="text-sm font-normal text-slate-300 ml-1">{property.pricePeriod}</span>
                )}
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {property.title}
              </h1>
              <p className="text-xs font-mono text-cyan-400 mt-1 flex items-center gap-1">
                📍 {property.address}, {property.city}, {property.stateCode} {property.zip}
              </p>
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="border-r border-white/5 last:border-0">
              <span className="block text-xl font-bold text-white font-mono">{property.bedrooms || '—'}</span>
              <span className="text-[11px] text-slate-400 uppercase font-mono">Bedrooms</span>
            </div>
            <div className="border-r border-white/5 last:border-0">
              <span className="block text-xl font-bold text-white font-mono">{property.bathrooms || '—'}</span>
              <span className="text-[11px] text-slate-400 uppercase font-mono">Bathrooms</span>
            </div>
            <div className="border-r border-white/5 last:border-0">
              <span className="block text-xl font-bold text-cyan-300 font-mono">
                {property.acreage > 0 ? `${property.acreage} AC` : property.sqft ? `${property.sqft.toLocaleString()} SF` : '—'}
              </span>
              <span className="text-[11px] text-slate-400 uppercase font-mono">Parcel Size</span>
            </div>
            <div>
              <span className="block text-xl font-bold text-emerald-300 font-mono">100% Vetted</span>
              <span className="text-[11px] text-slate-400 uppercase font-mono">Deed Status</span>
            </div>
          </div>

          {/* Interactive Information Tabs */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex border-b border-white/10 gap-6 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PROPERTY OVERVIEW
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === 'documents'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LEGAL VERIFICATION
              </button>
              <button
                onClick={() => setActiveTab('agent')}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === 'agent'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ASSIGNED AGENT
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Property Narrative & Features</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {property.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-400 block font-mono">Zoning Classification</span>
                    <span className="text-white font-medium">Verified Residential / Agricultural</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-400 block font-mono">Road Access</span>
                    <span className="text-white font-medium">Paved County Road Frontage</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-400 block font-mono">Utilities & Water</span>
                    <span className="text-white font-medium">Municipal Electric, Private Well / Septic</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-slate-400 block font-mono">Listing Tier</span>
                    <span className="text-cyan-300 font-medium">{property.plan} Verified Tier</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Legal Verification */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                  <span className="font-bold">✓ Administrative Compliance Passed:</span> All ownership deeds, property tax receipts, and boundary surveys have been filed and vetted.
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-300">Grant Deed / Title Policy Record</span>
                    <span className="text-emerald-400 font-mono text-[11px]">VERIFIED ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-300">County Property Tax Assessment</span>
                    <span className="text-emerald-400 font-mono text-[11px]">CURRENT ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-300">Boundary & Topographic Survey</span>
                    <span className="text-emerald-400 font-mono text-[11px]">ON FILE ✓</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Agent Profile */}
            {activeTab === 'agent' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                    {property.agent.name[0]}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{property.agent.name}</h4>
                    <p className="text-xs text-cyan-400 font-mono">{property.agent.agency}</p>
                    <p className="text-[11px] text-slate-400">Licensed Real Estate Agent • USA</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs space-y-2 text-slate-300">
                  <p>Direct Phone: <span className="text-white font-mono">{property.agent.phone}</span></p>
                  <p>Inquiry Email: <span className="text-white font-mono">{property.agent.email}</span></p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Inquiry / Appointment Form (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6 sticky top-28">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Direct Escrow & Contact</span>
              <h3 className="text-xl font-bold text-white mt-1">Schedule Consultation</h3>
              <p className="text-xs text-slate-400 mt-1">Inquire directly with the verified listing representative.</p>
            </div>

            {inquirySent ? (
              <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-2">
                <p className="font-bold text-sm">Inquiry Transmitted Successfully!</p>
                <p className="text-slate-300 text-[11px]">The agent will reach out via email or WhatsApp within 2 hours.</p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="mt-3 text-cyan-300 underline text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Message or Viewing Request</label>
                  <textarea
                    rows={3}
                    placeholder={`I am interested in inspecting ${property.title}...`}
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#040711] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition-all"
                >
                  Request Appointment & Details →
                </button>
              </form>
            )}

            {/* Quick WhatsApp Action */}
            <div className="pt-4 border-t border-white/5">
              <a
                href={`https://wa.me/15550199000?text=Hi,%20I%20am%20inquiring%20about%20TwistMS%20Property%20${property.id}%20(${encodeURIComponent(property.title)})`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
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
