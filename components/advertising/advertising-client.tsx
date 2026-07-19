'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { CTASection } from '@/components/shared/cta-section';
import { cn } from '@/lib/utils';

const trustPoints = [
  'AI-Focused Audience',
  'High-Quality Traffic',
  'Sponsored Listings',
  'Banner Advertising',
  'Content Marketing',
  'Verified AI Community',
];

const trustedLogos = [
  'OpenAI',
  'Anthropic',
  'Google AI',
  'Microsoft',
  'NVIDIA',
  'Hugging Face',
  'Cohere',
  'Mistral AI',
];

const performance = [
  { value: '150K+', label: 'Monthly Visitors', desc: 'Qualified professionals exploring AI tools and services every month.' },
  { value: '450K+', label: 'Monthly Page Views', desc: 'Consistent growth across blog articles, AI directories, and comparison pages.' },
  { value: '3.2%', label: 'Average CTR', desc: 'Higher-than-average click-through rates for sponsored placements.' },
  { value: '25%', label: 'Monthly Growth', desc: 'Growing organic traffic driven by SEO, content marketing, and AI trends.' },
  { value: '9 Min', label: 'Avg. Session Duration', desc: 'Visitors spend more time researching AI solutions before making decisions.' },
  { value: '68%', label: 'Returning Visitors', desc: 'A loyal audience that comes back regularly for AI news and recommendations.' },
];

const whoCanAdvertise = [
  { title: 'AI Tools', desc: 'Showcase productivity, writing, coding, image, video, or automation tools.' },
  { title: 'AI SaaS Platforms', desc: 'Promote cloud-based AI software and business solutions.' },
  { title: 'AI Chatbots', desc: 'Customer support, sales, internal assistants, and conversational AI.' },
  { title: 'AI Automation', desc: 'Workflow automation, AI agents, RPA, and integrations.' },
  { title: 'AI Development Agencies', desc: 'Promote custom AI development services and consulting.' },
  { title: 'AI APIs', desc: 'Reach developers looking for AI APIs and infrastructure.' },
  { title: 'AI Courses & Training', desc: 'Promote online courses, certifications, and educational platforms.' },
  { title: 'AI Image & Design Tools', desc: 'Generate more visibility for creative AI platforms.' },
  { title: 'AI Video Platforms', desc: 'Reach creators, editors, and production teams.' },
  { title: 'Voice AI Solutions', desc: 'Speech-to-text, voice cloning, TTS, and conversational voice products.' },
];

const whyAdvertise = [
  { title: 'Targeted AI Audience', desc: 'Reach developers, founders, marketers, researchers, and business owners interested in AI.' },
  { title: 'High Engagement', desc: 'Our readers spend more time exploring AI products, tutorials, and services.' },
  { title: 'Verified Traffic', desc: 'Organic, AI-focused visitors with genuine purchase intent.' },
  { title: 'Brand Authority', desc: 'Build trust through sponsored listings, expert content, and featured placements.' },
  { title: 'SEO Benefits', desc: 'Sponsored articles help improve online visibility through relevant internal linking.' },
  { title: 'Flexible Campaigns', desc: 'Choose advertising packages tailored to your marketing goals and budget.' },
];

const solutions = [
  { title: 'Homepage Hero Banner', desc: 'Appear at the top of the homepage and reach thousands of visitors daily.' },
  { title: 'Sponsored AI Tool Listing', desc: 'Get premium placement inside the AI Services and AI Tools directory.' },
  { title: 'Sponsored Blog Article', desc: 'Publish educational content promoting your AI product while improving SEO visibility.' },
  { title: 'Newsletter Sponsorship', desc: 'Reach subscribers directly through our weekly AI newsletter.' },
  { title: 'Sidebar Display Ads', desc: 'Display banner ads across blogs, AI service pages, and category pages.' },
  { title: 'Category Sponsorship', desc: 'Own an entire AI category page with exclusive branding and featured placements.' },
];

const placements = [
  'Homepage Hero Banner',
  'Homepage Featured Section',
  'AI Services Directory',
  'Blog Sidebar Banner',
  'Sponsored Blog Article',
  'Newsletter Placement',
  'Category Page Banner',
  'Footer Banner',
  'Popup Campaign',
  'Sticky Sidebar',
];

