import { NextStudioLayout, metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';
import type { Metadata, Viewport } from 'next';
import './studio-fix.css';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'AI Dev Info Studio',
};

export const viewport: Viewport = {
  ...studioViewport,
};

export const dynamic = 'force-static';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}
