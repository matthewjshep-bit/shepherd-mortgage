import type { DealInputs } from './engine';

export interface SavedDeal {
  id: string;
  name: string;
  inputs: DealInputs;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'shepherd-flip-deals';

export function loadDeals(): SavedDeal[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDeal(name: string, inputs: DealInputs, existingId?: string): SavedDeal {
  const deals = loadDeals();
  const now = new Date().toISOString();

  if (existingId) {
    const idx = deals.findIndex((d) => d.id === existingId);
    if (idx >= 0) {
      deals[idx] = { ...deals[idx], name, inputs, updatedAt: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
      return deals[idx];
    }
  }

  const newDeal: SavedDeal = {
    id: crypto.randomUUID(),
    name,
    inputs,
    createdAt: now,
    updatedAt: now,
  };
  deals.unshift(newDeal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  return newDeal;
}

export function deleteDeal(id: string): void {
  const deals = loadDeals().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

export function duplicateDeal(id: string): SavedDeal | null {
  const deals = loadDeals();
  const original = deals.find((d) => d.id === id);
  if (!original) return null;
  return saveDeal(`${original.name} (copy)`, { ...original.inputs });
}
