'use client';

import Link from 'next/link';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { CTASection } from '@/components/shared/cta-section';
import { EmeraldGradientSection } from '@/components/shared/emerald-gradient-section';
import { EmeraldGlassCard } from '@/components/shared/emerald-glass-card';
import { EmeraldBandButton } from '@/components/shared/emerald-band-button';
import { HomeSection, HOME_CARD_INSET } from '@/components/home/home-section';
import {
  ADVERTISE_CONTACT_EMAIL,
  advertiseContactHref,
  advertiseFaqs,
  advertisingFormats,
  advertisingPackages,
  campaignReportingBullets,
  contactIncludeList,
  formatComparisonRows,
  sponsoredContentPrinciples,
  whoCanAdvertiseCategories,
  whyAdvertisePoints,
  whyBrandsChoose,
} from '@/lib/advertising-page-content';
import { cn } from '@/lib/utils';

export function AdvertiseClient() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border bg-foreground">
        <PageHeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <Breadcrumbs items={[{ label: 'Advertise' }]} tone="light" className="mb-6" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-300/90">
            Advertising
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-[2.75rem] text-balance">
            Advertise on AI Dev Info
          </h1>
          <p className="mt-3 max-w-3xl font-display text-xl text-white/85 sm:text-2xl text-balance">
            Reach the People Building, Buying, and Exploring AI
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            Put your AI product in front of developers, founders, technology teams, businesses,
            marketers, and AI enthusiasts actively researching AI tools, technologies, automation,
            workflows, and development solutions.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-base">
            AI Dev Info combines an AI tools directory, practical technology content, tutorials, and
            AI development resources to help people discover, evaluate, and understand AI products.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white text-foreground hover:bg-white/90 group"
            >
              <Link href={advertiseContactHref('AI tool listing')}>
                Submit Your AI Tool
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-foreground"
            >
              <Link href={advertiseContactHref('Sponsorship')}>Discuss a Sponsorship</Link>
            </Button>
          </div>
        </div>
      </section>

      <HomeSection band="paper">
        <SectionHeading
          title="Why Advertise With AI Dev Info?"
          description="AI buyers need more than another advertisement. They want to understand what a product does, who it is for, how it compares with alternatives, and whether it can solve a real problem. AI Dev Info gives brands opportunities to reach users throughout that discovery journey."
          center={false}
          className="max-w-3xl"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyAdvertisePoints.map((item) => (
            <div key={item.title} className={cn(HOME_CARD_INSET, 'p-6 sm:p-7')}>
              <h3 className="font-display text-lg text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </HomeSection>

      <HomeSection band="paper" className="scroll-mt-20" id="formats">
        <SectionHeading
          title="Advertising & Partnership Opportunities"
          description="Choose an advertising format based on your product, audience, and campaign objective."
          center={false}
          className="max-w-2xl"
        />
        <div className="mt-12 space-y-10">
          {advertisingFormats.map((format) => (
            <article
              key={format.id}
              id={format.id}
              className={cn(HOME_CARD_INSET, 'scroll-mt-24 p-6 sm:p-8')}
            >
              <h3 className="font-display text-2xl text-foreground">{format.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{format.intro}</p>
              <p className="mt-5 text-sm font-medium text-foreground">
                {format.title.includes('Listing')
                  ? 'Your Listing Can Include:'
                  : format.title.includes('Featured')
                    ? 'Featured products may appear in:'
                    : format.title.includes('Article')
                      ? 'A sponsored article can cover:'
                      : format.title.includes('Feature')
                        ? 'What We Can Evaluate'
                        : format.title.includes('Tutorial')
                          ? 'Examples include:'
                          : format.title.includes('Newsletter')
                            ? 'Potential formats include:'
                            : 'Potential partnership formats include:'}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {format.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
              {format.footnote ? (
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{format.footnote}</p>
              ) : null}
              <Button asChild className="mt-6 group">
                <Link href={advertiseContactHref(format.contactHint)}>
                  {format.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </HomeSection>

      <EmeraldGradientSection>
        <SectionHeading
          title="Choose the Right AI Advertising Format"
          center={false}
          tone="inverse"
          className="max-w-2xl"
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/20 text-white/80">
                <th className="py-3 pr-4 font-medium">Advertising Format</th>
                <th className="py-3 pr-4 font-medium">Best For</th>
                <th className="py-3 font-medium">Primary Goal</th>
              </tr>
            </thead>
            <tbody>
              {formatComparisonRows.map((row) => (
                <tr key={row.format} className="border-b border-white/10 text-white/65">
                  <td className="py-3 pr-4 font-display text-white/90">{row.format}</td>
                  <td className="py-3 pr-4">{row.bestFor}</td>
                  <td className="py-3">{row.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper">
        <SectionHeading
          title="Why Brands Choose AI Dev Info"
          description="AI Dev Info is built around AI discovery, education, and practical technology information. Instead of placing your product beside unrelated advertising, campaigns can be integrated into an environment where users are actively researching AI solutions."
          center={false}
          className="max-w-3xl"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {whyBrandsChoose.map((item) => (
            <div key={item.title} className={cn(HOME_CARD_INSET, 'p-6 sm:p-7')}>
              <h3 className="font-display text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </HomeSection>

      <EmeraldGradientSection>
        <SectionHeading
          title="Our Approach to Sponsored Content"
          description="Advertising should never reduce the quality of the information readers come to AI Dev Info to find. Our sponsored partnerships follow clear editorial principles."
          center={false}
          tone="inverse"
          className="max-w-3xl"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsoredContentPrinciples.map((item) => (
            <EmeraldGlassCard key={item.title} className="p-6 sm:p-7">
              <h3 className="font-display text-lg text-white/95">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
            </EmeraldGlassCard>
          ))}
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper">
        <SectionHeading
          title="Who Can Advertise on AI Dev Info?"
          description="AI Dev Info is a strong fit for products and services serving AI, software development, automation, productivity, business, and technology audiences."
          center={false}
          className="max-w-3xl"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whoCanAdvertiseCategories.map((cat) => (
            <div key={cat.title} className={cn(HOME_CARD_INSET, 'p-6 sm:p-7')}>
              <h3 className="font-display text-lg text-foreground">{cat.title}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </HomeSection>

      <EmeraldGradientSection>
        <SectionHeading
          title="What Makes a Strong AI Advertising Campaign?"
          description="The strongest campaigns do more than promote a product. They answer a real question or help users solve a real problem."
          center={false}
          tone="inverse"
          className="max-w-3xl"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <EmeraldGlassCard className="p-6 sm:p-8">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              A weak approach
            </h3>
            <p className="mt-4 font-display text-xl leading-snug text-white/80">
              &ldquo;Our AI platform is the best AI solution. Try it today.&rdquo;
            </p>
          </EmeraldGlassCard>
          <EmeraldGlassCard className="border-emerald-400/20 p-6 sm:p-8">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200/80">
              A better approach
            </h3>
            <p className="mt-4 font-display text-xl leading-snug text-white/95">
              &ldquo;How can a 20-person support team automate repetitive customer questions while
              keeping human agents involved in complex cases?&rdquo;
            </p>
            <p className="mt-4 text-sm text-white/60">
              The second approach starts with a genuine user problem and makes the product part of a
              useful solution.
            </p>
          </EmeraldGlassCard>
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper" id="pricing" className="scroll-mt-24">
        <SectionHeading
          title="Flexible AI Advertising Packages"
          description="Choose a campaign that fits your objectives, budget, and audience."
          center={false}
          className="max-w-2xl"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {advertisingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={cn(
                HOME_CARD_INSET,
                'relative flex h-full flex-col p-7',
                pkg.highlighted && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
              )}
            >
              {pkg.highlighted ? (
                <span className="absolute -top-3 left-6 bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                  Popular
                </span>
              ) : null}
              <h3 className="font-display text-2xl text-foreground">{pkg.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Typical formats
              </p>
              <ul className="mt-3 flex-1 space-y-2">
                {pkg.formats.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full" variant={pkg.highlighted ? 'default' : 'outline'}>
                <Link href={advertiseContactHref(pkg.name === 'Custom' ? 'Custom partnership' : 'Pricing request')}>
                  {pkg.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className={cn(HOME_CARD_INSET, 'mt-14 p-6 sm:p-8')}>
          <h3 className="font-display text-xl text-foreground">Campaign Reporting</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            For campaigns where tracking is available, reporting may include relevant performance
            metrics such as:
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {campaignReportingBullets.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Available reporting depends on the advertising format and tracking setup. We do not
            guarantee a specific number of impressions, clicks, leads, conversions, or sales unless
            a specific campaign agreement explicitly states otherwise.
          </p>
        </div>
      </HomeSection>

      <EmeraldGradientSection>
        <SectionHeading
          title="Our Editorial Standards"
          description="AI Dev Info is building a technology resource focused on helping people understand and evaluate AI. Advertising relationships do not automatically determine editorial conclusions. Products and submissions may be reviewed, edited, rejected, updated, or removed when necessary to maintain relevance, accuracy, quality, and policy compliance."
          center={false}
          tone="inverse"
          className="max-w-3xl"
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <EmeraldBandButton asChild>
            <Link href="/advertising-policy">View Advertising Policy</Link>
          </EmeraldBandButton>
          <EmeraldBandButton asChild>
            <Link href="/about">View editorial standards on About</Link>
          </EmeraldBandButton>
        </div>
      </EmeraldGradientSection>

      <HomeSection band="paper">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions About Advertising"
          center={false}
        />
        <div className="mt-10 mx-auto max-w-3xl">
          <FaqAccordion faqs={advertiseFaqs} />
        </div>
      </HomeSection>

      <HomeSection band="paper">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              title="Ready to Reach an AI-Focused Audience?"
              description="Tell us about your product, target audience, campaign objective, and preferred advertising format. We'll review your request and recommend the most appropriate advertising or partnership option."
              center={false}
              className="max-w-none"
            />
            <Button asChild size="lg" className="mt-8 group">
              <Link href={advertiseContactHref('Advertising conversation')}>
                Start an Advertising Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <div className={cn(HOME_CARD_INSET, 'p-6 sm:p-8 lg:col-span-5')}>
            <h3 className="font-display text-xl text-foreground">Advertising Contact</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Email:{' '}
              <a
                href={`mailto:${ADVERTISE_CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {ADVERTISE_CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-5 text-sm font-medium text-foreground">Please include:</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {contactIncludeList.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </HomeSection>

      <CTASection
        title="Explore tools, read guides, or start a campaign"
        description="Browse AI Dev Info as a reader—or contact us to discuss listings, featured placements, and sponsored content."
        primaryLabel="Contact us"
        primaryHref="/contact"
        secondaryLabel="View packages"
        secondaryHref="#pricing"
      />
    </div>
  );
}
