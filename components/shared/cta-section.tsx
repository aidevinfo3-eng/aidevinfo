'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeAtmosphereShell } from '@/components/home/home-atmosphere-shell';

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <HomeAtmosphereShell>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-normal leading-[1.12] text-white/95 sm:text-4xl text-balance">
          {title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-white/65 sm:text-base text-balance">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 bg-white text-foreground hover:bg-white/90 group"
          >
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-foreground"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </HomeAtmosphereShell>
  );
}
