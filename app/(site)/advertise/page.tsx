import type { Metadata } from 'next';
import { AdvertiseClient } from '@/components/advertising/advertise-client';
import { generateSEO, normalizeKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Advertise on AI Dev Info | Reach an AI-Focused Audience',
  description:
    'Advertise your AI product on AI Dev Info. Reach developers, founders, businesses, technology teams, and AI enthusiasts through tool listings, featured placements, sponsored articles, tutorials, reviews, and custom campaigns.',
  path: '/advertise',
  keywords: normalizeKeywords([
    'advertise on AI website',
    'AI advertising',
    'advertise AI tools',
    'AI product advertising',
    'AI tool promotion',
    'AI marketing',
    'sponsored AI content',
    'AI tool directory advertising',
    'advertise to developers',
    'AI sponsorship opportunities',
  ]),
});

export default function AdvertisePage() {
  return <AdvertiseClient />;
}
