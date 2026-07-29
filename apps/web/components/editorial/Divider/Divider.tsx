import { classNames } from '@/lib/classNames';

import styles from './Divider.module.css';

export type DividerProps = {
  tone?: 'subtle' | 'strong' | 'inverse' | 'accent';
  spacing?: 'sm' | 'md' | 'lg';
  decorative?: boolean;
  className?: string;
};

export function Divider({
  tone = 'subtle',
  spacing = 'md',
  decorative = false,
  className,
}: DividerProps) {
  const dividerClassName = classNames(
    styles.divider,
    styles[tone],
    styles[spacing],
    className,
  );

  if (decorative) {
    return <div className={dividerClassName} aria-hidden="true" />;
  }

  return <hr className={dividerClassName} />;
}
