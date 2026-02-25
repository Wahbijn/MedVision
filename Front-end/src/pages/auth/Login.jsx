import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Brain, Mail, Lock, UserCircle, Stethoscope, User } from 'lucide-react';
import { ROUTES, USER_ROLES, APP_CONFIG } from '../../utils/constants';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: USER_ROLES.PATIENT
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const userData = {
                id: Date.now(),
                email: formData.email,
                role: formData.role,
                name: formData.role === USER_ROLES.DOCTOR ? 'Dr. Sarah Johnson' : 'John Smith',
                avatar: null
            };

            login(userData);
            setIsLoading(false);

            // Redirect based on role
            if (formData.role === USER_ROLES.DOCTOR) {
                navigate(ROUTES.DOCTOR_DASHBOARD);
            } else {
                navigate(ROUTES.PATIENT_DASHBOARD);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-medical-blue-600 to-neural-cyan-500 rounded-3xl mb-4 animate-glow">
                        <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                        {APP_CONFIG.NAME}
                    </h1>
                    <p className="text-gray-600">{APP_CONFIG.DESCRIPTION}</p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-8 animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Welcome Back
                    </h2>

                    {/* Role Selection */}
                    <div className="flex gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: USER_ROLES.PATIENT })}
                            className={`flex-1 py-4 px-4 rounded-xl border-2 transition-all duration-300 ${formData.role === USER_ROLES.PATIENT
                                ? 'border-medical-blue-500 bg-medical-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <User className={`w-6 h-6 mx-auto mb-2 ${formData.role === USER_ROLES.PATIENT ? 'text-medical-blue-600' : 'text-gray-400'
                                }`} />
                            <span className={`text-sm font-semibold ${formData.role === USER_ROLES.PATIENT ? 'text-medical-blue-700' : 'text-gray-600'
                                }`}>
                                Patient
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: USER_ROLES.DOCTOR })}
                            className={`flex-1 py-4 px-4 rounded-xl border-2 transition-all duration-300 ${formData.role === USER_ROLES.DOCTOR
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <Stethoscope className={`w-6 h-6 mx-auto mb-2 ${formData.role === USER_ROLES.DOCTOR ? 'text-purple-600' : 'text-gray-400'
                                }`} />
                            <span className={`text-sm font-semibold ${formData.role === USER_ROLES.DOCTOR ? 'text-purple-700' : 'text-gray-600'
                                }`}>
                                Doctor
                            </span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-blue-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded text-medical-blue-600 mr-2" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-medical-blue-600 hover:text-medical-blue-700 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-medical-blue-600 to-neural-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-medical-blue-600 hover:text-medical-blue-700 font-semibold">
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
                    <p className="text-xs text-center text-gray-600 font-medium mb-2">Demo Credentials</p>
                    <div className="text-xs text-gray-500 space-y-1">
                        <p>📧 Any email | 🔒 Any password</p>
                        <p className="text-center text-gray-400">Choose your role and sign in!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
