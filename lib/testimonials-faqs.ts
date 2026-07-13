import { Testimonial, FAQItem } from './types';

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Product Manager',
    company: 'TechFlow Inc.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content:
      'AI Dev Info has become my go-to resource for evaluating AI tools. The reviews are thorough, honest, and save me hours of research every week. The comparison features make decision-making incredibly easy.',
    rating: 5,
  },
  {
    name: 'James Chen',
    role: 'Software Engineer',
    company: 'DevStack Labs',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content:
      'The depth of information on each AI service is impressive. I discovered three new coding assistants through this platform that have genuinely transformed my workflow. The tutorials are top-notch too.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthWave',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content:
      'As someone who needs to stay ahead of AI trends for my marketing team, AI Dev Info is invaluable. The blog posts are well-researched, and the directory helps me find the right tools for every campaign.',
    rating: 5,
  },
];

export const generalFaqs: FAQItem[] = [
  {
    question: 'What is AI Dev Info?',
    answer:
      'AI Dev Info is a professional platform dedicated to Artificial Intelligence. We provide in-depth reviews of AI tools and services, industry news, tutorials, expert recommendations, and a curated directory to help you find the right AI solutions for your needs.',
  },
  {
    question: 'How do you review AI services?',
    answer:
      'Our team of AI experts thoroughly tests each service across multiple dimensions: ease of use, feature set, pricing, performance, and support. We combine hands-on testing with real user feedback to provide balanced, honest reviews you can trust.',
  },
  {
    question: 'Are the AI tools listed free to use?',
    answer:
      'Many AI tools offer free tiers or trials, while others are paid. Each service listing includes detailed pricing information, from free plans to enterprise options, so you can find solutions that fit your budget.',
  },
  {
    question: 'Can I submit my AI tool for review?',
    answer:
      'Yes! We welcome submissions from AI tool developers. Visit our Contact page and select "Tool Submission" as the subject. Our team will review your submission and get back to you within 5-7 business days.',
  },
  {
    question: 'How often is the directory updated?',
    answer:
      'We update our directory weekly with new AI tools and refresh existing listings with the latest features, pricing, and ratings. Our blog is updated several times per week with the latest AI news and insights.',
  },
  {
    question: 'Do you offer advertising opportunities?',
    answer:
      'Yes, we offer various advertising packages including sponsored listings, banner placements, and content partnerships. Visit our Advertising page to learn more about available placements and pricing.',
  },
  {
    question: 'Is my data safe when using recommended AI tools?',
    answer:
      'We highlight the privacy and data policies of each tool in our reviews. We recommend always reviewing a service\'s privacy policy before use. Our directory notes which tools offer data encryption and compliance certifications.',
  },
  {
    question: 'Can I suggest a new category for the directory?',
    answer:
      'Absolutely. As the AI landscape evolves, we regularly add new categories. Send us your suggestions through the Contact page, and our editorial team will consider adding it to our directory.',
  },
];
