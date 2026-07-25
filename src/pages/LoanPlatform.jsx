import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, TrendingUp, DollarSign, Phone, Mail, Facebook, Instagram, Linkedin, X } from 'lucide-react';

const LoanPlatform = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [loanType, setLoanType] = useState('personal');
  const [age, setAge] = useState('');
  const [tenure, setTenure] = useState('12');
  
  // Personal Loan Fields
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  
  // Business Loan Fields
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [yearlyExpenses, setYearlyExpenses] = useState('');
  const [yearlyEMI, setYearlyEMI] = useState('');
  
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const loanAmounts = [50000, 100000, 250000];
  const colors = {
    primary: '#0B1F3A',      // Deep Navy
    secondary: '#00A878',    // Emerald Green
    success: '#10B981',      // Mint Green
    background: '#F8FAFC',   // Snow White
    text: '#0F172A',         // Slate Black
    accent: '#D4AF37',       // Gold
    card: '#FFFFFF'
  };

  const validateInputs = () => {
    const validationErrors = [];

    // Age validation
    if (!age || age.trim() === '') {
      validationErrors.push('Age is required');
    } else {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 75) {
        validationErrors.push('Age must be between 18 and 75');
      }
    }

    if (!tenure) validationErrors.push('Tenure is required');

    if (loanType === 'personal') {
      if (!monthlyIncome || monthlyIncome.trim() === '') {
        validationErrors.push('Monthly Income is required');
      } else if (isNaN(parseFloat(monthlyIncome)) || parseFloat(monthlyIncome) <= 0) {
        validationErrors.push('Monthly Income must be a valid positive number');
      }

      if (!monthlyExpenses || monthlyExpenses.trim() === '') {
        validationErrors.push('Monthly Expenses is required');
      } else if (isNaN(parseFloat(monthlyExpenses)) || parseFloat(monthlyExpenses) < 0) {
        validationErrors.push('Monthly Expenses must be a valid number');
      }

      if (monthlyEMI && (isNaN(parseFloat(monthlyEMI)) || parseFloat(monthlyEMI) < 0)) {
        validationErrors.push('Monthly EMI must be a valid number');
      }
    } else {
      if (!yearlyIncome || yearlyIncome.trim() === '') {
        validationErrors.push('Yearly Income is required');
      } else if (isNaN(parseFloat(yearlyIncome)) || parseFloat(yearlyIncome) <= 0) {
        validationErrors.push('Yearly Income must be a valid positive number');
      }

      if (!yearlyExpenses || yearlyExpenses.trim() === '') {
        validationErrors.push('Yearly Expenses is required');
      } else if (isNaN(parseFloat(yearlyExpenses)) || parseFloat(yearlyExpenses) < 0) {
        validationErrors.push('Yearly Expenses must be a valid number');
      }

      if (yearlyEMI && (isNaN(parseFloat(yearlyEMI)) || parseFloat(yearlyEMI) < 0)) {
        validationErrors.push('Yearly EMI must be a valid number');
      }
    }

    return validationErrors;
  };

  const calculateEligibility = () => {
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResults(null);
      return;
    }

    setErrors([]);
    setLoading(true);

    setTimeout(() => {
      const ageNum = parseInt(age);
      const tenureNum = parseInt(tenure);
      const interestRate = 8.5 / 100 / 12; // Monthly rate (8.5% p.a.)

      let monthlyIncomeNum, monthlyExpensesNum, monthlyEMINum;
      let criteria = {};

      if (loanType === 'personal') {
        monthlyIncomeNum = parseFloat(monthlyIncome);
        monthlyExpensesNum = parseFloat(monthlyExpenses);
        monthlyEMINum = parseFloat(monthlyEMI) || 0;
        criteria = {
          minIncome: 15000,
          minAge: 25,
          maxAge: 65,
          maxDTI: 50
        };
      } else {
        // Convert yearly to monthly for business loans
        monthlyIncomeNum = parseFloat(yearlyIncome) / 12;
        monthlyExpensesNum = parseFloat(yearlyExpenses) / 12;
        monthlyEMINum = (parseFloat(yearlyEMI) || 0) / 12;
        criteria = {
          minIncome: 25000, // ₹3,00,000 yearly = ₹25,000 monthly
          minAge: 25,
          maxAge: 70,
          maxDTI: 50
        };
      }

      // ===== ELIGIBILITY CHECKS =====
      
      // 1. Age Check
      const isAgeValid = ageNum >= criteria.minAge && ageNum <= criteria.maxAge;
      const ageMessage = isAgeValid 
        ? '✓ Age criteria matched'
        : `✗ Age criteria not matched (Min: ${criteria.minAge} years)`;

      // 2. Income Check
      const isIncomeValid = monthlyIncomeNum >= criteria.minIncome;
      const incomeMessage = isIncomeValid
        ? `✓ Income criteria matched (Min: ₹${criteria.minIncome.toLocaleString()})`
        : `✗ Income below minimum (Min: ₹${criteria.minIncome.toLocaleString()})`;

      // 3. Disposable Income Check
      const disposableIncome = monthlyIncomeNum - monthlyExpensesNum;
      const isDisposableValid = disposableIncome > 0;
      const disposableMessage = isDisposableValid
        ? `✓ Positive disposable income (₹${disposableIncome.toLocaleString()})`
        : `✗ Disposable income is negative or zero`;

      // 4. DTI (Debt-to-Income) Check
      const currentDTI = monthlyIncomeNum > 0 ? ((monthlyEMINum) / monthlyIncomeNum) * 100 : 0;
      const isDTIValid = currentDTI <= criteria.maxDTI;
      const dtiMessage = isDTIValid
        ? `✓ DTI ratio acceptable (${Math.round(currentDTI * 10) / 10}% < ${criteria.maxDTI}%)`
        : `✗ DTI ratio too high (${Math.round(currentDTI * 10) / 10}% > ${criteria.maxDTI}%)`;

      // Overall Eligibility
      const isEligible = isAgeValid && isIncomeValid && isDTIValid && isDisposableValid;

      // Calculate max EMI capacity (50% of monthly income)
      const maxEMICapacity = monthlyIncomeNum * 0.5;
      const availableEMICapacity = maxEMICapacity - monthlyEMINum;

      // Calculate recommended loan amount
      let recommendedLoan = 0;
      if (isEligible && availableEMICapacity > 0) {
        // Using EMI formula: P = EMI * [(1+r)^n - 1] / [r(1+r)^n]
        const numerator = Math.pow(1 + interestRate, tenureNum) - 1;
        const denominator = interestRate * Math.pow(1 + interestRate, tenureNum);
        const maxLoanCapacity = availableEMICapacity * (numerator / denominator);

        // Find the best matching loan amount
        for (const amount of loanAmounts) {
          if (maxLoanCapacity >= amount) {
            recommendedLoan = amount;
          }
        }
        if (!recommendedLoan && maxLoanCapacity > 0) {
          recommendedLoan = loanAmounts[0];
        }
      }

      // Calculate EMI for recommended loan
      const emiForLoan = recommendedLoan > 0 
        ? (recommendedLoan * interestRate * Math.pow(1 + interestRate, tenureNum)) / 
          (Math.pow(1 + interestRate, tenureNum) - 1)
        : 0;

      const totalInterest = Math.round((emiForLoan * tenureNum) - recommendedLoan);
      const totalPayable = recommendedLoan + totalInterest;

      const calculationResults = {
        isEligible,
        loanType,
        age: ageNum,
        monthlyIncome: monthlyIncomeNum,
        monthlyExpenses: monthlyExpensesNum,
        monthlyEMI: monthlyEMINum,
        disposableIncome: Math.max(0, disposableIncome),
        currentDTI: Math.round(currentDTI * 10) / 10,
        maxDTI: criteria.maxDTI,
        recommendedLoan,
        emi: Math.round(emiForLoan),
        totalInterest,
        totalPayable,
        tenure: tenureNum,
        // Eligibility flags
        isAgeValid,
        isIncomeValid,
        isDTIValid,
        isDisposableValid,
        maxEMICapacity: Math.round(maxEMICapacity),
        availableEMICapacity: Math.round(availableEMICapacity),
        // Messages
        ageMessage,
        incomeMessage,
        disposableMessage,
        dtiMessage,
        // Criteria info
        criteria
      };

      setResults(calculationResults);
      setLoading(false);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  const resetForm = () => {
    setAge('');
    setMonthlyIncome('');
    setMonthlyExpenses('');
    setMonthlyEMI('');
    setYearlyIncome('');
    setYearlyExpenses('');
    setYearlyEMI('');
    setResults(null);
    setErrors([]);
  };

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }} className="min-h-screen">
      {/* Navbar */}
      <nav style={{ backgroundColor: colors.card }} className="shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div style={{ backgroundColor: colors.secondary }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <h1 style={{ color: colors.primary }} className="text-2xl font-bold">FinanceAI</h1>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#products" style={{ color: colors.text }} className="hover:opacity-70 font-medium">Products</a>
            <a href="#calculator" style={{ color: colors.text }} className="hover:opacity-70 font-medium">Calculator</a>
            <a href="#contact" style={{ color: colors.text }} className="hover:opacity-70 font-medium">Contact</a>
            <button style={{ backgroundColor: colors.secondary }} className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-semibold">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary, borderBottomColor: colors.accent }} className="text-white py-20 border-b-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Smart Loan Eligibility & EMI Calculator</h2>
          <p className="text-xl mb-8 opacity-90">
            Get instant insights about your loan eligibility and find the perfect loan amount for your needs
          </p>
          <button 
            onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
            style={{ backgroundColor: colors.secondary, boxShadow: `0 0 30px ${colors.secondary}30` }}
            className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
          >
            Calculate Now →
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 style={{ color: colors.primary }} className="text-4xl font-bold text-center mb-4">Loan Products We Offer</h2>
          <p style={{ color: `${colors.text}B3` }} className="text-center mb-16">Customized financing solutions tailored to your needs</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Loan Card */}
            <Link to="/loan/personal" className="block">
              <div style={{ backgroundColor: colors.card, borderLeftColor: colors.secondary }} className="rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border-l-4 hover:scale-105 cursor-pointer">
                <div style={{ backgroundColor: `${colors.secondary}20` }} className="w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <DollarSign style={{ color: colors.secondary }} size={32} />
                </div>
                <h3 style={{ color: colors.primary }} className="text-2xl font-bold mb-4">Personal Loan</h3>
                <p style={{ color: `${colors.text}CC` }} className="mb-6">
                  Flexible personal loans for your individual needs. Get instant approval and competitive interest rates.
                </p>
                <ul className="space-y-2 mb-6">
                  <li style={{ color: colors.text }} className="flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: colors.success }} />
                    Quick Approval
                  </li>
                  <li style={{ color: colors.text }} className="flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: colors.success }} />
                    Low Interest Rates
                  </li>
                  <li style={{ color: colors.text }} className="flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: colors.success }} />
                    Compare 3 Banks
                  </li>
                </ul>
                <button style={{ color: colors.secondary }} className="font-semibold hover:opacity-80">Explore Banks →</button>
              </div>
            </Link>

            {/* Business Loan Card */}
            <Link to="/loan/business" className="block">
              <div style={{ backgroundColor: colors.card, borderLeftColor: colors.accent }} className="rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border-l-4 hover:scale-105 cursor-pointer">
                <div style={{ backgroundColor: `${colors.accent}20` }} className="w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp style={{ color: colors.accent }} size={32} />
                </div>
                <h3 style={{ color: colors.primary }} className="text-2xl font-bold mb-4">Business Loan</h3>
                <p style={{ color: `${colors.text}CC` }} className="mb-6">
                  Scale your business with tailored loans. Perfect for expansion and working capital needs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li style={{ color: colors.text }} className="flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: colors.success }} />
                    Higher Amounts
                  </li>
                  <li style={{ color: colors.text }} className="flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: colors.success }} />
                    Minimal Docs
                  </li>
                  <li style={{ color: colors.text }} className="flex items-center gap-2">
                    <CheckCircle size={20} style={{ color: colors.success }} />
                    Compare 3 Banks
                  </li>
                </ul>
                <button style={{ color: colors.accent }} className="font-semibold hover:opacity-80">Explore Banks →</button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" style={{ backgroundColor: `${colors.primary}08` }} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ color: colors.primary }} className="text-4xl font-bold text-center mb-4">Check Your Eligibility</h2>
          <p style={{ color: `${colors.text}B3` }} className="text-center mb-12">Enter your financial details to get instant insights</p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div style={{ backgroundColor: colors.card }} className="rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                {/* Age Input */}
                <div>
                  <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Age (Min: 25, Max: 65)</label>
                  <input
                    type="number"
                    min="18"
                    max="75"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    style={{ borderColor: `${colors.text}20`, color: colors.text }}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                    onFocus={(e) => e.target.style.borderColor = colors.secondary}
                    onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                  />
                </div>

                {/* Loan Type Toggle */}
                <div>
                  <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-3">Loan Type</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setLoanType('personal')}
                      style={{
                        backgroundColor: loanType === 'personal' ? colors.secondary : `${colors.text}10`,
                        color: loanType === 'personal' ? 'white' : colors.text
                      }}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold transition"
                    >
                      Personal
                    </button>
                    <button
                      onClick={() => setLoanType('business')}
                      style={{
                        backgroundColor: loanType === 'business' ? colors.primary : `${colors.text}10`,
                        color: loanType === 'business' ? 'white' : colors.text
                      }}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold transition"
                    >
                      Business
                    </button>
                  </div>
                </div>

                {/* Personal Loan Fields */}
                {loanType === 'personal' && (
                  <>
                    <div>
                      <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Monthly Salary (₹)</label>
                      <input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        placeholder="e.g., 50000"
                        style={{ borderColor: `${colors.text}20`, color: colors.text }}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                        onFocus={(e) => e.target.style.borderColor = colors.secondary}
                        onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                      />
                    </div>

                    <div>
                      <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Monthly Expenses (₹)</label>
                      <input
                        type="number"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(e.target.value)}
                        placeholder="e.g., 15000"
                        style={{ borderColor: `${colors.text}20`, color: colors.text }}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                        onFocus={(e) => e.target.style.borderColor = colors.secondary}
                        onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                      />
                    </div>

                    <div>
                      <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Existing Monthly EMI (₹)</label>
                      <input
                        type="number"
                        value={monthlyEMI}
                        onChange={(e) => setMonthlyEMI(e.target.value)}
                        placeholder="e.g., 5000 (if any)"
                        style={{ borderColor: `${colors.text}20`, color: colors.text }}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                        onFocus={(e) => e.target.style.borderColor = colors.secondary}
                        onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                      />
                    </div>
                  </>
                )}

                {/* Business Loan Fields */}
                {loanType === 'business' && (
                  <>
                    <div>
                      <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Yearly Income (₹)</label>
                      <input
                        type="number"
                        value={yearlyIncome}
                        onChange={(e) => setYearlyIncome(e.target.value)}
                        placeholder="e.g., 600000"
                        style={{ borderColor: `${colors.text}20`, color: colors.text }}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                        onFocus={(e) => e.target.style.borderColor = colors.secondary}
                        onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                      />
                    </div>

                    <div>
                      <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Yearly Expenses (₹)</label>
                      <input
                        type="number"
                        value={yearlyExpenses}
                        onChange={(e) => setYearlyExpenses(e.target.value)}
                        placeholder="e.g., 180000"
                        style={{ borderColor: `${colors.text}20`, color: colors.text }}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                        onFocus={(e) => e.target.style.borderColor = colors.secondary}
                        onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                      />
                    </div>

                    <div>
                      <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Yearly EMI (₹)</label>
                      <input
                        type="number"
                        value={yearlyEMI}
                        onChange={(e) => setYearlyEMI(e.target.value)}
                        placeholder="e.g., 60000 (if any)"
                        style={{ borderColor: `${colors.text}20`, color: colors.text }}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                        onFocus={(e) => e.target.style.borderColor = colors.secondary}
                        onBlur={(e) => e.target.style.borderColor = `${colors.text}20`}
                      />
                    </div>
                  </>
                )}

                {/* Tenure Selector */}
                <div>
                  <label style={{ color: colors.primary }} className="block text-sm font-semibold mb-2">Loan Tenure</label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    style={{ borderColor: `${colors.text}20`, color: colors.text }}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
                  >
                    <option value="12">12 Months (1 Year)</option>
                    <option value="24">24 Months (2 Years)</option>
                    <option value="36">36 Months (3 Years)</option>
                    <option value="48">48 Months (4 Years)</option>
                    <option value="60">60 Months (5 Years)</option>
                  </select>
                </div>

                {/* Error Messages */}
                {errors.length > 0 && (
                  <div style={{ backgroundColor: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' }} className="border rounded-lg p-4">
                    <div className="flex gap-2">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        {errors.map((error, idx) => (
                          <p key={idx} className="text-sm font-medium">{error}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={calculateEligibility}
                    disabled={loading}
                    style={{ backgroundColor: colors.secondary }}
                    className="flex-1 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Check Eligibility'}
                  </button>
                  <button
                    onClick={resetForm}
                    style={{ backgroundColor: `${colors.text}10`, color: colors.text }}
                    className="flex-1 font-bold py-4 rounded-lg transition hover:opacity-80"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              {results ? (
                <div ref={resultsRef} className="space-y-6">
                  {/* Eligibility Status */}
                  <div style={{ 
                    backgroundColor: results.isEligible ? colors.success : `${colors.text}15`,
                    color: results.isEligible ? 'white' : colors.text
                  }} className="rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                      {results.isEligible ? (
                        <CheckCircle size={40} className="flex-shrink-0" />
                      ) : (
                        <AlertCircle size={40} className="flex-shrink-0" />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {results.isEligible ? 'You are Eligible ✓' : 'You are Not Eligible'}
                        </h3>
                        <p className="opacity-90">
                          {results.isEligible 
                            ? 'Congratulations! You meet all the eligibility criteria. Click on a bank to proceed with your loan application.'
                            : 'Unfortunately, you do not meet the eligibility criteria at this time. Please review the details below.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Criteria */}
                  <div style={{ backgroundColor: colors.card }} className="rounded-2xl p-6 shadow-md">
                    <h4 style={{ color: colors.primary }} className="font-bold mb-4">Eligibility Criteria</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <span style={{ color: results.isAgeValid ? colors.success : '#EF4444' }} className="text-lg font-bold">
                          {results.isAgeValid ? '✓' : '✗'}
                        </span>
                        <span style={{ color: colors.text }}>{results.ageMessage}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span style={{ color: results.isIncomeValid ? colors.success : '#EF4444' }} className="text-lg font-bold">
                          {results.isIncomeValid ? '✓' : '✗'}
                        </span>
                        <span style={{ color: colors.text }}>{results.incomeMessage}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span style={{ color: results.isDTIValid ? colors.success : '#EF4444' }} className="text-lg font-bold">
                          {results.isDTIValid ? '✓' : '✗'}
                        </span>
                        <span style={{ color: colors.text }}>{results.dtiMessage}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span style={{ color: results.isDisposableValid ? colors.success : '#EF4444' }} className="text-lg font-bold">
                          {results.isDisposableValid ? '✓' : '✗'}
                        </span>
                        <span style={{ color: colors.text }}>{results.disposableMessage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div style={{ backgroundColor: colors.card, borderTopColor: colors.secondary }} className="rounded-xl p-4 shadow-sm border-t-4">
                      <p style={{ color: `${colors.text}99` }} className="text-xs mb-1">Disposable Income</p>
                      <p style={{ color: colors.primary }} className="text-xl font-bold">₹{results.disposableIncome.toLocaleString()}</p>
                    </div>

                    <div style={{ backgroundColor: colors.card, borderTopColor: colors.primary }} className="rounded-xl p-4 shadow-sm border-t-4">
                      <p style={{ color: `${colors.text}99` }} className="text-xs mb-1">DTI Ratio</p>
                      <p style={{ color: colors.primary }} className="text-xl font-bold">{results.currentDTI}%</p>
                    </div>

                    <div style={{ backgroundColor: colors.card, borderTopColor: colors.success }} className="rounded-xl p-4 shadow-sm border-t-4">
                      <p style={{ color: `${colors.text}99` }} className="text-xs mb-1">Max EMI Capacity</p>
                      <p style={{ color: colors.primary }} className="text-xl font-bold">₹{results.maxEMICapacity.toLocaleString()}</p>
                    </div>

                    <div style={{ backgroundColor: colors.card, borderTopColor: colors.accent }} className="rounded-xl p-4 shadow-sm border-t-4">
                      <p style={{ color: `${colors.text}99` }} className="text-xs mb-1">Available Capacity</p>
                      <p style={{ color: colors.primary }} className="text-xl font-bold">₹{results.availableEMICapacity.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Recommended Loan */}
                  {results.isEligible && results.recommendedLoan > 0 && (
                    <div style={{ backgroundColor: colors.card }} className="rounded-xl p-6 shadow-md border border-`${colors.text}20`">
                      <h4 style={{ color: colors.primary }} className="font-bold mb-4">Recommended Loan</h4>
                      <div style={{ backgroundColor: `${colors.secondary}15` }} className="rounded-lg p-4 mb-4">
                        <p style={{ color: `${colors.text}99` }} className="text-sm mb-1">Loan Amount</p>
                        <p style={{ color: colors.secondary }} className="text-3xl font-bold">₹{results.recommendedLoan.toLocaleString()}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span style={{ color: `${colors.text}99` }} className="text-sm">Monthly EMI:</span>
                          <span style={{ color: colors.primary }} className="font-bold">₹{results.emi.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: `${colors.text}99` }} className="text-sm">Tenure:</span>
                          <span style={{ color: colors.primary }} className="font-bold">{results.tenure} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: `${colors.text}99` }} className="text-sm">Total Interest:</span>
                          <span style={{ color: colors.secondary }} className="font-bold">₹{results.totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between">
                          <span style={{ color: colors.primary }} className="font-bold">Total Payable:</span>
                          <span style={{ color: colors.secondary }} className="font-bold text-lg">₹{results.totalPayable.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => window.location.href = `/loan/${results.loanType}`}
                        style={{ backgroundColor: colors.secondary }}
                        className="w-full text-white font-bold py-3 rounded-lg mt-4 transition hover:opacity-90"
                      >
                        Explore Banks →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ backgroundColor: colors.card }} className="rounded-2xl p-12 shadow-lg text-center border-2 border-dashed border-`${colors.text}20`">
                  <DollarSign size={48} style={{ color: `${colors.text}40` }} className="mx-auto mb-4" />
                  <p style={{ color: `${colors.text}99` }} className="text-lg">Fill in your details and click "Check Eligibility" to see results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ backgroundColor: colors.primary, borderTopColor: colors.accent }} className="text-white py-16 border-t-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ backgroundColor: colors.secondary }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">₹</span>
                </div>
                <h3 className="text-xl font-bold">FinanceAI</h3>
              </div>
              <p className="opacity-70 text-sm">Smart financial solutions for your needs.</p>
            </div>

            <div>
              <h4 style={{ color: colors.accent }} className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 opacity-70 text-sm">
                <li><a href="#products" className="hover:opacity-100 transition">Products</a></li>
                <li><a href="#calculator" className="hover:opacity-100 transition">Calculator</a></li>
                <li><a href="#" className="hover:opacity-100 transition">About</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: colors.accent }} className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 opacity-70 text-sm">
                <li className="flex items-center gap-2"><Mail size={18} />support@financeai.com</li>
                <li className="flex items-center gap-2"><Phone size={18} />+91 98999-12345</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: colors.accent }} className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"><Facebook size={20} /></a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"><Instagram size={20} /></a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center opacity-50 text-sm">
            <p>&copy; 2026 FinanceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoanPlatform;
