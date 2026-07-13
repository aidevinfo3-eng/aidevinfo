import { Category } from './types';

export const categories: Category[] = [
  {
    name: 'AI Chatbots',
    slug: 'ai-chatbots',
    description: 'Conversational AI assistants for chat, support, and more.',
    icon: 'MessageSquare',
    count: 8,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Image Generation',
    slug: 'image-generation',
    description: 'Create stunning visuals and artwork from text prompts.',
    icon: 'Image',
    count: 6,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Video Generation',
    slug: 'video-generation',
    description: 'Generate and edit videos with AI-powered tools.',
    icon: 'Video',
    count: 4,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'AI Coding',
    slug: 'ai-coding',
    description: 'Code faster with AI pair programmers and assistants.',
    icon: 'Code2',
    count: 5,
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'AI Writing',
    slug: 'ai-writing',
    description: 'Generate articles, copy, and content with AI writers.',
    icon: 'PenTool',
    count: 4,
    color: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Automation',
    slug: 'automation',
    description: 'Automate workflows and repetitive tasks with AI.',
    icon: 'Workflow',
    count: 3,
    color: 'from-cyan-500 to-teal-500',
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    description: 'AI-powered marketing tools for growth and analytics.',
    icon: 'Megaphone',
    count: 5,
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    description: 'Boost your productivity with smart AI assistants.',
    icon: 'Zap',
    count: 4,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Voice AI',
    slug: 'voice-ai',
    description: 'Text-to-speech, voice cloning, and audio generation.',
    icon: 'Mic',
    count: 3,
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Business AI',
    slug: 'business-ai',
    description: 'Enterprise AI solutions for business operations.',
    icon: 'Building2',
    count: 6,
    color: 'from-slate-600 to-slate-800',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
