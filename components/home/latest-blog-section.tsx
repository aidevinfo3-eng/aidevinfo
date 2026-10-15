import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/shared/blog-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { HomeSection } from '@/components/home/home-section';
import { getLatestBlogPosts } from '@/lib/blog-posts';

export async function LatestBlogSection() {
  const posts = await getLatestBlogPosts(4);

  return (
    <HomeSection band="tint">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Latest AI resources"
          description="Guides, tutorials, and practical information on AI development, tools, LLMs, agents, RAG, and automation."
          center={false}
          className="max-w-lg"
        />
        <Button asChild variant="outline" className="shrink-0 self-start group bg-card/80">
          <Link href="/blogs">
            View latest resources
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} elevated />
        ))}
      </div>
    </HomeSection>
  );
}
