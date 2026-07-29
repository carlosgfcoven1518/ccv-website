# CCV — Manual del modelo editorial de Sanity

**Versión:** 1.0
**Estado:** base técnica de la Fase 3
**Ámbito:** Sanity Studio, Content Lake y capa mínima de lectura para la web

## 1. Propósito

Este documento define el contrato editorial de CCV en Sanity. Su objetivo es
que una persona no técnica pueda preparar, revisar y publicar artículos sin
convertir el Studio en un constructor visual de páginas.

Esta fase no conecta un proyecto real, no carga contenido, no integra las rutas
de Análisis con el diseño público y no configura despliegue, webhooks, SEO
avanzado ni tracking.

## 2. Decisiones canónicas

- Los tipos de documento son `article`, `author`, `category` y
  `siteSettings`.
- `siteSettings` usa el ID fijo `siteSettings` y se presenta como singleton.
- La solicitud de Fase 3 actualiza tres nombres del BUILD_SPEC:
  `coverImage` sustituye a `heroImage`, `updatedAt` sustituye a
  `updatedAtEditorial` y los campos SEO del artículo son planos y se agrupan
  visualmente en la pestaña SEO.
- `editorialStatus` describe el flujo interno. Los borradores y publicaciones
  reales siguen siendo los estados nativos de Sanity.
- `featured` en el artículo es la única fuente de selección de destacados. No
  se duplica con una segunda lista en `siteSettings`.
- No se crearon documentos iniciales ni fixtures dentro de Content Lake.
- La interfaz pública no consume estas queries todavía.

## 3. Estructura editorial

### 3.1 Article

| Campo             | Tipo          | Obligación y propósito                                          |
| ----------------- | ------------- | --------------------------------------------------------------- |
| `title`           | string        | Obligatorio, máximo 90 caracteres.                              |
| `slug`            | slug          | Obligatorio, derivado del título, editable antes de publicar.   |
| `contentType`     | string        | Obligatorio: `analysis`, `methodology`, `perspective` o `case`. |
| `excerpt`         | text          | Obligatorio; recomendado 140–220 y máximo 220 caracteres.       |
| `body`            | Portable Text | Obligatorio y controlado por el esquema.                        |
| `coverImage`      | image         | Opcional, con hotspot.                                          |
| `coverImageAlt`   | string        | Obligatorio cuando existe `coverImage`.                         |
| `author`          | reference     | Una referencia obligatoria a `author`.                          |
| `categories`      | references    | Una o más categorías, sin duplicados.                           |
| `publishedAt`     | datetime      | Requerido para poder publicar.                                  |
| `updatedAt`       | datetime      | Opcional; no puede ser anterior a `publishedAt`.                |
| `readingTime`     | number        | Opcional; entero positivo en minutos.                           |
| `editorialStatus` | string        | `inProgress`, `review` o `ready`.                               |
| `featured`        | boolean       | Marca editorial; máximo tres artículos publicados.              |
| `seoTitle`        | string        | Obligatorio; se recomienda un máximo de 60 caracteres.          |
| `seoDescription`  | text          | Obligatorio; se recomienda 120–160 caracteres.                  |
| `focusQuery`      | string        | Referencia editorial opcional, nunca pública por defecto.       |
| `socialImage`     | image         | Imagen social opcional con hotspot.                             |
| `canonicalUrl`    | URL           | Opcional; solo http o https.                                    |
| `noindex`         | boolean       | Control explícito de indexación, desactivado por defecto.       |
| `sources`         | objects       | Fuentes estructuradas.                                          |
| `relatedArticles` | references    | Selección manual, máximo cuatro y sin duplicados.               |
| `internalNotes`   | text          | Notas privadas; las queries públicas no las proyectan.          |

Los campos se agrupan como Contenido, Publicación, SEO, Fuentes, Relaciones y
Notas internas. Un borrador puede guardarse aunque aún tenga errores de
validación; Sanity impide publicarlo hasta resolverlos.

### 3.2 Author

| Campo         | Tipo    | Regla                                                |
| ------------- | ------- | ---------------------------------------------------- |
| `name`        | string  | Obligatorio.                                         |
| `slug`        | slug    | Obligatorio y derivado del nombre.                   |
| `role`        | string  | Obligatorio.                                         |
| `shortBio`    | text    | Obligatoria; recomendación máxima de 320 caracteres. |
| `longBio`     | text    | Opcional, reservada para futuras páginas de autor.   |
| `image`       | image   | Opcional, con hotspot.                               |
| `imageAlt`    | string  | Obligatorio cuando existe `image`.                   |
| `email`       | string  | Opcional, validado como correo.                      |
| `linkedIn`    | URL     | Opcional, solo http o https.                         |
| `credentials` | strings | Datos verificables de referencia editorial.          |

