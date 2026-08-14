'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/services?q=${encodeURIComponent(q)}` : '/services');
  };

  return (
    <form onSubmit={handleSearch} className="relative mt-6 max-w-lg">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search AI tools & services..."
        className="h-12 rounded-sm border-white/20 bg-white/10 pl-11 pr-28 text-white placeholder:text-white/45 focus-visible:ring-emerald-400/60"
        aria-label="Search AI tools and services"
      />
      <Button
        type="submit"
        size="sm"
        className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary-dark"
      >
        Search
      </Button>
    </form>
  );
}
