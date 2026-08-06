'use client';

import { PortableText as BasePortableText } from '@portabletext/react';
import type { PortableTextComponents, PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const text =
        value?.children
          ?.map((child) => ('text' in child ? String(child.text ?? '') : ''))
          .join('') || '';
      const id = slugify(text);
      return (
        <h2 id={id} className="scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => <h3 className="scroll-mt-24">{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative my-8 aspect-video w-full overflow-hidden border border-border">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Article image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      );
    },
    htmlEmbed: ({ value }) => {
      if (!value?.code) return null;
      // Ensure tables use the global blog-table styles
      const html = String(value.code).replace(
        /<table([^>]*)>/gi,
        (match, attrs: string) => {
          if (/\bblog-table\b/.test(attrs)) return match;
          if (/\bclass\s*=\s*(["'])/i.test(attrs)) {
            return `<table${attrs.replace(
              /\bclass\s*=\s*(["'])/i,
              'class=$1blog-table '
            )}>`;
          }
          return `<table class="blog-table"${attrs}>`;
        }
      );
      return (
        <div
          className="my-8 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => {
      const href = value?.href ?? '#';
      const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
      return (
        <a href={href} rel={rel} target={rel ? '_blank' : undefined}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <BasePortableText value={value} components={components} />;
}
