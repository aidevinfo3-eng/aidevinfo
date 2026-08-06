import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://aidevinfo.online${item.href}` : undefined,
    })),
  };

  const muted =
    tone === 'light'
      ? 'text-white/60 hover:text-white'
      : 'text-muted-foreground hover:text-primary';
  const current = tone === 'light' ? 'text-white' : 'text-foreground';
  const chevron =
    tone === 'light' ? 'text-white/35' : 'text-muted-foreground/50';

  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className={cn('flex items-center transition-colors', muted)}
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className={cn('h-4 w-4', chevron)} />
            {item.href ? (
              <Link href={item.href} className={cn('transition-colors', muted)}>
                {item.label}
              </Link>
            ) : (
              <span className={cn('font-medium', current)}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
