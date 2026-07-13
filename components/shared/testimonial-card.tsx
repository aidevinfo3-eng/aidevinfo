'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from '@/components/shared/rating-stars';
import { Testimonial } from '@/lib/types';

export function TestimonialCard({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full border-border/60 shadow-soft transition-all duration-300 hover:shadow-card">
        <CardContent className="flex h-full flex-col p-6">
          <Quote className="h-8 w-8 text-primary/20" />
          <p className="mt-4 flex-1 text-sm text-foreground/80 leading-relaxed">
            "{testimonial.content}"
          </p>
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
            <RatingStars rating={testimonial.rating} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
