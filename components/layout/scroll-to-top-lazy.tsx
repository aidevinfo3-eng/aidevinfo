'use client';

import dynamic from 'next/dynamic';

export const ScrollToTopLazy = dynamic(
  () =>
    import('@/components/layout/scroll-to-top').then((mod) => ({
      default: mod.ScrollToTop,
    })),
  { ssr: false }
);
