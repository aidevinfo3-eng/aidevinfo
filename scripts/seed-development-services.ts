import fs from 'fs';
import path from 'path';
import { createClient } from 'next-sanity';

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const services = [
  {
    _id: 'dev-service-ai-chatbot-development',
    title: 'AI Chatbot Development',
    slug: 'ai-chatbot-development',
    description:
      'Build smart AI chatbots for customer support, sales, and engagement.',
    icon: 'Bot',
    order: 1,
  },
  {
    _id: 'dev-service-ai-agent-development',
    title: 'AI Agent Development',
    slug: 'ai-agent-development',
    description:
      'Create autonomous AI agents that can think, act, and perform tasks.',
    icon: 'Brain',
    order: 2,
  },
  {
    _id: 'dev-service-ai-automation',
    title: 'AI Automation',
    slug: 'ai-automation',
    description:
      'Automate repetitive tasks and workflows with intelligent AI solutions.',
    icon: 'Workflow',
    order: 3,
  },
  {
    _id: 'dev-service-custom-gpt-solutions',
    title: 'Custom GPT Solutions',
    slug: 'custom-gpt-solutions',
    description:
      'Develop custom GPTs and AI assistants tailored specifically to your business.',
    icon: 'Sparkles',
    order: 4,
  },
  {
    _id: 'dev-service-ai-saas-development',
    title: 'AI SaaS Development',
    slug: 'ai-saas-development',
    description:
      'Launch powerful AI SaaS products with scalable architecture.',
    icon: 'Cloud',
    order: 5,
  },
  {
    _id: 'dev-service-llm-integration',
    title: 'LLM Integration',
    slug: 'llm-integration',
    description:
      'Integrate models like OpenAI, Claude, Gemini, Llama, and more into your apps.',
    icon: 'Cpu',
    order: 6,
  },
  {
    _id: 'dev-service-rag-applications',
    title: 'RAG Applications',
    slug: 'rag-applications',
    description:
      'Build Retrieval-Augmented Generation apps for accurate AI responses.',
    icon: 'Database',
    order: 7,
  },
  {
    _id: 'dev-service-ai-consulting',
    title: 'AI Consulting',
    slug: 'ai-consulting',
    description:
      'Get expert guidance to implement AI strategies in your business.',
    icon: 'Lightbulb',
    order: 8,
  },
];

async function seed() {
  console.log(`Seeding ${services.length} development services into Sanity...`);

  for (const service of services) {
    await client.createOrReplace({
      _id: service._id,
      _type: 'developmentService',
      title: service.title,
      slug: { _type: 'slug', current: service.slug },
      description: service.description,
      icon: service.icon,
      order: service.order,
      published: true,
    });
    console.log(`  ✓ ${service.title}`);
  }

  console.log('Done.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
