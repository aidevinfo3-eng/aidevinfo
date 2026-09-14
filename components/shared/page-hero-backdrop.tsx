import Image from 'next/image';

export const HERO_BG_IMAGE =
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const HERO_BG_ALT = 'AI technology development and digital workspace';

/** Shared full-bleed hero image + overlays used on home-style page heroes. */
export function PageHeroBackdrop() {
  return (
    <>
      {/*
        Explicit width/height (not `fill`) so the rendered <img> carries real
        size attributes and reserves its aspect ratio before loading.
      */}
      <Image
        src={HERO_BG_IMAGE}
        alt={HERO_BG_ALT}
        width={1600}
        height={900}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, hsl(0 0% 5% / 0.92) 0%, hsl(0 0% 5% / 0.78) 42%, hsl(0 0% 5% / 0.45) 72%, hsl(0 0% 5% / 0.28) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,hsl(162_50%_28%/0.28),transparent_50%)]" />
    </>
  );
}
