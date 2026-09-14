import { NextResponse, type NextRequest } from 'next/server';

/** Strips leading/trailing spaces (literal or %20-encoded) from each segment. */
function trimPathSegments(pathname: string): string {
  return pathname
    .split('/')
    .map((segment) =>
      segment.replace(/^(?:%20|\s)+/gi, '').replace(/(?:%20|\s)+$/gi, '')
    )
    .join('/');
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  // CMS slugs saved with stray whitespace produce /blog/%20slug URLs. Next.js
  // will not match those against a dynamic segment, so send them to the clean
  // path instead of returning a 404.
  const trimmed = trimPathSegments(url.pathname);
  if (trimmed !== url.pathname) {
    const target = url.clone();
    target.pathname = trimmed;
    return NextResponse.redirect(target, 308);
  }

  // Category listings moved from /services?category=<slug> to /services/<slug>.
  // next.config redirects forward the original query string, which would leave
  // the stale `category` param behind, so the redirect lives here.
  if (url.pathname === '/services') {
    const category = url.searchParams.get('category');
    if (category) {
      const target = url.clone();
      target.pathname = `/services/${encodeURIComponent(category.trim())}`;
      target.searchParams.delete('category');
      return NextResponse.redirect(target, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/services', '/services/:path*', '/blog/:path*', '/blogs/:path*'],
};
