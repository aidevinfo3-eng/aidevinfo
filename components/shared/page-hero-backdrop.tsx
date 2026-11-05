import { preload } from 'react-dom';
import { DeferredHeroVideo } from '@/components/shared/deferred-hero-video';

/** Optimized stills — desktop CSS background (media-gated; phones never download). */
export const HERO_BG_POSTER = '/poster-hero.webp';
export const HERO_BG_POSTER_MOBILE = '/poster-hero-mobile.webp';
export const HERO_BG_IMAGE = HERO_BG_POSTER;
export const HERO_BG_VIDEO = '/hero-bg-2.mp4';

export const HERO_BG_ALT =
  'Developers researching and building with AI tools';

type PageHeroBackdropProps = {
  priority?: boolean;
};

/**
 * Mobile: CSS-only atmosphere (LCP = text).
 * Desktop: preloaded photo via CSS @media + deferred video.
 */
export function PageHeroBackdrop({ priority = false }: PageHeroBackdropProps) {
  if (priority) {
    preload(HERO_BG_POSTER, {
      as: 'image',
      type: 'image/webp',
      fetchPriority: 'high',
      media: '(min-width: 768px)',
    });
  }

  return (
    <>
      <div className="hero-media absolute inset-0" aria-hidden />

      <DeferredHeroVideo />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, hsl(0 0% 5% / 0.92) 0%, hsl(0 0% 5% / 0.78) 42%, hsl(0 0% 5% / 0.45) 72%, hsl(0 0% 5% / 0.28) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-emerald-950/35 mix-blend-multiply" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,hsl(162_55%_32%/0.38),transparent_55%)]" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_85%_70%,hsl(158_40%_28%/0.22),transparent_45%)] md:block" />
      <div className="absolute inset-0 hidden hero-backdrop-grid md:block" />
      <div
        className="pointer-events-none absolute inset-0 hidden hero-backdrop-grain md:block"
        aria-hidden
      />
    </>
  );
}
