import React, { useState } from 'react';
import { reviewsData } from '../../data/reviews';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel-luxury p-8 sm:p-14 rounded-3xl border border-[#2C3539]/10 bg-white relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C5A880]/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-[#C5A880] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
              PRD §16 & §20.12 Verified Records
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A202C] tracking-tight font-editorial">
              Client & Investor Testimonials
            </h2>
            <p className="text-xs text-[#64748B] mt-1 font-light">
              Unfiltered feedback from verified buyers, sellers, and licensed brokerage partners.
            </p>
          </div>

          {/* Dots Indicator Switcher */}
          <div className="flex items-center gap-2">
            {reviewsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === i
                    ? 'w-8 bg-[#1A202C]'
                    : 'w-2.5 bg-[#E2E3E5] hover:bg-[#C5A880]'
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
                  ? 'bg-[#FBF8F2] border-[#C5A880] shadow-md -translate-y-1'
                  : 'bg-white border-[#2C3539]/10 hover:border-[#C5A880]/40'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C5A880] text-sm mb-4">
                  {'★'.repeat(rev.rating)}
                </div>

                <p className="text-xs sm:text-sm text-[#2C3539] font-light leading-relaxed italic font-editorial">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#2C3539]/10 mt-6">
                <img
                  src={rev.avatar}
                  alt={rev.client}
                  className="w-10 h-10 rounded-full object-cover bg-[#E2E3E5]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1A202C] font-editorial">{rev.client}</h4>
                  <p className="text-[10px] text-[#A6885E] font-medium font-mono">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
