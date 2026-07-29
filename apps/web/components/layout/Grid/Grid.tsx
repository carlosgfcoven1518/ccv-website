import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Grid.module.css';

export type GridProps = {
  children: ReactNode;
  as?: 'div' | 'section' | 'ol' | 'ul';
  layout?: 'equal' | 'textMedia' | 'mediaText' | 'editorial';
  gap?: 'sm' | 'md' | 'lg';
  labelledBy?: string;
  className?: string;
};

export function Grid({
  children,
  as: Component = 'div',
  layout = 'equal',
  gap = 'md',
  labelledBy,
  className,
}: GridProps) {
  return (
    <Component
      aria-labelledby={labelledBy}
      className={classNames(
        styles.grid,
        styles[layout],
        styles[gap],
        className,
      )}
      data-layout={layout}
    >
      {children}
    </Component>
  );
}
