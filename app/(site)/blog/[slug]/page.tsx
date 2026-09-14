import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { BlogDetail } from '@/components/blog/blog-detail';
import {
  getBlogBySlug,
  getRelatedBlogPosts,
} from '@/lib/blog-posts';
import type { BlogPost } from '@/lib/types';
import { generateSEO, generateArticleLd } from '@/lib/seo';

// export const revalidate = 60;
export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//   const posts = await getAllBlogPosts();
//   return posts.map((post) => ({ slug: post.slug }));
// }

/**
 * Search titles for posts whose CMS seo.metaTitle duplicates the on-page H1
 * verbatim. Remove an entry once the CMS carries a distinct meta title.
 */
const metaTitleOverrides: Record<string, string> = {
  'machine-learning-vs-deep-learning-vs-ai-development':
    'ML vs Deep Learning vs AI Development: Key Differences',
  'ai-content-workflows':
    'Self-Improving AI Content Workflows: 8 Feedback Loops',
  'ai-search-evaluates-your-brand':
    'How AI Search Evaluates Your Brand: What to Strengthen',
};

function metaTitleFor(post: BlogPost): string {
  const cmsTitle = post.seo?.metaTitle?.trim();
  // A meta title identical to the H1 wastes the snippet, so the override wins.
  if (cmsTitle && cmsTitle !== post.title.trim()) return cmsTitle;
  return metaTitleOverrides[post.slug] || cmsTitle || post.title;
}

function keywordsFor(post: BlogPost): string[] {
  return [...post.tags, post.category, `${post.category} guide`];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};

  return generateSEO({
    title: metaTitleFor(post),
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.seo?.ogImage || post.image,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    tags: post.tags,
    keywords: keywordsFor(post),
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  // Send whitespace-padded legacy URLs (/blog/%20some-slug) to the clean path.
  if (slug !== post.slug) permanentRedirect(`/blog/${post.slug}`);

  const relatedPosts = await getRelatedBlogPosts(post.slug, 3);

  const ld = generateArticleLd({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    date: post.date,
    author: post.author,
    slug: post.slug,
    tags: post.tags,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <BlogDetail post={post} relatedPosts={relatedPosts} />
    </>
  );
}
