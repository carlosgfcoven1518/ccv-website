import { defineField, defineType } from 'sanity';

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Imagen editorial',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description:
        'Describe la información relevante de la imagen para personas que no pueden verla.',
      validation: (Rule) =>
        Rule.required()
          .max(180)
          .error(
            'Agrega un texto alternativo de hasta 180 caracteres para esta imagen.',
          ),
    }),
    defineField({
      name: 'caption',
      title: 'Pie de imagen',
      type: 'string',
      description:
        'Texto público opcional para aportar contexto, crédito o procedencia.',
      validation: (Rule) =>
        Rule.max(240).warning(
          'Conviene mantener el pie de imagen por debajo de 240 caracteres.',
        ),
    }),
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'caption',
      subtitle: 'alt',
    },
    prepare({ media, title, subtitle }) {
      return {
        media,
        title: title || 'Imagen editorial',
        subtitle,
      };
    },
  },
});
