import type { MetadataRoute } from 'next';
import { getAllAiTools } from '@/lib/ai-tools';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { getDevelopmentServices } from '@/lib/development-services';

export const baseUrl = 'https://aidevinfo.online';

function toXmlUrl(entry: MetadataRoute.Sitemap[number]): string {
  const lastmod = entry.lastModified
    ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`
    : '';
  const changefreq = entry.changeFrequency
    ? `<changefreq>${entry.changeFrequency}</changefreq>`
    : '';
  const priority =
    entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : '';

  return `<url><loc>${entry.url}</loc>${lastmod}${changefreq}${priority}</url>`;
}

export function buildUrlSetXml(entries: MetadataRoute.Sitemap): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(toXmlUrl).join('\n')}
</urlset>`;
}

export function buildSitemapIndexXml(
  sitemaps: { loc: string; lastmod?: Date }[]
): string {
  const body = sitemaps
    .map((sitemap) => {
      const lastmod = sitemap.lastmod
        ? `<lastmod>${sitemap.lastmod.toISOString()}</lastmod>`
        : '';
      return `<sitemap><loc>${sitemap.loc}</loc>${lastmod}</sitemap>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`;
}

export async function getStaticSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/advertising`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/advertising-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

export async function getServicesSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const tools = await getAllAiTools();

  return [
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...tools.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.lastUpdated ? new Date(service.lastUpdated) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}

export async function getDevelopmentServicesSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const services = await getDevelopmentServices();

  return [
    {
      url: `${baseUrl}/development-services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${baseUrl}/development-services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}

export async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllBlogPosts();

  return [
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
