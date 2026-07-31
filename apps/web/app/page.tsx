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
import { Eyebrow } from '@/components/typography/Eyebrow';
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

import styles from './page.module.css';

const siteNavigation: readonly NavigationItem[] = [
  { label: 'Análisis', href: '/analisis/' },
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad/' },
];

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

export default async function HomePage() {
  const { home, settings, featuredArticles } = await getHomeData();
  const publication = resolveHomePublicationState(home, settings);
  const featuredService = home?.featuredService ?? null;
  const hasContactChannel = Boolean(
    settings?.contactEmail || settings?.linkedInUrl,
  );

  return (
    <>
      <SkipLink />
      <Navigation
        items={siteNavigation}
        brandLabel={settings?.siteName ?? 'CCV'}
        currentHref="/"
      />

      <main id="main-content">
        <Section tone="offWhite" spacing="spacious" labelledBy="home-title">
          <Container size="standard">
            <Stack gap="lg">
              <Heading id="home-title" as="h1" size="h1" measure="wide">
                {publication.heroTitle}
              </Heading>
              {home?.heroSubtitle ? (
                <Text size="lead" tone="muted" measure="body">
                  {home.heroSubtitle}
                </Text>
              ) : null}
            </Stack>
          </Container>
        </Section>

        {home ? (
          <>
            <Section
              tone="light"
              spacing="standard"
              labelledBy="decision-context-title"
            >
              <Container size="reading">
                <Stack gap="xl">
                  <Stack gap="md">
                    {home.decisionContext.eyebrow ? (
                      <Eyebrow marker>{home.decisionContext.eyebrow}</Eyebrow>
                    ) : null}
                    <Heading id="decision-context-title" as="h2" size="h2">
                      {home.decisionContext.heading}
                    </Heading>
                    <Text measure="article">{home.decisionContext.intro}</Text>
                  </Stack>
                  <TitledList items={home.decisionContext.points} />
                </Stack>
              </Container>
            </Section>

            <Section
              tone="light"
              spacing="standard"
              labelledBy="ecosystem-title"
            >
              <Container size="reading">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Heading id="ecosystem-title" as="h2" size="h2">
                      {home.ecosystem.heading}
                    </Heading>
                    <Text measure="article">{home.ecosystem.intro}</Text>
                  </Stack>
                  <TitledList items={home.ecosystem.dimensions} />
                </Stack>
              </Container>
            </Section>

            {featuredService ? (
              <Section tone="light" spacing="standard">
                <Container size="standard">
                  <EditorialCard
                    title={featuredService.title}
                    href={`/servicios/${featuredService.slug}/`}
                    excerpt={featuredService.cardSummary}
                    featured
                    headingLevel="h2"
                  />
                </Container>
              </Section>
            ) : null}

            <Section
              tone="light"
              spacing="standard"
              labelledBy="operating-model-title"
            >
              <Container size="reading">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Heading id="operating-model-title" as="h2" size="h2">
                      {home.operatingModel.heading}
                    </Heading>
                    <Text measure="article">{home.operatingModel.intro}</Text>
                  </Stack>
                  <TitledList items={home.operatingModel.stages} ordered />
                  {home.operatingModel.scopeNote ? (
                    <Text size="small" tone="muted" measure="article">
                      {home.operatingModel.scopeNote}
                    </Text>
                  ) : null}
                </Stack>
              </Container>
            </Section>

            {home.evidence ? (
              <Section
                tone="light"
                spacing="standard"
                labelledBy="evidence-title"
              >
                <Container size="reading">
                  <Stack gap="xl">
                    <Stack gap="md">
                      <Heading id="evidence-title" as="h2" size="h2">
                        {home.evidence.heading}
                      </Heading>
                      <Text measure="article">{home.evidence.intro}</Text>
                    </Stack>
                    <EvidenceList items={home.evidence.items} />
                  </Stack>
                </Container>
              </Section>
            ) : null}

            <Section
              tone="light"
              spacing="standard"
              labelledBy="about-ccv-title"
            >
              <Container size="reading">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Heading id="about-ccv-title" as="h2" size="h2">
                      {home.aboutCcv.heading}
                    </Heading>
                    <Text measure="article">{home.aboutCcv.description}</Text>
                  </Stack>
                  {home.aboutCcv.leadershipProfile ? (
                    <Stack gap="xs">
                      <Heading as="h3" size="h3">
                        {home.aboutCcv.leadershipProfile.name}
                      </Heading>
                      {home.aboutCcv.leadershipProfile.role ? (
                        <Text size="small" tone="muted">
                          {home.aboutCcv.leadershipProfile.role}
                        </Text>
                      ) : null}
                      <Text measure="article">
                        {home.aboutCcv.leadershipProfile.bio}
                      </Text>
                    </Stack>
                  ) : null}
                </Stack>
              </Container>
            </Section>

            {home.specialization ? (
              <Section
                tone="light"
                spacing="standard"
                labelledBy="specialization-title"
              >
                <Container size="reading">
                  <Stack gap="xl">
                    <Stack gap="md">
                      <Heading id="specialization-title" as="h2" size="h2">
                        {home.specialization.heading}
                      </Heading>
                      <Text measure="article">{home.specialization.text}</Text>
                    </Stack>
                    {home.specialization.contexts.length > 0 ? (
                      <TitledList items={home.specialization.contexts} />
                    ) : null}
                  </Stack>
                </Container>
              </Section>
            ) : null}

            <Section
              tone="light"
              spacing="standard"
              labelledBy="analysis-title"
            >
              <Container size="standard">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Heading id="analysis-title" as="h2" size="h2">
                      {home.analysisIntro.heading}
                    </Heading>
                    <Text measure="article">{home.analysisIntro.intro}</Text>
                  </Stack>
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
                  <EditorialLink href="/analisis/" variant="standalone">
                    {home.analysisIntro.linkLabel}
                  </EditorialLink>
                </Stack>
              </Container>
            </Section>

            {hasContactChannel ? (
              <Section
                tone="light"
                spacing="standard"
                labelledBy="contact-title"
              >
                <Container size="reading">
                  <Stack gap="lg">
                    <Heading id="contact-title" as="h2" size="h2">
                      {home.contactIntro.heading}
                    </Heading>
                    <Text measure="article">
                      {home.contactIntro.instruction}
                    </Text>
                    <div className={styles.contactLinks}>
                      {settings?.contactEmail ? (
                        <EditorialLink
                          href={`mailto:${settings.contactEmail}`}
                          variant="standalone"
                          external
                        >
                          {settings.contactEmail}
                        </EditorialLink>
                      ) : null}
                      {settings?.linkedInUrl ? (
                        <EditorialLink
                          href={settings.linkedInUrl}
                          variant="standalone"
                          external
                        >
                          {settings.linkedInUrl}
                        </EditorialLink>
                      ) : null}
                    </div>
                  </Stack>
                </Container>
              </Section>
            ) : null}
          </>
        ) : null}
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
