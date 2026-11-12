import React from 'react';

/**
 * Static blueprint illustration used while the 3D chunk loads and whenever
 * WebGL is unavailable. Pure SVG line art on the same dark stage, so the
 * hero stays visually consistent with the interactive version.
 */
export default function HeroFallback({ animate = true }) {
  const draw = animate ? 'fallback-draw' : '';
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0E141B]" aria-hidden="true">
      <div className="absolute inset-0 grid-fine-light opacity-70" />
      <div className="absolute -top-24 right-[12%] w-[520px] h-[520px] rounded-full bg-[#8BAFD0]/10 blur-[120px]" />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="#8BAFD0"
        strokeWidth="1"
      >
        <g className={draw} opacity="0.9" transform="translate(620 150) scale(1.15)">
          {/* Ground plinth (isometric) */}
          <path d="M -200 260 L 120 330 L 420 190 L 100 120 Z" />
          {/* Ground floor pavilion */}
          <path d="M -140 230 L 60 280 L 60 180 L -140 130 Z" />
          <path d="M 60 280 L 260 180 L 260 80 L 60 180 Z" />
          <path d="M -140 130 L 60 180 L 260 80 L 60 30 Z" />
          {/* mullions */}
          <path d="M -110 140 V 240 M -80 148 V 248 M -50 155 V 255 M -20 162 V 262 M 10 170 V 270 M 40 177 V 277" opacity="0.6" />
          {/* Upper cantilever */}
          <path d="M -230 110 L -10 165 L -10 85 L -230 30 Z" />
          <path d="M -10 165 L 190 65 L 190 -15 L -10 85 Z" />
          <path d="M -230 30 L -10 85 L 190 -15 L -30 -70 Z" />
          {/* slats */}
          <path d="M -215 40 V 118 M -200 44 V 122 M -185 48 V 126 M -170 52 V 130 M -155 56 V 134 M -140 60 V 138 M -125 64 V 142 M -110 68 V 146 M -95 72 V 150 M -80 76 V 154 M -65 80 V 158 M -50 84 V 162 M -35 88 V 166" opacity="0.55" />
          {/* Stair core */}
          <path d="M 170 70 L 220 95 L 220 -60 L 170 -85 Z M 220 95 L 270 70 L 270 -85 L 220 -60" />
          {/* Columns under cantilever */}
          <path d="M -225 115 V 220 M -175 128 V 232" />
          {/* Pool */}
          <path d="M -210 250 L -100 275 L -40 245 L -150 220 Z" opacity="0.8" />
          {/* Dimension lines */}
          <path d="M -230 300 L 130 380 M -230 292 V 308 M 130 372 V 388" opacity="0.5" />
          <path d="M 450 190 V -20 M 442 190 H 458 M 442 -20 H 458" opacity="0.5" />
          <circle cx="-230" cy="30" r="3" />
          <circle cx="190" cy="-15" r="3" />
        </g>
        {/* Orbital rings */}
        <g className={draw} opacity="0.7">
          <ellipse cx="640" cy="330" rx="420" ry="120" stroke="#BFA668" transform="rotate(-14 640 330)" />
          <ellipse cx="640" cy="340" rx="500" ry="150" stroke="#8BAFD0" transform="rotate(10 640 340)" opacity="0.7" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E141B]/95 via-[#0E141B]/40 to-transparent" />
      <style>{`
        .fallback-draw path, .fallback-draw ellipse, .fallback-draw circle {
          stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: fallbackDraw 2.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes fallbackDraw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .fallback-draw path, .fallback-draw ellipse, .fallback-draw circle { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
