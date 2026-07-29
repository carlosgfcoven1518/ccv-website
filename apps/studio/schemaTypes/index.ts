import type { SchemaTypeDefinition } from 'sanity';

import { article } from './documents/article';
import { author } from './documents/author';
import { category } from './documents/category';
import { siteSettings } from './documents/siteSettings';
import { blockContent } from './objects/blockContent';
import { editorialImage } from './objects/editorialImage';
import { editorialSource } from './objects/editorialSource';

export const schemaTypes: SchemaTypeDefinition[] = [
  article,
  author,
  category,
  siteSettings,
  blockContent,
  editorialImage,
  editorialSource,
];
