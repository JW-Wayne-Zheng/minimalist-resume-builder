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

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplate', selectedTemplate);
      navigate('/editor');
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
                <div className="aspect-[3/4] bg-white rounded-t-xl p-6 flex flex-col">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col justify-center items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                    <div className="w-full space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="w-full mt-6 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6 bg-white rounded-b-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
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
