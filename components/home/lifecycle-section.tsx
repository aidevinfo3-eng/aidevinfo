import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { HomeAtmosphereShell } from '@/components/home/home-atmosphere-shell';

const steps = [
  {
    step: '01',
    title: 'Define',
    description:
      'Identify the problem, users, requirements, constraints, and desired outcome.',
  },
  {
    step: '02',
    title: 'Plan',
    description:
      'Choose architecture, model strategy, data approach, integrations, and stack.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Develop integrations, prompts, retrieval, tools, workflows, and UX.',
  },
  {
    step: '04',
    title: 'Evaluate',
    description:
      'Test accuracy, reliability, safety, latency, cost, and overall quality.',
  },
  {
    step: '05',
    title: 'Deploy',
    description:
      'Ship with monitoring, security controls, and operational safeguards.',
  },
  {
    step: '06',
    title: 'Improve',
    description:
      'Use evaluation, monitoring, and real usage to iterate on the application.',
  },
];

export function LifecycleSection() {
  return (
    <HomeAtmosphereShell compact>
      <SectionHeading
        title="AI application development lifecycle"
        description="Building production AI takes more than an API call—models, data, retrieval, tools, security, evaluation, and UX all matter."
        center={false}
        tone="inverse"
        className="max-w-2xl"
      />

      <div className="relative mt-12">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent lg:block"
          aria-hidden
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {steps.map((item) => (
            <li key={item.step} className="home-cta-banner__glass p-6 sm:p-7">
              <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-sm border border-emerald-400/30 bg-emerald-500/15 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-2xl text-white/95">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10">
        <Button
          asChild
          size="lg"
          className="h-12 bg-white text-foreground hover:bg-white/90 group"
        >
          <Link href="/development-services">
            Explore AI development services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </HomeAtmosphereShell>
  );
}
