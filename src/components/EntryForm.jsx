import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addTransaction, updateTransaction, load } from '../data/storage.js';
import { toNumber } from '../data/utils.js';

export default function EntryForm({ type, editId, onSaved }) {
  const navigate = useNavigate();
  const editing = Boolean(editId);

  const existing = React.useMemo(() => {
    if (!editing) return null;
    const s = load();
    return s.transactions.find(t => t.id === editId) || null;
  }, [editId, editing]);

  const [form, setForm] = React.useState(() => existing || {
    type,
    name: '',
    qty: '',
    pricePerQty: '',
    charges: '',
    date: new Date().toISOString().slice(0,10)
  });

  React.useEffect(() => {
    if (existing) setForm(existing);
    // eslint-disable-next-line
  }, [existing]);

  const onChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Name is required');
    if (toNumber(form.qty) <= 0) return alert('Quantity must be > 0');
    if (toNumber(form.pricePerQty) <= 0) return alert('Price must be > 0');

    if (editing) {
      updateTransaction(editId, { ...form, type: type || existing.type });
    } else {
      addTransaction({ ...form, type });
    }

    onSaved && onSaved();
    navigate('/history');
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 pt-6">
      <div className="bg-green-50 rounded-3xl p-5 shadow-soft">
        <h2 className="text-xl font-semibold">{editing ? 'Edit Entry' : (type === 'BUY' ? 'Buy Entry' : 'Sell Entry')}</h2>

        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submit}>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={form.name}
              onChange={e => onChange('name', e.target.value)}
              placeholder="Instrument / Stock name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={form.qty}
              onChange={e => onChange('qty', e.target.value)}
              placeholder="e.g. 1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Price Per Qty</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={form.pricePerQty}
              onChange={e => onChange('pricePerQty', e.target.value)}
              placeholder="e.g. 100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Charges</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={form.charges}
              onChange={e => onChange('charges', e.target.value)}
              placeholder="e.g. 10"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={form.date}
              onChange={e => onChange('date', e.target.value)}
            />
          </div>

          <div className="md:col-span-2 flex gap-3 mt-2">
            <button type="submit" className="px-5 py-2.5 rounded-2xl bg-white border shadow-soft hover:shadow active:scale-95">
              {editing ? 'Update' : 'Confirm'}
            </button>
            <button type="button" onClick={() => history.back()} className="px-5 py-2.5 rounded-2xl bg-white border hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
