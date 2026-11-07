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
    <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-[#2C3539]/10 bg-white">
      <div className="max-w-3xl mb-8">
        <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold">
          Financial Advisory Instrument • PRD §17.7
        </span>
        <h2 className="text-3xl sm:text-4xl font-normal text-[#1A202C] tracking-tight mt-1.5 font-editorial">
          Estimated Acquisition & Escrow Calculator
        </h2>
        <p className="text-xs text-[#64748B] mt-1 font-light leading-relaxed">
          Estimate monthly mortgage installments, county tax withholdings, and property insurance across US states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Input Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Home Price */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <label className="font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                Property Valuation
              </label>
              <span className="font-editorial text-lg font-bold text-[#1A202C]">
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
              className="w-full accent-[#C5A880] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <label className="font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-editorial text-lg font-bold text-[#A6885E]">
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
              className="w-full accent-[#C5A880] cursor-pointer"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label className="font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                  Interest Rate
                </label>
                <span className="font-mono font-bold text-[#1A202C]">
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
                className="w-full accent-[#C5A880] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5 font-semibold">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/15 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880] cursor-pointer font-medium"
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
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#FBF8F2] border border-[#2C3539]/10 space-y-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
              Estimated Monthly Outlay
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl sm:text-5xl font-bold font-editorial text-[#1A202C]">
                ${totalMonthlyPayment.toLocaleString()}
              </span>
              <span className="text-xs text-[#64748B] font-mono">/mo</span>
            </div>
          </div>

          {/* Ratio Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200">
              <div
                style={{ width: `${piShare}%` }}
                className="bg-[#1A202C] transition-all duration-300"
                title="Principal & Interest"
              />
              <div
                style={{ width: `${taxShare}%` }}
                className="bg-[#C5A880] transition-all duration-300"
                title="Property Tax"
              />
              <div
                style={{ width: `${insShare}%` }}
                className="bg-[#9CA3AF] transition-all duration-300"
                title="Insurance"
              />
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2.5 text-xs pt-2 border-t border-[#2C3539]/10">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#2C3539]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A202C]" />
                Principal & Interest
              </span>
              <span className="font-mono font-bold text-[#1A202C]">
                ${monthlyPrincipalInterest.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#2C3539]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
                Est. Property Taxes
              </span>
              <span className="font-mono font-bold text-[#1A202C]">
                ${estimatedPropertyTax.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#2C3539]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" />
                Homeowner's Insurance
              </span>
              <span className="font-mono font-bold text-[#1A202C]">
                ${estimatedInsurance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-[#9CA3AF] leading-relaxed pt-2 border-t border-[#2C3539]/5">
            *Estimates provided for informational escrow modeling. Real rates vary per lender under Federal Truth in Lending regulations.
          </div>
        </div>

      </div>
    </div>
  );
}

