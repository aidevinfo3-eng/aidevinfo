import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Cookie Policy',
  description:
    'How AI Dev Info uses cookies and similar technologies on our website.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="This policy explains how we use cookies and similar technologies."
      breadcrumbLabel="Cookie Policy"
    >
      <section>
        <h2>1. What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help
          sites remember preferences, understand traffic, and support features like advertising.
        </p>
      </section>

      <section>
        <h2>2. How we use cookies</h2>
        <p>We may use cookies and similar technologies to:</p>
        <ul>
          <li>Keep the site working reliably (essential / technical cookies).</li>
          <li>Understand how visitors use the site (analytics, if enabled).</li>
          <li>Deliver and measure advertising (for example Google AdSense, if enabled).</li>
          <li>Remember preferences where applicable.</li>
        </ul>
      </section>

      <section>
        <h2>3. Types of cookies</h2>
        <ul>
          <li>
            <strong className="text-foreground">Essential:</strong> needed for basic site
            operation and security.
          </li>
          <li>
            <strong className="text-foreground">Analytics:</strong> help us see which pages are
            popular and improve the experience.
          </li>
          <li>
            <strong className="text-foreground">Advertising:</strong> used by ad partners to show
            relevant ads and limit how often you see them.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Third-party cookies</h2>
        <p>
          Third parties such as hosting providers, analytics tools, or ad networks may set their
          own cookies when their scripts run on our pages. Those parties control their own cookie
          use under their privacy policies.
        </p>
      </section>

      <section>
        <h2>5. Managing cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. Blocking some cookies
          may affect site functionality. For advertising cookies, you may also use industry opt-out
          tools where available.
        </p>
      </section>

      <section>
        <h2>6. Updates</h2>
        <p>
          We may update this Cookie Policy when our practices or partners change. The &quot;Last
          updated&quot; date at the top of this page will change when we do.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          Cookie-related questions: <a href="mailto:aidevinfo3@gmail.com">aidevinfo3@gmail.com</a>.
          See also our <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>
    </LegalPage>
  );
}
