import React from 'react';

interface ProgressIndicatorProps {
    currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-violet-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-violet-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 3 ? 'bg-violet-600' : 'bg-gray-300'}`} />
        </div>
    );
};