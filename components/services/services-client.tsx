'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, Grid3x3 } from 'lucide-react';
import { aiServices } from '@/lib/services';
import { categories } from '@/lib/categories';
import { ServiceCard } from '@/components/shared/service-card';
import { SearchBar } from '@/components/shared/search-bar';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Rating' },
];

const categoryOptions = ['All', ...categories.map((c) => c.name)];

function ServicesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const catSlug = searchParams.get('category');
    if (catSlug) {
      const cat = categories.find((c) => c.slug === catSlug);
      if (cat) setCategory(cat.name);
    }
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = aiServices.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'All' || s.category === categories.find((c) => c.name === category)?.slug;
      return matchesSearch && matchesCategory;
    });

    if (sort === 'popular') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sort === 'newest') {
      result = [...result].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'AI Services' }]} className="mb-6" />

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AI Services Directory
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Browse our curated collection of {aiServices.length}+ AI tools and services. Search, filter, and find the perfect AI solution.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search AI services by name, description, or tag..." />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm text-muted-foreground whitespace-nowrap">Category:</Label>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="hidden items-center gap-2 sm:flex">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm text-muted-foreground whitespace-nowrap">Sort:</Label>
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Grid3x3 className="h-4 w-4" />
        Showing {currentItems.length} of {filtered.length} services
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-muted/30 py-20 text-center">
          <p className="text-lg font-medium text-foreground">No services found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}

export function ServicesClient() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
