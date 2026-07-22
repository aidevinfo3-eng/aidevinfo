'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Review } from '@/lib/types';

export function ReviewCard({ review, index = 0 }: { review: Review; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="border-border/60 shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Image
              src={review.avatar}
              alt={review.author}
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{review.author}</p>
              <p className="text-xs text-muted-foreground">{review.role}</p>
            </div>
          </div>
          <h4 className="mt-4 font-semibold text-foreground">{review.title}</h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{review.content}</p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            {new Date(review.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
