import { defineField, defineType } from 'sanity';

const iconOptions = [
  { title: 'Message', value: 'MessageSquare' },
  { title: 'Image', value: 'Image' },
  { title: 'Video', value: 'Video' },
  { title: 'Code', value: 'Code2' },
  { title: 'Pen', value: 'PenTool' },
  { title: 'Workflow', value: 'Workflow' },
  { title: 'Megaphone', value: 'Megaphone' },
  { title: 'Zap', value: 'Zap' },
  { title: 'Mic', value: 'Mic' },
  { title: 'Building', value: 'Building2' },
];

export default defineType({
  name: 'toolCategory',
  title: 'Tool Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: iconOptions },
      initialValue: 'Zap',
    }),
    defineField({
      name: 'countLabel',
      title: 'Tool count label',
      type: 'string',
      description: 'Shown on the home page, e.g. "120+"',
      initialValue: '10+',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on home',
      type: 'boolean',
      description: 'Include this category in the Explore Categories section',
      initialValue: true,
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
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'countLabel',
      showOnHome: 'showOnHome',
      published: 'published',
    },
    prepare({ title, subtitle, showOnHome, published }) {
      const flags = [
        published === false ? 'Draft' : null,
        showOnHome ? 'Home' : null,
      ]
        .filter(Boolean)
        .join(' · ');
      return {
        title: title || 'Untitled category',
        subtitle: flags ? `${subtitle ?? ''} · ${flags}` : subtitle,
      };
    },
  },
});
