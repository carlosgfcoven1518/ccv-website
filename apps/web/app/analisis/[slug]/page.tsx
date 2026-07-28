import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  // Next.js 16 requires at least one generated param to validate a dynamic
  // route during static export. Phase 4 will replace this non-indexable,
  // empty template with the slugs published in Sanity.
  return [{ slug: '_template' }];
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  await params;

  return <main id="main-content" aria-label="Artículo" />;
}
