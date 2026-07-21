import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'htmlEmbed',
  title: 'HTML Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'HTML Code',
      type: 'text',
      description: 'Paste HTML table or embed code here',
    }),
  ],
});
