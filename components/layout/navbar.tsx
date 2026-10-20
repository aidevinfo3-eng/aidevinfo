'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { HeroSearch } from '@/components/home/hero-search';
import { BrandLogo } from '@/components/shared/brand-logo';
import { hasNavOverlayAttribute } from '@/components/layout/nav-overlay-marker';
import { isHomePath, pathHasHeroOverlay } from '@/lib/paths';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'AI Tools' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'About' },
  { href: '/advertise', label: 'Advertising' },
  { href: '/contact', label: 'Contact' },
];

function readOverlay(pathname: string | null) {
  if (hasNavOverlayAttribute()) return true;
  if (pathHasHeroOverlay(pathname)) return true;
  if (typeof window !== 'undefined' && pathHasHeroOverlay(window.location.pathname)) {
    return true;
  }
  return false;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [overlay, setOverlay] = useState(() => pathHasHeroOverlay(pathname));

  // Hero pages: transparent until scroll. Re-check path + hero marker after mount/nav.
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

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 8 || document.documentElement.scrollTop > 8);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    // Reset scroll state on route change (new page often loads at top)
    setScrolled(window.scrollY > 8 || document.documentElement.scrollTop > 8);
  }, [pathname]);

  // Transparent over dark hero at top; white header as soon as you scroll
  const solid = !overlay || scrolled || mobileOpen;
  const onHome =
    isHomePath(pathname) ||
    (typeof window !== 'undefined' && isHomePath(window.location.pathname));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200',
        solid
          ? 'border-neutral-200 bg-[hsl(40_12%_97%)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md'
          : 'border-transparent bg-transparent shadow-none'
      )}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="AI Dev Info home">
          <BrandLogo size="nav" priority />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = isHomePath(link.href)
              ? onHome || isHomePath(pathname)
              : (pathname?.startsWith(link.href) ?? false);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'rounded-sm px-3 py-2 text-[13px] font-medium transition-colors duration-200',
                    solid
                      ? isActive
                        ? 'text-neutral-950'
                        : 'text-neutral-500 hover:text-neutral-950'
                      : isActive
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 md:block">
          <HeroSearch variant="header" onDark={!solid} />
        </div>

        <button
          type="button"
          className={cn(
            'flex h-10 w-10 items-center justify-center md:hidden transition-colors',
            solid ? 'text-neutral-950' : 'text-white'
          )}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-[hsl(40_12%_97%)] md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => {
              const isActive = isHomePath(link.href)
                ? onHome || isHomePath(pathname)
                : (pathname?.startsWith(link.href) ?? false);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block rounded-sm px-3 py-3 text-sm font-medium',
                    isActive ? 'text-[hsl(162_72%_28%)]' : 'text-neutral-700'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 max-w-none">
              <HeroSearch variant="header" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
