import { HeroSection } from '@/components/home/hero-section';
import { TrustedTechSection } from '@/components/home/trusted-tech-section';
import { DevServicesSection } from '@/components/home/dev-services-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';
import { CategoriesSection } from '@/components/home/categories-section';
import { FeaturedSolutionsSection } from '@/components/home/featured-solutions-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { TrendingToolsSection } from '@/components/home/trending-tools-section';
import { LatestBlogSection } from '@/components/home/latest-blog-section';
import { ClientLogosSection } from '@/components/home/client-logos-section';
import { Newsletter } from '@/components/shared/newsletter';
import { ContactCtaSection } from '@/components/home/contact-cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedTechSection />
      <DevServicesSection />
      <WhyChooseSection />
      <CategoriesSection />
      <FeaturedSolutionsSection />
      <HowItWorksSection />
      <TrendingToolsSection />
      <LatestBlogSection />
      <ClientLogosSection />
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>
      <ContactCtaSection />
    </>
  );
}
