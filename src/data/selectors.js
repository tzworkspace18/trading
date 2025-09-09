import { toNumber } from './utils.js';
import { load } from './storage.js';

export function computeTotals(state = load()) {
  let totalBuy = 0;
  let totalSell = 0;
  let totalCharges = 0;

  state.transactions.forEach(tx => {
    const qty = toNumber(tx.qty);
    const price = toNumber(tx.pricePerQty);
    const charges = toNumber(tx.charges);

    if (tx.type === 'BUY') totalBuy += qty * price;
    if (tx.type === 'SELL') totalSell += qty * price;

    totalCharges += charges;
  });

  const pnl = totalSell - totalBuy - totalCharges;
  const balance = (state.initialCash || 0) + pnl;
  const availableCash = balance;

  return { totalBuy, totalSell, totalCharges, pnl, balance, availableCash };
}
