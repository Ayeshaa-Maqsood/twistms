import React, { useState } from 'react';
import ScrollReveal from '../components/common/ScrollReveal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState('inquiry');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <ScrollReveal direction="down">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-blue-700 text-xs font-mono uppercase tracking-widest mb-1.5 font-extrabold">
            Escrow & Verification Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-editorial">
            Connect with TwistMS USA
          </h1>
          <p className="text-sm text-[#334155] mt-3 font-medium leading-relaxed">
            Inquire directly regarding property acquisitions, agent representation, deed verification protocol, or connect with our USA escrow coordinators.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Grid: Form + Direct Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-panel-luxury p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl bg-white">
              
              {/* Switcher: General Inquiry vs Submit Property */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSubmissionType('inquiry')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    submissionType === 'inquiry'
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-[#334155] hover:text-[#0F172A]'
                  }`}
                >
                  General Inquiry / Buyer Support
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('escrow')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    submissionType === 'escrow'
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-[#334155] hover:text-[#0F172A]'
                  }`}
                >
                  Escrow & Deed Coordination
                </button>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center mx-auto text-xl font-editorial font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] font-editorial">Transmission Received</h3>
                  <p className="text-xs text-[#334155] font-medium leading-relaxed max-w-sm mx-auto">
                    Your dossier has been routed to our USA compliance desk. A coordinator will respond via email or WhatsApp within 2-4 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold btn-luxury"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rachel Adams"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="rachel@domain.com"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Marketplace Role</label>
                      <select className="w-full bg-white text-xs text-[#0F172A] font-semibold border border-slate-300 rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-600 cursor-pointer shadow-sm">
                        <option value="buyer">Prospective Buyer / Investor</option>
                        <option value="seller">Property Owner / Seller</option>
                        <option value="agent">Licensed Real Estate Agent</option>
                        <option value="developer">Land & Commercial Developer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Your Message or Inquiry</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your inquiry, parcel question, or escrow timeline..."
                      className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-bold btn-luxury"
                  >
                    Transmit to TwistMS Desk →
                  </button>
                </form>
              )}

            </div>
          </ScrollReveal>
        </div>

        {/* Info & Office Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal direction="up" delay={200}>
            {/* WhatsApp Direct Card */}
            <div className="glass-panel-luxury p-6 sm:p-7 rounded-3xl border border-sky-300 bg-sky-50/60 space-y-3 shadow-md">
              <span className="text-[10px] font-mono text-blue-700 uppercase tracking-widest font-extrabold">Rapid Response</span>
              <h3 className="text-xl font-bold text-[#0F172A] font-editorial">Instant WhatsApp Concierge</h3>
              <p className="text-xs text-[#334155] leading-relaxed font-medium">
                Direct connection with our USA listing coordinator for rapid deed verification and agent onboarding.
              </p>
              <a
                href="https://wa.me/15550199000"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-luxury text-xs font-bold"
              >
                Open WhatsApp Chat
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            {/* Compliance & Escrow Notice */}
            <div className="glass-panel-luxury p-6 sm:p-7 rounded-3xl border border-slate-200 space-y-3 bg-white shadow-md">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase font-mono tracking-wider">Verification Standards</h4>
              <ul className="text-xs text-[#334155] space-y-2.5 list-disc pl-4 leading-relaxed font-medium">
                <li>All listings must provide verifiable seller identity and property title deeds.</li>
                <li>Agent representation requires verification of applicable state licensure.</li>
                <li>Full compliance with Federal Fair Housing regulations across all 50 states.</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            {/* Contact Details */}
            <div className="glass-panel-luxury p-6 rounded-3xl border border-slate-200 text-xs space-y-2 text-[#334155] bg-white shadow-sm font-medium">
              <p><span className="text-[#0F172A] font-bold">Official Domain:</span> twistmsproperties.com</p>
              <p><span className="text-[#0F172A] font-bold">Support Desk:</span> support@twistmsproperties.com</p>
              <p><span className="text-[#0F172A] font-bold">Hosting Node:</span> Hostinger Business Enterprise</p>
            </div>
          </ScrollReveal>
        </div>

      </div>

    </div>
  );
}
