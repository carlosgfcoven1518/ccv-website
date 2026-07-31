import assert from 'node:assert/strict';
import test from 'node:test';

import {
  HOME_HERO_TITLE_FALLBACK,
  normalizeCommercialService,
  normalizeFeaturedArticles,
  normalizeHomePage,
  normalizeSiteSettings,
  normalizeServiceSlugs,
  resolveHomePublicationState,
  restrictFeaturedServiceToExport,
  toServiceStaticParams,
} from './normalizers.ts';
import { featuredArticlesQuery, homePageQuery } from './queries.ts';
import { withReadFallback } from './safeRead.ts';

const titledItem = {
  _key: 'item-1',
  title: 'Elemento técnico de prueba',
  description: 'Descripción técnica de prueba sin contenido público.',
};

const activeServiceFixture = {
  _id: 'service-fixture',
  title: 'Servicio técnico de prueba',
  slug: 'servicio-tecnico-de-prueba',
  cardSummary: 'Resumen técnico de prueba.',
  intro: 'Introducción técnica de prueba.',
  problemStatement: 'Problema técnico de prueba.',
  audiences: [
    {
      _key: 'audience-1',
      name: 'Audiencia técnica',
      description: 'Descripción técnica de la audiencia.',
    },
  ],
  proposal: 'Propuesta técnica de prueba.',
  expectedBenefits: [titledItem],
  methodology: 'Metodología técnica de prueba.',
  stages: [titledItem, { ...titledItem, _key: 'item-2' }],
  deliverables: [titledItem],
  evidenceItems: [
    {
      _key: 'evidence-1',
      title: 'Evidencia técnica',
      statement: 'Afirmación pública de prueba.',
      internalVerificationNote: 'Este valor nunca debe salir al frontend.',
    },
  ],
  availabilityStatus: 'active',
};

const homeFixture = {
  _id: 'homePage',
  heroSubtitle: 'Subtítulo técnico de prueba.',
  decisionContext: {
    heading: 'Contexto técnico',
    intro: 'Introducción técnica.',
    points: [titledItem, { ...titledItem, _key: 'item-2' }],
  },
  ecosystem: {
    heading: 'Ecosistema técnico',
    intro: 'Introducción técnica.',
    dimensions: [
      titledItem,
      { ...titledItem, _key: 'item-2' },
      { ...titledItem, _key: 'item-3' },
    ],
  },
  featuredService: { ...activeServiceFixture, slug: 'Slug inválido' },
  operatingModel: {
    heading: 'Modelo técnico',
    intro: 'Introducción técnica.',
    stages: [
      titledItem,
      { ...titledItem, _key: 'item-2' },
      { ...titledItem, _key: 'item-3' },
    ],
  },
  evidence: {
    heading: 'Evidencia técnica',
    intro: 'Encuadre técnico.',
    items: [
      {
        _key: 'home-evidence-1',
        title: 'Evidencia pública',
        statement: 'Descripción pública de prueba.',
        internalVerificationNote: 'No debe llegar a la proyección pública.',
      },
    ],
  },
  aboutCcv: {
    heading: 'CCV técnico',
    description: 'Descripción técnica.',
  },
  specialization: {
    heading: 'Especialización técnica',
    text: 'Texto técnico.',
  },
  analysisIntro: {
    heading: 'Análisis técnico',
    intro: 'Introducción técnica.',
    linkLabel: 'Ver análisis',
  },
  contactIntro: {
    heading: 'Contacto técnico',
    instruction: 'Instrucción técnica.',
  },
};

const siteSettingsFixture = {
  _id: 'siteSettings',
  siteName: 'CCV',
  siteDescription: 'Descripción editorial técnica.',
  siteUrl: 'https://example.com',
  defaultSeoTitle: 'Título SEO técnico',
  defaultSeoDescription: 'Descripción SEO técnica.',
  contactEmail: 'contacto@example.com',
  linkedInUrl: 'https://www.linkedin.com/company/example',
  locale: 'es-MX',
  internalNotes: 'No debe llegar a la proyección pública.',
};

const authorFixture = {
  _id: 'author-fixture',
  name: 'Autor técnico',
  slug: 'autor-tecnico',
  role: 'Rol técnico',
  shortBio: 'Biografía técnica de prueba.',
  email: 'privado@example.com',
  credentials: ['Dato interno'],
};

const categoryFixture = {
  _id: 'category-fixture',
  title: 'Categoría técnica',
  slug: 'categoria-tecnica',
  order: 0,
};

function articleFixture(id, publishedAt, overrides = {}) {
  return {
    _id: id,
    title: `Artículo ${id}`,
    slug: `articulo-${id.replaceAll('.', '-')}`,
    contentType: 'analysis',
    excerpt: 'Resumen editorial técnico.',
    author: authorFixture,
    categories: [categoryFixture],
    publishedAt,
    featured: true,
    noindex: false,
    internalNotes: 'No debe llegar a la proyección pública.',
    ...overrides,
  };
}

test('normaliza únicamente slugs públicos válidos y elimina duplicados', () => {
  assert.deepEqual(
    normalizeServiceSlugs([
      'servicio-b',
      'drafts.servicio-a',
      'servicio-a',
      'servicio-a',
      'Servicio-C',
    ]),
    ['servicio-a', 'servicio-b'],
  );
});

