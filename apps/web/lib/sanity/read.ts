import 'server-only';

import {
  DIRECTION_SERVICE_FALLBACK,
  DIRECTION_SERVICE_METADATA,
} from '../fallbackContent';
import { sanityFetch } from './client';
import {
  isValidServiceSlug,
  normalizeCommercialService,
  normalizeFeaturedArticles,
  normalizeHomePage,
  restrictFeaturedServiceToExport,
  normalizeSiteSettings,
  normalizeServicePageMetadata,
  normalizeServiceSlugs,
} from './normalizers';
import {
  featuredArticlesQuery,
  homePageQuery,
  publishedActiveServiceBySlugQuery,
  publishedActiveServiceSlugsQuery,
  servicePageMetadataBySlugQuery,
  siteSettingsQuery,
} from './queries';
import { withReadFallback } from './safeRead';
import type {
  ArticleSummary,
  CommercialService,
  CommercialServiceSummary,
  HomePage,
  PublicSiteSettings,
  ServicePageMetadata,
} from './types';

export async function getHomePage(): Promise<HomePage | null> {
  const [result, serviceSlugs] = await Promise.all([
    withReadFallback(() => sanityFetch<unknown>(homePageQuery, {}, null), null),
    withReadFallback(
      () => sanityFetch<unknown>(publishedActiveServiceSlugsQuery, {}, []),
      [],
    ),
  ]);

  return restrictFeaturedServiceToExport(
    normalizeHomePage(result),
    serviceSlugs,
  );
}

export async function getFeaturedArticles(): Promise<ArticleSummary[]> {
  const result = await withReadFallback(
    () => sanityFetch<unknown>(featuredArticlesQuery, {}, []),
    [],
  );
  return normalizeFeaturedArticles(result);
}

export async function getSiteSettings(): Promise<PublicSiteSettings | null> {
  const result = await withReadFallback(
    () => sanityFetch<unknown>(siteSettingsQuery, {}, null),
    null,
  );
  return normalizeSiteSettings(result);
}

export async function getFeaturedService(): Promise<CommercialServiceSummary | null> {
  const homePage = await getHomePage();
  return homePage?.featuredService ?? null;
}

export async function getPublishedActiveServiceSlugs(): Promise<string[]> {
  const result = await withReadFallback(
    () => sanityFetch<unknown>(publishedActiveServiceSlugsQuery, {}, []),
    [],
  );
  return Array.from(
    new Set([
      ...normalizeServiceSlugs(result),
      DIRECTION_SERVICE_FALLBACK.slug,
    ]),
  );
}

export async function getPublishedActiveServiceBySlug(
  slug: string,
): Promise<CommercialService | null> {
  if (!isValidServiceSlug(slug)) {
    return null;
  }

  const result = await withReadFallback(
    () =>
      sanityFetch<unknown>(publishedActiveServiceBySlugQuery, { slug }, null),
    null,
  );
  return (
    normalizeCommercialService(result) ??
    (slug === DIRECTION_SERVICE_FALLBACK.slug
      ? DIRECTION_SERVICE_FALLBACK
      : null)
  );
}

export async function getServicePageMetadata(
  slug: string,
): Promise<ServicePageMetadata | null> {
  if (!isValidServiceSlug(slug)) {
    return null;
  }

  const result = await withReadFallback(
    () => sanityFetch<unknown>(servicePageMetadataBySlugQuery, { slug }, null),
    null,
  );
  return (
    normalizeServicePageMetadata(result) ??
    (slug === DIRECTION_SERVICE_FALLBACK.slug
      ? DIRECTION_SERVICE_METADATA
      : null)
  );
}
