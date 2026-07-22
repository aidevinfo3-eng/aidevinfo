'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCategoryName } from '@/lib/categories';
import { AIService } from '@/lib/types';

export function ServiceCard({ service }: { service: AIService; index?: number }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {getCategoryName(service.category)}
          </p>
          <h3 className="mt-2 font-display text-2xl text-foreground transition-colors group-hover:text-primary">
            <Link href={`/services/${service.slug}`}>{service.name}</Link>
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {service.pricing}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-5 flex items-center justify-end border-t border-border pt-4">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
