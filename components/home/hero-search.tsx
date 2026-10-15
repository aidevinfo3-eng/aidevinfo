'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type HeroSearchProps = {
  variant?: 'hero' | 'header';
  /** Header on home hero: transparent bar over dark background */
  onDark?: boolean;
};

export function HeroSearch({ variant = 'hero', onDark = false }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/services?q=${encodeURIComponent(q)}` : '/services');
  };

  const isHeader = variant === 'header';
  const darkInput = isHeader ? onDark : true;

  return (
    <form
      onSubmit={handleSearch}
      className={cn('relative w-full', isHeader ? 'max-w-[17rem] lg:max-w-xs' : 'mt-6 max-w-lg')}
    >
      <Search
        className={cn(
          'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2',
          darkInput ? 'text-white/45' : 'text-muted-foreground'
        )}
      />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className={cn(
          'rounded-sm pl-10 pr-[4.75rem] placeholder:text-xs',
          isHeader ? 'h-9 text-sm' : 'h-12',
          darkInput
            ? 'border-white/20 bg-white/10 text-white placeholder:text-white/45 focus-visible:ring-emerald-400/60'
            : 'border-neutral-200 bg-white text-foreground placeholder:text-muted-foreground'
        )}
        aria-label="Search AI tools and services"
      />
      <Button
        type="submit"
        size="sm"
        className={cn(
          'absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary-dark',
          isHeader ? 'h-7 px-2.5 text-xs' : 'right-1.5 h-9'
        )}
      >
        Search
      </Button>
    </form>
  );
}
