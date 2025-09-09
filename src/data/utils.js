export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function toNumber(val) {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}
