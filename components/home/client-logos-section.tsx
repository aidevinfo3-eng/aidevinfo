import { SectionHeading } from '@/components/shared/section-heading';

const clients = [
  { name: 'Microsoft', src: '/logos/microsoft.svg' },
  { name: 'Google', src: '/logos/google.svg' },
  { name: 'Airbnb', src: '/logos/airbnb.svg' },
  { name: 'HubSpot', src: '/logos/hubspot.svg' },
  { name: 'Shopify', src: '/logos/shopify.svg' },
  { name: 'Adobe', src: '/logos/adobe.svg' },
  { name: 'Slack', src: '/logos/slack.svg' },
  { name: 'Notion', src: '/logos/notion.svg' },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div
      className="flex shrink-0 items-center gap-2.5 text-foreground/55"
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
      />
      <span className="whitespace-nowrap font-display text-xl sm:text-2xl">
        {name}
      </span>
    </div>
  );
}

export function ClientLogosSection() {
  const track = [...clients, ...clients];

  return (
    <section className="border-y border-border bg-card py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Clients"
          title="Trusted by businesses worldwide"
          description="Join hundreds of startups and enterprises building the future with AI."
        />
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent sm:w-20" />

        <div className="flex w-max animate-marquee gap-10 pe-10 motion-reduce:animate-none sm:gap-14 sm:pe-14 hover:[animation-play-state:paused]">
          {track.map((client, i) => (
            <LogoItem
              key={`${client.name}-${i}`}
              name={client.name}
              src={client.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
