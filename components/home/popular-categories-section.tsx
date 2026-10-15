import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { HomeSection, HOME_CARD_ELEVATED } from '@/components/home/home-section';
import type { Category } from '@/lib/types';

const HOME_CATEGORY_LIMIT = 12;

export function PopularCategoriesSection({ categories }: { categories: Category[] }) {
  const items = [...categories]
    .filter((c) => c.showOnHome !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, HOME_CATEGORY_LIMIT);

  return (
    <HomeSection band="tint" tintAccent>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Popular AI tool categories"
          description="Explore AI tools based on what you want to accomplish."
          center={false}
          className="max-w-lg"
        />
        <Button asChild variant="outline" className="shrink-0 self-start group bg-card/80">
          <Link href="/services">
            Explore all categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((category) => (
          <Link
            key={category.slug}
            href={`/services/${category.slug}`}
            className={`${HOME_CARD_ELEVATED} group flex flex-col p-6`}
          >
            <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-primary">
              {category.name}
            </h3>
            {category.description ? (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
            ) : null}
            <span className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {category.countLabel}
            </span>
          </Link>
        ))}
      </div>
    </HomeSection>
  );
}
