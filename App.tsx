import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './app/page';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './app/dashboard/page';
import FundraisingPage from './app/dashboard/investors/page';
import AnalysisPage from './app/dashboard/analysis/page';
import CompetitorsPage from './app/dashboard/competitors/page';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="investors" element={<FundraisingPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="competitors" element={<CompetitorsPage />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;