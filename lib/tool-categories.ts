import 'server-only';

import type { Category } from './types';
import { getAllAiTools } from './ai-tools';
import { enrichCategoriesWithToolCounts } from './category-tool-counts';
import { client, hasSanityConfig } from './sanity';
import { allToolCategoriesQuery } from './sanity-queries';
import { categories as fallbackCategories } from './categories';

type SanityToolCategory = {
  _id: string;
  name: string;
  slug: string | null;
  description?: string | null;
  icon?: string | null;
  countLabel?: string | null;
  order?: number | null;
  showOnHome?: boolean | null;
};

function mapSanityCategory(doc: SanityToolCategory): Category {
  return {
    name: doc.name,
    slug: doc.slug || doc._id,
    description: doc.description || '',
    icon: doc.icon || 'Zap',
    count: 0,
    color: 'from-zinc-700 to-zinc-900',
    showOnHome: doc.showOnHome !== false,
    order: doc.order ?? 0,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  if (!hasSanityConfig) return fallbackCategories;

  try {
    const docs = await client.fetch<SanityToolCategory[]>(
      allToolCategoriesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    if (!docs?.length) return fallbackCategories;
    return docs.map(mapSanityCategory);
  } catch (error) {
    console.error('Sanity tool categories fetch failed:', error);
    return fallbackCategories;
  }
}

export async function getHomeCategories(): Promise<Category[]> {
  const all = await getAllCategories();
  const home = all.filter((c) => c.showOnHome !== false);
  return home.length ? home : all;
}

/** Home categories with live tool counts from published AI tools. */
export async function getHomeCategoriesWithCounts(): Promise<Category[]> {
  const [categories, tools] = await Promise.all([
    getHomeCategories(),
    getAllAiTools(),
  ]);
  return enrichCategoriesWithToolCounts(categories, tools);
}

/** All categories with live tool counts. */
export async function getAllCategoriesWithCounts(): Promise<Category[]> {
  const [categories, tools] = await Promise.all([
    getAllCategories(),
    getAllAiTools(),
  ]);
  return enrichCategoriesWithToolCounts(categories, tools);
}

export async function findCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug);
}

export async function getCategorySlugs(): Promise<string[]> {
  const all = await getAllCategories();
  return all.map((c) => c.slug);
}
