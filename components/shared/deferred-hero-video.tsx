'use client';

import { useEffect, useState } from 'react';

const HERO_BG_VIDEO = '/hero-bg-2.mp4';

/**
 * Loads the hero MP4 only on desktop, after idle, and never when the user
 * prefers reduced motion. Mobile keeps the static poster as LCP.
 */
export function DeferredHeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!desktop.matches || reduceMotion.matches) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setEnabled(true);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(enable, 1200);
    }

    const onChange = () => {
      if (!desktop.matches || reduceMotion.matches) {
        cancelled = true;
        setEnabled(false);
      }
    };
    desktop.addEventListener('change', onChange);
    reduceMotion.addEventListener('change', onChange);

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      desktop.removeEventListener('change', onChange);
      reduceMotion.removeEventListener('change', onChange);
    };
  }, []);

  if (!enabled) return null;

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    >
      <source src={HERO_BG_VIDEO} type="video/mp4" />
    </video>
  );
}
