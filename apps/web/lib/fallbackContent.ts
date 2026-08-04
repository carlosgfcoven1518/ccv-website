import type {
  CommercialService,
  CommercialServiceSummary,
  PublicSiteSettings,
  ServicePageMetadata,
} from './sanity/types';

export const SITE_SETTINGS_FALLBACK: PublicSiteSettings = {
  _id: 'siteSettings',
  siteName: 'CCV',
  siteDescription:
    'Dirección e integración de marketing para convertir demanda en contratos y valor comercial de largo plazo.',
  siteUrl: 'https://covenpr.com',
  defaultSeoTitle:
    'Dirección e integración de marketing para IFNBs y fintech | CCV',
  defaultSeoDescription:
    'CCV diseña y dirige estrategias integradas de adquisición multicanal para convertir demanda en contratos, colocaciones y valor comercial de largo plazo.',
  contactEmail: 'carlos@covenpr.com',
  linkedInUrl: 'https://www.linkedin.com/in/carlosgallegosflores/',
  legalName: 'Coven Creative Ventures S.A. de C.V.',
  locale: 'es-MX',
};

export const DIRECTION_SERVICE_FALLBACK: CommercialService = {
  _id: 'fallback-direction-externa-marketing',
  title: 'Dirección externa de marketing',
  slug: 'direccion-externa-de-marketing',
  cardSummary:
    'Una dirección senior para definir prioridades, coordinar equipos y agencias, controlar la inversión y relacionar la operación de marketing con resultados comerciales.',
  subtitle:
    'Una sola dirección sobre estrategia, investigación, comunicación, medios, performance, reputación y seguimiento comercial.',
  intro:
    'CCV asume la dirección de marketing de empresas que necesitan criterio senior y capacidad de ejecución, pero no requieren construir de inmediato una estructura interna completa. Definimos prioridades, coordinamos las capacidades necesarias y evaluamos el trabajo por su contribución comercial.',
  problemStatement:
    'La empresa puede contar con personal interno, agencias, proveedores, plataformas y campañas activas, y aun así operar sin una dirección común. Cada frente responde a su propio brief, presupuesto e indicador; la demanda se genera en un canal, se atiende en otro y rara vez se sigue hasta el contrato. El resultado suele ser más actividad, más coordinación para la dirección general y poca claridad sobre qué está produciendo valor.',
  audiences: [
    {
      _key: 'audience-growth',
      name: 'Empresas en crecimiento o transformación',
      description:
        'Organizaciones que necesitan ordenar su operación de marketing, profesionalizar decisiones o preparar una nueva etapa comercial.',
    },
    {
      _key: 'audience-complex',
      name: 'Negocios con adquisición compleja',
      description:
        'Empresas con varios canales, equipos, agencias o procesos de venta donde el resultado depende de coordinar el sistema completo.',
    },
    {
      _key: 'audience-financial',
      name: 'IFNBs, fintech y productos de largo plazo',
      description:
        'Organizaciones que necesitan relacionar captación, riesgo, seguimiento, colocación y valor contractual.',
    },
  ],
  contextSymptoms: [
    'Marketing produce actividad, pero la dirección no puede relacionarla con contratos, colocaciones o ingresos.',
    'Equipos internos y proveedores trabajan con prioridades, métricas y calendarios distintos.',
    'La dirección general termina coordinando decisiones tácticas que deberían resolverse dentro de marketing.',
    'La empresa invierte en canales sin una lectura integrada de adquisición, conversión y valor comercial.',
  ],
  proposal:
    'CCV establece una sola dirección sobre la operación. Partimos del objetivo comercial, diagnosticamos el sistema actual y definimos la arquitectura de trabajo: prioridades, segmentos, propuesta, presupuesto, responsabilidades, indicadores y cadencia de decisión. Dirigimos los recursos internos existentes e integramos únicamente las capacidades externas que el objetivo requiere. El cliente conserva las decisiones corporativas, financieras y comerciales que le corresponden; CCV responde por la dirección estratégica y operativa de marketing.',
  expectedBenefits: [
    {
      _key: 'benefit-direction',
      title: 'Una sola dirección',
      description:
        'Cada equipo, agencia y canal opera con prioridades compartidas y una misma definición del resultado.',
    },
    {
      _key: 'benefit-decisions',
      title: 'Mejores decisiones de inversión',
      description:
        'El presupuesto se asigna y corrige según evidencia comercial, no por inercia, presión de proveedores o métricas aisladas.',
    },
    {
      _key: 'benefit-accountability',
      title: 'Responsabilidad ejecutiva',
      description:
        'La dirección general obtiene un interlocutor senior capaz de evaluar especialidades, exigir entregables y resolver dependencias.',
    },
    {
      _key: 'benefit-measurement',
      title: 'Medición conectada con el negocio',
      description:
        'Marketing se relaciona con demanda calificada, conversión, contratos, costo de adquisición, rentabilidad y valor de vida del cliente.',
    },
  ],
  methodology:
    'La estructura se define alrededor del problema, no de un catálogo de servicios. CCV combina diagnóstico, dirección estratégica, integración de capacidades, supervisión de ejecución y medición comercial dentro de una cadencia ejecutiva continua.',
  stages: [
    {
      _key: 'stage-diagnosis',
      title: 'Diagnóstico',
      description:
        'Analizamos el negocio, el producto, la audiencia, la inversión, el proceso comercial y los resultados actuales.',
      outcome: 'Resultado: prioridades y pérdidas de valor identificadas.',
    },
    {
      _key: 'stage-strategy',
      title: 'Estrategia',
      description:
        'Definimos el problema que marketing debe resolver, los segmentos, la propuesta, el presupuesto y los indicadores.',
      outcome: 'Resultado: una dirección y un marco de decisión compartidos.',
    },
    {
      _key: 'stage-integration',
      title: 'Integración',
      description:
        'Asignamos responsabilidades y coordinamos equipos internos, agencias, medios y especialistas.',
      outcome:
        'Resultado: una operación conectada, sin capacidades redundantes.',
    },
    {
      _key: 'stage-execution',
      title: 'Ejecución y control',
      description:
        'Supervisamos el trabajo, tomamos decisiones, corregimos desviaciones y activamos las capacidades necesarias.',
      outcome:
        'Resultado: estrategia llevada al mercado con control ejecutivo.',
    },
    {
      _key: 'stage-measurement',
      title: 'Medición y optimización',
      description:
        'Relacionamos la actividad con el avance comercial y reasignamos recursos conforme aparece nueva evidencia.',
      outcome: 'Resultado: inversión optimizada contra objetivos de negocio.',
    },
  ],
  deliverables: [
    {
      _key: 'deliverable-diagnosis',
      title: 'Diagnóstico ejecutivo',
      description:
        'Lectura integrada del negocio, la operación de marketing, el proceso comercial y los principales puntos de pérdida.',
      format: 'Documento de decisión y sesión ejecutiva',
    },
    {
      _key: 'deliverable-plan',
      title: 'Dirección y plan de prioridades',
      description:
        'Objetivos, segmentos, propuesta, iniciativas, presupuesto, responsables, secuencia y criterios de decisión.',
      format: 'Plan operativo priorizado',
    },
    {
      _key: 'deliverable-governance',
      title: 'Sistema de coordinación',
      description:
        'Cadencia de trabajo, briefs, responsables, dependencias y mecanismos de revisión para equipos y proveedores.',
      format: 'Rituales y herramientas de dirección',
    },
    {
      _key: 'deliverable-dashboard',
      title: 'Dashboard comercial',
      description:
        'Indicadores y lectura ejecutiva sobre adquisición, conversión, inversión y valor comercial.',
      format: 'Seguimiento periódico',
      notes:
        'El contenido exacto depende de los datos disponibles y del modelo de negocio.',
    },
  ],
  evidenceItems: [],
  clarifications: [
    'La dirección externa no sustituye las decisiones del director general, las políticas comerciales, la evaluación de riesgo ni las responsabilidades financieras de la empresa.',
    'El alcance, la dedicación y las capacidades de ejecución se configuran de acuerdo con el problema, la operación existente y los objetivos aprobados.',
    'Los resultados dependen también de la oferta, el proceso comercial, la capacidad operativa, el presupuesto y la calidad de los datos disponibles.',
  ],
  contactInstruction:
    'Describe el objetivo comercial, la operación actual y el principal problema que necesitas resolver. Con esa información podremos determinar si una dirección externa es el punto de partida adecuado.',
  seoTitle: 'Dirección externa de marketing',
  seoDescription:
    'Dirección senior para integrar estrategia, equipos, agencias, medios y performance y conectar marketing con resultados comerciales.',
  noindex: false,
  availabilityStatus: 'active',
};

export const DIRECTION_SERVICE_SUMMARY: CommercialServiceSummary = {
  _id: DIRECTION_SERVICE_FALLBACK._id,
  title: DIRECTION_SERVICE_FALLBACK.title,
  slug: DIRECTION_SERVICE_FALLBACK.slug,
  cardSummary: DIRECTION_SERVICE_FALLBACK.cardSummary,
  audiences: DIRECTION_SERVICE_FALLBACK.audiences.map(({ _key, name }) => ({
    _key,
    name,
  })),
};

export const DIRECTION_SERVICE_METADATA: ServicePageMetadata = {
  service: {
    title: DIRECTION_SERVICE_FALLBACK.title,
    cardSummary: DIRECTION_SERVICE_FALLBACK.cardSummary,
    seoTitle: DIRECTION_SERVICE_FALLBACK.seoTitle,
    seoDescription: DIRECTION_SERVICE_FALLBACK.seoDescription,
    noindex: DIRECTION_SERVICE_FALLBACK.noindex,
  },
  settings: {
    siteName: SITE_SETTINGS_FALLBACK.siteName ?? 'CCV',
    siteUrl: SITE_SETTINGS_FALLBACK.siteUrl ?? 'https://covenpr.com',
  },
};
