import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PersonalDetails from '../components/journey/PersonalDetails';
import KYC from '../components/journey/KYC';
import Pennydrop from '../components/journey/Pennydrop';
import KFS from '../components/journey/KFS';

const LoanJourney = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    pan: '',
    dob: '',
    email: '',
    reasonOfLoan: '',
    employmentType: 'salaried',
    monthlyIncome: '',
    yearlyIncome: '',
    
    // KYC
    aadhar: '',
    otp: '',
    
    // Pennydrop
    accountNumber: '',
    ifscCode: '',
    accountVerified: false,
    
    // KFS
    loanAmount: '',
    tenure: '',
    interestRate: '',
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validation logic for each step
  const getStepValidation = () => {
    if (currentStep === 1) {
      return (
        formData.name.trim() &&
        formData.pan.trim() &&
        formData.dob &&
        formData.email.trim() &&
        formData.reasonOfLoan.trim() &&
        (formData.employmentType === 'salaried' 
          ? formData.monthlyIncome.trim() 
          : formData.yearlyIncome.trim())
      );
    } else if (currentStep === 2) {
      return (
        formData.aadhar.trim().length === 12 &&
        formData.otp.trim().length === 4
      );
    } else if (currentStep === 3) {
      return (
        formData.accountNumber.trim().length >= 9 &&
        formData.accountNumber.trim().length <= 18 &&
        formData.ifscCode.trim().length === 11 &&
        formData.accountVerified
      );
    } else if (currentStep === 4) {
      return true; // KFS always valid
    }
    return false;
  };

  const isStepValid = getStepValidation();

  const handleNext = () => {
    if (isStepValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitLoan = () => {
    // Final submission - all data is in formData
    console.log('Loan Application Submitted:', formData);
    // Show thank you message (handled in KFS component)
  };

  const steps = [
    { step: 1, label: 'Personal Details' },
    { step: 2, label: 'KYC' },
    { step: 3, label: 'Pennydrop' },
    { step: 4, label: 'KFS' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/loan/personal')}
            className="p-2 hover:bg-background rounded-lg transition flex-shrink-0"
          >
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-primary truncate">Loan Application</h1>
            <p className="text-xs text-text/70">Step {currentStep} of 4</p>
          </div>
        </div>
      </div>

      {/* Progress Bar with Labels */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Circles and Connecting Lines */}
            <div className="flex items-center justify-between">
              {steps.map((item, idx) => (
                <div key={item.step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition flex-shrink-0 ${
                      item.step <= currentStep ? 'bg-secondary' : 'bg-background border-2 border-text/20'
                    }`}
                  >
                    {item.step < currentStep ? <Check size={20} /> : item.step}
                  </div>
                  {idx < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition ${
                        item.step < currentStep ? 'bg-secondary' : 'bg-background border-2 border-text/20'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels Aligned Below Circles */}
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-text text-center w-[100px]">Personal Details</span>
              <span className="text-xs font-semibold text-text text-center flex-1">KYC</span>
              <span className="text-xs font-semibold text-text text-center flex-1">Pennydrop</span>
              <span className="text-xs font-semibold text-text text-center flex-1">KFS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 1 && (
          <PersonalDetails formData={formData} handleFormChange={handleFormChange} />
        )}
        {currentStep === 2 && (
          <KYC formData={formData} handleFormChange={handleFormChange} />
        )}
        {currentStep === 3 && (
          <Pennydrop formData={formData} handleFormChange={handleFormChange} />
        )}
        {currentStep === 4 && (
          <KFS formData={formData} handleFormChange={handleFormChange} />
        )}

        {/* Navigation Buttons with Validation */}
        <div className="flex justify-between mt-8 gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-8 py-3 rounded-lg font-bold transition ${
              currentStep === 1
                ? 'bg-background text-text/50 cursor-not-allowed'
                : 'bg-text/10 text-text hover:bg-text/20'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={currentStep === 4 ? handleSubmitLoan : handleNext}
            disabled={!isStepValid}
            style={{
              backgroundColor: isStepValid ? '#10B981' : '#E2E8F0',
              color: isStepValid ? 'white' : '#475569',
              cursor: isStepValid ? 'pointer' : 'not-allowed',
              opacity: isStepValid ? 1 : 0.6
            }}
            className="px-8 py-3 rounded-lg font-bold transition flex-1"
          >
            {currentStep === 4 ? 'Submit Application' : 'Continue →'}
          </button>
        </div>

        {/* Helper Text When Fields Not Filled */}
        {!isStepValid && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <p className="text-sm text-yellow-800">
              ⚠️ Please fill all required fields to continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanJourney;