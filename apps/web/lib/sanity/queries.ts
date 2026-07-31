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

const publishedActiveServiceFilter = `_type == "commercialOffer"
  && !(_id in path("drafts.**"))
  && availabilityStatus == "active"
  && defined(slug.current)`;

const serviceBaseFields = `
  _id,
  title,
  "slug": slug.current,
  cardSummary,
  heroImage,
  heroImageAlt
`;

const serviceSummaryFields = `
  ${serviceBaseFields},
  "audiences": audiences[] {
    _key,
    name
  }
`;

const publicEvidenceProjection = `{
  _key,
  title,
  statement,
  sourceLabel,
  sourceUrl
}`;

export const homePageQuery = `*[
  _type == "homePage"
  && _id == "homePage"
  && !(_id in path("drafts.**"))
][0] {
  _id,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  decisionContext {
    eyebrow,
    heading,
    intro,
    points[] {
      _key,
      title,
      description
    }
  },
  ecosystem {
    heading,
    intro,
    dimensions[] {
      _key,
      title,
      description
    },
    image,
    imageAlt
  },
  "featuredService": *[
    ${publishedActiveServiceFilter}
    && _id == ^.featuredService._ref
  ][0] {
    ${serviceSummaryFields}
  },
  operatingModel {
    heading,
    intro,
    stages[] {
      _key,
      title,
      description
    },
    scopeNote
  },
  evidence {
    heading,
    intro,
    "items": items[] ${publicEvidenceProjection}
  },
  aboutCcv {
    heading,
    description,
    leadershipProfile {
      name,
      role,
      bio
    },
    image,
    imageAlt
  },
  specialization {
    heading,
    text,
    contexts[] {
      _key,
      title,
      description
    }
  },
  analysisIntro {
    heading,
    intro,
    linkLabel
  },
  contactIntro {
    heading,
    instruction
  }
}`;

export const publishedActiveServiceSlugsQuery = `*[
  ${publishedActiveServiceFilter}
].slug.current`;

export const publishedActiveServiceBySlugQuery = `*[
  ${publishedActiveServiceFilter}
  && slug.current == $slug
][0] {
  ${serviceBaseFields},
  subtitle,
  intro,
  problemStatement,
  "audiences": audiences[] {
    _key,
    name,
    description
  },
  contextSymptoms,
  proposal,
  expectedBenefits[] {
    _key,
    title,
    description
  },
  methodology,
  stages[] {
    _key,
    title,
    description,
    outcome
  },
  deliverables[] {
    _key,
    title,
    description,
    format,
    notes
  },
  "evidenceItems": evidenceItems[] ${publicEvidenceProjection},
  clarifications,
  contactInstruction,
  seoTitle,
  seoDescription,
  "noindex": coalesce(noindex, false),
  availabilityStatus
}`;

export const servicePageMetadataBySlugQuery = `{
  "service": *[
    ${publishedActiveServiceFilter}
    && slug.current == $slug
  ][0] {
    title,
    cardSummary,
    seoTitle,
    seoDescription,
    "noindex": coalesce(noindex, false),
    heroImage
  },
  "settings": *[
    _type == "siteSettings"
    && _id == "siteSettings"
    && !(_id in path("drafts.**"))
  ][0] {
    siteName,
    siteUrl,
    defaultSocialImage
  }
}`;
