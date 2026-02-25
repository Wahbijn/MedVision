import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Brain,
    Users,
    FileText,
    Calendar,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    LogOut,
    User,
    Bell,
    Search,
    Filter,
    Activity,
    Clock,
    BarChart3,
    Stethoscope,
    Eye,
    Upload
} from 'lucide-react';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Mock data
    const stats = {
        totalPatients: 247,
        pendingReviews: 12,
        todayAppointments: 8,
        criticalCases: 3
    };

    const pendingScans = [
        {
            id: 1,
            patient: 'John Smith',
            age: 45,
            scanDate: '2026-02-24',
            scanType: 'MRI Brain Scan',
            priority: 'high',
            uploadTime: '2 hours ago'
        },
        {
            id: 2,
            patient: 'Emma Wilson',
            age: 32,
            scanDate: '2026-02-24',
            scanType: 'Follow-up Scan',
            priority: 'normal',
            uploadTime: '4 hours ago'
        },
        {
            id: 3,
            patient: 'Michael Brown',
            age: 58,
            scanDate: '2026-02-23',
            scanType: 'MRI Brain Scan',
            priority: 'urgent',
            uploadTime: '1 day ago'
        }
    ];

    const recentPatients = [
        {
            id: 1,
            name: 'Sarah Johnson',
            age: 42,
            lastVisit: '2026-02-21',
            condition: 'Glioma',
            status: 'monitoring',
            nextAppointment: '2026-03-01'
        },
        {
            id: 2,
            name: 'David Lee',
            age: 55,
            lastVisit: '2026-02-20',
            condition: 'Normal',
            status: 'healthy',
            nextAppointment: '2026-06-20'
        },
        {
            id: 3,
            name: 'Lisa Martinez',
            age: 38,
            lastVisit: '2026-02-19',
            condition: 'Meningioma',
            status: 'treatment',
            nextAppointment: '2026-02-26'
        }
    ];

    const todayAppointments = [
        { time: '09:00 AM', patient: 'Robert Chen', type: 'Consultation', duration: '30 min' },
        { time: '10:30 AM', patient: 'Mary Thompson', type: 'Follow-up', duration: '20 min' },
        { time: '02:00 PM', patient: 'James Wilson', type: 'Results Review', duration: '45 min' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                    NeuroVision AI
                                </h1>
                                <p className="text-sm text-gray-500">Doctor Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                                    <Stethoscope className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500">Neurologist</p>
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
                <div className="mb-8 p-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl text-white animate-fade-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Good morning, {user?.name}! 👨‍⚕️</h2>
                            <p className="text-purple-100">You have {stats.pendingReviews} scans pending review and {stats.todayAppointments} appointments today</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Brain className="w-12 h-12" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.totalPatients}</p>
                        <p className="text-sm text-gray-500">Total Patients</p>
                    </div>

                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.pendingReviews}</p>
                        <p className="text-sm text-gray-500">Pending Reviews</p>
                    </div>

                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.todayAppointments}</p>
                        <p className="text-sm text-gray-500">Today's Appointments</p>
                    </div>

                    <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{stats.criticalCases}</p>
                        <p className="text-sm text-gray-500">Critical Cases</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Pending Scan Reviews */}
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Eye className="w-6 h-6 text-purple-600" />
                                    Pending Scan Reviews
                                </h3>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                            </div>
                            <div className="space-y-3">
                                {pendingScans.map((scan) => (
                                    <div
                                        key={scan.id}
                                        className="p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-purple-300 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scan.priority === 'urgent'
                                                    ? 'bg-red-100'
                                                    : scan.priority === 'high'
                                                        ? 'bg-amber-100'
                                                        : 'bg-blue-100'
                                                    }`}>
                                                    <Brain className={`w-6 h-6 ${scan.priority === 'urgent'
                                                        ? 'text-red-600'
                                                        : scan.priority === 'high'
                                                            ? 'text-amber-600'
                                                            : 'text-blue-600'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{scan.patient}</p>
                                                    <p className="text-sm text-gray-500">{scan.scanType} • Age {scan.age}</p>
                                                    <p className="text-xs text-gray-400 mt-1">Uploaded {scan.uploadTime}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scan.priority === 'urgent'
                                                    ? 'bg-red-100 text-red-700'
                                                    : scan.priority === 'high'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {scan.priority.toUpperCase()}
                                                </span>
                                                <button
                                                    onClick={() => navigate('/analyze')}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    Review Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Patients */}
                        <div className="glass-card p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-600" />
                                Recent Patients
                            </h3>
                            <div className="space-y-3">
                                {recentPatients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{patient.name}, {patient.age}</p>
                                                    <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${patient.status === 'healthy'
                                                    ? 'bg-green-100 text-green-700'
                                                    : patient.status === 'monitoring'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {patient.condition}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">Next: {patient.nextAppointment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 1/3 width */}
                    <div className="space-y-6">
                        {/* Today's Schedule */}
                        <div className="glass-card p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-green-600" />
                                Today's Schedule
                            </h3>
                            <div className="space-y-3">
                                {todayAppointments.map((apt, index) => (
                                    <div key={index} className="p-3 bg-green-50 rounded-xl border border-green-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-green-700">{apt.time}</span>
                                            <span className="text-xs text-gray-500">{apt.duration}</span>
                                        </div>
                                        <p className="font-semibold text-gray-800 text-sm">{apt.patient}</p>
                                        <p className="text-xs text-gray-600">{apt.type}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="glass-card p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Quick Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/analyze')}
                                    className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                                >
                                    <Upload className="w-5 h-5 inline mr-2" />
                                    Analyze New Scan
                                </button>
                                <button className="w-full p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-purple-300 transition-all">
                                    <Users className="w-5 h-5 inline mr-2" />
                                    View All Patients
                                </button>
                                <button className="w-full p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-purple-300 transition-all">
                                    <BarChart3 className="w-5 h-5 inline mr-2" />
                                    Analytics Report
                                </button>
                            </div>
                        </div>

                        {/* AI Assistant */}
                        <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">🤖 AI Assistant</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Need help with diagnosis? Our AI is here to assist with scan analysis and recommendations.
                            </p>
                            <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors text-sm">
                                Ask AI Assistant
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
