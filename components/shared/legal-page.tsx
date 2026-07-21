import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

interface LegalPageProps {
  title: string;
  description: string;
  breadcrumbLabel: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPage({
  title,
  description,
  breadcrumbLabel,
  lastUpdated = 'July 20, 2026',
  children,
}: LegalPageProps) {
  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} className="mb-6" />
          <h1 className="font-display text-3xl font-normal text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-8 text-[15px] leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>

        <p className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
          Questions? Email{' '}
          <a href="mailto:aidevinfo3@gmail.com" className="text-primary underline underline-offset-2">
            aidevinfo3@gmail.com
          </a>{' '}
          or visit our{' '}
          <Link href="/contact" className="text-primary underline underline-offset-2">
            Contact
          </Link>{' '}
          page.
        </p>
      </article>
    </div>
  );
}
