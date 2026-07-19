import type { Metadata } from 'next';
import { AdvertisingClient } from '@/components/advertising/advertising-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Advertising — Reach Thousands of AI Buyers Every Month',
  description:
    'Promote your AI tools, SaaS, and services to developers, founders, and decision-makers. Sponsored listings, banners, newsletters, and custom campaigns.',
  path: '/advertising',
});

export default function AdvertisingPage() {
  return <AdvertisingClient />;
}
