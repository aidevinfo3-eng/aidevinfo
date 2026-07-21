'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schema';
import { apiVersion, dataset, projectId } from './lib/sanity.env';

export default defineConfig({
  name: 'ai-dev-info',
  title: 'AI Dev Info',
  basePath: '/admin',
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  schema,
  plugins: [structureTool()],
});
