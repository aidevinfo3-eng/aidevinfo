import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/shared/legal-page';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Terms of Service — Rules for Using Our AI Platform',
  description:
    'Terms of Service for AI Dev Info covering use of aidevinfo.online, AI services, tools directory, content, and advertising.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description='Welcome to AI Dev Info ("AI Dev Info", "we", "our", or "us"). These Terms of Service govern your access to and use of aidevinfo.online, including our AI services, AI tools directory, blog content, educational resources, advertising solutions, and all related features. By accessing or using our website, you agree to be legally bound by these Terms of Service. If you do not agree, please do not use our website or services.'
      breadcrumbLabel="Terms of Service"
      lastUpdated="July 23, 2026"
    >
      <section>
        <h2>1. About AI Dev Info</h2>
        <p>AI Dev Info is a platform dedicated to artificial intelligence, providing:</p>
        <ul>
          <li>AI Development Services</li>
          <li>AI Chatbot Development</li>
          <li>AI Agent Development</li>
          <li>AI Automation Solutions</li>
          <li>AI Consulting</li>
          <li>AI Integration Services</li>
          <li>AI Tools Directory</li>
          <li>AI Blogs &amp; Tutorials</li>
          <li>AI News &amp; Industry Insights</li>
          <li>Sponsored Advertising &amp; Featured Listings</li>
        </ul>
        <p>
          Our mission is to help businesses, developers, marketers, startups, and AI enthusiasts
          discover, build, and grow with artificial intelligence.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>By using AI Dev Info, you confirm that:</p>
        <ul>
          <li>
            You are at least 18 years old, or have permission from a parent or legal guardian.
          </li>
          <li>You have the legal authority to enter into this agreement.</li>
          <li>You will use our platform only for lawful purposes.</li>
          <li>All information you provide is accurate and up to date.</li>
        </ul>
      </section>

      <section>
        <h2>3. Acceptable Use</h2>
        <p>You agree to use AI Dev Info responsibly.</p>
        <p>You must not:</p>
        <ul>
          <li>Violate any applicable laws or regulations.</li>
          <li>Attempt unauthorized access to our systems.</li>
          <li>Upload malware, viruses, or harmful code.</li>
          <li>Interfere with website security or performance.</li>
          <li>Copy or scrape our content without permission.</li>
          <li>Misrepresent your identity or business.</li>
          <li>Use automated tools that negatively impact website performance.</li>
          <li>Engage in fraudulent or deceptive activities.</li>
        </ul>
      </section>

      <section>
        <h2>4. AI Development Services</h2>
        <p>AI Dev Info offers custom AI development and consulting services.</p>
        <p>
          Project scope, pricing, timelines, deliverables, and payment terms will be agreed upon
          separately through proposals, contracts, or written agreements.
        </p>
        <p>Unless explicitly agreed otherwise:</p>
        <ul>
          <li>Project estimates are based on the initial requirements provided.</li>
          <li>Additional features may require revised timelines or pricing.</li>
          <li>Final deliverables are provided after agreed payments are completed.</li>
        </ul>
      </section>

      <section>
        <h2>5. AI Tools Directory</h2>
        <p>
          Our AI Tools Directory is designed to help users discover third-party AI tools and
          software.
        </p>
        <p>Please note:</p>
        <ul>
          <li>We do not own or operate most tools listed in the directory.</li>
          <li>Tool descriptions are provided for informational purposes.</li>
          <li>Features, pricing, and availability may change without notice.</li>
          <li>
            Users should verify information directly with the respective tool provider before
            making decisions.
          </li>
        </ul>
        <p>AI Dev Info is not responsible for third-party products or services.</p>
      </section>

      <section>
        <h2>6. Blog Content &amp; Educational Resources</h2>
        <p>
          Our blogs, tutorials, guides, comparisons, and educational materials are intended for
          informational and educational purposes only.
        </p>
        <p>
          While we strive for accuracy, we cannot guarantee that all information is complete,
          current, or suitable for every situation. You should evaluate AI tools and business
          decisions independently.
        </p>
      </section>

      <section>
        <h2>7. Sponsored Content &amp; Advertising</h2>
        <p>AI Dev Info may publish:</p>
        <ul>
          <li>Sponsored Articles</li>
          <li>Featured AI Tools</li>
          <li>Banner Advertisements</li>
          <li>Promotional Listings</li>
          <li>Partnership Content</li>
        </ul>
        <p>
          Sponsored content may be labeled where appropriate. Publication of sponsored content
          does not constitute an endorsement or guarantee of the advertised products or services.
          Advertisers are responsible for the accuracy of the information they provide.
        </p>
      </section>

      <section>
        <h2>8. Intellectual Property</h2>
        <p>
          Unless otherwise stated, all original content on AI Dev Info—including text, graphics,
          branding, website design, logos, original illustrations, articles, layouts, and custom
          materials—is the property of AI Dev Info or its licensors and is protected by applicable
          intellectual property laws.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Copy or republish our original content without permission.</li>
          <li>Reproduce substantial portions of our website.</li>
          <li>Use our branding or logos without authorization.</li>
          <li>Create derivative works from our proprietary materials without consent.</li>
        </ul>
        <p>You may share links to our content with proper attribution.</p>
      </section>

      <section>
        <h2>9. User Submissions</h2>
        <p>
          If you submit content, inquiries, reviews, guest posts, or advertising materials, you
          confirm that:
        </p>
        <ul>
          <li>You have the necessary rights to submit the content.</li>
          <li>Your content does not infringe the rights of others.</li>
          <li>Your submission does not contain unlawful, harmful, or misleading material.</li>
        </ul>
        <p>
          We reserve the right to review, edit, reject, or remove submitted content where
          appropriate.
        </p>
      </section>

      <section>
        <h2>10. Third-Party Links</h2>
        <p>
          Our website contains links to third-party websites, AI tools, software providers, and
          external resources.
        </p>
        <p>We do not control or guarantee:</p>
        <ul>
          <li>Third-party content</li>
          <li>Security practices</li>
          <li>Privacy policies</li>
          <li>Availability of external services</li>
        </ul>
        <p>Accessing third-party websites is at your own risk.</p>
      </section>

      <section>
        <h2>11. Payments &amp; Refunds</h2>
        <p>For paid AI development services, consulting, or advertising:</p>
        <ul>
          <li>Pricing will be agreed before work begins.</li>
          <li>Payment terms will be outlined in the relevant proposal or invoice.</li>
          <li>
            Refund eligibility, if any, will depend on the specific agreement and the stage of
            work completed.
          </li>
        </ul>
      </section>

      <section>
        <h2>12. Availability of Services</h2>
        <p>
          We aim to keep AI Dev Info available and up to date, but we do not guarantee
          uninterrupted access.
        </p>
        <p>We may:</p>
        <ul>
          <li>Update the website.</li>
          <li>Modify features.</li>
          <li>Add or remove services.</li>
          <li>Perform maintenance.</li>
          <li>Suspend access temporarily for technical reasons.</li>
        </ul>
      </section>

      <section>
        <h2>13. Disclaimer of Warranties</h2>
        <p>
          AI Dev Info is provided on an &quot;as is&quot; and &quot;as available&quot; basis.
        </p>
        <p>To the maximum extent permitted by law, we do not guarantee that:</p>
        <ul>
          <li>The website will always be uninterrupted or error-free.</li>
          <li>All information will remain current at all times.</li>
          <li>Third-party AI tools will perform as described.</li>
          <li>Services will meet every user&apos;s specific expectations.</li>
        </ul>
      </section>

      <section>
        <h2>14. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, AI Dev Info shall not be liable for
          indirect, incidental, special, consequential, or punitive damages arising from the use
          of our website or services.
        </p>
        <p>
          Our total liability for any claim relating to paid services will not exceed the amount
          paid by the customer for the specific service giving rise to the claim, except where
          prohibited by law.
        </p>
      </section>

      <section>
        <h2>15. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless AI Dev Info, its owners, employees,
          contractors, and partners from claims, damages, liabilities, and expenses arising from
          your misuse of the website, violation of these Terms, or infringement of the rights of
          any third party.
        </p>
      </section>

      <section>
        <h2>16. Privacy</h2>
        <p>
          Your use of AI Dev Info is also governed by our{' '}
          <Link href="/privacy-policy">Privacy Policy</Link>, which explains how we collect, use,
          and protect your information.
        </p>
      </section>

      <section>
        <h2>17. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service from time to time to reflect changes in our
          services or legal requirements. Any updates will become effective once published on this
          page. Your continued use of AI Dev Info after changes are posted constitutes acceptance
          of the revised Terms.
        </p>
      </section>

      <section>
        <h2>18. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to AI Dev Info if a user:
        </p>
        <ul>
          <li>Violates these Terms.</li>
          <li>Engages in unlawful activity.</li>
          <li>Misuses our services.</li>
          <li>Attempts to compromise website security.</li>
        </ul>
      </section>

      <section>
        <h2>19. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with the laws applicable
          in the jurisdiction where AI Dev Info operates, unless otherwise required by applicable
          law.
        </p>
      </section>

      <section>
        <h2>20. Contact Us</h2>
        <p>
          If you have any questions regarding these Terms of Service, please contact us.
        </p>
        <ul>
          <li>
            Website:{' '}
            <a href="https://aidevinfo.online" target="_blank" rel="noopener noreferrer">
              https://aidevinfo.online
            </a>
          </li>
          <li>
            Email:{' '}
            <a href="mailto:legal@aidevinfo.online">legal@aidevinfo.online</a>
          </li>
          <li>
            Contact Page: <Link href="/contact">https://aidevinfo.online/contact</Link>
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
