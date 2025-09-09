import React from 'react';

export default function IconButton({ children, onClick, title, className = '' }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition ${className}`}
    >
      {children}
    </button>
  );
}
