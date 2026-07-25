
import React from 'react';
import { User, Briefcase } from 'lucide-react';

const PersonalDetails = ({ formData, handleFormChange }) => {

  // --- Helper Functions for Validation ---

  // Rule 2: PAN format check (5 Alphabets, 4 Digits, 1 Alphabet)
  const isPanValid = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  // Rule 3: Age check between 18 and 64 relative to today
  const isDobValid = (dobString) => {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();

    if (isNaN(dob.getTime())) return false;

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 18 && age <= 64;
  };

  // Rule 4: Email restriction - alphanumeric only before @, domain must be gmail/yahoo/outlook.com
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9.]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
    return emailRegex.test(email.toLowerCase());
  };

  // Rule 5: Monthly Income (5 to 6 digits)
  const isMonthlyIncomeValid = (income) => {
    const incomeStr = String(income).trim();
    return /^\d{5,6}$/.test(incomeStr);
  };

  // Rule 6: Yearly Income (Up to 1 Crore = 10,000,000)
  const isYearlyIncomeValid = (income) => {
    const incomeNum = Number(income);
    return !isNaN(incomeNum) && incomeNum > 0 && incomeNum <= 10000000;
  };

  // --- Input Handlers with Format Normalization ---

  // Rule 1: Name takes only alphabets and spaces, max 50 characters
  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    handleFormChange('name', val);
  };

  // Rule 2: PAN auto-converts to UPPERCASE and limits to 10 characters
  const handlePanChange = (e) => {
    const val = e.target.value.toUpperCase().slice(0, 10);
    handleFormChange('pan', val);
  };

  // --- Strict Validation Evaluation for Continue Button Gate ---
  const isNameValid = formData.name.trim().length > 0 && formData.name.trim().length <= 50;
  const isPanOk = isPanValid(formData.pan);
  const isDobOk = isDobValid(formData.dob);
  const isEmailOk = isEmailValid(formData.email);
  const isReasonOk = Boolean(formData.reasonOfLoan.trim());

  const isEmploymentOk = formData.employmentType === 'salaried'
    ? isMonthlyIncomeValid(formData.monthlyIncome)
    : formData.employmentType === 'self-employed'
      ? isYearlyIncomeValid(formData.yearlyIncome)
      : false;

  const isFormValid = isNameValid && isPanOk && isDobOk && isEmailOk && isReasonOk && isEmploymentOk;

  return (
    <div className="space-y-8">
      {/* Personal Details Section */}
      <div className="bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-secondary" size={28} />
          <h2 className="text-2xl font-bold text-primary">Personal Details</h2>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Full Name (As per PAN)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter full name (alphabets only, max 50 chars)"
              maxLength={50}
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
            />
            {formData.name && !isNameValid && (
              <p className="text-xs text-red-500 mt-1">Please enter a valid name up to 50 characters.</p>
            )}
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              PAN Number
            </label>
            <input
              type="text"
              value={formData.pan}
              onChange={handlePanChange}
              placeholder="e.g., ABCDE1234F"
              maxLength={10}
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none uppercase"
            />
            {formData.pan && !isPanOk && (
              <p className="text-xs text-red-500 mt-1">Format must be 5 letters, 4 numbers, 1 letter (e.g., ABCDE1234F).</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Date of Birth (As per PAN)
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleFormChange('dob', e.target.value)}
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
            />
            {formData.dob && !isDobOk && (
              <p className="text-xs text-red-500 mt-1">Age must be between 18 and 64 years old as of today.</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              placeholder="your.email@gmail.com"
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
            />
            {formData.email && !isEmailOk && (
              <p className="text-xs text-red-500 mt-1">
                Must end with @gmail.com, @yahoo.com, or @outlook.com with no special characters before @.
              </p>
            )}
          </div>

          {/* Reason for Loan */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Reason for Loan
            </label>
            <select
              value={formData.reasonOfLoan}
              onChange={(e) => handleFormChange('reasonOfLoan', e.target.value)}
              className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
            >
              <option value="">Select reason</option>
              <option value="home">Home Loan</option>
              <option value="education">Education</option>
              <option value="personal">Personal Expenses</option>
              <option value="business">Business</option>
              <option value="medical">Medical</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employer Details Section */}
      <div className="bg-card rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-secondary" size={28} />
          <h2 className="text-2xl font-bold text-primary">Employment Details</h2>
        </div>

        <div className="space-y-6">
          {/* Employment Type */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-3">
              Employment Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="employmentType"
                  value="salaried"
                  checked={formData.employmentType === 'salaried'}
                  onChange={(e) => handleFormChange('employmentType', e.target.value)}
                  className="w-4 h-4 text-secondary"
                />
                <span className="text-text">Salaried Employee</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="employmentType"
                  value="self-employed"
                  checked={formData.employmentType === 'self-employed'}
                  onChange={(e) => handleFormChange('employmentType', e.target.value)}
                  className="w-4 h-4 text-secondary"
                />
                <span className="text-text">Self-Employed</span>
              </label>
            </div>
          </div>

          {/* Monthly Income (for Salaried) */}
          {formData.employmentType === 'salaried' && (
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Monthly Income (₹)
              </label>
              <input
                type="text"
                value={formData.monthlyIncome}
                onChange={(e) => handleFormChange('monthlyIncome', e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter monthly income (5 to 6 digits, e.g., 50000)"
                maxLength={6}
                inputMode="numeric"
                className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
              />
              {formData.monthlyIncome && !isMonthlyIncomeValid(formData.monthlyIncome) && (
                <p className="text-xs text-red-500 mt-1">Monthly income must be between 5 and 6 digits (₹10,000 – ₹9,99,999).</p>
              )}
            </div>
          )}

          {/* Yearly Income (for Self-Employed) */}
          {formData.employmentType === 'self-employed' && (
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Yearly Income (₹)
              </label>
              <input
                type="text"
                value={formData.yearlyIncome}
                onChange={(e) => handleFormChange('yearlyIncome', e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="Enter yearly income (max ₹1,00,00,000)"
                maxLength={8}
                inputMode="numeric"
                className="w-full px-4 py-3 border-2 border-text/20 rounded-lg focus:border-secondary focus:outline-none"
              />
              {formData.yearlyIncome && !isYearlyIncomeValid(formData.yearlyIncome) && (
                <p className="text-xs text-red-500 mt-1">Yearly income must not exceed ₹1,00,00,000 (1 Crore).</p>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default PersonalDetails;