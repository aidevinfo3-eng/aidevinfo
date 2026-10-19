import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from '@/components/shared/blog-card';
import { EmeraldBandButton } from '@/components/shared/emerald-band-button';
import { EmeraldGradientSection } from '@/components/shared/emerald-gradient-section';
import { SectionHeading } from '@/components/shared/section-heading';
import { getLatestBlogPosts } from '@/lib/blog-posts';

export async function LatestBlogSection() {
  const posts = await getLatestBlogPosts(4);

  return (
    <EmeraldGradientSection>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Latest AI resources"
          description="Guides, tutorials, and practical information on AI development, tools, LLMs, agents, RAG, and automation."
          center={false}
          tone="inverse"
          className="max-w-lg"
        />
        <EmeraldBandButton asChild className="shrink-0 self-start group">
          <Link href="/blogs">
            View latest resources
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </EmeraldBandButton>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} elevated />
        ))}
      </div>
    </EmeraldGradientSection>
  );
}
