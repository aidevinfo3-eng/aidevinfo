import type { ProcessStep } from '@/lib/process-step';

export type LifecycleStep = ProcessStep;

export const AI_APPLICATION_LIFECYCLE_STEPS: ProcessStep[] = [
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

export const AI_APPLICATION_LIFECYCLE_HEADING = {
  title: 'AI application development lifecycle',
  description:
    'Building production AI takes more than an API call—models, data, retrieval, tools, security, evaluation, and UX all matter.',
};
