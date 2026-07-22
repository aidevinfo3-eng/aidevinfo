'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Bookmark,
  Check,
  X,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Globe,
  Monitor,
  Code2,
  Calendar,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { ServiceCard } from '@/components/shared/service-card';
import { ReviewCard } from '@/components/services/review-card';
import { PricingTable } from '@/components/services/pricing-table';
import { ScreenshotGallery } from '@/components/services/screenshot-gallery';
import { CTASection } from '@/components/shared/cta-section';
import { BlogCard } from '@/components/shared/blog-card';
import { getCategoryName } from '@/lib/categories';
import { AIService, BlogPost } from '@/lib/types';

export function ServiceDetail({
  service,
  relatedPosts,
  alternatives = [],
}: {
  service: AIService;
  relatedPosts: BlogPost[];
  alternatives?: AIService[];
}) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-muted/20">
      {/* Hero */}
      <section className="gradient-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
          <Breadcrumbs
            items={[
              { label: 'AI Tools', href: '/services' },
              { label: service.name },
            ]}
            className="mb-6"
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl gradient-primary text-2xl font-bold text-white shadow-glow">
                {service.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {getCategoryName(service.category)}
                  </Badge>
                  <Badge variant="outline" className="border-success/30 text-success">
                    {service.pricing}
                  </Badge>
                </div>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {service.name}
                </h1>
                <p className="mt-1 text-base text-muted-foreground">{service.tagline}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button asChild size="lg" className="gradient-primary text-white shadow-glow hover:opacity-90 group">
                <a href={service.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Official Website
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setBookmarked(!bookmarked)}
                className={bookmarked ? 'border-primary text-primary' : ''}
                aria-label="Bookmark"
              >
                <Bookmark className={bookmarked ? 'fill-primary' : ''} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="space-y-10">
            {/* Overview */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Overview</h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {service.longDescription}
              </p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Key Features</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="border-border/60 shadow-soft">
                      <CardContent className="flex items-start gap-3 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Check className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-foreground pt-1.5">{feature}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Pros & Cons</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Card className="border-success/20 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-success">
                      <ThumbsUp className="h-5 w-5" />
                      Pros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2.5">
                      {service.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-destructive/20 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                      <ThumbsDown className="h-5 w-5" />
                      Cons
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2.5">
                      {service.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-foreground/80">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Pricing Plans */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Pricing Plans</h2>
              <p className="mt-2 text-sm text-muted-foreground">Choose the plan that fits your needs.</p>
              <div className="mt-5">
                <PricingTable plans={service.pricingPlans} name={service.name} />
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Use Cases</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.useCases.map((useCase) => (
                  <Card key={useCase.title} className="border-border/60 shadow-soft">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground">{useCase.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Screenshots Gallery */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Screenshots</h2>
              <div className="mt-5">
                <ScreenshotGallery screenshots={service.screenshots} name={service.name} />
              </div>
            </section>

            {/* Alternatives */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Alternatives</h2>
              <p className="mt-2 text-sm text-muted-foreground">Similar AI tools you might want to consider.</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {alternatives.map((alt, index) => (
                  <ServiceCard key={alt.slug} service={alt} index={index} />
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">FAQ</h2>
              <div className="mt-5">
                <FaqAccordion faqs={service.faqs} />
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Reviews</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {service.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} index={index} />
                ))}
              </div>
            </section>

            {/* Related Blog Posts */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground">Related Articles</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {relatedPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <Card className="border-border/60 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <SidebarRow icon={Tag} label="Category" value={getCategoryName(service.category)} />
                <SidebarRow icon={Badge} label="Pricing" value={service.pricing} customIcon />
                <SidebarRow icon={Globe} label="Website" value={service.website.replace('https://', '')} href={service.website} />
                <SidebarRow icon={Monitor} label="Platform" value={service.platform.join(', ')} />
                <SidebarRow icon={Code2} label="API" value={service.apiAvailable ? 'Available' : 'Not available'} />
                <SidebarRow icon={Calendar} label="Last updated" value={new Date(service.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />

                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="mt-2 w-full gradient-primary text-white shadow-glow hover:opacity-90 group">
                  <a href={service.website} target="_blank" rel="noopener noreferrer">
                    Visit Official Website
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-14">
          <CTASection
            title="Ready to Explore More?"
            description="Discover more AI tools and services in our comprehensive directory."
            primaryLabel="Browse All Services"
            primaryHref="/services"
            secondaryLabel="Read Our Blog"
            secondaryHref="/blogs"
          />
        </div>
      </div>
    </div>
  );
}

function SidebarRow({
  icon: Icon,
  label,
  value,
  href,
  customIcon,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  customIcon?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-right font-medium text-primary hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-right font-medium text-foreground">{value}</span>
      )}
    </div>
  );
}
