/** True for site root — normalizes trailing slashes. */
export function isHomePath(path: string | null | undefined) {
  if (path == null || path === '') return false;
  const normalized = path.replace(/\/+$/, '');
  return normalized === '' || normalized === '/';
}

const HERO_OVERLAY_PREFIXES = [
  '/',
  '/about',
  '/blogs',
  '/blog',
  '/services',
  '/advertise',
  '/contact',
  '/development-services',
] as const;

/**
 * Pages whose first section is a full-bleed dark hero under the fixed nav.
 * Used so the header can start transparent before the hero marker mounts.
 */
export function pathHasHeroOverlay(path: string | null | undefined) {
  if (path == null) return false;
  const p = path.replace(/\/+$/, '') || '/';
  if (p === '/') return true;
  return HERO_OVERLAY_PREFIXES.some(
    (route) => route !== '/' && (p === route || p.startsWith(`${route}/`))
  );
}
