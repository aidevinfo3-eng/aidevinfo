import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Terms of Service',
  description:
    'Terms and conditions for using AI Dev Info, including content, listings, and advertising.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Please read these terms before using AI Dev Info."
      breadcrumbLabel="Terms of Service"
    >
      <section>
        <h2>1. Acceptance</h2>
        <p>
          By accessing or using AI Dev Info, you agree to these Terms of Service. If you do not
          agree, do not use the site.
        </p>
      </section>

      <section>
        <h2>2. What we provide</h2>
        <p>
          AI Dev Info publishes information about AI tools, services, articles, and related
          content. Listings, ratings, and descriptions are for general information and may change
          without notice. We do not guarantee that any third-party tool will meet your needs.
        </p>
      </section>

      <section>
        <h2>3. No professional advice</h2>
        <p>
          Content on this site is not legal, financial, medical, or professional advice. Always
          evaluate tools and vendors yourself before purchasing or integrating them.
        </p>
      </section>

      <section>
        <h2>4. User submissions</h2>
        <p>
          If you contact us or submit a tool/service for listing, you confirm that the information
          you provide is accurate and that you have the right to share it. We may edit, accept, or
          reject submissions at our discretion.
        </p>
      </section>

      <section>
        <h2>5. Advertising</h2>
        <p>
          Sponsored placements and advertising packages, when offered, are subject to separate
          agreement by email. We reserve the right to refuse ads that are misleading, illegal, or
          unrelated to our audience.
        </p>
      </section>

      <section>
        <h2>6. Intellectual property</h2>
        <p>
          Site design, branding, and original content belong to AI Dev Info or its licensors.
          Third-party names and logos belong to their respective owners and are used for
          identification or commentary.
        </p>
      </section>

      <section>
        <h2>7. Disclaimers</h2>
        <p>
          The site is provided &quot;as is&quot; without warranties of any kind. We are not
          responsible for downtime, errors, or third-party websites linked from our pages.
        </p>
      </section>

      <section>
        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, AI Dev Info is not liable for any indirect,
          incidental, or consequential damages arising from your use of the site or reliance on
          its content.
        </p>
      </section>

      <section>
        <h2>9. Refunds</h2>
        <p>
          Digital advertising or sponsorship fees, when charged, are generally non-refundable once
          a campaign has started, unless we agree otherwise in writing. Contact{' '}
          <a href="mailto:aidevinfo3@gmail.com">aidevinfo3@gmail.com</a> for billing questions.
        </p>
      </section>

      <section>
        <h2>10. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes
          means you accept the updated terms.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          Questions about these terms: <a href="mailto:aidevinfo3@gmail.com">aidevinfo3@gmail.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}
