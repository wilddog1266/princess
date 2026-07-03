import type { Stat } from '../types/content';

export const ABOUT = {
  statement:
    'Princess began as a single chair and a belief that beauty should feel like being cared for, not processed. We keep the studio small on purpose — fewer guests, deeper attention, and work that is shaped to you rather than a trend.',
} as const;

export const ABOUT_STATS: Stat[] = [
  { value: '12', label: 'Years of craft' },
  { value: '4k+', label: 'Faces cared for' },
  { value: '1', label: 'Chair at a time' },
];
