import React from 'react';
import { Link } from 'react-router-dom';
import { listingPlans } from '../data/properties';

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-[#C5A880] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
          Transparent Syndication
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-[#1A202C] tracking-tight font-editorial">
          Listing Packages & Advertising Tiers
        </h1>
        <p className="text-sm text-[#64748B] mt-3 font-light leading-relaxed">
          Transparent pricing tiers aligned with PRD specifications. Free entry for individual homeowners, high-impact social promotion for premium assets.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {listingPlans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.highlight
                ? 'glass-panel-luxury border-2 border-[#C5A880] shadow-xl scale-105 bg-[#FFFFFF]'
                : 'glass-panel-luxury border border-[#2C3539]/10 hover:border-[#C5A880]/50 bg-[#FFFFFF]/90'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1A202C] text-[#FBF8F2] text-[10px] font-bold uppercase tracking-widest font-mono shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-[#1A202C] font-editorial">{plan.name}</h3>
              <p className="text-xs text-[#64748B] mt-1">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#1A202C] font-editorial">{plan.price}</span>
                <span className="text-xs text-[#64748B] font-mono">/ {plan.period}</span>
              </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#2C3539]">
                    <svg className="w-4 h-4 text-[#C5A880] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-[#1A202C]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2C3539]/10">
              <Link
                to="/submit"
                className={`block text-center py-3 px-4 rounded-xl text-xs font-semibold transition-all ${
                  plan.highlight
                    ? 'btn-luxury'
                    : 'btn-luxury-outline'
                }`}
              >
                Choose {plan.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel-luxury p-6 sm:p-10 rounded-3xl border border-[#2C3539]/10 bg-white">
        <h3 className="text-2xl font-normal text-[#1A202C] font-editorial mb-6">Detailed Plan Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C3539] border-collapse">
            <thead>
              <tr className="border-b border-[#2C3539]/15 text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 font-semibold text-[#1A202C]">Free Plan</th>
                <th className="py-3 px-4 text-[#A6885E] font-bold">Paid Verified</th>
                <th className="py-3 px-4 text-[#1A202C] font-bold">Premium Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C3539]/10 font-sans">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1A202C]">Listing Duration</td>
                <td className="py-3.5 px-4 text-[#64748B]">90 Days</td>
                <td className="py-3.5 px-4 text-[#A6885E] font-semibold">150 Days</td>
                <td className="py-3.5 px-4 text-[#1A202C] font-bold">365 Days (1 Year)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1A202C]">Maximum Photos</td>
                <td className="py-3.5 px-4 text-[#64748B]">50 Photos</td>
                <td className="py-3.5 px-4 text-[#A6885E] font-semibold">50 Photos</td>
                <td className="py-3.5 px-4 text-[#1A202C] font-bold">50 Photos</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1A202C]">Maximum Videos</td>
                <td className="py-3.5 px-4 text-[#64748B]">5 HD Videos</td>
                <td className="py-3.5 px-4 text-[#A6885E] font-semibold">5 HD Videos</td>
                <td className="py-3.5 px-4 text-[#1A202C] font-bold">5 HD Videos</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1A202C]">Social Media Promotion</td>
                <td className="py-3.5 px-4 text-[#9CA3AF]">Not Guaranteed</td>
                <td className="py-3.5 px-4 text-[#A6885E] font-semibold">FB & IG Included</td>
                <td className="py-3.5 px-4 text-[#1A202C] font-bold">FB, IG & TikTok Push</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1A202C]">Verified Deed Badge</td>
                <td className="py-3.5 px-4 text-[#9CA3AF]">Optional Add-on</td>
                <td className="py-3.5 px-4 text-[#A6885E] font-semibold">Included ✓</td>
                <td className="py-3.5 px-4 text-[#1A202C] font-bold">Included ✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1A202C]">Sold Property Record</td>
                <td className="py-3.5 px-4 text-[#64748B]">Permanent</td>
                <td className="py-3.5 px-4 text-[#64748B]">Permanent</td>
                <td className="py-3.5 px-4 text-[#1A202C] font-bold">Permanent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
