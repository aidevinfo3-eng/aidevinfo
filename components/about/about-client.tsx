import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Check,
  CircleDollarSign,
  Compass,
  GitCompare,
  Layers,
  Lightbulb,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { CTASection } from '@/components/shared/cta-section';
import { EmeraldGradientSection } from '@/components/shared/emerald-gradient-section';
import { EmeraldGlassCard } from '@/components/shared/emerald-glass-card';
import { ProcessStepGrid } from '@/components/shared/process-step-grid';
import { HomeSection, HOME_CARD_INSET } from '@/components/home/home-section';
import { cn } from '@/lib/utils';

export type AboutPageStats = {
  toolCount: number;
  articleCount: number;
  categoryCount: number;
};

type AboutClientProps = {
  stats: AboutPageStats;
};

const whatYouFind: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: Sparkles,
    title: 'AI development',
    description: 'Concepts, implementation notes, and services when you need hands-on help.',
    href: '/development-services',
  },
  {
    icon: Search,
    title: 'AI tools directory',
    description: 'Browse tools by category with practical details—not just feature marketing.',
    href: '/services',
  },
  {
    icon: BookOpen,
    title: 'Guides & articles',
    description: 'Explainers, comparisons, and how-tos written for builders and decision-makers.',
    href: '/blogs',
  },
  {
    icon: Bot,
    title: 'Agents & automation',
    description: 'Coverage of agents, workflows, and automation patterns as the space evolves.',
    href: '/blogs',
  },
  {
    icon: Brain,
    title: 'ML & LLM fundamentals',
    description: 'Core ideas behind models, retrieval, evaluation, and responsible use.',
    href: '/blogs',
  },
  {
    icon: Layers,
    title: 'Real-world applications',
    description: 'How teams apply AI across product, support, content, and operations.',
    href: '/services',
  },
];

const editorialSteps = [
  {
    title: 'Research',
    description: 'Start from primary sources, docs, and reputable references—not rumor or recycled listicles.',
  },
  {
    title: 'Verify',
    description: 'Check pricing, features, and claims against official pages, especially for fast-moving tools.',
  },
  {
    title: 'Explain',
    description: 'Write so someone can understand the idea and know when it applies to their work.',
  },
  {
    title: 'Add practical context',
    description: 'Include use cases, trade-offs, alternatives, and limitations—not only upside.',
  },
  {
    title: 'Review',
    description: 'Human editors refine structure, accuracy, and clarity before anything goes live.',
  },
];

const evaluationCriteria = [
  'Primary use case and who it is for',
  'Capabilities and notable limitations',
  'Pricing model and transparency',
  'Integrations, platforms, and API access where relevant',
  'Alternatives and when to choose something else',
  'Last reviewed or updated when we revisit a listing',
];

const standFor: {
  title: string;
  description: string;
  href?: string;
}[] = [
  {
    title: 'Accuracy over hype',
    description: 'We avoid exaggerated claims and vague “game-changing” language without evidence.',
  },
  {
    title: 'Original value over rewriting',
    description: 'Pages should help someone decide or learn—not republish the same bullet list as everyone else.',
  },
  {
    title: 'Transparency over unsupported claims',
    description: 'We cite sources where it matters and say when we have not verified something ourselves.',
  },
  {
    title: 'Clear commercial disclosure',
    description: 'Sponsored placements and affiliate relationships are labeled. See our advertising policy.',
    href: '/advertising-policy',
  },
];

const editorialChecks = [
  'Human review before publication',
  'Fact-checking on time-sensitive product details',
  'Updates when tools or pricing change materially',
  'Disclosure of sponsorship and paid placement',
];

const userJourney = [
  {
    icon: Compass,
    title: 'Discover',
    description: 'Find tools and topics through the directory, categories, and guides.',
  },
  {
    icon: Lightbulb,
    title: 'Understand',
    description: 'Read explainers that connect concepts to real constraints and workflows.',
  },
  {
    icon: GitCompare,
    title: 'Evaluate',
    description: 'Compare options using our framework—not hype or star ratings alone.',
  },
  {
    icon: Check,
    title: 'Apply',
    description: 'Move forward with clearer choices, or contact us about custom development.',
  },
];

const audiences = [
  {
    title: 'Developers',
    description: 'Integrating models, building agents, and shipping AI features responsibly.',
  },
  {
    title: 'Businesses & operators',
    description: 'Choosing tools, vendors, and workflows without drowning in noise.',
  },
  {
    title: 'Founders & product teams',
    description: 'Scoping MVPs, comparing stacks, and planning what to build vs buy.',
  },
  {
    title: 'AI learners',
    description: 'Building literacy from fundamentals through applied examples.',
  },
  {
    title: 'Technology professionals',
    description: 'Staying current without chasing every launch or trend piece.',
  },
];

