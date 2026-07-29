import 'server-only';

import { createClient, type QueryParams } from '@sanity/client';

import { isSanityConfigured, sanityConfig } from './env';

const readToken = process.env.SANITY_API_READ_TOKEN?.trim();

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      perspective: 'published',
      useCdn: !readToken,
      token: readToken,
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params: QueryParams,
  fallback: T,
): Promise<T> {
  if (!sanityClient) {
    return fallback;
  }

  return sanityClient.fetch<T>(query, params);
}
