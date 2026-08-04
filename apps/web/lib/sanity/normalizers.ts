import type {
  ArticleSummary,
  AuthorSummary,
  Category,
  CommercialService,
  CommercialServiceSummary,
  HomeAboutCcv,
  HomeAnalysisIntro,
  HomeContactIntro,
  HomeDecisionContext,
  HomeEcosystem,
  HomeEvidence,
  HomeOperatingModel,
  HomePage,
  HomePublicationState,
  HomeSpecialization,
  PublicSiteSettings,
  PublicEvidenceItem,
  SanityImage,
  ServiceAudience,
  ServiceDeliverable,
  ServicePageMetadata,
  ServiceStage,
  TitledDescription,
} from './types';

export const HOME_HERO_TITLE_FALLBACK = 'Marketing que produce contratos.';

export const EMPTY_SERVICE_EXPORT_SLUG = '_template';

const SERVICE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLIC_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CONTENT_TYPES = new Set([
  'analysis',
  'methodology',
  'perspective',
  'case',
]);

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function requiredString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function optionalString(value: unknown): string | undefined {
  return requiredString(value) ?? undefined;
}

function optionalPublicUrl(value: unknown): string | undefined {
  const candidate = optionalString(value);

  if (!candidate) {
    return undefined;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function optionalEmail(value: unknown): string | undefined {
  const candidate = optionalString(value);
  return candidate && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)
    ? candidate
    : undefined;
}

function keyFrom(value: UnknownRecord): string | undefined {
  return optionalString(value._key);
}

function normalizeImage(value: unknown): SanityImage | undefined {
  if (!isRecord(value) || !isRecord(value.asset)) {
    return undefined;
  }

  const reference = requiredString(value.asset._ref);
  const imageType = value._type;

  if (!reference || (imageType !== 'image' && imageType !== 'editorialImage')) {
    return undefined;
  }

  return value as unknown as SanityImage;
}

function normalizeAuthorSummary(value: unknown): AuthorSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = requiredString(value._id);
  const name = requiredString(value.name);
  const slug = requiredString(value.slug);
  const role = requiredString(value.role);
  const shortBio = requiredString(value.shortBio);

  if (
    !id ||
    id.startsWith('drafts.') ||
    !name ||
    !slug ||
    !PUBLIC_SLUG_PATTERN.test(slug) ||
    !role ||
    !shortBio
  ) {
    return null;
  }

  const image = normalizeImage(value.image);
  const imageAlt = image ? optionalString(value.imageAlt) : undefined;

  return {
    _id: id,
    name,
    slug,
    role,
    shortBio,
    image: image && imageAlt ? image : undefined,
    imageAlt: image && imageAlt ? imageAlt : undefined,
  };
}

function normalizeCategory(value: unknown): Category | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = requiredString(value._id);
  const title = requiredString(value.title);
  const slug = requiredString(value.slug);
  const order = value.order;

  if (
    !id ||
    id.startsWith('drafts.') ||
    !title ||
    !slug ||
    !PUBLIC_SLUG_PATTERN.test(slug) ||
    !Number.isInteger(order) ||
    (order as number) < 0
  ) {
    return null;
  }

  return {
    _id: id,
    title,
    slug,
    description: optionalString(value.description),
    order: order as number,
  };
}

function normalizeArticleSummary(value: unknown): ArticleSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = requiredString(value._id);
  const title = requiredString(value.title);
  const slug = requiredString(value.slug);
  const excerpt = requiredString(value.excerpt);
  const contentType = requiredString(value.contentType);
  const publishedAt = requiredString(value.publishedAt);
  const publishedTime = publishedAt ? Date.parse(publishedAt) : Number.NaN;
  const author = normalizeAuthorSummary(value.author);
  const categories = Array.isArray(value.categories)
    ? value.categories
        .map(normalizeCategory)
        .filter((item): item is Category => item !== null)
    : [];

  if (
    !id ||
    id.startsWith('drafts.') ||
    !title ||
    !slug ||
    !PUBLIC_SLUG_PATTERN.test(slug) ||
    !excerpt ||
    !contentType ||
    !CONTENT_TYPES.has(contentType) ||
    !publishedAt ||
    !Number.isFinite(publishedTime) ||
    publishedTime > Date.now() ||
    !author ||
    categories.length === 0 ||
    value.featured !== true ||
    value.noindex === true
  ) {
    return null;
  }

  const coverImage = normalizeImage(value.coverImage);
  const coverImageAlt = coverImage
    ? optionalString(value.coverImageAlt)
    : undefined;
  const readingTime = value.readingTime;

  return {
    _id: id,
    title,
    slug,
    contentType: contentType as ArticleSummary['contentType'],
    excerpt,
    coverImage: coverImage && coverImageAlt ? coverImage : undefined,
    coverImageAlt: coverImage && coverImageAlt ? coverImageAlt : undefined,
    author,
    categories,
    publishedAt,
    updatedAt: optionalString(value.updatedAt),
    readingTime:
      Number.isInteger(readingTime) && (readingTime as number) > 0
        ? (readingTime as number)
        : undefined,
    featured: true,
    noindex: false,
  };
}

