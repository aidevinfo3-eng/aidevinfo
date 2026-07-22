import 'server-only';

import { client, hasSanityConfig } from './sanity';
import { allBlogCategoriesQuery } from './sanity-queries';
import { blogCategories as fallbackBlogCategories } from './blog-posts';

type SanityBlogCategory = {
  _id: string;
  name: string;
  slug: string | null;
  description?: string | null;
  order?: number | null;
};

export async function getBlogCategoryNames(): Promise<string[]> {
  if (!hasSanityConfig) {
    return fallbackBlogCategories.filter((c) => c !== 'All');
  }

  try {
    const docs = await client.fetch<SanityBlogCategory[]>(
      allBlogCategoriesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    if (!docs?.length) {
      return fallbackBlogCategories.filter((c) => c !== 'All');
    }
    return docs.map((d) => d.name).filter(Boolean);
  } catch (error) {
    console.error('Sanity blog categories fetch failed:', error);
    return fallbackBlogCategories.filter((c) => c !== 'All');
  }
}

/** Returns filter options including "All" for the blogs page. */
export async function getBlogFilterCategories(): Promise<string[]> {
  const names = await getBlogCategoryNames();
  return ['All', ...names];
}
