import { groq } from 'next-sanity';

const postFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  featured,
  category,
  tags,
  relatedServices,
  mainImage {
    ...,
    alt,
    "originalFilename": asset->originalFilename
  },
  author->{
    name,
    bio,
    image {
      ...,
      "originalFilename": asset->originalFilename
    }
  }
`;

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] {
    ${postFields},
    content[] {
      ...,
      _type == "image" => {
        ...,
        alt,
        "originalFilename": asset->originalFilename
      }
    },
    faqs,
    seo
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]{
    "slug": slug.current
  }
`;

export const allDevelopmentServicesQuery = groq`
  *[_type == "developmentService" && published != false]
  | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    order
  }
`;

const aiToolFields = `
  _id,
  name,
  "slug": slug.current,
  tagline,
  description,
  longDescription,
  category,
  rating,
  reviewCount,
  pricing,
  pricingPlans[] {
    name,
    price,
    period,
    description,
    features,
    highlighted
  },
  website,
  platform,
  apiAvailable,
  lastUpdated,
  dateAdded,
  tags,
  features,
  pros,
  cons,
  useCases[] { title, description },
  screenshots,
  alternatives,
  faqs[] { question, answer },
  reviews[] {
    author,
    role,
    avatar,
    rating,
    date,
    title,
    content
  },
  popular,
  featured
`;

export const allAiToolsQuery = groq`
  *[_type == "aiTool" && published != false && defined(slug.current)]
  | order(featured desc, reviewCount desc, name asc) {
    ${aiToolFields}
  }
`;

export const aiToolBySlugQuery = groq`
  *[_type == "aiTool" && published != false && slug.current == $slug][0] {
    ${aiToolFields}
  }
`;

export const aiToolSlugsQuery = groq`
  *[_type == "aiTool" && published != false && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const allToolCategoriesQuery = groq`
  *[_type == "toolCategory" && published != false]
  | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    icon,
    countLabel,
    order,
    showOnHome
  }
`;

export const allBlogCategoriesQuery = groq`
  *[_type == "blogCategory" && published != false]
  | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    order
  }
`;