export function normalizeFeaturedArticles(value: unknown): ArticleSummary[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(normalizeArticleSummary)
    .filter((item): item is ArticleSummary => item !== null)
    .sort(
      (left, right) =>
        Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
    )
    .slice(0, 3);
}

export function normalizeSiteSettings(
  value: unknown,
): PublicSiteSettings | null {
  if (!isRecord(value) || value._id !== 'siteSettings') {
    return null;
  }

  return {
    _id: 'siteSettings',
    siteName: optionalString(value.siteName),
    siteDescription: optionalString(value.siteDescription),
    siteUrl: optionalPublicUrl(value.siteUrl),
    defaultSeoTitle: optionalString(value.defaultSeoTitle),
    defaultSeoDescription: optionalString(value.defaultSeoDescription),
    defaultSocialImage: normalizeImage(value.defaultSocialImage),
    contactEmail: optionalEmail(value.contactEmail),
    linkedInUrl: optionalPublicUrl(value.linkedInUrl),
    legalName: optionalString(value.legalName),
    locale: value.locale === 'es-MX' ? 'es-MX' : undefined,
  };
}

function normalizeTitledDescription(value: unknown): TitledDescription | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = requiredString(value.title);
  const description = requiredString(value.description);

  if (!title || !description) {
    return null;
  }

  return {
    _key: keyFrom(value),
    title,
    description,
  };
}

function normalizeTitledDescriptions(value: unknown): TitledDescription[] {
  return Array.isArray(value)
    ? value
        .map(normalizeTitledDescription)
        .filter((item): item is TitledDescription => item !== null)
    : [];
}

function normalizeAudience(value: unknown): ServiceAudience | null {
  if (!isRecord(value)) {
    return null;
  }

  const name = requiredString(value.name);
  const description = requiredString(value.description);

  if (!name || !description) {
    return null;
  }

  return {
    _key: keyFrom(value),
    name,
    description,
  };
}

function normalizeAudiences(value: unknown): ServiceAudience[] {
  return Array.isArray(value)
    ? value
        .map(normalizeAudience)
        .filter((item): item is ServiceAudience => item !== null)
    : [];
}

function normalizeEvidence(value: unknown): PublicEvidenceItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = requiredString(value.title);
  const statement = requiredString(value.statement);

  if (!title || !statement) {
    return null;
  }

  return {
    _key: keyFrom(value),
    title,
    statement,
    sourceLabel: optionalString(value.sourceLabel),
    sourceUrl: optionalString(value.sourceUrl),
  };
}

function normalizeEvidenceItems(value: unknown): PublicEvidenceItem[] {
  return Array.isArray(value)
    ? value
        .map(normalizeEvidence)
        .filter((item): item is PublicEvidenceItem => item !== null)
    : [];
}

function normalizeStage(value: unknown): ServiceStage | null {
  const base = normalizeTitledDescription(value);

  if (!base || !isRecord(value)) {
    return null;
  }

  return {
    ...base,
    outcome: optionalString(value.outcome),
  };
}

function normalizeStages(value: unknown): ServiceStage[] {
  return Array.isArray(value)
    ? value
        .map(normalizeStage)
        .filter((item): item is ServiceStage => item !== null)
    : [];
}

function normalizeDeliverable(value: unknown): ServiceDeliverable | null {
  const base = normalizeTitledDescription(value);

  if (!base || !isRecord(value)) {
    return null;
  }

  return {
    ...base,
    format: optionalString(value.format),
    notes: optionalString(value.notes),
  };
}

function normalizeDeliverables(value: unknown): ServiceDeliverable[] {
  return Array.isArray(value)
    ? value
        .map(normalizeDeliverable)
        .filter((item): item is ServiceDeliverable => item !== null)
    : [];
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map(requiredString).filter((item): item is string => item !== null)
    : [];
}

function normalizeSummaryAudience(
  value: unknown,
): CommercialServiceSummary['audiences'][number] | null {
  if (!isRecord(value)) {
    return null;
  }

  const name = requiredString(value.name);

  return name ? { _key: keyFrom(value), name } : null;
}

export function isValidServiceSlug(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 96 &&
    SERVICE_SLUG_PATTERN.test(value)
  );
}

