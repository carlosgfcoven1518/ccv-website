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

## Verificación

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

El build web genera el export estático en `apps/web/out/`.

## Alcance actual

La Fase 1 contiene únicamente la estructura técnica, rutas vacías, tokens
globales y configuración editorial base. El contenido, diseño visual, esquemas
editoriales y despliegue pertenecen a fases posteriores.
