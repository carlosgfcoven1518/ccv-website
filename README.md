# CCV website

Monorepo para el sitio público de CCV y su panel editorial en Sanity Studio.

## Requisitos

- Node.js 20.9 o posterior
- npm 10 o posterior

## Instalación

```bash
npm install
```

## Desarrollo local

Sitio web:

```bash
npm run dev:web
```

Sanity Studio:

```bash
npm run dev:studio
```

Antes de iniciar Studio, copia `apps/studio/.env.example` a
`apps/studio/.env.local` y agrega el ID real del proyecto y el dataset de
Sanity.

La capa de lectura de la web usa su propio archivo:

```bash
cp apps/web/.env.example apps/web/.env.local
```

El token `SANITY_API_READ_TOKEN` solo es necesario durante el build si el
dataset es privado. Nunca debe usar el prefijo `NEXT_PUBLIC_`.

## Verificación

```bash
npm run lint
npm run typecheck
npm run test:data --workspace @ccv/web
npm run format:check
npm run build
npm run schema:validate --workspace @ccv/studio
npm run build --workspace @ccv/studio
```

El build web genera el export estático en `apps/web/out/`.

La definición completa de esquemas, flujo editorial, variables y conexión está
en `docs/SANITY_EDITORIAL_MODEL_CCV_v1.0.md`.

## Alcance actual

La Fase 4A incorpora los modelos estructurados de Página de inicio y Servicios,
las proyecciones públicas seguras y la ruta estática
`/servicios/[slug]/`. La Home pública conserva su placeholder técnico y todavía
no existe un índice `/servicios/`.

Cada publicación, retiro o cambio de slug en Sanity requiere un nuevo build para
regenerar el export estático. Solo los Servicios publicados, activos y con slug
válido generan rutas. El diseño final de la Home y de las páginas comerciales,
el contenido real, la automatización de publicación y el despliegue pertenecen
a fases posteriores.
