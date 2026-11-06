import React from 'react';
import { Link } from 'react-router-dom';
import { listingPlans } from '../data/properties';

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Monetization & Syndication</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Listing Packages & Advertising</h1>
        <p className="text-sm text-slate-300 mt-3 font-light leading-relaxed">
          Transparent pricing tiers aligned with our PRD specifications. Free entry for owners, high-impact social promotion for premium assets.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {listingPlans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.highlight
                ? 'glass-panel border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20 scale-105'
                : 'glass-panel border border-white/10 hover:border-white/20'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-[#040711] text-xs font-bold uppercase tracking-wider font-mono">
                {plan.badge}
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                <span className="text-xs text-slate-400 font-mono">/ {plan.period}</span>
              </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                to="/contact"
                className={`block text-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  plan.highlight
                    ? 'bg-cyan-400 text-[#040711] hover:bg-cyan-300 shadow-lg shadow-cyan-500/25'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Get Started with {plan.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6">Detailed Plan Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono uppercase">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">Free Plan</th>
                <th className="py-3 px-4 text-cyan-400">Paid Verified</th>
                <th className="py-3 px-4 text-violet-400">Premium Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans text-white">Listing Duration</td>
                <td className="py-3 px-4">90 Days</td>
                <td className="py-3 px-4 text-cyan-300">150 Days</td>
                <td className="py-3 px-4 text-violet-300">365 Days (1 Year)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-white">Maximum Photos</td>
                <td className="py-3 px-4">50 Photos</td>
                <td className="py-3 px-4 text-cyan-300">50 Photos</td>
                <td className="py-3 px-4 text-violet-300">50 Photos</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-white">Maximum Videos</td>
                <td className="py-3 px-4">5 HD Videos</td>
                <td className="py-3 px-4 text-cyan-300">5 HD Videos</td>
                <td className="py-3 px-4 text-violet-300">5 HD Videos</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-white">Social Media Promotion</td>
                <td className="py-3 px-4 text-slate-500">Not Included</td>
                <td className="py-3 px-4 text-cyan-300">FB & IG Included</td>
                <td className="py-3 px-4 text-violet-300">FB, IG & TikTok Viral Push</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-white">Verified Deed Badge</td>
                <td className="py-3 px-4 text-slate-500">Optional Add-on</td>
                <td className="py-3 px-4 text-cyan-300">Included ✓</td>
                <td className="py-3 px-4 text-violet-300">Included ✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-white">Sold Property Record</td>
                <td className="py-3 px-4">Permanent</td>
                <td className="py-3 px-4 text-cyan-300">Permanent</td>
                <td className="py-3 px-4 text-violet-300">Permanent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

