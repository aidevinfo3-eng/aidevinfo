import { defineField, defineType } from 'sanity';

const iconOptions = [
  { title: 'Bot', value: 'Bot' },
  { title: 'Brain', value: 'Brain' },
  { title: 'Workflow', value: 'Workflow' },
  { title: 'Sparkles', value: 'Sparkles' },
  { title: 'Cloud', value: 'Cloud' },
  { title: 'CPU', value: 'Cpu' },
  { title: 'Database', value: 'Database' },
  { title: 'Lightbulb', value: 'Lightbulb' },
  { title: 'Code', value: 'Code2' },
  { title: 'Message', value: 'MessageSquare' },
  { title: 'Zap', value: 'Zap' },
  { title: 'Layers', value: 'Layers' },
];

export default defineType({
  name: 'developmentService',
  title: 'AI Development Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: iconOptions },
      initialValue: 'Bot',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first on the home page.',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      order: 'order',
      published: 'published',
    },
    prepare({ title, subtitle, order, published }) {
      return {
        title: title || 'Untitled service',
        subtitle: `${published === false ? '[Draft] ' : ''}#${order ?? 0} — ${subtitle ?? ''}`,
      };
    },
  },
});
