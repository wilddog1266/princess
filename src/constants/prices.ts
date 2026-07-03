import type { PriceItem } from '../types/content';

export const PRICES: PriceItem[] = [
  {
    id: 'lash-volume',
    name: 'Volume Lash Set',
    description: 'Full hand-mapped set, two-week refinement included.',
    price: '$120',
  },
  {
    id: 'brow-lam',
    name: 'Brow Lamination & Tint',
    description: 'Lamination, tint and precision shaping.',
    price: '$75',
  },
  {
    id: 'signature-makeup',
    name: 'Signature Makeup',
    description: 'Bespoke look with skin prep and a touch-up kit to take home.',
    price: '$180',
    signature: true,
  },
  {
    id: 'colour',
    name: 'Colour & Gloss',
    description: 'Custom colour, gloss and a finishing style.',
    price: '$160',
  },
  {
    id: 'facial',
    name: 'Glow Ritual Facial',
    description: 'Sixty minutes of restorative, lit-from-within care.',
    price: '$130',
  },
];
