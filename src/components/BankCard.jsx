import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BankCard = ({ bank, loanAmount, tenure, colors }) => {
  const navigate = useNavigate();

  // Default colors if not passed
  const defaultColors = {
    primary: '#0F172A',
    ctaButton: '#10B981',
    ctaHover: '#059669',
    background: '#F8FAFC',
    card: '#FFFFFF',
    headings: '#111827',
    body: '#475569',
    borders: '#E2E8F0',
    error: '#EF4444',
    success: '#16A34A',
  };

  const colorScheme = colors || defaultColors;

  // Calculate EMI correctly
  const monthlyRate = bank.ratePerAnnum / 100 / 12; // Monthly rate
  const numMonths = tenure;
  
  // EMI Formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
  const denominator = Math.pow(1 + monthlyRate, numMonths) - 1;
  const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numMonths);
  const emi = Math.round(numerator / denominator);
  
  const totalInterest = Math.round((emi * numMonths) - loanAmount);
  const totalPayable = loanAmount + totalInterest;

  // Calculate processing fee
  const processingFeeAmount = Math.round(loanAmount * (bank.processingFee / 100));

  return (
    <div 
      style={{ 
        backgroundColor: colorScheme.card,
        borderColor: colorScheme.ctaButton,
      }} 
      className="rounded-2xl p-6 shadow-lg hover:shadow-2xl transition border-b-4"
    >
      {/* Bank Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            style={{ backgroundColor: colorScheme.ctaButton }}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
          >
            {bank.logo}
          </div>
          <div>
            <h3 style={{ color: colorScheme.headings }} className="text-lg font-bold">{bank.name}</h3>
            <p style={{ color: colorScheme.body }} className="text-xs">
              {loanAmount.toLocaleString('en-IN')} for {tenure} months
            </p>
          </div>
        </div>
      </div>

      {/* Key Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Max Loan Amount */}
        <div 
          style={{ 
            backgroundColor: `${colorScheme.ctaButton}15`,
            borderColor: colorScheme.borders
          }}
          className="rounded-lg p-4 border"
        >
          <p style={{ color: colorScheme.body }} className="text-xs mb-1">Max Loan</p>
          <p style={{ color: colorScheme.headings }} className="text-lg font-bold">
            {bank.maxLoan.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Interest Rate */}
        <div 
          style={{ 
            backgroundColor: `${colorScheme.ctaButton}15`,
            borderColor: colorScheme.borders
          }}
          className="rounded-lg p-4 border"
        >
          <p style={{ color: colorScheme.body }} className="text-xs mb-1">Interest Rate</p>
          <p style={{ color: colorScheme.ctaButton }} className="text-lg font-bold">
            {bank.ratePerAnnum}% p.a.
          </p>
        </div>
      </div>

      {/* EMI Section */}
      <div 
        style={{ 
          backgroundColor: colorScheme.background,
          borderColor: colorScheme.borders
        }}
        className="rounded-lg p-4 mb-6 border"
      >
        <p style={{ color: colorScheme.body }} className="text-xs mb-2">Monthly EMI</p>
        <p style={{ color: colorScheme.ctaButton }} className="text-3xl font-bold">
          {emi.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span style={{ color: colorScheme.body }}>Processing Fee:</span>
          <span style={{ color: colorScheme.headings }} className="font-bold">
            {bank.processingFee}% ({processingFeeAmount.toLocaleString('en-IN')})
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: colorScheme.body }}>Total Interest:</span>
          <span style={{ color: colorScheme.ctaButton }} className="font-bold">
            {totalInterest.toLocaleString('en-IN')}
          </span>
        </div>
        <div 
          style={{ borderTopColor: colorScheme.borders }}
          className="border-t pt-3 flex justify-between text-sm"
        >
          <span style={{ color: colorScheme.headings }} className="font-bold">Total Payable:</span>
          <span style={{ color: colorScheme.ctaButton }} className="font-bold text-lg">
            {totalPayable.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Processing Days */}
      <div 
        style={{ 
          backgroundColor: colorScheme.success + '15',
          borderColor: colorScheme.success
        }}
        className="rounded-lg p-3 mb-6 border text-sm"
      >
        <p style={{ color: colorScheme.body }}>
          <span style={{ color: colorScheme.success }} className="font-bold">⚡ Fast Processing:</span> Approved in {bank.processingDays} business days
        </p>
      </div>

      {/* Features */}
      <div className="mb-6">
        <p style={{ color: colorScheme.body }} className="text-xs font-semibold mb-2">
          Key Features:
        </p>
        <ul className="space-y-1">
          {bank.features.map((feature, idx) => (
            <li key={idx} style={{ color: colorScheme.body }} className="text-sm flex gap-2">
              <span style={{ color: colorScheme.success }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/loan-journey')}
        style={{
          backgroundColor: colorScheme.ctaButton,
          color: 'white'
        }}
        className="w-full py-3 px-4 rounded-lg font-bold transition flex items-center justify-center gap-2 hover:opacity-90"
      >
        {bank.cta} <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default BankCard;
