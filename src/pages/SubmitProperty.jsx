import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/common/ScrollReveal';
import MediaUploader from '../components/common/MediaUploader';
import PaymentStep from '../components/common/PaymentStep';
import { LISTING_RULES } from '../config/listingRules';

// Paid plans go through checkout before the listing is submitted; Free skips it.
const PAID_PLANS = {
  Paid: {
    name: 'Paid Verified',
    price: 49,
    days: 150,
    perks: ['Verified Deed Badge', 'Prioritized search placement', 'Official FB & IG spotlight'],
  },
  Premium: {
    name: 'Premium Elite',
    price: 129,
    days: 365,
    perks: ['Top featured placement', 'Verified Deed Badge', 'TikTok & IG video push'],
  },
};

export default function SubmitProperty() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [payment, setPayment] = useState(null);
  const [refToken] = useState(() => `#TX-${Math.floor(1000 + Math.random() * 9000)}`);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [mediaError, setMediaError] = useState('');

  const { photos: PHOTO_LIMIT, videos: VIDEO_LIMIT } = LISTING_RULES;
  const mediaValid =
    photos.length >= PHOTO_LIMIT.min && photos.length <= PHOTO_LIMIT.max &&
    videos.length >= VIDEO_LIMIT.min && videos.length <= VIDEO_LIMIT.max;

  const goToStep3 = () => {
    if (!mediaValid) {
      const parts = [];
      if (photos.length < PHOTO_LIMIT.min) parts.push(`at least ${PHOTO_LIMIT.min} photos`);
      if (videos.length < VIDEO_LIMIT.min) parts.push(`at least ${VIDEO_LIMIT.min} video`);
      setMediaError(`Please add ${parts.join(' and ')} to continue.`);
      return;
    }
    setMediaError('');
    setStep(3);
  };

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

  const paidPlan = PAID_PLANS[formData.plan];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paidPlan) {
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSubmitted(true);
  };

  const handlePaid = (result) => {
    setPayment(result);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <ScrollReveal direction="down">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6E6E6E] font-extrabold">
            Administrative Deed Verification Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] font-editorial">
            Submit Property & Deed for Review
          </h1>
          <p className="text-sm text-[#2B2B2B] max-w-xl mx-auto font-medium leading-relaxed">
            All listings undergo administrative verification before entering public syndication. Complete the 3-step submission to obtain your Verified Deed badge.
          </p>
        </div>
      </ScrollReveal>

      {/* Step Progress Tracker */}
      <ScrollReveal direction="up" delay={50}>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono">
          <div className={`px-4 py-2 rounded-full border transition-all ${step === 1 ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md' : 'bg-white text-[#2B2B2B] border-[#2B2B2B]/25 font-semibold'}`}>
            01. Specs & Location
          </div>
          <span className="text-[#6E6E6E] font-bold">→</span>
          <div className={`px-4 py-2 rounded-full border transition-all ${step === 2 ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md' : 'bg-white text-[#2B2B2B] border-[#2B2B2B]/25 font-semibold'}`}>
            02. Media & Deed Compliance
          </div>
          <span className="text-[#6E6E6E] font-bold">→</span>
          <div className={`px-4 py-2 rounded-full border transition-all ${step === 3 ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md' : 'bg-white text-[#2B2B2B] border-[#2B2B2B]/25 font-semibold'}`}>
            03. Syndication Tier
          </div>
          {paidPlan && (
            <>
              <span className="text-[#6E6E6E] font-bold">→</span>
              <div className={`px-4 py-2 rounded-full border transition-all ${step === 4 ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md' : 'bg-white text-[#2B2B2B] border-[#2B2B2B]/25 font-semibold'}`}>
                04. Payment
              </div>
            </>
          )}
        </div>
      </ScrollReveal>

      {/* Main Glass Card Form */}
      <ScrollReveal direction="up" delay={100}>
        <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-[#2B2B2B]/15 shadow-2xl bg-white">
          
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EAEAEA] text-[#2B2B2B] flex items-center justify-center mx-auto text-2xl font-bold font-editorial">
                ✓
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111] font-editorial">
                Property Submitted for Administrative Review
              </h2>
              <p className="text-xs text-[#2B2B2B] max-w-md mx-auto leading-relaxed font-medium">
                Your submission for <span className="font-bold text-[#111111]">{formData.title || 'the submitted parcel'}</span> has been assigned reference token <span className="font-mono text-[#6E6E6E] font-bold">{refToken}</span>. Our compliance desk reviews deeds within 24 hours.
              </p>
              {payment && (
                <div className="max-w-sm mx-auto rounded-2xl border border-[#2B2B2B]/15 bg-[#F6F6F6] p-4 text-left text-xs space-y-1.5">
                  <p className="font-bold text-[#111111] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    Payment confirmed
                  </p>
                  <div className="flex justify-between"><span className="text-[#555555]">Plan</span><span className="font-semibold text-[#111111]">{paidPlan?.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#555555]">Amount</span><span className="font-semibold text-[#111111]">${payment.amount.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-[#555555]">Card</span><span className="font-semibold text-[#111111]">{payment.brand} •••• {payment.last4}</span></div>
                  <div className="flex justify-between"><span className="text-[#555555]">Receipt</span><span className="font-mono font-semibold text-[#111111]">{payment.receipt}</span></div>
                </div>
              )}
              <div className="pt-4 flex justify-center gap-3">
                <Link to="/search" className="btn-luxury px-6 py-3 rounded-xl text-xs font-bold">
                  Back to Marketplace
                </Link>
              </div>
            </div>
          ) : step === 4 && paidPlan ? (
            <PaymentStep
              plan={paidPlan}
              listingTitle={formData.title}
              email={formData.ownerEmail}
              onBack={() => setStep(3)}
              onPaid={handlePaid}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP 1: Specs & Location */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#111111] font-editorial border-b border-[#2B2B2B]/15 pb-3">
                    Step 1: Property Identity & Physical Specifications
                  </h3>

                  <div>
                    <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Listing Headline / Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Modern Hill Country Estate with Equestrian Barns"
                      className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-white text-xs text-[#111111] font-semibold border border-[#2B2B2B]/25 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#B4B4B4] cursor-pointer shadow-sm"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Land">Land / Timber / Farm</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Rental">Rental</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Listing Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-white text-xs text-[#111111] font-semibold border border-[#2B2B2B]/25 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#B4B4B4] cursor-pointer shadow-sm"
                      >
                        <option value="Sale">For Sale</option>
                        <option value="Rent">For Rent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Asking Price ($ USD)</label>
                      <input
                        type="number"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 1450000"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. 1204 Oak Ridge Dr"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Austin"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">State</label>
                      <select
                        name="stateCode"
                        value={formData.stateCode}
                        onChange={handleChange}
                        className="w-full bg-white text-xs text-[#111111] font-semibold border border-[#2B2B2B]/25 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#B4B4B4] cursor-pointer shadow-sm"
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
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        placeholder="4"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Bathrooms</label>
                      <input
                        type="number"
                        step="0.5"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        placeholder="3.5"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Acreage</label>
                      <input
                        type="number"
                        step="0.1"
                        name="acreage"
                        value={formData.acreage}
                        onChange={handleChange}
                        placeholder="10.5"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Square Feet</label>
                      <input
                        type="number"
                        name="sqft"
                        value={formData.sqft}
                        onChange={handleChange}
                        placeholder="3800"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 shadow-sm"
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
                  <h3 className="text-xl font-bold text-[#111111] font-editorial border-b border-[#2B2B2B]/15 pb-3">
                    Step 2: Legal Verification & Media Files
                  </h3>

                  {/* Photos & videos with enforced listing limits */}
                  <p className="text-xs text-[#555555] font-medium -mt-2">
                    Add {PHOTO_LIMIT.min}–{PHOTO_LIMIT.max} photos and {VIDEO_LIMIT.min}–{VIDEO_LIMIT.max} videos. The first photo becomes the listing cover.
                  </p>
                  <MediaUploader kind="photo" files={photos} onChange={(f) => { setPhotos(f); setMediaError(''); }} min={PHOTO_LIMIT.min} max={PHOTO_LIMIT.max} />
                  <MediaUploader kind="video" files={videos} onChange={(f) => { setVideos(f); setMediaError(''); }} min={VIDEO_LIMIT.min} max={VIDEO_LIMIT.max} />
                  {mediaError && (
                    <p role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-800">{mediaError}</p>
                  )}

                  {/* Required Legal Attestation */}
                  <div className="p-5 rounded-2xl bg-[#EFEFEF]/60 border border-[#B4B4B4]/40 space-y-3">
                    <h4 className="text-xs font-bold text-[#111111] uppercase font-mono">
                      Administrative Compliance Checklist
                    </h4>
                    <label className="flex items-start gap-2.5 text-xs text-[#111111] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        name="hasDeed"
                        checked={formData.hasDeed}
                        onChange={handleChange}
                        className="mt-0.5 accent-[#2B2B2B]"
                      />
                      <span>I confirm I possess the recorded Grant Deed, Title Policy, or written representative authority for this parcel.</span>
                    </label>
                    <label className="flex items-start gap-2.5 text-xs text-[#111111] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        name="hasTaxReceipt"
                        checked={formData.hasTaxReceipt}
                        onChange={handleChange}
                        className="mt-0.5 accent-[#2B2B2B]"
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
                      onClick={goToStep3}
                      aria-disabled={!mediaValid}
                      className={`btn-luxury px-6 py-3.5 rounded-xl text-xs font-bold ${mediaValid ? '' : 'opacity-60'}`}
                    >
                      Continue to Step 3: Select Plan →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Plan Selection & Submission */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#111111] font-editorial border-b border-[#2B2B2B]/15 pb-3">
                    Step 3: Select Listing Duration & Promotion Plan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setFormData({ ...formData, plan: 'Free' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        formData.plan === 'Free' ? 'border-[#111111] bg-[#EFEFEF]/50 shadow-md ring-2 ring-[#111111]' : 'border-[#2B2B2B]/15 bg-white hover:border-[#2B2B2B]/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#555555] uppercase font-bold">Basic Entry</span>
                      <h4 className="text-lg font-bold text-[#111111] font-editorial">Free Listing</h4>
                      <p className="text-xl font-extrabold font-editorial mt-1">$0 <span className="text-xs text-[#555555]">/ 45 days</span></p>
                      <p className="text-[11px] text-[#2B2B2B] mt-2 font-medium">Standard public search display without social marketing.</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, plan: 'Paid' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                        formData.plan === 'Paid' ? 'border-[#B4B4B4] bg-[#EFEFEF]/60 shadow-md ring-2 ring-[#B4B4B4]' : 'border-[#2B2B2B]/15 bg-white hover:border-[#2B2B2B]/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#6E6E6E] uppercase font-extrabold">Most Popular</span>
                      <h4 className="text-lg font-bold text-[#111111] font-editorial">Paid Verified</h4>
                      <p className="text-xl font-extrabold font-editorial mt-1">$49 <span className="text-xs text-[#555555]">/ 150 days</span></p>
                      <p className="text-[11px] text-[#2B2B2B] mt-2 font-medium">Includes Verified Deed Badge + Official FB & IG Spotlight.</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, plan: 'Premium' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        formData.plan === 'Premium' ? 'border-[#111111] bg-[#EFEFEF]/50 shadow-md ring-2 ring-[#111111]' : 'border-[#2B2B2B]/15 bg-white hover:border-[#2B2B2B]/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-[#555555] uppercase font-bold">Full Year</span>
                      <h4 className="text-lg font-bold text-[#111111] font-editorial">Premium Elite</h4>
                      <p className="text-xl font-extrabold font-editorial mt-1">$129 <span className="text-xs text-[#555555]">/ 365 days</span></p>
                      <p className="text-[11px] text-[#2B2B2B] mt-2 font-medium">Top featured placement + viral TikTok/IG video push.</p>
                    </div>
                  </div>

                  {/* Submitter Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2B2B2B]/15">
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Your Name</label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="e.g. David Vance"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Email</label>
                      <input
                        type="email"
                        name="ownerEmail"
                        required
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        placeholder="david@domain.com"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white text-xs text-[#111111] font-medium border border-[#2B2B2B]/25 rounded-xl px-4 py-3 placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#B4B4B4] shadow-sm"
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
                      {paidPlan ? `Continue to Payment · $${paidPlan.price} →` : 'Submit Free Listing →'}
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
