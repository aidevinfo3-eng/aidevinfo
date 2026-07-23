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

async function deleteBlogs() {
  const posts = await client.fetch<{ _id: string; title?: string }[]>(
    `*[_type == "post"]{ _id, title }`
  );

  if (posts.length === 0) {
    console.log('No Sanity blog posts found.');
    return;
  }

  console.log(
    `Deleting ${posts.length} Sanity blog post(s) from ${projectId}/${dataset}...`
  );

  const transaction = client.transaction();
  for (const post of posts) {
    transaction.delete(post._id);
    console.log(`  – ${post.title || post._id}`);
  }

  await transaction.commit();
  console.log(`Done. Deleted ${posts.length} post(s).`);
}

deleteBlogs().catch((error) => {
  console.error(error);
  process.exit(1);
});
