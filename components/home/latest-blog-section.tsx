'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/shared/blog-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { getLatestBlogPosts } from '@/lib/blog-posts';

export function LatestBlogSection() {
  const posts = getLatestBlogPosts(6);

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blog"
          title="Latest AI Insights"
          description="Stay informed with the latest AI news, tutorials, and expert analysis."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="border-border bg-background hover:bg-muted group">
            <Link href="/blogs">
              Read All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
