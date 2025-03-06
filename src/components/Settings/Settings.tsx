import React, { useState } from 'react';
import { CreditCard, Coins } from 'lucide-react';
import BillingForm from './BillingForm';
import CreditPackage from './CreditPackage';

const creditPackages = [
  {
    name: 'Starter',
    credits: 1000,
    price: 9,
    features: [
      'Basic chat support',
      'Standard response time',
      'Email notifications',
    ],
  },
  {
    name: 'Professional',
    credits: 5000,
    price: 39,
    features: [
      'Advanced chat support',
      'Priority response time',
      'Email notifications',
      'Analytics dashboard',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    credits: 15000,
    price: 99,
    features: [
      'Premium chat support',
      'Instant response time',
      'All notifications',
      'Advanced analytics',
      'Custom integrations',
    ],
  },
];

export default function Settings() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleBillingSubmit = async (data: any) => {
    // Handle billing form submission
    console.log('Billing data:', data);
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    // Handle package selection
    console.log('Selected package:', packageName);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Billing Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Billing Information</h2>
                <p className="text-sm text-gray-500">Update your billing details and credit card</p>
              </div>
            </div>
            
            <BillingForm onSubmit={handleBillingSubmit} />
          </div>
        </div>

        {/* Credit Packages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Coins className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Buy Credits</h2>
                <p className="text-sm text-gray-500">Choose a credit package that suits your needs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creditPackages.map((pkg) => (
                <CreditPackage
                  key={pkg.name}
                  name={pkg.name}
                  credits={pkg.credits}
                  price={pkg.price}
                  features={pkg.features}
                  isPopular={pkg.isPopular}
                  onSelect={() => handlePackageSelect(pkg.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}