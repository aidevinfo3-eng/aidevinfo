import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/service-detail';
import {
  getAiToolBySlug,
  getRelatedAiTools,
} from '@/lib/ai-tools';
import { getLatestBlogPosts } from '@/lib/blog-posts';
import { generateSEO, generateServiceLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//   const slugs = await getAiToolSlugs();
//   return slugs.map((slug) => ({ slug }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getAiToolBySlug(slug);
  if (!service) return {};

  return generateSEO({
    title: `${service.name} — Review, Pricing & Features`,
    description: service.description,
    path: `/services/${service.slug}`,
    type: 'article',
    tags: service.tags,
    branded: false,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getAiToolBySlug(slug);
  if (!service) notFound();

  const [ld, relatedPosts, alternatives] = await Promise.all([
    Promise.resolve(generateServiceLd(service)),
    getLatestBlogPosts(3),
    getRelatedAiTools(service.alternatives),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <ServiceDetail
        service={service}
        relatedPosts={relatedPosts}
        alternatives={alternatives.filter((s) => s.slug !== service.slug).slice(0, 4)}
      />
    </>
  );
}
