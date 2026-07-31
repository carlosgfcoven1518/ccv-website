# CCV — Modelo técnico y editorial de servicios comerciales

**Documento:** `COMMERCIAL_OFFERS_MODEL_CCV_v1.0.md`  
**Versión:** 1.0  
**Estado:** Propuesta para revisión; no autoriza implementación  
**Fase:** 4 — Especificación de Home y servicios comerciales  
**Tipo de documento propuesto:** `commercialOffer`  
**Etiqueta editorial y presentación pública:** Servicio

---

## 0. Propósito, autoridad y alcance

Este documento especifica un modelo estructurado para crear, revisar, publicar y
mantener servicios comerciales de CCV con una sola plantilla de página. No implementa
el schema, las queries, la ruta ni la interfaz.

### 0.1 Fuentes

- `docs/CODEX_BUILD_SPEC_CCV_v1.0.md`;
- `docs/DESIGN_SYSTEM_TECHNICAL_MANUAL_CCV_v1.0.md`;
- `docs/SANITY_EDITORIAL_MODEL_CCV_v1.0.md`;
- schemas, estructura, cliente y queries actuales de Sanity;
- rutas, componentes y configuración de exportación estática actuales;
- decisiones aprobadas para la Fase 4.

### 0.2 Clasificación

- **[Aprobado]**: requisito vinculante.
- **[Recomendación]**: solución técnica o editorial propuesta.
- **[Pendiente]**: decisión que necesita aprobación antes de implementar o publicar.

Las referencias “Validación de conceptos de nuevos productos” y “Auditoría de
adquisición y conversión” solo ilustran el tipo de servicio que el sistema debe admitir.
No son documentos, slugs, titulares ni contenido definitivo.

### 0.3 Restricciones de alcance

- Una sola plantilla comercial robusta.
- Sin page builder, HTML libre ni composición visual elegida desde el CMS.
- Sin contenido, claims, casos, métricas o imágenes ficticios.
- Sin modificación en esta tarea de schemas, queries, rutas, componentes, estilos,
  dependencias, variables de entorno o despliegue.

---

## A. Propósito del tipo de documento

`commercialOffer` es el nombre técnico. En Studio y en el sitio se presenta como
**Servicio** y debe permitir que una persona no técnica:

- cree un servicio sin programar una página;
- separe nombre interno de título público;
- articule problema, audiencia, propuesta, método, entregables y límites;
- agregue evidencia verificable sin convertir beneficios esperados en garantías;
- prepare imagen y metadata;
- revise, publique, destaque, retire y actualice un servicio;
- conserve una URL estable mientras el servicio siga publicado.

**[Aprobado]** Cada documento publicado genera una página independiente. Quitar una
servicio de la Home no lo despublica ni elimina su URL.

**[Aprobado]** Se conserva `commercialOffer` como identificador técnico para no romper
la nomenclatura prevista. “Servicio” es la única etiqueta editorial y pública.

---

## B. Principios del modelo

1. **Estructura antes que libertad visual.** El editor completa campos con función
   conocida; la plantilla decide orden y presentación.
2. **Una fuente de verdad.** Home referencia un Servicio. No copia su título, resumen,
   imagen o slug.
3. **Publicación nativa.** Draft/published de Sanity define si existe una revisión
   publicada. Un campo editorial complementa el flujo, pero no reemplaza el mecanismo
   nativo.
4. **Disponibilidad separada.** “Activa” o “retirada” describe vigencia comercial, no
   si existe un documento publicado.
5. **Destacado es una relación.** La Home selecciona un servicio; no se mantiene un
   booleano paralelo.
6. **Evidencia controlada.** Una afirmación cuantitativa o de cliente necesita una
   fuente y aprobación.
7. **Omisión limpia.** Un campo opcional vacío elimina su bloque; nunca produce
   placeholder público.
8. **URL estable.** Actualizar contenido no cambia el slug automáticamente.
9. **Una plantilla.** Crear otro servicio reutiliza el schema y la plantilla, no código
   ni layouts.
10. **Exportación estática.** Solo se generan en build los slugs publicados que cumplan
    la política pública.

---

## C. Campos propuestos

### C.1 Convenciones de validación

- Las longitudes recomendadas orientan al editor y no bloquean por sí solas.
- Son errores estrictos: ausencia de campos obligatorios, slug inválido o duplicado,
  arrays por encima de su máximo, elementos vacíos y longitudes que puedan romper el
  layout.
- Son advertencias editoriales: apartarse del rango recomendado de subtítulos,
  introducciones y textos comerciales sin superar el máximo técnico.
- Los mensajes de error deben estar en español y explicar cómo corregir el problema.
- `Rule.required()` y reglas de longitud deben aplicarse en Studio.
- Las referencias deben filtrar tipos y excluir el documento actual cuando
  corresponda.
- Los arrays deben impedir elementos vacíos y, donde sea útil, duplicados.
- Las validaciones de schema ayudan al editor, pero no protegen mutaciones directas por
  API. La futura capa de build debe validar datos públicos críticos.
- Los campos obligatorios pueden existir incompletos en un borrador, pero la
  publicación debe mostrar errores claros.

### C.2 Identificación interna

