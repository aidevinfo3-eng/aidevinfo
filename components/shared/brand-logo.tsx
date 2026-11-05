import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Resized WebP (~13KB) — original PNG was ~554KB at 2058px wide. */
export const BRAND_LOGO_SRC = '/ai-dev-logo.webp';
export const BRAND_NAME = 'AI Dev Info';

type BrandLogoProps = {
  className?: string;
  /** Navbar height ~40–44px; footer can be larger */
  size?: 'nav' | 'footer' | 'lg';
  priority?: boolean;
};

const sizeClass = {
  nav: 'h-9 w-auto sm:h-10',
  footer: 'h-10 w-auto sm:h-11',
  lg: 'h-12 w-auto sm:h-14',
} as const;

export function BrandLogo({
  className,
  size = 'nav',
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={BRAND_NAME}
      width={410}
      height={117}
      priority={priority}
      sizes="(max-width: 640px) 144px, 160px"
      className={cn(
        'object-contain object-left',
        sizeClass[size],
        className
      )}
    />
  );
}
