import type { Metadata } from 'next';
import { BlogsClient } from '@/components/blog/blogs-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Blog — Insights, Tutorials & News',
  description: 'Read expert analysis, in-depth tutorials, and the latest AI news. Stay informed about artificial intelligence trends, tools, and best practices.',
  path: '/blogs',
});

export default function BlogsPage() {
  return <BlogsClient />;
}
