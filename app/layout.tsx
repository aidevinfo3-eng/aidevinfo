import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';

/**
 * swap + adjustFontFallback = next/font injects size-adjusted fallback so
 * glyph metrics match and CLS stays low (unlike display:optional mid-load swap).
 */
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

const siteUrl = 'https://aidevinfo.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AI Dev Info — AI Development Services, Tools & Insights',
  description:
    'AI Dev Info is your all-in-one platform for AI development services, AI tools discovery, expert tutorials, industry news, and sponsored AI promotions.',
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
  category: 'technology',
  verification: {
    google: 'RyIjF3PbFua0QQuQOJ4PjlHmd3Sws15xXWPBIdJszzk',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0f6b52',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        {/* Keep AdSense in initial HTML while site is in verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4395627474100958"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
