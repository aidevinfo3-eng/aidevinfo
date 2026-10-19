import { contactHrefWithSubject } from '@/lib/contact-subjects';

export const ADVERTISE_CONTACT_EMAIL = 'aidevinfo3@gmail.com';

export const whyAdvertisePoints = [
  {
    title: 'Reach an AI-Focused Audience',
    description:
      'Connect your product with developers, founders, technology teams, businesses, marketers, and AI enthusiasts exploring AI solutions.',
  },
  {
    title: 'Build Product Discovery',
    description:
      'Place your product where users are already discovering AI tools, technologies, categories, tutorials, comparisons, and workflows.',
  },
  {
    title: 'Educate Potential Customers',
    description:
      'Use sponsored content, tutorials, and product features to explain your technology and demonstrate practical use cases.',
  },
  {
    title: 'Support Product Consideration',
    description:
      "Help potential customers understand your product's features, capabilities, integrations, pricing, use cases, and limitations.",
  },
  {
    title: 'Flexible AI Advertising Opportunities',
    description:
      'Choose from AI tool listings, featured placements, sponsored articles, tutorials, product features, newsletter sponsorships, and custom campaigns.',
  },
];

export type AdvertisingFormat = {
  id: string;
  title: string;
  intro: string;
  bullets: string[];
  footnote?: string;
  ctaLabel: string;
  contactHint: string;
};

export const advertisingFormats: AdvertisingFormat[] = [
  {
    id: 'listing',
    title: 'AI Tool Listing',
    intro:
      'Get your AI product listed in the AI Dev Info directory and make it easier for users to discover your solution.',
    bullets: [
      'Product name and description',
      'AI product category',
      'Key features',
      'Pricing information',
      'Use cases',
      'Official website',
      'Supported platforms',
      'Screenshots or product media',
      'Relevant alternatives',
      'Last-verified information where applicable',
    ],
    footnote: 'All submissions are subject to editorial, quality, and relevance review.',
    ctaLabel: 'Submit Your AI Tool',
    contactHint: 'AI tool listing',
  },
  {
    id: 'featured',
    title: 'Featured AI Tool Placement',
    intro:
      'Increase product visibility through a clearly identified featured placement within relevant AI discovery experiences.',
    bullets: [
      'AI tool category pages',
      'Featured tool sections',
      'Relevant directory experiences',
      'Selected editorial placements',
      'Campaign-specific promotional sections',
    ],
    footnote:
      'Sponsored placements are clearly identified and do not guarantee rankings, search visibility, traffic, conversions, or sales.',
    ctaLabel: 'Request Featured Placement',
    contactHint: 'Featured placement',
  },
  {
    id: 'sponsored-article',
    title: 'Sponsored Article',
    intro:
      'Tell your product story through a dedicated sponsored article designed to provide useful information to potential customers.',
    bullets: [
      'The problem your product solves',
      'Product features',
      'Target users',
      'Practical use cases',
      'Product workflow',
      'Implementation considerations',
      'Examples and demonstrations',
      'Screenshots',
      'Product differentiators',
      'Relevant alternatives',
    ],
    footnote:
      'Sponsored articles must provide genuine informational value and clearly disclose the commercial relationship.',
    ctaLabel: 'Discuss a Sponsored Article',
    contactHint: 'Sponsored article',
  },
  {
    id: 'product-feature',
    title: 'Product Review & Hands-On Feature',
    intro:
      'For selected products, AI Dev Info can create an in-depth editorial feature based on available product access and hands-on testing.',
    bullets: [
      'User experience',
      'Core features',
      'Ease of use',
      'Output quality',
      'Performance',
      'Integrations',
      'Pricing',
      'Limitations',
      'Best use cases',
      'Alternatives',
    ],
    footnote:
      'Payment for a placement does not guarantee a positive review or favorable editorial conclusion. The objective is to help readers make better-informed technology decisions.',
    ctaLabel: 'Request a Product Feature',
    contactHint: 'Product feature',
  },
  {
    id: 'tutorial',
    title: 'Sponsored AI Tutorial',
    intro: 'Teach potential users how to solve a real problem using your technology.',
    bullets: [
      'How to automate customer support with an AI platform',
      'How developers can integrate an AI API',
      'How businesses can automate repetitive workflows',
      'How to build an AI-powered workflow',
      'How to evaluate an AI platform for an enterprise use case',
    ],
    footnote:
      'The strongest sponsored tutorials teach something useful while naturally demonstrating where the product fits.',
    ctaLabel: 'Propose a Tutorial',
    contactHint: 'Sponsored tutorial',
  },
  {
    id: 'newsletter',
    title: 'Newsletter & Content Sponsorship',
    intro:
      'Promote your AI product through selected newsletter and content opportunities when available.',
    bullets: [
      'Sponsored AI tool mentions',
      'Featured product placements',
      'Educational sponsorships',
      'Product announcements',
      'Sponsored resources',
      'Newsletter features',
    ],
    footnote:
      'Availability depends on publication schedule, audience fit, and campaign requirements.',
    ctaLabel: 'Ask About Sponsorship Availability',
    contactHint: 'Newsletter sponsorship',
  },
  {
    id: 'custom',
    title: 'Custom AI Partnership',
    intro:
      'Looking for something beyond a standard advertising placement? We can discuss custom campaigns designed around your product, audience, and marketing objectives.',
    bullets: [
      'AI product launch campaigns',
      'AI tool discovery campaigns',
      'Educational content series',
      'Sponsored tutorials',
      'Product demonstrations',
      'Developer-focused campaigns',
      'Business-focused campaigns',
      'Webinar or virtual-event partnerships',
      'Multi-placement campaigns',
    ],
    footnote:
      'Custom campaigns are evaluated individually based on audience fit, editorial value, resources, and campaign objectives.',
    ctaLabel: 'Discuss a Custom Campaign',
    contactHint: 'Custom partnership',
  },
];

