import type { Metadata } from 'next';
import { ServicesClient } from '@/components/services/services-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Services Directory — Explore AI Tools',
  description: 'Browse our curated directory of 30+ AI tools and services. Search by category, compare features, and find the perfect AI solution for your needs.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <ServicesClient />
    </div>
  );
}
