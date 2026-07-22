import { HeroSection } from '@/components/home/hero-section';
import { TrustedTechSection } from '@/components/home/trusted-tech-section';
import { DevServicesSection } from '@/components/home/dev-services-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';
import { CategoriesSection } from '@/components/home/categories-section';
import { FeaturedSolutionsSection } from '@/components/home/featured-solutions-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { TrendingToolsSection } from '@/components/home/trending-tools-section';
import { LatestBlogSection } from '@/components/home/latest-blog-section';
import { ContactCtaSection } from '@/components/home/contact-cta-section';
import { getDevelopmentServices } from '@/lib/development-services';
import { getFeaturedAiTools } from '@/lib/ai-tools';
import { getAllCategories } from '@/lib/tool-categories';

export default async function HomePage() {
  const [developmentServices, trendingTools, categories] = await Promise.all([
    getDevelopmentServices(),
    getFeaturedAiTools(6),
    getAllCategories(),
  ]);

  return (
    <>
      <HeroSection />
      <TrustedTechSection />
      <DevServicesSection services={developmentServices} />
      <WhyChooseSection />
      <CategoriesSection categories={categories} />
      <FeaturedSolutionsSection />
      <HowItWorksSection />
      <TrendingToolsSection tools={trendingTools} />
      <LatestBlogSection />
      <ContactCtaSection />
    </>
  );
}
