import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Basic Info',
    description: 'Website details and URL',
  },
  {
    id: 2,
    title: 'Configuration',
    description: 'Chat widget settings',
  },
  {
    id: 3,
    title: 'Appearance',
    description: 'Customize the look',
  },
  {
    id: 4,
    title: 'Confirm',
    description: 'Review and create',
  },
];

export default function WebsiteCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    chatTitle: '',
    welcomeMessage: '',
    primaryColor: '#2563eb',
    position: 'right',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(steps.length, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create New Website</h1>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${currentStep > step.id ? 'bg-blue-600 text-white' : 
                    currentStep === step.id ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' : 
                    'bg-gray-100 text-gray-500'}
                `}>
                  {currentStep > step.id ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id + 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Website Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">Website URL</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="chatTitle" className="block text-sm font-medium text-gray-700">Chat Widget Title</label>
              <input
                type="text"
                id="chatTitle"
                name="chatTitle"
                value={formData.chatTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">Welcome Message</label>
              <textarea
                id="welcomeMessage"
                name="welcomeMessage"
                value={formData.welcomeMessage}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Primary Color</label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  type="color"
                  id="primaryColor"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleInputChange}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={handleInputChange}
                  name="primaryColor"
                  className="block rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Widget Position</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="left">Bottom Left</option>
                <option value="right">Bottom Right</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Settings</h3>
              
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website Name</dt>
                  <dd className="text-sm text-gray-900">{formData.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website URL</dt>
                  <dd className="text-sm text-gray-900">{formData.url}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Chat Title</dt>
                  <dd className="text-sm text-gray-900">{formData.chatTitle}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Widget Position</dt>
                  <dd className="text-sm text-gray-900 capitalize">{formData.position}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          <button
            type={currentStep === steps.length ? 'submit' : 'button'}
            onClick={currentStep === steps.length ? undefined : handleNext}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {currentStep === steps.length ? (
              'Create Website'
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}