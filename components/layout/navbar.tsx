'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'AI Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/advertising', label: 'Advertising' },
  { href: '/contact', label: 'Contact' },
];

function subscribeScroll(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler, { passive: true });
  return () => {
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
  };
}

function getScrollSolid() {
  return window.scrollY > 4 || document.documentElement.scrollTop > 4;
}

function getServerScrollSolid() {
  return false;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSolid,
    getServerScrollSolid
  );

  // Instant solid: any page that isn't the untouched home hero top
  const solid = !onHome || scrolled || mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-200',
        solid ? 'border-neutral-200' : 'border-transparent'
      )}
      style={{
        backgroundColor: solid ? 'hsl(40 12% 97%)' : 'transparent',
        boxShadow: solid ? '0 8px 30px -12px rgba(0,0,0,0.18)' : 'none',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="AI Dev Info home">
          <span
            className="font-display text-[1.65rem] leading-none tracking-tight transition-colors duration-200"
            style={{ color: solid ? '#0a0a0a' : '#ffffff' }}
          >
            AI Dev Info
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm px-3 py-2 text-[13px] font-medium transition-colors duration-200"
                  style={{
                    color: solid
                      ? isActive
                        ? '#0a0a0a'
                        : '#737373'
                      : isActive
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.72)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 md:block">
          <Button
            asChild
            size="sm"
            className={
              solid
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-white text-neutral-950 hover:bg-white/90'
            }
          >
            <Link href="/services">Explore tools</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          style={{ color: solid ? '#0a0a0a' : '#ffffff' }}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="border-t border-neutral-200 md:hidden"
          style={{ backgroundColor: 'hsl(40 12% 97%)' }}
        >
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-sm px-3 py-3 text-sm font-medium"
                  style={{ color: isActive ? 'hsl(162 72% 28%)' : '#404040' }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="mt-3 w-full">
              <Link href="/services">Explore tools</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
