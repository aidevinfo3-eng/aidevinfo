import type { Metadata, Viewport } from 'next';
import { DM_Sans, Source_Serif_4 } from 'next/font/google';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${sourceSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
