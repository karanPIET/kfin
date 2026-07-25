import React, { useState } from 'react';
import { Heart, CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KFS = ({ formData, handleFormChange }) => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Demo loan details
  const loanAmount = 250000;
  const tenure = 36;
  const interestRate = 8.5;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="bg-card rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-success/30 rounded-full blur-xl"></div>
              <CheckCircle className="text-success relative" size={80} />
            </div>
          </div>

          {/* Thank You Message */}
          <h2 className="text-3xl font-bold text-primary mb-2">
            Thank You!
          </h2>

          <p className="text-lg text-text/80 mb-6">
            Your loan application has been submitted successfully.
          </p>

          {/* Application Details */}
          <div className="bg-background rounded-xl p-6 mb-6 text-left">
            <h3 className="font-bold text-primary mb-4">Application Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text/70">Application Status:</span>
                <span className="font-bold text-success">✓ Submitted</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/70">Loan Amount:</span>
                <span className="font-bold text-primary">₹{loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/70">Tenure:</span>
                <span className="font-bold text-primary">{tenure} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/70">Interest Rate:</span>
                <span className="font-bold text-primary">{interestRate}% p.a.</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-secondary/10 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-bold text-text mb-3">What Happens Next?</h4>
            <ol className="text-sm text-text/80 space-y-2">
              <li>✓ <strong>Step 1:</strong> We'll review your application</li>
              <li>✓ <strong>Step 2:</strong> Verify all your documents</li>
              <li>✓ <strong>Step 3:</strong> Loan approval within 24 hours</li>
              <li>✓ <strong>Step 4:</strong> Funds will be transferred</li>
            </ol>
          </div>

          {/* Contact Info */}
          <div className="mb-6 text-sm text-text/70">
            <p>We'll send updates to your registered email:</p>
            <p className="font-bold text-primary mt-1">{formData.email}</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-bold transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/loan/personal')}
              className="w-full bg-text/10 hover:bg-text/20 text-text py-3 rounded-lg font-bold transition"
            >
              Apply for Another Loan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Loan Summary Card */}
      <div className="bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="text-secondary" size={28} />
          <h2 className="text-2xl font-bold text-primary">Loan Summary</h2>
        </div>

        {/* Main Details */}
        <div className="space-y-6">
          {/* Loan Amount Box */}
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-xl p-6">
            <p className="text-sm text-text/70 mb-2">Loan Amount</p>
            <p className="text-4xl font-bold text-secondary">₹{loanAmount.toLocaleString()}</p>
            <p className="text-xs text-text/60 mt-2">Approved loan amount based on your eligibility</p>
          </div>

          {/* Loan Details Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-text/70 mb-2">Tenure</p>
              <p className="text-2xl font-bold text-primary">{tenure}</p>
              <p className="text-xs text-text/60">Months (3 Years)</p>
            </div>

            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-text/70 mb-2">Interest Rate</p>
              <p className="text-2xl font-bold text-primary">{interestRate}%</p>
              <p className="text-xs text-text/60">Per Annum</p>
            </div>

            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-text/70 mb-2">Monthly EMI</p>
              <p className="text-2xl font-bold text-primary">
                ₹{Math.round((loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, tenure)) / (Math.pow(1 + interestRate / 100 / 12, tenure) - 1)).toLocaleString()}
              </p>
              <p className="text-xs text-text/60">Per Month</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="border-t border-text/10 pt-6">
            <h3 className="font-bold text-primary mb-4">Loan Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-text/10">
                <span className="text-text/70">Principal Amount</span>
                <span className="font-bold text-primary">₹{loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-text/10">
                <span className="text-text/70">Total Interest</span>
                <span className="font-bold text-primary">
                  ₹{Math.round((Math.round((loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, tenure)) / (Math.pow(1 + interestRate / 100 / 12, tenure) - 1)) * tenure) - loanAmount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 bg-secondary/10 px-3 rounded-lg">
                <span className="font-bold text-primary">Total Payable</span>
                <span className="font-bold text-secondary">
                  ₹{Math.round((Math.round((loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, tenure)) / (Math.pow(1 + interestRate / 100 / 12, tenure) - 1)) * tenure)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-background border border-background rounded-lg p-4">
            <p className="text-sm text-text">
              ✓ By clicking "Submit Application", you agree to our terms and conditions and loan agreement
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-lg font-bold text-lg transition"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default KFS;