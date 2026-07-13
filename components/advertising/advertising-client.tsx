'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Check,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/section-heading';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { CTASection } from '@/components/shared/cta-section';
import { cn } from '@/lib/utils';

const stats = [
  { icon: Users, label: 'Monthly Visitors', value: '150K+' },
  { icon: Eye, label: 'Page Views', value: '450K+' },
  { icon: MousePointerClick, label: 'Avg. CTR', value: '3.2%' },
  { icon: TrendingUp, label: 'Growth Rate', value: '25%/mo' },
];

const placements = [
  { name: 'Homepage Banner', description: 'Premium placement above the fold on our homepage.', price: '$500/week' },
  { name: 'Sidebar Ads', description: 'Persistent sidebar ad on all service and blog pages.', price: '$300/week' },
  { name: 'Sponsored Listing', description: 'Featured placement at the top of our AI services directory.', price: '$200/week' },
  { name: 'Newsletter Sponsorship', description: 'Dedicated section in our weekly newsletter to 25K+ subscribers.', price: '$400/issue' },
  { name: 'Blog Post Banner', description: 'Banner placement within relevant blog articles.', price: '$150/article' },
  { name: 'Category Sponsor', description: 'Exclusive branding on a category page in our directory.', price: '$600/week' },
];

const pricingPackages = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    description: 'Perfect for testing the waters',
    features: [
      '1 sponsored directory listing',
      'Sidebar banner (rotating)',
      '1 newsletter mention',
      'Basic analytics report',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$799',
    period: '/month',
    description: 'Best value for growing companies',
    features: [
      '3 sponsored directory listings',
      'Homepage banner (1 week/month)',
      '2 newsletter sponsorships',
      'Dedicated account manager',
      'Advanced analytics dashboard',
      'Priority support',
      'Custom ad creative',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'Tailored solutions for large scale',
    features: [
      'Unlimited sponsored listings',
      'Homepage banner (permanent)',
      'All newsletter sponsorships',
      'Category exclusivity',
      'Custom content partnerships',
      'Dedicated account team',
      'SLA guarantee',
      'Quarterly strategy reviews',
    ],
    highlighted: false,
  },
];

const benefits = [
  { icon: Target, title: 'Targeted Audience', description: 'Reach AI professionals, developers, and decision-makers actively looking for AI solutions.' },
  { icon: TrendingUp, title: 'High Engagement', description: 'Our audience is highly engaged with above-average time on site and interaction rates.' },
  { icon: Users, title: 'Quality Traffic', description: 'Get your brand in front of qualified leads who are researching AI tools and services.' },
  { icon: Star, title: 'Brand Authority', description: 'Associate your brand with a trusted AI resource that professionals rely on daily.' },
];

const advertisingFaqs = [
  { question: 'How do I get started with advertising?', answer: 'Simply contact us through our Contact page, select "Advertising" as the subject, and our team will reach out within 24 hours to discuss your goals and recommend the best package.' },
  { question: 'What ad formats do you support?', answer: 'We support banner ads (static and animated), sponsored content, newsletter placements, directory listings, and custom creative. All ads must meet our quality and content guidelines.' },
  { question: 'Can I target specific categories or audiences?', answer: 'Yes, we offer category-specific sponsorships and can target placements based on audience interests. Our Professional and Enterprise packages include advanced targeting options.' },
  { question: 'Do you provide analytics and reporting?', answer: 'Yes, all packages include analytics reporting. Professional and Enterprise plans include access to a real-time analytics dashboard with impressions, clicks, CTR, and conversion data.' },
  { question: 'What are your content guidelines for ads?', answer: 'Ads must be relevant to our AI-focused audience, non-deceptive, and comply with our content policy. We reserve the right to reject ads that don\'t meet our quality standards or are misleading.' },
  { question: 'Is there a minimum commitment period?', answer: 'The Starter package is month-to-month. Professional requires a 3-month minimum. Enterprise terms are customized. We offer discounts for longer commitments.' },
];

export function AdvertisingClient() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20">
          <Breadcrumbs items={[{ label: 'Advertising' }]} className="mb-6" />
          <div className="max-w-2xl">
            <Badge className="gradient-primary text-white border-0">
              <Megaphone className="mr-1.5 h-3.5 w-3.5" />
              Advertising Opportunities
            </Badge>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Reach the AI Community
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance">
              Put your AI tool or service in front of 150K+ monthly visitors — developers, marketers, and decision-makers actively searching for AI solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gradient-primary text-white shadow-glow hover:opacity-90 group">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-background hover:bg-muted">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="border-border/60 text-center shadow-soft">
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <p className="mt-3 font-display text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Advertise"
            title="Why Advertise with AI Dev Info"
            description="Our platform is trusted by AI professionals worldwide, making it the perfect place to promote your AI products."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-border/60 shadow-soft transition-all hover:shadow-card">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Placements */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Placements"
            title="Available Ad Placements"
            description="Choose from a variety of ad placements across our platform to maximize your reach."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {placements.map((placement, index) => (
              <motion.div
                key={placement.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="group h-full border-border/60 shadow-soft transition-all hover:shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground">{placement.name}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary whitespace-nowrap">
                        {placement.price}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{placement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="pricing" className="bg-muted/30 py-16 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Advertising Packages"
            description="Flexible pricing options for businesses of all sizes. All packages can be customized to your needs."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className={cn(
                  'relative h-full border shadow-card',
                  pkg.highlighted ? 'border-primary shadow-glow' : 'border-border/60'
                )}>
                  {pkg.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-white shadow-glow">
                      Most Popular
                    </span>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground">{pkg.period}</span>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={cn(
                        'mt-6 w-full',
                        pkg.highlighted ? 'gradient-primary text-white shadow-glow hover:opacity-90' : ''
                      )}
                      variant={pkg.highlighted ? 'default' : 'outline'}
                    >
                      <Link href="/contact">
                        {pkg.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Advertising FAQ"
            description="Common questions about advertising on AI Dev Info."
          />
          <div className="mt-10">
            <FaqAccordion faqs={advertisingFaqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTASection
            title="Ready to Promote Your AI Tool?"
            description="Get in touch with our team to discuss your advertising goals and create a custom campaign that delivers results."
            primaryLabel="Contact Us"
            primaryHref="/contact"
            secondaryLabel="View Services"
            secondaryHref="/services"
          />
        </div>
      </section>
    </div>
  );
}
