import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmployeeDashboard from './dashboard/EmployeeDashboard';
import HRDashboard from './dashboard/HRDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user.role === 'hr' ? (
            <HRDashboard />
          ) : (
            <EmployeeDashboard />
          )
        }
      />
    </Routes>
  );
};

export default Dashboard;