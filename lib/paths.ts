/** True for site root — normalizes trailing slashes. */
export function isHomePath(path: string | null | undefined) {
  if (path == null || path === '') return false;
  const normalized = path.replace(/\/+$/, '');
  return normalized === '' || normalized === '/';
}
