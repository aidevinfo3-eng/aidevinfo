import type { Metadata } from 'next';
import { ServicesClient } from '@/components/services/services-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Services — Find the Best AI Services for Every Business Need',
  description:
    'Discover verified AI development companies, automation agencies, chatbot developers, LLM experts, and consulting firms. Compare services and choose with confidence.',
  path: '/services',
});

export default function ServicesPage() {
  return <ServicesClient />;
}
