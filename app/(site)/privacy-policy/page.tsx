import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description:
    'Learn how AI Dev Info collects, uses, stores, and protects your personal information when you visit aidevinfo.online or use our services.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="At AI Dev Info, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit aidevinfo.online or use our services. By accessing or using our website, you agree to the practices described in this Privacy Policy."
      breadcrumbLabel="Privacy Policy"
      lastUpdated="July 23, 2026"
    >
      <section>
        <h2>1. Who We Are</h2>
        <p>AI Dev Info is an AI-focused platform that provides:</p>
        <ul>
          <li>AI Development Services</li>
          <li>AI Tools Directory</li>
          <li>AI Blogs &amp; Tutorials</li>
          <li>AI News &amp; Insights</li>
          <li>Sponsored Advertising</li>
          <li>Business Promotion Services</li>
        </ul>
        <p>
          Our goal is to help businesses and individuals discover trusted AI solutions,
          learn about artificial intelligence, and connect with AI service providers.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information.</p>

        <h3 className="!mt-6 !mb-2 font-display !text-lg !text-foreground">
          Personal Information
        </h3>
        <p>You may voluntarily provide information such as:</p>
        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Company Name</li>
          <li>Phone Number (if provided)</li>
          <li>Country or Region</li>
          <li>Business Information</li>
          <li>Contact Form Details</li>
          <li>Advertising Inquiry Information</li>
        </ul>

        <h3 className="!mt-6 !mb-2 font-display !text-lg !text-foreground">
          Account Information
        </h3>
        <p>If account registration becomes available, we may collect:</p>
        <ul>
          <li>Username</li>
          <li>Email Address</li>
          <li>Password (encrypted)</li>
          <li>Profile Information</li>
        </ul>

        <h3 className="!mt-6 !mb-2 font-display !text-lg !text-foreground">
          Automatically Collected Information
        </h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>IP Address</li>
          <li>Browser Type</li>
          <li>Device Information</li>
          <li>Operating System</li>
          <li>Referral Source</li>
          <li>Pages Visited</li>
          <li>Time Spent on Website</li>
          <li>Click Activity</li>
          <li>Date &amp; Time of Visit</li>
        </ul>

        <h3 className="!mt-6 !mb-2 font-display !text-lg !text-foreground">
          Cookies &amp; Similar Technologies
        </h3>
        <p>
          We use cookies and similar technologies to improve your browsing experience and
          website performance.
        </p>
        <p>Cookies may be used to:</p>
        <ul>
          <li>Remember user preferences</li>
          <li>Improve website performance</li>
          <li>Analyze traffic</li>
          <li>Measure advertising performance</li>
          <li>Personalize content</li>
        </ul>
        <p>You can disable cookies through your browser settings.</p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide AI development services</li>
          <li>Respond to inquiries</li>
          <li>Improve website functionality</li>
          <li>Publish AI tools and services</li>
          <li>Deliver newsletters</li>
          <li>Send important updates</li>
          <li>Analyze website performance</li>
          <li>Prevent fraud and abuse</li>
          <li>Improve customer support</li>
          <li>Process advertising requests</li>
          <li>Enhance user experience</li>
        </ul>
      </section>

      <section>
        <h2>4. AI Tools Directory</h2>
        <p>
          Our website lists third-party AI tools and software. We do not own or operate most
          of these tools.
        </p>
        <p>
          When you visit a third-party website from our directory, their own Privacy Policy
          and Terms of Service apply. We encourage users to review the privacy policies of
          any third-party websites before providing personal information.
        </p>
      </section>

      <section>
        <h2>5. AI Development Services</h2>
        <p>
          When you contact us for AI development services, we may collect project-related
          information necessary to:
        </p>
        <ul>
          <li>Understand project requirements</li>
          <li>Prepare proposals</li>
          <li>Communicate during development</li>
          <li>Deliver AI solutions</li>
          <li>Provide ongoing support</li>
        </ul>
        <p>
          Project information remains confidential unless disclosure is required by law.
        </p>
      </section>

      <section>
        <h2>6. Blog Comments &amp; User Content</h2>
        <p>
          If blog comments or community features are enabled, users are responsible for the
          information they choose to publish. Please avoid sharing confidential or sensitive
          information in public areas of the website.
        </p>
      </section>

      <section>
        <h2>7. Newsletter Subscription</h2>
        <p>If you subscribe to our newsletter, we may use your email address to send:</p>
        <ul>
          <li>AI News</li>
          <li>Product Updates</li>
          <li>AI Tutorials</li>
          <li>Industry Insights</li>
          <li>Promotional Content</li>
          <li>Service Announcements</li>
        </ul>
        <p>
          You can unsubscribe at any time using the unsubscribe link included in every email.
        </p>
      </section>

      <section>
        <h2>8. Advertising &amp; Sponsored Content</h2>
        <p>
          AI Dev Info may publish sponsored listings, advertisements, featured articles, and
          promotional content. Sponsored content will be clearly identified where appropriate.
        </p>
        <p>
          Advertisers do not receive your personal information unless you voluntarily contact
          them.
        </p>
      </section>

      <section>
        <h2>9. Analytics</h2>
        <p>We may use analytics services to understand website usage, including:</p>
        <ul>
          <li>Google Analytics (or similar analytics platforms)</li>
          <li>Search Console data</li>
          <li>Website performance monitoring</li>
        </ul>
        <p>
          Analytics information helps us improve content quality and user experience.
        </p>
      </section>

      <section>
        <h2>10. Third-Party Services</h2>
        <p>
          Our website may integrate with third-party services, including but not limited to:
        </p>
        <ul>
          <li>OpenAI</li>
          <li>Google</li>
          <li>Microsoft</li>
          <li>Anthropic</li>
          <li>Vercel</li>
          <li>Cloud Hosting Providers</li>
          <li>Email Marketing Platforms</li>
          <li>Payment Providers (if applicable)</li>
        </ul>
        <p>Each third-party provider has its own privacy practices.</p>
      </section>

      <section>
        <h2>11. Data Security</h2>
        <p>
          We implement reasonable technical and organizational security measures to protect
          your information, including:
        </p>
        <ul>
          <li>Secure Hosting</li>
          <li>SSL Encryption</li>
          <li>Access Controls</li>
          <li>Regular Security Updates</li>
          <li>Data Backup Procedures</li>
        </ul>
        <p>However, no online platform can guarantee absolute security.</p>
      </section>

      <section>
        <h2>12. Data Retention</h2>
        <p>We retain personal information only for as long as necessary to:</p>
        <ul>
          <li>Provide requested services</li>
          <li>Meet legal obligations</li>
          <li>Resolve disputes</li>
          <li>Improve our platform</li>
        </ul>
        <p>
          When information is no longer required, it will be securely deleted or anonymized
          where practical.
        </p>
      </section>

      <section>
        <h2>13. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Restrict data processing</li>
          <li>Object to processing</li>
          <li>Withdraw consent</li>
          <li>Request a copy of your data</li>
        </ul>
        <p>To exercise these rights, please contact us.</p>
      </section>

      <section>
        <h2>14. Children&apos;s Privacy</h2>
        <p>
          AI Dev Info is not intended for children under the age of 13. We do not knowingly
          collect personal information from children. If we become aware that such information
          has been collected, we will take reasonable steps to delete it.
        </p>
      </section>

      <section>
        <h2>15. International Users</h2>
        <p>
          If you access AI Dev Info from outside Pakistan, your information may be processed
          and stored in jurisdictions where our service providers operate. By using our
          website, you consent to such transfers where permitted by applicable law.
        </p>
      </section>

      <section>
        <h2>16. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in our services,
          legal requirements, or business practices. Any updates will be posted on this page
          with the revised Last Updated date.
        </p>
      </section>

      <section>
        <h2>17. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how we handle your
          information, please contact us.
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
            <a href="mailto:aidevinfo3@gmail.com">aidevinfo3@gmail.com</a>
          </li>
          <li>
            Contact Page:{' '}
            <a href="/contact">https://aidevinfo.online/contact</a>
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
