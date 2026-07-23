import 'server-only';

import type { AIService } from './types';
import { client, hasSanityConfig } from './sanity';
import {
  aiToolBySlugQuery,
  aiToolSlugsQuery,
  allAiToolsQuery,
} from './sanity-queries';
import { aiServices as fallbackAiServices } from './services-data';

export type SanityAiTool = {
  _id: string;
  name: string;
  slug: string | null;
  tagline?: string | null;
  description?: string | null;
  longDescription?: string | null;
  category?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  pricing?: string | null;
  pricingPlans?: AIService['pricingPlans'] | null;
  website?: string | null;
  platform?: string[] | null;
  apiAvailable?: boolean | null;
  lastUpdated?: string | null;
  dateAdded?: string | null;
  tags?: string[] | null;
  features?: string[] | null;
  pros?: string[] | null;
  cons?: string[] | null;
  useCases?: AIService['useCases'] | null;
  screenshots?: string[] | null;
  alternatives?: string[] | null;
  faqs?: AIService['faqs'] | null;
  reviews?: AIService['reviews'] | null;
  popular?: boolean | null;
  featured?: boolean | null;
};

function mapSanityAiTool(doc: SanityAiTool): AIService {
  return {
    slug: doc.slug || doc._id,
    name: doc.name,
    tagline: doc.tagline || '',
    description: doc.description || '',
    longDescription: doc.longDescription || doc.description || '',
    category: doc.category || 'ai-chatbots',
    rating: doc.rating ?? 0,
    reviewCount: doc.reviewCount ?? 0,
    pricing: doc.pricing || 'Freemium',
    pricingPlans: doc.pricingPlans ?? [],
    website: doc.website || '',
    platform: doc.platform ?? [],
    apiAvailable: Boolean(doc.apiAvailable),
    lastUpdated: doc.lastUpdated || '',
    tags: doc.tags ?? [],
    features: doc.features ?? [],
    pros: doc.pros ?? [],
    cons: doc.cons ?? [],
    useCases: doc.useCases ?? [],
    screenshots: doc.screenshots ?? [],
    alternatives: doc.alternatives ?? [],
    faqs: doc.faqs ?? [],
    reviews: (doc.reviews ?? []).map((r) => ({
      ...r,
      date: r.date || '',
    })),
    popular: Boolean(doc.popular),
    featured: Boolean(doc.featured),
    dateAdded: doc.dateAdded || '',
  };
}

export async function getAllAiTools(): Promise<AIService[]> {
  if (!hasSanityConfig) return fallbackAiServices;

  try {
    const docs = await client.fetch<SanityAiTool[]>(
      allAiToolsQuery,
      {},
      // { next: { revalidate: 60 } }
      { cache: 'no-store' }
    );
    if (!docs?.length) return fallbackAiServices;
    return docs.map(mapSanityAiTool);
  } catch (error) {
    console.error('Sanity AI tools fetch failed:', error);
    return fallbackAiServices;
  }
}

export async function getAiToolBySlug(
  slug: string
): Promise<AIService | undefined> {
  if (!hasSanityConfig) {
    return fallbackAiServices.find((s) => s.slug === slug);
  }

  try {
    const doc = await client.fetch<SanityAiTool | null>(
      aiToolBySlugQuery,
      { slug },
      // { next: { revalidate: 60 } }
      { cache: 'no-store' }
    );
    if (doc) return mapSanityAiTool(doc);
  } catch (error) {
    console.error('Sanity AI tool fetch failed:', error);
  }

  return fallbackAiServices.find((s) => s.slug === slug);
}

export async function getFeaturedAiTools(limit = 6): Promise<AIService[]> {
  const tools = await getAllAiTools();
  const featured = tools.filter((t) => t.featured);
  return (featured.length ? featured : tools).slice(0, limit);
}

export async function getRelatedAiTools(
  slugs: string[]
): Promise<AIService[]> {
  if (!slugs.length) return [];
  const tools = await getAllAiTools();
  const bySlug = new Map(tools.map((t) => [t.slug, t]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((t): t is AIService => Boolean(t));
}

export async function getAiToolSlugs(): Promise<string[]> {
  if (!hasSanityConfig) return fallbackAiServices.map((s) => s.slug);

  try {
    const docs = await client.fetch<{ slug: string }[]>(
      aiToolSlugsQuery,
      {},
      // { next: { revalidate: 60 } }
      { cache: 'no-store' }
    );
    if (docs?.length) return docs.map((d) => d.slug);
  } catch (error) {
    console.error('Sanity AI tool slugs fetch failed:', error);
  }

  return fallbackAiServices.map((s) => s.slug);
}

export { fallbackAiServices };
