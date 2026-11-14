import React, { useState } from 'react';

/**
 * Checkout screen for paid listing plans (front end only).
 *
 * TODO (backend): replace the simulated charge in `handlePay` with a real
 * payment provider (e.g. Stripe Payment Element / Checkout). Card details
 * must never be sent to our own server; the provider's SDK collects them.
 */

const digits = (v) => v.replace(/\D/g, '');

function cardBrand(num) {
  if (/^4/.test(num)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(num)) return 'Mastercard';
  if (/^3[47]/.test(num)) return 'Amex';
  if (/^6(011|5)/.test(num)) return 'Discover';
  return '';
}

function luhnValid(num) {
  let sum = 0;
  let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return num.length >= 13 && sum % 10 === 0;
}

function formatCard(v) {
  const d = digits(v).slice(0, 19);
  return cardBrand(d) === 'Amex'
    ? d.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '))
    : d.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(v) {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

function expiryValid(v) {
  const d = digits(v);
  if (d.length !== 4) return false;
  const month = Number(d.slice(0, 2));
  const year = 2000 + Number(d.slice(2));
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

const inputCls =
  'w-full bg-white text-sm text-[#111111] font-medium border rounded-xl px-4 py-3 placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#111111] shadow-sm transition-colors';

export default function PaymentStep({ plan, listingTitle, email, onBack, onPaid }) {
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '', zip: '' });
  const [touched, setTouched] = useState({});
  const [processing, setProcessing] = useState(false);

  const num = digits(card.number);
  const brand = cardBrand(num);
  const errors = {
    name: card.name.trim().length < 2 ? 'Enter the name on your card' : '',
    number: !luhnValid(num) ? 'Enter a valid card number' : '',
    expiry: !expiryValid(card.expiry) ? 'Enter a valid expiry date' : '',
    cvc: !/^\d{3,4}$/.test(card.cvc) ? 'Enter the 3 or 4 digit code' : '',
    zip: !/^\d{5}$/.test(card.zip) ? 'Enter a 5 digit ZIP code' : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const show = (k) => touched[k] && errors[k];

  const set = (k, v) => setCard((c) => ({ ...c, [k]: v }));
  const blur = (k) => setTouched((t) => ({ ...t, [k]: true }));

  const handlePay = (e) => {
    e.preventDefault();
    setTouched({ name: true, number: true, expiry: true, cvc: true, zip: true });
    if (hasErrors || processing) return;
    setProcessing(true);
    // Simulated charge until the payment provider is connected
    setTimeout(() => {
      onPaid({
        receipt: `RCPT-${Date.now().toString(36).toUpperCase()}`,
        amount: plan.price,
        last4: num.slice(-4),
        brand: brand || 'Card',
      });
    }, 1600);
  };

  const field = (k) => `${inputCls} ${show(k) ? 'border-red-400' : 'border-[#2B2B2B]/25'}`;
  const price = `$${plan.price.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-[#111111] font-editorial border-b border-[#2B2B2B]/15 pb-3">
        Step 4: Payment
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Order summary */}
        <aside className="md:col-span-2 md:order-2 rounded-2xl bg-[#111111] text-white p-6 space-y-5 h-fit">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold">Order summary</p>
          <div>
            <p className="text-lg font-bold font-editorial">{plan.name}</p>
            <p className="text-xs text-white/60 mt-0.5">{plan.days}-day listing</p>
          </div>
          <div className="text-xs space-y-2 border-t border-white/10 pt-4">
            <div className="flex justify-between gap-3">
              <span className="text-white/60">Listing</span>
              <span className="font-semibold text-right truncate max-w-[60%]">{listingTitle || 'Your property'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Plan</span>
              <span className="font-semibold">{price}</span>
            </div>
          </div>
          <div className="flex justify-between items-baseline border-t border-white/10 pt-4">
            <span className="text-xs text-white/60 font-semibold">Total due today</span>
            <span className="text-2xl font-extrabold font-editorial">{price}</span>
          </div>
          <ul className="text-[11px] text-white/70 space-y-1.5">
            {plan.perks.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-white/45 leading-relaxed">
            Your listing goes live once payment is confirmed and the deed review is complete. A receipt is sent to{' '}
            <span className="text-white/70">{email || 'your email'}</span>.
          </p>
        </aside>

        {/* Card form */}
        <form onSubmit={handlePay} noValidate className="md:col-span-3 md:order-1 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#111111]">Card details</p>
            <div className="flex gap-1.5 text-[9px] font-bold uppercase tracking-wider" aria-hidden="true">
              {['Visa', 'Mastercard', 'Amex', 'Discover'].map((b) => (
                <span
                  key={b}
                  className={`px-1.5 py-0.5 rounded border transition-colors ${
                    brand === b ? 'bg-[#111111] text-white border-[#111111]' : 'text-[#6B6B6B] border-[#2B2B2B]/20'
                  }`}
                >
                  {b === 'Mastercard' ? 'MC' : b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="pay-name" className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Name on card</label>
            <input id="pay-name" autoComplete="cc-name" value={card.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} placeholder="David Vance" className={field('name')} />
            {show('name') && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="pay-number" className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Card number</label>
            <input id="pay-number" inputMode="numeric" autoComplete="cc-number" value={card.number} onChange={(e) => set('number', formatCard(e.target.value))} onBlur={() => blur('number')} placeholder="1234 5678 9012 3456" className={`${field('number')} font-mono tracking-wider`} />
            {show('number') && <p className="mt-1 text-[11px] text-red-500">{errors.number}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="pay-exp" className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">Expiry</label>
              <input id="pay-exp" inputMode="numeric" autoComplete="cc-exp" value={card.expiry} onChange={(e) => set('expiry', formatExpiry(e.target.value))} onBlur={() => blur('expiry')} placeholder="MM / YY" className={`${field('expiry')} font-mono`} />
            </div>
            <div>
              <label htmlFor="pay-cvc" className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">CVC</label>
              <input id="pay-cvc" inputMode="numeric" autoComplete="cc-csc" value={card.cvc} onChange={(e) => set('cvc', digits(e.target.value).slice(0, 4))} onBlur={() => blur('cvc')} placeholder="123" className={`${field('cvc')} font-mono`} />
            </div>
            <div>
              <label htmlFor="pay-zip" className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">ZIP</label>
              <input id="pay-zip" inputMode="numeric" autoComplete="postal-code" value={card.zip} onChange={(e) => set('zip', digits(e.target.value).slice(0, 5))} onBlur={() => blur('zip')} placeholder="78701" className={`${field('zip')} font-mono`} />
            </div>
          </div>
          {(show('expiry') || show('cvc') || show('zip')) && (
            <p className="-mt-2 text-[11px] text-red-500">{errors.expiry || errors.cvc || errors.zip}</p>
          )}

          <button
            type="submit"
            disabled={processing}
            className="btn-luxury w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
          >
            {processing ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                Processing payment…
              </>
            ) : (
              <>Pay {price}</>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B6B6B] font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 118 0v4" />
            </svg>
            Secure checkout. Your card details are encrypted.
          </p>

          <button type="button" onClick={onBack} disabled={processing} className="btn-luxury-outline px-5 py-3 rounded-xl text-xs font-bold">
            ← Back to plans
          </button>
        </form>
      </div>
    </div>
  );
}
