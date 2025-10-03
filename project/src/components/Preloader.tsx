import React, { useEffect, useState } from 'react';
import { CheckCircle, Zap, Shield } from 'lucide-react';
import { Step } from '../App';

interface PreloaderProps {
  goToStep: (step: Step) => void;
}

const Preloader: React.FC<PreloaderProps> = ({ goToStep }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: '85% van de plekken zijn vergeven', icon: CheckCircle },
    { text: 'Bespaar tot €1700 per jaar', icon: Zap },
    { text: '100% vrijblijvend en veilig – je zit nergens direct aan vast', icon: Shield }
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => goToStep('success'), 500);
          return 100;
        }
        return prev + 1.67;
      });
    }, 100);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [goToStep]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* House Animation */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bezig met controleren...
          </h2>
          <p className="text-gray-600 mb-6">
            We kijken of jouw gemeente meedoet aan de actie
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            {Math.round(progress)}% voltooid
          </div>
        </div>

        {/* Animated Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = progress > (index + 1) * 33;
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                  isActive 
                    ? 'bg-blue-50 border-2 border-blue-200 transform scale-105' 
                    : isCompleted
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300'
                }`}>
                  <StepIcon className="w-5 h-5 text-white" />
                </div>
                <span className={`font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-blue-800' 
                    : isCompleted 
                    ? 'text-green-800' 
                    : 'text-gray-600'
                }`}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Preloader;