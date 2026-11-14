import React, { useState } from 'react';

export default function MortgageCalculator({ defaultPrice = 1850000 }) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  const downPaymentAmount = Math.round((homePrice * downPaymentPercent) / 100);
  const loanAmount = homePrice - downPaymentAmount;

  // Monthly mortgage calculation formula: M = P[r(1+r)^n]/[(1+r)^n - 1]
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPrincipalInterest =
    monthlyRate > 0
      ? Math.round(
          (loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        )
      : Math.round(loanAmount / numberOfPayments);

  const estimatedPropertyTax = Math.round((homePrice * 0.012) / 12); // ~1.2% annual
  const estimatedInsurance = Math.round((homePrice * 0.0035) / 12);  // ~0.35% annual
  const totalMonthlyPayment = monthlyPrincipalInterest + estimatedPropertyTax + estimatedInsurance;

  // Percentages for visual bar
  const piShare = Math.round((monthlyPrincipalInterest / totalMonthlyPayment) * 100);
  const taxShare = Math.round((estimatedPropertyTax / totalMonthlyPayment) * 100);
  const insShare = 100 - piShare - taxShare;

  return (
    <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-[#2B2B2B]/15 bg-white shadow-xl">
      <div className="max-w-3xl mb-8">
        <span className="text-[11px] font-mono text-[#B4B4B4] uppercase tracking-widest font-extrabold">
          Financial Advisory Instrument • USA Real Estate
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mt-1.5 font-editorial">
          Estimated Acquisition & Escrow Calculator
        </h2>
        <p className="text-xs text-[#555555] mt-1 font-medium leading-relaxed">
          Estimate monthly mortgage installments, county tax withholdings, and property insurance across US states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Input Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Home Price */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <label className="font-mono text-[#111111] uppercase tracking-wider font-bold">
                Property Valuation
              </label>
              <span className="font-editorial text-lg font-extrabold text-[#111111]">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="10000000"
              step="50000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-[#2B2B2B] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <label className="font-mono text-[#111111] uppercase tracking-wider font-bold">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-editorial text-lg font-extrabold text-[#B4B4B4]">
                ${downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#2B2B2B] cursor-pointer"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label className="font-mono text-[#111111] uppercase tracking-wider font-bold">
                  Interest Rate
                </label>
                <span className="font-mono font-extrabold text-[#111111]">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="3.5"
                max="10.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#2B2B2B] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#111111] uppercase mb-1.5 font-bold">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-white text-xs text-[#111111] border border-[#2B2B2B]/20 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#B4B4B4] cursor-pointer font-semibold shadow-sm"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results Panel & Dynamic Breakdown (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#EFEFEF]/40 border border-[#B4B4B4]/20 space-y-5 shadow-inner">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#555555] font-bold">
              Estimated Monthly Outlay
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-editorial text-[#111111]">
                ${totalMonthlyPayment.toLocaleString()}
              </span>
              <span className="text-xs text-[#555555] font-mono font-bold">/mo</span>
            </div>
          </div>

          {/* Ratio Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#2B2B2B]/10">
              <div
                style={{ width: `${piShare}%` }}
                className="bg-[#2B2B2B] transition-all duration-300"
                title="Principal & Interest"
              />
              <div
                style={{ width: `${taxShare}%` }}
                className="bg-[#555555] transition-all duration-300"
                title="Property Tax"
              />
              <div
                style={{ width: `${insShare}%` }}
                className="bg-[#8A8A8A] transition-all duration-300"
                title="Insurance"
              />
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2.5 text-xs pt-2 border-t border-[#2B2B2B]/15">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#111111] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2B2B2B]" />
                Principal & Interest
              </span>
              <span className="font-mono font-bold text-[#111111]">
                ${monthlyPrincipalInterest.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#111111] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#555555]" />
                Est. Property Taxes
              </span>
              <span className="font-mono font-bold text-[#111111]">
                ${estimatedPropertyTax.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#111111] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A8A8A]" />
                Homeowner's Insurance
              </span>
              <span className="font-mono font-bold text-[#111111]">
                ${estimatedInsurance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-[#555555] font-medium leading-relaxed pt-2 border-t border-[#2B2B2B]/15">
            *Estimates provided for informational escrow modeling. Real rates vary per lender under Federal Truth in Lending regulations.
          </div>
        </div>

      </div>
    </div>
  );
}
