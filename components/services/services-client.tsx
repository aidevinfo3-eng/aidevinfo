'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { aiServices, getFeaturedServices } from '@/lib/services';
import { categories } from '@/lib/categories';
import { ServiceCard } from '@/components/shared/service-card';
import { SearchBar } from '@/components/shared/search-bar';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Featured' },
];

const sortValues = new Set(sortOptions.map((o) => o.value));
const pricingOptions = ['All', 'Free', 'Freemium', 'Paid', 'Custom Pricing'];

const popularCategories = [
  { name: 'AI Chatbot Development', count: '850+', slug: 'ai-chatbots' },
  { name: 'AI Agent Development', count: '650+', slug: 'automation' },
  { name: 'AI Automation Services', count: '750+', slug: 'automation' },
  { name: 'LLM Integration', count: '620+', slug: 'ai-coding' },
  { name: 'AI SaaS Development', count: '540+', slug: 'business-ai' },
  { name: 'AI Consulting', count: '420+', slug: 'business-ai' },
  { name: 'Machine Learning', count: '670+', slug: 'ai-coding' },
  { name: 'Computer Vision', count: '380+', slug: 'image-generation' },
  { name: 'Natural Language Processing', count: '560+', slug: 'ai-writing' },
  { name: 'AI Voice Solutions', count: '330+', slug: 'voice-ai' },
  { name: 'AI Image Generation', count: '710+', slug: 'image-generation' },
  { name: 'AI Video Generation', count: '450+', slug: 'video-generation' },
];

const trustFeatures = [
  {
    title: 'Verified Companies',
    description:
      'Every listed company is manually reviewed and verified by our editorial team.',
  },
  {
    title: 'Real Reviews',
    description: 'Read authentic reviews and ratings submitted by verified users.',
  },
  {
    title: 'Updated Daily',
    description: 'New AI services and listings are reviewed and updated every day.',
  },
  {
    title: 'Trusted Platform',
    description:
      'A reliable AI directory trusted by businesses, startups, and developers worldwide.',
  },
  {
    title: 'Sponsored Listings',
    description: 'Promote your AI company or product to thousands of targeted visitors.',
  },
  {
    title: 'AI Development Experts',
    description:
      'Connect with experienced AI developers specializing in custom AI solutions.',
  },
];

const clientLogos = [
  'Google',
  'Microsoft',
  'Amazon',
  'Adobe',
  'HubSpot',
  'Notion',
  'Slack',
  'Shopify',
];

function ServicesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemsPerPage = 9;

  const searchFromUrl = searchParams.get('q') ?? '';
  const [search, setSearch] = useState(searchFromUrl);
  const sortParam = searchParams.get('sort') ?? 'popular';
  const sort = sortValues.has(sortParam) ? sortParam : 'popular';
  const pricingParam = searchParams.get('pricing') ?? 'All';
  const pricing = pricingOptions.includes(pricingParam) ? pricingParam : 'All';
  const categorySlug = searchParams.get('category');
  const category =
    categories.find((c) => c.slug === categorySlug)?.name ?? 'All';
  const pageParam = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const featured = getFeaturedServices().slice(0, 4);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>, opts?: { resetPage?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (!value) params.delete(key);
        else params.set(key, value);
      }
      if (opts?.resetPage !== false) {
        params.delete('page');
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const next = search.trim();
      if (next === searchFromUrl) return;
      updateParams({ q: next || null });
    }, 350);
    return () => clearTimeout(timeout);
  }, [search, searchFromUrl, updateParams]);

  const filtered = useMemo(() => {
    let result = aiServices.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        category === 'All' ||
        s.category === categories.find((c) => c.name === category)?.slug;
      const matchesPricing =
        pricing === 'All' ||
        s.pricing.toLowerCase() === pricing.toLowerCase() ||
        (pricing === 'Custom Pricing' && s.pricing.toLowerCase().includes('custom'));
      return matchesSearch && matchesCategory && matchesPricing;
    });

    if (sort === 'popular') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === 'newest') {
      result = [...result].sort(
        (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
    } else if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'featured') {
      result = [...result].sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating
      );
    }

    return result;
  }, [search, category, pricing, sort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const currentItems = filtered.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  useEffect(() => {
    if (safePage !== currentPage) {
      updateParams({ page: safePage > 1 ? String(safePage) : null }, { resetPage: false });
    }
  }, [safePage, currentPage, updateParams]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumbs items={[{ label: 'AI Services' }]} className="mb-6" />

          <h1 className="max-w-3xl font-display text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Find the Best AI Services for Every Business Need
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Discover verified AI development companies, AI automation agencies,
            chatbot developers, LLM experts, and AI consulting firms — all in one
            place. Compare services, explore verified providers, and choose the
            right AI solution for your business with confidence.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
            {[
              '5,000+ Verified AI Services',
              '150+ AI Categories',
              'Updated Daily',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search AI services by name, description, or tags..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={category}
                onValueChange={(value) => {
                  const slug =
                    value === 'All'
                      ? null
                      : categories.find((c) => c.name === value)?.slug ?? null;
                  updateParams({ category: slug });
                }}
              >
                <SelectTrigger className="w-[160px] rounded-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={pricing}
                onValueChange={(value) =>
                  updateParams({ pricing: value === 'All' ? null : value })
                }
              >
                <SelectTrigger className="w-[140px] rounded-sm">
                  <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                  {pricingOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt === 'All' ? 'All Pricing' : opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={sort}
                onValueChange={(value) =>
                  updateParams({ sort: value === 'popular' ? null : value })
                }
              >
                <SelectTrigger className="w-[150px] rounded-sm">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
            {[
              { value: '5,000+', label: 'AI Services' },
              { value: '150+', label: 'Categories' },
              { value: '200K+', label: 'Monthly Visitors' },
              { value: '1,000+', label: 'Verified Companies' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured"
              title="Featured AI Services"
              description="Hand-picked AI companies and service providers recommended by our experts based on quality, reliability, customer reviews, and innovation."
              center={false}
              className="max-w-xl"
            />
            <Button asChild variant="outline" className="shrink-0 self-start group">
              <Link href="/services?sort=featured#directory">
                View all featured
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular categories */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Browse"
            title="Popular Categories"
            description="Browse AI services by category to find the perfect solution for your business requirements."
            center={false}
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {popularCategories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  updateParams({ category: cat.slug });
                  document
                    .getElementById('directory')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex flex-col justify-between border border-border bg-background p-5 text-left transition-colors hover:border-foreground/25 hover:bg-muted/40"
              >
                <h3 className="font-display text-lg text-foreground transition-colors group-hover:text-primary">
                  {cat.name}
                </h3>
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {cat.count} services
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Directory grid */}
      <section id="directory" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Directory"
            title="AI Services Grid"
            description={`Showing ${currentItems.length} of ${filtered.length} services`}
            center={false}
          />

          {filtered.length === 0 ? (
            <div className="mt-10 border border-border py-20 text-center">
              <p className="font-display text-xl text-foreground">No services found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) =>
                  updateParams(
                    { page: page > 1 ? String(page) : null },
                    { resetPage: false }
                  )
                }
              />
            </div>
          )}
        </div>
      </section>

      {/* Directory CTA */}
      <section className="border-y border-border bg-card py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Looking for a custom AI solution?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tell us what you need — we&apos;ll help you find the right tools or connect about
            development services.
          </p>
          <Button asChild size="lg" className="mt-8 group">
            <Link href="/contact">
              Contact us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by Leading Companies Worldwide
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {clientLogos.map((name) => (
              <span
                key={name}
                className="font-display text-xl text-foreground/70 sm:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="border-t border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustFeatures.map((feature, index) => (
              <div key={feature.title} className="border border-border bg-background p-6">
                <p className="text-[11px] font-medium tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export function ServicesClient() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
