import 'server-only';

import { client, hasSanityConfig } from './sanity';
import { allDevelopmentServicesQuery } from './sanity-queries';

export type DevelopmentService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
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
    metaTitle: 'AI Chatbot Development Services | Custom AI Solutions',
    metaDescription:
      'AI Chatbot Development services to build smart, custom chatbots for customer support, sales, lead generation, and business automation.',
    icon: 'Bot',
    order: 1,
  },
  {
    id: 'ai-agent-development',
    title: 'AI Agent Development',
    slug: 'ai-agent-development',
    description:
      'Create autonomous AI agents that can think, act, and perform tasks.',
    metaTitle: 'AI Agent Development Company | Custom AI Agents',
    metaDescription:
      'Transform your business with AI Agent Development services. Build intelligent AI agents that automate tasks, workflows, and drive business growth.',
    icon: 'Brain',
    order: 2,
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    slug: 'ai-automation',
    description:
      'Automate repetitive tasks and workflows with intelligent AI solutions.',
    metaTitle: 'AI Automation Services | Automate Business Processes',
    icon: 'Workflow',
    order: 3,
  },
  {
    id: 'custom-gpt-solutions',
    title: 'Custom GPT Solutions',
    slug: 'custom-gpt-solutions',
    description:
      'Develop custom GPTs and AI assistants tailored specifically to your business.',
    metaTitle: 'Custom GPT Solutions | AI Solutions for Business Automation',
    icon: 'Sparkles',
    order: 4,
  },
  {
    id: 'ai-saas-development',
    title: 'AI SaaS Development',
    slug: 'ai-saas-development',
    description:
      'Launch powerful AI SaaS products with scalable architecture.',
    metaTitle: 'AI SaaS Development Services | Build Scalable AI Products',
    metaDescription:
      'Build scalable AI SaaS products with expert development services. Launch secure, intelligent, and high-performance SaaS solutions for your business.',
    icon: 'Cloud',
    order: 5,
  },
  {
    id: 'llm-integration',
    title: 'LLM Integration',
    slug: 'llm-integration',
    description:
      'Integrate models like OpenAI, Claude, Gemini, Llama, and more into your apps.',
    metaTitle: 'LLM Integration Services for AI-Powered Applications',
    icon: 'Cpu',
    order: 6,
  },
  {
    id: 'rag-applications',
    title: 'RAG Applications',
    slug: 'rag-applications',
    description:
      'Build Retrieval-Augmented Generation apps for accurate AI responses.',
    metaTitle: 'RAG Development Services | Build Custom RAG Apps',
    metaDescription:
      'Explore custom RAG Applications for smarter AI solutions. Build accurate, context-aware AI systems that connect your data with powerful retrieval.',
    icon: 'Database',
    order: 7,
  },
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    slug: 'ai-consulting',
    description:
      'Get expert guidance to implement AI strategies in your business.',
    metaTitle: 'AI Consulting for Business | AI Strategy & Solutions',
    metaDescription:
      'Expert AI Consulting to build smarter strategies, automate workflows, and implement AI solutions that improve efficiency, growth, and business results.',
    icon: 'Lightbulb',
    order: 8,
  },
];

type SanityDevelopmentService = {
  _id: string;
  title: string;
  slug: string | null;
  description: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  icon: string | null;
  order: number | null;
};

function mapSanityService(doc: SanityDevelopmentService): DevelopmentService {
  const slug = doc.slug || doc._id;
  const fallback = fallbackDevelopmentServices.find((s) => s.slug === slug);

  return {
    id: doc._id,
    title: doc.title,
    slug,
    description: doc.description,
    metaTitle: doc.metaTitle || fallback?.metaTitle,
    metaDescription: doc.metaDescription || fallback?.metaDescription,
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
      { next: { revalidate: 60 } }
    );
    if (!docs?.length) return fallbackDevelopmentServices;
    return docs.map(mapSanityService);
  } catch (error) {
    console.error('Sanity development services fetch failed:', error);
    return fallbackDevelopmentServices;
  }
}

export async function getDevelopmentServiceBySlug(
  slug: string
): Promise<DevelopmentService | null> {
  const services = await getDevelopmentServices();
  return services.find((service) => service.slug === slug) ?? null;
}
