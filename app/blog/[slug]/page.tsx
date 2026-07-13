import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogDetail } from '@/components/blog/blog-detail';
import { getAllBlogPosts, getBlogBySlug } from '@/lib/blog-posts';
import { generateSEO, generateArticleLd } from '@/lib/seo';

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) return {};

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    tags: post.tags,
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

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
      <BlogDetail post={post} />
    </>
  );
}