| Nombre técnico  | Etiqueta editorial | Tipo                   | Obligación  | Límite recomendado      | Validación                                                                                           | Ayuda para el editor                                                 | Si está vacío       |
| --------------- | ------------------ | ---------------------- | ----------- | ----------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------- |
| `internalName`  | Nombre interno     | `string`               | Obligatorio | Recomendado 3–100       | Error si falta; máximo técnico 120                                                                   | Nombre operativo para distinguir versiones; no se muestra al público | Impide publicar     |
| `slug`          | Slug               | `slug`, source `title` | Obligatorio | Máximo 96 caracteres    | Minúsculas, sin acentos, guiones simples, unicidad por tipo; no regenerar al editar título publicado | Parte estable de la URL; revísala antes de publicar                  | No se genera página |
| `internalNotes` | Notas internas     | `text`, 4 filas        | Opcional    | Máximo 2,000 caracteres | Máximo y trim                                                                                        | Contexto de trabajo; nunca se proyecta al frontend                   | No ocurre nada      |

**[Recomendación]** La fuente inicial de slug es `title`, no `internalName`. Una vez
publicado el servicio, cambiar el título no debe alterar el slug sin una decisión
explícita y un plan de redirección.

### C.3 Contenido visible

| Nombre técnico | Etiqueta editorial    | Tipo            | Obligación            | Límite recomendado              | Validación                                               | Ayuda para el editor                                                             | Si está vacío                     |
| -------------- | --------------------- | --------------- | --------------------- | ------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| `title`        | Título principal      | `string`        | Obligatorio           | Recomendado 20–90               | Error si falta o supera 100; advertencia fuera del rango | Será el H1 de la página y el nombre visible del servicio                         | Impide publicar                   |
| `subtitle`     | Subtítulo             | `text`, 3 filas | Recomendado; opcional | Recomendado 80–220; máximo 260  | Error sobre 260; advertencia fuera del rango             | Explica alcance o resultado esperado sin repetir el título ni prometer garantías | Hero usa título e introducción    |
| `cardSummary`  | Resumen para tarjetas | `text`, 3 filas | Obligatorio           | Recomendado 120–220; máximo 240 | Error si falta o supera 240; advertencia fuera del rango | Versión autónoma para Home e índices                                             | No puede destacarse ni publicarse |
| `intro`        | Introducción          | `text`, 5 filas | Obligatorio           | Recomendado 200–600; máximo 800 | Error si falta o supera 800; advertencia fuera del rango | Abre la página y sitúa el servicio antes de las secciones detalladas             | Impide publicar                   |

El título y subtítulo son copy editorial; no deben admitir estilos manuales, saltos
forzados ni texto enriquecido.

### C.4 Argumentación comercial

| Nombre técnico     | Etiqueta editorial                | Tipo                      | Obligación  | Límite recomendado                  | Validación                                                 | Ayuda para el editor                                                           | Si está vacío                                                    |
| ------------------ | --------------------------------- | ------------------------- | ----------- | ----------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `problemStatement` | Problema que resuelve             | `text`, 6 filas           | Obligatorio | Recomendado 200–900; máximo 1,000   | Error si falta o supera 1,000; advertencia fuera del rango | Describe la decisión o fricción comercial; no una lista de servicios           | Impide publicar                                                  |
| `audiences`        | Audiencia                         | `array` de `audienceItem` | Obligatorio | 1–5 elementos                       | Únicos; cada nombre ≤80 y descripción ≤240                 | Define para quién es pertinente sin afirmar exclusividad                       | Impide publicar                                                  |
| `contextSymptoms`  | Contexto o síntomas               | `array` de `string`       | Opcional    | 2–6 elementos; ≤180 cada uno        | Sin vacíos ni duplicados                                   | Señales observables que ayudan a reconocerse; no diagnosticar sin base         | Se omite la lista                                                |
| `proposal`         | Propuesta                         | `text`, 6 filas           | Obligatorio | Recomendado 250–1,000; máximo 1,200 | Error si falta o supera 1,200; advertencia fuera del rango | Explica qué hará posible el servicio y su diferencia; no duplicar metodología  | Impide publicar                                                  |
| `expectedBenefits` | Resultados o beneficios esperados | `array` de `benefitItem`  | Obligatorio | 1–6 elementos                       | Error si falta, excede 6 o contiene elementos vacíos       | Formular resultados esperados, no garantías; cualquier cifra requiere revisión | Impide publicar                                                  |
| `clarifications`   | Aclaraciones y límites            | `array` de `string`       | Condicional | 1–6 elementos; ≤280 cada uno        | Sin vacíos ni duplicados                                   | Aclara dependencias, exclusiones y condiciones relevantes                      | Se omite; es error editorial si una afirmación necesita contexto |

#### Objetos auxiliares

`audienceItem`:

- `name`: obligatorio, máximo 80 caracteres;
- `description`: obligatorio, máximo 240 caracteres.

`benefitItem`:

- `title`: obligatorio, máximo 80 caracteres;
- `description`: obligatorio, máximo 280 caracteres;

No se incluye `evidenceReference` en V1. Beneficios y evidencias no tienen referencias
cruzadas internas.

