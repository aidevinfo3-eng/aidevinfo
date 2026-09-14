import type { Metadata } from 'next';
import { ContactClient } from '@/components/contact/contact-client';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Contact Us — Get in Touch with Our AI Team',
  description: 'Have questions about AI tools, want to submit your service, or interested in advertising? Contact the AI Dev Info team today.',
  path: '/contact',
  keywords: [
    'contact AI Dev Info',
    'AI development enquiry',
    'submit AI tool',
    'AI consultation booking',
    'AI advertising contact',
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
