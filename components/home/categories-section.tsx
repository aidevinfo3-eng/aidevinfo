'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { categories } from '@/lib/categories';
import { SectionHeading } from '@/components/shared/section-heading';
import { cn } from '@/lib/utils';

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categories"
          title="Explore AI by Category"
          description="Find the perfect AI tools for your specific needs across our curated categories."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = (Icons[category.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Box;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/services?category=${category.slug}`}>
                  <Card className="group h-full border-border/60 p-5 text-center shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                    <div
                      className={cn(
                        'mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-glow transition-transform group-hover:scale-110',
                        category.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {category.count} tools
                    </p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
