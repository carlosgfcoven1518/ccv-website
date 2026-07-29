import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Stack.module.css';

export type StackProps = {
  children: ReactNode;
  as?: 'div' | 'section' | 'ol' | 'ul';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'stretch';
  labelledBy?: string;
  className?: string;
};

export function Stack({
  children,
  as: Component = 'div',
  gap = 'md',
  align = 'start',
  labelledBy,
  className,
}: StackProps) {
  return (
    <Component
      aria-labelledby={labelledBy}
      className={classNames(
        styles.stack,
        styles[gap],
        styles[align],
        className,
      )}
    >
      {children}
    </Component>
  );
}
