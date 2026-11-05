/**
 * Content shell under the fixed header.
 * Dark-hero pages pad themselves (pt-28); non-hero pages need pt-[4.25rem].
 */
export function Main({ children }: { children: React.ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
