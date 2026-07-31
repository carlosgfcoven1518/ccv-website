import type {
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
  HomeSpecialization,
  PublicEvidenceItem,
  SanityImage,
  ServiceAudience,
  ServiceDeliverable,
  ServicePageMetadata,
  ServiceStage,
  TitledDescription,
} from './types';

export const HOME_HERO_TITLE_FALLBACK =
  'Ecosistemas de marketing para crecimiento comercial.';

export const EMPTY_SERVICE_EXPORT_SLUG = '_template';

const SERVICE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
    !specialization ||
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
