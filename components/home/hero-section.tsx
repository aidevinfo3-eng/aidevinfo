'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroIllustration } from '@/components/home/hero-illustration';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-soft">
              <Sparkles className="h-4 w-4 text-primary" />
              Your AI Discovery Platform
            </span>

            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Discover the Best{' '}
              <span className="gradient-text">AI Tools, Services</span> & Insights
            </h1>

            <p className="mt-5 max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg text-balance">
              Explore cutting-edge AI solutions, in-depth reviews, industry news,
              tutorials, and expert recommendations — all in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gradient-primary text-white shadow-glow hover:opacity-90 group h-12 text-base">
                <Link href="/services">
                  Explore AI Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-border bg-background text-base hover:bg-muted group">
                <Link href="/blogs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Blogs
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">30+</p>
                <p className="text-sm text-muted-foreground">AI Services</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">20+</p>
                <p className="text-sm text-muted-foreground">Articles</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">10</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
