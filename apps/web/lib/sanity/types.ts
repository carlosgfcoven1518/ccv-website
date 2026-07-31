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

export type ServiceAvailabilityStatus = 'active' | 'retired';

export interface TitledDescription {
  _key?: string;
  title: string;
  description: string;
}

export interface ServiceAudience {
  _key?: string;
  name: string;
  description: string;
}

export interface ServiceStage extends TitledDescription {
  outcome?: string;
}

export interface ServiceDeliverable extends TitledDescription {
  format?: string;
  notes?: string;
}

export interface PublicEvidenceItem {
  _key?: string;
  title: string;
  statement: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

export interface CommercialServiceSummary {
  _id: string;
  title: string;
  slug: string;
  cardSummary: string;
  audiences: Array<Pick<ServiceAudience, '_key' | 'name'>>;
  heroImage?: SanityImage;
  heroImageAlt?: string;
}

export interface CommercialService extends CommercialServiceSummary {
  subtitle?: string;
  intro: string;
  problemStatement: string;
  audiences: ServiceAudience[];
  contextSymptoms: string[];
  proposal: string;
  expectedBenefits: TitledDescription[];
  methodology: string;
  stages: ServiceStage[];
  deliverables: ServiceDeliverable[];
  evidenceItems: PublicEvidenceItem[];
  clarifications: string[];
  contactInstruction?: string;
  seoTitle?: string;
  seoDescription?: string;
  noindex: boolean;
  availabilityStatus: 'active';
}

export interface HomeSectionContent {
  heading: string;
  intro: string;
}

export interface HomeDecisionContext extends HomeSectionContent {
  eyebrow?: string;
  points: TitledDescription[];
}

export interface HomeEcosystem extends HomeSectionContent {
  dimensions: TitledDescription[];
  image?: SanityImage;
  imageAlt?: string;
}

export interface HomeOperatingModel extends HomeSectionContent {
  stages: TitledDescription[];
  scopeNote?: string;
}

export interface HomeEvidence extends HomeSectionContent {
  items: PublicEvidenceItem[];
}

export interface HomeLeadershipProfile {
  name: string;
  role?: string;
  bio: string;
}

export interface HomeAboutCcv {
  heading: string;
  description: string;
  leadershipProfile?: HomeLeadershipProfile;
  image?: SanityImage;
  imageAlt?: string;
}

export interface HomeSpecialization {
  heading: string;
  text: string;
  contexts: TitledDescription[];
}

export interface HomeAnalysisIntro extends HomeSectionContent {
  linkLabel: string;
}

export interface HomeContactIntro {
  heading: string;
  instruction: string;
}

export interface HomePage {
  _id: 'homePage';
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: SanityImage;
  heroImageAlt?: string;
  decisionContext: HomeDecisionContext;
  ecosystem: HomeEcosystem;
  featuredService: CommercialServiceSummary | null;
  operatingModel: HomeOperatingModel;
  evidence: HomeEvidence | null;
  aboutCcv: HomeAboutCcv;
  specialization: HomeSpecialization;
  analysisIntro: HomeAnalysisIntro;
  contactIntro: HomeContactIntro;
}

export interface ServicePageMetadata {
  service: {
    title: string;
    cardSummary: string;
    seoTitle?: string;
    seoDescription?: string;
    noindex: boolean;
    heroImage?: SanityImage;
  };
  settings: Pick<
    SiteSettings,
    'siteName' | 'siteUrl' | 'defaultSocialImage'
  > | null;
}
