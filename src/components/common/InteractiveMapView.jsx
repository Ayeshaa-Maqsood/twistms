import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InteractiveMapView({ properties, onSelectProperty }) {
  const [hoveredProperty, setHoveredProperty] = useState(null);

  // Approximate relative coordinates for 6 USA states on the map canvas
  const stateCoordinates = {
    TX: { top: '65%', left: '46%' },
    CO: { top: '48%', left: '38%' },
    FL: { top: '78%', left: '76%' },
    CA: { top: '48%', left: '14%' },
    MT: { top: '22%', left: '32%' },
    NY: { top: '34%', left: '84%' },
  };

  return (
    <div className="glass-panel-luxury rounded-3xl border border-[#2C3539]/10 bg-[#FFFFFF] p-4 sm:p-6 overflow-hidden shadow-xl space-y-4">
      
      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#2C3539]/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse" />
          <h3 className="text-sm font-bold text-[#1A202C] font-mono uppercase tracking-wider">
            USA Interactive Satellite Map (PRD §7)
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#64748B]">
          <span className="flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#1A202C]"></span> {properties.length} Active Pins
          </span>
          <span className="text-[11px] font-mono text-[#A6885E]">
            *Click pin to inspect parcel preview
          </span>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden bg-[#1E242B] border border-[#2C3539]/15">
        
        {/* Stylized Minimalist Map Texture Backing */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-[#0F141C]/50 backdrop-blur-[1px]" />

        {/* Map Grid Watermark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Territory Compass Watermark */}
        <div className="absolute top-4 left-4 z-10 glass-panel-luxury px-3 py-1.5 rounded-xl bg-white/90 text-[10px] font-mono font-bold text-[#1A202C]">
          MAP DATUM: WGS84 • CONTINENTAL USA
        </div>

        {/* Interactive Property Map Pins */}
        {properties.map((prop) => {
          const coords = stateCoordinates[prop.stateCode] || { top: '50%', left: '50%' };
          const isSelected = hoveredProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ top: coords.top, left: coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => setHoveredProperty(prop)}
            >
              {/* Radar concentric pulse */}
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#C5A880] opacity-50" />
                
                {/* Pin Head Pill */}
                <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-editorial shadow-lg flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#C5A880] text-[#1A202C] scale-110 ring-2 ring-white'
                    : 'bg-[#1A202C] text-white hover:bg-[#C5A880] hover:text-[#1A202C]'
                }`}>
                  <span>📍</span>
                  <span>${(prop.price / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Hovered / Clicked Property Preview Card Over Map */}
        {hoveredProperty && (
          <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-84 z-30 glass-panel-luxury p-3.5 rounded-2xl border border-[#2C3539]/20 bg-white/95 shadow-2xl animate-fade-in flex gap-3">
            <img
              src={hoveredProperty.image}
              alt={hoveredProperty.title}
              className="w-24 h-24 rounded-xl object-cover bg-slate-200 shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <span className="text-[10px] font-mono text-[#A6885E] uppercase font-bold">
                  {hoveredProperty.city}, {hoveredProperty.stateCode}
                </span>
                <h4 className="text-xs font-bold text-[#1A202C] font-editorial line-clamp-1">
                  {hoveredProperty.title}
                </h4>
                <p className="text-sm font-bold text-[#1A202C] font-editorial mt-0.5">
                  ${hoveredProperty.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#2C3539]/10">
                <Link
                  to={`/property/${hoveredProperty.id}`}
                  className="btn-luxury px-3 py-1 rounded-lg text-[10px] font-semibold"
                >
                  View Details →
                </Link>
                <button
                  onClick={() => setHoveredProperty(null)}
                  className="text-[10px] text-[#9CA3AF] hover:text-[#1A202C] font-mono"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
