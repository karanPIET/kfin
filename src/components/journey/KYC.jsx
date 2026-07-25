import React, { useState } from 'react';
import { Shield, MessageSquare } from 'lucide-react';

const KYC = ({ formData, handleFormChange }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSendOTP = () => {
    if (mobileNumber.trim().length === 10) {
      setOtpSent(true);
      // OTP trigger logic or API call can go here
    }
  };

  // Check if all required fields are filled
  const isFormValid = 
    formData.aadhar.trim().length === 12 &&
    formData.otp.trim().length === 4 &&
    mobileNumber.trim().length === 10;

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-secondary" size={28} />
        <h2 className="text-2xl font-bold text-primary">KYC Verification</h2>
      </div>

      <div className="space-y-6">
        {/* Aadhar Number */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Aadhar Number
          </label>
          <input
            type="text"
            value={formData.aadhar}
            onChange={(e) => handleFormChange('aadhar', e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="Enter 12-digit Aadhar number"
            maxLength="12"
            className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
          />
          <p className="text-xs text-text/60 mt-1">
            {formData.aadhar.length}/12 digits
          </p>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Mobile Number
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              className="flex-1 px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
            />
            <button
              onClick={handleSendOTP}
              disabled={mobileNumber.trim().length !== 10}
              className={`px-6 py-3 rounded-lg font-bold transition ${
                mobileNumber.trim().length === 10
                  ? 'bg-secondary hover:bg-secondary/90 text-white'
                  : 'bg-background text-text/50 cursor-not-allowed'
              }`}
            >
              Send OTP
            </button>
          </div>
          <p className="text-xs text-text/60 mt-1">
            {mobileNumber.length}/10 digits
          </p>
        </div>

        {/* OTP Section */}
        {otpSent && (
          <div className="border-2 border-secondary/30 rounded-lg p-4 bg-secondary/5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="text-secondary" size={20} />
              <p className="text-sm font-semibold text-primary">
                OTP Verification
              </p>
            </div>

            <label className="block text-sm font-semibold text-primary mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={formData.otp}
              onChange={(e) => handleFormChange('otp', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Enter 4-digit OTP"
              maxLength="4"
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none text-center text-2xl tracking-widest"
            />
            <p className="text-xs text-text/60 mt-1 text-center">
              {formData.otp.length}/4 digits
            </p>

            <p className="text-xs text-text/60 mt-3">
              Didn't receive OTP? <button className="text-secondary font-semibold hover:underline">Resend</button>
            </p>
          </div>
        )}

        {!otpSent && mobileNumber.trim().length !== 10 && (
          <div className="bg-background border border-background rounded-lg p-4">
            <p className="text-sm text-text">
              ℹ️ Enter your 10-digit mobile number and click "Send OTP" to receive verification code
            </p>
          </div>
        )}

        {otpSent && (
          <div className="bg-background border border-background rounded-lg p-4">
            <p className="text-sm text-text">
              ✓ OTP sent to {mobileNumber}. Please enter it above to continue.
            </p>
          </div>
        )}
      </div>

      {/* Validation Message */}
      {otpSent && !isFormValid && (
        <div className="mt-6 bg-background border border-background rounded-lg p-4">
          <p className="text-sm text-text">
            ⚠️ Please enter all details correctly to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default KYC;