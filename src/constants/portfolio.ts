import type { PortfolioItem } from '../types/content';

export const PORTFOLIO_CATEGORIES = ['All', 'Hair', 'Nails', 'Brows', 'Makeup'] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 'p1', title: 'Soft Copper', category: 'Hair' },
  { id: 'p2', title: 'Bare Gloss', category: 'Nails' },
  { id: 'p3', title: 'Feathered Line', category: 'Brows' },
  { id: 'p4', title: 'Sunset Eye', category: 'Makeup' },
  { id: 'p5', title: 'Liquid Bronze', category: 'Hair' },
  { id: 'p6', title: 'Porcelain Set', category: 'Nails' },
  { id: 'p7', title: 'Laminated Arch', category: 'Brows' },
  { id: 'p8', title: 'Dewy Neutral', category: 'Makeup' },
];
