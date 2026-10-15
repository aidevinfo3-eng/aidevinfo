import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { HomeSection, HOME_CARD_INSET } from '@/components/home/home-section';

const topics = [
  {
    title: 'AI agents',
    description:
      'How agents combine models, instructions, tools, and workflows to perform tasks.',
    href: '/blog/future-of-ai-agents',
  },
  {
    title: 'Retrieval-augmented generation (RAG)',
    description:
      'Connecting LLMs with documents, databases, and business knowledge.',
    href: '/blogs',
  },
  {
    title: 'Large language models (LLMs)',
    description:
      'What LLMs can do, where they help, and what to consider when building with them.',
    href: '/blog/understanding-large-language-models',
  },
  {
    title: 'AI automation',
    description:
      'Integrating AI into repetitive workflows, processes, and software systems.',
    href: '/blog/ai-automation-small-businesses',
  },
];

export function LearnTopicsSection() {
  return (
    <HomeSection band="paper">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Learn AI through practical guides"
          description="Practical explanations and implementation-focused resources for developers and technology teams."
          center={false}
          className="max-w-lg"
        />
        <Button asChild variant="outline" className="shrink-0 self-start group">
          <Link href="/blogs">
            Explore all guides
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link
            key={topic.title}
            href={topic.href}
            className={`${HOME_CARD_INSET} group block p-6`}
          >
            <h3 className="font-display text-xl text-foreground group-hover:text-primary">
              {topic.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {topic.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
              Read guides
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </HomeSection>
  );
}