export const formatComparisonRows = [
  {
    format: 'AI Tool Listing',
    bestFor: 'New AI products',
    goal: 'Product discovery',
  },
  {
    format: 'Featured Placement',
    bestFor: 'Products seeking visibility',
    goal: 'Brand awareness',
  },
  {
    format: 'Sponsored Article',
    bestFor: 'Product education',
    goal: 'Consideration',
  },
  {
    format: 'Product Review',
    bestFor: 'Complex AI products',
    goal: 'Trust & evaluation',
  },
  {
    format: 'Sponsored Tutorial',
    bestFor: 'Developer & business tools',
    goal: 'Education',
  },
  {
    format: 'Newsletter Sponsorship',
    bestFor: 'Product announcements',
    goal: 'Awareness',
  },
  {
    format: 'Custom Partnership',
    bestFor: 'Larger campaigns',
    goal: 'Multiple objectives',
  },
];

export const whyBrandsChoose = [
  {
    title: 'Intent-Driven Discovery',
    description:
      'Reach people actively searching for AI tools, technologies, workflows, and solutions.',
  },
  {
    title: 'Technical & Business Audiences',
    description:
      'Connect with developers, founders, technology professionals, businesses, and teams evaluating AI products.',
  },
  {
    title: 'Product-Focused Ecosystem',
    description:
      'Your product can appear alongside AI tools, tutorials, technology guides, comparisons, and related resources.',
  },
  {
    title: 'Education + Discovery',
    description:
      'Go beyond traditional advertising by helping potential customers understand what your product does and how it can be used.',
  },
];

export const sponsoredContentPrinciples = [
  {
    title: 'Clear Disclosure',
    description: 'Paid placements and sponsored content are clearly identified where appropriate.',
  },
  {
    title: 'Audience Relevance',
    description:
      'We prioritize products and campaigns that are relevant to our audience and the subject of the placement.',
  },
  {
    title: 'No Guaranteed Positive Reviews',
    description: 'Advertisers cannot purchase a predetermined editorial conclusion.',
  },
  {
    title: 'No Guaranteed Search Rankings',
    description:
      'Paid partnerships do not guarantee Google rankings, organic visibility, featured snippets, or search positions.',
  },
  {
    title: 'Useful Content First',
    description:
      'Sponsored educational content should provide useful information, examples, demonstrations, or practical insights.',
  },
  {
    title: 'Editorial Review',
    description:
      'Submissions may be rejected if they are misleading, irrelevant, low-quality, unsafe, deceptive, or unsuitable for the AI Dev Info audience.',
  },
];

