import { defineField, defineType } from 'sanity';

export const editorialSource = defineType({
  name: 'editorialSource',
  title: 'Fuente editorial',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la fuente',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('Indica el título de la fuente.'),
    }),
    defineField({
      name: 'publisher',
      title: 'Publicador o institución',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['http', 'https'] })
          .error('Agrega una URL http o https válida.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación de la fuente',
      type: 'date',
    }),
    defineField({
      name: 'accessedAt',
      title: 'Fecha de consulta',
      type: 'date',
    }),
    defineField({
      name: 'notes',
      title: 'Notas',
      type: 'text',
      rows: 3,
      description:
        'Notas editoriales sobre la fuente. No se publicarán automáticamente.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publisher',
    },
  },
});
