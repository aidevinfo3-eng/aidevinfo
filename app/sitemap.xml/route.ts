import {
  baseUrl,
  buildSitemapIndexXml,
} from '@/lib/sitemaps';

export async function GET() {
  const now = new Date();
  const xml = buildSitemapIndexXml([
    { loc: `${baseUrl}/sitemap/static.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap/services.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap/development-services.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap/blogs.xml`, lastmod: now },
  ]);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
