import 'server-only';

import type { Category } from './types';
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
  const countLabel = doc.countLabel || '10+';
  const numeric = Number.parseInt(countLabel.replace(/[^\d]/g, ''), 10);
  return {
    name: doc.name,
    slug: doc.slug || doc._id,
    description: doc.description || '',
    icon: doc.icon || 'Zap',
    count: Number.isFinite(numeric) ? numeric : 0,
    countLabel,
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
