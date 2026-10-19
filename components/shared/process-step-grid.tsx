import { cn } from '@/lib/utils';
import type { ProcessStep } from '@/lib/process-step';

type ProcessStepGridProps = {
  steps: ProcessStep[];
  className?: string;
  /** Desktop column count (default 3). */
  columns?: 3 | 4 | 5;
};

const columnClass: Record<NonNullable<ProcessStepGridProps['columns']>, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

/** Numbered step cards on emerald gradient bands (dark glass, no photo). */
export function ProcessStepGrid({ steps, className, columns = 3 }: ProcessStepGridProps) {
  return (
    <div className={cn('relative mt-12', className)}>
      <div
        className="pointer-events-none absolute left-0 right-0 top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent lg:block"
        aria-hidden
      />
      <ol
        className={cn(
          'grid gap-4 sm:grid-cols-2 lg:gap-5',
          columnClass[columns]
        )}
      >
        {steps.map((item) => (
          <li key={item.step} className="emerald-step-card p-6 sm:p-7">
            <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-sm border border-emerald-400/30 bg-emerald-500/15 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200">
              {item.step}
            </span>
            <h3 className="mt-4 font-display text-2xl text-white/95">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
