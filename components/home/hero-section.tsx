'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const stats = [
  { value: '5,000+', label: 'AI Tools' },
  { value: '250+', label: 'Expert Articles' },
  { value: '50+', label: 'AI Projects' },
  { value: '100+', label: 'Happy Clients' },
];

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/services?q=${encodeURIComponent(q)}` : '/services');
  };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-foreground">
      <Image
        src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=2400"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, hsl(0 0% 5% / 0.92) 0%, hsl(0 0% 5% / 0.78) 42%, hsl(0 0% 5% / 0.45) 72%, hsl(0 0% 5% / 0.28) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,hsl(162_50%_28%/0.28),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/90">
            Trusted AI Development Company &amp; AI Tools Platform
          </p>



          <h1 className="mt-6 max-w-xl font-display text-2xl font-normal leading-snug text-white/95 sm:text-3xl lg:text-[2.15rem] lg:leading-[1.25]">
            Build smarter with AI development. Discover powerful tools &amp; stay ahead with expert insights.
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">
            Al Dev Info is your all-in-one platform for Al development services. Al tools discovery, expert tutorials, industry news, and sponsored Al promotions. Build, explore, learn, and grow with the power of Al.
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

          <form onSubmit={handleSearch} className="relative mt-6 max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI tools, AI services, blogs..."
              className="h-12 rounded-sm border-white/20 bg-white/10 pl-11 pr-28 text-white placeholder:text-white/45 focus-visible:ring-emerald-400/60"
              aria-label="Search AI tools, services, and blogs"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary-dark"
            >
              Search
            </Button>
          </form>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="text-white/75" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Trusted by startups, businesses &amp; developers.
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
