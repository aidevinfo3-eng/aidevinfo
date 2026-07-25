import {
  buildUrlSetXml,
  getBlogSitemapEntries,
} from '@/lib/sitemaps';

export async function GET() {
  const entries = await getBlogSitemapEntries();
  const xml = buildUrlSetXml(entries);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
