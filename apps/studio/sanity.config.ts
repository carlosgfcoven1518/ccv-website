import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'project-id-pending';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';
const singletonTypes = new Set(['siteSettings']);

export default defineConfig({
  name: 'ccv',
  title: 'CCV — Editorial',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter(
        ({ templateId }) => !singletonTypes.has(templateId),
      ),
    actions: (previousActions, { schemaType }) =>
      schemaType === 'siteSettings'
        ? previousActions.filter(
            ({ action }) => action !== 'delete' && action !== 'duplicate',
          )
        : previousActions,
  },
});
