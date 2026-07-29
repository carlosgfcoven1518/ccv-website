const authorFields = `
  _id,
  name,
  "slug": slug.current,
  role,
  shortBio,
  image,
  imageAlt
`;

const categoryFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  order
`;

const authorProjection = `{${authorFields}}`;
const categoryProjection = `{${categoryFields}}`;

const articleSummaryFields = `
  _id,
  title,
  "slug": slug.current,
  contentType,
  excerpt,
  coverImage,
  coverImageAlt,
  "author": author->${authorProjection},
  "categories": categories[]->${categoryProjection},
  publishedAt,
  updatedAt,
  readingTime,
  "featured": coalesce(featured, false),
  "noindex": coalesce(noindex, false)
`;

const articleSummaryProjection = `{${articleSummaryFields}}`;

const publishedArticleFilter = `_type == "article"
  && defined(slug.current)
  && defined(publishedAt)
  && publishedAt <= now()`;

export const publishedArticlesQuery = `*[
  ${publishedArticleFilter}
] | order(publishedAt desc) ${articleSummaryProjection}`;

export const articleBySlugQuery = `*[
  ${publishedArticleFilter}
  && slug.current == $slug
][0] {
  ${articleSummaryFields},
  body,
  seoTitle,
  seoDescription,
  socialImage,
  canonicalUrl,
  sources[] {
    _key,
    title,
    publisher,
    url,
    publishedAt,
    accessedAt
  },
  "relatedArticles": relatedArticles[]->${articleSummaryProjection}
}`;

export const publishedArticleSlugsQuery = `*[
  ${publishedArticleFilter}
].slug.current`;

export const featuredArticlesQuery = `*[
  ${publishedArticleFilter}
  && featured == true
] | order(publishedAt desc) [0...3] ${articleSummaryProjection}`;

export const categoriesQuery = `*[
  _type == "category"
  && defined(slug.current)
] | order(order asc, title asc) ${categoryProjection}`;

export const authorsQuery = `*[
  _type == "author"
  && defined(slug.current)
] | order(name asc) {
  ${authorFields},
  longBio,
  linkedIn
}`;

export const siteSettingsQuery = `*[
  _type == "siteSettings"
  && _id == "siteSettings"
][0] {
  _id,
  siteName,
  siteDescription,
  siteUrl,
  defaultSeoTitle,
  defaultSeoDescription,
  defaultSocialImage,
  contactEmail,
  linkedInUrl,
  legalName,
  locale
}`;
