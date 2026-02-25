import React, { useRef, useState } from 'react';
import { Upload, Brain, FileImage, CheckCircle2 } from 'lucide-react';

const UploadSection = ({ onUpload, uploadedImage }) => {
    const uploadRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processFile(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        setIsProcessing(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            setTimeout(() => {
                onUpload(e.target.result);
                setIsProcessing(false);
            }, 1500);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div ref={uploadRef} className="w-full animate-fade-in">
            <div className="medical-card p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-medical-blue-500 to-neural-cyan-500 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-800">
                            Upload MRI Scan
                        </h2>
                        <p className="text-sm text-gray-500">Brain tumor analysis powered by AI</p>
                    </div>
                </div>

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragging
                        ? 'border-medical-blue-500 bg-medical-blue-50/50 scale-105'
                        : 'border-gray-300 bg-gray-50/30'
                        } ${uploadedImage ? 'border-green-400 bg-green-50/30' : ''}`}
                >
                    {!uploadedImage ? (
                        <div className="space-y-4">
                            {isProcessing ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-medical-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="mt-4 text-medical-blue-600 font-medium">Processing MRI scan...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-medical-blue-100 to-neural-cyan-100 rounded-2xl flex items-center justify-center">
                                        <Upload className="w-10 h-10 text-medical-blue-600" />
                                    </div>
                                    <div>
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <span className="text-medical-blue-600 font-semibold hover:text-medical-blue-700 transition-colors">
                                                Click to upload
                                            </span>
                                            <span className="text-gray-600"> or drag and drop</span>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileInput}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Supported formats: PNG, JPG, DICOM (Max 10MB)
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-4">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                            <div className="text-left">
                                <p className="text-lg font-semibold text-gray-800">MRI scan uploaded successfully</p>
                                <p className="text-sm text-gray-600">Analysis complete • Ready for review</p>
                            </div>
                        </div>
                    )}
                </div>

                {uploadedImage && (
                    <div className="mt-6 flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3">
                            <FileImage className="w-5 h-5 text-medical-blue-600" />
                            <span className="text-sm font-medium text-gray-700">brain_mri_scan.jpg</span>
                        </div>
                        <button
                            onClick={() => document.getElementById('file-upload').click()}
                            className="text-sm text-medical-blue-600 hover:text-medical-blue-700 font-medium transition-colors"
                        >
                            Change scan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadSection;
