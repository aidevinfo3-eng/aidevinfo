import type { PortableTextBlock } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import type { BlogPost } from '@/lib/types';

type SanityImage = {
  asset?: { _ref?: string };
  alt?: string;
};

type SanityAuthor = {
  name?: string;
  bio?: string;
  image?: SanityImage;
};

export type SanityPost = {
  _id: string;
  title?: string;
  slug?: string;
  publishedAt?: string;
  excerpt?: string;
  featured?: boolean;
  category?: string;
  tags?: string[];
  relatedServices?: string[];
  mainImage?: SanityImage;
  author?: SanityAuthor;
  content?: PortableTextBlock[];
  faqs?: { question?: string; answer?: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    ogImage?: SanityImage;
  };
};

function readingTimeFromBlocks(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return '1 min';
  const text = blocks
    .map((block) => {
      if (block._type !== 'block' || !('children' in block)) return '';
      const children = block.children as { text?: string }[] | undefined;
      return children?.map((c) => c.text ?? '').join('') ?? '';
    })
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function extractHeadings(blocks?: PortableTextBlock[]): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter(
      (block) =>
        block._type === 'block' &&
        'style' in block &&
        (block as { style?: string }).style === 'h2'
    )
    .map((block) => {
      const children = (block as { children?: { text?: string }[] }).children;
      return children?.map((c) => c.text ?? '').join('') ?? '';
    })
    .filter(Boolean);
}

function imageUrl(image?: SanityImage, fallback?: string): string {
  if (image?.asset) {
    try {
      return urlFor(image).width(1200).url();
    } catch {
      // fall through
    }
  }
  return (
    fallback ??
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200'
  );
}

function authorAvatar(author?: SanityAuthor): string {
  if (author?.image?.asset) {
    try {
      return urlFor(author.image).width(100).height(100).url();
    } catch {
      // fall through
    }
  }
  return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';
}

export function mapSanityPostToBlogPost(
  post: SanityPost,
  options?: { includeContent?: boolean }
): BlogPost {
  const includeContent = options?.includeContent ?? true;
  const content = includeContent ? post.content ?? [] : [];

  return {
    slug: post.slug ?? post._id,
    title: post.title ?? 'Untitled',
    excerpt: post.excerpt ?? '',
    category: post.category ?? 'News',
    author: post.author?.name ?? 'AI Dev Info',
    authorAvatar: authorAvatar(post.author),
    date: post.publishedAt
      ? post.publishedAt.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    readingTime: readingTimeFromBlocks(post.content),
    image: imageUrl(post.mainImage),
    featured: Boolean(post.featured),
    content,
    headings: extractHeadings(post.content),
    tags: post.tags ?? [],
    relatedServices: post.relatedServices ?? [],
    faqs: (post.faqs ?? [])
      .filter((f) => f.question && f.answer)
      .map((f) => ({ question: f.question!, answer: f.answer! })),
    seo: post.seo
      ? {
          metaTitle: post.seo.metaTitle,
          metaDescription: post.seo.metaDescription,
          ogImage: post.seo.ogImage
            ? imageUrl(post.seo.ogImage)
            : undefined,
        }
      : undefined,
  };
}
