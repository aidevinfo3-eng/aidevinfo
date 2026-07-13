'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl gradient-primary px-6 py-14 sm:px-12 sm:py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent blur-3xl animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <Mail className="h-7 w-7 text-white" />
        </div>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
          Stay Updated with AI
        </h2>
        <p className="mt-3 text-base text-white/80 sm:text-lg text-balance">
          Get the latest AI tool reviews, industry news, and expert insights delivered to your inbox weekly.
        </p>

        {submitted ? (
          <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-xl bg-white/20 px-6 py-4 backdrop-blur">
            <CheckCircle2 className="h-5 w-5 text-white" />
            <span className="text-white font-medium">Thanks for subscribing! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 flex-1 border-0 bg-white/95 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 bg-foreground text-white hover:bg-foreground/90 shadow-lg group"
            >
              Subscribe
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/60">
          Join 25,000+ AI enthusiasts. No spam, unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
