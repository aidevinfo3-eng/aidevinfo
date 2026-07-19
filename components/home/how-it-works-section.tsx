import { SectionHeading } from '@/components/shared/section-heading';

const steps = [
  {
    step: '01',
    title: 'Discover',
    description:
      'Find the best AI tools, services, resources, and expert insights all in one place.',
  },
  {
    step: '02',
    title: 'Build',
    description:
      'Work with our expert AI developers to build custom solutions tailored to your needs.',
  },
  {
    step: '03',
    title: 'Grow',
    description:
      'Scale your business with AI, automate processes, and stay ahead of the competition.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Simple Process"
          title="How it works"
          description="From discovery to growth — a clear path to building with AI."
          center={false}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.title}
              className="border border-border bg-card p-7 sm:p-8"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                Step {item.step}
              </span>
              <h3 className="mt-5 font-display text-3xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