**[Recomendación]** No incluir un campo genérico “claim”. Las afirmaciones pertenecen
al contexto de problema, propuesta, beneficio o evidencia y deben validarse allí.

### C.5 Metodología

| Nombre técnico | Etiqueta editorial | Tipo                   | Obligación  | Límite recomendado                | Validación                                             | Ayuda para el editor                                                | Si está vacío   |
| -------------- | ------------------ | ---------------------- | ----------- | --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- | --------------- |
| `methodology`  | Metodología        | `text`, 4 filas        | Obligatorio | Recomendado hasta 500; máximo 700 | Error si falta o supera 700; advertencia sobre 500     | Explica el criterio que conecta las etapas                          | Impide publicar |
| `stages`       | Etapas             | `array` de `stageItem` | Obligatorio | 2–6 elementos                     | Error si falta, excede 6 o contiene etapas incompletas | Describe una secuencia comprensible, no tareas internas exhaustivas | Impide publicar |

`stageItem`:

- `title`: obligatorio, máximo 80 caracteres;
- `description`: obligatorio, máximo 500 caracteres;
- `outcome`: opcional, máximo 240 caracteres;
- `_key`: utilizado por Sanity; el orden del array es el orden público.

No debe incluir selector de icono, color, columnas, orientación ni tipo de animación.

### C.6 Entregables

| Nombre técnico | Etiqueta editorial | Tipo                         | Obligación  | Límite recomendado | Validación                                 | Ayuda para el editor                                          | Si está vacío   |
| -------------- | ------------------ | ---------------------------- | ----------- | ------------------ | ------------------------------------------ | ------------------------------------------------------------- | --------------- |
| `deliverables` | Entregables        | `array` de `deliverableItem` | Obligatorio | 1–8 elementos      | Título ≤80; descripción 40–320; sin vacíos | Nombra resultados concretos del trabajo, no actividades vagas | Impide publicar |

`deliverableItem`:

- `title`: obligatorio, máximo 80 caracteres;
- `description`: obligatorio, máximo 320 caracteres;
- `format`: opcional, máximo 80 caracteres, solo si aporta claridad;
- `notes`: opcional, máximo 240 caracteres, público y no contractual.

No se debe inferir calendario, precio o volumen si no existe información aprobada.

### C.7 Evidencia

El modelo V1 evita taxonomías y referencias internas complejas.

| Nombre técnico  | Etiqueta editorial   | Tipo                      | Obligación | Límite recomendado | Validación                                                    | Ayuda para el editor                                     | Si está vacío            |
| --------------- | -------------------- | ------------------------- | ---------- | ------------------ | ------------------------------------------------------------- | -------------------------------------------------------- | ------------------------ |
| `evidenceItems` | Evidencia disponible | `array` de `evidenceItem` | Opcional   | 1–6 elementos      | Error sobre 6 o si un elemento carece de título o descripción | Solo evidencia verificable y autorizada para publicación | Se omite toda la sección |

`evidenceItem` debe ser un objeto controlado:

| Campo                      | Etiqueta editorial       | Tipo     | Requisito            | Regla                                                                 |
| -------------------------- | ------------------------ | -------- | -------------------- | --------------------------------------------------------------------- |
| `title`                    | Título                   | `string` | Obligatorio          | Error si falta o supera 100 caracteres                                |
| `statement`                | Afirmación o descripción | `text`   | Obligatorio          | Recomendado 80–500; error si falta o supera 700                       |
| `sourceLabel`              | Fuente pública           | `string` | Opcional/condicional | Máximo 120; requerida editorialmente si se publica una fuente externa |
| `sourceUrl`                | URL pública              | `url`    | Opcional/condicional | Solo `https`; debe corresponder a la fuente indicada                  |
| `internalVerificationNote` | Nota interna de revisión | `text`   | Opcional/condicional | Máximo 1,000; requerida para cifras sin fuente pública; nunca pública |

Reglas:

- no crear métricas, clientes, testimonios o casos no aprobados;
- no mezclar beneficios esperados con resultados ya obtenidos;
- toda cifra o claim verificable requiere revisión humana antes de publicar;
- no se construye en V1 un sistema complejo de aprobación;
- si una fuente no puede hacerse pública, el equipo debe aprobar la formulación antes
  de publicar;
- `internalVerificationNote` nunca llega al frontend.
- no existen referencias cruzadas entre beneficios y evidencias.

### C.8 Imagen

| Nombre técnico | Etiqueta editorial | Tipo                | Obligación  | Límite recomendado                                | Validación                                | Ayuda para el editor                              | Si está vacío                             |
| -------------- | ------------------ | ------------------- | ----------- | ------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| `heroImage`    | Imagen principal   | `image` con hotspot | Opcional    | Fuente suficiente para 1,920px cuando sea posible | Solo asset válido; crop/hotspot editorial | Imagen para Hero y tarjeta de servicio            | Plantilla textual; Home no muestra imagen |
| `heroImageAlt` | Texto alternativo  | `string`            | Condicional | Máximo 180 caracteres                             | Error si hay imagen sin alt o supera 180  | Describe contenido o función; no repite el título | Error si existe imagen                    |

En V1 toda imagen cargada en este campo se trata como informativa y requiere alt.
`socialImage` independiente y `heroImageDecorative` quedan pospuestos.

