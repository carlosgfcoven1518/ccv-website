import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Heading.module.css';

export type HeadingProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3';
  size?: 'h1' | 'h2' | 'h3' | 'display';
  tone?: 'default' | 'inverse';
  measure?: 'narrow' | 'standard' | 'wide';
  balance?: boolean;
  id?: string;
  className?: string;
};

export function Heading({
  children,
  as: Component,
  size,
  tone = 'default',
  measure = 'standard',
  balance = true,
  id,
  className,
}: HeadingProps) {
  const resolvedSize = size ?? Component;

  return (
    <Component
      id={id}
      className={classNames(
        styles.heading,
        styles[resolvedSize],
        styles[tone],
        styles[measure],
        balance && styles.balance,
        className,
      )}
    >
      {children}
    </Component>
  );
}
