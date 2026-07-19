import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/categories';
import { SectionHeading } from '@/components/shared/section-heading';

const displayCounts: Record<string, string> = {
  'ai-chatbots': '120+',
  'ai-coding': '160+',
  'ai-writing': '200+',
  'image-generation': '150+',
  'video-generation': '100+',
  marketing: '120+',
  'business-ai': '150+',
};

export function CategoriesSection() {
  const featured = categories.filter((c) =>
    [
      'ai-chatbots',
      'ai-coding',
      'ai-writing',
      'image-generation',
      'video-generation',
      'marketing',
      'business-ai',
    ].includes(c.slug)
  );

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Explore Categories"
            title="Explore AI by category"
            description="Browse top AI tools and solutions by categories."
            center={false}
            className="max-w-lg"
          />
          <Button asChild variant="outline" className="shrink-0 self-start group">
            <Link href="/services">
              View all categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((category) => (
            <Link
              key={category.slug}
              href={`/services?category=${category.slug}`}
              className="group flex h-full flex-col justify-between border border-border bg-card p-5 transition-colors hover:border-foreground/25 hover:bg-muted/40 sm:p-6"
            >
              <h3 className="font-display text-lg text-foreground transition-colors group-hover:text-primary sm:text-xl">
                {category.name}
              </h3>
              <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {displayCounts[category.slug] ?? `${category.count}+`} tools
              </p>
            </Link>
          ))}

          <Link
            href="/services"
            className="group flex h-full flex-col justify-between bg-foreground p-5 text-background sm:p-6"
          >
            <h3 className="font-display text-lg sm:text-xl">More categories</h3>
            <p className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-background/70">
              Explore all
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
