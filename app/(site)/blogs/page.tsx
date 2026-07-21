import type { Metadata } from 'next';
import { BlogsClient } from '@/components/blog/blogs-client';
import {
  getAllBlogPosts,
  getBlogCategories,
  getBlogPostsByCategory,
  getFeaturedBlogPost,
  getLatestBlogPosts,
} from '@/lib/blog-posts';
import { generateSEO } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = generateSEO({
  title: 'AI Blogs, Tutorials, News & Expert Insights',
  description:
    'Stay ahead with expert-written AI blogs, tutorials, tool comparisons, development guides, industry news, and prompt engineering resources.',
  path: '/blogs',
});

export default async function BlogsPage() {
  const [allPosts, categories, featuredPost, editorPicks, tutorialPosts, newsPosts] =
    await Promise.all([
      getAllBlogPosts(),
      getBlogCategories(),
      getFeaturedBlogPost(),
      getLatestBlogPosts(5),
      getBlogPostsByCategory('Tutorials'),
      getBlogPostsByCategory('News'),
    ]);

  return (
    <BlogsClient
      allPosts={allPosts}
      categories={categories}
      featuredPost={featuredPost ?? allPosts[0] ?? null}
      editorPicks={editorPicks}
      tutorialPosts={tutorialPosts.slice(0, 4)}
      newsPosts={newsPosts.slice(0, 4)}
    />
  );
}
