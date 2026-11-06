import React, { useState } from 'react';
import { listingPlans } from '../data/properties';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState('inquiry'); // inquiry or property-submission

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">Escrow & Verification Support</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Connect with TwistMS USA</h1>
        <p className="text-sm text-slate-300 mt-3 font-light leading-relaxed">
          Submit property ownership deeds for administrative review, inquire about agent representation, or contact our customer support team.
        </p>
      </div>

      {/* Main Grid: Form + Direct Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Switcher: General Inquiry vs Submit Property */}
          <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
            <button
              type="button"
              onClick={() => setSubmissionType('inquiry')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                submissionType === 'inquiry'
                  ? 'bg-cyan-500 text-[#040711] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              General Inquiry / Escrow
            </button>
            <button
              type="button"
              onClick={() => setSubmissionType('property-submission')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                submissionType === 'property-submission'
                  ? 'bg-cyan-500 text-[#040711] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              + Submit Property Deed
            </button>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white">Transmission Successful</h3>
              <p className="text-xs text-slate-300">
                Your dossier has been routed to our USA compliance desk. We will reach back within 2-4 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rachel@domain.com"
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Role in Marketplace</label>
                  <select className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-400">
                    <option value="buyer">Prospective Buyer / Investor</option>
                    <option value="seller">Property Owner / Seller</option>
                    <option value="agent">Licensed Real Estate Agent</option>
                    <option value="developer">Land & Commercial Developer</option>
                  </select>
                </div>
              </div>

              {submissionType === 'property-submission' && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 space-y-3">
                  <p className="text-xs text-cyan-300 font-medium">Property Submission Details (USA 50 States)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Property Address / Parcel #"
                      className="sm:col-span-2 bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Asking Price ($ USD)"
                      className="bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    *Deed or tax document uploads will be handled via verified encrypted portal following preliminary intake.
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Your Message or Requirements</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your inquiry or property details..."
                  className="w-full bg-slate-900/90 text-xs text-white border border-white/10 rounded-xl px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-bold text-[#040711] bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition-all"
              >
                Transmit to TwistMS Desk →
              </button>
            </form>
          )}

        </div>

        {/* Info & Office Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Card */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/20">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Rapid Response</span>
            <h3 className="text-lg font-bold text-white mt-1">Instant WhatsApp Concierge</h3>
            <p className="text-xs text-slate-300 mt-1">
              Direct connection with our USA listing coordinator for rapid deed verification and agent onboarding.
            </p>
            <a
              href="https://wa.me/15550199000"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 text-[#040711] text-xs font-bold hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20"
            >
              Open WhatsApp Chat
            </a>
          </div>

          {/* Compliance & Escrow Notice */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase font-mono">Administrative Verification Standards</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
              <li>All listings must provide verifiable seller identity and property title deeds.</li>
              <li>Agent representation requires verification of state licensure.</li>
              <li>Compliant with the Federal Fair Housing Act across all 50 states.</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 text-xs space-y-2 text-slate-300">
            <p><span className="text-white font-mono">Official Domain:</span> twistmsproperties.com</p>
            <p><span className="text-white font-mono">Support Email:</span> support@twistmsproperties.com</p>
            <p><span className="text-white font-mono">Hosting Architecture:</span> Hostinger Business Enterprise</p>
          </div>

        </div>

      </div>

    </div>
  );
}
