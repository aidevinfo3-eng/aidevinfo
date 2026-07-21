export interface AIService {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  rating: number;
  reviewCount: number;
  pricing: string;
  pricingPlans: PricingPlan[];
  website: string;
  platform: string[];
  apiAvailable: boolean;
  lastUpdated: string;
  tags: string[];
  features: string[];
  pros: string[];
  cons: string[];
  useCases: { title: string; description: string }[];
  screenshots: string[];
  alternatives: string[];
  faqs: { question: string; answer: string }[];
  reviews: Review[];
  popular: boolean;
  featured: boolean;
  dateAdded: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface Review {
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
  image: string;
  featured: boolean;
  /** Portable Text blocks (Sanity) or markdown string (legacy fallback) */
  content: unknown[] | string;
  /** Level-2 headings for table of contents */
  headings: string[];
  tags: string[];
  relatedServices?: string[];
  draft?: boolean;
  faqs?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
