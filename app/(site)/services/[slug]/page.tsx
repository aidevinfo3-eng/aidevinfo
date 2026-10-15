import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/service-detail';
import { ServicesClient } from '@/components/services/services-client';
import { ServicesHero } from '@/components/services/services-hero';
import {
  getAllAiTools,
  getAiToolBySlug,
  getRelatedAiTools,
} from '@/lib/ai-tools';
import { getLatestBlogPosts } from '@/lib/blog-posts';
import {
  findCategoryBySlug,
  getAllCategoriesWithCounts,
} from '@/lib/tool-categories';
import type { Category } from '@/lib/types';
import { generateSEO, generateServiceLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

/**
 * Category listings live at /services/<category> rather than
 * /services?category=<category> so each one is a crawlable, indexable URL.
 */
function categoryTitle(category: Category): string {
  return `${category.name} — Best AI Tools & Reviews`;
}

function categoryHeading(category: Category): string {
  return `${category.name}: Compare the Best Tools`;
}

function categoryDescription(category: Category): string {
  const summary = `Compare verified ${category.name} tools by features, pricing, and real user reviews on AI Dev Info.`;
  const intro = category.description?.trim().replace(/\s+/g, ' ') ?? '';
  if (intro && `${intro} ${summary}`.length <= 158) return `${intro} ${summary}`;
  return summary;
}

function categoryKeywords(category: Category): string[] {
  const name = category.name;
  return [
    `${name} tools`,
    `best ${name.toLowerCase()} tools`,
    `${name.toLowerCase()} software`,
    `top ${name.toLowerCase()} platforms`,
    `${name.toLowerCase()} comparison`,
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = await findCategoryBySlug(slug);
  if (category) {
    return generateSEO({
      title: categoryTitle(category),
      description: categoryDescription(category),
      path: `/services/${category.slug}`,
      keywords: categoryKeywords(category),
    });
  }

  const service = await getAiToolBySlug(slug);
  if (!service) return {};

  return generateSEO({
    title: `${service.name} — Review, Pricing & Features`,
    description: service.metaDescription || service.description,
    path: `/services/${service.slug}`,
    type: 'article',
    tags: service.tags,
    keywords: [
      service.name,
      `${service.name} review`,
      `${service.name} pricing`,
      `${service.name} features`,
      `${service.name} alternatives`,
      ...service.tags,
    ],
  });
}

async function CategoryListing({ category }: { category: Category }) {
  const [tools, categories] = await Promise.all([
    getAllAiTools(),
    getAllCategoriesWithCounts(),
  ]);

  return (
    <>
      <ServicesHero
        heading={categoryHeading(category)}
        description={categoryDescription(category)}
        breadcrumbs={[
          { label: 'AI Tools', href: '/services' },
          { label: category.name },
        ]}
      />
      <ServicesClient
        tools={tools}
        categories={categories}
        activeCategorySlug={category.slug}
      />
    </>
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await findCategoryBySlug(slug);
  if (category) return <CategoryListing category={category} />;

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
