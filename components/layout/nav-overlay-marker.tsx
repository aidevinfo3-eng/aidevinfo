'use client';

import { useEffect } from 'react';

const ATTR = 'data-nav-overlay';

/**
 * Mount inside a full-bleed dark hero. Tells the fixed navbar to sit
 * transparent over the hero until the user scrolls.
 */
export function NavOverlayMarker() {
  useEffect(() => {
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
