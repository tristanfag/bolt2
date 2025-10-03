import React from 'react';
import { CheckCircle, Home, Mail, Phone } from 'lucide-react';
import { Step } from '../App';

interface ThankYouPageProps {
  formData: {
    naam: string;
    email: string;
    telefoon: string;
    postcode: string;
    huisnummer: string;
    toevoeging: string;
    oplossing: string;
  };
  goToStep: (step: Step) => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData, goToStep }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Bedankt!
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Uw aanvraag is succesvol verzonden. We nemen binnen 24 uur contact met u op.
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Uw gegevens
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Home className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Adres</p>
                <p className="font-medium text-gray-900">
                  {formData.postcode} {formData.huisnummer}
                  {formData.toevoeging && ` ${formData.toevoeging}`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gekozen oplossing</p>
                <p className="font-medium text-gray-900 capitalize">
                  {formData.oplossing.replace('-', ' ')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact via</p>
                <p className="font-medium text-gray-900">{formData.email}</p>
                <p className="font-medium text-gray-900">{formData.telefoon}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-3">Wat gebeurt er nu?</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              <span>We controleren uw gegevens en geschiktheid</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              <span>Een specialist neemt binnen 24 uur contact met u op</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <span>U ontvangt een gratis en vrijblijvend advies op maat</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => goToStep('landing')}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Terug naar start
          </button>
        </div>

        {/* Trust Elements */}
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

export default ThankYouPage;