'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted/50 to-primary/5 px-6 py-14 sm:px-12 sm:py-20">
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
          {title}
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed text-balance">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="gradient-primary text-white shadow-glow hover:opacity-90 group">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild size="lg" variant="outline" className="border-border bg-background hover:bg-muted">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
