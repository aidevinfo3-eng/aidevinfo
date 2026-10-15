import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HERO_BG_IMAGE } from '@/components/shared/page-hero-backdrop';

type HomeAtmosphereShellProps = {
  children: ReactNode;
  className?: string;
  /** Slightly less vertical padding for mid-page bands */
  compact?: boolean;
};

/** Dark photo + emerald atmosphere (hero / lifecycle / footer CTA). */
export function HomeAtmosphereShell({
  children,
  className,
  compact = false,
}: HomeAtmosphereShellProps) {
  return (
    <section
      className={cn(
        'home-cta-banner relative isolate overflow-hidden',
        compact ? 'py-16 sm:py-20' : 'py-16 sm:py-20 lg:py-24',
        className
      )}
    >
      <Image
        src={HERO_BG_IMAGE}
        alt=""
        width={1600}
        height={900}
        sizes="100vw"
        className="home-cta-banner__photo pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden
      />
      <div className="home-cta-banner__shade pointer-events-none absolute inset-0" aria-hidden />
      <div className="home-cta-banner__grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="home-cta-banner__orb home-cta-banner__orb--a pointer-events-none absolute"
        aria-hidden
      />
      <div
        className="home-cta-banner__orb home-cta-banner__orb--b pointer-events-none absolute"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
