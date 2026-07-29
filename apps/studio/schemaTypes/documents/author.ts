import { defineField, defineType } from 'sanity';

import { slugify } from '../utils/slugify';

export const author = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Perfil', default: true },
    { name: 'contact', title: 'Contacto' },
    { name: 'internal', title: 'Información interna' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      group: 'profile',
      validation: (Rule) =>
        Rule.required().max(100).error('El nombre del autor es obligatorio.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      description:
        'Se genera a partir del nombre y puede ajustarse antes de publicar.',
      options: {
        source: 'name',
        maxLength: 96,
        slugify,
      },
      validation: (Rule) =>
        Rule.required().error('Genera un slug para identificar al autor.'),
    }),
    defineField({
      name: 'role',
      title: 'Cargo o función',
      type: 'string',
      group: 'profile',
      validation: (Rule) =>
        Rule.required().max(120).error('Indica el cargo o función del autor.'),
    }),
    defineField({
      name: 'shortBio',
      title: 'Biografía breve',
      type: 'text',
      rows: 4,
      group: 'profile',
      validation: (Rule) => [
        Rule.required().error('La biografía breve es obligatoria.'),
        Rule.max(320).warning(
          'Conviene mantener la biografía breve por debajo de 320 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'longBio',
      title: 'Biografía ampliada',
      type: 'text',
      rows: 8,
      group: 'profile',
      description: 'Opcional. Se reserva para futuras páginas de autor.',
    }),
    defineField({
      name: 'image',
      title: 'Fotografía',
      type: 'image',
      group: 'profile',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texto alternativo de la fotografía',
      type: 'string',
      group: 'profile',
      hidden: ({ document }) => !document?.image,
      validation: (Rule) => [
        Rule.custom((value, context) => {
          if (context.document?.image && !value) {
            return 'Agrega texto alternativo cuando exista una fotografía.';
          }

          return true;
        }),
        Rule.max(180).warning(
          'Conviene mantener el texto alternativo por debajo de 180 caracteres.',
        ),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      group: 'contact',
      description: 'Opcional. Solo se publicará cuando la interfaz lo indique.',
      validation: (Rule) =>
        Rule.email().error('Agrega una dirección de correo válida.'),
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      group: 'contact',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).error(
          'Agrega una URL http o https válida.',
        ),
    }),
    defineField({
      name: 'credentials',
      title: 'Credenciales o experiencia destacada',
      type: 'array',
      group: 'internal',
      description:
        'Datos verificables para revisión editorial. No se publican automáticamente.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Nombre A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