### C.9 Contacto

| Nombre técnico       | Etiqueta editorial      | Tipo            | Obligación | Límite recomendado             | Validación                                   | Ayuda para el editor                                                                    | Si está vacío                      |
| -------------------- | ----------------------- | --------------- | ---------- | ------------------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------- |
| `contactInstruction` | Instrucción de contacto | `text`, 3 filas | Opcional   | Recomendado 80–240; máximo 280 | Error sobre 280; advertencia fuera del rango | Explica la siguiente acción para este servicio; no incluye datos ni urgencia artificial | Usa la instrucción global aprobada |

Correo y LinkedIn deben provenir de `siteSettings`. El servicio no debe duplicarlos ni
permitir direcciones alternativas sin una necesidad aprobada.

### C.10 SEO

| Nombre técnico   | Etiqueta editorial | Tipo            | Obligación                | Límite recomendado              | Validación                                   | Ayuda para el editor                                             | Si está vacío     |
| ---------------- | ------------------ | --------------- | ------------------------- | ------------------------------- | -------------------------------------------- | ---------------------------------------------------------------- | ----------------- |
| `seoTitle`       | Título SEO         | `string`        | Opcional con fallback     | Recomendado 30–60; máximo 65    | Error sobre 65; advertencia fuera del rango  | Personaliza el título si mejora el fallback                      | Usa `title`       |
| `seoDescription` | Descripción SEO    | `text`, 3 filas | Opcional con fallback     | Recomendado 120–160; máximo 170 | Error sobre 170; advertencia fuera del rango | Personaliza la descripción sin duplicar trabajo innecesariamente | Usa `cardSummary` |
| `noindex`        | No indexar         | `boolean`       | Opcional; default `false` | N/A                             | Booleano                                     | Excluye de indexación sin convertir el servicio en privado       | Página indexable  |

La canonical propia se calcula con `siteSettings.siteUrl`, `/servicios/` y el slug.
`canonicalUrl` externo queda pospuesto hasta existir una necesidad comprobable. La
imagen social utiliza el default aprobado de Site Settings.

### C.11 Publicación y vigencia

| Nombre técnico       | Etiqueta editorial   | Tipo            | Obligación                   | Valores             | Validación                      | Ayuda para el editor                                        | Si está vacío            |
| -------------------- | -------------------- | --------------- | ---------------------------- | ------------------- | ------------------------------- | ----------------------------------------------------------- | ------------------------ |
| Estado nativo        | Borrador / Publicado | Revisión Sanity | Obligatorio operacionalmente | Nativo              | Acción nativa Publish/Unpublish | Define si existe una revisión publicada                     | El documento es borrador |
| `availabilityStatus` | Vigencia comercial   | `string` enum   | Obligatorio                  | `active`, `retired` | Lista cerrada; default `active` | Indica si el servicio sigue vigente sin borrar su historial | Error de publicación     |

La proyección pública de Home e índices exige revisión publicada y
`availabilityStatus == "active"`.

`editorialStatus` existe actualmente en Article, pero no es una convención transversal
obligatoria del proyecto; no se incorpora a Servicio V1. Tampoco se requieren
`publishedAt` ni `updatedAt` manuales. Se utilizan `_createdAt` y `_updatedAt` nativos
de Sanity cuando una necesidad técnica o editorial requiera fechas.

La política de páginas retiradas se define en la sección G.

### C.12 Relación con Home

No se propone `featured: boolean`. La posibilidad de ser seleccionado como destacado
se materializa mediante la única referencia opcional `homePage.featuredService`.

Un servicio es seleccionable cuando:

- tiene revisión publicada;
- está activa;
- tiene slug, título, card summary y campos públicos mínimos válidos.

**[Recomendación]** Studio puede mostrar una validación informativa o un badge
calculado si un servicio está referenciado por Home, pero no almacenar un segundo
estado.

`relatedOffers` y `relatedArticles` quedan pospuestos para una versión futura con
suficiente contenido publicado.

---

## D. Orden editorial del Studio

### D.1 Grupos propuestos

1. Identificación interna.
2. Contenido visible.
3. Problema y audiencia.
4. Propuesta y beneficios.
5. Metodología.
6. Entregables.
7. Evidencia y límites.
8. Imagen.
9. Contacto.
10. SEO.
11. Vigencia comercial.
12. Notas internas.

### D.2 Preview

- Título: `internalName` o, como fallback, `title`.
- Subtítulo: combinación legible del estado nativo y `availabilityStatus`.
- Media: `heroImage`.
- Badges informativos: borrador/publicado, activo/retirado y destacado calculado.

### D.3 Navegación editorial

**[Recomendación]** Añadir un grupo “Servicios” con vistas iniciales:

- Todas;
- Publicados activos;
- Retirados.

No crear documentos separados para cada vista. Son filtros del mismo tipo. Las seis
vistas editoriales y los estados de revisión adicionales quedan pospuestos hasta que
el volumen de contenido los justifique.

---

## E. Página comercial generada

### E.1 Ruta y plantilla

