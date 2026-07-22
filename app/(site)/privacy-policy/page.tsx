import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description:
    'Learn how AI Dev Info collects, uses, and protects your information when you use our website and services.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what information we collect and how we use it on AI Dev Info."
      breadcrumbLabel="Privacy Policy"
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          AI Dev Info (&quot;we&quot;, &quot;us&quot;) operates the website aidevinfo.online (and related
          pages). We provide information about AI tools, services, tutorials, and advertising
          opportunities.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>We may collect:</p>
        <ul>
          <li>
            Information you send us (name, email, message content) via the contact form or email.
          </li>
          <li>
            Basic technical data such as browser type, device, and pages visited (via hosting or
            analytics providers, if enabled).
          </li>
          <li>
            Cookies and similar technologies used for site functionality, analytics, and advertising
            (if enabled).
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use information</h2>
        <ul>
          <li>To respond to inquiries and provide support.</li>
          <li>To operate, secure, and improve the website.</li>
          <li>To show advertising (for example Google AdSense) if enabled on the site.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of information</h2>
        <p>
          We do not sell your personal information. We may share data with service providers who
          help us run the site (hosting, email delivery, analytics, advertising), only as needed
          to provide those services.
        </p>
      </section>

      <section>
        <h2>5. Third-party services</h2>
        <p>
          Our site may include links to third-party AI tools and services. Their privacy practices
          are governed by their own policies. If we use Google AdSense or similar ad networks,
          those providers may use cookies and collect data as described in their policies.
        </p>
      </section>

      <section>
        <h2>6. Data retention</h2>
        <p>
          We keep contact and email records only as long as needed to respond to you and operate
          the business, unless a longer period is required by law.
        </p>
      </section>

      <section>
        <h2>7. Your choices</h2>
        <p>
          You can email us to request access, correction, or deletion of personal information we
          hold about you, subject to applicable law.
        </p>
      </section>

      <section>
        <h2>8. Children</h2>
        <p>
          The site is not directed at children under 13. We do not knowingly collect personal
          information from children.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          For privacy questions, contact us at{' '}
          <a href="mailto:aidevinfo3@gmail.com">aidevinfo3@gmail.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}
