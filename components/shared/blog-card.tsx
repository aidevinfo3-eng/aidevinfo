'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/types';

export function BlogCard({ post }: { post: BlogPost; index?: number }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col border border-t-0 border-border p-5">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-primary">{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="mt-3 font-display text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">{post.author}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
          >
            Read
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
