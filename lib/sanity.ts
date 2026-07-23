import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import {
  apiVersion,
  dataset,
  hasSanityConfig,
  projectId,
} from './sanity.env';

export { apiVersion, dataset, hasSanityConfig, projectId };

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  // useCdn: process.env.NODE_ENV === 'production',
  useCdn: false,
});

export const serverClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder({
  projectId: projectId || 'placeholder',
  dataset,
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
