import fs from 'fs';
import path from 'path';
import { createClient } from 'next-sanity';
import { categories } from '../lib/categories';

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

const countLabels: Record<string, string> = {
  'ai-chatbots': '120+',
  'ai-coding': '160+',
  'ai-writing': '200+',
  'image-generation': '150+',
  'video-generation': '100+',
  marketing: '120+',
  'business-ai': '150+',
  automation: '90+',
  productivity: '110+',
  'voice-ai': '80+',
};

const homeSlugs = new Set([
  'ai-chatbots',
  'ai-coding',
  'ai-writing',
  'image-generation',
  'video-generation',
  'marketing',
  'business-ai',
]);

async function seed() {
  console.log(`Seeding ${categories.length} tool categories into Sanity...`);

  for (const [index, category] of categories.entries()) {
    await client.createOrReplace({
      _id: `tool-category-${category.slug}`,
      _type: 'toolCategory',
      name: category.name,
      slug: { _type: 'slug', current: category.slug },
      description: category.description,
      icon: category.icon,
      countLabel: countLabels[category.slug] ?? `${category.count}+`,
      order: index + 1,
      showOnHome: homeSlugs.has(category.slug),
      published: true,
    });
    console.log(`  ✓ ${category.name}`);
  }

  console.log('Done.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
