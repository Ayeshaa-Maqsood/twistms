import React, { useState } from 'react';
import { reviewsData } from '../../data/reviews';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel-luxury p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#3E4E31]/15 bg-white relative overflow-hidden shadow-xl">
        
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#BFA668]/15 blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-[#BFA668] text-xs font-mono uppercase tracking-widest mb-1.5 font-extrabold">
              Verified Client Records
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2315] tracking-tight font-editorial">
              Client & Investor Testimonials
            </h2>
            <p className="text-sm text-[#596638] mt-2 font-medium leading-relaxed max-w-2xl">
              Unfiltered feedback from verified buyers, sellers, and licensed brokerage partners across the United States.
            </p>
          </div>

          {/* Dots Indicator Switcher */}
          <div className="flex items-center gap-2">
            {reviewsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === i
                    ? 'w-8 bg-[#3E4E31]'
                    : 'w-2.5 bg-[#BFA668]/30 hover:bg-[#BFA668]'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Highlighted Review Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((rev, idx) => (
            <div
              key={rev.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                activeIndex === idx
                  ? 'bg-[#F4EDDA]/50 border-[#BFA668] shadow-lg -translate-y-1 ring-1 ring-[#BFA668]'
                  : 'bg-white border-[#3E4E31]/10 hover:border-[#BFA668]/50 shadow-sm'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                  {'★'.repeat(rev.rating)}
                </div>

                <p className="text-xs sm:text-sm text-[#1A2315] font-normal leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#3E4E31]/10 mt-6">
                <img
                  src={rev.avatar}
                  alt={rev.client}
                  className="w-10 h-10 rounded-full object-cover bg-[#F4EDDA] border border-[#BFA668]/20 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1A2315] font-editorial">{rev.client}</h4>
                  <p className="text-[11px] text-[#BFA668] font-bold font-mono">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