const aboutFaqs = [
  {
    question: 'What is AI Dev Info?',
    answer:
      'AI Dev Info is an independent technology publication and directory. We help people discover AI tools, learn through guides and articles, and—when it fits—connect with development or advertising options on the site.',
  },
  {
    question: 'Do you develop custom AI solutions?',
    answer:
      'Yes, for selected projects. We work on chatbots, agents, RAG systems, integrations, and related software. See Development Services for scope, or contact us to discuss fit.',
  },
  {
    question: 'How do you list and review AI tools?',
    answer:
      'Listings focus on practical information: use case, capabilities, pricing, limitations, and alternatives. We verify details against official sources when we can and revisit pages when products change.',
  },
  {
    question: 'Do you use AI to write content?',
    answer:
      'AI may assist with research or drafting. Every piece is edited and reviewed by humans before publication—we do not publish unreviewed auto-generated pages.',
  },
  {
    question: 'Can I advertise on AI Dev Info?',
    answer:
      'Yes. We offer sponsored listings and advertising for AI products and services. Campaigns are labeled clearly for readers. Start from the Advertising page or contact us.',
  },
  {
    question: 'How often is content updated?',
    answer:
      'We add tools and articles as the ecosystem evolves and update existing pages when pricing, features, or positioning change in meaningful ways—not on a fixed “daily” schedule.',
  },
];

function StatLine({ stats }: { stats: AboutPageStats }) {
  const parts: string[] = [];
  if (stats.toolCount > 0) {
    parts.push(`${stats.toolCount} ${stats.toolCount === 1 ? 'tool' : 'tools'} listed`);
  }
  if (stats.articleCount > 0) {
    parts.push(`${stats.articleCount} ${stats.articleCount === 1 ? 'article' : 'articles'}`);
  }
  if (stats.categoryCount > 0) {
    parts.push(`${stats.categoryCount} ${stats.categoryCount === 1 ? 'category' : 'categories'}`);
  }
  if (parts.length === 0) return null;

  return (
    <p className="mt-6 text-sm text-white/55">
      {parts.join(' · ')} <span className="text-white/40">(live from our directory)</span>
    </p>
  );
}

function ContentCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn(HOME_CARD_INSET, 'p-6 sm:p-7', className)}>{children}</div>
  );
}

