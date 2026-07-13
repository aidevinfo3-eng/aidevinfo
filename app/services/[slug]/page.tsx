import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/service-detail';
import { aiServices, getServiceBySlug } from '@/lib/services';
import { generateSEO, generateServiceLd } from '@/lib/seo';

export function generateStaticParams() {
  return aiServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return generateSEO({
    title: `${service.name} — Review, Pricing & Features`,
    description: service.description,
    path: `/services/${service.slug}`,
    type: 'article',
    tags: service.tags,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const ld = generateServiceLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
