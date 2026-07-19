import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/shared/rating-stars';
import { SectionHeading } from '@/components/shared/section-heading';
import { getCategoryName } from '@/lib/categories';
import { getFeaturedServices } from '@/lib/services';

export function TrendingToolsSection() {
  const services = getFeaturedServices().slice(0, 6);

  return (
    <section className="border-y border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Trending Now"
            title="Trending AI tools"
            description="Hand-picked trending AI tools loved by businesses and creators."
            center={false}
            className="max-w-lg"
          />
          <Button asChild variant="outline" className="shrink-0 self-start group">
            <Link href="/services">
              View all tools
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col border border-border bg-background p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {getCategoryName(service.category)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-foreground">
                    <Link
                      href={`/services/${service.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {service.name}
                    </Link>
                  </h3>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {service.pricing}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <RatingStars rating={service.rating} showNumber />
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
