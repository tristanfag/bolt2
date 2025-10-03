import React, { useState } from 'react';
import { Home, Shield, CheckCircle } from 'lucide-react';
import { Step } from '../App';

interface LandingPageProps {
  formData: {
    postcode: string;
    huisnummer: string;
    toevoeging: string;
  };
  updateFormData: (data: any) => void;
  goToStep: (step: Step) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ formData, updateFormData, goToStep }) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is verplicht';
    } else if (!/^\d{4}\s?[A-Za-z]{2}$/.test(formData.postcode.trim())) {
      newErrors.postcode = 'Voer een geldige postcode in (1234AB)';
    }
    
    if (!formData.huisnummer.trim()) {
      newErrors.huisnummer = 'Huisnummer is verplicht';
    } else if (!/^\d+$/.test(formData.huisnummer.trim())) {
      newErrors.huisnummer = 'Voer een geldig huisnummer in';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      goToStep('preloader');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-blue-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-700 rounded-lg">
              <Home className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Gemeentelijke Consumentenbond</h1>
              <p className="text-sm text-gray-600">Officiële gemeente-actie voor duurzame woningen</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content (Desktop) / Below Form (Mobile) */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                In 1 klik weten of jouw gemeente meedoet!
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Vul het formulier in en zie direct of je in aanraking komt voor deze unieke kans!
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">100% vrijblijvend en kosteloos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Bespaar tot €1.700 per jaar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Erkende en gecertificeerde installateurs</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Veilig:</strong> Deze actie wordt ondersteund door uw gemeente en aangesloten partners.
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>✓ GDPR-compliant</span>
                  <span>✓ Geen verborgen kosten</span>
                  <span>✓ Altijd uitschrijfbaar</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form (Desktop) / Top (Mobile) */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Check jouw postcode
                  </h2>
                  <p className="text-gray-600">
                    Ontdek binnen 30 seconden of je gemeente meedoet
                  </p>
                  <p className="text-gray-800 font-semibold mt-3 text-sm">
                    85% van de plekken zijn vergeven – vraag vandaag nog gratis jouw besparing aan.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="postcode" className="block text-sm font-semibold text-gray-700 mb-2">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      placeholder="1234AB"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                        errors.postcode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      maxLength={7}
                    />
                    {errors.postcode && (
                      <p className="text-red-600 text-sm mt-1">{errors.postcode}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="huisnummer" className="block text-sm font-semibold text-gray-700 mb-2">
                        Huisnummer *
                      </label>
                      <input
                        type="text"
                        id="huisnummer"
                        placeholder="123"
                        value={formData.huisnummer}
                        onChange={(e) => handleInputChange('huisnummer', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                          errors.huisnummer ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.huisnummer && (
                        <p className="text-red-600 text-sm mt-1">{errors.huisnummer}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="toevoeging" className="block text-sm font-semibold text-gray-700 mb-2">
                        Toevoeging
                      </label>
                      <input
                        type="text"
                        id="toevoeging"
                        placeholder="A"
                        value={formData.toevoeging}
                        onChange={(e) => handleInputChange('toevoeging', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:ring-blue-200 text-lg"
                  >
                    Check Postcode
                  </button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Door op 'Check Postcode' te klikken, ga je akkoord met onze voorwaarden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;