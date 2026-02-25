import React from 'react';
import { AlertCircle, CheckCircle, TrendingUp, Activity } from 'lucide-react';

const ResultsCard = ({ results }) => {

    const tumorDetected = results.tumorPresent;
    const mainResult = results.classifications[0];

    return (
        <div className="w-full animate-fade-in-up">
            <div className="medical-card p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tumorDetected
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                            : 'bg-gradient-to-br from-green-400 to-emerald-500'
                            }`}>
                            {tumorDetected ? (
                                <AlertCircle className="w-6 h-6 text-white" />
                            ) : (
                                <CheckCircle className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold text-gray-800">
                                Analysis Results
                            </h2>
                            <p className="text-sm text-gray-500">AI-powered diagnosis support</p>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-medical-blue-500 to-neural-cyan-500 rounded-full">
                        <span className="text-white font-semibold text-sm">Confidence: {mainResult.probability}%</span>
                    </div>
                </div>

                {/* Main Result */}
                <div className={`p-6 rounded-2xl mb-6 ${tumorDetected
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Primary Detection</p>
                            <h3 className="text-3xl font-display font-bold text-gray-900">
                                {mainResult.type}
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">{mainResult.description}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-5xl font-display font-bold gradient-text">
                                {mainResult.probability}%
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Probability</p>
                        </div>
                    </div>
                </div>

                {/* All Classifications */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-5 h-5 text-medical-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Classification Breakdown</h3>
                    </div>
                    {results.classifications.map((item, index) => (
                        <div key={index} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">{item.type}</span>
                                <span className="text-sm font-bold text-medical-blue-600">
                                    {item.probability}%
                                </span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out animate-progress ${index === 0
                                        ? 'bg-gradient-to-r from-medical-blue-500 to-neural-cyan-500'
                                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                                        }`}
                                    style={{ width: `${item.probability}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Risk Score */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-medical-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Risk Assessment</p>
                                <p className="text-lg font-bold text-gray-900">{results.riskLevel}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Recommendation</p>
                            <p className="text-sm font-semibold text-medical-blue-700">Consult specialist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;
