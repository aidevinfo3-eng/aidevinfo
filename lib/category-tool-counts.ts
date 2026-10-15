import type { AIService, Category } from './types';

/** Match tools to category slugs (aiTool.category stores slug). */
export function countToolsByCategorySlug(tools: AIService[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    const slug = tool.category?.trim();
    if (!slug) continue;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }
  return counts;
}

export function formatCategoryToolCount(count: number): string {
  if (count === 0) return 'No tools listed';
  if (count === 1) return '1 tool';
  return `${count} tools`;
}

export function enrichCategoriesWithToolCounts(
  categories: Category[],
  tools: AIService[]
): Category[] {
  const counts = countToolsByCategorySlug(tools);
  return categories.map((category) => {
    const count = counts.get(category.slug) ?? 0;
    return {
      ...category,
      count,
      countLabel: formatCategoryToolCount(count),
    };
  });
}
