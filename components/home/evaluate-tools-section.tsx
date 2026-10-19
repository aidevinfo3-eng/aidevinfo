import Link from 'next/link';
import {
  ArrowRight,
  CircleDollarSign,
  GitCompare,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { EmeraldBandButton } from '@/components/shared/emerald-band-button';
import { EmeraldGlassCard } from '@/components/shared/emerald-glass-card';
import { EmeraldGradientSection } from '@/components/shared/emerald-gradient-section';
import { SectionHeading } from '@/components/shared/section-heading';

const criteria: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: GitCompare,
    title: 'Beyond feature lists',
    description:
      'Capabilities, use cases, pricing, and limitations—not just marketing copy.',
  },
  {
    icon: CircleDollarSign,
    title: 'Fit for real work',
    description:
      'Alternatives and practical fit for development, business, and creative workflows.',
  },
  {
    icon: ShieldCheck,
    title: 'Checked when we can',
    description:
      'Important details verified against official sources as products change.',
  },
];

const rubricPreview = [
  { label: 'Capabilities', score: 4 },
  { label: 'Use cases', score: 5 },
  { label: 'Pricing clarity', score: 3 },
  { label: 'Limitations', score: 4 },
  { label: 'Alternatives', score: 5 },
];

export function EvaluateToolsSection() {
  return (
    <EmeraldGradientSection>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            title="How we evaluate AI tools"
            description="AI tools change fast. Our goal is useful information that helps you decide—not to recommend every tool."
            center={false}
            tone="inverse"
            className="max-w-md"
          />

          <EmeraldGlassCard className="relative mt-10 overflow-hidden p-6" aria-hidden>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Evaluation snapshot
            </p>
            <p className="mt-2 font-display text-xl text-white/95">Sample review lens</p>
            <ul className="mt-6 space-y-3">
              {rubricPreview.map((row) => (
                <li key={row.label} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-sm text-white/55">{row.label}</span>
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`h-1.5 flex-1 rounded-full ${
                          n <= row.score ? 'bg-emerald-400/90' : 'bg-white/15'
                        }`}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-white/45">
              Illustrative bars—not a score for any single product.
            </p>
          </EmeraldGlassCard>

          <EmeraldBandButton asChild className="mt-8 group">
            <Link href="/about#tool-evaluation">
              Full evaluation framework
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </EmeraldBandButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 lg:gap-5">
          {criteria.map((item, index) => (
            <article key={item.title} className="emerald-step-card flex gap-5 p-6 sm:p-7">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-emerald-400/25 bg-emerald-500/10 text-emerald-200">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-medium tabular-nums text-white/45">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl text-white/95">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </EmeraldGradientSection>
  );
}
