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

/** Native img — skips next/image optimizer JS on every page. */
export function BrandLogo({
  className,
  size = 'nav',
  priority = false,
}: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND_LOGO_SRC}
      alt={BRAND_NAME}
      width={410}
      height={117}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'low' : 'auto'}
      className={cn(
        'object-contain object-left',
        sizeClass[size],
        className
      )}
    />
  );
}