Los datos de contacto no deben publicarse por el solo hecho de existir. Cada
query o interfaz futura deberá elegirlos explícitamente.

### 3.3 Category

| Campo         | Tipo   | Regla                                             |
| ------------- | ------ | ------------------------------------------------- |
| `title`       | string | Obligatorio, máximo 80 caracteres.                |
| `slug`        | slug   | Obligatorio y derivado del título.                |
| `description` | text   | Opcional, recomendación máxima de 320 caracteres. |
| `order`       | number | Obligatorio, entero igual o mayor que cero.       |

Las categorías iniciales indicadas en el BUILD_SPEC deben cargarse manualmente
después de conectar el proyecto. No se insertan automáticamente para evitar
modificar un dataset real sin autorización.

### 3.4 Site settings

`siteSettings` es un documento único con estos campos:

- `siteName`
- `siteDescription`
- `siteUrl`
- `defaultSeoTitle`
- `defaultSeoDescription`
- `defaultSocialImage`
- `contactEmail`
- `linkedInUrl`
- `legalName`
- `locale`

Solo se inicializan valores ya aprobados: nombre de marca, posicionamiento,
dominio, correo público, LinkedIn y locale `es-MX`. El título y la descripción
SEO predeterminados se dejan para aprobación editorial. `legalName` permanece
vacío hasta contar con la denominación legal correcta.

El Studio:

- retira `siteSettings` del menú global de creación;
- abre siempre el documento con ID `siteSettings`;
- oculta las acciones de duplicar y eliminar;
- no puede impedir por sí solo que una integración externa con permisos de
  escritura cree otro documento del mismo tipo.

## 4. Portable Text controlado

`blockContent` permite únicamente:

- párrafo;
- H2;
- H3;
- cita;
- lista con viñetas;
- lista numerada;
- énfasis;
- negrita;
- enlace interno relativo o externo `http`, `https` o `mailto`;
- imagen editorial con hotspot, texto alternativo obligatorio y pie opcional.

No admite tablas, embeds arbitrarios, HTML libre, colores, tamaños manuales,
componentes comerciales ni bloques de maquetación. El pie de imagen pertenece
al objeto `editorialImage`; no es texto incrustado en el archivo.

## 5. Flujo borrador–publicación

1. Crear un artículo desde **Artículos → Todos los artículos**.
2. Completar los campos de Contenido y Relaciones.
3. Generar el slug y revisarlo antes de establecer la publicación.
4. Registrar fecha, estado editorial y, cuando corresponda, tiempo de lectura y
   destacado.
5. Completar SEO y fuentes.
6. Resolver errores de validación.
7. Publicar con la acción nativa de Sanity.

Sanity guarda cambios de borrador de forma continua. Los borradores permanecen
privados en la perspectiva publicada. Las reglas de esquema se ejecutan en
Studio y en la validación CLI, pero no validan mutaciones directas enviadas por
clientes externos; cualquier futura integración de escritura deberá replicar
las reglas críticas.

## 6. Estructura del Studio

La navegación editorial contiene:

- Artículos
  - Todos los artículos
  - Borradores
  - Publicados
  - Destacados
  - Análisis
  - Metodología
  - Perspectiva
  - Caso
- Autores
- Categorías
- Configuración del sitio

Los filtros no ofrecen botones de creación cuando el contexto no puede asignar
de forma inequívoca sus condiciones. Las previews muestran información útil
para identificar documentos sin abrirlos.

## 7. Variables de entorno

### Studio: `apps/studio/.env.local`

```dotenv
SANITY_STUDIO_PROJECT_ID=project-id-real
SANITY_STUDIO_DATASET=production
```

### Web: `apps/web/.env.local`

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=project-id-real
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

El project ID y el nombre del dataset no son secretos. Un token sí lo es:

- `SANITY_API_READ_TOKEN` solo se usa durante build/servidor;
- nunca debe llevar el prefijo `NEXT_PUBLIC_`;
- debe permanecer vacío para un dataset público;
- no se almacena en Git;
- si el dataset es privado, debe ser de solo lectura y guardarse como secreto
  del entorno de build.

La versión de API está fijada en `2026-07-28` dentro del código para mantener
consultas reproducibles.

## 8. Desarrollo local y conexión

Intervención manual requerida:

1. Crear o elegir un proyecto en Sanity.
2. Crear o confirmar el dataset editorial.
3. Copiar `apps/studio/.env.example` a `apps/studio/.env.local`.
4. Copiar `apps/web/.env.example` a `apps/web/.env.local`.
5. Sustituir los marcadores por el project ID y dataset reales.
6. Ejecutar `npm run dev:studio`.
7. Iniciar sesión cuando el CLI o el Studio lo soliciten.

