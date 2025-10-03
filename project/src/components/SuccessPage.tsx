import React, { useState } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { Step } from '../App';

interface SuccessPageProps {
  formData: {
    oplossing: string;
  };
  updateFormData: (data: any) => void;
  goToStep: (step: Step) => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ formData, updateFormData, goToStep }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const oplossingen = [
    { value: 'zonnepanelen', label: 'Zonnepanelen' },
    { value: 'warmtepomp', label: 'Warmtepomp' },
    { value: 'kozijnen', label: 'Kozijnen' },
    { value: 'thuisbatterij', label: 'Thuisbatterij' },
    { value: 'alarmsysteem', label: 'Alarmsysteem' },
    { value: 'isolatie-werkzaamheden', label: 'Isolatie werkzaamheden' },
    { value: 'dakwerk', label: 'Dakwerk' },
    { value: 'traprenovatie', label: 'Traprenovatie' }
  ];

  const handleSelect = (value: string) => {
    updateFormData({ oplossing: value });
    setIsDropdownOpen(false);
    setError('');
  };

  const handleContinue = () => {
    if (!formData.oplossing) {
      setError('Selecteer een duurzaamheidsoplossing');
      return;
    }
    goToStep('leadcapture');
  };

  const selectedOption = oplossingen.find(opt => opt.value === formData.oplossing);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Gefeliciteerd!
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Wij zijn ook actief in uw gemeente.
          </p>
        </div>

        {/* Selection Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Waar bent u in geïnteresseerd?
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selecteer een duurzaamheidsoplossing *
            </label>
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-4 border-2 rounded-lg text-left flex items-center justify-between focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedOption ? selectedOption.label : 'Kies een optie...'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'transform rotate-180' : ''
                }`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {oplossingen.map((optie) => (
                    <button
                      key={optie.value}
                      type="button"
                      onClick={() => handleSelect(optie.value)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {optie.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:ring-green-200 text-lg"
          >
            Verder
          </button>
        </div>

        {/* Additional Trust Elements */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>100% vrijblijvend</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Geen verborgen kosten</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;