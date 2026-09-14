import type { Metadata } from 'next';
import { AboutClient } from '@/components/about/about-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us — Building the Future of AI',
  description:
    'AI Dev Info is a complete AI ecosystem for discovering tools, building solutions, and learning from experts. Read our story, mission, and values.',
  path: '/about',
  keywords: [
    'about AI Dev Info',
    'AI company mission',
    'AI ecosystem platform',
    'AI experts team',
    'AI Dev Info story',
  ],
});

export default function AboutPage() {
  return <AboutClient />;
}
