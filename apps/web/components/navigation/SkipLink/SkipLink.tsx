import styles from './SkipLink.module.css';

export type SkipLinkProps = {
  href?: `#${string}`;
  label?: string;
};

export function SkipLink({
  href = '#main-content',
  label = 'Ir al contenido principal',
}: SkipLinkProps) {
  return (
    <a className={styles.skipLink} href={href}>
      {label}
    </a>
  );
}
