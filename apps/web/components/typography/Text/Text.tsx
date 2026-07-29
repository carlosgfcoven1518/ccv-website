import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Text.module.css';

export type TextProps = {
  children: ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'small' | 'body' | 'lead';
  tone?: 'default' | 'muted' | 'inverse';
  measure?: 'narrow' | 'body' | 'article' | 'none';
  className?: string;
};

export function Text({
  children,
  as: Component = 'p',
  size = 'body',
  tone = 'default',
  measure = 'body',
  className,
}: TextProps) {
  return (
    <Component
      className={classNames(
        styles.text,
        styles[`size-${size}`],
        styles[`tone-${tone}`],
        styles[`measure-${measure}`],
        className,
      )}
    >
      {children}
    </Component>
  );
}
