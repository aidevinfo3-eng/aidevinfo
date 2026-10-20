'use client';

import { useLayoutEffect } from 'react';

const ATTR = 'data-nav-overlay';

/**
 * Mount inside a full-bleed dark hero. Runs before paint so Main/Navbar
 * see overlay mode on the first frame (critical for production).
 */
export function NavOverlayMarker() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute(ATTR, 'true');
    return () => {
      document.documentElement.removeAttribute(ATTR);
    };
  }, []);

  return null;
}

export function hasNavOverlayAttribute() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.getAttribute(ATTR) === 'true';
}