La implementación no crea cuentas, proyectos, datasets, CORS, usuarios,
tokens, documentos ni despliegues.

Para validar localmente:

```bash
npm run typecheck
npm run schema:validate --workspace @ccv/studio
npm run build --workspace @ccv/studio
npm run build
```

El marcador técnico heredado `project-id-pending` solo permite compilar el
bundle local sin credenciales. No representa un proyecto real y no debe usarse
para iniciar trabajo editorial.

## 9. Capa de datos de la web

La carpeta `apps/web/lib/sanity/` contiene:

- `env.ts`: configuración pública y detección de conexión;
- `client.ts`: cliente oficial con perspectiva `published`;
- `queries.ts`: queries GROQ centralizadas;
- `types.ts`: contrato TypeScript de las proyecciones;
- `image.ts`: constructor oficial de URLs de imágenes;
- `index.ts`: API pública del módulo.

Queries disponibles:

- listado de artículos publicados;
- artículo publicado por slug;
- slugs publicados;
- hasta tres artículos destacados;
- categorías;
- autores;
- configuración global.

Las proyecciones públicas excluyen `internalNotes`, notas internas de fuentes,
`editorialStatus`, `focusQuery`, correo del autor y credenciales. Esos campos
permanecen en el Studio para el flujo editorial, pero una integración futura
deberá decidir explícitamente si alguno tiene un uso público aprobado.

`sanityFetch` exige un fallback tipado y lo devuelve sin intentar red cuando no
existe project ID. Si se configura un token privado, `client.ts` usa
`server-only` y desactiva CDN. Ningún token se incluye en las queries, tipos ni
archivos públicos.

Las rutas `/analisis/` y `/analisis/[slug]/` no importan esta capa durante la
Fase 3.

## 10. Generación estática futura

La web conserva `output: 'export'`. En una fase posterior:

1. `generateStaticParams()` ejecutará `publishedArticleSlugsQuery` durante el
   build.
2. Cada slug publicado generará una carpeta estática.
3. `articleBySlugQuery` aportará datos de la página.
4. Un artículo nuevo o actualizado requerirá un nuevo build y export.
5. Si Sanity no está configurado, el build deberá usar un conjunto vacío y no
   crear rutas reales.

La plantilla técnica `/_template` existente sigue aislada y con `noindex`.
Reemplazarla pertenece a la integración visual de Análisis, no a esta fase.

No se usarán funciones dinámicas de servidor, ISR ni APIs incompatibles con el
hosting estático de cPanel.

## 11. Imágenes

- Los campos editoriales usan hotspot para conservar el punto de interés.
- Las imágenes informativas exigen texto alternativo.
- Los captions son texto estructurado y no deben hornearse dentro de la imagen.
- La futura interfaz deberá definir ancho, calidad y proporción al llamar
  `getSanityImageBuilder`.
- El constructor devuelve `null` cuando no existe configuración de Sanity.
- No deben descargarse originales innecesariamente ni ignorarse los metadatos
  de recorte.

## 12. Límites y pendientes manuales

- Conectar el project ID y dataset reales.
- Decidir si el dataset será público o privado.
- Configurar CORS cuando exista el origen definitivo del Studio/web.
- Crear manualmente las categorías aprobadas.
- Crear y revisar el autor inicial sin inventar biografía, credenciales ni
  claims.
- Aprobar los valores de SEO predeterminados de `siteSettings`.
- Revisar permisos de editores antes de publicar contenido real.
- La comprobación de máximo tres destacados consulta el dataset desde Studio.
  Una escritura externa deberá aplicar la misma regla.
- Cambiar un slug publicado muestra una advertencia, pero la estrategia futura
  de redirecciones pertenece a una fase posterior.
- La publicación automática, webhooks y despliegue quedan fuera de alcance.

## 13. Criterios de aceptación de esta base

- [ ] Los cuatro documentos y tres objetos de esquema son válidos.
- [ ] Los campos obligatorios muestran mensajes claros en español.
- [ ] Portable Text solo ofrece el conjunto aprobado.
- [ ] `siteSettings` aparece como singleton y no puede duplicarse desde Studio.
- [ ] La estructura separa borradores, publicados, destacados y tipos.
- [ ] La web compila sin project ID ni token.
- [ ] El Studio genera un bundle local sin credenciales reales.
- [ ] Las queries usan perspectiva publicada y están centralizadas.
- [ ] No hay tokens, IDs reales ni contenido ficticio en Git.
- [ ] `/analisis/` y `/analisis/[slug]/` permanecen sin regresiones.
- [ ] ESLint, TypeScript, Prettier, build web y validación de Studio terminan
      sin errores.
