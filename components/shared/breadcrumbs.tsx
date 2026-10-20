import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://aidevinfo.online';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  className,
  tone = 'default',
}: {
  items: BreadcrumbItem[];
  className?: string;
  tone?: 'default' | 'light';
}) {
  // Visible trail = Home + items. Schema must include Home and give every
  // non-final crumb a URL (Google rejects middle ListItems without `item`).
  const trail: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => {
      const isLast = index === trail.length - 1;
      const entry: {
        '@type': 'ListItem';
        position: number;
        name: string;
        item?: string;
      } = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };
      if (item.href) {
        entry.item = `${SITE_URL}${item.href}`;
      } else if (!isLast) {
        // Middle crumbs need a URL — fall back to site root rather than omit.
        entry.item = SITE_URL;
      }
      // Last crumb may omit `item`; Google uses the current page URL.
      return entry;
    }),
  };

  const muted =
    tone === 'light'
      ? 'text-white/60 hover:text-white'
      : 'text-muted-foreground hover:text-primary';
  const current = tone === 'light' ? 'text-white' : 'text-foreground';
  const chevron =
    tone === 'light' ? 'text-white/35' : 'text-muted-foreground/50';

  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          const isHome = index === 0;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && <ChevronRight className={cn('h-4 w-4 shrink-0', chevron)} />}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    'min-w-0 font-medium',
                    isLast ? current : muted,
                    isLast && 'truncate'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isHome ? (
                    <span className="inline-flex items-center" aria-label="Home">
                      <Home className="h-4 w-4" />
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'min-w-0 shrink-0 transition-colors',
                    muted,
                    isHome && 'inline-flex items-center'
                  )}
                  aria-label={isHome ? 'Home' : undefined}
                >
                  {isHome ? <Home className="h-4 w-4" /> : item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
