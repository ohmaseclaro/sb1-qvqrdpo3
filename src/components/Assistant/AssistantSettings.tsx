import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface AssistantSettings {
  name: string;
  role: string;
  instructions: string;
  tone: 'professional' | 'friendly' | 'casual';
  expertise: string[];
  greeting: string;
  maxResponseLength: number;
}

const EXPERTISE_OPTIONS = [
  'Technical Support',
  'Product Information',
  'Sales',
  'Customer Service',
  'General Knowledge',
  'Industry Specific',
];

export default function AssistantSettings() {
  const [settings, setSettings] = useState<AssistantSettings>({
    name: 'Support Assistant',
    role: 'Customer Support Specialist',
    instructions: 'You are a helpful customer support specialist. Always be polite and professional.',
    tone: 'professional',
    expertise: ['Technical Support', 'Customer Service'],
    greeting: 'Hello! How can I assist you today?',
    maxResponseLength: 500,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleExpertiseChange = (expertise: string) => {
    setSettings(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Assistant Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Assistant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={settings.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={settings.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={4}
                value={settings.instructions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
                Conversation Tone
              </label>
              <select
                id="tone"
                name="tone"
                value={settings.tone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Expertise
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EXPERTISE_OPTIONS.map((expertise) => (
                  <label
                    key={expertise}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={settings.expertise.includes(expertise)}
                      onChange={() => handleExpertiseChange(expertise)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900">{expertise}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="greeting" className="block text-sm font-medium text-gray-700">
                Welcome Message
              </label>
              <input
                type="text"
                id="greeting"
                name="greeting"
                value={settings.greeting}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="maxResponseLength" className="block text-sm font-medium text-gray-700">
                Maximum Response Length (characters)
              </label>
              <input
                type="number"
                id="maxResponseLength"
                name="maxResponseLength"
                value={settings.maxResponseLength}
                onChange={handleChange}
                min={100}
                max={2000}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}