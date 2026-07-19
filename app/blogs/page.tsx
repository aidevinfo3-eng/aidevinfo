import type { Metadata } from 'next';
import { BlogsClient } from '@/components/blog/blogs-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Blogs, Tutorials, News & Expert Insights',
  description:
    'Stay ahead with expert-written AI blogs, tutorials, tool comparisons, development guides, industry news, and prompt engineering resources.',
  path: '/blogs',
});

export default function BlogsPage() {
  return <BlogsClient />;
}
