'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all',
            selected === category
              ? 'gradient-primary text-white shadow-glow'
              : 'border border-border bg-background text-muted-foreground hover:border-primary hover:text-primary'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
