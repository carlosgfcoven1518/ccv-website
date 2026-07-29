const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';

export const SANITY_API_VERSION = '2026-07-28';

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion: SANITY_API_VERSION,
} as const;

export const isSanityConfigured = Boolean(projectId && dataset);