export function normalizeCommercialServiceSummary(
  value: unknown,
): CommercialServiceSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = requiredString(value._id);
  const title = requiredString(value.title);
  const slug = requiredString(value.slug);
  const cardSummary = requiredString(value.cardSummary);
  const audiences = Array.isArray(value.audiences)
    ? value.audiences
        .map(normalizeSummaryAudience)
        .filter(
          (item): item is CommercialServiceSummary['audiences'][number] =>
            item !== null,
        )
    : [];

  if (!id || !title || !slug || !isValidServiceSlug(slug) || !cardSummary) {
    return null;
  }

  return {
    _id: id,
    title,
    slug,
    cardSummary,
    audiences,
    heroImage: normalizeImage(value.heroImage),
    heroImageAlt: optionalString(value.heroImageAlt),
  };
}

export function normalizeCommercialService(
  value: unknown,
): CommercialService | null {
  const summary = normalizeCommercialServiceSummary(value);

  if (!summary || !isRecord(value) || value.availabilityStatus !== 'active') {
    return null;
  }

  const intro = requiredString(value.intro);
  const problemStatement = requiredString(value.problemStatement);
  const audiences = normalizeAudiences(value.audiences);
  const proposal = requiredString(value.proposal);
  const expectedBenefits = normalizeTitledDescriptions(value.expectedBenefits);
  const methodology = requiredString(value.methodology);
  const stages = normalizeStages(value.stages);
  const deliverables = normalizeDeliverables(value.deliverables);

  if (
    !intro ||
    !problemStatement ||
    audiences.length === 0 ||
    !proposal ||
    expectedBenefits.length === 0 ||
    !methodology ||
    stages.length === 0 ||
    deliverables.length === 0
  ) {
    return null;
  }

  return {
    ...summary,
    subtitle: optionalString(value.subtitle),
    intro,
    problemStatement,
    audiences,
    contextSymptoms: normalizeStringArray(value.contextSymptoms),
    proposal,
    expectedBenefits,
    methodology,
    stages,
    deliverables,
    evidenceItems: normalizeEvidenceItems(value.evidenceItems),
    clarifications: normalizeStringArray(value.clarifications),
    contactInstruction: optionalString(value.contactInstruction),
    seoTitle: optionalString(value.seoTitle),
    seoDescription: optionalString(value.seoDescription),
    noindex: value.noindex === true,
    availabilityStatus: 'active',
  };
}

function normalizeSectionContent(value: unknown) {
  if (!isRecord(value)) {
    return null;
  }

  const heading = requiredString(value.heading);
  const intro = requiredString(value.intro);
  return heading && intro ? { heading, intro } : null;
}

function normalizeDecisionContext(value: unknown): HomeDecisionContext | null {
  const base = normalizeSectionContent(value);

  if (!base || !isRecord(value)) {
    return null;
  }

  const points = normalizeTitledDescriptions(value.points);
  return points.length >= 2
    ? { ...base, eyebrow: optionalString(value.eyebrow), points }
    : null;
}

function normalizeEcosystem(value: unknown): HomeEcosystem | null {
  const base = normalizeSectionContent(value);

  if (!base || !isRecord(value)) {
    return null;
  }

  const dimensions = normalizeTitledDescriptions(value.dimensions);
  return dimensions.length >= 3
    ? {
        ...base,
        dimensions,
        image: normalizeImage(value.image),
        imageAlt: optionalString(value.imageAlt),
      }
    : null;
}

function normalizeOperatingModel(value: unknown): HomeOperatingModel | null {
  const base = normalizeSectionContent(value);

  if (!base || !isRecord(value)) {
    return null;
  }

  const stages = normalizeTitledDescriptions(value.stages);
  return stages.length >= 3
    ? { ...base, stages, scopeNote: optionalString(value.scopeNote) }
    : null;
}

function normalizeHomeEvidence(value: unknown): HomeEvidence | null {
  const base = normalizeSectionContent(value);

  if (!base || !isRecord(value)) {
    return null;
  }

  const items = normalizeEvidenceItems(value.items);
  return items.length > 0 ? { ...base, items } : null;
}

function normalizeAboutCcv(value: unknown): HomeAboutCcv | null {
  if (!isRecord(value)) {
    return null;
  }

  const heading = requiredString(value.heading);
  const description = requiredString(value.description);

  if (!heading || !description) {
    return null;
  }

  let leadershipProfile: HomeAboutCcv['leadershipProfile'];
  if (isRecord(value.leadershipProfile)) {
    const name = requiredString(value.leadershipProfile.name);
    const bio = requiredString(value.leadershipProfile.bio);
    if (name && bio) {
      leadershipProfile = {
        name,
        role: optionalString(value.leadershipProfile.role),
        bio,
      };
    }
  }

  return {
    heading,
    description,
    leadershipProfile,
    image: normalizeImage(value.image),
    imageAlt: optionalString(value.imageAlt),
  };
}

