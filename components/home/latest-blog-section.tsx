import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/shared/blog-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { getLatestBlogPosts } from '@/lib/blog-posts';

export async function LatestBlogSection() {
  const posts = await getLatestBlogPosts(4);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Latest Updates"
            title="Latest AI articles & insights"
            description="Stay updated with the latest AI news, tutorials, and expert insights."
            center={false}
            className="max-w-lg"
          />
          <Button asChild variant="outline" className="shrink-0 self-start group">
            <Link href="/blogs">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
