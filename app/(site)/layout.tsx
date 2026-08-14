import '../globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Main } from '@/components/layout/main';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

const siteUrl = 'https://aidevinfo.online';

export default function SiteLayout({
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
    email: 'aidevinfo3@gmail.com',
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationLd, websiteLd]),
        }}
      />
      <div className="relative flex min-h-screen flex-col font-sans">
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
