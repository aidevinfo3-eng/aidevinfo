export const HERO_BG_POSTER = '/poster-hero.png';
export const HERO_BG_IMAGE = HERO_BG_POSTER;
export const HERO_BG_VIDEO = '/hero-bg-2.mp4';

export const HERO_BG_ALT =
  'Developers researching and building with AI tools';

/** Faint node graph on the right — tools / pipelines / discovery */
function HeroNetworkMotif() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-emerald-400/25"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="920" cy="280" r="4" fill="currentColor" fillOpacity="0.5" />
        <circle cx="1080" cy="220" r="3" fill="currentColor" fillOpacity="0.4" />
        <circle cx="1240" cy="320" r="5" fill="currentColor" fillOpacity="0.45" />
        <circle cx="1380" cy="180" r="3" fill="currentColor" fillOpacity="0.35" />
        <circle cx="1120" cy="420" r="4" fill="currentColor" fillOpacity="0.4" />
        <circle cx="1320" cy="480" r="3" fill="currentColor" fillOpacity="0.35" />
        <circle cx="1480" cy="360" r="4" fill="currentColor" fillOpacity="0.4" />
        <circle cx="980" cy="520" r="3" fill="currentColor" fillOpacity="0.3" />
        <circle cx="1180" cy="620" r="4" fill="currentColor" fillOpacity="0.35" />
        <circle cx="1420" cy="560" r="3" fill="currentColor" fillOpacity="0.3" />
        <path d="M920 280 L1080 220 L1240 320 L1380 180" strokeOpacity="0.35" />
        <path d="M1080 220 L1120 420 L1240 320" strokeOpacity="0.3" />
        <path d="M1240 320 L1320 480 L1480 360 L1380 180" strokeOpacity="0.28" />
        <path d="M920 280 L980 520 L1120 420" strokeOpacity="0.25" />
        <path d="M1120 420 L1180 620 L1320 480" strokeOpacity="0.22" />
        <path d="M1320 480 L1420 560 L1480 360" strokeOpacity="0.2" />
      </g>
    </svg>
  );
}

type PageHeroBackdropProps = {
  priority?: boolean;
};

/** Shared full-bleed hero video + overlays used on all page heroes. */
export function PageHeroBackdrop({ priority = false }: PageHeroBackdropProps) {
  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        poster={HERO_BG_POSTER}
        aria-hidden
      >
        <source src={HERO_BG_VIDEO} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, hsl(0 0% 5% / 0.92) 0%, hsl(0 0% 5% / 0.78) 42%, hsl(0 0% 5% / 0.45) 72%, hsl(0 0% 5% / 0.28) 100%)',
        }}
      />
      {/* Soft emerald wash over the media */}
      <div className="absolute inset-0 bg-emerald-950/35 mix-blend-multiply" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,hsl(162_55%_32%/0.38),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,hsl(158_40%_28%/0.22),transparent_45%)]" />
      <div className="absolute inset-0 hero-backdrop-grid" />
      <HeroNetworkMotif />
      <div
        className="pointer-events-none absolute inset-0 hero-backdrop-grain"
        aria-hidden
      />
    </>
  );
}
