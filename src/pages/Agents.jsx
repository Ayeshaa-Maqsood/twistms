import React, { useState } from 'react';
import { agentsData } from '../data/agents';

export default function Agents() {
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agentsData.filter((agent) => {
    const matchState = !selectedState || agent.stateCode === selectedState || agent.states.includes(selectedState);
    const matchQuery = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       agent.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       agent.license.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] font-bold">
          PRD §12 & §20.8 Professional Directory
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal text-[#1A202C] font-editorial">
          Verified US Real Estate Agents & Advisors
        </h1>
        <p className="text-xs text-[#64748B] font-light leading-relaxed">
          Connect directly with state-licensed real estate advisors across all 50 US states. Vetted licensure, verifiable transaction histories, and dedicated seller representation.
        </p>
      </div>

      {/* Filter / Search Controls */}
      <div className="glass-panel-luxury p-5 rounded-2xl border border-[#2C3539]/10 bg-white max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by advisor name, brokerage, or license #..."
            className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#C5A880] cursor-pointer"
          >
            <option value="">All Licensed States</option>
            <option value="TX">Texas (TX)</option>
            <option value="CO">Colorado (CO)</option>
            <option value="FL">Florida (FL)</option>
            <option value="CA">California (CA)</option>
            <option value="MT">Montana (MT)</option>
            <option value="NY">New York (NY)</option>
          </select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="glass-panel-luxury glass-card-interactive p-6 rounded-3xl border border-[#2C3539]/10 bg-white flex flex-col justify-between space-y-6"
          >
            {/* Top Identity Header */}
            <div>
              <div className="flex items-start gap-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-[#E2E3E5] shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-bold text-[#1A202C] font-editorial">{agent.name}</h3>
                    <span className="w-2 h-2 rounded-full bg-[#C5A880]" title="Verified Agent"></span>
                  </div>
                  <p className="text-xs text-[#A6885E] font-medium">{agent.agency}</p>
                  <span className="text-[10px] font-mono text-[#64748B] block mt-0.5">
                    {agent.license}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#64748B] mt-4 leading-relaxed font-light line-clamp-3">
                {agent.bio}
              </p>

              {/* Service Areas Badge Row */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {agent.states.map((st) => (
                  <span
                    key={st}
                    className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#F4ECE1] text-[#2C3539] font-medium"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Stats Matrix */}
            <div>
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FBF8F2] border border-[#2C3539]/10 text-center mb-4">
                <div>
                  <span className="block text-sm font-bold text-[#1A202C] font-editorial">★ {agent.rating}</span>
                  <span className="text-[9px] text-[#64748B] uppercase font-mono">{agent.reviewsCount} Reviews</span>
                </div>
                <div className="border-x border-[#2C3539]/10">
                  <span className="block text-sm font-bold text-[#1A202C] font-editorial">{agent.activeListings}</span>
                  <span className="text-[9px] text-[#64748B] uppercase font-mono">Listings</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-[#A6885E] font-editorial">{agent.soldCount}</span>
                  <span className="text-[9px] text-[#64748B] uppercase font-mono">Closed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/15550199000?text=Hi%20${encodeURIComponent(agent.name)},%20I%20am%20inquiring%20about%20your%20TwistMS%20advisory%20services`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxury py-2.5 px-3 rounded-xl text-[11px] font-semibold text-center"
                >
                  Book Meeting
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="btn-luxury-outline py-2.5 px-3 rounded-xl text-[11px] font-semibold text-center"
                >
                  Direct Email
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

