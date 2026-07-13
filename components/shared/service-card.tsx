'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from '@/components/shared/rating-stars';
import { getCategoryName } from '@/lib/categories';
import { AIService } from '@/lib/types';

export function ServiceCard({ service, index = 0 }: { service: AIService; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group h-full overflow-hidden border-border/60 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary text-white text-lg font-bold shadow-glow">
              {service.name.charAt(0)}
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {service.pricing}
            </Badge>
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {service.name}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {getCategoryName(service.category)}
          </p>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {service.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <RatingStars rating={service.rating} showNumber reviewCount={service.reviewCount} />
          </div>

          <div className="mt-4 flex items-center gap-1.5 flex-wrap">
            {service.features.slice(0, 3).map((feature) => (
              <span key={feature} className="flex items-center gap-1 text-xs text-muted-foreground">
                <Check className="h-3 w-3 text-success" />
                {feature.split(' ')[0]}
              </span>
            ))}
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5"
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
