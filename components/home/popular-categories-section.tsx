import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EmeraldBandButton } from '@/components/shared/emerald-band-button';
import { EmeraldGlassCard } from '@/components/shared/emerald-glass-card';
import { EmeraldGradientSection } from '@/components/shared/emerald-gradient-section';
import { SectionHeading } from '@/components/shared/section-heading';
import type { Category } from '@/lib/types';

const HOME_CATEGORY_LIMIT = 12;

export function PopularCategoriesSection({ categories }: { categories: Category[] }) {
  const items = [...categories]
    .filter((c) => c.showOnHome !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, HOME_CATEGORY_LIMIT);

  return (
    <EmeraldGradientSection>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Popular AI tool categories"
          description="Explore AI tools based on what you want to accomplish."
          center={false}
          tone="inverse"
          className="max-w-lg"
        />
        <EmeraldBandButton asChild className="shrink-0 self-start group">
          <Link href="/services">
            Explore all categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </EmeraldBandButton>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((category) => (
          <Link key={category.slug} href={`/services/${category.slug}`} className="group block">
            <EmeraldGlassCard className="flex h-full flex-col p-6 transition-colors hover:border-white/25">
              <h3 className="font-display text-xl text-white/95 transition-colors group-hover:text-emerald-200">
                {category.name}
              </h3>
              {category.description ? (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
                  {category.description}
                </p>
              ) : null}
              <span className="mt-4 text-xs uppercase tracking-[0.16em] text-white/45">
                {category.countLabel}
              </span>
            </EmeraldGlassCard>
          </Link>
        ))}
      </div>
    </EmeraldGradientSection>
  );
}
