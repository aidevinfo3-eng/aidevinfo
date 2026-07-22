import fs from 'fs';
import path from 'path';
import { createClient } from 'next-sanity';

const blogCategories = [
  'AI Coding',
  'AI Writing',
  'Image Generation',
  'Video Generation',
  'Voice AI',
  'Marketing',
  'Automation',
  'Business AI',
  'Productivity',
  'News',
  'Tutorials',
];

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

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function seed() {
  console.log(`Seeding ${blogCategories.length} blog categories into Sanity...`);

  for (const [index, name] of blogCategories.entries()) {
    const slug = toSlug(name);
    await client.createOrReplace({
      _id: `blog-category-${slug}`,
      _type: 'blogCategory',
      name,
      slug: { _type: 'slug', current: slug },
      description: `${name} articles and insights.`,
      order: index + 1,
      published: true,
    });
    console.log(`  ✓ ${name}`);
  }

  console.log('Done.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