- Una única ruta dinámica y una única plantilla.
- **[Aprobado]** Ruta: `/servicios/[slug]/`.
- Server Component por defecto.
- `dynamicParams = false`.
- `generateStaticParams()` obtiene slugs públicos durante el build.
- No debe existir fetch en tiempo de solicitud ni ruta dinámica incompatible con
  `output: "export"`.

### E.2 Arquitectura fija

| Orden | Sección      | Campos                                                    | Requisito y fallback                                                                  |
| ----: | ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
|     1 | Hero         | `title`, `subtitle`, `intro`, `heroImage`, `heroImageAlt` | Título/intro obligatorios; imagen y subtítulo se omiten limpiamente                   |
|     2 | Problema     | `problemStatement`, `audiences`, `contextSymptoms`        | Problema/audiencia obligatorios; síntomas opcionales                                  |
|     3 | Propuesta    | `proposal`, `expectedBenefits`                            | Obligatoria                                                                           |
|     4 | Metodología  | `methodology`, `stages`                                   | Metodología y etapas obligatorias                                                     |
|     5 | Entregables  | `deliverables`                                            | Obligatoria                                                                           |
|     6 | Evidencia    | `evidenceItems`                                           | Sección completa opcional; nunca placeholder                                          |
|     7 | Aclaraciones | `clarifications`                                          | Sección opcional; obligatoria editorialmente cuando evite una interpretación engañosa |
|     8 | Contacto     | `contactInstruction` + Site Settings                      | Usa instrucción global si falta; requiere al menos un canal global                    |

La plantilla controla:

- orden;
- heading levels;
- componentes;
- tonos, fondos y espaciado;
- número de columnas;
- proporciones de imagen;
- motion;
- fallbacks;
- metadata y datos estructurados.

Sanity no controla ninguno de esos aspectos.

### E.3 Responsive

- Móvil: una columna y orden igual al DOM.
- Tablet: dos zonas solo cuando la medida de lectura se conserve.
- Desktop: retícula de doce columnas y asimetría editorial.
- No convertir arrays en carruseles.
- Etapas conservan orden explícito en cualquier viewport.
- Imagen del Hero sigue al texto en móvil.
- Touch targets mínimos de `44 × 44px`.

### E.4 SEO

- Un H1 con `title`.
- H2 para secciones principales y H3 para elementos internos.
- Metadata desde los campos SEO personalizados o sus fallbacks controlados.
- Imagen Open Graph desde el default aprobado de Site Settings en V1.
- `noindex` controla robots sin retirar la URL.
- JSON-LD recomendado: `Service` solo con propiedades verificables, `BreadcrumbList`
  y referencia a la `Organization` global.
- No añadir precio, rating, proveedor, área servida, testimonios ni resultados si no
  existen y son visibles.
- Contenido completo y enlaces presentes en HTML inicial.
- La canonical se calcula con `/servicios/[slug]/`.

**[Pendiente]** Aprobar el tipo y propiedades exactas de datos estructurados después de
definir información legal y comercial verificable.

### E.5 Accesibilidad

- Landmarks y headings semánticos.
- Alt condicional correcto.
- Etapas, entregables y audiencias como listas reales cuando corresponda.
- Enlaces con destino comprensible y focus visible.
- Reduced motion según el Design System.
- Contraste WCAG 2.2 AA.
- No comunicar disponibilidad solo por color.
- Un servicio retirado necesita texto visible aprobado que explique su estado si la URL
  se conserva.

---

## F. URLs

### F.1 Ruta base

**[Aprobado]** `/servicios/[slug]/`.

Razones:

- describe con precisión el tipo editorial;
- evita presentar el sitio como catálogo táctico de “servicios”;
- admite servicios temporales y permanentes bajo la misma plantilla;
- es estable y comprensible en español.

Ejemplos de estructura, no contenido publicado:

- `/servicios/validacion-de-conceptos-de-nuevos-productos/`;
- `/servicios/auditoria-de-adquisicion-y-conversion/`.

La futura ruta `/servicios/` queda prevista, pero no se construye en V1. Se recomienda
crearla cuando existan al menos dos servicios permanentes publicados.

### F.2 Reglas de slug

- generado inicialmente desde `title`;
- minúsculas;
- transliteración de acentos;
- palabras separadas por un solo guion;
- sin caracteres reservados ni guion inicial/final;
- máximo 96 caracteres;
- único entre documentos `commercialOffer`;
- no reutilizar slugs de servicios retirados;
- edición manual permitida antes de primera publicación;
- después de publicar, cambio deliberado con advertencia y plan de redirección.

La validación de slug de Sanity es única por tipo y path de campo de forma
predeterminada. Si se personaliza `isUnique` o `slugify`, debe conservarse esa
garantía.

### F.3 Prevención de duplicados

- Validación asíncrona de unicidad con el contexto de Sanity.
- Query pública defensiva que no acepte más de un resultado por slug.
- Control de release que reporte slugs faltantes o repetidos.
- No resolver colisiones por orden arbitrario.

### F.4 Redirecciones futuras

V1 documenta la política, pero no implementa una infraestructura completa:

- Mantener un registro versionado o editorial `from → to` cuando se autoricen cambios
  de slug.
