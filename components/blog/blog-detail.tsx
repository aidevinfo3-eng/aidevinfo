'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BlogCard } from '@/components/shared/blog-card';
import { Newsletter } from '@/components/shared/newsletter';
import { getRelatedBlogPosts } from '@/lib/blog-posts';
import { BlogPost } from '@/lib/types';

export function BlogDetail({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  const tableOfContents = post.content
    .filter((block) => block.type === 'heading' && block.level === 2)
    .map((block) => block.text);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://aidevinfo.online/blog/${post.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Hero */}
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
            <Badge className="gradient-primary text-white border-0">{post.category}</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance">
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
                  <p className="text-sm font-semibold text-foreground">{post.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
                  { icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}` },
                  { icon: Linkedin, href: `https://linkedin.com/sharing/share-offsite/?url=https://aidevinfo.online/blog/${post.slug}` },
                  { icon: Facebook, href: `https://facebook.com/sharer/sharer.php?u=https://aidevinfo.online/blog/${post.slug}` },
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
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Link2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured image */}
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

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            {/* Table of contents */}
            <aside className="hidden lg:block">
              {tableOfContents.length > 0 && (
                <div className="sticky top-20">
                  <p className="mb-3 text-sm font-semibold text-foreground">Table of Contents</p>
                  <nav className="space-y-2 border-l border-border">
                    {tableOfContents.map((heading, index) => (
                      <a
                        key={index}
                        href={`#heading-${index}`}
                        className="block pl-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {heading}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </aside>

            {/* Article body */}
            <div className="prose-content max-w-none">
              {post.content.map((block, index) => {
                if (block.type === 'paragraph' && block.text) {
                  return <p key={index}>{block.text}</p>;
                }
                if (block.type === 'heading' && block.text) {
                  const slug = block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  if (block.level === 2) {
                    return (
                      <h2 key={index} id={`heading-${tableOfContents.indexOf(block.text)}`} className="scroll-mt-20">
                        {block.text}
                      </h2>
                    );
                  }
                  return <h3 key={index} className="scroll-mt-20">{block.text}</h3>;
                }
                if (block.type === 'quote' && block.text) {
                  return <blockquote key={index}>{block.text}</blockquote>;
                }
                if (block.type === 'code' && block.text) {
                  return (
                    <pre key={index}>
                      <code className={`language-${block.language}`}>{block.text}</code>
                    </pre>
                  );
                }
                if (block.type === 'list' && block.items) {
                  return (
                    <ul key={index}>
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Comments UI */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground">Comments</h2>
          <p className="mt-1 text-sm text-muted-foreground">Join the conversation. Share your thoughts on this article.</p>

          <Card className="mt-6 border-border/60 shadow-soft">
            <CardContent className="p-5">
              <textarea
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                rows={4}
                placeholder="Write a comment..."
              />
              <div className="mt-3 flex justify-end">
                <Button className="gradient-primary text-white">Post Comment</Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-4">
            {[
              { name: 'Robert Chen', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop', time: '2 hours ago', text: 'Excellent article! This really helped me understand the landscape better. Looking forward to more content like this.' },
              { name: 'Maria Garcia', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop', time: '5 hours ago', text: 'Great breakdown. I especially found the comparison section useful. Would love to see a follow-up with more detailed benchmarks.' },
            ].map((comment, index) => (
              <Card key={index} className="border-border/60 shadow-soft">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <Image src={comment.avatar} alt={comment.name} width={36} height={36} className="rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{comment.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Related Articles</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
