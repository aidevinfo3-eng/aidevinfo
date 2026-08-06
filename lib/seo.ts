import type { Metadata } from 'next';

const siteUrl = 'https://aidevinfo.online';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  /** When false, skip appending "| AI Dev Info" (and bypass the root title template). */
  branded?: boolean;
}

export function generateSEO({
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  branded = true,
}: SEOProps): Metadata {
  const url = `${siteUrl}${path}`;
  const hasBrand = /AI Dev Info/i.test(title);
  const bareTitle = hasBrand
    ? title.replace(/\s*\|\s*AI Dev Info\s*$/i, '').trim()
    : title;
  const displayTitle = branded ? `${bareTitle} | AI Dev Info` : bareTitle;

  return {
    // Root layout template appends "| AI Dev Info"; use absolute when we want no brand.
    title: branded ? bareTitle : { absolute: bareTitle },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      url,
      title: displayTitle,
      description,
      siteName: 'AI Dev Info',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: bareTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [image],
    },
  };
}

export function generateServiceLd(service: {
  name: string;
  description: string;
  pricing: string;
  website: string;
  category: string;
  slug: string;
  lastUpdated: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: service.name,
    description: service.description,
    applicationCategory: service.category,
    url: `${siteUrl}/services/${service.slug}`,
    offers: {
      '@type': 'Offer',
      price: service.pricing === 'Free' || service.pricing === 'Freemium' ? '0' : 'Varies',
      priceCurrency: 'USD',
    },
    dateModified: service.lastUpdated,
  };
}

export function generateArticleLd(article: {
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  slug: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Dev Info',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${article.slug}`,
    },
    keywords: article.tags.join(', '),
  };
}
