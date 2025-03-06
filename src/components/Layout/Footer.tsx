import React from 'react';

export default function Footer() {
  return (
    <footer className="h-[60px] bg-white border-t border-gray-200 fixed bottom-0 w-full z-40">
      <div className="h-full flex items-center justify-between px-6">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} InstantChat. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}