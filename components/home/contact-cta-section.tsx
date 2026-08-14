import { CTASection } from '@/components/shared/cta-section';

export function ContactCtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CTASection
          title="Ready to build with AI?"
          description="Book a free consultation with our AI experts, or explore advertising options to promote your tools and services."
          primaryLabel="Book free consultation"
          primaryHref="/contact"
          secondaryLabel="Advertise with us"
          secondaryHref="/advertising"
        />
      </div>
    </section>
  );
}
