import type { Metadata } from 'next';

import { Divider } from '@/components/editorial/Divider';
import { EditorialCard } from '@/components/editorial/EditorialCard';
import { EditorialLink } from '@/components/editorial/EditorialLink';
import { ImageFrame } from '@/components/editorial/ImageFrame';
import { Quote } from '@/components/editorial/Quote';
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
  title: 'Demostración técnica del sistema de diseño',
  description:
    'Página interna de demostración de los componentes visuales de CCV.',
  robots: {
    index: false,
    follow: false,
  },
};

const demoNavigation: readonly NavigationItem[] = [
  { label: 'Tokens', href: '#tokens' },
  { label: 'Tipografía', href: '#tipografia' },
  { label: 'Layout', href: '#layout' },
  { label: 'Editorial', href: '#editorial' },
  { label: 'Accesibilidad', href: '#accesibilidad' },
];

const colorTokens = [
  { label: 'Navy', value: '#0e1b2c', className: styles.navy },
  { label: 'Blanco', value: '#ffffff', className: styles.white },
  { label: 'Off-white', value: '#f7f7f5', className: styles.offWhite },
  { label: 'Verde de acento', value: '#01eb2c', className: styles.accent },
] as const;

const spaceTokens = [
  ['4', '1rem'],
  ['8', '2rem'],
  ['12', '3rem'],
  ['16', '4rem'],
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <SkipLink />
      <Navigation
        items={demoNavigation}
        brandLabel="CCV / DS"
        homeHref="/design-system/"
        currentHref="/design-system/"
        stickyBehavior="transition"
      />

      <main id="main-content">
        <Section tone="offWhite" spacing="spacious" labelledBy="demo-title">
          <Container size="standard">
            <Stack gap="lg">
              <Eyebrow marker>
                Demostración técnica · no es contenido público
              </Eyebrow>
              <Heading id="demo-title" as="h1" size="h1" measure="wide">
                Sistema de diseño CCV
              </Heading>
              <Text size="lead" tone="muted" measure="body">
                Muestrario interno para verificar componentes, tokens,
                contraste, reflujo y estados interactivos. Todo el texto de esta
                ruta es contenido técnico de demostración.
              </Text>
              <EditorialLink href="#tokens" variant="standalone" showArrow>
                Revisar fundamentos
              </EditorialLink>
            </Stack>
          </Container>
        </Section>

        <Section
          id="tokens"
          tone="light"
          spacing="standard"
          labelledBy="tokens-title"
        >
          <Container size="standard">
            <Stack gap="xl">
              <Stack gap="sm">
                <Eyebrow>01 · Fundamentos</Eyebrow>
                <Heading id="tokens-title" as="h2" size="h2">
                  Color y espaciado
                </Heading>
                <Text tone="muted">
                  Tokens aprobados mostrados como referencia técnica, no como
                  una propuesta adicional de paleta.
                </Text>
              </Stack>

              <Grid
                as="ul"
                layout="equal"
                gap="md"
                className={styles.cleanList}
              >
                {colorTokens.map((token) => (
                  <li className={styles.tokenItem} key={token.label}>
                    <span
                      className={`${styles.swatch} ${token.className}`}
                      aria-hidden="true"
                    />
                    <Text size="small" measure="none">
                      {token.label}
                    </Text>
                    <code>{token.value}</code>
                  </li>
                ))}
              </Grid>

              <Stack gap="md">
                <Heading as="h3" size="h3">
                  Ritmo base
                </Heading>
                <div className={styles.spaceScale}>
                  {spaceTokens.map(([name, value]) => (
                    <div className={styles.spaceItem} key={name}>
                      <span
                        className={styles.spaceBar}
                        data-space={name}
                        aria-hidden="true"
                      />
                      <code>{`--space-${name}: ${value}`}</code>
                    </div>
                  ))}
                </div>
              </Stack>
            </Stack>
          </Container>
        </Section>

        <Section
          id="tipografia"
          tone="navy"
          spacing="standard"
          labelledBy="type-title"
        >
          <Container size="standard">
            <Stack gap="xl">
              <Stack gap="sm">
                <Eyebrow tone="inverse" marker>
                  02 · Tipografía
                </Eyebrow>
                <Heading
                  id="type-title"
                  as="h2"
                  size="h2"
                  tone="inverse"
                  measure="wide"
                >
                  Jerarquía editorial fluida
                </Heading>
              </Stack>

              <Divider tone="inverse" spacing="sm" />

              <Grid layout="textMedia" gap="lg">
                <Stack gap="lg">
                  <Heading as="h3" size="h3" tone="inverse">
                    Syne Bold para estructura
                  </Heading>
                  <Text size="lead" tone="inverse">
                    Outfit Light sostiene la lectura y las interfaces. Los
                    fallbacks permanecen activos hasta instalar los WOFF2
                    definitivos.
                  </Text>
                </Stack>
                <div className={styles.decorativeType} aria-hidden="true">
                  Aa
                </div>
              </Grid>

              <EditorialLink href="#layout" variant="inverse" showArrow>
                Continuar con layout
              </EditorialLink>
            </Stack>
          </Container>
        </Section>

        <Section
          id="layout"
          tone="offWhite"
          spacing="standard"
          labelledBy="layout-title"
        >
          <Container size="wide">
            <Stack gap="xl">
              <Stack gap="sm">
                <Eyebrow>03 · Layout</Eyebrow>
                <Heading id="layout-title" as="h2" size="h2">
                  Composición responsive
                </Heading>
              </Stack>

              <Grid layout="equal" gap="md">
                {['Primera columna', 'Segunda columna', 'Tercera columna'].map(
                  (label, index) => (
                    <div className={styles.gridSample} key={label}>
                      <Eyebrow marker>{`0${index + 1}`}</Eyebrow>
                      <Heading as="h3" size="h3">
                        {label}
                      </Heading>
                      <Text size="small" tone="muted">
                        Muestra técnica del grid de doce columnas y su reflujo a
                        una sola columna.
                      </Text>
                    </div>
                  ),
                )}
              </Grid>

              <Grid layout="editorial" gap="lg">
                <Eyebrow marker>Asimetría</Eyebrow>
                <Quote variant="pull">
                  El desplazamiento responde al grid y preserva el orden lógico
                  del documento.
                </Quote>
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section
          id="editorial"
          tone="light"
          spacing="standard"
          labelledBy="editorial-title"
        >
          <Container size="standard">
            <Stack gap="xl">
              <Stack gap="sm">
                <Eyebrow>04 · Componentes editoriales</Eyebrow>
                <Heading id="editorial-title" as="h2" size="h2">
                  Superficies sin cajas innecesarias
                </Heading>
              </Stack>

              <Grid layout="textMedia" gap="lg">
                <EditorialCard
                  title="Demostración técnica de EditorialCard"
                  href="#editorial"
                  contentType="Componente"
                  excerpt="Esta muestra no representa un artículo, una fecha real ni contenido editorial de CCV."
                  featured
                />
                <Stack gap="md">
                  <ImageFrame
                    placeholderLabel="Marcador técnico: no se integraron imágenes finales"
                    aspect="editorial"
                  />
                  <Text size="small" tone="muted">
                    ImageFrame conserva proporción y espacio sin inventar un
                    asset.
                  </Text>
                </Stack>
              </Grid>

              <Divider tone="strong" spacing="md" />

              <Grid layout="equal" gap="lg">
                <Quote variant="pull">
                  Variante pull: énfasis sin ornamento adicional.
                </Quote>
                <Quote
                  variant="blockquote"
                  attribution="Atribución técnica de demostración"
                >
                  Variante blockquote para verificar semántica y jerarquía.
                </Quote>
                <Stack gap="sm">
                  <Eyebrow tone="accent" marker>
                    Enlaces
                  </Eyebrow>
                  <EditorialLink href="#accesibilidad" variant="standalone">
                    Enlace editorial standalone
                  </EditorialLink>
                  <Text size="small" tone="muted">
                    El subrayado conserva una señal además del color.
                  </Text>
                </Stack>
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section
          id="accesibilidad"
          tone="offWhite"
          spacing="standard"
          labelledBy="accessibility-title"
        >
          <Container size="reading">
            <Stack gap="lg">
              <Eyebrow marker>05 · Accesibilidad y movimiento</Eyebrow>
              <Heading id="accessibility-title" as="h2" size="h2">
                Estados verificables
              </Heading>
              <Text size="lead" measure="article">
                Usa Tab y Shift+Tab para recorrer el skip link, la navegación y
                los enlaces. En viewport compacto, el control Menú anuncia su
                estado y Escape lo cierra. Reduced motion elimina transiciones
                no esenciales.
              </Text>
              <div className={styles.motionSample}>
                <Text size="small" measure="none">
                  Muestra de transición funcional
                </Text>
              </div>
              <EditorialLink href="#main-content" variant="standalone">
                Volver al inicio del contenido
              </EditorialLink>
            </Stack>
          </Container>
        </Section>
      </main>

      <Footer
        brandLabel="CCV / Demostración técnica"
        description="Pie de página de muestra para revisar composición, enlaces y reflujo. No es contenido público definitivo."
        navigation={demoNavigation}
      />
    </>
  );
}
