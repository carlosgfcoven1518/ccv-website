import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Container.module.css';

export type ContainerProps = {
  children: ReactNode;
  as?: 'div' | 'section';
  size?: 'reading' | 'standard' | 'wide' | 'full';
  labelledBy?: string;
  ariaLabel?: string;
  className?: string;
};

export function Container({
  children,
  as: Component = 'div',
  size = 'standard',
  labelledBy,
  ariaLabel,
  className,
}: ContainerProps) {
  return (
    <Component
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      className={classNames(styles.container, styles[size], className)}
      data-container={size}
    >
      {children}
    </Component>
  );
}
