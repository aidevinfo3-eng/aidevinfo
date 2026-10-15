import type { Metadata } from 'next';
import { ServicesClient } from '@/components/services/services-client';
import { ServicesHero } from '@/components/services/services-hero';
import { getAllAiTools } from '@/lib/ai-tools';
import { getAllCategoriesWithCounts } from '@/lib/tool-categories';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Tools — Find the Best AI Tools for Every Business Need',
  description:
    'Discover and compare verified AI tools — chatbots, image generators, coding assistants and writing apps. Filter by category and pricing.',
  path: '/services',
  keywords: [
    'AI tools',
    'best AI tools',
    'AI tools directory',
    'compare AI tools',
    'AI software',
    'AI tool reviews',
  ],
});

export default async function ServicesPage() {
  const [tools, categories] = await Promise.all([
    getAllAiTools(),
    getAllCategoriesWithCounts(),
  ]);
  return (
    <>
      <ServicesHero
        heading="Find the Best AI Tools for Every Business Need"
        description="Discover and compare verified AI tools — chatbots, image generators, coding assistants, writing apps, automation platforms, and more. Filter by category and pricing to choose the right AI tool with confidence."
        breadcrumbs={[{ label: 'AI Tools' }]}
      />
      <ServicesClient tools={tools} categories={categories} />
    </>
  );
}
