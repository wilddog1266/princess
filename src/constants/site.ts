import type { OpeningHours, SocialLink } from '../types/content';

export const SITE = {
  name: 'Princess',
  tagline: 'Beauty Studio',
  intro: 'A private studio for the quietly luxurious — where beauty is unhurried and entirely yours.',
  phone: '+1 (212) 555-0148',
  email: 'studio@princess.beauty',
  address: '24 Aurora Lane, Madison Park, New York',
} as const;

export const OPENING_HOURS: OpeningHours[] = [
  { day: 'Mon — Fri', time: '9:00 — 20:00' },
  { day: 'Saturday', time: '10:00 — 18:00' },
  { day: 'Sunday', time: 'By appointment' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
];
