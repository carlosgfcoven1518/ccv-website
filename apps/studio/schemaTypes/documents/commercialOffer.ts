import {
  defineArrayMember,
  defineField,
  defineType,
  type SlugValue,
} from 'sanity';

import { slugify } from '../utils/slugify';

const HTTPS_URL_PATTERN = /^https:\/\//i;
const FIGURE_PATTERN =
  /(?:\d[\d.,]*\s*%|\$\s*\d|\d[\d.,]*\s*(?:mxn|usd|veces|x)\b)/i;

function hasPotentialFigure(value: unknown): boolean {
  return typeof value === 'string' && FIGURE_PATTERN.test(value);
}

export const commercialOffer = defineType({
  name: 'commercialOffer',
  title: 'Servicio',
  type: 'document',
  groups: [
    { name: 'identification', title: 'Identificación', default: true },
    { name: 'content', title: 'Contenido comercial' },
    { name: 'methodology', title: 'Metodología y etapas' },
    { name: 'deliverables', title: 'Entregables' },
    { name: 'evidence', title: 'Evidencia' },
    { name: 'image', title: 'Imagen' },
    { name: 'contact', title: 'Contacto' },
    { name: 'seo', title: 'SEO' },
    { name: 'publication', title: 'Publicación' },
    { name: 'internal', title: 'Notas internas' },
  ],
  fields: [
    defineField({
      name: 'internalName',
      title: 'Nombre interno',
      type: 'string',
      group: 'identification',
      description:
        'Nombre operativo para identificar el servicio en Studio. No se publica en el sitio.',
      validation: (Rule) => [
        Rule.required().error('El nombre interno es obligatorio.'),
        Rule.min(3).warning('Conviene usar al menos 3 caracteres.'),
        Rule.max(100).warning(
          'Conviene mantener el nombre interno debajo de 100 caracteres.',
        ),
        Rule.max(120).error('El nombre interno admite hasta 120 caracteres.'),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Título público',
      type: 'string',
      group: 'identification',
      description: 'Título público principal de la página del servicio.',
      validation: (Rule) => [
        Rule.required().error('El título principal es obligatorio.'),
        Rule.min(20).warning(
          'El título suele funcionar mejor a partir de 20 caracteres.',
        ),
        Rule.max(90).warning(
          'El título suele funcionar mejor por debajo de 90 caracteres.',
        ),
        Rule.max(100).error(
          'El título no puede superar 100 caracteres porque rompería el layout previsto.',
        ),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identification',
      description:
        'Se genera desde el título. La URL pública será /servicios/[slug]/. Evita cambiarlo después de publicar.',
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
          context.document?._createdAt !== context.document?._updatedAt
            ? 'Cambiar el slug de un servicio existente puede romper enlaces públicos. Confirma el cambio antes de publicar.'
            : true,
        ).warning(),
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'Complementa el título. Longitud editorial recomendada: 80–220 caracteres.',
      validation: (Rule) => [
        Rule.min(80).warning(
          'El subtítulo puede necesitar más contexto; se recomiendan al menos 80 caracteres.',
        ),
        Rule.max(220).warning(
          'Se recomiendan hasta 220 caracteres para conservar el ritmo editorial.',
        ),
        Rule.max(260).error('El subtítulo admite hasta 260 caracteres.'),
      ],
    }),
    defineField({
      name: 'cardSummary',
      title: 'Resumen para tarjetas',
      type: 'text',
      rows: 4,
      group: 'content',
      description:
        'Resumen breve usado en la Home y en futuras listas. Longitud recomendada: 120–220 caracteres.',
      validation: (Rule) => [
        Rule.required().error('El resumen para tarjetas es obligatorio.'),
        Rule.min(120).warning(
          'Se recomiendan al menos 120 caracteres para explicar el servicio.',
        ),
        Rule.max(220).warning(
          'Se recomiendan hasta 220 caracteres para tarjetas compactas.',
        ),
        Rule.max(240).error(
          'El resumen no puede superar 240 caracteres porque rompería las tarjetas previstas.',
        ),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Introducción',
      type: 'text',
      rows: 6,
      group: 'content',
      description:
        'Abre la página y sitúa la decisión comercial. Longitud recomendada: 200–600 caracteres.',
      validation: (Rule) => [
        Rule.required().error('La introducción es obligatoria.'),
        Rule.min(200).warning(
          'La introducción suele necesitar al menos 200 caracteres.',
        ),
        Rule.max(600).warning(
          'Se recomiendan hasta 600 caracteres para una apertura legible.',
        ),
        Rule.max(800).error('La introducción admite hasta 800 caracteres.'),
      ],
    }),
    defineField({
      name: 'problemStatement',
      title: 'Problema que resuelve',
      type: 'text',
      rows: 7,
      group: 'content',
      description:
        'Describe el problema de negocio sin promesas no verificables. Longitud recomendada: 200–900 caracteres.',
      validation: (Rule) => [
        Rule.required().error('Describe el problema que resuelve el servicio.'),
        Rule.min(200).warning(
          'El problema suele requerir al menos 200 caracteres de contexto.',
        ),
        Rule.max(900).warning(
          'Se recomiendan hasta 900 caracteres para mantener la sección enfocada.',
        ),
        Rule.max(1000).error(
          'El problema que resuelve admite hasta 1,000 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'audiences',
      title: 'Audiencias',
      type: 'array',
      group: 'content',
      description: 'Entre una y cinco audiencias concretas para este servicio.',
      of: [
        defineArrayMember({
          name: 'serviceAudience',
          title: 'Audiencia',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .max(80)
                  .error(
                    'El nombre es obligatorio y admite hasta 80 caracteres.',
                  ),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 3,
              validation: (Rule) =>
                Rule.required()
                  .max(240)
                  .error(
                    'La descripción es obligatoria y admite hasta 240 caracteres.',
                  ),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'description' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error('Agrega entre una y cinco audiencias.'),
    }),
    defineField({
      name: 'contextSymptoms',
      title: 'Contexto o síntomas',
      type: 'array',
      group: 'content',
      description:
        'Señales observables que ayudan a reconocer el problema. Agrega entre dos y seis cuando se use esta sección.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(180)
              .error('Cada síntoma admite hasta 180 caracteres.'),
        }),
      ],
      validation: (Rule) => [
        Rule.min(2).warning(
          'Si incluyes esta sección, conviene agregar al menos dos síntomas.',
        ),
        Rule.max(6).error('Agrega como máximo seis síntomas.'),
      ],
    }),
    defineField({
      name: 'proposal',
      title: 'Propuesta',
      type: 'text',
      rows: 8,
      group: 'content',
      description:
        'Explica la intervención propuesta y su alcance. Longitud recomendada: 250–1,000 caracteres.',
      validation: (Rule) => [
        Rule.required().error('La propuesta es obligatoria.'),
        Rule.min(250).warning(
          'La propuesta suele necesitar al menos 250 caracteres.',
        ),
        Rule.max(1000).warning(
          'Se recomiendan hasta 1,000 caracteres para conservar claridad.',
        ),
        Rule.max(1200).error('La propuesta admite hasta 1,200 caracteres.'),
      ],
    }),
    defineField({
      name: 'expectedBenefits',
      title: 'Beneficios esperados',
      type: 'array',
      group: 'content',
      description:
        'Beneficios razonables, sin convertir expectativas en garantías ni enlazarlas a evidencias internas.',
      of: [
        defineArrayMember({
          name: 'expectedBenefit',
          title: 'Beneficio',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .max(80)
                  .error(
                    'El título es obligatorio y admite hasta 80 caracteres.',
                  ),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 4,
              validation: (Rule) =>
                Rule.required()
                  .max(280)
                  .error(
                    'La descripción es obligatoria y admite hasta 280 caracteres.',
                  ),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(6)
          .error('Agrega entre uno y seis beneficios esperados.'),
    }),
    defineField({
      name: 'methodology',
      title: 'Metodología',
      type: 'text',
      rows: 6,
      group: 'methodology',
      description:
        'Resume el enfoque de trabajo. Se recomiendan hasta 500 caracteres.',
      validation: (Rule) => [
        Rule.required().error('La metodología es obligatoria.'),
        Rule.max(500).warning(
          'Se recomiendan hasta 500 caracteres para el resumen metodológico.',
        ),
        Rule.max(700).error('La metodología admite hasta 700 caracteres.'),
      ],
    }),
    defineField({
      name: 'stages',
      title: 'Etapas',
      type: 'array',
      group: 'methodology',
      description: 'Secuencia ordenada de entre dos y seis etapas.',
      of: [
        defineArrayMember({
          name: 'serviceStage',
          title: 'Etapa',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .max(80)
                  .error(
                    'El título es obligatorio y admite hasta 80 caracteres.',
                  ),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 5,
              validation: (Rule) => [
                Rule.required().error(
                  'La descripción de la etapa es obligatoria.',
                ),
                Rule.min(100).warning(
                  'La etapa suele necesitar al menos 100 caracteres.',
                ),
                Rule.max(500).error(
                  'La descripción de la etapa admite hasta 500 caracteres.',
                ),
              ],
            }),
            defineField({
              name: 'outcome',
              title: 'Resultado de la etapa',
              type: 'text',
              rows: 3,
              validation: (Rule) =>
                Rule.max(240).error(
                  'El resultado de la etapa admite hasta 240 caracteres.',
                ),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'outcome' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(2).max(6).error('Agrega entre dos y seis etapas.'),
    }),
    defineField({
      name: 'deliverables',
      title: 'Entregables',
      type: 'array',
      group: 'deliverables',
      description: 'Entre uno y ocho entregables concretos.',
      of: [
        defineArrayMember({
          name: 'serviceDeliverable',
          title: 'Entregable',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .max(80)
                  .error(
                    'El título es obligatorio y admite hasta 80 caracteres.',
                  ),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 4,
              validation: (Rule) => [
                Rule.required().error(
                  'La descripción del entregable es obligatoria.',
                ),
                Rule.min(40).warning(
                  'La descripción suele necesitar al menos 40 caracteres.',
                ),
                Rule.max(320).error(
                  'La descripción del entregable admite hasta 320 caracteres.',
                ),
              ],
            }),
            defineField({
              name: 'format',
              title: 'Formato',
              type: 'string',
              validation: (Rule) =>
                Rule.max(80).error('El formato admite hasta 80 caracteres.'),
            }),
            defineField({
              name: 'notes',
              title: 'Notas públicas',
              type: 'text',
              rows: 3,
              validation: (Rule) =>
                Rule.max(240).error(
                  'Las notas del entregable admiten hasta 240 caracteres.',
                ),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'format' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(8)
          .error('Agrega entre uno y ocho entregables.'),
    }),
    defineField({
      name: 'evidenceItems',
      title: 'Evidencia disponible',
      type: 'array',
      group: 'evidence',
      description:
        'Incluye solo evidencia revisable. Toda cifra o afirmación verificable debe revisarse antes de publicar.',
      of: [
        defineArrayMember({
          name: 'serviceEvidence',
          title: 'Evidencia',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .max(100)
                  .error(
                    'El título es obligatorio y admite hasta 100 caracteres.',
                  ),
            }),
            defineField({
              name: 'statement',
              title: 'Afirmación o descripción pública',
              type: 'text',
              rows: 5,
              description:
                'Explica la evidencia sin revelar notas de verificación internas.',
              validation: (Rule) => [
                Rule.required().error('La afirmación pública es obligatoria.'),
                Rule.min(80).warning(
                  'La afirmación suele necesitar al menos 80 caracteres.',
                ),
                Rule.max(500).warning(
                  'Se recomiendan hasta 500 caracteres para mantener claridad.',
                ),
                Rule.max(700).error(
                  'La afirmación pública admite hasta 700 caracteres.',
                ),
              ],
            }),
            defineField({
              name: 'sourceLabel',
              title: 'Fuente pública',
              type: 'string',
              validation: (Rule) =>
                Rule.max(120).error(
                  'El nombre de la fuente admite hasta 120 caracteres.',
                ),
            }),
            defineField({
              name: 'sourceUrl',
              title: 'URL pública',
              type: 'url',
              description: 'Debe ser una URL HTTPS accesible públicamente.',
              validation: (Rule) =>
                Rule.custom((value) =>
                  !value || HTTPS_URL_PATTERN.test(value)
                    ? true
                    : 'Usa una URL pública que comience con https://.',
                ),
            }),
            defineField({
              name: 'internalVerificationNote',
              title: 'Nota interna de verificación',
              type: 'text',
              rows: 4,
              description:
                'No se publica. Documenta cómo revisar cifras o afirmaciones sensibles.',
              validation: (Rule) => [
                Rule.max(1000).error(
                  'La nota interna admite hasta 1,000 caracteres.',
                ),
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    { statement?: unknown; sourceUrl?: unknown } | undefined;

                  if (
                    hasPotentialFigure(parent?.statement) &&
                    !parent?.sourceUrl &&
                    !value
                  ) {
                    return 'La afirmación parece contener una cifra. Agrega una URL pública o una nota interna para facilitar su revisión.';
                  }

                  return true;
                }).warning(),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'sourceLabel' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.max(6).error('Agrega como máximo seis evidencias.'),
    }),
    defineField({
      name: 'clarifications',
      title: 'Aclaraciones y límites',
      type: 'array',
      group: 'content',
      description:
        'Aclara dependencias, exclusiones o límites relevantes. Se omite públicamente cuando está vacío.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(280)
              .error('Cada aclaración admite hasta 280 caracteres.'),
        }),
      ],
      validation: (Rule) =>
        Rule.max(6).error('Agrega como máximo seis aclaraciones.'),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen principal',
      type: 'image',
      group: 'image',
      options: { hotspot: true },
      description:
        'Imagen opcional para la página y la tarjeta del servicio. No agregues texto dentro de la imagen.',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Texto alternativo',
      type: 'string',
      group: 'image',
      hidden: ({ document }) => !document?.heroImage,
      description:
        'Describe la función o contenido de la imagen de forma concisa.',
      validation: (Rule) => [
        Rule.custom((value, context) =>
          context.document?.heroImage && !value
            ? 'Agrega texto alternativo cuando exista una imagen principal.'
            : true,
        ),
        Rule.max(180).error(
          'El texto alternativo admite hasta 180 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'contactInstruction',
      title: 'Instrucción de contacto',
      type: 'text',
      rows: 4,
      group: 'contact',
      description:
        'Texto directo para cerrar la página. Si se omite, la implementación futura podrá usar el contacto global.',
      validation: (Rule) => [
        Rule.min(80).warning(
          'La instrucción suele necesitar al menos 80 caracteres.',
        ),
        Rule.max(240).warning(
          'Se recomiendan hasta 240 caracteres para mantener un cierre directo.',
        ),
        Rule.max(280).error(
          'La instrucción de contacto admite hasta 280 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      group: 'seo',
      description:
        'Opcional. Si se omite, se usa el título principal. Longitud recomendada: 30–60 caracteres.',
      validation: (Rule) => [
        Rule.min(30).warning('Se recomiendan al menos 30 caracteres.'),
        Rule.max(60).warning('Se recomiendan hasta 60 caracteres.'),
        Rule.max(65).error('El título SEO admite hasta 65 caracteres.'),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        'Opcional. Si se omite, se usa el resumen para tarjetas. Longitud recomendada: 120–160 caracteres.',
      validation: (Rule) => [
        Rule.min(120).warning('Se recomiendan al menos 120 caracteres.'),
        Rule.max(160).warning('Se recomiendan hasta 160 caracteres.'),
        Rule.max(170).error('La descripción SEO admite hasta 170 caracteres.'),
      ],
    }),
    defineField({
      name: 'noindex',
      title: 'Excluir de buscadores',
      type: 'boolean',
      group: 'seo',
      description:
        'Actívalo solo cuando exista una razón editorial para impedir la indexación.',
      initialValue: false,
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Vigencia comercial',
      type: 'string',
      group: 'publication',
      description:
        'Un servicio retirado deja de aparecer en selecciones y rutas activas; su URL histórica se resolverá caso por caso.',
      options: {
        list: [
          { title: 'Activo', value: 'active' },
          { title: 'Retirado', value: 'retired' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) =>
        Rule.required().error('Selecciona la vigencia comercial.'),
    }),
    defineField({
      name: 'internalNotes',
      title: 'Notas internas',
      type: 'text',
      rows: 6,
      group: 'internal',
      description: 'No se publica. Úsalo solo para contexto editorial interno.',
      validation: (Rule) =>
        Rule.max(2000).error(
          'Las notas internas admiten hasta 2,000 caracteres.',
        ),
    }),
  ],
  orderings: [
    {
      title: 'Actualización reciente',
      name: 'updatedAtDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
    {
      title: 'Título A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'internalName',
      publicTitle: 'title',
      availabilityStatus: 'availabilityStatus',
      media: 'heroImage',
    },
    prepare({ title, publicTitle, availabilityStatus, media }) {
      const status = availabilityStatus === 'retired' ? 'Retirado' : 'Activo';

      return {
        title: title || publicTitle || 'Servicio sin nombre',
        subtitle: `${status} · ${publicTitle || 'Sin título público'}`,
        media,
      };
    },
  },
});
