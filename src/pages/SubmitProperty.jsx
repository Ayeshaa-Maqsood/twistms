import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubmitProperty() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    type: 'Sale',
    price: '',
    address: '',
    city: '',
    stateCode: 'TX',
    zip: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    acreage: '',
    description: '',
    plan: 'Paid',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    hasDeed: true,
    hasTaxReceipt: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] font-bold">
          PRD §5 & §10 Intake Portal
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal text-[#1A202C] font-editorial">
          Submit Property & Deed for Review
        </h1>
        <p className="text-xs text-[#64748B] max-w-xl mx-auto font-light leading-relaxed">
          All listings undergo administrative verification before entering public syndication. Complete the 3-step submission to obtain your Verified Deed badge.
        </p>
      </div>

      {/* Step Progress Tracker */}
      <div className="flex items-center justify-center gap-3 text-xs font-mono">
        <div className={`px-4 py-2 rounded-full border transition-all ${step === 1 ? 'bg-[#1A202C] text-[#FBF8F2] border-[#1A202C]' : 'glass-panel-luxury text-[#64748B]'}`}>
          01. Specs & Location
        </div>
        <span className="text-[#C5A880]">→</span>
        <div className={`px-4 py-2 rounded-full border transition-all ${step === 2 ? 'bg-[#1A202C] text-[#FBF8F2] border-[#1A202C]' : 'glass-panel-luxury text-[#64748B]'}`}>
          02. Media & Deed Compliance
        </div>
        <span className="text-[#C5A880]">→</span>
        <div className={`px-4 py-2 rounded-full border transition-all ${step === 3 ? 'bg-[#1A202C] text-[#FBF8F2] border-[#1A202C]' : 'glass-panel-luxury text-[#64748B]'}`}>
          03. Syndication Tier
        </div>
      </div>

      {/* Main Glass Card Form */}
      <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-[#2C3539]/10 shadow-2xl bg-white/95">
        
        {submitted ? (
          <div className="text-center py-12 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F4ECE1] text-[#A6885E] flex items-center justify-center mx-auto text-2xl font-bold font-editorial">
              ✓
            </div>
            <h2 className="text-3xl font-normal text-[#1A202C] font-editorial">
              Property Submitted for Administrative Review
            </h2>
            <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
              Your submission for <span className="font-semibold text-[#1A202C]">{formData.title || 'the submitted parcel'}</span> has been assigned reference token <span className="font-mono text-[#A6885E]">#TX-{Math.floor(1000 + Math.random() * 9000)}</span>. Our compliance desk reviews deeds within 24 hours.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link to="/search" className="btn-luxury px-6 py-3 rounded-xl text-xs font-semibold">
                Back to Marketplace
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* STEP 1: Specs & Location */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-normal text-[#1A202C] font-editorial border-b border-[#2C3539]/10 pb-3">
                  Step 1: Property Identity & Physical Specifications
                </h3>

                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Listing Headline / Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Hill Country Estate with Equestrian Barns"
                    className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Land">Land / Timber / Farm</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Rental">Rental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Listing Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Asking Price ($ USD)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 1450000"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. 1204 Oak Ridge Dr"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Austin"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">State</label>
                    <select
                      name="stateCode"
                      value={formData.stateCode}
                      onChange={handleChange}
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="TX">Texas (TX)</option>
                      <option value="CO">Colorado (CO)</option>
                      <option value="FL">Florida (FL)</option>
                      <option value="CA">California (CA)</option>
                      <option value="MT">Montana (MT)</option>
                      <option value="NY">New York (NY)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="4"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Bathrooms</label>
                    <input
                      type="number"
                      step="0.5"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="3.5"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Acreage</label>
                    <input
                      type="number"
                      step="0.1"
                      name="acreage"
                      value={formData.acreage}
                      onChange={handleChange}
                      placeholder="10.5"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Square Feet</label>
                    <input
                      type="number"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleChange}
                      placeholder="3800"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-luxury px-6 py-3 rounded-xl text-xs font-semibold"
                  >
                    Continue to Step 2: Media & Legal Deeds →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Media & Legal Deed Compliance */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-normal text-[#1A202C] font-editorial border-b border-[#2C3539]/10 pb-3">
                  Step 2: Legal Verification & Media Files (PRD §9 & §10)
                </h3>

                {/* Upload Placeholder Zone */}
                <div className="border-2 border-dashed border-[#C5A880]/50 rounded-2xl p-8 text-center bg-[#FBF8F2] space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F4ECE1] text-[#A6885E] flex items-center justify-center mx-auto text-xl font-mono">
                    📷
                  </div>
                  <h4 className="text-sm font-bold text-[#1A202C] font-editorial">
                    Upload Property Photography & Floorplans
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Drag and drop up to 50 HD photos (Minimum 5 photos required by PRD §9).
                  </p>
                  <button
                    type="button"
                    className="btn-luxury-outline px-4 py-2 rounded-xl text-xs font-semibold"
                  >
                    Select Photos from Device
                  </button>
                </div>

                {/* Required Legal Attestation */}
                <div className="p-5 rounded-2xl bg-[#F4ECE1]/60 border border-[#C5A880]/30 space-y-3">
                  <h4 className="text-xs font-bold text-[#1A202C] uppercase font-mono">
                    Administrative Compliance Checklist
                  </h4>
                  <label className="flex items-start gap-2.5 text-xs text-[#2C3539] cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasDeed"
                      checked={formData.hasDeed}
                      onChange={handleChange}
                      className="mt-0.5"
                    />
                    <span>I confirm I possess the recorded Grant Deed, Title Policy, or written representative authority for this parcel.</span>
                  </label>
                  <label className="flex items-start gap-2.5 text-xs text-[#2C3539] cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasTaxReceipt"
                      checked={formData.hasTaxReceipt}
                      onChange={handleChange}
                      className="mt-0.5"
                    />
                    <span>I confirm current county property tax records are current without unresolved ownership liens.</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-luxury-outline px-5 py-3 rounded-xl text-xs font-semibold"
                  >
                    ← Back to Step 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-luxury px-6 py-3 rounded-xl text-xs font-semibold"
                  >
                    Continue to Step 3: Select Plan →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Plan Selection & Submission */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-normal text-[#1A202C] font-editorial border-b border-[#2C3539]/10 pb-3">
                  Step 3: Select Listing Duration & Promotion Plan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => setFormData({ ...formData, plan: 'Free' })}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.plan === 'Free' ? 'border-[#1A202C] bg-[#F4ECE1]' : 'border-[#2C3539]/10 bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#64748B] uppercase">Basic Entry</span>
                    <h4 className="text-lg font-bold text-[#1A202C] font-editorial">Free Listing</h4>
                    <p className="text-xl font-bold font-editorial mt-1">$0 <span className="text-xs text-[#64748B]">/ 90 days</span></p>
                    <p className="text-[11px] text-[#64748B] mt-2">Standard public search display without social marketing.</p>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, plan: 'Paid' })}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                      formData.plan === 'Paid' ? 'border-[#C5A880] bg-[#F4ECE1] shadow-md' : 'border-[#2C3539]/10 bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#A6885E] uppercase font-bold">Most Popular</span>
                    <h4 className="text-lg font-bold text-[#1A202C] font-editorial">Paid Verified</h4>
                    <p className="text-xl font-bold font-editorial mt-1">$49 <span className="text-xs text-[#64748B]">/ 150 days</span></p>
                    <p className="text-[11px] text-[#64748B] mt-2">Includes Verified Deed Badge + Official FB & IG Spotlight.</p>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, plan: 'Premium' })}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.plan === 'Premium' ? 'border-[#1A202C] bg-[#F4ECE1]' : 'border-[#2C3539]/10 bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#64748B] uppercase">Full Year</span>
                    <h4 className="text-lg font-bold text-[#1A202C] font-editorial">Premium Elite</h4>
                    <p className="text-xl font-bold font-editorial mt-1">$129 <span className="text-xs text-[#64748B]">/ 365 days</span></p>
                    <p className="text-[11px] text-[#64748B] mt-2">Top featured placement + viral TikTok/IG video push.</p>
                  </div>
                </div>

                {/* Submitter Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2C3539]/10">
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Your Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      required
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="e.g. David Vance"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Email</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      required
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      placeholder="david@domain.com"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-4 py-3"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-luxury-outline px-5 py-3 rounded-xl text-xs font-semibold"
                  >
                    ← Back to Step 2
                  </button>
                  <button
                    type="submit"
                    className="btn-luxury px-8 py-3.5 rounded-xl text-xs font-semibold"
                  >
                    Transmit Dossier for Admin Review →
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>

    </div>
  );
}
