/**
 * Application-wide constants and configuration
 */

// User Roles
export const USER_ROLES = {
    PATIENT: 'patient',
    DOCTOR: 'doctor'
};

// Route Paths
export const ROUTES = {
    LOGIN: '/login',
    PATIENT_DASHBOARD: '/patient/dashboard',
    DOCTOR_DASHBOARD: '/doctor/dashboard',
    ANALYZE: '/analyze',
    HOME: '/'
};

// API Configuration (Update with your backend URL)
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    TIMEOUT: 30000, // 30 seconds
    ENDPOINTS: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        ANALYZE: '/api/analyze',
        PATIENTS: '/api/patients',
        REPORTS: '/api/reports'
    }
};

// Application Settings
export const APP_CONFIG = {
    NAME: 'NeuroVision AI',
    VERSION: '1.0.0',
    DESCRIPTION: 'AI-powered brain tumor analysis platform',
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
    SUPPORTED_IMAGE_FORMATS: ['.jpg', '.jpeg', '.png']
};

// Animation and UI Settings
export const UI_CONFIG = {
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    DEBOUNCE_DELAY: 300
};

// Tumor Types
export const TUMOR_TYPES = {
    GLIOMA: 'Glioma',
    MENINGIOMA: 'Meningioma',
    PITUITARY: 'Pituitary',
    NO_TUMOR: 'No Tumor Detected'
};

// Status Colors
export const STATUS_COLORS = {
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b',
    INFO: '#3b82f6'
};
