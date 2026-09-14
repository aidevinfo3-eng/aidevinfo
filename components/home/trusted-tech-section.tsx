const technologies = [
  { name: 'OpenAI', src: '/logos/openai.svg', alt: 'OpenAI logo' },
  { name: 'Anthropic', src: '/logos/anthropic.svg', alt: 'Anthropic logo' },
  { name: 'Google AI', src: '/logos/google.svg', alt: 'Google AI logo' },
  { name: 'Microsoft', src: '/logos/microsoft.svg', alt: 'Microsoft logo' },
  { name: 'Meta AI', src: '/logos/meta.svg', alt: 'Meta AI logo' },
  { name: 'NVIDIA', src: '/logos/nvidia.svg', alt: 'NVIDIA AI technology logo' },
  {
    name: 'Hugging Face',
    src: '/logos/huggingface.svg',
    alt: 'Hugging Face AI platform logo',
  },
  { name: 'AWS', src: '/logos/aws.svg', alt: 'Amazon Web Services (AWS) logo' },
];

function LogoItem({
  name,
  src,
  alt,
}: {
  name: string;
  src: string;
  alt: string;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-2.5 text-foreground/70"
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={24}
        height={24}
        className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
      />
      <span className="whitespace-nowrap font-display text-base sm:text-lg">
        {name}
      </span>
    </div>
  );
}

export function TrustedTechSection() {
  const track = [...technologies, ...technologies];

  return (
    <section className="border-y border-border bg-card py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Trusted Partners
        </p>
      </div>

      <div className="relative mt-7 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent sm:w-20" />

        <div className="flex w-max animate-marquee gap-10 pe-10 motion-reduce:animate-none sm:gap-14 sm:pe-14 hover:[animation-play-state:paused]">
          {track.map((tech, i) => (
            <LogoItem
              key={`${tech.name}-${i}`}
              name={tech.name}
              src={tech.src}
              alt={tech.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
