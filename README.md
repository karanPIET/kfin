# FinanceAI - Loan Eligibility & Bank Comparison Platform

A complete React application for loan eligibility checking and comparing top banks' loan offers.

## 📁 Folder Structure

```
loan-platform/
├── src/
│   ├── pages/
│   │   ├── LoanPlatform.jsx          # Main home page with calculator
│   │   └── LoanProductPage.jsx       # Bank comparison page (left-right layout)
│   ├── components/
│   │   └── BankCard.jsx              # Individual bank card component
│   ├── App.jsx                       # Router setup
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open: `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## ✨ Features

### Page 1: Loan Calculator (Home)
- Enter salary, expenses, existing EMI
- Calculate eligibility
- See recommendations
- Click on Personal/Business Loan to go to bank comparison

### Page 2: Bank Comparison Page
- **Left Side**: Loan amount slider + tenure selector
- **Right Side**: 3 bank cards (Axis, HDFC, Canara)
- Real-time EMI calculation
- Bank details and comparison
- Apply buttons for each bank

## 🎯 Key Features

✅ No API calls (100% frontend)
✅ Real-time calculations
✅ Beautiful bank card design
✅ Responsive layout
✅ Smooth navigation with React Router
✅ Professional UI with Tailwind CSS

## 📊 Bank Cards Include

- Bank name and logo
- Maximum loan amount
- Interest rate (p.a.)
- EMI calculation based on selected amount & tenure
- Processing fee and time
- Total payable amount
- Bank-specific features

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## 📱 Responsive Design

- Mobile-friendly (100%)
- Tablet optimized
- Desktop perfect layout
- Sticky input panel on larger screens

## 🚀 Deploy to Netlify

1. Push to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Done!

## 💻 Customize Banks

Edit `src/pages/LoanProductPage.jsx`:

```javascript
const banks = [
  {
    name: 'Your Bank',
    maxLoan: 500000,
    ratePerAnnum: 9.0,
    processingFee: 2,
    // ... other properties
  }
];
```

## 📞 Support

For issues or questions, check the code comments or reach out!

---

**Happy Coding! 🚀**
