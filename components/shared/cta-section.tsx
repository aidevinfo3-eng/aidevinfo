'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Decorative wash + grid behind content (homepage CTA). */
  decorative?: boolean;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  decorative = false,
}: CTASectionProps) {
  return (
    <section
      className={
        decorative
          ? 'home-card relative overflow-hidden px-6 py-14 sm:px-12 sm:py-16'
          : 'home-card px-6 py-14 sm:px-12 sm:py-16'
      }
    >
      {decorative ? (
        <>
          <div className="cta-card-wash pointer-events-none absolute inset-0" aria-hidden />
          <div className="cta-card-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
        </>
      ) : null}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-normal text-foreground sm:text-4xl text-balance">
          {title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base text-balance">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
