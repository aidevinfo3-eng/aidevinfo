'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BlogCard } from '@/components/shared/blog-card';
import { PortableText } from '@/components/blog/portable-text';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { BlogPost } from '@/lib/types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function BlogDetail({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const [copied, setCopied] = useState(false);
  const tableOfContents = post.headings;
  const isMarkdown = typeof post.content === 'string';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://aidevinfo.online/blog/${post.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <article>
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Blogs', href: '/blogs' },
                { label: post.category },
                { label: post.title },
              ]}
              className="mb-6"
            />
            <Badge className="gradient-primary border-0 text-white">
              {post.category}
            </Badge>
            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-balance text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
              <div className="flex items-center gap-3">
                <Image
                  src={post.authorAvatar}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {post.author}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
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
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary"
                    aria-label="Share article"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
                <button
                  onClick={handleCopyLink}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary"
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

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-6 aspect-[21/9] overflow-hidden rounded-2xl border border-border shadow-card">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              {tableOfContents.length > 0 && (
                <div className="sticky top-20">
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    Table of Contents
                  </p>
                  <nav className="space-y-2 border-l border-border">
                    {tableOfContents.map((heading, index) => (
                      <a
                        key={index}
                        href={
                          isMarkdown
                            ? `#heading-${index}`
                            : `#${slugify(heading)}`
                        }
                        className="block pl-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {heading}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </aside>

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
                        <h2 id={id} className="scroll-mt-20">
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => (
                      <h3 className="scroll-mt-20">{children}</h3>
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
          </div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 border-t border-border pt-10">
              <h2 className="font-display text-2xl text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="mt-6">
                <FaqAccordion faqs={post.faqs} />
              </div>
            </div>
          )}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
