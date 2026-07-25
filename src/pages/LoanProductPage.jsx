import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import BankCard from "../components/BankCard";

const LoanProductPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState(250000);
  const [tenure, setTenure] = useState(36);

  // Scroll to top on page load or type change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type]);

  // New color schema
  const colors = {
    primary: "#0F172A",
    ctaButton: "#10B981",
    ctaHover: "#059669",
    background: "#F8FAFC",
    card: "#FFFFFF",
    headings: "#111827",
    body: "#475569",
    borders: "#E2E8F0",
    error: "#EF4444",
    success: "#16A34A",
  };

  // Bank Data
  const banks = [
    {
      name: "Axis Bank",
      logo: "AB",
      maxLoan: 500000,
      ratePerAnnum: 9.0,
      processingFee: 2,
      processingDays: 2,
      cta: "Apply Now",
      features: [
        "Instant Disbursal",
        "No Hidden Charges",
        "Flexible Repayment",
      ],
    },
    {
      name: "HDFC Bank",
      logo: "HD",
      maxLoan: 750000,
      ratePerAnnum: 8.5,
      processingFee: 2.5,
      processingDays: 3,
      cta: "Apply Now",
      features: [
        "Instant Approval",
        "Lifetime Benefits",
        "Zero Processing Fee",
      ],
    },
    {
      name: "Canara Bank",
      logo: "CB",
      maxLoan: 400000,
      ratePerAnnum: 8.75,
      processingFee: 1.5,
      processingDays: 2,
      cta: "Apply Now",
      features: ["Low Interest", "Quick Processing", "Simple Documentation"],
    },
  ];

  const maxLoanAmount = 500000; // 5 Lakhs

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{ backgroundColor: colors.card }}
        className="shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            style={{ color: colors.primary }}
            className="p-2 hover:opacity-70 rounded-lg transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1
              style={{ color: colors.headings }}
              className="text-2xl font-bold"
            >
              {type === "personal" ? "Personal Loan" : "Business Loan"} -
              Compare Banks
            </h1>
            <p style={{ color: colors.body }} className="text-sm">
              Choose the best offer for you
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Customization */}
          <div
            style={{ backgroundColor: colors.card }}
            className="rounded-2xl p-8 shadow-lg h-fit lg:sticky lg:top-20"
          >
            <h2
              style={{ color: colors.headings }}
              className="text-2xl font-bold mb-6"
            >
              Customize Your Loan
            </h2>

            {/* Loan Amount Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label
                  style={{ color: colors.headings }}
                  className="font-semibold"
                >
                  Loan Amount
                </label>
                <span
                  style={{ color: colors.ctaButton }}
                  className="text-xl font-bold"
                >
                  {loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max={maxLoanAmount}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{
                  accentColor: colors.ctaButton,
                  width: "100%",
                }}
                className="cursor-pointer"
              />
              <div
                style={{ color: colors.body }}
                className="text-xs mt-2 flex justify-between"
              >
                <span>Min: 10,000</span>
                <span>Max: {maxLoanAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Tenure Buttons */}
            <div className="mb-8">
              <label
                style={{ color: colors.headings }}
                className="font-semibold block mb-3"
              >
                Loan Tenure
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[12, 24, 36, 48, 60].map((month) => (
                  <button
                    key={month}
                    onClick={() => setTenure(month)}
                    style={{
                      backgroundColor:
                        tenure === month ? colors.ctaButton : colors.background,
                      color: tenure === month ? "white" : colors.body,
                      borderColor: colors.borders,
                    }}
                    className="py-3 px-4 rounded-lg font-bold border-2 transition hover:opacity-80"
                  >
                    {month}M
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div
              style={{
                backgroundColor: colors.background,
                borderColor: colors.borders,
              }}
              className="rounded-xl p-4 border-2"
            >
              <h3 style={{ color: colors.headings }} className="font-bold mb-4">
                Loan Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: colors.body }}>Loan Amount:</span>
                  <span
                    style={{ color: colors.headings }}
                    className="font-bold"
                  >
                    {loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.body }}>Tenure:</span>
                  <span
                    style={{ color: colors.headings }}
                    className="font-bold"
                  >
                    {tenure} months
                  </span>
                </div>
                <div
                  className="flex justify-between pt-2 border-t-2"
                  style={{ borderTopColor: colors.borders }}
                >
                  <span style={{ color: colors.body }}>Avg Interest Rate:</span>
                  <span
                    style={{ color: colors.ctaButton }}
                    className="font-bold"
                  >
                    8.7% p.a.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Bank Cards */}
          <div className="lg:col-span-2">
            <h2
              style={{ color: colors.headings }}
              className="text-2xl font-bold mb-6"
            >
              Available Offers
            </h2>
            <div className="space-y-6">
              {banks.map((bank) => (
                <BankCard
                  key={bank.name}
                  bank={bank}
                  loanAmount={loanAmount}
                  tenure={tenure}
                  colors={colors}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanProductPage;
