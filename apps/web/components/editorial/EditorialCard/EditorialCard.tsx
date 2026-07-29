import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { classNames } from '@/lib/classNames';

import { EditorialLink } from '../EditorialLink';
import { ImageFrame } from '../ImageFrame';
import styles from './EditorialCard.module.css';

export type EditorialCardProps = {
  title: string;
  href: string;
  excerpt?: string;
  contentType?: string;
  publishedAt?: string;
  image?: {
    src: string;
    alt: string;
    sizes: string;
  };
  featured?: boolean;
  headingLevel?: 'h2' | 'h3';
};

export function EditorialCard({
  title,
  href,
  excerpt,
  contentType,
  publishedAt,
  image,
  featured = false,
  headingLevel = 'h3',
}: EditorialCardProps) {
  return (
    <article
      className={classNames(styles.card, featured && styles.featured)}
      data-featured={featured || undefined}
    >
      {image ? (
        <ImageFrame
          src={image.src}
          alt={image.alt}
          sizes={image.sizes}
          aspect="editorial"
        />
      ) : null}

      <div className={styles.content}>
        {contentType || publishedAt ? (
          <div className={styles.meta}>
            {contentType ? <span>{contentType}</span> : null}
            {publishedAt ? (
              <time dateTime={publishedAt}>{publishedAt}</time>
            ) : null}
          </div>
        ) : null}

        <Heading as={headingLevel} size="h3" measure="standard">
          <EditorialLink href={href} variant="inline">
            {title}
          </EditorialLink>
        </Heading>

        {excerpt ? (
          <Text size="body" tone="muted" measure="body">
            {excerpt}
          </Text>
        ) : null}
      </div>
    </article>
  );
}
