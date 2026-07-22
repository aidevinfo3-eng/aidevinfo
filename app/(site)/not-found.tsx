'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary shadow-glow">
          <Compass className="h-10 w-10 text-white" />
        </div>

        <p className="font-display text-7xl font-bold gradient-text sm:text-9xl">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="gradient-primary text-white shadow-glow hover:opacity-90 group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border bg-background hover:bg-muted group">
            <Link href="/services">
              <Search className="mr-2 h-4 w-4" />
              Browse AI Tools
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Return to AI Dev Info
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
