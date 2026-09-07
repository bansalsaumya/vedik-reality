import React, { useState, useId } from 'react';
import { Calculator, DollarSign, Calendar, Percent, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmiCalculator({ defaultAmount = 4500000 }) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const amountInputId = useId();
  const rateInputId = useId();
  const tenureInputId = useId();

  // EMI Calculation Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = monthlyRate > 0
    ? Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      )
    : Math.round(loanAmount / totalMonths);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatLakhsCr = (val) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-borderlight bg-white shadow-xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-borderlight">
        <div className="p-3 rounded-2xl bg-cream border border-borderlight text-gold-700">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-charcoal-800">
            Property Home Loan <span className="gold-gradient-text font-serif">EMI Calculator</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Calculate your estimated monthly installment for properties in Dharuhera.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Controls */}
        <div className="space-y-6">
          
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={amountInputId} className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                Loan Amount
              </label>
              <span className="text-sm font-serif font-bold text-gold-700">
                {formatLakhsCr(loanAmount)}
              </span>
            </div>
            <input
              id={amountInputId}
              type="range"
              min={500000}
              max={20000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>₹ 5 Lakhs</span>
              <span>₹ 1 Cr</span>
              <span>₹ 2 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={rateInputId} className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm font-serif font-bold text-gold-700">
                {interestRate} %
              </span>
            </div>
            <input
              id={rateInputId}
              type="range"
              min={6.5}
              max={14.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>6.5%</span>
              <span>10.0%</span>
              <span>14.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={tenureInputId} className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                Loan Tenure (Years)
              </label>
              <span className="text-sm font-serif font-bold text-gold-700">
                {tenureYears} Years ({totalMonths} Months)
              </span>
            </div>
            <input
              id={tenureInputId}
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-gold-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Results Card */}
        <div className="p-6 rounded-2xl bg-charcoal-800 text-white space-y-6 relative overflow-hidden shadow-2xl border border-gold-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <span className="text-[11px] text-gold-400 uppercase tracking-widest font-semibold block mb-1">
              Estimated Monthly Installment
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white">
              ₹ {emi.toLocaleString('en-IN')} <span className="text-xs font-sans text-slate-300 font-normal">/ month</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Principal Amount</span>
              <span className="font-bold text-white text-sm">{formatLakhsCr(loanAmount)}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Total Interest</span>
              <span className="font-bold text-gold-400 text-sm">{formatLakhsCr(totalInterest)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <span>Total Payable: <strong className="text-white font-bold">{formatLakhsCr(totalPayment)}</strong></span>
          </div>

          <a
            href="tel:+919053848222"
            className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-transform"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Assistance for Home Loan Approval</span>
          </a>
        </div>

      </div>

    </div>
  );
}
