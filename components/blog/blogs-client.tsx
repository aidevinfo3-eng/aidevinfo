'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllBlogPosts, blogCategories } from '@/lib/blog-posts';
import { BlogCard } from '@/components/shared/blog-card';
import { SearchBar } from '@/components/shared/search-bar';
import { CategoryFilter } from '@/components/shared/category-filter';
import { Pagination } from '@/components/shared/pagination';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Badge } from '@/components/ui/badge';

const itemsPerPage = 6;

export function BlogsClient() {
  const allPosts = getAllBlogPosts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = allPosts.find((p) => p.featured) ?? allPosts[0];

  const filtered = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'All' || post.category === category;
      return matchesSearch && matchesCategory && !post.featured;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-muted/20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Blogs' }]} className="mb-6" />

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Insights & Articles
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Expert analysis, tutorials, and news covering the latest in artificial intelligence.
          </p>
        </div>

        {/* Featured article */}
        {featuredPost && category === 'All' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-glow lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-4 top-4 gradient-primary text-white border-0">
                    Featured
                  </Badge>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {featuredPost.category}
                    </Badge>
                    <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <Image
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.author}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-foreground">{featuredPost.author}</span>
                    <span className="ml-auto flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Search & Filter */}
        <div className="mb-6 space-y-4">
          <div className="max-w-2xl">
            <SearchBar value={search} onChange={setSearch} placeholder="Search articles by title, topic, or tag..." />
          </div>
          <CategoryFilter categories={blogCategories} selected={category} onSelect={setCategory} />
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </p>

        {currentItems.length === 0 ? (
          <div className="rounded-2xl border border-border bg-muted/30 py-20 text-center">
            <p className="text-lg font-medium text-foreground">No articles found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
}
