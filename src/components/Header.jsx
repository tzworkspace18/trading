import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-soft">
      <div className="max-w-screen-md mx-auto px-4 h-14 flex items-center justify-between">
        <div className="text-lg font-semibold">Trading</div>
        <div className="text-sm text-gray-500">LocalStorage • PWA</div>
      </div>
    </header>
  );
}
