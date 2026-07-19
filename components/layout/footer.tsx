import Link from 'next/link';
import { Twitter, Linkedin, Github, Youtube, Mail } from 'lucide-react';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { href: '/services', label: 'AI Services' },
      { href: '/services', label: 'AI Tools' },
      { href: '/services', label: 'AI Categories' },
      { href: '/services', label: 'Compare Services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/blogs', label: 'Blogs' },
      { href: '/blogs', label: 'AI News' },
      { href: '/blogs', label: 'Guides & Tutorials' },
      { href: '/blogs', label: 'Case Studies' },
    ],
  },
  {
    title: 'For Businesses',
    links: [
      { href: '/advertising', label: 'Advertise With Us' },
      { href: '/contact', label: 'Submit Your Service' },
      { href: '/advertising', label: 'Become a Partner' },
      { href: '/advertising', label: 'Pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/contact', label: 'About Us' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/contact', label: 'Careers' },
      { href: '/advertising', label: 'Media Kit' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy-policy', label: 'Cookie Policy' },
      { href: '/terms', label: 'Refund Policy' },
    ],
  },
];

const socialLinks = [
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  { href: 'mailto:hello@aidevinfo.online', icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
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
            <div className="mt-6 flex gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {section.title}
              </h4>
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
