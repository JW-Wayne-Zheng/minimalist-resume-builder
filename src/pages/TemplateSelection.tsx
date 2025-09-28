import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design perfect for any industry',
    preview: 'minimal-preview',
    features: ['Clean typography', 'Simple layout', 'Professional look']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-style template with structured sections',
    preview: 'professional-preview',
    features: ['Corporate design', 'Structured layout', 'Formal appearance']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern and artistic layout for creative professionals',
    preview: 'creative-preview',
    features: ['Modern design', 'Color accents', 'Creative layout']
  }
];

// Template preview components
const MinimalPreview = () => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <img 
      src="/temple_images/minimal_template_image.png" 
      alt="Minimal Template Preview"
      className="w-full h-full object-contain"
    />
  </div>
);

const ProfessionalPreview = () => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <img 
      src="/temple_images/professional_template_image.png" 
      alt="Professional Template Preview"
      className="w-full h-full object-contain"
    />
  </div>
);

const CreativePreview = () => (
  <div className="w-full h-full bg-white flex items-center justify-center">
    <img 
      src="/temple_images/creative_template_image.png" 
      alt="Creative Template Preview"
      className="w-full h-full object-contain"
    />
  </div>
);

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const renderPreview = (templateId: string) => {
    switch (templateId) {
      case 'minimal':
        return <MinimalPreview />;
      case 'professional':
        return <ProfessionalPreview />;
      case 'creative':
        return <CreativePreview />;
      default:
        return <MinimalPreview />;
    }
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplate', selectedTemplate);
      navigate('/editor');
    }
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'minimal':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'professional':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        );
      case 'creative':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Resume Builder
            </h1>
            <p className="text-lg text-gray-600">
              Choose a template to get started
            </p>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-white rounded-t-xl overflow-hidden">
                  {renderPreview(template.id)}
                </div>

                {/* Template Info */}
                <div className="p-6 bg-white rounded-b-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      template.id === 'minimal' ? 'bg-gray-100 text-gray-600' :
                      template.id === 'professional' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getTemplateIcon(template.id)}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                selectedTemplate
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue with {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name : 'Template'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