const roles = [
  { label: 'Developers', value: '38%' },
  { label: 'Business Owners', value: '22%' },
  { label: 'Digital Marketers', value: '18%' },
  { label: 'Founders', value: '12%' },
  { label: 'Students', value: '6%' },
  { label: 'Researchers', value: '4%' },
];

const countries = [
  { label: 'United States', value: '28%' },
  { label: 'United Kingdom', value: '18%' },
  { label: 'India', value: '15%' },
  { label: 'Canada', value: '10%' },
  { label: 'Germany', value: '8%' },
  { label: 'Others', value: '21%' },
];

const industries = [
  { label: 'Technology & Software', value: '32%' },
  { label: 'Education', value: '18%' },
  { label: 'Healthcare', value: '14%' },
  { label: 'Finance', value: '12%' },
  { label: 'Marketing', value: '10%' },
  { label: 'Others', value: '14%' },
];

const successStories = [
  { title: 'AI Startup', result: 'Increased website traffic by 320% after running a featured homepage campaign.' },
  { title: 'AI SaaS Platform', result: 'Generated over 1,450 qualified leads through sponsored articles and newsletter campaigns.' },
  { title: 'AI Development Agency', result: 'Achieved 210% more demo requests with premium directory listings and category sponsorship.' },
];

const packages = [
  {
    name: 'Starter',
    price: '$299',
    period: '/ Month',
    tagline: 'Perfect for Small Businesses',
    features: [
      '1 Sponsored Listing',
      'Sidebar Banner',
      'Newsletter Mention',
      'Basic Analytics Report',
      'Email Support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$799',
    period: '/ Month',
    tagline: 'Best for Growing Companies',
    features: [
      '3 Sponsored Listings',
      'Homepage Hero Banner',
      'Sponsored Blog Article',
      'Newsletter Feature',
      'Dedicated Account Manager',
      'Monthly Analytics Report',
      'Priority Support',
    ],
    cta: 'Start Campaign',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Pricing',
    tagline: 'Tailored for Large Brands',
    features: [
      'Unlimited Campaigns',
      'Homepage Takeover',
      'Sponsored Content Series',
      'Dedicated Landing Page',
      'Quarterly Strategy Calls',
      'Premium Account Manager',
      'Custom Reporting',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const steps = [
  'Choose Your Advertising Package',
  'Submit Your Brand Assets',
  'Campaign Review & Approval',
  'Campaign Goes Live',
  'Receive Performance Reports & Optimization',
];

const testimonials = [
  {
    quote:
      'We generated over 600 qualified leads within two months of advertising on AI Dev Info. The audience quality exceeded our expectations.',
    name: 'David Kim',
    role: 'CMO, AI SaaS Company',
  },
  {
    quote:
      'The sponsored article ranked well in search engines and brought long-term organic traffic. Excellent ROI.',
    name: 'Sarah Chen',
    role: 'Founder, AI Startup',
  },
  {
    quote:
      'Our homepage banner campaign significantly increased product visibility and demo requests.',
    name: 'Michael Rodriguez',
    role: 'Growth Manager, AI Platform',
  },
];

const advertisingFaqs = [
  {
    question: 'How do I advertise on AI Dev Info?',
    answer:
      'Choose a package, submit your campaign details, and our team will help launch your advertisement.',
  },
  {
    question: 'What advertising formats do you support?',
    answer:
      'Homepage banners, sponsored listings, sponsored blog posts, newsletters, sidebar banners, category sponsorships, and custom campaigns.',
  },
  {
    question: 'Can I advertise AI services?',
    answer:
      'Yes. AI development companies, agencies, SaaS products, APIs, startups, and educational platforms are all welcome.',
  },
  {
    question: 'Do you provide campaign reports?',
    answer:
      'Yes. Every advertising campaign includes detailed analytics and performance reporting.',
  },
  {
    question: 'Can I target specific categories?',
    answer:
      'Yes. You can advertise within specific AI categories such as AI Chatbots, AI Automation, AI Coding, AI Image Generation, and more.',
  },
  {
    question: 'Do you offer custom advertising packages?',
    answer:
      'Absolutely. We can create tailored advertising campaigns based on your marketing goals and budget.',
  },
];

export function AdvertisingClient() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumbs items={[{ label: 'Advertising' }]} className="mb-6" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            Grow Your AI Business
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Reach Thousands of AI Buyers Every Month
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Promote your AI tools, SaaS products, AI development services, APIs, AI
            startups, and technology brands to a highly targeted audience of developers,
            founders, marketers, business owners, and decision-makers actively searching
            for AI solutions.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
            {trustPoints.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get started today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Download media kit</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#pricing">View pricing</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-b border-border py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by Innovative AI Companies
          </p>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
            AI startups, SaaS businesses, developers, and technology brands trust AI Dev
            Info to promote their products and connect with the right audience.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {trustedLogos.map((name) => (
              <span key={name} className="font-display text-xl text-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Results"
            title="Platform Performance"
            description="Real audience. Real engagement. Real business growth."
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {performance.map((item) => (
              <div key={item.label} className="border border-border p-6">
                <p className="font-display text-3xl text-foreground">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who can advertise */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Audience Fit"
            title="Who Can Advertise on AI Dev Info?"
            description="Whether you're launching a new AI startup or promoting an established platform, AI Dev Info helps you reach the right audience."
            center={false}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {whoCanAdvertise.map((item) => (
              <div key={item.title} className="border border-border bg-background p-5">
                <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why advertise */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Us"
            title="Why Choose AI Dev Info?"
            description="We connect your AI brand with professionals actively searching for solutions."
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyAdvertise.map((item, i) => (
              <div key={item.title} className="border border-border p-6">
                <p className="text-[11px] font-medium tabular-nums text-primary">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Solutions"
            title="Choose the Right Promotion for Your Brand"
            description="Select from multiple advertising options designed to maximize your visibility and lead generation."
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item) => (
              <div key={item.title} className="border border-border bg-background p-6">
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Inventory"
            title="Available Advertising Placements"
            description="Preview where your advertisements will appear across AI Dev Info."
            center={false}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {placements.map((item) => (
              <span
                key={item}
                className="border border-border px-4 py-2 text-sm text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Demographics */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Audience"
            title="Know Your Audience"
            center={false}
          />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              { title: 'Visitor Roles', data: roles },
              { title: 'Top Countries', data: countries },
              { title: 'Industries', data: industries },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-xl text-foreground">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.data.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between border-b border-border pb-2 text-sm"
                    >
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium text-foreground">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Advertising Success Stories" center={false} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {successStories.map((story) => (
              <div key={story.title} className="border border-border p-6">
                <h3 className="font-display text-xl text-foreground">{story.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {story.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Advertising Packages"
            description="Flexible options for every stage — from startups to enterprise brands."
            center={false}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={cn(
                  'relative flex h-full flex-col border bg-background p-7',
                  pkg.highlighted ? 'border-primary' : 'border-border'
                )}
              >
                {pkg.highlighted && (
                  <span className="absolute -top-3 left-6 bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {pkg.tagline}
                </p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{pkg.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl text-foreground">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">{pkg.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={pkg.highlighted ? 'default' : 'outline'}
                >
                  <Link href="/contact">{pkg.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Launch Your Campaign in 5 Simple Steps"
            center={false}
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li key={step} className="border border-border p-5">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  Step {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 font-display text-lg text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Our Advertising Partners Say" center={false} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="border border-border bg-background p-6">
                <p className="font-display text-lg leading-relaxed text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            center={false}
          />
          <div className="mt-10">
            <FaqAccordion faqs={advertisingFaqs} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTASection
            title="Ready to Promote Your AI Business?"
            description="Reach a highly engaged audience of AI professionals, developers, founders, marketers, and decision-makers. Let's create an advertising campaign that delivers real results."
            primaryLabel="Book a Free Consultation"
            primaryHref="/contact"
            secondaryLabel="Download Media Kit"
            secondaryHref="/contact"
          />
        </div>
      </section>
    </div>
  );
}
