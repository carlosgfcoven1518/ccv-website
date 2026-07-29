import type { ReactNode } from 'react';

import { classNames } from '@/lib/classNames';

import styles from './Section.module.css';

export type SectionProps = {
  children: ReactNode;
  id?: string;
  as?: 'section' | 'div';
  tone?: 'light' | 'offWhite' | 'navy';
  spacing?: 'compact' | 'standard' | 'spacious';
  labelledBy?: string;
  className?: string;
};

export function Section({
  children,
  id,
  as: Component = 'section',
  tone = 'light',
  spacing = 'standard',
  labelledBy,
  className,
}: SectionProps) {
  return (
    <Component
      id={id}
      aria-labelledby={labelledBy}
      className={classNames(
        styles.section,
        styles[tone],
        styles[spacing],
        className,
      )}
      data-tone={tone}
    >
      {children}
    </Component>
  );
}
