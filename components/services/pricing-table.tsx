'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PricingPlan } from '@/lib/types';

export function PricingTable({ plans, name }: { plans: PricingPlan[]; name: string }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className={cn(
            'relative rounded-2xl border p-6 transition-all',
            plan.highlighted
              ? 'border-primary shadow-glow bg-gradient-to-b from-primary/5 to-transparent'
              : 'border-border bg-card shadow-soft'
          )}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-white shadow-glow">
              Most Popular
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-foreground">{plan.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
          <ul className="mt-5 space-y-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
