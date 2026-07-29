import {
  defineArrayMember,
  defineField,
  defineType,
  type SlugValue,
} from 'sanity';

import { slugify } from '../utils/slugify';

const CONTENT_TYPE_LABELS: Record<string, string> = {
  analysis: 'Análisis',
  methodology: 'Metodología',
  perspective: 'Perspectiva',
  case: 'Caso',
};

const FEATURED_LIMIT = 3;
const VALIDATION_API_VERSION = '2026-07-28';

function getDocumentString(
  document: Record<string, unknown> | undefined,
  key: string,
): string | undefined {
  const value = document?.[key];
  return typeof value === 'string' ? value : undefined;
}

export const article = defineType({
  name: 'article',
  title: 'Artículo',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'publication', title: 'Publicación' },
    { name: 'seo', title: 'SEO' },
    { name: 'sources', title: 'Fuentes' },
    { name: 'relations', title: 'Relaciones' },
    { name: 'internal', title: 'Notas internas' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .max(90)
          .error('El título es obligatorio y admite hasta 90 caracteres.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'publication',
      description:
        'Se genera desde el título. Evita cambiarlo después de publicar para no romper enlaces.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify,
      },
      validation: (Rule) => [
        Rule.required().error('Genera un slug antes de publicar.'),
        Rule.custom((value: SlugValue | undefined) => {
          if (!value?.current) {
            return true;
          }

          if (value.current.length > 96) {
            return 'El slug no puede superar 96 caracteres.';
          }

          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
            ? true
            : 'Usa únicamente minúsculas, números y guiones simples.';
        }),
        Rule.custom((_value, context) =>
          context.document?.publishedAt
            ? 'Este artículo ya tiene fecha de publicación. Cambiar el slug puede romper enlaces existentes.'
            : true,
        ).warning(),
      ],
    }),
    defineField({
      name: 'contentType',
      title: 'Tipo de contenido',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Análisis', value: 'analysis' },
          { title: 'Metodología', value: 'methodology' },
          { title: 'Perspectiva', value: 'perspective' },
          { title: 'Caso', value: 'case' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().error('Selecciona un tipo de contenido.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Resumen público recomendado entre 140 y 220 caracteres.',
      validation: (Rule) => [
        Rule.required().error('El extracto es obligatorio.'),
        Rule.min(140).warning(
          'El extracto debería tener al menos 140 caracteres.',
        ),
        Rule.max(220).error('El extracto no puede superar 220 caracteres.'),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo',
      type: 'blockContent',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('Agrega contenido al cuerpo antes de publicar.'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Texto alternativo de portada',
      type: 'string',
      group: 'content',
      hidden: ({ document }) => !document?.coverImage,
      validation: (Rule) => [
        Rule.custom((value, context) => {
          if (context.document?.coverImage && !value) {
            return 'Agrega texto alternativo cuando exista una imagen de portada.';
          }

          return true;
        }),
        Rule.max(180).warning(
          'Conviene mantener el texto alternativo por debajo de 180 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'relations',
      validation: (Rule) =>
        Rule.required().error('Selecciona un autor antes de publicar.'),
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      group: 'relations',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .unique()
          .error('Selecciona al menos una categoría sin duplicados.'),
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Artículos relacionados',
      type: 'array',
      group: 'relations',
      description: 'Selección manual de hasta cuatro artículos.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }],
          options: {
            filter: ({ document }) => ({
              filter: '_id != $id && _id != $draftId',
              params: {
                id: String(document?._id ?? '').replace(/^drafts\./, ''),
                draftId: `drafts.${String(document?._id ?? '').replace(
                  /^drafts\./,
                  '',
                )}`,
              },
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.max(4).unique().error('Selecciona como máximo cuatro artículos.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'publication',
      description:
        'Los borradores pueden guardarse incompletos, pero esta fecha es obligatoria para publicar.',
      validation: (Rule) =>
        Rule.required().error(
          'Define la fecha de publicación antes de publicar.',
        ),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Fecha de actualización editorial',
      type: 'datetime',
      group: 'publication',
      description:
        'Opcional. Úsala únicamente cuando una actualización pública sea relevante.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const publishedAt = getDocumentString(
            context.document,
            'publishedAt',
          );

          if (
            typeof value === 'string' &&
            publishedAt &&
            new Date(value) < new Date(publishedAt)
          ) {
            return 'La actualización no puede ser anterior a la publicación.';
          }

          return true;
        }),
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de lectura',
      type: 'number',
      group: 'publication',
      description: 'Estimación editorial manual expresada en minutos.',
      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .error('Usa un número entero de minutos igual o mayor que uno.'),
    }),
    defineField({
      name: 'editorialStatus',
      title: 'Estado editorial',
      type: 'string',
      group: 'publication',
      description:
        'Control interno del flujo. La publicación real la determina Sanity.',
      initialValue: 'inProgress',
      options: {
        list: [
          { title: 'En preparación', value: 'inProgress' },
          { title: 'En revisión', value: 'review' },
          { title: 'Listo para publicar', value: 'ready' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().error('Selecciona un estado editorial.'),
    }),
    defineField({
      name: 'featured',
      title: 'Artículo destacado',
      type: 'boolean',
      group: 'publication',
      initialValue: false,
      description:
        'Puede haber como máximo tres artículos publicados marcados como destacados.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) {
            return true;
          }

          const documentId = String(context.document?._id ?? '').replace(
            /^drafts\./,
            '',
          );
          const client = context.getClient({
            apiVersion: VALIDATION_API_VERSION,
          });

          try {
            const featuredCount = await client.fetch<number>(
              `count(*[
                _type == "article" &&
                featured == true &&
                !(_id in path("drafts.**")) &&
                _id != $documentId
              ])`,
              { documentId },
            );

            return featuredCount < FEATURED_LIMIT
              ? true
              : `Ya existen ${FEATURED_LIMIT} artículos publicados destacados. Desmarca uno antes de publicar otro.`;
          } catch {
            return 'No fue posible comprobar el límite de destacados. Revisa la conexión con Sanity antes de publicar.';
          }
        }),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      group: 'seo',
      description:
        'Título para buscadores. No es el título visible del artículo.',
      validation: (Rule) => [
        Rule.required().error('El título SEO es obligatorio para publicar.'),
        Rule.max(60).warning(
          'Conviene mantener el título SEO por debajo de 60 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => [
        Rule.required().error(
          'La descripción SEO es obligatoria para publicar.',
        ),
        Rule.min(120).warning(
          'La descripción SEO suele funcionar mejor a partir de 120 caracteres.',
        ),
        Rule.max(160).warning(
          'Conviene mantener la descripción SEO por debajo de 160 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'focusQuery',
      title: 'Consulta objetivo',
      type: 'string',
      group: 'seo',
      description:
        'Referencia editorial opcional. No se publica ni modifica el contenido automáticamente.',
    }),
    defineField({
      name: 'socialImage',
      title: 'Imagen para compartir',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL canónica',
      type: 'url',
      group: 'seo',
      description:
        'Opcional. Úsala solo cuando la URL canónica deba apuntar a otro origen.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).error(
          'Agrega una URL http o https válida.',
        ),
    }),
    defineField({
      name: 'noindex',
      title: 'Excluir de buscadores',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description:
        'Actívalo únicamente cuando el artículo publicado no deba indexarse.',
    }),
    defineField({
      name: 'sources',
      title: 'Fuentes',
      type: 'array',
      group: 'sources',
      of: [
        defineArrayMember({
          type: 'editorialSource',
        }),
      ],
    }),
    defineField({
      name: 'internalNotes',
      title: 'Notas internas',
      type: 'text',
      rows: 6,
      group: 'internal',
      description:
        'Solo para coordinación editorial. Nunca debe proyectarse en el sitio público.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      publishedAt: 'publishedAt',
      editorialStatus: 'editorialStatus',
      media: 'coverImage',
    },
    prepare({ title, contentType, publishedAt, editorialStatus, media }) {
      const typeLabel = CONTENT_TYPE_LABELS[String(contentType)] ?? 'Sin tipo';
      const dateLabel = publishedAt
        ? new Intl.DateTimeFormat('es-MX', {
            dateStyle: 'medium',
            timeZone: 'UTC',
          }).format(new Date(String(publishedAt)))
        : 'Sin fecha';
      const statusLabel =
        editorialStatus === 'ready'
          ? 'Listo'
          : editorialStatus === 'review'
            ? 'En revisión'
            : 'En preparación';

      return {
        title: title || 'Artículo sin título',
        subtitle: `${typeLabel} · ${dateLabel} · ${statusLabel}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Publicación más reciente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Título A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
