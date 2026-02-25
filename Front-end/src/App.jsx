import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ROUTES, USER_ROLES } from './utils/constants';

// Pages
import Login from './pages/auth/Login';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AnalysisPage from './pages/AnalysisPage';

function AppRoutes() {
    const { isAuthenticated, isDoctor, isPatient } = useAuth();

    return (
        <Routes>
            {/* Public Route */}
            <Route
                path={ROUTES.LOGIN}
                element={isAuthenticated ? (
                    isDoctor ? <Navigate to={ROUTES.DOCTOR_DASHBOARD} replace /> : <Navigate to={ROUTES.PATIENT_DASHBOARD} replace />
                ) : (
                    <Login />
                )}
            />

            {/* Patient Routes */}
            <Route
                path={ROUTES.PATIENT_DASHBOARD}
                element={
                    <ProtectedRoute requireRole={USER_ROLES.PATIENT}>
                        <PatientDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Doctor Routes */}
            <Route
                path={ROUTES.DOCTOR_DASHBOARD}
                element={
                    <ProtectedRoute requireRole={USER_ROLES.DOCTOR}>
                        <DoctorDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Analysis Page - Accessible by both */}
            <Route
                path={ROUTES.ANALYZE}
                element={
                    <ProtectedRoute>
                        <AnalysisPage />
                    </ProtectedRoute>
                }
            />

            {/* Default Routes */}
            <Route
                path={ROUTES.HOME}
                element={
                    isAuthenticated ? (
                        isDoctor ? <Navigate to={ROUTES.DOCTOR_DASHBOARD} replace /> : <Navigate to={ROUTES.PATIENT_DASHBOARD} replace />
                    ) : (
                        <Navigate to={ROUTES.LOGIN} replace />
                    )
                }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
