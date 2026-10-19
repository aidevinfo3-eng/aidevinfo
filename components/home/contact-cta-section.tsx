import Link from 'next/link';
import { ArrowRight, Bot, Database, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeAtmosphereShell } from '@/components/home/home-atmosphere-shell';

const buildTracks = [
  {
    icon: Bot,
    label: 'AI agents',
    detail: 'Tools, workflows & task automation',
  },
  {
    icon: Database,
    label: 'RAG systems',
    detail: 'Docs, data & retrieval pipelines',
  },
  {
    icon: Sparkles,
    label: 'LLM products',
    detail: 'Integrations, prompts & UX',
  },
];

/** Left-aligned cards: small → medium → large (wider on the right each step). */
function trackCardMaxWidth(index: number) {
  const steps = ['calc(100% - 5.5rem)', 'calc(100% - 2.75rem)', '100%'] as const;
  return steps[index] ?? '100%';
}

export function ContactCtaSection() {
  return (
    <HomeAtmosphereShell>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-5">
          <h2 className="font-display text-3xl font-normal leading-[1.12] text-white/95 sm:text-4xl lg:text-[2.65rem] text-balance">
            Need help with an AI project?
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base">
            Evaluating an AI idea or planning an AI-powered product? Explore development
            resources or talk with us about agents, RAG, LLM integration, and custom software.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-foreground"
            >
              <Link href="/contact">Contact AI Dev Info</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:col-span-6 lg:block xl:col-span-7">
          <svg
            className="pointer-events-none absolute -right-4 top-1/2 h-[min(100%,320px)] w-full max-w-md -translate-y-1/2 text-emerald-400/15"
            viewBox="0 0 520 320"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path
              d="M40 200 L200 120 L360 200 L480 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle cx="40" cy="200" r="4" fill="currentColor" />
            <circle cx="200" cy="120" r="4" fill="currentColor" />
            <circle cx="360" cy="200" r="4" fill="currentColor" />
            <circle cx="480" cy="160" r="4" fill="currentColor" />
          </svg>
          <ul className="relative flex w-full flex-col items-start gap-4">
            {buildTracks.map((track, index) => (
              <li
                key={track.label}
                className="home-cta-banner__glass home-cta-banner__track flex w-full gap-4 p-5"
                style={{ maxWidth: trackCardMaxWidth(index) }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-white/10">
                  <track.icon className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg text-white/95">{track.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{track.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeAtmosphereShell>
  );
}
