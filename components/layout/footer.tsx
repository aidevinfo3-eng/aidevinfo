import Link from 'next/link';
import { Sparkles, Twitter, Linkedin, Github, Youtube, Mail } from 'lucide-react';

const footerSections = [
  {
    title: 'About',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/blogs', label: 'Blog' },
      { href: '/advertising', label: 'Advertising' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { href: '/services', label: 'AI Services' },
      { href: '/services', label: 'All Categories' },
      { href: '/blogs', label: 'Latest Articles' },
      { href: '/services', label: 'Top Rated' },
    ],
  },
  {
    title: 'AI Services',
    links: [
      { href: '/services?category=ai-chatbots', label: 'AI Chatbots' },
      { href: '/services?category=image-generation', label: 'Image Generation' },
      { href: '/services?category=ai-coding', label: 'AI Coding' },
      { href: '/services?category=video-generation', label: 'Video Generation' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/contact', label: 'Contact' },
      { href: '/advertising', label: 'Advertise' },
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
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">
                AI Dev <span className="gradient-text">Info</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Your trusted source for AI tools, services, reviews, and insights.
              Discover the best artificial intelligence solutions for your needs.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-soft"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Dev Info. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for the AI community at{' '}
            <span className="font-medium text-foreground">aidevinfo.online</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
