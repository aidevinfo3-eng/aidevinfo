'use client';

import { motion } from 'framer-motion';
import { Award, RefreshCw, BookOpen, Layers, Gift, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/shared/section-heading';

const reasons = [
  { icon: Award, title: 'Trusted Reviews', description: 'Every AI tool is thoroughly tested and reviewed by our team of AI experts.' },
  { icon: RefreshCw, title: 'Updated AI Resources', description: 'We continuously update our directory with the latest AI tools and features.' },
  { icon: BookOpen, title: 'Expert Guides', description: 'Comprehensive tutorials and guides to help you master AI tools effectively.' },
  { icon: Layers, title: 'Curated Tools', description: 'Hand-picked AI solutions so you spend less time searching and more time building.' },
  { icon: Gift, title: 'Free Learning Content', description: 'Access our blog and tutorials completely free — no paywalls, no gates.' },
  { icon: TrendingUp, title: 'Industry Insights', description: 'Stay ahead with the latest AI trends, news, and expert analysis.' },
];

export function WhyChooseSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Choose AI Dev Info"
          description="We are dedicated to helping you navigate the rapidly evolving world of AI with confidence."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="group h-full border-border/60 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
