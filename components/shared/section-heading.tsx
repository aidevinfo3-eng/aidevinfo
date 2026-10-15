import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  /** Use "h1" when this heading is the page's primary title. */
  as?: 'h1' | 'h2';
  /** Light text for dark section bands (e.g. section-ink). */
  tone?: 'default' | 'inverse';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className,
  as: Heading = 'h2',
  tone = 'default',
}: SectionHeadingProps) {
  const inverse = tone === 'inverse';

  return (
    <div className={cn(center && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-[11px] font-medium uppercase tracking-[0.22em]',
            inverse ? 'text-emerald-300/85' : 'text-muted-foreground'
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          'font-display text-3xl font-normal leading-[1.15] sm:text-4xl lg:text-[2.75rem] text-balance',
          inverse ? 'text-white/95' : 'text-foreground'
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            'mt-4 text-[15px] leading-relaxed sm:text-base text-balance',
            inverse ? 'text-white/65' : 'text-muted-foreground'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
