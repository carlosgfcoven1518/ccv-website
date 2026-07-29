export type ContentType = 'analysis' | 'methodology' | 'perspective' | 'case';

export type EditorialStatus = 'inProgress' | 'review' | 'ready';

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanityImage {
  _type: 'image' | 'editorialImage';
  asset: SanityReference;
  alt?: string;
  caption?: string;
  crop?: {
    _type: 'sanity.imageCrop';
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface PortableTextSpan {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

export interface PortableTextMarkDefinition {
  _key: string;
  _type: 'link';
  href: string;
}

export interface PortableTextTextBlock {
  _key: string;
  _type: 'block';
  children: PortableTextSpan[];
  level?: number;
  listItem?: 'bullet' | 'number';
  markDefs: PortableTextMarkDefinition[];
  style: 'normal' | 'h2' | 'h3' | 'blockquote';
}

export type PortableTextBlock = PortableTextTextBlock | SanityImage;

export interface AuthorSummary {
  _id: string;
  name: string;
  slug: string;
  role: string;
  shortBio: string;
  image?: SanityImage;
  imageAlt?: string;
}

export interface Author extends AuthorSummary {
  longBio?: string;
  email?: string;
  linkedIn?: string;
  credentials?: string[];
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
}

export interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
  contentType: ContentType;
  excerpt: string;
  coverImage?: SanityImage;
  coverImageAlt?: string;
  author: AuthorSummary;
  categories: Category[];
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  featured: boolean;
  noindex: boolean;
}

export interface EditorialSource {
  _key: string;
  title: string;
  publisher?: string;
  url: string;
  publishedAt?: string;
  accessedAt?: string;
}

export interface Article extends ArticleSummary {
  body: PortableTextBlock[];
  seoTitle: string;
  seoDescription: string;
  socialImage?: SanityImage;
  canonicalUrl?: string;
  sources?: EditorialSource[];
  relatedArticles?: ArticleSummary[];
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultSocialImage?: SanityImage;
  contactEmail: string;
  linkedInUrl?: string;
  legalName?: string;
  locale: 'es-MX';
}
