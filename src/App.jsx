import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoanPlatform from './pages/LoanPlatform';
import LoanProductPage from './pages/LoanProductPage';
import LoanJourney from './pages/LoanJourney';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoanPlatform />} />
        <Route path="/loan/:type" element={<LoanProductPage />} />
        <Route path="/loan-journey" element={<LoanJourney />} />
      </Routes>
    </BrowserRouter>
  );
}
