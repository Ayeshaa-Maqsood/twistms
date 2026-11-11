import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';

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
      <ScrollReveal direction="down">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-extrabold">
            Administrative Deed Verification Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] font-editorial">
            Submit Property & Deed for Review
          </h1>
          <p className="text-sm text-[#334155] max-w-xl mx-auto font-medium leading-relaxed">
            All listings undergo administrative verification before entering public syndication. Complete the 3-step submission to obtain your Verified Deed badge.
          </p>
        </div>
      </ScrollReveal>

      {/* Step Progress Tracker */}
      <ScrollReveal direction="up" delay={50}>
        <div className="flex items-center justify-center gap-3 text-xs font-mono">
          <div className={`px-4 py-2 rounded-full border transition-all ${step === 1 ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-md' : 'bg-white text-[#334155] border-slate-300 font-semibold'}`}>
            01. Specs & Location
          </div>
          <span className="text-blue-700 font-bold">→</span>
          <div className={`px-4 py-2 rounded-full border transition-all ${step === 2 ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-md' : 'bg-white text-[#334155] border-slate-300 font-semibold'}`}>
            02. Media & Deed Compliance
          </div>
          <span className="text-blue-700 font-bold">→</span>
          <div className={`px-4 py-2 rounded-full border transition-all ${step === 3 ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-md' : 'bg-white text-[#334155] border-slate-300 font-semibold'}`}>
            03. Syndication Tier
          </div>
        </div>
      </ScrollReveal>

      {/* Main Glass Card Form */}
      <ScrollReveal direction="up" delay={100}>
        <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-2xl bg-white">
          
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold font-editorial">
                ✓
              </div>
              <h2 className="text-3xl font-extrabold text-[#0F172A] font-editorial">
                Property Submitted for Administrative Review
              </h2>
              <p className="text-xs text-[#334155] max-w-md mx-auto leading-relaxed font-medium">
                Your submission for <span className="font-bold text-[#0F172A]">{formData.title || 'the submitted parcel'}</span> has been assigned reference token <span className="font-mono text-blue-700 font-bold">#TX-{Math.floor(1000 + Math.random() * 9000)}</span>. Our compliance desk reviews deeds within 24 hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link to="/search" className="btn-luxury px-6 py-3 rounded-xl text-xs font-bold">
                  Back to Marketplace
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP 1: Specs & Location */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#0F172A] font-editorial border-b border-slate-200 pb-3">
                    Step 1: Property Identity & Physical Specifications
                  </h3>

                  <div>
                    <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Listing Headline / Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Modern Hill Country Estate with Equestrian Barns"
                      className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-white text-xs text-[#0F172A] font-semibold border border-slate-300 rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-600 cursor-pointer shadow-sm"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Land">Land / Timber / Farm</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Rental">Rental</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Listing Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-white text-xs text-[#0F172A] font-semibold border border-slate-300 rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-600 cursor-pointer shadow-sm"
                      >
                        <option value="Sale">For Sale</option>
                        <option value="Rent">For Rent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Asking Price ($ USD)</label>
                      <input
                        type="number"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 1450000"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. 1204 Oak Ridge Dr"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Austin"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">State</label>
                      <select
                        name="stateCode"
                        value={formData.stateCode}
                        onChange={handleChange}
                        className="w-full bg-white text-xs text-[#0F172A] font-semibold border border-slate-300 rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-600 cursor-pointer shadow-sm"
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
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        placeholder="4"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Bathrooms</label>
                      <input
                        type="number"
                        step="0.5"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        placeholder="3.5"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Acreage</label>
                      <input
                        type="number"
                        step="0.1"
                        name="acreage"
                        value={formData.acreage}
                        onChange={handleChange}
                        placeholder="10.5"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Square Feet</label>
                      <input
                        type="number"
                        name="sqft"
                        value={formData.sqft}
                        onChange={handleChange}
                        placeholder="3800"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-luxury px-6 py-3.5 rounded-xl text-xs font-bold"
                    >
                      Continue to Step 2: Media & Legal Deeds →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Media & Legal Deed Compliance */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#0F172A] font-editorial border-b border-slate-200 pb-3">
                    Step 2: Legal Verification & Media Files
                  </h3>

                  {/* Upload Placeholder Zone */}
                  <div className="border-2 border-dashed border-sky-400 rounded-2xl p-8 text-center bg-slate-50 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mx-auto text-xl font-mono">
                      📷
                    </div>
                    <h4 className="text-sm font-bold text-[#0F172A] font-editorial">
                      Upload Property Photography & Floorplans
                    </h4>
                    <p className="text-xs text-[#334155] font-medium">
                      Drag and drop up to 50 HD photos (Minimum 5 photos required for MLS syndication).
                    </p>
                    <button
                      type="button"
                      className="btn-luxury-outline px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Select Photos from Device
                    </button>
                  </div>

                  {/* Required Legal Attestation */}
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                    <h4 className="text-xs font-bold text-[#0F172A] uppercase font-mono">
                      Administrative Compliance Checklist
                    </h4>
                    <label className="flex items-start gap-2.5 text-xs text-[#0F172A] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        name="hasDeed"
                        checked={formData.hasDeed}
                        onChange={handleChange}
                        className="mt-0.5 accent-blue-600"
                      />
                      <span>I confirm I possess the recorded Grant Deed, Title Policy, or written representative authority for this parcel.</span>
                    </label>
                    <label className="flex items-start gap-2.5 text-xs text-[#0F172A] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        name="hasTaxReceipt"
                        checked={formData.hasTaxReceipt}
                        onChange={handleChange}
                        className="mt-0.5 accent-blue-600"
                      />
                      <span>I confirm current county property tax records are current without unresolved ownership liens.</span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-luxury-outline px-5 py-3 rounded-xl text-xs font-bold"
                    >
                      ← Back to Step 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-luxury px-6 py-3.5 rounded-xl text-xs font-bold"
                    >
                      Continue to Step 3: Select Plan →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Plan Selection & Submission */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#0F172A] font-editorial border-b border-slate-200 pb-3">
                    Step 3: Select Listing Duration & Promotion Plan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setFormData({ ...formData, plan: 'Free' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        formData.plan === 'Free' ? 'border-[#0F172A] bg-slate-100 shadow-md ring-2 ring-[#0F172A]' : 'border-slate-200 bg-white hover:border-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#475569] uppercase font-bold">Basic Entry</span>
                      <h4 className="text-lg font-bold text-[#0F172A] font-editorial">Free Listing</h4>
                      <p className="text-xl font-extrabold font-editorial mt-1">$0 <span className="text-xs text-[#475569]">/ 90 days</span></p>
                      <p className="text-[11px] text-[#334155] mt-2 font-medium">Standard public search display without social marketing.</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, plan: 'Paid' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                        formData.plan === 'Paid' ? 'border-sky-600 bg-sky-50 shadow-md ring-2 ring-sky-600' : 'border-slate-200 bg-white hover:border-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-blue-700 uppercase font-extrabold">Most Popular</span>
                      <h4 className="text-lg font-bold text-[#0F172A] font-editorial">Paid Verified</h4>
                      <p className="text-xl font-extrabold font-editorial mt-1">$49 <span className="text-xs text-[#475569]">/ 150 days</span></p>
                      <p className="text-[11px] text-[#334155] mt-2 font-medium">Includes Verified Deed Badge + Official FB & IG Spotlight.</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, plan: 'Premium' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        formData.plan === 'Premium' ? 'border-[#0F172A] bg-slate-100 shadow-md ring-2 ring-[#0F172A]' : 'border-slate-200 bg-white hover:border-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#475569] uppercase font-bold">Full Year</span>
                      <h4 className="text-lg font-bold text-[#0F172A] font-editorial">Premium Elite</h4>
                      <p className="text-xl font-extrabold font-editorial mt-1">$129 <span className="text-xs text-[#475569]">/ 365 days</span></p>
                      <p className="text-[11px] text-[#334155] mt-2 font-medium">Top featured placement + viral TikTok/IG video push.</p>
                    </div>
                  </div>

                  {/* Submitter Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Your Name</label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="e.g. David Vance"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Email</label>
                      <input
                        type="email"
                        name="ownerEmail"
                        required
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        placeholder="david@domain.com"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#0F172A] uppercase mb-1.5 font-bold">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white text-xs text-[#0F172A] font-medium border border-slate-300 rounded-xl px-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-sky-600 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-luxury-outline px-5 py-3 rounded-xl text-xs font-bold"
                    >
                      ← Back to Step 2
                    </button>
                    <button
                      type="submit"
                      className="btn-luxury px-8 py-3.5 rounded-xl text-xs font-bold"
                    >
                      Transmit Dossier for Admin Review →
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>
      </ScrollReveal>

    </div>
  );
}
