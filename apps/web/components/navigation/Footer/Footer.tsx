import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';

import type { NavigationItem } from '../Navigation';
import styles from './Footer.module.css';

export type FooterProps = {
  navigation: readonly NavigationItem[];
  brandLabel: string;
  description?: string;
  email?: string;
  linkedInUrl?: string;
  logoVariant?: 'positive' | 'negative';
};

export function Footer({
  navigation,
  brandLabel,
  description,
  email,
  linkedInUrl,
  logoVariant = 'negative',
}: FooterProps) {
  return (
    <footer className={styles.footer} data-logo-variant={logoVariant}>
      <Container size="standard">
        <div className={styles.layout}>
          <Stack gap="md">
            <p className={styles.brand}>{brandLabel}</p>
            {description ? (
              <Text size="body" tone="inverse" measure="body">
                {description}
              </Text>
            ) : null}
          </Stack>

          <nav className={styles.navigation} aria-label="Navegación del pie">
            <ul className={styles.list}>
              {navigation.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {email || linkedInUrl ? (
            <address className={styles.contact}>
              {email ? <a href={`mailto:${email}`}>{email}</a> : null}
              {linkedInUrl ? <a href={linkedInUrl}>{linkedInUrl}</a> : null}
            </address>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
