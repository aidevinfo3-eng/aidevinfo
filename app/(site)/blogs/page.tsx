import type { Metadata } from 'next';
import { BlogsClient } from '@/components/blog/blogs-client';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { getBlogFilterCategories } from '@/lib/blog-categories';
import { generateSEO } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = generateSEO({
  title: 'AI Blogs, Tutorials, News & Expert Insights',
  description:
    'Stay ahead with expert-written AI blogs, tutorials, tool comparisons, development guides, industry news, and prompt engineering resources.',
  path: '/blogs',
});

export default async function BlogsPage() {
  const [allPosts, categories] = await Promise.all([
    getAllBlogPosts(),
    getBlogFilterCategories(),
  ]);

  return <BlogsClient allPosts={allPosts} categories={categories} />;
}
