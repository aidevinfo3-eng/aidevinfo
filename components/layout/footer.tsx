import Link from 'next/link';
import { Mail } from 'lucide-react';
import { BrandLogo } from '@/components/shared/brand-logo';

const footerSections = [
  {
    title: 'Explore',
    links: [
      { href: '/services', label: 'AI Tools' },
      { href: '/blogs', label: 'AI Guides' },
      { href: '/development-services', label: 'AI Development' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/advertise', label: 'Advertising' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/advertising-policy', label: 'Advertising Policy' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-xs shrink-0">
            <Link href="/" className="inline-block" aria-label="AI Dev Info home">
              <BrandLogo size="footer" />
            </Link>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              AI services, tools, and verified technology providers.
            </p>
            <a
              href="mailto:aidevinfo3@gmail.com"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              aidevinfo3@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 md:gap-12 lg:gap-16">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {section.title}
                </p>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {year} AI Dev Info. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
