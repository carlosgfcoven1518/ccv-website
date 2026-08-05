import type { Metadata } from 'next';

import { EditorialLink } from '@/components/editorial/EditorialLink';
import { Container } from '@/components/layout/Container';
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
  title: 'Aviso de privacidad',
  description:
    'Aviso de privacidad integral de Coven Creative Ventures S.A. de C.V.',
  alternates: { canonical: 'https://covenpr.com/aviso-de-privacidad/' },
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

const contactEmail = 'carlos@covenpr.com';

export default function PrivacyNoticePage() {
  return (
    <>
      <SkipLink />
      <Navigation
        items={navigation}
        brandLabel="CCV"
        currentHref="/aviso-de-privacidad/"
      />

      <main id="main-content">
        <Section tone="navy" spacing="spacious" labelledBy="privacy-title">
          <Container size="standard">
            <Stack gap="lg" className={styles.heroCopy}>
              <Eyebrow marker tone="inverse">
                Información legal
              </Eyebrow>
              <Heading id="privacy-title" as="h1" size="h1" tone="inverse">
                Aviso de privacidad.
              </Heading>
              <Text size="lead" tone="inverse" measure="body">
                Cómo recabamos, utilizamos, protegemos y, en su caso,
                compartimos los datos personales de clientes, prospectos,
                proveedores y personas que se comunican con CCV.
              </Text>
              <Text size="small" tone="inverse">
                Última actualización: 4 de agosto de 2026.
              </Text>
            </Stack>
          </Container>
        </Section>

        <Section tone="offWhite" spacing="standard" labelledBy="notice-title">
          <Container size="reading">
            <Stack gap="xl" className={styles.notice}>
              <Stack gap="md">
                <Heading id="notice-title" as="h2" size="h2">
                  Responsable y domicilio
                </Heading>
                <Text measure="article">
                  Coven Creative Ventures S.A. de C.V., que opera comercialmente
                  como CCV, es responsable del tratamiento de los datos
                  personales a los que se refiere este aviso. Para efectos del
                  presente documento señala como domicilio Hipódromo 2046, Col.
                  Providencia, Guadalajara, Jalisco, C.P. 44667, México, y como
                  canal de contacto{' '}
                  <EditorialLink href={`mailto:${contactEmail}`} external>
                    {contactEmail}
                  </EditorialLink>
                  .
                </Text>
              </Stack>

              <Stack gap="md">
                <Heading as="h2" size="h2">
                  Datos que podemos tratar
                </Heading>
                <Text measure="article">
                  Podemos tratar datos de identificación y contacto, como
                  nombre, empresa, puesto, teléfono y correo electrónico;
                  información profesional, comercial y de facturación que sea
                  necesaria para preparar una propuesta, prestar servicios o
                  administrar una relación contractual; y el contenido que la
                  persona titular decida incluir en sus comunicaciones con CCV.
                </Text>
                <Text measure="article">
                  El sitio puede generar registros técnicos básicos de
                  navegación, como dirección IP, tipo de dispositivo, navegador,
                  páginas consultadas y fecha de acceso, cuando sean necesarios
                  para seguridad, operación y medición del sitio. CCV no
                  solicita datos personales sensibles por medio de este sitio.
                  Si una persona los proporciona voluntariamente, serán tratados
                  únicamente cuando resulten indispensables y exista una base
                  legal o consentimiento expreso aplicable.
                </Text>
              </Stack>

              <Stack gap="md">
                <Heading as="h2" size="h2">
                  Finalidades del tratamiento
                </Heading>
                <Text measure="article">
                  Las finalidades primarias son responder solicitudes de
                  información; evaluar una posible relación comercial; preparar
                  propuestas, contratos y entregables; prestar y administrar
                  servicios; coordinar reuniones y comunicaciones; facturar,
                  cobrar y cumplir obligaciones contractuales, fiscales o
                  legales; verificar la seguridad y funcionamiento del sitio; y
                  atender solicitudes relacionadas con datos personales.
                </Text>
                <Text measure="article">
                  De manera secundaria, CCV podrá utilizar los datos de contacto
                  para compartir análisis, invitaciones o información sobre sus
                  servicios. La persona titular puede negarse a esta finalidad o
                  solicitar su exclusión en cualquier momento escribiendo a{' '}
                  <EditorialLink href={`mailto:${contactEmail}`} external>
                    {contactEmail}
                  </EditorialLink>
                  . Negarse no afectará una relación contractual ni la atención
                  de una solicitud.
                </Text>
              </Stack>

              <Stack gap="md">
                <Heading as="h2" size="h2">
                  Uso, divulgación y transferencias
                </Heading>
                <Text measure="article">
                  CCV no vende datos personales. Puede permitir su tratamiento a
                  proveedores que actúen por cuenta de CCV para alojamiento,
                  correo, almacenamiento, administración, facturación o soporte
                  técnico, sujetos a deberes de confidencialidad y seguridad.
                  También podrá comunicar información cuando una disposición
                  jurídica, autoridad competente o la defensa de un derecho lo
                  requiera.
                </Text>
                <Text measure="article">
                  No se realizarán transferencias a terceros para finalidades
                  propias que requieran consentimiento sin obtenerlo
                  previamente. La persona titular puede limitar el uso o la
                  divulgación de sus datos mediante una solicitud enviada al
                  correo indicado en este aviso.
                </Text>
              </Stack>

              <Stack gap="md">
                <Heading as="h2" size="h2">
                  Derechos ARCO y revocación del consentimiento
                </Heading>
                <Text measure="article">
                  La persona titular o su representante puede solicitar el
                  acceso, rectificación, cancelación u oposición al tratamiento
                  de sus datos personales, así como revocar su consentimiento,
                  enviando un correo con el asunto “Derechos ARCO” a{' '}
                  <EditorialLink href={`mailto:${contactEmail}`} external>
                    {contactEmail}
                  </EditorialLink>
                  .
                </Text>
                <Text measure="article">
                  La solicitud deberá incluir nombre y medio para recibir
                  notificaciones; documentos que acrediten la identidad o, en su
                  caso, la representación; descripción clara de los datos
                  involucrados; el derecho que se desea ejercer; y cualquier
                  elemento que ayude a localizar la información. Para una
                  rectificación también deberán indicarse las modificaciones y
                  acompañarse el sustento correspondiente.
                </Text>
                <Text measure="article">
                  CCV comunicará su determinación dentro de los veinte días
                  hábiles siguientes a la recepción de una solicitud completa.
                  Si resulta procedente, la hará efectiva dentro de los quince
                  días hábiles siguientes. Estos plazos podrán ampliarse una
                  sola vez por un periodo igual cuando las circunstancias lo
                  justifiquen. El ejercicio de los derechos ARCO es gratuito,
                  salvo los costos de reproducción o envío permitidos por la
                  legislación aplicable.
                </Text>
              </Stack>

              <Stack gap="md">
                <Heading as="h2" size="h2">
                  Conservación y seguridad
                </Heading>
                <Text measure="article">
                  Los datos serán conservados durante el tiempo necesario para
                  cumplir las finalidades descritas y, posteriormente, durante
                  los plazos legales o contractuales aplicables. CCV mantiene
                  medidas administrativas, técnicas y físicas razonables para
                  protegerlos contra daño, pérdida, alteración, destrucción,
                  acceso o tratamiento no autorizado.
                </Text>
              </Stack>

              <Stack gap="md">
                <Heading as="h2" size="h2">
                  Cambios al aviso y autoridad competente
                </Heading>
                <Text measure="article">
                  Cualquier modificación sustancial se publicará en esta misma
                  página e indicará la fecha de actualización. Cuando la ley lo
                  exija, CCV solicitará nuevamente el consentimiento. Si una
                  persona considera vulnerado su derecho a la protección de
                  datos personales, puede acudir ante la Secretaría
                  Anticorrupción y Buen Gobierno, autoridad competente en la
                  materia.
                </Text>
              </Stack>

              <Stack gap="md" className={styles.contactBlock}>
                <Heading as="h2" size="h2">
                  Contacto
                </Heading>
                <Text measure="article">
                  Para cualquier pregunta sobre este aviso o sobre el
                  tratamiento de datos personales, escribe a Carlos Gallegos en{' '}
                  <EditorialLink href={`mailto:${contactEmail}`} external>
                    {contactEmail}
                  </EditorialLink>
                  .
                </Text>
              </Stack>
            </Stack>
          </Container>
        </Section>
      </main>

      <Footer
        navigation={footerNavigation}
        brandLabel="CCV"
        description="Dirección e integración de marketing para convertir demanda en contratos y valor comercial de largo plazo."
        email={contactEmail}
        linkedInUrl="https://www.linkedin.com/in/carlosgallegosflores/"
      />
    </>
  );
}
