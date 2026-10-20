'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasNavOverlayAttribute } from '@/components/layout/nav-overlay-marker';
import { pathHasHeroOverlay } from '@/lib/paths';
import { cn } from '@/lib/utils';

function readOverlay(pathname: string | null) {
  if (hasNavOverlayAttribute()) return true;
  if (pathHasHeroOverlay(pathname)) return true;
  if (typeof window !== 'undefined' && pathHasHeroOverlay(window.location.pathname)) {
    return true;
  }
  return false;
}

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState(() => pathHasHeroOverlay(pathname));

  useEffect(() => {
    setOverlay(readOverlay(pathname));
    const sync = () => setOverlay(readOverlay(pathname));
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-nav-overlay'],
    });
    return () => mo.disconnect();
  }, [pathname]);

  // Dark-hero pages: content starts under the fixed transparent nav (heroes pad themselves).
  // Other pages: offset for the always-solid header.
  return (
    <main className={cn('flex-1', !overlay && 'pt-[4.25rem]')}>{children}</main>
  );
}
