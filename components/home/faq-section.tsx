'use client';

import { SectionHeading } from '@/components/shared/section-heading';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { generalFaqs } from '@/lib/testimonials-faqs';

export function FaqSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about AI Dev Info and our AI directory."
        />
        <div className="mt-10">
          <FaqAccordion faqs={generalFaqs} />
        </div>
      </div>
    </section>
  );
}
