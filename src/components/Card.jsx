import React from 'react';

export default function Card({ title, value, highlight = false }) {
  return (
    <div className={`bg-white rounded-2xl shadow-soft p-4 ${highlight ? 'ring-1 ring-green-200' : ''}`}>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-1 text-xl font-semibold text-green-600">{value}</div>
    </div>
  );
}
