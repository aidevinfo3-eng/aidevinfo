'use client';

import { CTASection } from '@/components/shared/cta-section';

export function ContactCtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CTASection
          title="Partner with AI Dev Info"
          description="Looking to advertise your AI tool, collaborate on content, or explore partnership opportunities? We'd love to hear from you."
          primaryLabel="Contact Us"
          primaryHref="/contact"
          secondaryLabel="View Advertising"
          secondaryHref="/advertising"
        />
      </div>
    </section>
  );
}
