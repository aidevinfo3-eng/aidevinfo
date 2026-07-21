'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from '@/components/shared/blog-card';
import { SearchBar } from '@/components/shared/search-bar';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';

const trendingTopics = [
  'AI Agents',
  'ChatGPT',
  'Claude',
  'Gemini',
  'Cursor AI',
  'Prompt Engineering',
  'AI Automation',
  'AI Coding',
  'AI SaaS',
  'AI Marketing',
];

const popularCategoryStats = [
  { name: 'AI Development', count: '1,250' },
  { name: 'AI Chatbots', count: '900' },
  { name: 'AI Agents', count: '750' },
  { name: 'Prompt Engineering', count: '620' },
  { name: 'AI Coding', count: '810' },
  { name: 'Machine Learning', count: '920' },
  { name: 'Computer Vision', count: '540' },
  { name: 'AI Writing', count: '680' },
  { name: 'Image AI', count: '1,120' },
  { name: 'Video AI', count: '450' },
  { name: 'Voice AI', count: '390' },
  { name: 'Business AI', count: '620' },
];

const successStories = [
  { title: 'AI Chatbot for Healthcare', result: 'Increased patient engagement by 65%.' },
  { title: 'AI Automation for E-commerce', result: 'Reduced operational costs by 40%.' },
  { title: 'AI Assistant for Education', result: 'Improved student support by 70%.' },
  { title: 'AI Analytics for Finance', result: 'Boosted financial insights by 55%.' },
];

const authors = [
  { name: 'Zainab Ghafoor', role: 'AI & SEO Specialist', count: '124 Articles' },
  { name: 'Areeb Hassan', role: 'AI Developer', count: '98 Articles' },
  { name: 'Fatima Khan', role: 'AI Writer', count: '87 Articles' },
  { name: 'David Kim', role: 'Machine Learning Engineer', count: '76 Articles' },
];

const sortTabs = ['Latest', 'Most Popular', 'Trending', 'Most Viewed'];

export type BlogsClientProps = {
  allPosts: BlogPost[];
  categories: string[];
  featuredPost: BlogPost | null;
  editorPicks: BlogPost[];
  tutorialPosts: BlogPost[];
  newsPosts: BlogPost[];
};

