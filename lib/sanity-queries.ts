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
