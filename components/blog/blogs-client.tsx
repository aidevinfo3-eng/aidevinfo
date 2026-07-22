'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BlogCard } from '@/components/shared/blog-card';
import { SearchBar } from '@/components/shared/search-bar';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BlogPost } from '@/lib/types';

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'featured', label: 'Featured' },
];

const sortValues = new Set(sortOptions.map((o) => o.value));

export type BlogsClientProps = {
  allPosts: BlogPost[];
  categories: string[];
};

function BlogsContent({ allPosts, categories: blogCategories }: BlogsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemsPerPage = 9;

  const searchFromUrl = searchParams.get('q') ?? '';
  const [search, setSearch] = useState(searchFromUrl);
  const categoryParam = searchParams.get('category') ?? 'All';
  const category = blogCategories.includes(categoryParam) ? categoryParam : 'All';
  const sortParam = searchParams.get('sort') ?? 'latest';
  const sort = sortValues.has(sortParam) ? sortParam : 'latest';
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
    let result = allPosts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'All' || post.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === 'oldest') {
      result = [...result].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sort === 'featured') {
      result = [...result].sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return result;
  }, [allPosts, search, category, sort]);

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
          <Breadcrumbs items={[{ label: 'Blog' }]} className="mb-6" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            AI Knowledge Hub
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl">
            AI Blogs, Tutorials, News &amp; Expert Insights
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Stay ahead in the rapidly evolving world of artificial intelligence with
            expert-written blogs, in-depth tutorials, AI tool comparisons, development
            guides, industry news, and practical insights.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
            {[
              { value: '10,000+', label: 'Articles Published' },
              { value: '250+', label: 'Step-by-Step Tutorials' },
              { value: '100+', label: 'AI Categories' },
              { value: '500K+', label: 'Monthly Readers' },
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

      {/* Blog grid with search & filters */}
      <section id="latest" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Articles"
            title="Our Blogs"
            description={`Showing ${currentItems.length} of ${filtered.length} articles`}
            center={false}
          />

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search AI blogs, tutorials, news, comparisons..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={category}
                onValueChange={(value) =>
                  updateParams({ category: value === 'All' ? null : value })
                }
              >
                <SelectTrigger className="w-[180px] rounded-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={sort}
                onValueChange={(value) =>
                  updateParams({ sort: value === 'latest' ? null : value })
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

          {currentItems.length === 0 ? (
            <div className="mt-10 border border-border py-16 text-center">
              <p className="font-display text-xl text-foreground">No articles found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((post) => (
                <BlogCard key={post.slug} post={post} />
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
    </div>
  );
}

export function BlogsClient(props: BlogsClientProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <BlogsContent {...props} />
    </Suspense>
  );
}
