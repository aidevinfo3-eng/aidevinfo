'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn, formatPublishedDate } from '@/lib/utils';
import { BlogPost } from '@/lib/types';

export function BlogCard({
  post,
  elevated,
}: {
  post: BlogPost;
  index?: number;
  elevated?: boolean;
}) {
  return (
    <article className={cn('group flex h-full flex-col', elevated && 'home-card overflow-hidden')}>
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>

      <div
        className={cn(
          'flex flex-1 flex-col p-5',
          elevated ? 'border-0' : 'border border-t-0 border-border'
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-primary">{post.category}</span>
          <span className="inline-flex items-center gap-1 normal-case tracking-normal">
            <Calendar className="h-3 w-3 shrink-0" aria-hidden />
            <time dateTime={post.date.slice(0, 10)}>
              {formatPublishedDate(post.date)}
            </time>
          </span>
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
