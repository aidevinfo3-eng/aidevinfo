'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/types';

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group h-full overflow-hidden border-border/60 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1">
        <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <Badge className="absolute left-3 top-3 gradient-primary text-white border-0">
            {post.category}
          </Badge>
        </Link>

        <CardContent className="p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="px-5 pb-5 pt-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-xs font-medium text-foreground">{post.author}</span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2"
            >
              Read More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
