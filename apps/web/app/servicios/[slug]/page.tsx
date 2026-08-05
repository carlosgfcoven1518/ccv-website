import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Divider } from '@/components/editorial/Divider';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { ImageFrame } from '@/components/editorial/ImageFrame';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { SkipLink } from '@/components/navigation/SkipLink';
import { Footer } from '@/components/navigation/Footer';
import {
  Navigation,
  type NavigationItem,
} from '@/components/navigation/Navigation';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import {
  getPublishedActiveServiceBySlug,
  getPublishedActiveServiceSlugs,
  getSanityImageBuilder,
  getServicePageMetadata,
  toServiceStaticParams,
} from '@/lib/sanity';
import type {
  PublicEvidenceItem,
  ServiceDeliverable,
  ServiceStage,
  TitledDescription,
} from '@/lib/sanity';

import styles from './page.module.css';

const serviceNavigation: readonly NavigationItem[] = [
  { label: 'Dirección de marketing', href: '/#direccion-marketing' },
  { label: 'IFNBs y fintech', href: '/#ifnbs-fintech' },
  { label: 'Análisis', href: '/analisis/' },
  { label: 'CCV', href: '/#ccv' },
  { label: 'Contacto', href: '/#contacto' },
];

const serviceFooterNavigation: readonly NavigationItem[] = [
  ...serviceNavigation,
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad/' },
];

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublishedActiveServiceSlugs();
  return toServiceStaticParams(slugs);
}

function resolveCanonicalUrl(siteUrl: string | undefined, slug: string) {
  const path = `/servicios/${slug}/`;

  if (!siteUrl) {
    return path;
  }

  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return path;
  }
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServicePageMetadata(slug);

  if (!data) {
    return {
      title: 'Servicio no disponible',
      robots: { index: false, follow: false },
    };
  }

  const { service, settings } = data;
  const title = service.seoTitle ?? service.title;
  const description = service.seoDescription ?? service.cardSummary;
  const canonical = resolveCanonicalUrl(settings?.siteUrl, slug);
  const socialImage = service.heroImage ?? settings?.defaultSocialImage;
  const socialImageUrl = socialImage
    ? getSanityImageBuilder(socialImage)
        ?.width(1200)
        .height(630)
        .fit('crop')
        .url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: !service.noindex,
      follow: !service.noindex,
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
  items: TitledDescription[] | ServiceStage[] | ServiceDeliverable[];
  ordered?: boolean;
}) {
  return (
    <Stack as={ordered ? 'ol' : 'ul'} gap="lg" className={styles.list}>
      {items.map((item) => (
        <li className={styles.listItem} key={item._key ?? item.title}>
          <Stack gap="xs">
            <Heading as="h3" size="h3">
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
            {'outcome' in item && item.outcome ? (
              <Text size="small" tone="muted">
                {item.outcome}
              </Text>
            ) : null}
            {'format' in item && item.format ? (
              <Text size="small" tone="muted">
                Formato: {item.format}
              </Text>
            ) : null}
            {'notes' in item && item.notes ? (
              <Text size="small" tone="muted">
                {item.notes}
              </Text>
            ) : null}
          </Stack>
        </li>
      ))}
    </Stack>
  );
}

