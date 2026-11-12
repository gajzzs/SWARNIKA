import { GOLD_RATES, GST_RATE, type Karat, type Product } from "./data";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatINR = (n: number) => inr.format(Math.round(n));
export const formatGrams = (g: number) => `${g.toFixed(2)} g`;

export type Breakup = {
  karat: Karat;
  rate: number;
  netGold: number;
  gold: number;
  stones: number;
  making: number;
  subtotal: number;
  gst: number;
  total: number;
};

export function priceBreakup(p: Product, karat: Karat = p.karat): Breakup {
  const rate = GOLD_RATES[karat];
  const gold = rate * p.netGold;
  const stones = p.stones.reduce((s, x) => s + x.value, 0);
  const making = (gold * p.makingPct) / 100;
  const subtotal = gold + stones + making;
  const gst = subtotal * GST_RATE;
  return { karat, rate, netGold: p.netGold, gold, stones, making, subtotal, gst, total: subtotal + gst };
}

export const priceOf = (p: Product, karat?: Karat) => priceBreakup(p, karat).total;
