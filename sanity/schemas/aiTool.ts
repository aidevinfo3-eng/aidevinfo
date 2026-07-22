import { defineArrayMember, defineField, defineType } from 'sanity';

const categoryOptions = [
  { title: 'AI Chatbots', value: 'ai-chatbots' },
  { title: 'Image Generation', value: 'image-generation' },
  { title: 'Video Generation', value: 'video-generation' },
  { title: 'AI Coding', value: 'ai-coding' },
  { title: 'AI Writing', value: 'ai-writing' },
  { title: 'Automation', value: 'automation' },
  { title: 'Marketing', value: 'marketing' },
  { title: 'Productivity', value: 'productivity' },
  { title: 'Voice AI', value: 'voice-ai' },
  { title: 'Business AI', value: 'business-ai' },
];

const pricingOptions = [
  { title: 'Free', value: 'Free' },
  { title: 'Freemium', value: 'Freemium' },
  { title: 'Paid', value: 'Paid' },
  { title: 'Custom', value: 'Custom' },
  { title: 'Add-on', value: 'Add-on' },
  { title: 'Included', value: 'Included' },
  { title: 'Open Source', value: 'Open Source' },
];

export default defineType({
  name: 'aiTool',
  title: 'AI Tool',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long description',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: categoryOptions },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      initialValue: 4.5,
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing type',
      type: 'string',
      options: { list: pricingOptions },
      initialValue: 'Freemium',
    }),
    defineField({
      name: 'pricingPlans',
      title: 'Pricing plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingPlan',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({ name: 'price', type: 'string', title: 'Price' }),
            defineField({ name: 'period', type: 'string', title: 'Period' }),
            defineField({ name: 'description', type: 'string', title: 'Description' }),
            defineField({
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'highlighted',
              type: 'boolean',
              title: 'Highlighted',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
          },
        }),
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'platform',
      title: 'Platforms',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'apiAvailable',
      title: 'API available',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date added',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'useCases',
      title: 'Use cases',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'useCase',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshot URLs',
      type: 'array',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'alternatives',
      title: 'Alternative tool slugs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Slugs of related AI tools (e.g. claude, gemini)',
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
            defineField({ name: 'question', type: 'string', title: 'Question' }),
            defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'review',
          fields: [
            defineField({ name: 'author', type: 'string', title: 'Author' }),
            defineField({ name: 'role', type: 'string', title: 'Role' }),
            defineField({ name: 'avatar', type: 'url', title: 'Avatar URL' }),
            defineField({ name: 'rating', type: 'number', title: 'Rating' }),
            defineField({ name: 'date', type: 'date', title: 'Date' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'content', type: 'text', title: 'Content', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'author' },
          },
        }),
      ],
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      featured: 'featured',
      published: 'published',
    },
    prepare({ title, subtitle, featured, published }) {
      const flags = [
        published === false ? 'Draft' : null,
        featured ? 'Featured' : null,
      ]
        .filter(Boolean)
        .join(' · ');
      return {
        title: title || 'Untitled tool',
        subtitle: flags ? `${subtitle} · ${flags}` : subtitle,
      };
    },
  },
});
