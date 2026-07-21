import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/service-detail';
import { aiServices, getServiceBySlug } from '@/lib/services';
import { getLatestBlogPosts } from '@/lib/blog-posts';
import { generateSEO, generateServiceLd } from '@/lib/seo';

export function generateStaticParams() {
  return aiServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return generateSEO({
    title: `${service.name} — Review, Pricing & Features`,
    description: service.description,
    path: `/services/${service.slug}`,
    type: 'article',
    tags: service.tags,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const ld = generateServiceLd(service);
  const relatedPosts = await getLatestBlogPosts(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <ServiceDetail service={service} relatedPosts={relatedPosts} />
    </>
  );
}
