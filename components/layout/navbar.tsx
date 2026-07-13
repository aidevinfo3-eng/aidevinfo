'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'AI Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/advertising', label: 'Advertising' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'glass border-b border-border/60 shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="AI Dev Info home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            AI Dev <span className="gradient-text">Info</span>
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
                  className={cn(
                    'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full gradient-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="default" className="gradient-primary text-white shadow-glow hover:opacity-90">
            <Link href="/services">
              Explore AI
            </Link>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/60 glass md:hidden">
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
                  className={cn(
                    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="mt-2 w-full gradient-primary text-white">
              <Link href="/services">Explore AI</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
