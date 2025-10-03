import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Preloader from './components/Preloader';
import SuccessPage from './components/SuccessPage';
import LeadCapture from './components/LeadCapture';
import AdminDashboard from './components/AdminDashboard';
import ThankYouPage from './components/ThankYouPage';

export type Step = 'landing' | 'preloader' | 'success' | 'leadcapture' | 'thankyou' | 'admin';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [formData, setFormData] = useState({
    postcode: '',
    huisnummer: '',
    toevoeging: '',
    oplossing: '',
    naam: '',
    email: '',
    telefoon: ''
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage formData={formData} updateFormData={updateFormData} goToStep={goToStep} />;
      case 'preloader':
        return <Preloader goToStep={goToStep} />;
      case 'success':
        return <SuccessPage formData={formData} updateFormData={updateFormData} goToStep={goToStep} />;
      case 'leadcapture':
        return <LeadCapture formData={formData} updateFormData={updateFormData} goToStep={goToStep} />;
      case 'thankyou':
        return <ThankYouPage formData={formData} goToStep={goToStep} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LandingPage formData={formData} updateFormData={updateFormData} goToStep={goToStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentStep()}
    </div>
  );
}

export default App;