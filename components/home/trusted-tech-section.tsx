const technologies = [
  'OpenAI',
  'Anthropic',
  'Google AI',
  'Microsoft',
  'Meta AI',
  'NVIDIA',
  'Hugging Face',
  'AWS',
];

export function TrustedTechSection() {
  return (
    <section className="border-y border-border bg-card py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by leading AI technologies
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {technologies.map((name) => (
            <span
              key={name}
              className="font-display text-lg text-foreground/70 transition-colors hover:text-foreground sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
