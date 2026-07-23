import type { Metadata } from 'next';
import { AboutClient } from '@/components/about/about-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us — Building the Future of AI',
  description:
    'AI Dev Info is a complete AI ecosystem for discovering tools, building solutions, learning from experts, and promoting AI products. Learn our story, mission, team, and values.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}
