import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const CONTENT_TYPES = [
  { title: 'Análisis', value: 'analysis' },
  { title: 'Metodología', value: 'methodology' },
  { title: 'Perspectiva', value: 'perspective' },
  { title: 'Caso', value: 'case' },
] as const;

function filteredArticleList(
  S: StructureBuilder,
  title: string,
  filter: string,
  params?: Record<string, string>,
) {
  const list = S.documentList()
    .title(title)
    .schemaType('article')
    .filter(filter)
    .initialValueTemplates([]);

  return params ? list.params(params) : list;
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido editorial')
    .items([
      S.listItem()
        .title('Artículos')
        .child(
          S.list()
            .title('Artículos')
            .items([
              S.documentTypeListItem('article').title('Todos los artículos'),
              S.listItem()
                .title('Borradores')
                .child(
                  filteredArticleList(
                    S,
                    'Borradores',
                    '_type == "article" && _id in path("drafts.**")',
                  ),
                ),
              S.listItem()
                .title('Publicados')
                .child(
                  filteredArticleList(
                    S,
                    'Publicados',
                    '_type == "article" && !(_id in path("drafts.**"))',
                  ),
                ),
              S.listItem()
                .title('Destacados')
                .child(
                  filteredArticleList(
                    S,
                    'Destacados',
                    '_type == "article" && featured == true',
                  ),
                ),
              S.divider(),
              ...CONTENT_TYPES.map(({ title, value }) =>
                S.listItem()
                  .title(title)
                  .child(
                    filteredArticleList(
                      S,
                      title,
                      '_type == "article" && contentType == $contentType',
                      { contentType: value },
                    ),
                  ),
              ),
            ]),
        ),
      S.documentTypeListItem('author').title('Autores'),
      S.documentTypeListItem('category').title('Categorías'),
      S.divider(),
      S.listItem()
        .title('Configuración del sitio')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configuración del sitio'),
        ),
    ]);
