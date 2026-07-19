'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
    <section className="surface-ink relative overflow-hidden px-6 py-14 sm:px-12 sm:py-16">
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
          Newsletter
        </p>
        <h2 className="mt-3 font-display text-3xl font-normal text-white sm:text-4xl text-balance">
          Stay updated with the latest AI services &amp; news
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-white/70 text-balance">
          Join over 20,000 AI professionals receiving weekly insights,
          recommendations, and product launches.
        </p>

        {submitted ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 border border-white/20 px-5 py-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm text-white">Thanks for subscribing.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 flex-1 rounded-sm border-white/20 bg-white/10 text-white placeholder:text-white/45 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 bg-white text-foreground hover:bg-white/90 group"
            >
              Subscribe
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/45">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
