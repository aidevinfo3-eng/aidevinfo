import { SectionHeading } from '@/components/shared/section-heading';

const clients = [
  'Microsoft',
  'Google',
  'Airbnb',
  'HubSpot',
  'Shopify',
  'Adobe',
  'Slack',
  'Notion',
];

export function ClientLogosSection() {
  return (
    <section className="border-y border-border bg-card py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Clients"
          title="Trusted by businesses worldwide"
          description="Join hundreds of startups and enterprises building the future with AI."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {clients.map((name) => (
            <span
              key={name}
              className="font-display text-xl text-foreground/75 transition-colors hover:text-foreground sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
