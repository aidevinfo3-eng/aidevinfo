import Link from 'next/link';
import { Mail } from 'lucide-react';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { href: '/services', label: 'AI Tools' },
      { href: '/blogs', label: 'Blog' },
      { href: '/advertising', label: 'Advertising' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/contact', label: 'Submit a Service' },
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
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl tracking-tight text-foreground">
                AI Dev Info
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your trusted platform for discovering AI services, tools, expert
              insights, and verified technology providers.
            </p>
            <a
              href="mailto:aidevinfo3@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              aidevinfo3@gmail.com
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-2.5">
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

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Dev Info. All Rights Reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
}
