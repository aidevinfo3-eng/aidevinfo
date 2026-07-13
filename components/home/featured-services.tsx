'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/shared/service-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { getFeaturedServices } from '@/lib/services';

export function FeaturedServices() {
  const services = getFeaturedServices();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title="Featured AI Services"
          description="Discover the most popular and highly-rated AI tools handpicked by our experts."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="border-border bg-background hover:bg-muted group">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