function normalizeSpecialization(value: unknown): HomeSpecialization | null {
  if (!isRecord(value)) {
    return null;
  }

  const heading = requiredString(value.heading);
  const text = requiredString(value.text);
  return heading && text
    ? {
        heading,
        text,
        contexts: normalizeTitledDescriptions(value.contexts),
      }
    : null;
}

function normalizeAnalysisIntro(value: unknown): HomeAnalysisIntro | null {
  const base = normalizeSectionContent(value);
  const linkLabel = isRecord(value) ? requiredString(value.linkLabel) : null;
  return base && linkLabel ? { ...base, linkLabel } : null;
}

function normalizeContactIntro(value: unknown): HomeContactIntro | null {
  if (!isRecord(value)) {
    return null;
  }

  const heading = requiredString(value.heading);
  const instruction = requiredString(value.instruction);
  return heading && instruction ? { heading, instruction } : null;
}

export function normalizeHomePage(value: unknown): HomePage | null {
  if (!isRecord(value) || value._id !== 'homePage') {
    return null;
  }

  const heroSubtitle = requiredString(value.heroSubtitle);
  const decisionContext = normalizeDecisionContext(value.decisionContext);
  const ecosystem = normalizeEcosystem(value.ecosystem);
  const operatingModel = normalizeOperatingModel(value.operatingModel);
  const aboutCcv = normalizeAboutCcv(value.aboutCcv);
  const specialization = normalizeSpecialization(value.specialization);
  const analysisIntro = normalizeAnalysisIntro(value.analysisIntro);
  const contactIntro = normalizeContactIntro(value.contactIntro);

  if (
    !heroSubtitle ||
    !decisionContext ||
    !ecosystem ||
    !operatingModel ||
    !aboutCcv ||
    !analysisIntro ||
    !contactIntro
  ) {
    return null;
  }

  return {
    _id: 'homePage',
    heroTitle: requiredString(value.heroTitle) ?? HOME_HERO_TITLE_FALLBACK,
    heroSubtitle,
    heroImage: normalizeImage(value.heroImage),
    heroImageAlt: optionalString(value.heroImageAlt),
    decisionContext,
    ecosystem,
    featuredService: normalizeCommercialServiceSummary(value.featuredService),
    operatingModel,
    evidence: normalizeHomeEvidence(value.evidence),
    aboutCcv,
    specialization,
    analysisIntro,
    contactIntro,
  };
}

export function restrictFeaturedServiceToExport(
  home: HomePage | null,
  exportedServiceSlugs: unknown,
): HomePage | null {
  if (!home?.featuredService) {
    return home;
  }

  const publicSlugs = normalizeServiceSlugs(exportedServiceSlugs);
  return publicSlugs.includes(home.featuredService.slug)
    ? home
    : { ...home, featuredService: null };
}

export function resolveHomePublicationState(
  home: HomePage | null,
  settings: PublicSiteSettings | null,
): HomePublicationState {
  const hasContactChannel = Boolean(
    settings?.contactEmail || settings?.linkedInUrl,
  );
  const isReady = Boolean(home && hasContactChannel);

  return {
    heroTitle: home?.heroTitle ?? HOME_HERO_TITLE_FALLBACK,
    isReady,
    shouldIndex: isReady,
  };
}

export function normalizeServiceSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.filter(isValidServiceSlug))].sort((left, right) =>
    left.localeCompare(right, 'es'),
  );
}

export function toServiceStaticParams(
  slugs: string[],
): Array<{ slug: string }> {
  const publicSlugs = normalizeServiceSlugs(slugs);
  const exportSlugs =
    publicSlugs.length > 0 ? publicSlugs : [EMPTY_SERVICE_EXPORT_SLUG];

  return exportSlugs.map((slug) => ({ slug }));
}

export function normalizeServicePageMetadata(
  value: unknown,
): ServicePageMetadata | null {
  if (!isRecord(value) || !isRecord(value.service)) {
    return null;
  }

  const title = requiredString(value.service.title);
  const cardSummary = requiredString(value.service.cardSummary);

  if (!title || !cardSummary) {
    return null;
  }

  let settings: ServicePageMetadata['settings'] = null;
  if (isRecord(value.settings)) {
    const siteName = requiredString(value.settings.siteName);
    const siteUrl = requiredString(value.settings.siteUrl);
    if (siteName && siteUrl) {
      settings = {
        siteName,
        siteUrl,
        defaultSocialImage: normalizeImage(value.settings.defaultSocialImage),
      };
    }
  }

  return {
    service: {
      title,
      cardSummary,
      seoTitle: optionalString(value.service.seoTitle),
      seoDescription: optionalString(value.service.seoDescription),
      noindex: value.service.noindex === true,
      heroImage: normalizeImage(value.service.heroImage),
    },
    settings,
  };
}
