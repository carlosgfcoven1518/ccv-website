import assert from 'node:assert/strict';
import test from 'node:test';

import {
  HOME_HERO_TITLE_FALLBACK,
  normalizeCommercialService,
  normalizeHomePage,
  normalizeServiceSlugs,
  toServiceStaticParams,
} from './normalizers.ts';

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
