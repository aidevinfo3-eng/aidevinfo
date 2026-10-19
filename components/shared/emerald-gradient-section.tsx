import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type EmeraldGradientSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Slightly less vertical padding for mid-page bands */
  compact?: boolean;
};

/** Full-width emerald gradient band — no photo; use for lifecycle and similar process sections. */
export function EmeraldGradientSection({
  children,
  className,
  id,
  compact = false,
}: EmeraldGradientSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-emerald-gradient relative isolate overflow-hidden',
        compact ? 'py-16 sm:py-20' : 'py-16 sm:py-20 lg:py-24',
        className
      )}
    >
      <div className="section-emerald-gradient__grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="section-emerald-gradient__glow section-emerald-gradient__glow--a pointer-events-none absolute"
        aria-hidden
      />
      <div
        className="section-emerald-gradient__glow section-emerald-gradient__glow--b pointer-events-none absolute"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
