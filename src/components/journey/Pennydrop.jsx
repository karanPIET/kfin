
import React, { useState } from 'react';
import { Building2, CheckCircle } from 'lucide-react';

const Pennydrop = ({ formData, handleFormChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerifyAccount = () => {
    if (formData.accountNumber.trim() && formData.ifscCode.trim()) {
      setVerifying(true);
      // Simulate verification
      setTimeout(() => {
        setVerifying(false);
        setShowModal(true);
        handleFormChange('accountVerified', true);
      }, 2000);
    }
  };

  const isFormValid = 
    formData.accountNumber.trim().length >= 10 &&
    formData.accountNumber.trim().length <= 15 &&
    formData.ifscCode.trim().length === 11 &&
    formData.accountVerified;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="text-secondary" size={28} />
          <h2 className="text-2xl font-bold text-primary">Bank Account Verification</h2>
        </div>

        <div className="space-y-6">
          {/* Account Number */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => 
                handleFormChange(
                  'accountNumber', 
                  e.target.value.replace(/\D/g, '').slice(0, 15) // Restricts to max 15 numeric digits
                )
              }
              placeholder="Enter your bank account number"
              maxLength={15}
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
            />
            <p className="text-xs text-text/60 mt-1">
              {formData.accountNumber.length}/15 characters
            </p>
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              value={formData.ifscCode}
              onChange={(e) => handleFormChange('ifscCode', e.target.value.toUpperCase().slice(0, 11))}
              placeholder="e.g., AXIS0001234"
              maxLength={11}
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none uppercase"
            />
            <p className="text-xs text-text/60 mt-1">
              {formData.ifscCode.length}/11 characters
            </p>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyAccount}
            disabled={
              !formData.accountNumber.trim() || 
              formData.accountNumber.length > 15 ||
              formData.ifscCode.trim().length !== 11 || 
              verifying || 
              formData.accountVerified
            }
            className={`w-full py-3 rounded-lg font-bold transition ${
              !formData.accountNumber.trim() || 
              formData.accountNumber.length > 15 ||
              formData.ifscCode.trim().length !== 11 || 
              verifying || 
              formData.accountVerified
                ? 'bg-background text-text/50 cursor-not-allowed'
                : 'bg-secondary hover:bg-secondary/90 text-white'
            }`}
          >
            {verifying ? 'Verifying Account...' : formData.accountVerified ? '✓ Account Verified' : 'Verify Account'}
          </button>

          {/* Info Box */}
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
            <p className="text-sm text-text">
              🏦 We'll verify your account with a small deposit. This is a secure process.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-success" size={60} />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              Account Verified!
            </h3>

            <p className="text-text mb-6">
              Your bank account <span className="font-bold">{formData.accountNumber.slice(-4)}</span> has been successfully verified.
            </p>

            <div className="bg-success/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-success font-semibold">
                ✓ Account verification complete
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-bold transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Validation Message */}
      {!formData.accountVerified && (
        <div className="bg-background border border-background rounded-lg p-4">
          <p className="text-sm text-text">
            ⚠️ Please enter your account details and verify to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default Pennydrop;