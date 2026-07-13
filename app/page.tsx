import { HeroSection } from '@/components/home/hero-section';
import { FeaturedServices } from '@/components/home/featured-services';
import { CategoriesSection } from '@/components/home/categories-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';
import { LatestBlogSection } from '@/components/home/latest-blog-section';
import { Newsletter } from '@/components/shared/newsletter';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { FaqSection } from '@/components/home/faq-section';
import { ContactCtaSection } from '@/components/home/contact-cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <CategoriesSection />
      <WhyChooseSection />
      <LatestBlogSection />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>
      <TestimonialsSection />
      <FaqSection />
      <ContactCtaSection />
    </>
  );
}
