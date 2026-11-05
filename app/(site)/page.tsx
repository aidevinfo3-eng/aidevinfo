import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/hero-section';
import { PillarsSection } from '@/components/home/pillars-section';
import { getFeaturedAiTools } from '@/lib/ai-tools';
import { getHomeCategoriesWithCounts } from '@/lib/tool-categories';
import { generateSEO } from '@/lib/seo';

const PopularCategoriesSection = dynamic(() =>
  import('@/components/home/popular-categories-section').then((m) => ({
    default: m.PopularCategoriesSection,
  }))
);
const TrendingToolsSection = dynamic(() =>
  import('@/components/home/trending-tools-section').then((m) => ({
    default: m.TrendingToolsSection,
  }))
);
const EvaluateToolsSection = dynamic(() =>
  import('@/components/home/evaluate-tools-section').then((m) => ({
    default: m.EvaluateToolsSection,
  }))
);
const LearnTopicsSection = dynamic(() =>
  import('@/components/home/learn-topics-section').then((m) => ({
    default: m.LearnTopicsSection,
  }))
);
const LifecycleSection = dynamic(() =>
  import('@/components/home/lifecycle-section').then((m) => ({
    default: m.LifecycleSection,
  }))
);
const WhyAdevInfoSection = dynamic(() =>
  import('@/components/home/why-adev-info-section').then((m) => ({
    default: m.WhyAdevInfoSection,
  }))
);
const ContactCtaSection = dynamic(() =>
  import('@/components/home/contact-cta-section').then((m) => ({
    default: m.ContactCtaSection,
  }))
);

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
      <HeroSection />
      <PillarsSection />
      <PopularCategoriesSection categories={categories} />
      <TrendingToolsSection tools={trendingTools} />
      <EvaluateToolsSection />
      <LearnTopicsSection />
      <LifecycleSection />
      <WhyAdevInfoSection />
      <ContactCtaSection />
    </>
  );
}
