import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Outline button styled for emerald gradient sections. */
export function EmeraldBandButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn(
        'border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-foreground',
        className
      )}
      {...props}
    />
  );
}
