import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  /** Use "h1" when this heading is the page's primary title. */
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn(center && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-3xl font-normal leading-[1.15] text-foreground sm:text-4xl lg:text-[2.75rem] text-balance">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
