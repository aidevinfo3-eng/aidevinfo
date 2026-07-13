import type { Metadata } from 'next';
import { AdvertisingClient } from '@/components/advertising/advertising-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Advertising — Reach the AI Community',
  description: 'Promote your AI tool or service to 150K+ monthly visitors. Explore advertising packages, placements, and sponsorship opportunities on AI Dev Info.',
  path: '/advertising',
});

export default function AdvertisingPage() {
  return <AdvertisingClient />;
}
