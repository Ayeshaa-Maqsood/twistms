import React from 'react';
import { Link } from 'react-router-dom';
import { listingPlans } from '../data/properties';
import ScrollReveal from '../components/common/ScrollReveal';

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <ScrollReveal direction="down">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[#6E6E6E] text-xs font-mono uppercase tracking-widest mb-1.5 font-extrabold">
            Transparent Syndication
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight font-editorial">
            Listing Packages & Advertising Tiers
          </h1>
          <p className="text-sm text-[#2B2B2B] mt-3 font-medium leading-relaxed">
            Transparent pricing tiers aligned with US real estate industry standards. Free entry for individual homeowners, high-impact nationwide syndication for premium assets.
          </p>
        </div>
      </ScrollReveal>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {listingPlans.map((plan, idx) => (
          <ScrollReveal key={idx} direction="up" delay={idx * 120} duration={650}>
            {/* Badge sits outside the blurred card so the card border can never paint over it */}
            <div className={`relative h-full ${plan.highlight ? 'scale-105' : ''}`}>
            {plan.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap px-3 py-1 rounded-full bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest font-mono shadow-md">
                {plan.badge}
              </div>
            )}
            <div
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative h-full ${
                plan.highlight
                  ? 'glass-panel-luxury border-2 border-[#B4B4B4] shadow-2xl bg-[#FFFFFF]'
                  : 'glass-panel-luxury border border-[#2B2B2B]/15 hover:border-[#B4B4B4] shadow-md bg-white'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold text-[#111111] font-editorial">{plan.name}</h3>
                <p className="text-xs text-[#2B2B2B] mt-1 font-medium">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#111111] font-editorial">{plan.price}</span>
                  <span className="text-xs text-[#555555] font-mono font-bold">/ {plan.period}</span>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#111111]">
                      <svg className="w-4 h-4 text-[#B4B4B4] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold text-[#111111]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2B2B2B]/15">
                <Link
                  to="/submit"
                  className={`block text-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    plan.highlight
                      ? 'btn-luxury'
                      : 'btn-luxury-outline'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Comparison Matrix Table */}
      <ScrollReveal direction="up" delay={200}>
        <div className="glass-panel-luxury p-6 sm:p-10 rounded-3xl border border-[#2B2B2B]/15 bg-white shadow-xl">
          <h3 className="text-2xl font-bold text-[#111111] font-editorial mb-6">Detailed Plan Comparison Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#111111] border-collapse">
              <thead>
                <tr className="border-b border-[#2B2B2B]/25 text-[#111111] font-mono uppercase tracking-wider text-[11px] bg-[#FAFAFA]">
                  <th className="py-3.5 px-4 font-extrabold">Feature</th>
                  <th className="py-3.5 px-4 font-extrabold text-[#111111]">Free Plan</th>
                  <th className="py-3.5 px-4 text-[#6E6E6E] font-extrabold">Paid Verified</th>
                  <th className="py-3.5 px-4 text-[#111111] font-extrabold">Premium Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B2B2B]/15 font-sans">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">Listing Duration</td>
                  <td className="py-3.5 px-4 text-[#2B2B2B] font-medium">45 Days</td>
                  <td className="py-3.5 px-4 text-[#6E6E6E] font-bold">150 Days</td>
                  <td className="py-3.5 px-4 text-[#111111] font-extrabold">365 Days (1 Year)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">Maximum Photos</td>
                  <td className="py-3.5 px-4 text-[#2B2B2B] font-medium">5–100 Photos</td>
                  <td className="py-3.5 px-4 text-[#6E6E6E] font-bold">5–100 Photos</td>
                  <td className="py-3.5 px-4 text-[#111111] font-extrabold">5–100 Photos</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">Maximum Videos</td>
                  <td className="py-3.5 px-4 text-[#2B2B2B] font-medium">1–5 HD Videos</td>
                  <td className="py-3.5 px-4 text-[#6E6E6E] font-bold">1–5 HD Videos</td>
                  <td className="py-3.5 px-4 text-[#111111] font-extrabold">1–5 HD Videos</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">Social Media Promotion</td>
                  <td className="py-3.5 px-4 text-[#6B6B6B] font-medium">Standard Indexing</td>
                  <td className="py-3.5 px-4 text-[#6E6E6E] font-bold">FB & IG Included</td>
                  <td className="py-3.5 px-4 text-[#111111] font-extrabold">FB, IG & TikTok Push</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">Verified Deed Badge</td>
                  <td className="py-3.5 px-4 text-[#6B6B6B] font-medium">Optional Add-on</td>
                  <td className="py-3.5 px-4 text-[#2B2B2B] font-extrabold">Included ✓</td>
                  <td className="py-3.5 px-4 text-[#2B2B2B] font-extrabold">Included ✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">Sold Property Record</td>
                  <td className="py-3.5 px-4 text-[#2B2B2B] font-medium">Permanent</td>
                  <td className="py-3.5 px-4 text-[#6E6E6E] font-bold">Permanent</td>
                  <td className="py-3.5 px-4 text-[#111111] font-extrabold">Permanent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
