import { defineArrayMember, defineField, defineType } from 'sanity';

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenido enriquecido',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Párrafo', value: 'normal' },
        { title: 'Título H2', value: 'h2' },
        { title: 'Título H3', value: 'h3' },
        { title: 'Cita', value: 'blockquote' },
      ],
      lists: [
        { title: 'Lista con viñetas', value: 'bullet' },
        { title: 'Lista numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Énfasis', value: 'em' },
          { title: 'Negrita', value: 'strong' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Enlace',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                description:
                  'Acepta rutas internas o direcciones http, https y mailto.',
                validation: (Rule) =>
                  Rule.required()
                    .uri({
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto'],
                    })
                    .error('Agrega una URL interna o externa válida.'),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'editorialImage',
    }),
  ],
});