- Validar que no haya ciclos, destinos inexistentes ni cadenas innecesarias.
- En hosting estático, materializar reglas compatibles con el servidor/cPanel o
  archivos HTML de redirección según la infraestructura aprobada.
- No implementar redirecciones de cliente como solución SEO principal.
- No borrar un slug antiguo hasta que la redirección esté verificada.

### F.5 Exportación estática

Durante el build:

1. leer configuración pública de Sanity;
2. consultar slugs de revisiones publicadas;
3. devolverlos desde `generateStaticParams`;
4. generar un HTML por slug;
5. calcular metadata e imagen desde la misma proyección;
6. exportar bajo `out/servicios/<slug>/index.html`.

Home y el futuro índice filtran `availabilityStatus == "active"`. La generación de
slugs incluye por defecto los servicios retirados que sigan publicados, por lo que su
URL no desaparece automáticamente. Despublicar produce `404` en el siguiente build;
`410` y `301` requieren una decisión y configuración manual posterior.

Sin credenciales:

- no usar token privado;
- si no hay Project ID/dataset, devolver `[]` de manera predecible;
- el build técnico puede terminar sin páginas de servicio;
- un release de producción debe fallar su comprobación editorial si esperaba servicios
  y no recibió datos.

La publicación o actualización en Sanity no cambia el sitio exportado hasta ejecutar
un nuevo build y desplegar sus archivos.

---

## G. Estados editoriales y comportamiento de URL

### G.1 Matriz de estados

| Estado compuesto              | Índices futuros | Home | URL después del siguiente build    | Indexación                   |
| ----------------------------- | --------------- | ---- | ---------------------------------- | ---------------------------- |
| Borrador nativo               | No              | No   | No se genera                       | No aplica                    |
| Publicado activo destacado    | Sí              | Sí   | Se genera y permanece              | Según `noindex`              |
| Publicado activo no destacado | Sí              | No   | Se genera y permanece              | Según `noindex`              |
| Publicado + `retired`         | No              | No   | No se elimina de manera automática | Decisión caso por caso       |
| Despublicado                  | No              | No   | Se elimina en el siguiente build   | Devuelve 404 sin redirección |

### G.2 Draft y publicación

- Sanity conserva borradores y revisiones publicadas de manera nativa.
- `availabilityStatus` expresa vigencia comercial, no sustituye Publish.
- Studio debe advertir si se intenta publicar sin campos obligatorios.

### G.3 Destacada y no destacada

- No son valores almacenados en Servicio.
- “Destacado” significa que el singleton Home referencia ese servicio.
- Cambiar la referencia no modifica el documento de Servicio ni su URL.
- Como solo existe un campo de referencia, la Home no puede destacar más de un servicio
  simultáneamente.

### G.4 Retiro o archivo

**[Recomendación]** Conservar `availabilityStatus: "retired"` como estado explícito.
Esto permite retirar el servicio de Home e índices sin borrar inmediatamente el
documento ni perder contexto editorial.

Política recomendada:

1. deja de aparecer en Home, navegación e índices;
2. su URL no se elimina automáticamente;
3. si existe un sustituto equivalente, se prepara una redirección permanente;
4. si no existe sustituto, conservar la página, responder `404` o responder `410` se
   decide caso por caso;
5. la decisión considera enlaces existentes, tráfico, obligaciones comerciales y
   capacidad del hosting.

V1 no implementa infraestructura completa de redirecciones. La política debe aplicarse
manualmente cuando se retire el primer servicio.

---

## H. Servicios permanentes

- Un servicio activo puede permanecer publicado indefinidamente.
- Actualizar texto, imagen, evidencia o metadata no cambia su URL.
- `_updatedAt` nativo registra cambios técnicos; no se exige una fecha manual.
- La futura navegación puede referenciar servicios elegidos, no enumerarlos
  automáticamente.
- El futuro índice `/servicios/` puede consultar todos los servicios activos
  publicados cuando existan al menos dos permanentes.
- Las relaciones con artículos u otros servicios quedan pospuestas.
- La condición “permanente” no requiere una plantilla diferente.

**[Recomendación]** No añadir todavía un booleano `permanent`. La permanencia es el
resultado de mantener un servicio activo y publicado. Si en el futuro la navegación
necesita curaduría específica, debe modelarse cuando exista esa necesidad.

---

## I. Duplicación editorial

Sanity Studio incluye una acción de documento para duplicar tipos ordinarios. V1 no
personaliza esa acción.

### I.1 Requisito

- Duplicar un servicio puede servir como punto de partida en una versión futura.
- La copia es otro documento del mismo tipo y usa la misma plantilla.
- Nunca se duplica código, ruta ni schema.
- La copia no puede publicarse con el slug de la original.

### I.2 Alcance V1

- no implementar una acción Duplicate personalizada;
- mantener unicidad estricta de slug como defensa;
- crear servicios nuevos mediante el flujo normal de Studio;
- evaluar una duplicación segura solo cuando el volumen editorial justifique la
  automatización;
- cuando se implemente, deberá limpiar al menos slug y estado de publicación y exigir
  nueva revisión de evidencia.

---

## J. Límites del sistema

No permitir:

