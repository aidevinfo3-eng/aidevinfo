import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from './types';
import { client, hasSanityConfig } from './sanity';
import { allPostsQuery, postBySlugQuery } from './sanity-queries';
import { mapSanityPostToBlogPost, type SanityPost } from './sanity-mappers';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

type Frontmatter = {
  title?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  authorAvatar?: string;
  date?: string;
  image?: string;
  featured?: boolean;
  draft?: boolean;
  tags?: string[];
  relatedServices?: string[];
  readingTime?: string;
};

function readingTimeFromMarkdown(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function extractHeadings(markdown: string): string[] {
  const headings: string[] = [];
  for (const line of markdown.split('\n')) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (match) headings.push(match[1].trim());
  }
  return headings;
}

function parseMarkdownPost(filename: string): BlogPost | null {
  const slug = filename.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  if (fm.draft) return null;
  if (!fm.title || !fm.date) return null;

  const body = content.trim();

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt ?? '',
    category: fm.category ?? 'News',
    author: fm.author ?? 'AI Dev Info',
    authorAvatar:
      fm.authorAvatar ??
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: String(fm.date),
    readingTime: fm.readingTime ?? readingTimeFromMarkdown(body),
    image:
      fm.image ??
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: Boolean(fm.featured),
    content: body,
    headings: extractHeadings(body),
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    relatedServices: Array.isArray(fm.relatedServices)
      ? fm.relatedServices.map(String)
      : [],
    draft: false,
  };
}

function loadMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter(
      (f) =>
        (f.endsWith('.md') || f.endsWith('.mdx')) &&
        !f.toLowerCase().startsWith('readme')
    );

  return files
    .map(parseMarkdownPost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function loadSanityPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch<SanityPost[]>(allPostsQuery);
  return (posts ?? []).map((post) =>
    mapSanityPostToBlogPost(post, { includeContent: false })
  );
}

async function loadSanityPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug });
  if (!post) return undefined;
  return mapSanityPostToBlogPost(post, { includeContent: true });
}

let markdownCache: BlogPost[] | null = null;

function getMarkdownPosts(): BlogPost[] {
  if (process.env.NODE_ENV === 'development') {
    return loadMarkdownPosts();
  }
  if (!markdownCache) markdownCache = loadMarkdownPosts();
  return markdownCache;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (hasSanityConfig) {
    try {
      return await loadSanityPosts();
    } catch (error) {
      console.error('Sanity blog fetch failed, falling back to markdown:', error);
    }
  }
  return getMarkdownPosts();
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  if (hasSanityConfig) {
    try {
      const post = await loadSanityPostBySlug(slug);
      if (post) return post;
    } catch (error) {
      console.error('Sanity post fetch failed, falling back to markdown:', error);
    }
  }
  return getMarkdownPosts().find((b) => b.slug === slug);
}

export async function getFeaturedBlogPost(): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((b) => b.featured) ?? posts[0];
}

export async function getLatestBlogPosts(limit: number): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

export async function getRelatedBlogPosts(
  slug: string,
  limit: number
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const current = posts.find((b) => b.slug === slug);
  if (!current) return [];
  return posts
    .filter((b) => b.slug !== slug && b.category === current.category)
    .slice(0, limit);
}

export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((b) => b.category === category);
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const set = new Set(posts.map((p) => p.category));
  return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

/** Static fallback list for UI defaults */
export const blogCategories = [
  'All',
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
