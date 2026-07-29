import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identidad', default: true },
    { name: 'seo', title: 'SEO predeterminado' },
    { name: 'contact', title: 'Contacto' },
    { name: 'legal', title: 'Legal y localización' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre del sitio',
      type: 'string',
      group: 'identity',
      initialValue: 'CCV — Coven Creative Ventures',
      validation: (Rule) =>
        Rule.required().error('El nombre del sitio es obligatorio.'),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descripción del sitio',
      type: 'text',
      rows: 3,
      group: 'identity',
      initialValue:
        'Dirección e integración de marketing orientada a resultados comerciales medibles.',
      validation: (Rule) => [
        Rule.required().error('La descripción del sitio es obligatoria.'),
        Rule.max(240).warning(
          'Conviene mantener la descripción por debajo de 240 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL del sitio',
      type: 'url',
      group: 'identity',
      initialValue: 'https://covenpr.com',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['http', 'https'] })
          .error('Agrega la URL pública completa del sitio.'),
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Título SEO predeterminado',
      type: 'string',
      group: 'seo',
      description:
        'Campo configurable. No se completa con copy provisional automáticamente.',
      validation: (Rule) => [
        Rule.required().error('Define el título SEO predeterminado.'),
        Rule.max(60).warning(
          'Conviene mantener el título SEO por debajo de 60 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Descripción SEO predeterminada',
      type: 'text',
      rows: 3,
      group: 'seo',
      description:
        'Campo configurable. Debe aprobarse antes de publicar la configuración.',
      validation: (Rule) => [
        Rule.required().error('Define la descripción SEO predeterminada.'),
        Rule.max(160).warning(
          'Conviene mantener la descripción SEO por debajo de 160 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'defaultSocialImage',
      title: 'Imagen social predeterminada',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correo público de contacto',
      type: 'string',
      group: 'contact',
      initialValue: 'carlos@covenpr.com',
      validation: (Rule) =>
        Rule.required().email().error('Agrega una dirección de correo válida.'),
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'URL de LinkedIn',
      type: 'url',
      group: 'contact',
      initialValue: 'https://www.linkedin.com/in/carlosgallegosflores/',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).error(
          'Agrega una URL http o https válida.',
        ),
    }),
    defineField({
      name: 'legalName',
      title: 'Nombre legal',
      type: 'string',
      group: 'legal',
      description:
        'Déjalo vacío hasta contar con la denominación legal aprobada.',
    }),
    defineField({
      name: 'locale',
      title: 'Configuración regional',
      type: 'string',
      group: 'legal',
      initialValue: 'es-MX',
      options: {
        list: [{ title: 'Español (México)', value: 'es-MX' }],
      },
      validation: (Rule) =>
        Rule.required().error('Selecciona la configuración regional.'),
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteUrl',
      media: 'defaultSocialImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Configuración del sitio',
        subtitle,
        media,
      };
    },
  },
});
