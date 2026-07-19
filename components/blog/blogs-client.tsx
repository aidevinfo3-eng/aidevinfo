'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  getAllBlogPosts,
  getFeaturedBlogPost,
  getLatestBlogPosts,
  blogCategories,
} from '@/lib/blog-posts';
import { BlogCard } from '@/components/shared/blog-card';
import { SearchBar } from '@/components/shared/search-bar';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { Newsletter } from '@/components/shared/newsletter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

const editorPicksMeta = [
  { category: 'Guide', titleIncludes: 'startup' },
  { category: 'Tutorial', titleIncludes: 'prompt' },
  { category: 'Guide', titleIncludes: 'automation' },
  { category: 'Tutorial', titleIncludes: 'cursor' },
  { category: 'Comparison', titleIncludes: 'claude' },
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

const tutorials = [
  'How to Build an AI Chatbot Step by Step',
  'LangChain Tutorial for Beginners',
  'OpenAI API Complete Guide',
];

const newsItems = [
  'OpenAI launches GPT-4o Mini for developers',
  'Google DeepMind introduces Gemini 2.0',
  'Meta releases Llama 3.1',
  'Microsoft expands AI Copilot features',
];

const comparisons = [
  'ChatGPT vs Claude',
  'Gemini vs Claude',
  'Midjourney vs FLUX',
  'Cursor AI vs GitHub Copilot',
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

export function BlogsClient() {
  const allPosts = getAllBlogPosts();
  const featuredPost = getFeaturedBlogPost() ?? allPosts[0];
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortTab, setSortTab] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const editorPicks = getLatestBlogPosts(5);

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

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              onChange={(v) => {
                setSearch(v);
                setCurrentPage(1);
              }}
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
              <a href="#newsletter">Subscribe newsletter</a>
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
            <Link
              href="#latest"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all topics →
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setSearch(topic);
                  setCurrentPage(1);
                  document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' });
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
            {editorPicks.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-border bg-card p-5 transition-colors hover:bg-muted/40"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-primary">
                  {editorPicksMeta[i]?.category ?? post.category}
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
                onClick={() => {
                  setSortTab(tab);
                  setCurrentPage(1);
                }}
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
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setCurrentPage(1);
              }}
              className={cn(
                'px-3 py-1.5 text-xs uppercase tracking-wider',
                category === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:text-foreground'
              )}
            >
              All
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
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
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
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
              {tutorials.map((item) => (
                <li key={item}>
                  <Link href="#latest" className="text-sm text-muted-foreground hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="#latest" className="mt-4 inline-block text-sm font-medium text-primary">
              View all →
            </Link>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">Latest AI News</h2>
            <ul className="mt-5 space-y-3">
              {newsItems.map((item) => (
                <li key={item}>
                  <Link href="#latest" className="text-sm text-muted-foreground hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="#latest" className="mt-4 inline-block text-sm font-medium text-primary">
              View all →
            </Link>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground">AI Comparisons</h2>
            <ul className="mt-5 space-y-3">
              {comparisons.map((item) => (
                <li key={item}>
                  <Link href="#latest" className="text-sm text-muted-foreground hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="#latest" className="mt-4 inline-block text-sm font-medium text-primary">
              View all →
            </Link>
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

      <section id="newsletter" className="scroll-mt-24 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
