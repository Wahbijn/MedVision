import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Brain,
    Activity,
    FileText,
    Clock,
    Users,
    TrendingUp,
    Shield,
    Sparkles,
    ArrowLeft,
    LogOut
} from 'lucide-react';
import UploadSection from '../components/analysis/UploadSection';
import ResultsCard from '../components/analysis/ResultsCard';
import HeatmapPreview from '../components/analysis/HeatmapPreview';

// Mock results data
const mockResults = {
    tumorPresent: true,
    classifications: [
        { type: 'Glioma', probability: 87.3, description: 'Most common type of primary brain tumor' },
        { type: 'Meningioma', probability: 8.1, description: 'Tumor of brain/spinal cord membranes' },
        { type: 'Pituitary', probability: 3.4, description: 'Tumor in the pituitary gland' },
        { type: 'No Tumor', probability: 1.2, description: 'No abnormality detected' },
    ],
    riskLevel: 'Moderate to High',
};

const AnalysisPage = () => {
    const navigate = useNavigate();
    const { user, logout, isDoctor } = useAuth();
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleUpload = (imageData) => {
        setUploadedImage(imageData);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBackToDashboard = () => {
        if (isDoctor) {
            navigate('/doctor/dashboard');
        } else {
            navigate('/patient/dashboard');
        }
    };

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            <div className="relative z-10">
                {/* Header */}
                <header className="pt-8 pb-6 px-6 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleBackToDashboard}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                                    </button>
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-medical-blue-600 to-neural-cyan-500 rounded-2xl flex items-center justify-center animate-glow">
                                            <Brain className="w-9 h-9 text-white" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-display font-bold gradient-text">
                                            NeuroVision AI
                                        </h1>
                                        <p className="text-gray-600 mt-1">
                                            Advanced Brain Tumor Analysis Platform
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-sm font-medium text-green-700">AI System Online</span>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                                        <span className="text-sm font-medium text-blue-700">
                                            {isDoctor ? '👨‍⚕️ Doctor' : '👤 Patient'}: {user?.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-3 bg-gradient-to-r from-medical-blue-600 to-neural-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        <LogOut className="w-5 h-5 inline mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats Bar */}
                <div className="px-6 mb-8 animate-fade-in-delay">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-medical-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">98.7%</p>
                                        <p className="text-xs text-gray-500">Accuracy</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">15.2K+</p>
                                        <p className="text-xs text-gray-500">Analyses</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">&lt;30s</p>
                                        <p className="text-xs text-gray-500">Avg. Time</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-4 hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">HIPAA</p>
                                        <p className="text-xs text-gray-500">Compliant</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-8">
                                <UploadSection
                                    onUpload={handleUpload}
                                    uploadedImage={uploadedImage}
                                />

                                <ResultsCard results={mockResults} />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                <HeatmapPreview image={uploadedImage} />

                                <div className="medical-card p-8">
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 bg-gradient-to-br from-medical-blue-100 to-neural-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                            <FileText className="w-12 h-12 text-medical-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">
                                            Quick Start Guide
                                        </h3>
                                        <div className="text-left max-w-md mx-auto space-y-4">
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 bg-medical-blue-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                                    1
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Upload MRI Scan</p>
                                                    <p className="text-sm text-gray-600">Drag & drop or click to upload brain MRI image</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 bg-medical-blue-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                                    2
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">AI Analysis</p>
                                                    <p className="text-sm text-gray-600">Deep learning model processes the scan</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 bg-medical-blue-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                                    3
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Review Results</p>
                                                    <p className="text-sm text-gray-600">Get detailed classification and visual explanations</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <p className="text-sm text-gray-600">
                                        © 2026 NeuroVision AI • Academic Decision Support System
                                    </p>
                                    <div className="flex gap-4 text-sm">
                                        <a href="#" className="text-medical-blue-600 hover:text-medical-blue-700 font-medium">Privacy</a>
                                        <a href="#" className="text-medical-blue-600 hover:text-medical-blue-700 font-medium">Terms</a>
                                        <a href="#" className="text-medical-blue-600 hover:text-medical-blue-700 font-medium">Documentation</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
                                    <Shield className="w-4 h-4 text-amber-600" />
                                    <p className="text-xs font-medium text-amber-800">Not a diagnostic replacement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AnalysisPage;
