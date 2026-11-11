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
    <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-[#3E4E31]/15 bg-white shadow-xl">
      <div className="max-w-3xl mb-8">
        <span className="text-[11px] font-mono text-[#BFA668] uppercase tracking-widest font-extrabold">
          Financial Advisory Instrument • USA Real Estate
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2315] tracking-tight mt-1.5 font-editorial">
          Estimated Acquisition & Escrow Calculator
        </h2>
        <p className="text-xs text-[#596638] mt-1 font-medium leading-relaxed">
          Estimate monthly mortgage installments, county tax withholdings, and property insurance across US states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Input Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Home Price */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <label className="font-mono text-[#1A2315] uppercase tracking-wider font-bold">
                Property Valuation
              </label>
              <span className="font-editorial text-lg font-extrabold text-[#1A2315]">
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
              className="w-full accent-[#3E4E31] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <label className="font-mono text-[#1A2315] uppercase tracking-wider font-bold">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-editorial text-lg font-extrabold text-[#BFA668]">
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
              className="w-full accent-[#3E4E31] cursor-pointer"
            />
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <label className="font-mono text-[#1A2315] uppercase tracking-wider font-bold">
                  Interest Rate
                </label>
                <span className="font-mono font-extrabold text-[#1A2315]">
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
                className="w-full accent-[#3E4E31] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#1A2315] uppercase mb-1.5 font-bold">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-white text-xs text-[#1A2315] border border-[#3E4E31]/20 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#BFA668] cursor-pointer font-semibold shadow-sm"
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
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#F4EDDA]/40 border border-[#BFA668]/20 space-y-5 shadow-inner">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#596638] font-bold">
              Estimated Monthly Outlay
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-editorial text-[#1A2315]">
                ${totalMonthlyPayment.toLocaleString()}
              </span>
              <span className="text-xs text-[#596638] font-mono font-bold">/mo</span>
            </div>
          </div>

          {/* Ratio Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#3E4E31]/10">
              <div
                style={{ width: `${piShare}%` }}
                className="bg-[#3E4E31] transition-all duration-300"
                title="Principal & Interest"
              />
              <div
                style={{ width: `${taxShare}%` }}
                className="bg-[#596638] transition-all duration-300"
                title="Property Tax"
              />
              <div
                style={{ width: `${insShare}%` }}
                className="bg-[#838961] transition-all duration-300"
                title="Insurance"
              />
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2.5 text-xs pt-2 border-t border-[#3E4E31]/15">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#1A2315] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3E4E31]" />
                Principal & Interest
              </span>
              <span className="font-mono font-bold text-[#1A2315]">
                ${monthlyPrincipalInterest.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#1A2315] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#596638]" />
                Est. Property Taxes
              </span>
              <span className="font-mono font-bold text-[#1A2315]">
                ${estimatedPropertyTax.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-[#1A2315] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#838961]" />
                Homeowner's Insurance
              </span>
              <span className="font-mono font-bold text-[#1A2315]">
                ${estimatedInsurance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-[#596638] font-medium leading-relaxed pt-2 border-t border-[#3E4E31]/15">
            *Estimates provided for informational escrow modeling. Real rates vary per lender under Federal Truth in Lending regulations.
          </div>
        </div>

      </div>
    </div>
  );
}
