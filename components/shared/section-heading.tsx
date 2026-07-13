import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(center && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground leading-relaxed sm:text-lg text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
