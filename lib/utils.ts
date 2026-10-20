import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format YYYY-MM-DD (or ISO) without UTC day-shift. */
export function formatPublishedDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
) {
  const dayPart = date.slice(0, 10);
  const [y, m, d] = dayPart.split('-').map(Number);
  if (!y || !m || !d) return date;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', options);
}