function EvidenceList({ items }: { items: PublicEvidenceItem[] }) {
  return (
    <Stack as="ul" gap="lg" className={styles.list}>
      {items.map((item) => (
        <li className={styles.listItem} key={item._key ?? item.title}>
          <Stack gap="xs">
            <Heading as="h3" size="h3">
              {item.title}
            </Heading>
            <Text>{item.statement}</Text>
            {item.sourceUrl ? (
              <EditorialLink href={item.sourceUrl} external>
                {item.sourceLabel ?? 'Consultar fuente pública'}
              </EditorialLink>
            ) : item.sourceLabel ? (
              <Text size="small" tone="muted">
                Fuente: {item.sourceLabel}
              </Text>
            ) : null}
          </Stack>
        </li>
      ))}
    </Stack>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getPublishedActiveServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const heroImageUrl = service.heroImage
    ? getSanityImageBuilder(service.heroImage)
        ?.width(1600)
        .height(900)
        .fit('crop')
        .url()
    : undefined;
  const renderHeroImage = Boolean(heroImageUrl && service.heroImageAlt);

  return (
    <>
      <SkipLink />
      <Navigation
        items={serviceNavigation}
        brandLabel="CCV"
        currentHref={`/servicios/${slug}/`}
      />
      <main id="main-content">
        <Section tone="offWhite" spacing="spacious" labelledBy="service-title">
          <Container size="standard">
            <Grid layout={renderHeroImage ? 'textMedia' : 'equal'} gap="lg">
              <Stack
                gap="lg"
                className={renderHeroImage ? undefined : styles.heroCopy}
              >
                <Eyebrow marker>Servicio</Eyebrow>
                <Heading id="service-title" as="h1" size="h1" measure="wide">
                  {service.title}
                </Heading>
                {service.subtitle ? (
                  <Text size="lead" tone="muted" measure="body">
                    {service.subtitle}
                  </Text>
                ) : null}
                <Text measure="body">{service.intro}</Text>
              </Stack>
              {renderHeroImage && heroImageUrl && service.heroImageAlt ? (
                <ImageFrame
                  src={heroImageUrl}
                  alt={service.heroImageAlt}
                  sizes="(min-width: 64rem) 45vw, 100vw"
                  aspect="wide"
                />
              ) : null}
            </Grid>
          </Container>
        </Section>

        <Section tone="light" spacing="standard" labelledBy="problem-title">
          <Container size="reading">
            <Stack gap="xl">
              <Stack gap="md">
                <Heading id="problem-title" as="h2" size="h2">
                  Problema y contexto
                </Heading>
                <Text measure="article">{service.problemStatement}</Text>
              </Stack>

              {service.contextSymptoms.length > 0 ? (
                <Stack gap="md">
                  <Heading as="h3" size="h3">
                    Contexto o síntomas
                  </Heading>
                  <Stack as="ul" gap="sm" className={styles.simpleList}>
                    {service.contextSymptoms.map((symptom) => (
                      <li key={symptom}>
                        <Text>{symptom}</Text>
                      </li>
                    ))}
                  </Stack>
                </Stack>
              ) : null}

              <Stack gap="md">
                <Heading as="h3" size="h3">
                  Audiencia
                </Heading>
                <Stack as="ul" gap="md" className={styles.list}>
                  {service.audiences.map((audience) => (
                    <li
                      className={styles.listItem}
                      key={audience._key ?? audience.name}
                    >
                      <Stack gap="xs">
                        <Text as="div">{audience.name}</Text>
                        <Text tone="muted">{audience.description}</Text>
                      </Stack>
                    </li>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Section>

        <Section tone="navy" spacing="standard" labelledBy="proposal-title">
          <Container size="reading">
            <Stack gap="xl">
              <Stack gap="md">
                <Heading id="proposal-title" as="h2" size="h2" tone="inverse">
                  Propuesta
                </Heading>
                <Text tone="inverse" measure="article">
                  {service.proposal}
                </Text>
              </Stack>
              <Divider tone="inverse" spacing="sm" />
              <Stack gap="md">
                <Heading as="h3" size="h3" tone="inverse">
                  Beneficios esperados
                </Heading>
                <Stack as="ul" gap="md" className={styles.inverseList}>
                  {service.expectedBenefits.map((benefit) => (
                    <li key={benefit._key ?? benefit.title}>
                      <Stack gap="xs">
                        <Text as="div" tone="inverse">
                          {benefit.title}
                        </Text>
                        <Text tone="inverse">{benefit.description}</Text>
                      </Stack>
                    </li>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Section>

        <Section tone="offWhite" spacing="standard" labelledBy="method-title">
          <Container size="reading">
            <Stack gap="xl">
              <Stack gap="md">
                <Heading id="method-title" as="h2" size="h2">
                  Metodología
                </Heading>
                <Text measure="article">{service.methodology}</Text>
              </Stack>
              <TitledList items={service.stages} ordered />
            </Stack>
          </Container>
        </Section>

        <Section
          tone="light"
          spacing="standard"
          labelledBy="deliverables-title"
        >
          <Container size="reading">
            <Stack gap="xl">
              <Heading id="deliverables-title" as="h2" size="h2">
                Entregables
              </Heading>
              <TitledList items={service.deliverables} />
            </Stack>
          </Container>
        </Section>

        {service.evidenceItems.length > 0 ? (
          <Section
            tone="offWhite"
            spacing="standard"
            labelledBy="evidence-title"
          >
            <Container size="reading">
              <Stack gap="xl">
                <Heading id="evidence-title" as="h2" size="h2">
                  Evidencia disponible
                </Heading>
                <EvidenceList items={service.evidenceItems} />
              </Stack>
            </Container>
          </Section>
        ) : null}

        {service.clarifications.length > 0 ? (
          <Section
            tone="light"
            spacing="compact"
            labelledBy="clarifications-title"
          >
            <Container size="reading">
              <Stack gap="lg">
                <Heading id="clarifications-title" as="h2" size="h2">
                  Aclaraciones y límites
                </Heading>
                <Stack as="ul" gap="sm" className={styles.simpleList}>
                  {service.clarifications.map((clarification) => (
                    <li key={clarification}>
                      <Text>{clarification}</Text>
                    </li>
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Section>
        ) : null}

        {service.contactInstruction ? (
          <Section tone="navy" spacing="compact" labelledBy="contact-title">
            <Container size="reading">
              <Stack gap="md">
                <Heading id="contact-title" as="h2" size="h2" tone="inverse">
                  Contacto
                </Heading>
                <Text tone="inverse" measure="article">
                  {service.contactInstruction}
                </Text>
                <EditorialLink
                  href="mailto:carlos@covenpr.com"
                  variant="inverse"
                  external
                  showArrow
                >
                  Escribe a Carlos Gallegos
                </EditorialLink>
              </Stack>
            </Container>
          </Section>
        ) : null}
      </main>
      <Footer
        navigation={serviceFooterNavigation}
        brandLabel="CCV"
        description="Dirección e integración de marketing para convertir demanda en contratos y valor comercial de largo plazo."
        email="carlos@covenpr.com"
        linkedInUrl="https://www.linkedin.com/in/carlosgallegosflores/"
      />
    </>
  );
}
