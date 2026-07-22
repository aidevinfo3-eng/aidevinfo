import type { AIService } from './types';
import { aiServices } from './services-data';

export { aiServices };

/** Sync helpers use the static fallback dataset (client-safe). Prefer async helpers from `@/lib/ai-tools` on the server. */
export function getServiceBySlug(slug: string): AIService | undefined {
  return aiServices.find((s) => s.slug === slug);
}

export function getFeaturedServices(): AIService[] {
  return aiServices.filter((s) => s.featured).slice(0, 6);
}

export function getPopularServices(): AIService[] {
  return aiServices.filter((s) => s.popular);
}

export function getRelatedServices(slugs: string[]): AIService[] {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is AIService => Boolean(s));
}

export function getServicesByCategory(category: string): AIService[] {
  return aiServices.filter((s) => s.category === category);
}
