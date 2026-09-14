import { Check } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/shared/breadcrumbs';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';

const highlights = [
  '5,000+ Verified AI Tools',
  '150+ AI Categories',
  'Updated Daily',
];

const stats = [
  { value: '5,000+', label: 'AI Tools' },
  { value: '150+', label: 'Categories' },
  { value: '200K+', label: 'Monthly Visitors' },
  { value: '1,000+', label: 'Verified Tools' },
];

/**
 * Rendered on the server so the <h1> is present in the initial HTML — the
 * directory below it reads search params and therefore streams in later.
 */
export function ServicesHero({
  heading,
  description,
  breadcrumbs,
}: {
  heading: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-foreground">
      <PageHeroBackdrop />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Breadcrumbs items={breadcrumbs} tone="light" className="mb-6" />

        <h1 className="max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
          {description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-300" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
