import React from 'react';
import { Lock } from 'lucide-react';
import PasswordForm from './PasswordForm';

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Profile Settings</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Password</h2>
              <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
            </div>
          </div>
          
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}