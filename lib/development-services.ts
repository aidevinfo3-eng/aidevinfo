import 'server-only';

import { client, hasSanityConfig } from './sanity';
import { allDevelopmentServicesQuery } from './sanity-queries';

export type DevelopmentService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
};

export const fallbackDevelopmentServices: DevelopmentService[] = [
  {
    id: 'ai-chatbot-development',
    title: 'AI Chatbot Development',
    slug: 'ai-chatbot-development',
    description:
      'Build smart AI chatbots for customer support, sales, and engagement.',
    icon: 'Bot',
    order: 1,
  },
  {
    id: 'ai-agent-development',
    title: 'AI Agent Development',
    slug: 'ai-agent-development',
    description:
      'Create autonomous AI agents that can think, act, and perform tasks.',
    icon: 'Brain',
    order: 2,
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    slug: 'ai-automation',
    description:
      'Automate repetitive tasks and workflows with intelligent AI solutions.',
    icon: 'Workflow',
    order: 3,
  },
  {
    id: 'custom-gpt-solutions',
    title: 'Custom GPT Solutions',
    slug: 'custom-gpt-solutions',
    description:
      'Develop custom GPTs and AI assistants tailored specifically to your business.',
    icon: 'Sparkles',
    order: 4,
  },
  {
    id: 'ai-saas-development',
    title: 'AI SaaS Development',
    slug: 'ai-saas-development',
    description:
      'Launch powerful AI SaaS products with scalable architecture.',
    icon: 'Cloud',
    order: 5,
  },
  {
    id: 'llm-integration',
    title: 'LLM Integration',
    slug: 'llm-integration',
    description:
      'Integrate models like OpenAI, Claude, Gemini, Llama, and more into your apps.',
    icon: 'Cpu',
    order: 6,
  },
  {
    id: 'rag-applications',
    title: 'RAG Applications',
    slug: 'rag-applications',
    description:
      'Build Retrieval-Augmented Generation apps for accurate AI responses.',
    icon: 'Database',
    order: 7,
  },
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    slug: 'ai-consulting',
    description:
      'Get expert guidance to implement AI strategies in your business.',
    icon: 'Lightbulb',
    order: 8,
  },
];

type SanityDevelopmentService = {
  _id: string;
  title: string;
  slug: string | null;
  description: string;
  icon: string | null;
  order: number | null;
};

function mapSanityService(doc: SanityDevelopmentService): DevelopmentService {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug || doc._id,
    description: doc.description,
    icon: doc.icon || 'Bot',
    order: doc.order ?? 0,
  };
}

export async function getDevelopmentServices(): Promise<DevelopmentService[]> {
  if (!hasSanityConfig) return fallbackDevelopmentServices;

  try {
    const docs = await client.fetch<SanityDevelopmentService[]>(
      allDevelopmentServicesQuery,
      {},
      // { next: { revalidate: 60 } }
      { cache: 'no-store' }
    );
    if (!docs?.length) return fallbackDevelopmentServices;
    return docs.map(mapSanityService);
  } catch (error) {
    console.error('Sanity development services fetch failed:', error);
    return fallbackDevelopmentServices;
  }
}
