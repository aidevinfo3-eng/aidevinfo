import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      options: {
        filter: 'published != false',
        disableNew: false,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related service slugs',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description:
        'Optional service slugs from the directory (e.g. chatgpt, claude)',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image' }),
        defineArrayMember({ type: 'htmlEmbed' }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
          preview: {
            select: { title: 'question' },
          },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Optimized for search engines (max 60 chars).',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Summarize the post for search results (max 155 chars).',
          validation: (Rule) => Rule.max(155),
        }),
        defineField({
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image displayed when shared on social media.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.name',
      media: 'mainImage',
    },
    prepare({ title, author, category, media }) {
      return {
        title,
        media,
        subtitle: [category, author ? `by ${author}` : null]
          .filter(Boolean)
          .join(' · ') || 'No author',
      };
    },
  },
});
