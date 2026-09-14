import type { Metadata } from 'next';
import { BlogsClient } from '@/components/blog/blogs-client';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { getBlogFilterCategories } from '@/lib/blog-categories';
import { generateSEO } from '@/lib/seo';

// export const revalidate = 60;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = generateSEO({
  title: 'AI Blog — Tutorials, Guides & Industry News',
  description:
    'Stay ahead with expert-written AI blogs, tutorials, tool comparisons, development guides, industry news, and prompt engineering resources.',
  path: '/blogs',
  keywords: [
    'AI blog',
    'AI tutorials',
    'AI news',
    'AI guides',
    'machine learning articles',
    'prompt engineering',
  ],
});

export default async function BlogsPage() {
  const [allPosts, categories] = await Promise.all([
    getAllBlogPosts(),
    getBlogFilterCategories(),
  ]);

  return <BlogsClient allPosts={allPosts} categories={categories} />;
}
