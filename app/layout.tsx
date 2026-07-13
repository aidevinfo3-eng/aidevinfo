import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = 'https://aidevinfo.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Dev Info — Discover the Best AI Tools, Services & Insights',
    template: '%s | AI Dev Info',
  },
  description:
    'Explore cutting-edge AI solutions, in-depth reviews, industry news, tutorials, and expert recommendations. Your trusted source for everything AI.',
  keywords: [
    'AI tools',
    'AI services',
    'artificial intelligence',
    'AI directory',
    'AI reviews',
    'AI blog',
    'ChatGPT',
    'Claude',
    'Gemini',
    'Midjourney',
    'AI tutorials',
    'AI news',
  ],
  authors: [{ name: 'AI Dev Info' }],
  creator: 'AI Dev Info',
  publisher: 'AI Dev Info',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'AI Dev Info',
    title: 'AI Dev Info — Discover the Best AI Tools, Services & Insights',
    description:
      'Explore cutting-edge AI solutions, in-depth reviews, industry news, tutorials, and expert recommendations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Dev Info',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Dev Info — Discover the Best AI Tools, Services & Insights',
    description:
      'Explore cutting-edge AI solutions, in-depth reviews, industry news, tutorials, and expert recommendations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: '#2563eb',
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Dev Info',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'A professional platform focused on Artificial Intelligence, AI tools, AI services, tutorials, news, reviews, and advertising opportunities.',
    sameAs: [
      'https://twitter.com/aidevinfo',
      'https://linkedin.com/company/aidevinfo',
      'https://github.com/aidevinfo',
    ],
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Dev Info',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd]),
          }}
        />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
