import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Source_Serif_4 } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Main } from '@/components/layout/main';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = 'https://aidevinfo.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'AI Dev Info — Build Smarter with AI Development, Tools & Expert Insights',
    template: '%s | AI Dev Info',
  },
  description:
    'AI Dev Info is your all-in-one platform for AI development services, AI tools discovery, expert tutorials, industry news, and sponsored AI promotions.',
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
  themeColor: '#0f6b52',
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
      <body className={`${dmSans.variable} ${sourceSerif.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd]),
          }}
        />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
