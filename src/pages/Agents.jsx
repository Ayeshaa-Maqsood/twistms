import React, { useState } from 'react';
import { agentsData } from '../data/agents';
import ScrollReveal from '../components/common/ScrollReveal';

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
      <ScrollReveal direction="down">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#9E8547] font-extrabold">
            Licensed Real Estate Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2315] font-editorial">
            Verified US Real Estate Agents & Advisors
          </h1>
          <p className="text-sm text-[#3E4E31] font-medium leading-relaxed">
            Connect directly with state-licensed real estate advisors across all 50 US states. Vetted licensure, verifiable transaction histories, and dedicated buyer & seller representation.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter / Search Controls */}
      <ScrollReveal direction="up" delay={100}>
        <div className="glass-panel-luxury p-5 rounded-2xl border border-[#3E4E31]/15 bg-white max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 items-center shadow-md">
          <div className="flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by advisor name, brokerage, or license #..."
              className="w-full bg-[#FFFFFF] text-xs text-[#1A2315] font-medium border border-[#3E4E31]/25 rounded-xl px-4 py-3 placeholder:text-[#686E4A] focus:outline-none focus:border-[#BFA668] shadow-sm"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#FFFFFF] text-xs text-[#1A2315] font-semibold border border-[#3E4E31]/25 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#BFA668] cursor-pointer shadow-sm"
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
      </ScrollReveal>

      {/* Agents Grid with Staggered Scroll Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent, idx) => (
          <ScrollReveal key={agent.id} direction="up" delay={(idx % 6) * 100} duration={650}>
            <div className="glass-panel-luxury glass-card-interactive p-6 rounded-3xl border border-[#3E4E31]/15 bg-white flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl h-full">
              {/* Top Identity Header */}
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-[#F4EDDA]/50 shadow-md border border-[#3E4E31]/15"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-[#1A2315] font-editorial">{agent.name}</h3>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F4EDDA]/600" title="Verified Agent"></span>
                    </div>
                    <p className="text-xs text-[#9E8547] font-bold">{agent.agency}</p>
                    <span className="text-[10px] font-mono text-[#3E4E31] block mt-0.5 font-bold">
                      {agent.license}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#3E4E31] mt-4 leading-relaxed font-normal line-clamp-3">
                  {agent.bio}
                </p>

                {/* Service Areas Badge Row */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {agent.states.map((st) => (
                    <span
                      key={st}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#F4EDDA]/50 text-[#1A2315] font-bold border border-[#3E4E31]/15"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Stats Matrix */}
              <div>
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FBF8F2] border border-[#3E4E31]/15 text-center mb-4">
                  <div>
                    <span className="block text-sm font-extrabold text-[#1A2315] font-editorial">★ {agent.rating}</span>
                    <span className="text-[9px] text-[#3E4E31] uppercase font-mono font-bold">{agent.reviewsCount} Reviews</span>
                  </div>
                  <div className="border-x border-[#3E4E31]/15">
                    <span className="block text-sm font-extrabold text-[#1A2315] font-editorial">{agent.activeListings}</span>
                    <span className="text-[9px] text-[#3E4E31] uppercase font-mono font-bold">Listings</span>
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold text-[#9E8547] font-editorial">{agent.soldCount}</span>
                    <span className="text-[9px] text-[#3E4E31] uppercase font-mono font-bold">Closed</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/15550199000?text=Hi%20${encodeURIComponent(agent.name)},%20I%20am%20inquiring%20about%20your%20TwistMS%20advisory%20services`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-luxury py-2.5 px-3 rounded-xl text-[11px] font-bold text-center"
                  >
                    Book Meeting
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="btn-luxury-outline py-2.5 px-3 rounded-xl text-[11px] font-bold text-center"
                  >
                    Direct Email
                  </a>
                </div>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}
