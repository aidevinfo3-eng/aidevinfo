import type { Metadata } from 'next';
import { ServicesClient } from '@/components/services/services-client';
import { getAllAiTools } from '@/lib/ai-tools';
import { getAllCategories } from '@/lib/tool-categories';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Tools — Find the Best AI Tools for Every Business Need',
  description:
    'Discover and compare verified AI tools — chatbots, image generators, coding assistants, writing apps, and automation platforms. Filter by category and pricing.',
  path: '/services',
  branded: false,
});

export default async function ServicesPage() {
  const [tools, categories] = await Promise.all([
    getAllAiTools(),
    getAllCategories(),
  ]);
  return <ServicesClient tools={tools} categories={categories} />;
}
