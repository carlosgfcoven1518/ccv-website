import type { Metadata } from 'next';
import { cache } from 'react';

import { EditorialCard } from '@/components/editorial/EditorialCard';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Footer } from '@/components/navigation/Footer';
import {
  Navigation,
  type NavigationItem,
} from '@/components/navigation/Navigation';
import { SkipLink } from '@/components/navigation/SkipLink';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import {
  getFeaturedArticles,
  getHomePage,
  getSanityImageBuilder,
  getSiteSettings,
  resolveHomePublicationState,
} from '@/lib/sanity';
import type { PublicEvidenceItem, TitledDescription } from '@/lib/sanity';

import { HOME_FALLBACK_COPY } from './homeCopy';
import styles from './page.module.css';

const siteNavigation: readonly NavigationItem[] = [
  { label: 'Análisis', href: '/analisis/' },
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad/' },
];

const HOME_IMAGES = {
  hero: 'hero',
  ecosystem: 'ecosystem',
  operatingModel: 'operating-model',
  specialization: 'specialization',
} as const;

const IMAGE_WIDTHS = [640, 960, 1440, 2048] as const;

const getHomeData = cache(async () => {
  const [home, settings, featuredArticles] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getFeaturedArticles(),
  ]);

  return { home, settings, featuredArticles };
});

function resolveRootUrl(siteUrl: string | undefined) {
  if (!siteUrl) {
    return undefined;
  }

  try {
    return new URL('/', siteUrl).toString();
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { home, settings } = await getHomeData();
  const publication = resolveHomePublicationState(home, settings);
  const title = settings?.defaultSeoTitle ?? settings?.siteName ?? 'CCV';
  const description =
    settings?.defaultSeoDescription ?? settings?.siteDescription;
  const canonical = resolveRootUrl(settings?.siteUrl);
  const socialImageUrl = settings?.defaultSocialImage
    ? getSanityImageBuilder(settings.defaultSocialImage)
        ?.width(1200)
        .height(630)
        .fit('crop')
        .url()
    : undefined;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: {
      index: publication.shouldIndex,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'es_MX',
      title,
      description,
      url: canonical,
      siteName: settings?.siteName ?? 'CCV',
      images: socialImageUrl ? [{ url: socialImageUrl }] : undefined,
    },
  };
}

