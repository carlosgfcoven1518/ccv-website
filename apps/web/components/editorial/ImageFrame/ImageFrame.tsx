import Image from 'next/image';

import { classNames } from '@/lib/classNames';

import styles from './ImageFrame.module.css';

type ImageFrameBaseProps = {
  aspect?: 'source' | 'landscape' | 'editorial' | 'portrait' | 'wide';
  fit?: 'cover' | 'contain';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  overlay?: 'none' | 'navySoft' | 'navyStrong';
  className?: string;
};

type ImageFrameSourceProps = ImageFrameBaseProps & {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  placeholderLabel?: never;
};

type ImageFramePlaceholderProps = ImageFrameBaseProps & {
  src?: never;
  alt?: never;
  sizes?: never;
  priority?: never;
  decorative?: never;
  placeholderLabel: string;
};

export type ImageFrameProps =
  ImageFrameSourceProps | ImageFramePlaceholderProps;

export function ImageFrame({
  aspect = 'source',
  fit = 'cover',
  position = 'center',
  overlay = 'none',
  className,
  ...props
}: ImageFrameProps) {
  return (
    <div
      className={classNames(
        styles.frame,
        styles[aspect],
        styles[fit],
        styles[position],
        styles[overlay],
        className,
      )}
      data-image-frame
    >
      {'placeholderLabel' in props ? (
        <div className={styles.placeholder} aria-hidden="true">
          <span>{props.placeholderLabel}</span>
        </div>
      ) : (
        <Image
          className={styles.image}
          src={props.src}
          alt={props.decorative ? '' : props.alt}
          fill
          sizes={props.sizes}
          preload={props.priority}
          unoptimized
        />
      )}
    </div>
  );
}
