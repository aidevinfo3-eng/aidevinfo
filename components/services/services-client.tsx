'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { categories as fallbackCategories } from '@/lib/categories';
import type { AIService, Category } from '@/lib/types';
import { ServiceCard } from '@/components/shared/service-card';
import { SearchBar } from '@/components/shared/search-bar';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';
import { SectionHeading } from '@/components/shared/section-heading';
import { TrustedTechSection } from '@/components/home/trusted-tech-section';
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
  { value: 'newest', label: 'Newest' },
  { value: 'featured', label: 'Featured' },
];

const sortValues = new Set(sortOptions.map((o) => o.value));
const pricingOptions = ['All', 'Free', 'Freemium', 'Paid', 'Add-on', 'Included', 'Open Source', 'Custom'];

const trustFeatures = [
  {
    title: 'Verified Tools',
    description:
      'Every listed AI tool is manually reviewed and verified by our editorial team.',
  },
  {
    title: 'Real Reviews',
    description: 'Read authentic reviews submitted by verified users.',
  },
  {
    title: 'Updated Daily',
    description: 'New AI tools and listings are reviewed and updated every day.',
  },
  {
    title: 'Trusted Platform',
    description:
      'A reliable AI tools directory trusted by businesses, startups, and developers worldwide.',
  },
  {
    title: 'Sponsored Listings',
    description: 'Promote your AI tool or product to thousands of targeted visitors.',
  },
  {
    title: 'Compare & Discover',
    description:
      'Filter by category and pricing to find the right AI tool for your workflow.',
  },
];

function ServicesContent({
  tools,
  categories,
}: {
  tools: AIService[];
  categories: Category[];
}) {
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
    let result = tools.filter((s) => {
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
        (pricing === 'Custom' && s.pricing.toLowerCase().includes('custom'));
      return matchesSearch && matchesCategory && matchesPricing;
    });

    if (sort === 'popular') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === 'newest') {
      result = [...result].sort(
        (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
    } else if (sort === 'featured') {
      result = [...result].sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [tools, search, category, pricing, sort]);

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
      <section className="relative isolate overflow-hidden border-b border-border bg-foreground">
        <PageHeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Breadcrumbs
            items={[{ label: 'AI Tools' }]}
            tone="light"
            className="mb-6"
          />

          <h1 className="max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
            Find the Best AI Tools for Every Business Need
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            Discover and compare verified AI tools — chatbots, image generators,
            coding assistants, writing apps, automation platforms, and more. Filter
            by category and pricing to choose the right AI tool with confidence.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
            {[
              '5,000+ Verified AI Tools',
              '150+ AI Categories',
              'Updated Daily',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
            {[
              { value: '5,000+', label: 'AI Tools' },
              { value: '150+', label: 'Categories' },
              { value: '200K+', label: 'Monthly Visitors' },
              { value: '1,000+', label: 'Verified Tools' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory grid with search & filters */}
      <section id="directory" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Directory"
            title="AI Tools Grid"
            description={`Showing ${currentItems.length} of ${filtered.length} tools`}
            center={false}
          />

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search AI tools by name, description, or tags..."
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

          {filtered.length === 0 ? (
            <div className="mt-10 border border-border py-20 text-center">
              <p className="font-display text-xl text-foreground">No tools found</p>
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

      {/* Trusted Partners marquee */}
      <TrustedTechSection />

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

export function ServicesClient({
  tools,
  categories = fallbackCategories,
}: {
  tools: AIService[];
  categories?: Category[];
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <ServicesContent tools={tools} categories={categories} />
    </Suspense>
  );
}
