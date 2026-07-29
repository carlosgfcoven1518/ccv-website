import Link from 'next/link';
import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './EditorialLink.module.css';

export type EditorialLinkProps = {
  children: ReactNode;
  href: string;
  variant?: 'inline' | 'standalone' | 'inverse';
  external?: boolean;
  showArrow?: boolean;
  className?: string;
};

export function EditorialLink({
  children,
  href,
  variant = 'inline',
  external = false,
  showArrow = false,
  className,
}: EditorialLinkProps) {
  const linkClassName = classNames(styles.link, styles[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a className={linkClassName} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={linkClassName} href={href}>
      {content}
    </Link>
  );
}
