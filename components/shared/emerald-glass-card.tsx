import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type EmeraldGlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Card surface for emerald gradient bands (dark glass). */
export function EmeraldGlassCard({
  children,
  className,
  as: Component = 'div',
}: EmeraldGlassCardProps) {
  return <Component className={cn('emerald-step-card', className)}>{children}</Component>;
}