export function AboutClient({ stats }: AboutClientProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border bg-foreground">
        <PageHeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <Breadcrumbs items={[{ label: 'About' }]} tone="light" className="mb-6" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-300/90">
            About AI Dev Info
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-[2.75rem] text-balance">
            Practical AI knowledge for people who build, evaluate, and use AI
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            AI Dev Info is an independent platform for tool discovery, explainers, and
            implementation guidance. We focus on useful detail—so you can compare options,
            understand trade-offs, and move forward with clearer decisions.
          </p>
          <StatLine stats={stats} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white text-foreground hover:bg-white/90 group"
            >
              <Link href="/services">
                Explore AI tools
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-foreground"
            >
              <Link href="/blogs">Read guides</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rhythm: dark hero → paper / emerald bands → dark CTA */}
      <HomeSection band="paper">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="What we are"
                title="What is AI Dev Info?"
                center={false}
                className="max-w-none"
              />
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                A curated directory of AI tools, editorial guides, and optional development
                services—not a generic news feed or an affiliate list with no context. We
                publish information meant to help you evaluate products and understand how AI
                fits real work.
              </p>
            </div>
            <div>
              <SectionHeading
                eyebrow="Why we exist"
                title="Why we built it"
                center={false}
                className="max-w-none"
              />
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                AI moves quickly, and much of what gets published online is outdated, recycled,
                or written to rank—not to help. We built AI Dev Info to cut through that noise
                with structured listings, honest limitations, and explainers you can actually
                use when choosing tools or planning a project.
              </p>
            </div>
          </div>
      </HomeSection>

      <EmeraldGradientSection>
        <SectionHeading
          eyebrow="Editorial"
          title="How we create content"
          description="Our process is built for accuracy and usefulness—not volume for its own sake."
          center={false}
          tone="inverse"
          className="max-w-2xl"
        />
        <ProcessStepGrid
          columns={5}
          steps={editorialSteps.map((step, index) => ({
            step: String(index + 1).padStart(2, '0'),
            title: step.title,
            description: step.description,
          }))}
        />
      </EmeraldGradientSection>

      <HomeSection band="paper">
        <SectionHeading
          eyebrow="On the site"
          title={"What you'll find here"}
          description="Each area links to live sections of AI Dev Info—browse, read, or reach out when you need more."
          center={false}
          className="max-w-2xl"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whatYouFind.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                HOME_CARD_INSET,
                'group flex flex-col p-6 hover:border-foreground/25 sm:p-7'
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center border border-primary/15 bg-primary/5 text-primary">
                <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Explore
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </HomeSection>

      <EmeraldGradientSection id="tool-evaluation" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Directory"
              title="How we evaluate AI tools"
              description="AI tools change fast. Our goal is useful information that helps you decide—not to recommend every product on the market."
              center={false}
              tone="inverse"
              className="max-w-none"
            />
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: GitCompare,
                  title: 'Beyond feature lists',
                  text: 'Capabilities, use cases, pricing, and limitations—not marketing copy alone.',
                },
                {
                  icon: CircleDollarSign,
                  title: 'Fit for real work',
                  text: 'Alternatives and practical fit for development, business, and creative workflows.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Checked when we can',
                  text: 'Important details verified against official sources as products change.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald-400/25 bg-emerald-500/10 text-emerald-200">
                    <item.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div>
                    <p className="font-display text-white/95">{item.title}</p>
                    <p className="mt-1 text-sm text-white/60">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="mt-8 h-12 border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-foreground group"
            >
              <Link href="/services">
                Browse the directory
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-7">
            <EmeraldGlassCard className="p-6 sm:p-8">
              <h3 className="font-display text-xl text-white/95">Tool evaluation framework</h3>
              <p className="mt-2 text-sm text-white/60">
                When we write or update a listing, we aim to cover:
              </p>
              <ul className="mt-6 space-y-3">
                {evaluationCriteria.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/65">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </EmeraldGlassCard>
          </div>
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Principles"
              title="What we stand for"
              center={false}
              className="max-w-none"
            />
            <ul className="mt-8 space-y-4">
              {standFor.map((item) => (
                <li key={item.title} className="border-l-2 border-primary/30 pl-5">
                  <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                    {item.href ? (
                      <>
                        {' '}
                        <Link href={item.href} className="text-primary underline-offset-4 hover:underline">
                          Read the policy
                        </Link>
                        .
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ContentCard>
            <SectionHeading
              eyebrow="Trust"
              title="Transparent. Responsible. Human-reviewed."
              center={false}
              className="max-w-none"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              AI may assist with research or early drafts, but we do not publish unreviewed
              content. Editors check claims, structure, and clarity before a page goes live.
            </p>
            <ul className="mt-6 space-y-2">
              {editorialChecks.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </ContentCard>
        </div>
      </HomeSection>

      <EmeraldGradientSection>
        <SectionHeading
          eyebrow="Your path"
          title="How readers use AI Dev Info"
          description="From first search to a concrete next step—without forcing you through a sales funnel."
          center={false}
          tone="inverse"
          className="max-w-2xl"
        />
        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent lg:block"
            aria-hidden
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {userJourney.map((step) => (
              <EmeraldGlassCard key={step.title} className="p-6 sm:p-7">
                <step.icon className="h-5 w-5 text-emerald-300" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-3 font-display text-lg text-white/95">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </EmeraldGlassCard>
            ))}
          </div>
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper">
          <SectionHeading
            eyebrow="Audience"
            title="Who we serve"
            center={false}
            className="max-w-2xl"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item) => (
              <ContentCard key={item.title}>
                <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </ContentCard>
            ))}
          </div>

          <ContentCard className="mt-14 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
              Mission
            </p>
            <p className="mt-3 font-display text-2xl text-foreground sm:text-3xl text-balance">
              Make AI easier to evaluate and apply—with honest information, not hype.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              We are a small editorial and development team. If you spot an error, have feedback,
              or want to discuss a project, we would rather hear from you than add another thin
              page to the internet.
            </p>
          </ContentCard>
      </HomeSection>

      <EmeraldGradientSection>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <blockquote className="lg:col-span-7">
            <p className="font-display text-2xl leading-snug text-white/95 sm:text-3xl text-balance">
              Don&apos;t add AI information just to add pages. Add information that helps
              someone make a better decision, understand a difficult concept, or accomplish
              something useful.
            </p>
          </blockquote>
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Feedback"
              title="We value your input"
              description="Corrections, suggestions, and partnership inquiries are welcome."
              center={false}
              tone="inverse"
              className="max-w-none"
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-white text-foreground hover:bg-white/90 group"
              >
                <Link href="/contact">
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
                  Contact us
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-foreground"
              >
                <Link href="/advertise">Advertising</Link>
              </Button>
            </div>
          </div>
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Quick answers about how AI Dev Info works."
          />
          <div className="mt-10 mx-auto max-w-3xl">
            <FaqAccordion faqs={aboutFaqs} />
          </div>
      </HomeSection>

      <CTASection
        title="Explore tools, read guides, or get in touch"
        description="Browse the directory at your own pace, learn from our articles, or contact us if you need help scoping an AI project."
        primaryLabel="Explore AI tools"
        primaryHref="/services"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </div>
  );
}
