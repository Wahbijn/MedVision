import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireRole }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireRole && user?.role !== requireRole) {
        // Redirect to appropriate dashboard based on actual role
        if (user?.role === 'doctor') {
            return <Navigate to="/doctor/dashboard" replace />;
        } else {
            return <Navigate to="/patient/dashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