export const whoCanAdvertiseCategories = [
  {
    title: 'AI & Machine Learning',
    items: [
      'AI platforms',
      'Machine learning tools',
      'LLM products',
      'Generative AI solutions',
      'AI APIs',
      'AI infrastructure',
      'AI development platforms',
    ],
  },
  {
    title: 'Developer Technology',
    items: [
      'Developer tools',
      'AI coding assistants',
      'APIs',
      'SDKs',
      'Cloud AI services',
      'Testing platforms',
      'Monitoring tools',
      'Developer productivity software',
    ],
  },
  {
    title: 'Business AI & Automation',
    items: [
      'AI automation platforms',
      'AI agents',
      'Customer support solutions',
      'Sales automation',
      'Marketing technology',
      'Enterprise AI',
      'Business intelligence tools',
    ],
  },
  {
    title: 'Creative AI',
    items: [
      'AI image generators',
      'AI video tools',
      'AI audio platforms',
      'AI design tools',
      'AI writing software',
      'AI presentation tools',
    ],
  },
  {
    title: 'Productivity & Research',
    items: [
      'AI productivity tools',
      'Knowledge management platforms',
      'AI research tools',
      'Meeting assistants',
      'Document intelligence',
      'AI search platforms',
    ],
  },
];

export const advertisingPackages = [
  {
    name: 'Starter',
    description: 'For brands testing AI audience fit.',
    formats: ['AI Tool Listing', 'Featured Placement', 'Single Sponsored Content Placement'],
    cta: 'Request Pricing',
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'For brands looking for broader product visibility.',
    formats: [
      'Featured Placement',
      'Sponsored Article or Tutorial',
      'Multiple Campaign Placements',
      'Campaign Reporting',
    ],
    cta: 'Request Pricing',
    highlighted: true,
  },
  {
    name: 'Custom',
    description: 'For larger product launches and strategic campaigns.',
    formats: [
      'Multi-placement campaigns',
      'Sponsored content series',
      'Product demonstrations',
      'Custom educational content',
      'Newsletter or content sponsorship',
      'Campaign reporting',
    ],
    cta: 'Discuss a Custom Campaign',
    highlighted: false,
  },
];

export const campaignReportingBullets = [
  'Impressions',
  'Clicks',
  'Click-through rate',
  'Referral traffic',
  'Landing-page visits',
  'Campaign period',
  'Placement information',
];

export const contactIncludeList = [
  'Company name',
  'Product or website',
  'Product category',
  'Target audience',
  'Preferred advertising format',
  'Campaign objective',
  'Desired campaign duration',
  'Approximate budget, if available',
];

export const advertiseFaqs = [
  {
    question: 'Can I pay to have my AI tool listed?',
    answer:
      'You can submit your product for consideration. Paid promotional opportunities may be available separately from standard editorial listings.',
  },
  {
    question: 'Can I guarantee a positive review?',
    answer: 'No. Payment does not guarantee a positive editorial conclusion.',
  },
  {
    question: 'Will sponsored content rank on Google?',
    answer:
      'No ranking guarantee is provided. Search performance depends on many factors outside the control of AI Dev Info.',
  },
  {
    question: 'Can I provide my own sponsored article?',
    answer:
      "You may provide product information or a draft for consideration. Publication remains subject to AI Dev Info's editorial requirements.",
  },
  {
    question: 'Do you accept non-AI products?',
    answer:
      'We prioritize products and services relevant to AI, software development, technology, automation, productivity, and related audiences.',
  },
  {
    question: 'Can you create custom advertising campaigns?',
    answer:
      'Yes. Custom campaigns can be discussed based on your product, target audience, campaign objective, and available placements.',
  },
  {
    question: 'Do you offer performance guarantees?',
    answer:
      'Unless explicitly included in a written campaign agreement, we do not guarantee specific traffic, clicks, leads, conversions, or sales.',
  },
  {
    question: 'How do I advertise my AI product?',
    answer:
      'Contact AI Dev Info with your product details, target audience, preferred advertising format, campaign objective, duration, and approximate budget. Our team can recommend suitable advertising opportunities.',
  },
];

export function advertiseContactHref(hint?: string) {
  if (!hint?.trim()) return '/contact';
  return contactHrefWithSubject(hint);
}
