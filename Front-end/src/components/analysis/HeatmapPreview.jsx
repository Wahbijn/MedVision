import React, { useState } from 'react';
import { Eye, Layers, Zap, Download } from 'lucide-react';

const HeatmapPreview = ({ image }) => {
    const [activeView, setActiveView] = useState('heatmap');

    return (
        <div className="w-full animate-fade-in-right">
            <div className="medical-card p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold text-gray-800">
                                Visual Analysis
                            </h2>
                            <p className="text-sm text-gray-500">Grad-CAM explainable AI</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Export</span>
                    </button>
                </div>

                {/* View Toggle */}
                <div className="flex gap-2 mb-6">
                    {['original', 'heatmap', 'overlay'].map((view) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`flex-1 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${activeView === view
                                ? 'bg-gradient-to-r from-medical-blue-500 to-neural-cyan-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Image Display */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 neural-glow">
                    {!image ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                            <div className="text-center text-gray-400">
                                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">Upload an MRI scan to see visual analysis</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeView === 'original' && (
                                <img
                                    src={image}
                                    alt="Original MRI"
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {activeView === 'heatmap' && (
                                <div className="relative w-full h-full">
                                    <img
                                        src={image}
                                        alt="MRI Scan"
                                        className="w-full h-full object-cover opacity-30"
                                    />
                                    <div className="absolute inset-0 bg-gradient-radial from-red-500/60 via-orange-500/40 to-transparent mix-blend-screen animate-pulse-slow" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-red-500/30 to-purple-500/20 mix-blend-overlay" />
                                </div>
                            )}

                            {activeView === 'overlay' && (
                                <div className="relative w-full h-full">
                                    <img
                                        src={image}
                                        alt="MRI with overlay"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-radial from-red-500/40 via-orange-500/25 to-transparent mix-blend-multiply" />
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                        <circle
                                            cx="200"
                                            cy="180"
                                            r="60"
                                            fill="none"
                                            stroke="#ff0000"
                                            strokeWidth="3"
                                            strokeDasharray="5,5"
                                            className="animate-pulse"
                                        />
                                    </svg>
                                </div>
                            )}
                        </>
                    )}

                    {/* Info overlay */}
                    <div className="absolute top-4 right-4 px-3 py-2 bg-black/70 backdrop-blur-sm rounded-lg">
                        <p className="text-xs text-white font-medium">AI Attention Map</p>
                    </div>
                </div>

                {/* Explanation */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                        <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-1">AI Explanation</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                The highlighted regions indicate areas of highest neural network attention.
                                The red-yellow zones show abnormal tissue patterns consistent with tumor characteristics.
                                The model focused on structural irregularities in the frontal lobe region.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
                            <div className="w-8 h-8 bg-red-500 rounded-lg mx-auto mb-2" />
                            <p className="text-xs font-semibold text-gray-700">High Attention</p>
                            <p className="text-xs text-gray-500">95-100%</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 text-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2" />
                            <p className="text-xs font-semibold text-gray-700">Medium</p>
                            <p className="text-xs text-gray-500">50-95%</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2" />
                            <p className="text-xs font-semibold text-gray-700">Low</p>
                            <p className="text-xs text-gray-500">0-50%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeatmapPreview;
