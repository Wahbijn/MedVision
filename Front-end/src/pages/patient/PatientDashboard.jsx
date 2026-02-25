import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Brain,
    Upload,
    FileText,
    Calendar,
    Clock,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    LogOut,
    User,
    Settings,
    Bell,
    Activity,
    Download
} from 'lucide-react';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Mock data
    const stats = {
        totalScans: 8,
        pending: 2,
        completed: 6,
        lastScan: '3 days ago'
    };

    const recentScans = [
        {
            id: 1,
            date: '2026-02-21',
            type: 'MRI Brain Scan',
            status: 'completed',
            result: 'Normal',
            doctor: 'Dr. Sarah Johnson'
        },
        {
            id: 2,
            date: '2026-02-18',
            type: 'MRI Brain Scan',
            status: 'completed',
            result: 'Glioma Detected',
            doctor: 'Dr. Michael Chen'
        },
        {
            id: 3,
            date: '2026-02-15',
            type: 'Follow-up Scan',
            status: 'pending',
            result: 'Processing...',
            doctor: 'Dr. Sarah Johnson'
        }
    ];

    const appointments = [
        { id: 1, date: '2026-02-28', time: '10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Consultation' },
        { id: 2, date: '2026-03-05', time: '2:30 PM', doctor: 'Dr. Michael Chen', type: 'Follow-up' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            {/* Header */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-medical-blue-600 to-neural-cyan-500 rounded-xl flex items-center justify-center">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold gradient-text">NeuroVision AI</h1>
                                <p className="text-sm text-gray-500">Patient Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-xl">
                                <User className="w-5 h-5 text-gray-600" />
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            >
                                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Banner */}
                <div className="mb-8 p-8 bg-gradient-to-r from-medical-blue-600 to-neural-cyan-500 rounded-3xl text-white animate-fade-in">
                    <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
                    <p className="text-blue-100">Track your brain health with AI-powered analysis</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-medical-blue-600" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.totalScans}</p>
                        <p className="text-sm text-gray-500">Total Scans</p>
                    </div>

                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.completed}</p>
                        <p className="text-sm text-gray-500">Completed</p>
                    </div>

                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.pending}</p>
                        <p className="text-sm text-gray-500">Pending</p>
                    </div>

                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-lg font-bold text-gray-800 mb-1">{stats.lastScan}</p>
                        <p className="text-sm text-gray-500">Last Scan</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* New Scan Button */}
                        <button
                            onClick={() => navigate('/analyze')}
                            className="w-full p-8 bg-gradient-to-r from-medical-blue-600 to-neural-cyan-500 rounded-2xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <h3 className="text-2xl font-bold mb-2">Upload New MRI Scan</h3>
                                    <p className="text-blue-100">Get AI-powered analysis in seconds</p>
                                </div>
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8" />
                                </div>
                            </div>
                        </button>

                        {/* Recent Scans */}
                        <div className="glass-card p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Activity className="w-6 h-6 text-medical-blue-600" />
                                Recent Scans
                            </h3>
                            <div className="space-y-3">
                                {recentScans.map((scan) => (
                                    <div
                                        key={scan.id}
                                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${scan.status === 'completed'
                                                        ? scan.result.includes('Normal')
                                                            ? 'bg-green-100'
                                                            : 'bg-amber-100'
                                                        : 'bg-gray-200'
                                                    }`}>
                                                    {scan.status === 'completed' ? (
                                                        scan.result.includes('Normal') ? (
                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <AlertCircle className="w-5 h-5 text-amber-600" />
                                                        )
                                                    ) : (
                                                        <Clock className="w-5 h-5 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{scan.type}</p>
                                                    <p className="text-sm text-gray-500">{scan.date} • {scan.doctor}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scan.status === 'completed'
                                                        ? scan.result.includes('Normal')
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                        : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                    {scan.result}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 1/3 width */}
                    <div className="space-y-6">
                        {/* Upcoming Appointments */}
                        <div className="glass-card p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-purple-600" />
                                Upcoming Appointments
                            </h3>
                            <div className="space-y-3">
                                {appointments.map((apt) => (
                                    <div key={apt.id} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <p className="font-semibold text-gray-800 mb-1">{apt.type}</p>
                                        <p className="text-sm text-gray-600 mb-2">with {apt.doctor}</p>
                                        <div className="flex items-center text-sm text-purple-700">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {apt.date}
                                        </div>
                                        <div className="flex items-center text-sm text-purple-700 mt-1">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {apt.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                                Schedule Appointment
                            </button>
                        </div>

                        {/* Health Tips */}
                        <div className="glass-card p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Health Tips</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="font-semibold text-blue-900 mb-1">Regular Monitoring</p>
                                    <p>Schedule follow-up scans as recommended by your doctor</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="font-semibold text-green-900 mb-1">Stay Active</p>
                                    <p>Maintain a healthy lifestyle with regular exercise</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