function BlogsContent({
  allPosts,
  categories: blogCategories,
  featuredPost,
  editorPicks,
  tutorialPosts,
  newsPosts,
}: BlogsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemsPerPage = 8;

  const searchFromUrl = searchParams.get('q') ?? '';
  const [search, setSearch] = useState(searchFromUrl);
  const categoryParam = searchParams.get('category') ?? 'All';
  const category = blogCategories.includes(categoryParam) ? categoryParam : 'All';
  const sortTabParam = searchParams.get('sort') ?? 'Latest';
  const sortTab = sortTabs.includes(sortTabParam) ? sortTabParam : 'Latest';
  const pageParam = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const comparisonPosts = useMemo(
    () =>
      allPosts
        .filter(
          (p) =>
            /vs|compared|comparison/i.test(p.title) ||
            p.tags.some((t) => /comparison/i.test(t))
        )
        .slice(0, 4),
    [allPosts]
  );

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

    if (sortTab === 'Most Popular' || sortTab === 'Most Viewed') {
      result = [...result].sort((a, b) => b.tags.length - a.tags.length);
    } else if (sortTab === 'Trending') {
      result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return result.filter((p) => p.slug !== featuredPost?.slug);
  }, [allPosts, search, category, sortTab, featuredPost?.slug]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const currentItems = filtered.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const scrollToLatest = () => {
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            guides, industry news, prompt engineering resources, and practical insights.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search AI blogs, tutorials, news, comparisons..."
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <a href="#latest">
                Explore articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>

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

      {/* Featured */}
      {featuredPost && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
              Editor&apos;s Choice
            </p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group mt-6 grid gap-8 border border-border lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] bg-muted lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {featuredPost.category}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-snug text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{featuredPost.author}</span>
                  <span aria-hidden>·</span>
                  <span>
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Read full article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Trending topics */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl text-foreground">Trending Topics</h2>
            <button
              type="button"
              onClick={scrollToLatest}
              className="text-sm font-medium text-primary hover:underline"
            >
              View all topics →
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  updateParams({ q: topic });
                  scrollToLatest();
                }}
                className="border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-muted/50"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's picks */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Curated"
              title="Editor's Picks"
              center={false}
            />
            <Button asChild variant="outline" className="self-start group">
              <a href="#latest">
                View all picks
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {editorPicks.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-border bg-card p-5 transition-colors hover:bg-muted/40"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-primary">
                  {post.category}
                </p>
                <h3 className="mt-3 font-display text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {post.author} · {post.readingTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section id="latest" className="scroll-mt-24 border-t border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Latest Updates"
            title="Latest Articles"
            center={false}
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {sortTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  updateParams({ sort: tab === 'Latest' ? null : tab })
                }
                className={cn(
                  'px-4 py-2 text-sm transition-colors',
                  sortTab === tab
                    ? 'bg-foreground text-background'
                    : 'border border-border text-foreground hover:bg-muted/50'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  updateParams({ category: cat === 'All' ? null : cat })
                }
                className={cn(
                  'px-3 py-1.5 text-xs uppercase tracking-wider',
                  category === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {currentItems.length === 0 ? (
            <div className="mt-10 border border-border py-16 text-center">
              <p className="font-display text-xl">No articles found</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Popular categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Popular Categories" center={false} />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {popularCategoryStats.map((cat) => (
              <div
                key={cat.name}
                className="border border-border p-5"
              >
                <h3 className="font-display text-lg text-foreground">{cat.name}</h3>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {cat.count} articles
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lists row */}
      <section className="border-y border-border bg-card py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="font-display text-2xl text-foreground">Step-by-Step Tutorials</h2>
            <ul className="mt-5 space-y-3">
              {tutorialPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                updateParams({ category: 'Tutorials' });
                scrollToLatest();
              }}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              View all →
            </button>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">Latest AI News</h2>
            <ul className="mt-5 space-y-3">
              {newsPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                updateParams({ category: 'News' });
                scrollToLatest();
              }}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              View all →
            </button>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">AI Comparisons</h2>
            <ul className="mt-5 space-y-3">
              {comparisonPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                updateParams({ q: 'vs' });
                scrollToLatest();
              }}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              View all →
            </button>
          </div>
        </div>
      </section>

      {/* Free resources + success stories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title="Free Resources" center={false} />
              <div className="mt-6 space-y-3">
                {[
                  { title: 'Prompt Library', meta: '500+ AI prompts' },
                  { title: 'AI Cheat Sheets', meta: 'Download PDF' },
                  { title: 'AI Tools Directory', meta: '1,000+ AI tools' },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href="/services"
                    className="flex items-center justify-between border border-border p-5 transition-colors hover:bg-muted/40"
                  >
                    <span className="font-display text-lg text-foreground">{item.title}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.meta}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title="Real AI Success Stories" center={false} />
              <div className="mt-6 space-y-3">
                {successStories.map((story) => (
                  <div key={story.title} className="border border-border p-5">
                    <h3 className="font-display text-lg text-foreground">{story.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{story.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authors */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Popular Authors" center={false} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {authors.map((author) => (
              <div key={author.name} className="border border-border bg-background p-6">
                <h3 className="font-display text-xl text-foreground">{author.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{author.role}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-primary">
                  {author.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO block */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">
            AI Blogs &amp; Artificial Intelligence Learning Hub
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            AI Dev Info is your trusted destination for learning artificial intelligence
            through expert-written blogs, practical tutorials, AI news, tool comparisons,
            and development resources. From ChatGPT and Claude to AI agents, machine
            learning, prompt engineering, automation, and large language models, our
            content provides actionable knowledge and industry insights.
          </p>
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
