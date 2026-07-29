import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Quote.module.css';

export type QuoteProps = {
  children: ReactNode;
  attribution?: string;
  variant?: 'pull' | 'blockquote';
  tone?: 'default' | 'inverse';
  className?: string;
};

export function Quote({
  children,
  attribution,
  variant = 'pull',
  tone = 'default',
  className,
}: QuoteProps) {
  if (variant === 'blockquote') {
    return (
      <figure
        className={classNames(
          styles.quote,
          styles.blockquote,
          styles[tone],
          className,
        )}
      >
        <blockquote>{children}</blockquote>
        {attribution ? (
          <figcaption className={styles.attribution}>{attribution}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      className={classNames(styles.quote, styles.pull, styles[tone], className)}
    >
      {children}
    </div>
  );
}