- arrays de “secciones” reordenables;
- bloques de layout o columnas;
- HTML libre;
- JavaScript o embeds arbitrarios;
- colores, tipografías, tamaños o espaciado manuales;
- selección de fondo, card style, sombras o radios;
- controles de parallax o animación por servicio;
- botones comerciales configurables;
- componentes de marketing;
- tablas complejas;
- duplicación de correo, LinkedIn o identidad global;
- escritura manual de la URL interna completa;
- una plantilla elegida por documento;
- contenido oculto para SEO;
- publicación de afirmaciones no verificadas.

Portable Text, si se utiliza en algún campo futuro, debe reutilizar el conjunto
controlado existente y limitarse a contenido que realmente necesite estructura. Los
campos principales del servicio deben permanecer tipados para conservar consistencia.

---

## K. Impacto previsto sobre schemas y queries existentes

Esta sección describe impacto futuro; no autoriza cambios en esta tarea.

### K.1 Studio

Cambios previstos:

- añadir `commercialOffer` a `schemaTypes`;
- añadir objetos auxiliares tipados para audiencia, beneficios, etapas, entregables y
  evidencia;
- añadir un singleton `homePage`;
- incorporar `commercialOffer` a la estructura editorial;
- añadir filtros mínimos de Servicios por publicación y vigencia;
- conservar Article, Author, Category, Site Settings y Portable Text sin reemplazo;
- no personalizar Duplicate en V1;
- conservar Site Settings como singleton.

No se debe:

- regenerar schemas actuales;
- mover campos globales de Site Settings a Servicio;
- alterar `blockContent` para convertirlo en constructor de páginas;
- introducir credenciales o tokens.

### K.2 Queries

Queries nuevas recomendadas:

- `publishedServiceSlugsQuery`;
- `publishedServicesQuery`;
- `serviceBySlugQuery`;
- `featuredServiceForHomeQuery`, preferentemente integrada en la proyección Home;
- `homePageQuery`;
- una query de servicios retirados solo cuando la política de una URL concreta lo
  necesite.

Filtros públicos mínimos:

- tipo correcto;
- revisión publicada;
- slug definido;
- `availabilityStatus == "active"` para Home e índices;
- servicios retirados todavía publicados para conservar su página cuando corresponda;
- exclusión defensiva de campos internos.

Proyecciones públicas:

- no incluir `internalName`, `internalNotes` ni `internalVerificationNote`;
- resolver referencias solo hasta la profundidad necesaria;
- proyectar asset, crop y hotspot requeridos por la utilidad de imagen;
- evitar `...` indiscriminado.

### K.3 Tipos

- Añadir tipos TypeScript explícitos para Servicio, objetos internos, resumen de tarjeta
  y proyección Home.
- Reutilizar tipos Sanity comunes donde sea seguro.
- Modelar opcionales como `null | undefined` según la respuesta real.
- No usar `any`.
- Validar en runtime las condiciones críticas del build aunque TypeScript compile.

### K.4 Cliente e imágenes

- Reutilizar el cliente server-only existente.
- Reutilizar `sanityImageUrl`.
- No exponer token de lectura al navegador.
- Mantener la misma configuración Project ID/dataset en Studio y web.
- Continuar con `perspective: "published"` para el sitio público.

### K.5 Rutas actuales

- No sustituir ni modificar `/analisis/` o `/analisis/[slug]/`.
- Añadir en una implementación futura `/servicios/[slug]/`.
- Prever `/servicios/`, sin construirlo todavía. Se recomienda implementarlo cuando
  existan al menos dos servicios permanentes publicados.
- Mantener las rutas actuales sin regresiones y `output: "export"`.

---

## L. Criterios de aceptación

### L.1 Schema y experiencia editorial

- [ ] Existe un único tipo `commercialOffer`.
- [ ] Su etiqueta editorial y presentación pública es Servicio.
- [ ] Los grupos y campos siguen el orden editorial definido.
- [ ] Campos obligatorios muestran mensajes comprensibles en español.
- [ ] Errores estrictos y advertencias editoriales están diferenciados.
- [ ] Slug se deriva inicialmente del título, es único y no cambia automáticamente.
- [ ] Imagen informativa exige alt.
- [ ] Campos internos no aparecen en proyecciones públicas.
- [ ] Site Settings sigue siendo fuente de correo, LinkedIn e identidad.
- [ ] No existe page builder, HTML libre ni selección visual.
- [ ] Studio muestra previews y estados útiles.

### L.2 Contenido y evidencia

- [ ] Problema, audiencia, propuesta, etapas, entregables y beneficios están
      estructurados.
- [ ] Los campos opcionales se omiten sin placeholders.
- [ ] Cifras y claims requieren verificación.
- [ ] Evidencia V1 se limita a título, descripción, fuente/URL opcionales y nota
      interna condicional.
- [ ] No existen referencias cruzadas entre beneficios y evidencia.
- [ ] Beneficios esperados no se presentan como resultados obtenidos.
- [ ] No hay contenido, clientes, métricas ni imágenes ficticios.

### L.3 Publicación, destaque y retiro

