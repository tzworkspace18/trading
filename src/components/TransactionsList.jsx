import React from 'react';
import { load, removeTransaction } from '../data/storage.js';
import { formatINR } from '../data/utils.js';
import IconButton from './IconButton.jsx';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import EntryForm from './EntryForm.jsx';

export default function TransactionsList({ onChange }) {
  const [editingId, setEditingId] = React.useState(null);
  const refresh = () => onChange && onChange();
  const state = load();

  const onDelete = (id) => {
    if (confirm('Delete this transaction?')) {
      removeTransaction(id);
      refresh();
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 pt-6">
      <div className="bg-white rounded-2xl shadow-soft divide-y">
        {state.transactions.length === 0 && (
          <div className="p-6 text-center text-gray-500">No transactions yet.</div>
        )}

        {state.transactions.map(tx => (
          <div key={tx.id} className="px-4 py-3">
            {editingId === tx.id ? (
              <EntryForm type={tx.type} editId={tx.id} onSaved={() => { setEditingId(null); refresh(); }} />
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{tx.name}</div>
                  <div className="text-sm text-gray-600">
                    {tx.qty} Qty @ {formatINR(tx.pricePerQty)} • {new Date(tx.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{tx.type === 'BUY' ? 'Invest' : 'Proceeds'}</div>
                  <div className="font-semibold">{formatINR(tx.qty * tx.pricePerQty)}</div>
                  {tx.charges > 0 && <div className="text-xs text-gray-500">Charges: {formatINR(tx.charges)}</div>}
                </div>
                <div className="flex items-center gap-1">
                  <IconButton title="Edit" onClick={() => setEditingId(tx.id)}><FiEdit2 /></IconButton>
                  <IconButton title="Delete" onClick={() => onDelete(tx.id)}><FiTrash2 /></IconButton>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
