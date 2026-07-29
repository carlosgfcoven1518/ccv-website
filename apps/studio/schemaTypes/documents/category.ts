import { defineField, defineType } from 'sanity';

import { slugify } from '../utils/slugify';

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .max(80)
          .error('El título de la categoría es obligatorio.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Se genera a partir del título.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify,
      },
      validation: (Rule) =>
        Rule.required().error('Genera un slug para identificar la categoría.'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description:
        'Explica el alcance editorial de la categoría sin usar copy comercial.',
      validation: (Rule) =>
        Rule.max(320).warning(
          'Conviene mantener la descripción por debajo de 320 caracteres.',
        ),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description:
        'Número entero usado para ordenar categorías de menor a mayor.',
      initialValue: 0,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .error('Indica un número entero igual o mayor que cero.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title,
        subtitle: `Orden: ${typeof order === 'number' ? order : 'sin definir'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Orden editorial',
      name: 'editorialOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
});
