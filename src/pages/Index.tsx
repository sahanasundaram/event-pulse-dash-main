
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Overview from '@/components/dashboard/Overview';
import UserInsights from '@/components/dashboard/UserInsights';
import DeveloperMetrics from '@/components/dashboard/DeveloperMetrics';
import EventStream from '@/components/dashboard/EventStream';
import AlertsPage from '@/components/dashboard/AlertsPage';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/user-insights" element={<UserInsights />} />
          <Route path="/developer-metrics" element={<DeveloperMetrics />} />
          <Route path="/event-stream" element={<EventStream />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
};

export default Index;
