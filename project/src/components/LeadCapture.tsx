import React, { useState } from 'react';
import { Gift, Calendar, CheckCircle, Mail, Phone, User } from 'lucide-react';
import { Step } from '../App';
import { insertFormSubmission } from '../lib/supabase';

interface LeadCaptureProps {
  formData: {
    naam: string;
    email: string;
    telefoon: string;
  };
  updateFormData: (data: any) => void;
  goToStep: (step: Step) => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ formData, updateFormData, goToStep }) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.naam.trim()) {
      newErrors.naam = 'Naam is verplicht';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Voer een geldig e-mailadres in';
    }
    
    if (!formData.telefoon.trim()) {
      newErrors.telefoon = 'Telefoonnummer is verplicht';
    } else if (!/^(\+31|0)[1-9]\d{8}$/.test(formData.telefoon.replace(/\s|-/g, ''))) {
      newErrors.telefoon = 'Voer een geldig Nederlands telefoonnummer in';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to Supabase database
      await insertFormSubmission({
        naam: formData.naam,
        email: formData.email,
        telefoon: formData.telefoon,
        postcode: formData.postcode || '',
        huisnummer: formData.huisnummer || '',
        toevoeging: formData.toevoeging || '',
        oplossing: formData.oplossing || ''
      });

      // Also send to Zapier webhook (optional - keep both for redundancy)
      try {
        await fetch('https://hooks.zapier.com/hooks/catch/10982076/utxdf1t/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (zapierError) {
        console.warn('Zapier webhook failed, but data was saved to database:', zapierError);
      }

      // Success - show confirmation message
      goToStep('thankyou');
      
    } catch (error) {
      console.error('Error saving form submission:', error);
      alert('Er is een fout opgetreden bij het opslaan van uw gegevens. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <Gift className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Bijna klaar!
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Vul uw gegevens in om gratis en vrijblijvend een aanbod op maat te ontvangen.
          </p>

          {/* Urgency Element */}
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>Meld u aan vóór 30 augustus om te profiteren</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="naam" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Volledige naam *
              </label>
              <input
                type="text"
                id="naam"
                placeholder="Jan Jansen"
                value={formData.naam}
                onChange={(e) => handleInputChange('naam', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                  errors.naam ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.naam && (
                <p className="text-red-600 text-sm mt-1">{errors.naam}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                E-mailadres *
              </label>
              <input
                type="email"
                id="email"
                placeholder="jan@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefoon" className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefoonnummer *
              </label>
              <input
                type="tel"
                id="telefoon"
                placeholder="06-12345678"
                value={formData.telefoon}
                onChange={(e) => handleInputChange('telefoon', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                  errors.telefoon ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.telefoon && (
                <p className="text-red-600 text-sm mt-1">{errors.telefoon}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:ring-green-200 text-lg disabled:transform-none disabled:shadow-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Bezig met versturen...</span>
                </div>
              ) : (
                'Gratis en vrijblijvend aanbod aanvragen'
              )}
            </button>
          </form>

          {/* Trust Elements */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span>Uw gegevens worden veilig behandeld conform de AVG</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span>U ontvangt binnen 24 uur een persoonlijk advies</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span>Altijd kosteloos en zonder verplichtingen</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
          Door dit formulier in te vullen gaat u akkoord met onze{' '}
          <a href="#" className="text-blue-600 hover:underline">privacyverklaring</a>{' '}
          en{' '}
          <a href="#" className="text-blue-600 hover:underline">algemene voorwaarden</a>.
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;