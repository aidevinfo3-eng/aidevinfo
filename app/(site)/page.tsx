import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { PillarsSection } from '@/components/home/pillars-section';
import { PopularCategoriesSection } from '@/components/home/popular-categories-section';
import { TrendingToolsSection } from '@/components/home/trending-tools-section';
import { EvaluateToolsSection } from '@/components/home/evaluate-tools-section';
import { LearnTopicsSection } from '@/components/home/learn-topics-section';
import { LifecycleSection } from '@/components/home/lifecycle-section';
import { WhyAdevInfoSection } from '@/components/home/why-adev-info-section';
import { LatestBlogSection } from '@/components/home/latest-blog-section';
import { ContactCtaSection } from '@/components/home/contact-cta-section';
import { getFeaturedAiTools } from '@/lib/ai-tools';
import { getHomeCategoriesWithCounts } from '@/lib/tool-categories';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI Dev Info — Understand AI, Evaluate Tools, Build What Works',
  description:
    'Independent AI knowledge and discovery platform. Explore AI tools by category, learn through practical guides, and find resources for building AI applications, agents, RAG, and LLM integrations.',
  path: '/',
  keywords: [
    'AI tools directory',
    'AI guides',
    'evaluate AI tools',
    'AI application development',
    'RAG',
    'AI agents',
    'large language models',
    'AI automation',
  ],
});

export default async function HomePage() {
  const [trendingTools, categories] = await Promise.all([
    getFeaturedAiTools(6),
    getHomeCategoriesWithCounts(),
  ]);

  return (
    <>
      {/* Visual rhythm: dark → paper/tint stripes → dark lifecycle → paper/tint → dark CTA */}
      <HeroSection />
      <PillarsSection />
      <PopularCategoriesSection categories={categories} />
      <TrendingToolsSection tools={trendingTools} />
      <EvaluateToolsSection />
      <LearnTopicsSection />
      <LifecycleSection />
      <WhyAdevInfoSection />
      <LatestBlogSection />
      <ContactCtaSection />
    </>
  );
}
