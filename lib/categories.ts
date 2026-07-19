import { Category } from './types';

export const categories: Category[] = [
  {
    name: 'AI Chatbots',
    slug: 'ai-chatbots',
    description: 'Conversational AI assistants for chat, support, and more.',
    icon: 'MessageSquare',
    count: 8,
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    name: 'Image Generation',
    slug: 'image-generation',
    description: 'Create stunning visuals and artwork from text prompts.',
    icon: 'Image',
    count: 6,
    color: 'from-emerald-800 to-emerald-950',
  },
  {
    name: 'Video Generation',
    slug: 'video-generation',
    description: 'Generate and edit videos with AI-powered tools.',
    icon: 'Video',
    count: 4,
    color: 'from-stone-700 to-stone-900',
  },
  {
    name: 'AI Coding',
    slug: 'ai-coding',
    description: 'Code faster with AI pair programmers and assistants.',
    icon: 'Code2',
    count: 5,
    color: 'from-teal-800 to-teal-950',
  },
  {
    name: 'AI Writing',
    slug: 'ai-writing',
    description: 'Generate articles, copy, and content with AI writers.',
    icon: 'PenTool',
    count: 4,
    color: 'from-zinc-600 to-zinc-800',
  },
  {
    name: 'Automation',
    slug: 'automation',
    description: 'Automate workflows and repetitive tasks with AI.',
    icon: 'Workflow',
    count: 3,
    color: 'from-emerald-700 to-emerald-900',
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    description: 'AI-powered marketing tools for growth and analytics.',
    icon: 'Megaphone',
    count: 5,
    color: 'from-stone-600 to-stone-800',
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    description: 'Boost your productivity with smart AI assistants.',
    icon: 'Zap',
    count: 4,
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    name: 'Voice AI',
    slug: 'voice-ai',
    description: 'Text-to-speech, voice cloning, and audio generation.',
    icon: 'Mic',
    count: 3,
    color: 'from-teal-700 to-teal-900',
  },
  {
    name: 'Business AI',
    slug: 'business-ai',
    description: 'Enterprise AI solutions for business operations.',
    icon: 'Building2',
    count: 6,
    color: 'from-neutral-700 to-neutral-900',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
