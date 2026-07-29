import {
  createImageUrlBuilder,
  type ImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';

import { sanityConfig } from './env';

const imageBuilder = sanityConfig.projectId
  ? createImageUrlBuilder({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
    })
  : null;

export function getSanityImageBuilder(
  source: SanityImageSource,
): ImageUrlBuilder | null {
  return imageBuilder?.image(source).auto('format') ?? null;
}
