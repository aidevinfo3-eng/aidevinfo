import type { Metadata } from 'next';
import { AboutClient } from '@/components/about/about-client';
import { getAllAiTools } from '@/lib/ai-tools';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { getAllCategoriesWithCounts } from '@/lib/tool-categories';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About AI Dev Info — How We Evaluate Tools & Publish Guides',
  description:
    'Learn what AI Dev Info is, how we research and review AI tools, our editorial standards, and who we serve—practical knowledge without hype.',
  path: '/about',
  keywords: [
    'about AI Dev Info',
    'AI tool reviews methodology',
    'AI editorial standards',
    'AI tools directory',
    'evaluate AI tools',
  ],
});

export default async function AboutPage() {
  const [tools, posts, categories] = await Promise.all([
    getAllAiTools(),
    getAllBlogPosts(),
    getAllCategoriesWithCounts(),
  ]);

  return (
    <AboutClient
      stats={{
        toolCount: tools.length,
        articleCount: posts.length,
        categoryCount: categories.length,
      }}
    />
  );
}
