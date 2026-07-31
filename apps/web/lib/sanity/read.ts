import 'server-only';

import { sanityFetch } from './client';
import {
  isValidServiceSlug,
  normalizeCommercialService,
  normalizeHomePage,
  normalizeServicePageMetadata,
  normalizeServiceSlugs,
} from './normalizers';
import {
  homePageQuery,
  publishedActiveServiceBySlugQuery,
  publishedActiveServiceSlugsQuery,
  servicePageMetadataBySlugQuery,
} from './queries';
import type {
  CommercialService,
  CommercialServiceSummary,
  HomePage,
  ServicePageMetadata,
} from './types';

export async function getHomePage(): Promise<HomePage | null> {
  const result = await sanityFetch<unknown>(homePageQuery, {}, null);
  return normalizeHomePage(result);
}

export async function getFeaturedService(): Promise<CommercialServiceSummary | null> {
  const homePage = await getHomePage();
  return homePage?.featuredService ?? null;
}

export async function getPublishedActiveServiceSlugs(): Promise<string[]> {
  const result = await sanityFetch<unknown>(
    publishedActiveServiceSlugsQuery,
    {},
    [],
  );
  return normalizeServiceSlugs(result);
}

export async function getPublishedActiveServiceBySlug(
  slug: string,
): Promise<CommercialService | null> {
  if (!isValidServiceSlug(slug)) {
    return null;
  }

  const result = await sanityFetch<unknown>(
    publishedActiveServiceBySlugQuery,
    { slug },
    null,
  );
  return normalizeCommercialService(result);
}

export async function getServicePageMetadata(
  slug: string,
): Promise<ServicePageMetadata | null> {
  if (!isValidServiceSlug(slug)) {
    return null;
  }

  const result = await sanityFetch<unknown>(
    servicePageMetadataBySlugQuery,
    { slug },
    null,
  );
  return normalizeServicePageMetadata(result);
}
