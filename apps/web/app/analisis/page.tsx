import type { Metadata } from 'next';

import { EditorialCard } from '@/components/editorial/EditorialCard';
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

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Análisis de marketing y crecimiento comercial',
  description:
    'Análisis de CCV sobre adquisición, investigación, dirección de marketing, servicios financieros y crecimiento comercial.',
  alternates: { canonical: 'https://covenpr.com/analisis/' },
};

const navigation: readonly NavigationItem[] = [
  { label: 'Dirección de marketing', href: '/#direccion-marketing' },
  { label: 'IFNBs y fintech', href: '/#ifnbs-fintech' },
  { label: 'Análisis', href: '/analisis/' },
  { label: 'CCV', href: '/#ccv' },
  { label: 'Contacto', href: '/#contacto' },
];

const footerNavigation: readonly NavigationItem[] = [
  ...navigation,
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad/' },
];

const analyses = [
  {
    title:
      'Cómo medir el ROI de marketing cuando los ingresos se generan durante años',
    excerpt:
      'En productos a plazo, comparar la inversión de un mes con el ingreso inmediato puede producir conclusiones equivocadas. CAC, margen, permanencia y valor de vida permiten observar la relación completa.',
  },
  {
    title:
      'Por qué una financiera puede generar muchos prospectos y pocas colocaciones',
    excerpt:
      'La respuesta puede encontrarse en la segmentación, la oferta, la evaluación de riesgo, el seguimiento comercial, la capacidad de respuesta o la coordinación entre áreas.',
  },
  {
    title: 'La segmentación más lógica puede ser la menos rentable',
    excerpt:
      'Tener afinidad con una categoría no significa estar dispuesto a cambiar, contratar o comprar. El comportamiento importa más que la apariencia del segmento.',
  },
] as const;

export default function AnalysisPage() {
  return (
    <>
      <SkipLink />
      <Navigation
        items={navigation}
        brandLabel="CCV"
        currentHref="/analisis/"
      />
      <main id="main-content">
        <Section tone="navy" spacing="spacious" labelledBy="analysis-title">
          <Container size="standard">
            <Stack gap="lg" className={styles.heroCopy}>
              <Eyebrow marker tone="inverse">
                En evidencia
              </Eyebrow>
              <Heading id="analysis-title" as="h1" size="h1" tone="inverse">
                Marketing explicado desde el negocio.
              </Heading>
              <Text size="lead" tone="inverse" measure="body">
                Análisis sobre adquisición, investigación de mercados, dirección
                de marketing, servicios financieros y crecimiento comercial.
                Cada texto parte de un problema real y busca llegar a una
                decisión útil.
              </Text>
            </Stack>
          </Container>
        </Section>

        <Section tone="offWhite" spacing="spacious" labelledBy="archive-title">
          <Container size="standard">
            <Stack gap="xl">
              <Heading id="archive-title" as="h2" size="h2">
                Próximos análisis
              </Heading>
              <Grid layout="equal" gap="md">
                {analyses.map((analysis) => (
                  <EditorialCard
                    key={analysis.title}
                    title={analysis.title}
                    href="/#contacto"
                    excerpt={analysis.excerpt}
                    headingLevel="h3"
                  />
                ))}
              </Grid>
              <Text size="small" tone="muted" measure="article">
                El archivo editorial se encuentra en preparación. Para recibir
                uno de estos análisis o conversar sobre el problema que aborda,
                escribe a Carlos Gallegos.
              </Text>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer
        navigation={footerNavigation}
        brandLabel="CCV"
        description="Dirección e integración de marketing para convertir demanda en contratos y valor comercial de largo plazo."
        email="carlos@covenpr.com"
        linkedInUrl="https://www.linkedin.com/in/carlosgallegosflores/"
      />
    </>
  );
}
