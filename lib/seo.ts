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
}

function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[|–—-]\s*AI Dev Info\s*$/i, '').trim();
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
}: SEOProps): Metadata {
  const url = `${siteUrl}${path}`;
  const displayTitle = stripBrandSuffix(title);

  return {
    // Absolute so the root layout template cannot append "| AI Dev Info".
    title: { absolute: displayTitle },
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
          alt: displayTitle,
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
