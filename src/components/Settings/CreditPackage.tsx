import React from 'react';
import { Check } from 'lucide-react';

interface CreditPackageProps {
  name: string;
  credits: number;
  price: number;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

export default function CreditPackage({
  name,
  credits,
  price,
  features,
  isPopular,
  onSelect
}: CreditPackageProps) {
  return (
    <div className={`
      relative bg-white rounded-lg shadow-sm border
      ${isPopular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}
    `}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500">/one-time</span>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          {credits.toLocaleString()} credits
        </div>

        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="ml-3 text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className={`
            mt-8 w-full px-4 py-2 rounded-lg text-sm font-medium
            ${isPopular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-300'
            }
          `}
        >
          Select Package
        </button>
      </div>
    </div>
  );
}