'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isHomePath } from '@/lib/paths';
import { cn } from '@/lib/utils';

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(() => isHomePath(pathname));

  useEffect(() => {
    const fromLocation =
      typeof window !== 'undefined'
        ? isHomePath(window.location.pathname)
        : false;
    setIsHome(isHomePath(pathname) || fromLocation);
  }, [pathname]);

  return (
    <main className={cn('flex-1', !isHome && 'pt-[4.25rem]')}>{children}</main>
  );
}
