import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-foreground">
      <PageHeroBackdrop priority />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="max-w-2xl">
          <h1 className="max-w-2xl font-display text-2xl font-normal leading-snug text-white/95 sm:text-3xl lg:text-[2.15rem] lg:leading-[1.25]">
            Understand AI. Evaluate AI Tools. Build What Works.
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            AI Dev Info is an independent AI knowledge and discovery platform helping developers, businesses, and technology teams understand artificial intelligence, evaluate AI tools, and build practical AI-powered applications.
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">
            Explore AI tools, learn how modern AI technologies work, and discover practical approaches to building AI applications, AI agents, RAG systems, LLM applications, and AI automation workflows.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white text-foreground hover:bg-white/90 group"
            >
              <Link href="/services">
                Explore AI tools
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-foreground"
            >
              <Link href="/contact">Book free consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
