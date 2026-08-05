import { EditorialLink } from '@/components/editorial/EditorialLink';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';

export default function NotFoundPage() {
  return (
    <main id="main-content">
      <Section tone="navy" spacing="spacious" labelledBy="not-found-title">
        <Container size="reading">
          <Stack gap="lg">
            <Text size="small" tone="inverse">
              Error 404
            </Text>
            <Heading id="not-found-title" as="h1" size="h1" tone="inverse">
              Esta página no está disponible.
            </Heading>
            <Text size="lead" tone="inverse" measure="article">
              La dirección puede haber cambiado o el contenido ya no se
              encuentra publicado.
            </Text>
            <EditorialLink href="/" variant="inverse" showArrow>
              Volver al inicio
            </EditorialLink>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
