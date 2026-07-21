'use client';

import dynamic from 'next/dynamic';
import config from '@/sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100dvh',
          fontFamily: 'system-ui, sans-serif',
          color: '#666',
        }}
      >
        Loading Studio…
      </div>
    ),
  }
);

export default function AdminPage() {
  return <NextStudio config={config} />;
}