test('genera un parámetro técnico no publicable cuando no existen servicios', () => {
  assert.deepEqual(toServiceStaticParams([]), [{ slug: '_template' }]);
  assert.deepEqual(toServiceStaticParams(['servicio-publicado']), [
    { slug: 'servicio-publicado' },
  ]);
});

test('acepta servicios activos completos y elimina notas internas', () => {
  const service = normalizeCommercialService(activeServiceFixture);

  assert.ok(service);
  assert.equal(service.availabilityStatus, 'active');
  assert.equal('internalName' in service, false);
  assert.equal('internalNotes' in service, false);
  assert.equal('internalVerificationNote' in service.evidenceItems[0], false);
});

test('rechaza servicios retirados e incompletos', () => {
  assert.equal(
    normalizeCommercialService({
      ...activeServiceFixture,
      availabilityStatus: 'retired',
    }),
    null,
  );
  assert.equal(
    normalizeCommercialService({ ...activeServiceFixture, deliverables: [] }),
    null,
  );
});

test('aplica el H1 de seguridad y anula una referencia destacada inválida', () => {
  const home = normalizeHomePage(homeFixture);

  assert.ok(home);
  assert.equal(home.heroTitle, HOME_HERO_TITLE_FALLBACK);
  assert.equal(home.featuredService, null);
});

test('solo conserva el Servicio destacado si forma parte del mismo export', () => {
  const home = normalizeHomePage({
    ...homeFixture,
    featuredService: activeServiceFixture,
  });

  assert.ok(home?.featuredService);
  assert.equal(restrictFeaturedServiceToExport(home, []).featuredService, null);
  assert.equal(
    restrictFeaturedServiceToExport(home, [activeServiceFixture.slug])
      .featuredService?.slug,
    activeServiceFixture.slug,
  );
});

test('acepta una Home publicada válida y omite Especialización ausente', () => {
  const home = normalizeHomePage({ ...homeFixture, specialization: undefined });

  assert.ok(home);
  assert.equal(home.specialization, null);
  assert.equal(home.heroTitle, HOME_HERO_TITLE_FALLBACK);
});

test('la ausencia de Home publicada produce un resultado seguro', () => {
  assert.equal(normalizeHomePage(null), null);
  assert.equal(normalizeHomePage(undefined), null);
});

test('usa el fallback ante ausencia de configuración o fallo de lectura', async () => {
  assert.equal(await withReadFallback(async () => null, null), null);
  assert.equal(
    await withReadFallback(async () => {
      throw new Error('Fallo técnico simulado');
    }, HOME_HERO_TITLE_FALLBACK),
    HOME_HERO_TITLE_FALLBACK,
  );
});

test('excluye borradores y noindex y limita destacados a tres', () => {
  const articles = normalizeFeaturedArticles([
    articleFixture('older', '2024-01-01T00:00:00.000Z'),
    articleFixture('newest', '2025-04-01T00:00:00.000Z'),
    articleFixture('middle', '2025-03-01T00:00:00.000Z'),
    articleFixture('fourth', '2025-02-01T00:00:00.000Z'),
    articleFixture('drafts.hidden', '2025-05-01T00:00:00.000Z'),
    articleFixture('hidden', '2025-06-01T00:00:00.000Z', {
      noindex: true,
    }),
  ]);

  assert.equal(articles.length, 3);
  assert.deepEqual(
    articles.map((article) => article._id),
    ['newest', 'middle', 'fourth'],
  );
  assert.equal('internalNotes' in articles[0], false);
  assert.equal('email' in articles[0].author, false);
  assert.equal('credentials' in articles[0].author, false);
});

test('normaliza Site Settings incompleto sin inventar datos', () => {
  const settings = normalizeSiteSettings({
    _id: 'siteSettings',
    siteName: 'CCV',
    siteUrl: 'valor-inválido',
    contactEmail: 'valor-inválido',
    internalNotes: 'No debe salir.',
  });

  assert.ok(settings);
  assert.equal(settings.siteName, 'CCV');
  assert.equal(settings.siteUrl, undefined);
  assert.equal(settings.contactEmail, undefined);
  assert.equal('internalNotes' in settings, false);
});

test('solo permite indexar una Home válida con un canal de contacto publicado', () => {
  const home = normalizeHomePage(homeFixture);
  const settings = normalizeSiteSettings(siteSettingsFixture);

  assert.ok(home);
  assert.ok(settings);
  assert.deepEqual(resolveHomePublicationState(null, settings), {
    heroTitle: HOME_HERO_TITLE_FALLBACK,
    isReady: false,
    shouldIndex: false,
  });
  assert.equal(resolveHomePublicationState(home, null).shouldIndex, false);
  assert.equal(resolveHomePublicationState(home, settings).shouldIndex, true);
});

test('las proyecciones públicas excluyen campos internos', () => {
  const home = normalizeHomePage(homeFixture);
  const settings = normalizeSiteSettings(siteSettingsFixture);

  assert.ok(home?.evidence);
  assert.ok(settings);
  assert.equal('internalVerificationNote' in home.evidence.items[0], false);
  assert.equal('internalNotes' in settings, false);
  assert.equal(homePageQuery.includes('internalVerificationNote'), false);
  assert.equal(featuredArticlesQuery.includes('internalNotes'), false);
  assert.match(featuredArticlesQuery, /coalesce\(noindex, false\) == false/);
  assert.match(featuredArticlesQuery, /\[0\.\.\.3\]/);
});
