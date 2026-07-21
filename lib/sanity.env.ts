export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const hasSanityConfig = Boolean(
  projectId && projectId !== 'placeholder' && projectId.length > 0
);

if (typeof window !== 'undefined' && !hasSanityConfig) {
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Studio will not load documents.'
  );
}
