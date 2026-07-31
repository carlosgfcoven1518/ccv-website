import { defineArrayMember, defineField, defineType } from 'sanity';

export const HOME_HERO_TITLE =
  'Ecosistemas de marketing para crecimiento comercial.';

function imageAltValidation(
  imageField: string,
  message: string,
  value: unknown,
  parent: unknown,
) {
  const fields = parent as Record<string, unknown> | undefined;
  return fields?.[imageField] && !value ? message : true;
}

const titledDescriptionFields = [
  defineField({
    name: 'title',
    title: 'Título',
    type: 'string',
    validation: (Rule) =>
      Rule.required()
        .max(100)
        .error('El título es obligatorio y admite hasta 100 caracteres.'),
  }),
  defineField({
    name: 'description',
    title: 'Descripción',
    type: 'text',
    rows: 4,
    validation: (Rule) =>
      Rule.required()
        .max(420)
        .error('La descripción es obligatoria y admite hasta 420 caracteres.'),
  }),
];

export const homePage = defineType({
  name: 'homePage',
  title: 'Página de inicio',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: [
    { name: 'hero', title: '1. Hero', default: true },
    { name: 'decisionContext', title: '2. Contexto de decisión' },
    { name: 'ecosystem', title: '3. Ecosistema e integración' },
    { name: 'featuredService', title: '4. Servicio destacado' },
    { name: 'operatingModel', title: '5. Modelo de trabajo' },
    { name: 'evidence', title: '6. Evidencia y resultados' },
    { name: 'aboutCcv', title: '7. CCV y experiencia' },
    { name: 'specialization', title: '8. Especialización y contexto' },
    { name: 'analysis', title: '9. Análisis' },
    { name: 'contact', title: '10. Contacto' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'H1 de la Home',
      type: 'string',
      group: 'hero',
      description:
        'Único H1 de la Home. El código fija su posición y semántica; aquí solo se edita el texto plano. Recomendación: hasta 72 caracteres.',
      initialValue: HOME_HERO_TITLE,
      validation: (Rule) => [
        Rule.required().error('El H1 de la Home es obligatorio.'),
        Rule.max(72).warning(
          'Supera los 72 caracteres recomendados; revisa el resultado en móvil y escritorio.',
        ),
        Rule.max(100).error(
          'El H1 admite hasta 100 caracteres para proteger el layout.',
        ),
      ],
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 4,
      group: 'hero',
      description:
        'Explica qué integra CCV, para quién es pertinente y su vínculo con decisiones comerciales. Recomendación: 140–240 caracteres.',
      validation: (Rule) => [
        Rule.required().error('El subtítulo del Hero es obligatorio.'),
        Rule.min(140).warning(
          'El subtítulo puede necesitar más contexto; se recomiendan al menos 140 caracteres.',
        ),
        Rule.max(240).warning(
          'Se recomiendan hasta 240 caracteres para conservar la jerarquía del Hero.',
        ),
        Rule.max(280).error('El subtítulo admite hasta 280 caracteres.'),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen del Hero',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description:
        'Opcional. No debe contener texto ni sustituir el contenido del Hero.',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Texto alternativo del Hero',
      type: 'string',
      group: 'hero',
      hidden: ({ document }) => !document?.heroImage,
      validation: (Rule) => [
        Rule.custom((value, context) =>
          imageAltValidation(
            'heroImage',
            'Agrega texto alternativo cuando exista una imagen del Hero.',
            value,
            context.document,
          ),
        ),
        Rule.max(180).error(
          'El texto alternativo admite hasta 180 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'decisionContext',
      title: 'Contexto de decisión',
      type: 'object',
      group: 'decisionContext',
      description:
        'Enmarca el problema de dirección, coordinación e inversión. El orden visual se define en código.',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Etiqueta breve',
          type: 'string',
          validation: (Rule) =>
            Rule.max(60).error('La etiqueta admite hasta 60 caracteres.'),
        }),
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'intro',
          title: 'Introducción',
          type: 'text',
          rows: 5,
          validation: (Rule) => [
            Rule.required().error('La introducción es obligatoria.'),
            Rule.max(600).warning(
              'Se recomiendan hasta 600 caracteres para conservar una lectura ejecutiva.',
            ),
            Rule.max(800).error('La introducción admite hasta 800 caracteres.'),
          ],
        }),
        defineField({
          name: 'points',
          title: 'Puntos de decisión',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'decisionPoint',
              title: 'Punto',
              type: 'object',
              fields: titledDescriptionFields,
              preview: { select: { title: 'title', subtitle: 'description' } },
            }),
          ],
          validation: (Rule) =>
            Rule.required()
              .min(2)
              .max(4)
              .error('Agrega entre dos y cuatro puntos de decisión.'),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Completa la sección Contexto de decisión.'),
    }),
    defineField({
      name: 'ecosystem',
      title: 'Ecosistema e integración',
      type: 'object',
      group: 'ecosystem',
      description:
        'Explica qué integra CCV y por qué importa. No representa un catálogo de servicios.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'intro',
          title: 'Introducción',
          type: 'text',
          rows: 5,
          validation: (Rule) => [
            Rule.required().error('La introducción es obligatoria.'),
            Rule.max(600).warning(
              'Se recomiendan hasta 600 caracteres para conservar claridad.',
            ),
            Rule.max(800).error('La introducción admite hasta 800 caracteres.'),
          ],
        }),
        defineField({
          name: 'dimensions',
          title: 'Dimensiones del ecosistema',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'ecosystemDimension',
              title: 'Dimensión',
              type: 'object',
              fields: titledDescriptionFields,
              preview: { select: { title: 'title', subtitle: 'description' } },
            }),
          ],
          validation: (Rule) =>
            Rule.required()
              .min(3)
              .max(5)
              .error('Agrega entre tres y cinco dimensiones.'),
        }),
        defineField({
          name: 'image',
          title: 'Imagen editorial',
          type: 'image',
          options: { hotspot: true },
          description:
            'Opcional. Será el único visual elegible para un parallax ligero en una fase posterior.',
        }),
        defineField({
          name: 'imageAlt',
          title: 'Texto alternativo',
          type: 'string',
          hidden: ({ parent }) => !parent?.image,
          validation: (Rule) => [
            Rule.custom((value, context) =>
              imageAltValidation(
                'image',
                'Agrega texto alternativo cuando exista una imagen editorial.',
                value,
                context.parent,
              ),
            ),
            Rule.max(180).error(
              'El texto alternativo admite hasta 180 caracteres.',
            ),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Completa la sección Ecosistema e integración.'),
    }),
    defineField({
      name: 'featuredService',
      title: 'Servicio destacado',
      type: 'reference',
      group: 'featuredService',
      to: [{ type: 'commercialOffer' }],
      description:
        'Opcional. Selecciona un único Servicio activo. La Home omitirá el bloque si la referencia no es pública y válida.',
      options: {
        filter: 'availabilityStatus == "active"',
      },
    }),
    defineField({
      name: 'operatingModel',
      title: 'Modelo de trabajo',
      type: 'object',
      group: 'operatingModel',
      description:
        'Explica el enfoque como una secuencia; el editor no elige iconos, colores ni layout.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'intro',
          title: 'Introducción',
          type: 'text',
          rows: 5,
          validation: (Rule) => [
            Rule.required().error('La introducción es obligatoria.'),
            Rule.max(600).warning(
              'Se recomiendan hasta 600 caracteres para conservar claridad.',
            ),
            Rule.max(800).error('La introducción admite hasta 800 caracteres.'),
          ],
        }),
        defineField({
          name: 'stages',
          title: 'Etapas del modelo',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'operatingStage',
              title: 'Etapa',
              type: 'object',
              fields: titledDescriptionFields,
              preview: { select: { title: 'title', subtitle: 'description' } },
            }),
          ],
          validation: (Rule) =>
            Rule.required()
              .min(3)
              .max(5)
              .error('Agrega entre tres y cinco etapas.'),
        }),
        defineField({
          name: 'scopeNote',
          title: 'Nota de alcance',
          type: 'text',
          rows: 3,
          validation: (Rule) =>
            Rule.max(320).error('La nota admite hasta 320 caracteres.'),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Completa la sección Modelo de trabajo.'),
    }),
    defineField({
      name: 'evidence',
      title: 'Evidencia y resultados',
      type: 'object',
      group: 'evidence',
      description:
        'La sección completa es opcional. Déjala vacía si no existe material público verificable suficiente.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error('El heading es obligatorio cuando se usa la sección.'),
        }),
        defineField({
          name: 'intro',
          title: 'Texto de encuadre',
          type: 'text',
          rows: 4,
          validation: (Rule) =>
            Rule.required()
              .max(600)
              .error(
                'El encuadre es obligatorio cuando se usa la sección y admite hasta 600 caracteres.',
              ),
        }),
        defineField({
          name: 'items',
          title: 'Elementos de evidencia',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'homeEvidenceItem',
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
                  rows: 4,
                  validation: (Rule) =>
                    Rule.required()
                      .max(700)
                      .error(
                        'La afirmación es obligatoria y admite hasta 700 caracteres.',
                      ),
                }),
                defineField({
                  name: 'sourceLabel',
                  title: 'Fuente pública',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.max(120).error(
                      'La fuente admite hasta 120 caracteres.',
                    ),
                }),
                defineField({
                  name: 'sourceUrl',
                  title: 'URL pública',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({ scheme: ['https'] }).error(
                      'La fuente debe usar una URL pública HTTPS.',
                    ),
                }),
                defineField({
                  name: 'internalVerificationNote',
                  title: 'Nota interna de verificación',
                  type: 'text',
                  rows: 3,
                  description: 'No se publica.',
                  validation: (Rule) =>
                    Rule.max(1000).error(
                      'La nota interna admite hasta 1,000 caracteres.',
                    ),
                }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'sourceLabel' },
              },
            }),
          ],
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .max(6)
              .error(
                'Agrega entre una y seis evidencias o elimina la sección completa.',
              ),
        }),
      ],
    }),
    defineField({
      name: 'aboutCcv',
      title: 'CCV y experiencia',
      type: 'object',
      group: 'aboutCcv',
      description:
        'Explica quién dirige o integra el trabajo. No infieras biografías ni credenciales.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'text',
          rows: 6,
          validation: (Rule) => [
            Rule.required().error('La descripción es obligatoria.'),
            Rule.max(900).warning(
              'Se recomiendan hasta 900 caracteres para conservar una lectura ejecutiva.',
            ),
            Rule.max(1200).error(
              'La descripción admite hasta 1,200 caracteres.',
            ),
          ],
        }),
        defineField({
          name: 'leadershipProfile',
          title: 'Perfil de liderazgo',
          type: 'object',
          description: 'Opcional. Usa solo información aprobada y verificable.',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
              validation: (Rule) =>
                Rule.required()
                  .max(100)
                  .error('El nombre es obligatorio dentro del perfil.'),
            }),
            defineField({
              name: 'role',
              title: 'Rol',
              type: 'string',
              validation: (Rule) =>
                Rule.max(120).error('El rol admite hasta 120 caracteres.'),
            }),
            defineField({
              name: 'bio',
              title: 'Perfil breve',
              type: 'text',
              rows: 5,
              validation: (Rule) =>
                Rule.required()
                  .max(700)
                  .error(
                    'El perfil breve es obligatorio y admite hasta 700 caracteres.',
                  ),
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Imagen',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Texto alternativo',
          type: 'string',
          hidden: ({ parent }) => !parent?.image,
          validation: (Rule) => [
            Rule.custom((value, context) =>
              imageAltValidation(
                'image',
                'Agrega texto alternativo cuando exista una imagen.',
                value,
                context.parent,
              ),
            ),
            Rule.max(180).error(
              'El texto alternativo admite hasta 180 caracteres.',
            ),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Completa la sección CCV y experiencia.'),
    }),
    defineField({
      name: 'specialization',
      title: 'Especialización y contexto',
      type: 'object',
      group: 'specialization',
      description:
        'Debe permitir servicios financieros, fintech, negocios complejos y otros sectores con experiencia verificable; no limita CCV a IFNBs.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'text',
          title: 'Texto',
          type: 'text',
          rows: 6,
          validation: (Rule) => [
            Rule.required().error(
              'El texto de especialización es obligatorio.',
            ),
            Rule.max(800).warning(
              'Se recomiendan hasta 800 caracteres para conservar claridad.',
            ),
            Rule.max(1000).error('El texto admite hasta 1,000 caracteres.'),
          ],
        }),
        defineField({
          name: 'contexts',
          title: 'Contextos o sectores',
          type: 'array',
          description:
            'Opcional. Incluye únicamente contextos respaldados por experiencia verificable.',
          of: [
            defineArrayMember({
              name: 'specializationContext',
              title: 'Contexto',
              type: 'object',
              fields: titledDescriptionFields,
              preview: { select: { title: 'title', subtitle: 'description' } },
            }),
          ],
          validation: (Rule) =>
            Rule.max(4).error(
              'Agrega como máximo cuatro contextos o sectores.',
            ),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error(
          'Completa la sección Especialización y contexto.',
        ),
    }),
    defineField({
      name: 'analysisIntro',
      title: 'Introducción de Análisis',
      type: 'object',
      group: 'analysis',
      description:
        'Presenta la sección editorial. La selección de artículos usa el modelo Article existente.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'intro',
          title: 'Introducción',
          type: 'text',
          rows: 4,
          validation: (Rule) =>
            Rule.required()
              .max(500)
              .error(
                'La introducción es obligatoria y admite hasta 500 caracteres.',
              ),
        }),
        defineField({
          name: 'linkLabel',
          title: 'Texto del enlace',
          type: 'string',
          description:
            'Debe describir el destino; evita textos como “clic aquí”.',
          validation: (Rule) =>
            Rule.required()
              .max(80)
              .error(
                'El texto del enlace es obligatorio y admite hasta 80 caracteres.',
              ),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Completa la introducción de Análisis.'),
    }),
    defineField({
      name: 'contactIntro',
      title: 'Introducción de Contacto',
      type: 'object',
      group: 'contact',
      description:
        'El correo y LinkedIn se leen de Configuración del sitio; no los dupliques aquí.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading público',
          type: 'string',
          validation: (Rule) =>
            Rule.required()
              .max(100)
              .error(
                'El heading es obligatorio y admite hasta 100 caracteres.',
              ),
        }),
        defineField({
          name: 'instruction',
          title: 'Instrucción de contacto',
          type: 'text',
          rows: 4,
          validation: (Rule) => [
            Rule.required().error('La instrucción de contacto es obligatoria.'),
            Rule.max(280).error(
              'La instrucción de contacto admite hasta 280 caracteres.',
            ),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.required().error('Completa la introducción de Contacto.'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Página de inicio',
        subtitle: 'Contenido estructurado de la Home',
      };
    },
  },
});
