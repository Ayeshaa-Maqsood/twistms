import React, { useState } from 'react';

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
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-[#C5A880] text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">
          Escrow & Verification Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-[#1A202C] tracking-tight font-editorial">
          Connect with TwistMS USA
        </h1>
        <p className="text-sm text-[#64748B] mt-3 font-light leading-relaxed">
          Inquire directly regarding property acquisitions, agent representation, deed verification protocol, or connect with our USA escrow coordinators.
        </p>
      </div>

      {/* Main Grid: Form + Direct Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 glass-panel-luxury p-6 sm:p-10 rounded-3xl border border-[#2C3539]/10 shadow-xl bg-white">
          
          {/* Switcher: General Inquiry vs Submit Property */}
          <div className="flex bg-[#FBF8F2] p-1.5 rounded-2xl mb-8 border border-[#2C3539]/10">
            <button
              type="button"
              onClick={() => setSubmissionType('inquiry')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                submissionType === 'inquiry'
                  ? 'bg-[#1A202C] text-[#FBF8F2] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1A202C]'
              }`}
            >
              General Inquiry / Buyer Support
            </button>
            <button
              type="button"
              onClick={() => setSubmissionType('escrow')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                submissionType === 'escrow'
                  ? 'bg-[#1A202C] text-[#FBF8F2] shadow-sm'
                  : 'text-[#64748B] hover:text-[#1A202C]'
              }`}
            >
              Escrow & Deed Coordination
            </button>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#F4ECE1] border border-[#C5A880]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1A202C] text-[#FBF8F2] flex items-center justify-center mx-auto text-xl font-editorial font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-normal text-[#1A202C] font-editorial">Transmission Received</h3>
              <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
                Your dossier has been routed to our USA compliance desk. A coordinator will respond via email or WhatsApp within 2-4 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-semibold btn-luxury"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rachel@domain.com"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Marketplace Role</label>
                  <select className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#C5A880] cursor-pointer">
                    <option value="buyer">Prospective Buyer / Investor</option>
                    <option value="seller">Property Owner / Seller</option>
                    <option value="agent">Licensed Real Estate Agent</option>
                    <option value="developer">Land & Commercial Developer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Your Message or Inquiry</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your inquiry, parcel question, or escrow timeline..."
                  className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold btn-luxury"
              >
                Transmit to TwistMS Desk →
              </button>
            </form>
          )}

        </div>

        {/* Info & Office Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Card */}
          <div className="glass-panel-luxury p-6 sm:p-7 rounded-3xl border border-[#C5A880]/30 bg-[#F4ECE1]/80 space-y-3">
            <span className="text-[10px] font-mono text-[#A6885E] uppercase tracking-widest font-bold">Rapid Response</span>
            <h3 className="text-xl font-normal text-[#1A202C] font-editorial">Instant WhatsApp Concierge</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Direct connection with our USA listing coordinator for rapid deed verification and agent onboarding.
            </p>
            <a
              href="https://wa.me/15550199000"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-luxury text-xs font-semibold"
            >
              Open WhatsApp Chat
            </a>
          </div>

          {/* Compliance & Escrow Notice */}
          <div className="glass-panel-luxury p-6 sm:p-7 rounded-3xl border border-[#2C3539]/10 space-y-3 bg-white">
            <h4 className="text-xs font-bold text-[#1A202C] uppercase font-mono tracking-wider">Verification Standards</h4>
            <ul className="text-xs text-[#64748B] space-y-2.5 list-disc pl-4 leading-relaxed">
              <li>All listings must provide verifiable seller identity and property title deeds.</li>
              <li>Agent representation requires verification of applicable state licensure.</li>
              <li>Full compliance with Federal Fair Housing regulations across all 50 states.</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="glass-panel-luxury p-6 rounded-3xl border border-[#2C3539]/10 text-xs space-y-2 text-[#64748B] bg-white">
            <p><span className="text-[#1A202C] font-semibold">Official Domain:</span> twistmsproperties.com</p>
            <p><span className="text-[#1A202C] font-semibold">Support Desk:</span> support@twistmsproperties.com</p>
            <p><span className="text-[#1A202C] font-semibold">Hosting Node:</span> Hostinger Business Enterprise</p>
          </div>

        </div>

      </div>

    </div>
  );
}