- [ ] Draft/published nativo sigue siendo la autoridad de revisión.
- [ ] Solo servicios publicados y activos entran en Home o índices.
- [ ] No existe `editorialStatus` en Servicio V1.
- [ ] No se requieren `publishedAt` ni `updatedAt` manuales.
- [ ] Home referencia un Servicio; no duplica contenido ni estado.
- [ ] Quitar el destaque conserva la URL publicada.
- [ ] Un servicio retirado sale de Home, navegación e índices sin eliminar
      automáticamente su URL.
- [ ] La acción Duplicate personalizada no forma parte de V1.

### L.4 Página y Design System

- [ ] Una sola plantilla renderiza todos los servicios.
- [ ] Un H1 y jerarquía H2/H3 correcta.
- [ ] Componentes y tokens existentes; sin dependencia visual nueva.
- [ ] Responsive desde `320px` y orden semántico igual al DOM.
- [ ] Focus, teclado, contraste, alt y reduced motion cumplen WCAG 2.2 AA.
- [ ] No hay formularios ni botones comerciales genéricos.

### L.5 SEO y URLs

- [ ] La ruta pública es `/servicios/[slug]/`.
- [ ] `/servicios/` queda prevista pero no se construye en V1.
- [ ] Canonical propia estable y absoluta.
- [ ] `seoTitle` y `seoDescription` permiten personalización y fallbacks controlados.
- [ ] Open Graph usa la imagen social global en V1.
- [ ] JSON-LD contiene únicamente información visible y verificable.
- [ ] Un cambio de slug exige una decisión de redirección antes de publicarse.
- [ ] `noindex` no se usa como sustituto de privacidad.

### L.6 Datos y exportación

- [ ] Queries GROQ centralizadas y proyecciones explícitas.
- [ ] Tipos TypeScript estrictos sin `any`.
- [ ] Cliente server-only y sin tokens públicos.
- [ ] `generateStaticParams()` genera únicamente slugs permitidos.
- [ ] `dynamicParams = false`.
- [ ] `output: "export"` se conserva.
- [ ] Build sin credenciales termina de forma predecible y no inventa servicios.
- [ ] El release diferencia ausencia técnica de datos y contenido no aprobado.

### L.7 Calidad

- [ ] `npm run lint` sin errores.
- [ ] `npm run typecheck` sin errores.
- [ ] `npm run format:check` sin diferencias.
- [ ] `npm run build` genera la exportación estática.
- [ ] Build/validación de Studio termina sin errores críticos.
- [ ] No se agregan dependencias innecesarias.
- [ ] Rutas públicas existentes no presentan regresiones.

---

## M. Alcance de complejidad

### M.1 Incluido en Servicio V1

- `commercialOffer` con etiqueta editorial Servicio;
- una sola plantilla y `/servicios/[slug]/`;
- campos principales de identificación, contenido comercial, metodología,
  entregables, límites, imagen y contacto;
- evidencia simplificada;
- publicación nativa de Sanity;
- `availabilityStatus` con `active` y `retired`;
- SEO editable con fallback desde título y resumen;
- referencia única `homePage.featuredService`;
- validaciones estrictas solo para integridad, unicidad, máximos estructurales y
  protección del layout;
- advertencias para longitudes editoriales recomendadas.

### M.2 Pospuesto expresamente

- `expectedBenefits[].evidenceReference`;
- `relatedOffers` y `relatedArticles`;
- `socialImage` independiente;
- `canonicalUrl` externo;
- `heroImageDecorative`;
- acción Duplicate personalizada;
- `editorialStatus` y otros estados editoriales superpuestos;
- `publishedAt` y `updatedAt` manuales;
- seis vistas editoriales;
- infraestructura completa de redirecciones;
- referencias internas complejas de evidencia;
- índice `/servicios/` hasta existir al menos dos servicios permanentes publicados.

### M.3 Solo cuando exista una necesidad real

- relaciones automáticas entre servicios y artículos;
- navegación de servicios permanentes;
- imagen social por servicio;
- canonical externa;
- workflow editorial adicional;
- duplicación segura automatizada;
- registro central de redirecciones;
- taxonomías avanzadas de evidencia;
- múltiples plantillas comerciales.

---

## N. Decisiones pendientes

1. calibrar los límites editoriales después de probar contenido real sin convertir
   recomendaciones en bloqueos innecesarios;
2. aprobar el texto visible si se conserva la página de un servicio retirado;
3. decidir caso por caso si un servicio retirado conserva página, responde `404`,
   responde `410` o redirige;
4. aprobar el tipo exacto de datos estructurados y la información legal que lo
   sustenta;
5. definir la comprobación mínima de contenido lista para release;
6. aprobar títulos, textos, imágenes y claims de cada servicio antes de publicarlo;
7. decidir qué dos o más servicios permanentes justifican construir `/servicios/`;
8. decidir cuándo una necesidad real justifica recuperar alguno de los elementos
   pospuestos.

---

## Referencias técnicas

- Sanity, acciones de documento:
  <https://www.sanity.io/docs/studio/document-actions-api>
- Sanity, tipo slug y unicidad:
  <https://www.sanity.io/docs/studio/slug-type>
- Sanity, validación:
  <https://www.sanity.io/docs/studio/validation>
- Next.js, exportación estática:
  <https://nextjs.org/docs/app/guides/static-exports>
- Google Search, políticas de datos estructurados:
  <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
