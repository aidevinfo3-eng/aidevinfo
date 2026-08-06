'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { PortableTextBlock } from '@portabletext/react';
import {
  Clock,
  Calendar,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  Check,
  List,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BlogCard } from '@/components/shared/blog-card';
import { PortableText } from '@/components/blog/portable-text';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { BlogPost } from '@/lib/types';
import { cn } from '@/lib/utils';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function headingHref(heading: string, index: number, isMarkdown: boolean) {
  return isMarkdown ? `#heading-${index}` : `#${slugify(heading)}`;
}

function TableOfContents({
  headings,
  isMarkdown,
  activeId,
  className,
}: {
  headings: string[];
  isMarkdown: boolean;
  activeId: string;
  className?: string;
}) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      <p className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <List className="h-3.5 w-3.5" />
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading, index) => {
          const href = headingHref(heading, index, isMarkdown);
          const id = href.slice(1);
          const isActive = activeId === id;

          return (
            <li key={`${heading}-${index}`}>
              <a
                href={href}
                className={cn(
                  'block border-l-2 py-1.5 pl-4 -ml-px text-[13px] leading-snug transition-colors',
                  isActive
                    ? 'border-primary font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-foreground/25 hover:text-foreground'
                )}
              >
                {heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BlogDetail({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState('');
  const tableOfContents = post.headings;
  const isMarkdown = typeof post.content === 'string';

  useEffect(() => {
    if (tableOfContents.length === 0) return;

    const ids = tableOfContents.map((heading, index) =>
      headingHref(heading, index, isMarkdown).slice(1)
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tableOfContents, isMarkdown]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://aidevinfo.online/blog/${post.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <article>
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Breadcrumbs
              items={[
                { label: 'Blogs', href: '/blogs' },
                { label: post.category },
                { label: post.title },
              ]}
              className="mb-8"
            />
            <Badge className="gradient-primary border-0 text-white">
              {post.category}
            </Badge>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-3xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <Image
                  src={post.authorAvatar}
                  alt={post.author}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {post.author}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Share:</span>
                {[
                  {
                    icon: Twitter,
                    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`,
                  },
                  {
                    icon: Linkedin,
                    href: `https://linkedin.com/sharing/share-offsite/?url=https://aidevinfo.online/blog/${post.slug}`,
                  },
                  {
                    icon: Facebook,
                    href: `https://facebook.com/sharer/sharer.php?u=https://aidevinfo.online/blog/${post.slug}`,
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label="Share article"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
                <button
                  onClick={handleCopyLink}
                  className="flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Copy link"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-4 aspect-[2/1] overflow-hidden border border-border sm:-mt-6 sm:aspect-[21/9]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {tableOfContents.length > 0 && (
            <details className="mb-10 border border-border bg-muted/20 lg:hidden">
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <List className="h-4 w-4 text-muted-foreground" />
                  Table of contents
                </span>
              </summary>
              <div className="border-t border-border px-4 pb-4 pt-3">
                <TableOfContents
                  headings={tableOfContents}
                  isMarkdown={isMarkdown}
                  activeId={activeId}
                />
              </div>
            </details>
          )}

          <div
            className={cn(
              'grid gap-10 xl:gap-14',
              tableOfContents.length > 0 &&
                'lg:grid-cols-[minmax(0,1fr)_240px]'
            )}
          >
            <div className="min-w-0">
              <div className="prose-content max-w-none">
                {isMarkdown ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => {
                        const text = String(children);
                        const index = tableOfContents.indexOf(text);
                        const id =
                          index >= 0
                            ? `heading-${index}`
                            : `heading-${slugify(text)}`;
                        return (
                          <h2 id={id} className="scroll-mt-24">
                            {children}
                          </h2>
                        );
                      },
                      h3: ({ children }) => (
                        <h3 className="scroll-mt-24">{children}</h3>
                      ),
                      table: ({ children }) => (
                        <div className="my-8 overflow-x-auto">
                          <table className="blog-table">{children}</table>
                        </div>
                      ),
                    }}
                  >
                    {post.content as string}
                  </ReactMarkdown>
                ) : (
                  <PortableText
                    value={post.content as PortableTextBlock[]}
                  />
                )}
              </div>

              {post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-14 border-t border-border pt-12">
                  <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                    Frequently Asked Questions
                  </h2>
                  <div className="mt-8">
                    <FaqAccordion faqs={post.faqs} />
                  </div>
                </div>
              )}
            </div>

            {tableOfContents.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                  <TableOfContents
                    headings={tableOfContents}
                    isMarkdown={isMarkdown}
                    activeId={activeId}
                  />
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
              Related Articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
