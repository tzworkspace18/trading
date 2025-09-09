import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import { computeTotals } from '../data/selectors.js';
import { formatINR } from '../data/utils.js';

export default function Dashboard({ state, onChange }) {
  const totals = computeTotals(state);

  return (
    <div className="max-w-screen-md mx-auto px-4 pt-6">
      <div className="grid grid-cols-2 gap-4">
        <Card title="Total Balance" value={formatINR(totals.balance)} highlight />
        <Card title="Available Cash" value={formatINR(totals.availableCash)} highlight />
        <Card title="Total Buy" value={formatINR(totals.totalBuy)} />
        <Card title="Total Sell" value={formatINR(totals.totalSell)} />
        <Card title="Total Charges" value={formatINR(totals.totalCharges)} />
        <Card title="Total P & L" value={formatINR(totals.pnl)} />
      </div>

      <section className="mt-6 bg-white rounded-2xl shadow-soft">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-medium">Recent Transactions</h3>
          <Link to="/history" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <ul className="max-h-64 overflow-auto divide-y">
          {state.transactions.slice(0, 6).map(tx => (
            <li key={tx.id} className="px-4 py-2 text-sm flex items-center justify-between">
              <div>
                <div className="font-medium">{tx.name}</div>
                <div className="text-gray-600">{tx.qty} Qty @ {formatINR(tx.pricePerQty)}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-600">{tx.type === 'BUY' ? 'Invest' : 'Proceeds'}</div>
                <div className="font-semibold">{formatINR(tx.qty * tx.pricePerQty)}</div>
              </div>
            </li>
          ))}
          {state.transactions.length === 0 && (
            <li className="px-4 py-6 text-center text-gray-500">No transactions yet.</li>
          )}
        </ul>
      </section>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <Link to="/buy" className="text-center py-3 rounded-2xl bg-white shadow-soft border hover:shadow active:scale-95 transition">Buy</Link>
        <Link to="/sell" className="text-center py-3 rounded-2xl bg-white shadow-soft border hover:shadow active:scale-95 transition">Sell</Link>
      </div>
    </div>
  );
}
