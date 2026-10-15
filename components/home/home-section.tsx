import { cn } from '@/lib/utils';

export type HomeBand = 'paper' | 'tint';

type HomeSectionProps = {
  band: HomeBand;
  children: React.ReactNode;
  className?: string;
  /** Stronger emerald wash + grid lines across the full section width. */
  tintAccent?: boolean;
};

/** Homepage light bands — strict paper / tinted alternation. */
export function HomeSection({ band, children, className, tintAccent }: HomeSectionProps) {
  return (
    <section
      className={cn(
        'py-16 sm:py-24',
        band === 'paper' && 'section-paper',
        band === 'tint' &&
          cn(
            'section-tint section-textured',
            tintAccent && 'section-tint-accent section-textured-full'
          ),
        className
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Cards on white/cream bands — subtle inset. */
export const HOME_CARD_INSET =
  'home-card-inset transition-colors hover:border-foreground/20 hover:bg-card';

/** Cards on tinted bands — elevated white. */
export const HOME_CARD_ELEVATED = 'home-card transition-colors hover:border-foreground/25';
