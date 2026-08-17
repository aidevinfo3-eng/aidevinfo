import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getDevelopmentServiceBySlug,
  getDevelopmentServices,
} from '@/lib/development-services';
import { generateSEO } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Workflow,
  Sparkles,
  Cloud,
  Cpu,
  Database,
  Lightbulb,
  Code2,
  MessageSquare,
  Zap,
  Layers,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getDevelopmentServiceBySlug(slug);
  if (!service) return {};

  return generateSEO({
    title: service.title,
    description: service.description,
    path: `/development-services/${service.slug}`,
  });
}

export default async function DevelopmentServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getDevelopmentServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Bot;
  const related = (await getDevelopmentServices())
    .filter((item) => item.slug !== service.slug)
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/development-services" className="hover:text-foreground">
            AI Development Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{service.title}</span>
        </nav>

        <div className="max-w-3xl border border-border bg-card p-8 sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center border border-border bg-background text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Book consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/development-services">All services</Link>
            </Button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-foreground">
              Related development services
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => {
                const RelatedIcon = iconMap[item.icon] ?? Bot;
                return (
                  <Link
                    key={item.id}
                    href={`/development-services/${item.slug}`}
                    className="group border border-border bg-card p-5 transition-colors hover:border-foreground/25 hover:bg-muted/40"
                  >
                    <RelatedIcon className="h-5 w-5 text-primary" />
                    <h3 className="mt-4 font-display text-lg text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