function ResponsiveEditorialImage({
  name,
  alt = '',
  sizes,
  priority = false,
  className,
}: {
  name: (typeof HOME_IMAGES)[keyof typeof HOME_IMAGES];
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const sourceSet = (extension: 'avif' | 'webp') =>
    IMAGE_WIDTHS.map(
      (width) => `/images/home/${name}-${width}.${extension} ${width}w`,
    ).join(', ');

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={sourceSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet('webp')} sizes={sizes} />
      <img
        src={`/images/home/${name}-2048.webp`}
        alt={alt}
        width={2048}
        height={1117}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

function TitledList({
  items,
  ordered = false,
}: {
  items: TitledDescription[];
  ordered?: boolean;
}) {
  return (
    <Stack as={ordered ? 'ol' : 'ul'} gap="lg" className={styles.titledList}>
      {items.map((item) => (
        <li key={item._key ?? item.title}>
          <Stack gap="xs">
            <Heading as="h3" size="h3">
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
          </Stack>
        </li>
      ))}
    </Stack>
  );
}

function EvidenceList({ items }: { items: PublicEvidenceItem[] }) {
  return (
    <Stack as="ul" gap="lg" className={styles.titledList}>
      {items.map((item) => (
        <li key={item._key ?? item.title}>
          <Stack gap="xs">
            <Heading as="h3" size="h3">
              {item.title}
            </Heading>
            <Text>{item.statement}</Text>
            {item.sourceUrl ? (
              <EditorialLink href={item.sourceUrl} external>
                {item.sourceLabel ?? item.sourceUrl}
              </EditorialLink>
            ) : item.sourceLabel ? (
              <Text size="small" tone="muted">
                {item.sourceLabel}
              </Text>
            ) : null}
          </Stack>
        </li>
      ))}
    </Stack>
  );
}

function Paragraphs({
  paragraphs,
  tone = 'default',
}: {
  paragraphs: readonly string[];
  tone?: 'default' | 'inverse';
}) {
  return (
    <Stack gap="md">
      {paragraphs.map((paragraph) => (
        <Text key={paragraph} measure="article" tone={tone}>
          {paragraph}
        </Text>
      ))}
    </Stack>
  );
}

export default async function HomePage() {
  const { home, settings, featuredArticles } = await getHomeData();
  const publication = resolveHomePublicationState(home, settings);
  const featuredService = home?.featuredService ?? null;
  const usesFallback = home === null;

  const decisionContext = home
    ? {
        heading: home.decisionContext.heading,
        paragraphs: [home.decisionContext.intro],
        points: home.decisionContext.points,
      }
    : {
        ...HOME_FALLBACK_COPY.decisionContext,
        points: [],
      };

  const ecosystem = home
    ? {
        heading: home.ecosystem.heading,
        paragraphs: [home.ecosystem.intro],
        dimensions: home.ecosystem.dimensions,
      }
    : {
        ...HOME_FALLBACK_COPY.ecosystem,
        dimensions: [],
      };

  const operatingModel = home
    ? {
        heading: home.operatingModel.heading,
        paragraphs: [home.operatingModel.intro],
        stages: home.operatingModel.stages,
        scopeNote: home.operatingModel.scopeNote,
      }
    : {
        ...HOME_FALLBACK_COPY.operatingModel,
        stages: [],
        scopeNote: undefined,
      };

  const aboutCcv = home
    ? {
        heading: home.aboutCcv.heading,
        paragraphs: [home.aboutCcv.description],
      }
    : HOME_FALLBACK_COPY.aboutCcv;

  const specialization = home?.specialization
    ? {
        heading: home.specialization.heading,
        paragraphs: [home.specialization.text],
        contexts: home.specialization.contexts,
      }
    : usesFallback
      ? {
          ...HOME_FALLBACK_COPY.specialization,
          contexts: [],
        }
      : null;

  const analysis = home
    ? {
        heading: home.analysisIntro.heading,
        description: home.analysisIntro.intro,
        linkLabel: home.analysisIntro.linkLabel,
      }
    : HOME_FALLBACK_COPY.analysis;

  const contact = home
    ? {
        heading: home.contactIntro.heading,
        description: home.contactIntro.instruction,
      }
    : HOME_FALLBACK_COPY.contact;

  return (
    <>
      <SkipLink />
      <Navigation
        items={siteNavigation}
        brandLabel={settings?.siteName ?? 'CCV'}
        currentHref="/"
      />

      <main id="main-content" className={styles.home}>
        <Section
          tone="navy"
          spacing="spacious"
          labelledBy="home-title"
          className={styles.hero}
        >
          <Container size="wide" className={styles.heroContainer}>
            <div className={styles.heroLayout}>
              <Stack gap="lg" className={styles.heroCopy}>
                <Heading
                  id="home-title"
                  as="h1"
                  size="h1"
                  tone="inverse"
                  measure="wide"
                  className={styles.heroTitle}
                >
                  {publication.heroTitle}
                </Heading>
                <Text
                  size="lead"
                  tone="inverse"
                  measure="body"
                  className={styles.heroIntro}
                >
                  {home?.heroSubtitle ?? HOME_FALLBACK_COPY.hero.intro}
                </Text>
                <Text
                  size="small"
                  tone="inverse"
                  measure="none"
                  className={styles.heroStatement}
                >
                  {HOME_FALLBACK_COPY.hero.statement}
                </Text>
              </Stack>

              <div className={styles.heroVisual} aria-hidden="true">
                <div className={styles.heroHaloOne} />
                <div className={styles.heroHaloTwo} />
                <ResponsiveEditorialImage
                  name={HOME_IMAGES.hero}
                  sizes="(min-width: 80rem) 64vw, (min-width: 64rem) 61vw, 100vw"
                  priority
                  className={styles.heroPicture}
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section
          tone="light"
          spacing="spacious"
          labelledBy="decision-context-title"
          className={styles.decisionSection}
        >
          <Container size="standard">
            <div className={styles.decisionLayout}>
              <Heading
                id="decision-context-title"
                as="h2"
                size="h2"
                className={styles.sectionHeading}
              >
                {decisionContext.heading}
              </Heading>
              <Stack gap="xl" className={styles.sectionBody}>
                <Paragraphs paragraphs={decisionContext.paragraphs} />
                {decisionContext.points.length > 0 ? (
                  <TitledList items={decisionContext.points} />
                ) : null}
              </Stack>
            </div>
          </Container>
        </Section>

        <Section
          tone="offWhite"
          spacing="spacious"
          labelledBy="ecosystem-title"
          className={styles.mediaSection}
        >
          <Container size="wide">
            <div className={styles.ecosystemLayout}>
              <ResponsiveEditorialImage
                name={HOME_IMAGES.ecosystem}
                sizes="(min-width: 64rem) 53vw, 100vw"
                className={styles.editorialPicture}
              />
              <Stack gap="xl" className={styles.mediaCopy}>
                <Heading id="ecosystem-title" as="h2" size="h2">
                  {ecosystem.heading}
                </Heading>
                <Paragraphs paragraphs={ecosystem.paragraphs} />
                {ecosystem.dimensions.length > 0 ? (
                  <TitledList items={ecosystem.dimensions} />
                ) : null}
              </Stack>
            </div>
          </Container>
        </Section>

        {featuredService || usesFallback ? (
          <Section
            tone="navy"
            spacing="standard"
            labelledBy="featured-service-title"
            className={styles.featuredService}
          >
            <Container size="standard">
              <div className={styles.featuredServiceLayout}>
                <Heading
                  id="featured-service-title"
                  as="h2"
                  size="h2"
                  tone="inverse"
                >
                  {featuredService?.title ??
                    HOME_FALLBACK_COPY.featuredService.heading}
                </Heading>
                <Stack gap="lg" className={styles.featuredServiceBody}>
                  <Text tone="inverse" size="lead" measure="article">
                    {featuredService?.cardSummary ??
                      HOME_FALLBACK_COPY.featuredService.description}
                  </Text>
                  {featuredService?.audiences[0]?.name ? (
                    <Text
                      tone="inverse"
                      size="small"
                      className={styles.featuredAudience}
                    >
                      {featuredService.audiences[0].name}
                    </Text>
                  ) : null}
                  {featuredService ? (
                    <EditorialLink
                      href={`/servicios/${featuredService.slug}/`}
                      variant="inverse"
                      showArrow
                    >
                      {HOME_FALLBACK_COPY.featuredService.linkLabel}
                    </EditorialLink>
                  ) : (
                    <Text
                      tone="inverse"
                      size="small"
                      className={styles.inactiveEditorialPrompt}
                    >
                      {HOME_FALLBACK_COPY.featuredService.linkLabel}
                    </Text>
                  )}
                </Stack>
              </div>
            </Container>
          </Section>
        ) : null}

        <Section
          tone="light"
          spacing="spacious"
          labelledBy="operating-model-title"
          className={styles.mediaSection}
        >
          <Container size="wide">
            <div className={styles.operatingLayout}>
              <Stack gap="xl" className={styles.mediaCopy}>
                <Heading id="operating-model-title" as="h2" size="h2">
                  {operatingModel.heading}
                </Heading>
                <Paragraphs paragraphs={operatingModel.paragraphs} />
                {operatingModel.stages.length > 0 ? (
                  <TitledList items={operatingModel.stages} ordered />
                ) : null}
                {operatingModel.scopeNote ? (
                  <Text size="small" tone="muted" measure="article">
                    {operatingModel.scopeNote}
                  </Text>
                ) : null}
              </Stack>
              <ResponsiveEditorialImage
                name={HOME_IMAGES.operatingModel}
                sizes="(min-width: 64rem) 55vw, 100vw"
                className={styles.editorialPicture}
              />
            </div>
          </Container>
        </Section>

        {home?.evidence || usesFallback ? (
          <Section
            tone="offWhite"
            spacing="spacious"
            labelledBy="evidence-title"
            className={styles.evidenceSection}
          >
            <Container size="standard">
              <div className={styles.evidenceLayout}>
                <Heading
                  id="evidence-title"
                  as="h2"
                  size="h2"
                  className={styles.sectionHeading}
                >
                  {home?.evidence?.heading ??
                    HOME_FALLBACK_COPY.evidence.heading}
                </Heading>
                <Stack gap="xl" className={styles.sectionBody}>
                  {home?.evidence ? (
                    <>
                      <Text measure="article">{home.evidence.intro}</Text>
                      <EvidenceList items={home.evidence.items} />
                    </>
                  ) : (
                    <Paragraphs
                      paragraphs={HOME_FALLBACK_COPY.evidence.paragraphs}
                    />
                  )}
                </Stack>
              </div>
            </Container>
          </Section>
        ) : null}

        <Section
          tone="navy"
          spacing="spacious"
          labelledBy="about-ccv-title"
          className={styles.aboutSection}
        >
          <Container size="standard">
            <div className={styles.aboutLayout}>
              <Heading id="about-ccv-title" as="h2" size="h2" tone="inverse">
                {aboutCcv.heading}
              </Heading>
              <Stack gap="lg" className={styles.aboutBody}>
                <Paragraphs paragraphs={aboutCcv.paragraphs} tone="inverse" />
                {home?.aboutCcv.leadershipProfile ? (
                  <div className={styles.leadershipProfile}>
                    <Heading as="h3" size="h3" tone="inverse">
                      {home.aboutCcv.leadershipProfile.name}
                    </Heading>
                    {home.aboutCcv.leadershipProfile.role ? (
                      <Text tone="inverse" size="small">
                        {home.aboutCcv.leadershipProfile.role}
                      </Text>
                    ) : null}
                    <Text tone="inverse" measure="article">
                      {home.aboutCcv.leadershipProfile.bio}
                    </Text>
                  </div>
                ) : null}
              </Stack>
            </div>
          </Container>
        </Section>

        {specialization ? (
          <Section
            tone="light"
            spacing="spacious"
            labelledBy="specialization-title"
            className={styles.mediaSection}
          >
            <Container size="wide">
              <div className={styles.specializationLayout}>
                <ResponsiveEditorialImage
                  name={HOME_IMAGES.specialization}
                  sizes="(min-width: 64rem) 58vw, 100vw"
                  className={styles.specializationPicture}
                />
                <Stack gap="xl" className={styles.specializationCopy}>
                  <Heading id="specialization-title" as="h2" size="h2">
                    {specialization.heading}
                  </Heading>
                  <Paragraphs paragraphs={specialization.paragraphs} />
                  {specialization.contexts.length > 0 ? (
                    <TitledList items={specialization.contexts} />
                  ) : null}
                </Stack>
              </div>
            </Container>
          </Section>
        ) : null}

        <Section
          tone="offWhite"
          spacing="spacious"
          labelledBy="analysis-title"
          className={styles.analysisSection}
        >
          <Container size="standard">
            <Stack gap="xl">
              <div className={styles.analysisIntro}>
                <Heading id="analysis-title" as="h2" size="h2">
                  {analysis.heading}
                </Heading>
                <Text measure="article">{analysis.description}</Text>
              </div>
              {featuredArticles.length > 0 ? (
                <Grid layout="equal" gap="md">
                  {featuredArticles.map((article) => (
                    <EditorialCard
                      key={article._id}
                      title={article.title}
                      href={`/analisis/${article.slug}/`}
                      excerpt={article.excerpt}
                      headingLevel="h3"
                    />
                  ))}
                </Grid>
              ) : null}
              <EditorialLink href="/analisis/" variant="standalone" showArrow>
                {analysis.linkLabel}
              </EditorialLink>
            </Stack>
          </Container>
        </Section>

        <Section
          tone="navy"
          spacing="spacious"
          labelledBy="contact-title"
          className={styles.contactSection}
        >
          <Container size="standard">
            <div className={styles.contactLayout}>
              <Heading id="contact-title" as="h2" size="h2" tone="inverse">
                {contact.heading}
              </Heading>
              <Stack gap="lg" className={styles.contactBody}>
                <Text tone="inverse" size="lead" measure="article">
                  {contact.description}
                </Text>
                <Text
                  tone="inverse"
                  size="small"
                  className={styles.contactPrompt}
                >
                  {HOME_FALLBACK_COPY.contact.prompt}
                </Text>
                {settings?.contactEmail || settings?.linkedInUrl ? (
                  <div className={styles.contactLinks}>
                    {settings.contactEmail ? (
                      <EditorialLink
                        href={`mailto:${settings.contactEmail}`}
                        variant="inverse"
                        external
                      >
                        {settings.contactEmail}
                      </EditorialLink>
                    ) : null}
                    {settings.linkedInUrl ? (
                      <EditorialLink
                        href={settings.linkedInUrl}
                        variant="inverse"
                        external
                      >
                        LinkedIn
                      </EditorialLink>
                    ) : null}
                  </div>
                ) : null}
              </Stack>
            </div>
          </Container>
        </Section>
      </main>

      <Footer
        navigation={siteNavigation}
        brandLabel={settings?.siteName ?? 'CCV'}
        description={settings?.siteDescription}
        email={settings?.contactEmail}
        linkedInUrl={settings?.linkedInUrl}
      />
    </>
  );
}
