import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogDetail } from '@/components/blog/blog-detail';
import {
  getAllBlogPosts,
  getBlogBySlug,
  getRelatedBlogPosts,
} from '@/lib/blog-posts';
import { generateSEO, generateArticleLd } from '@/lib/seo';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
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
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.seo?.ogImage || post.image,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    tags: post.tags,
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
