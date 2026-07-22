import fs from 'fs';
import path from 'path';
import { createClient } from 'next-sanity';
import { aiServices } from '../lib/services-data';

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

async function seed() {
  console.log(`Seeding ${aiServices.length} AI tools into Sanity...`);

  for (const tool of aiServices) {
    await client.createOrReplace({
      _id: `ai-tool-${tool.slug}`,
      _type: 'aiTool',
      name: tool.name,
      slug: { _type: 'slug', current: tool.slug },
      tagline: tool.tagline,
      description: tool.description,
      longDescription: tool.longDescription,
      category: tool.category,
      rating: tool.rating,
      reviewCount: tool.reviewCount,
      pricing: tool.pricing,
      pricingPlans: tool.pricingPlans.map((plan) => ({
        _type: 'pricingPlan',
        _key: plan.name.toLowerCase().replace(/\s+/g, '-'),
        name: plan.name,
        price: plan.price,
        period: plan.period,
        description: plan.description,
        features: plan.features,
        highlighted: Boolean(plan.highlighted),
      })),
      website: tool.website,
      platform: tool.platform,
      apiAvailable: tool.apiAvailable,
      lastUpdated: tool.lastUpdated || undefined,
      dateAdded: tool.dateAdded || undefined,
      tags: tool.tags,
      features: tool.features,
      pros: tool.pros,
      cons: tool.cons,
      useCases: tool.useCases.map((uc) => ({
        _type: 'useCase',
        _key: uc.title.toLowerCase().replace(/\s+/g, '-'),
        title: uc.title,
        description: uc.description,
      })),
      screenshots: tool.screenshots,
      alternatives: tool.alternatives,
      faqs: tool.faqs.map((faq, i) => ({
        _type: 'faq',
        _key: `faq-${i}`,
        question: faq.question,
        answer: faq.answer,
      })),
      reviews: tool.reviews.map((review, i) => ({
        _type: 'review',
        _key: `review-${i}`,
        author: review.author,
        role: review.role,
        avatar: review.avatar,
        rating: review.rating,
        date: review.date || undefined,
        title: review.title,
        content: review.content,
      })),
      popular: tool.popular,
      featured: tool.featured,
      published: true,
    });
    console.log(`  ✓ ${tool.name}`);
  }

  console.log('Done.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
