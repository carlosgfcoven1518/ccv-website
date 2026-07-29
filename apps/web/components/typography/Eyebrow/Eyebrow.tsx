import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Eyebrow.module.css';

export type EyebrowProps = {
  children: ReactNode;
  as?: 'p' | 'span';
  tone?: 'default' | 'inverse' | 'accent';
  marker?: boolean;
  className?: string;
};

export function Eyebrow({
  children,
  as: Component = 'p',
  tone = 'default',
  marker = false,
  className,
}: EyebrowProps) {
  return (
    <Component
      className={classNames(
        styles.eyebrow,
        styles[tone],
        marker && styles.marker,
        className,
      )}
    >
      {children}
    </Component>
  );
}
