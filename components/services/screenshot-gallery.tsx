'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScreenshotGallery({ screenshots, name }: { screenshots: string[]; name: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const nextImage = () => setLightbox((prev) => (prev === null ? null : (prev + 1) % screenshots.length));
  const prevImage = () => setLightbox((prev) => (prev === null ? null : (prev - 1 + screenshots.length) % screenshots.length));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-border shadow-soft transition-all hover:shadow-card"
            aria-label={`View screenshot ${index + 1}`}
          >
            <Image
              src={screenshot}
              alt={`${name} screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
            onClick={closeLightbox}
          >
            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={screenshots[lightbox]}
                alt={`${name} screenshot ${lightbox + 1}`}
                width={1200}
                height={675}
                className="rounded-xl object-contain"
              />
            </motion.div>
            <button
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
