import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { EmeraldGradientSection } from '@/components/shared/emerald-gradient-section';
import { ProcessStepGrid } from '@/components/shared/process-step-grid';
import {
  AI_APPLICATION_LIFECYCLE_HEADING,
  AI_APPLICATION_LIFECYCLE_STEPS,
  type LifecycleStep,
} from '@/lib/ai-application-lifecycle';

type AiLifecycleBandProps = {
  id?: string;
  compact?: boolean;
  title?: string;
  description?: string;
  steps?: LifecycleStep[];
  /** Primary CTA below the grid */
  action?: { label: string; href: string };
};

/** Shared “AI application development lifecycle” section — emerald gradient, no hero image. */
export function AiLifecycleBand({
  id,
  compact = false,
  title = AI_APPLICATION_LIFECYCLE_HEADING.title,
  description = AI_APPLICATION_LIFECYCLE_HEADING.description,
  steps = AI_APPLICATION_LIFECYCLE_STEPS,
  action = {
    label: 'Explore AI development services',
    href: '/development-services',
  },
}: AiLifecycleBandProps) {
  return (
    <EmeraldGradientSection id={id} compact={compact}>
      <SectionHeading
        title={title}
        description={description}
        center={false}
        tone="inverse"
        className="max-w-2xl"
      />
      <ProcessStepGrid steps={steps} />
      {action ? (
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="h-12 bg-white text-foreground hover:bg-white/90 group"
          >
            <Link href={action.href}>
              {action.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      ) : null}
    </EmeraldGradientSection>
  );
}
