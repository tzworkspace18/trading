import { toNumber } from './utils.js';

const KEY = 'trading-app@v1';

function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { transactions: [] };
    const parsed = JSON.parse(raw);
    if (!parsed.transactions) parsed.transactions = [];
    return parsed;
  } catch (e) {
    console.error('Failed to load state', e);
    return { transactions: [] };
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}

export function addTransaction(tx) {
  const state = load();
  const newTx = {
    id: uid(),
    type: tx.type === 'SELL' ? 'SELL' : 'BUY',
    name: (tx.name || '').trim(),
    qty: toNumber(tx.qty),
    pricePerQty: toNumber(tx.pricePerQty),
    charges: toNumber(tx.charges),
    date: tx.date || new Date().toISOString().slice(0,10)
  };
  state.transactions.unshift(newTx);
  save(state);
  return newTx;
}

export function updateTransaction(id, updates) {
  const state = load();
  state.transactions = state.transactions.map(t => t.id === id ? { ...t, ...updates } : t);
  save(state);
}

export function removeTransaction(id) {
  const state = load();
  state.transactions = state.transactions.filter(t => t.id !== id);
  save(state);
}

export function clearAll() {
  localStorage.removeItem(KEY);
}
