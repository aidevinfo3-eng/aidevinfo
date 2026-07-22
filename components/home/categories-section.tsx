'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { SectionHeading } from '@/components/shared/section-heading';
import { Pagination } from '@/components/shared/pagination';
import { SearchBar } from '@/components/shared/search-bar';

const ITEMS_PER_PAGE = 12;

export function CategoriesSection({ categories }: { categories: Category[] }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [categories, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const currentItems = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore Categories"
          title="Explore AI by category"
          description="Browse top AI tools and solutions by categories."
          center={false}
          className="max-w-lg"
        />

        <div className="mt-8 max-w-xl">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search categories..."
          />
        </div>

        {currentItems.length === 0 ? (
          <div className="mt-12 border border-border py-16 text-center">
            <p className="font-display text-xl text-foreground">No categories found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {currentItems.map((category) => (
              <Link
                key={category.slug}
                href={`/services?category=${category.slug}`}
                className="group flex h-full flex-col justify-between border border-border bg-card p-5 transition-colors hover:border-foreground/25 hover:bg-muted/40 sm:p-6"
              >
                <h3 className="font-display text-lg text-foreground transition-colors group-hover:text-primary sm:text-xl">
                  {category.name}
                </h3>
                <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {category.countLabel ?? `${category.count}+`} tools
                </p>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
