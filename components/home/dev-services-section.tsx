'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { Pagination } from '@/components/shared/pagination';
import { SearchBar } from '@/components/shared/search-bar';
import { Button } from '@/components/ui/button';
import type { DevelopmentService } from '@/lib/development-services';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  Layers,
};

const ITEMS_PER_PAGE = 8;

export function DevServicesSection({
  services,
}: {
  services: DevelopmentService[];
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [services, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const currentItems = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Expertise"
            title="AI Development Services"
            description="We build custom AI solutions that help businesses automate, innovate, and grow."
            center={false}
            className="max-w-2xl"
          />
          <Button asChild size="lg" className="shrink-0 self-start group">
            <Link href="/contact">
              Book consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 max-w-xl">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search development services..."
          />
        </div>

        {currentItems.length === 0 ? (
          <div className="mt-12 border border-border py-16 text-center">
            <p className="font-display text-xl text-foreground">No services found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((service) => {
              const Icon = iconMap[service.icon] ?? Bot;
              return (
                <article
                  key={service.id}
                  className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-foreground/25 hover:bg-muted/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-border bg-background text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
