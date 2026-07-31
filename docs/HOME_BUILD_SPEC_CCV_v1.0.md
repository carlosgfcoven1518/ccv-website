# CCV — Especificación técnica y editorial de la Home

**Documento:** `HOME_BUILD_SPEC_CCV_v1.0.md`  
**Versión:** 1.0  
**Estado:** Propuesta para revisión; no autoriza implementación  
**Fase:** 4 — Especificación de Home y servicios comerciales  
**Marca:** CCV — Coven Creative Ventures

---

## 0. Propósito, autoridad y alcance

Este documento traduce la arquitectura aprobada para la Home de CCV a requisitos
técnicos, editoriales y verificables. Define qué debe construirse en una fase de
implementación posterior, pero no implementa componentes, páginas, estilos, schemas,
queries ni contenido.

### 0.1 Fuentes y precedencia

Se utilizaron como fuentes:

1. `docs/CODEX_BUILD_SPEC_CCV_v1.0.md`;
2. `docs/DESIGN_SYSTEM_TECHNICAL_MANUAL_CCV_v1.0.md`;
3. `docs/SANITY_EDITORIAL_MODEL_CCV_v1.0.md`;
4. la implementación actual de `apps/web` y `apps/studio`;
5. las decisiones aprobadas incluidas en el encargo de esta especificación.

Ante una contradicción, la decisión más reciente y específica de este encargo tiene
precedencia. En particular:

- el H1 aprobado para la Home es **“Ecosistemas de marketing para crecimiento
  comercial.”**; sustituye para esta futura implementación al H1 histórico del Build
  Spec;
- “Fase 4” designa aquí la especificación y futura construcción de la Home y del
  sistema de servicios, aunque el Build Spec histórico utilizara esa etiqueta para otro
  alcance;
- ninguna de estas precisiones modifica retrospectivamente los documentos fuente.

### 0.2 Clasificación de decisiones

Este manual emplea tres etiquetas:

- **[Aprobado]**: requisito que debe respetarse.
- **[Recomendación]**: decisión técnica propuesta para aprobación.
- **[Pendiente]**: decisión editorial, de negocio o de infraestructura que debe
  resolverse antes de implementar o publicar.

Los nombres funcionales de secciones usados en este documento describen su propósito;
no constituyen titulares ni copy comercial definitivo.

### 0.3 Fuera de alcance

Esta especificación no autoriza:

- implementar la Home;
- crear o modificar schemas de Sanity;
- modificar queries, cliente de datos, rutas, componentes o estilos;
- redactar copy comercial definitivo distinto del H1 aprobado;
- crear servicios, artículos o imágenes;
- instalar dependencias;
- modificar credenciales o archivos `.env.local`;
- desplegar, configurar automatizaciones o publicar contenido.

---

## A. Objetivo comercial de la Home

**[Aprobado]** La Home debe presentar a CCV como la organización que dirige e integra
ecosistemas de marketing orientados a crecimiento y resultados comerciales medibles.

Debe permitir que una persona de decisión entienda, en este orden:

1. qué resultado comercial persigue CCV;
2. qué problema de dirección, coordinación o integración aborda;
3. cómo estructura el trabajo;
4. qué evidencia, experiencia o criterios respaldan su enfoque;
5. qué servicio comercial concreto puede explorar;
6. cómo profundizar mediante Análisis o iniciar contacto.

La Home no debe presentar a CCV principalmente como:

- agencia digital;
- proveedor de comunicación o contenidos;
- operador de redes sociales;
- catálogo indiferenciado de servicios;
- consultoría genérica;
- página de captación basada en múltiples botones o urgencia artificial.

**[Recomendación]** La secuencia comercial debe progresar de posicionamiento a
comprensión, de comprensión a evidencia y de evidencia a una siguiente acción clara.
No debe comenzar con una lista de disciplinas ni con un servicio temporal.

---

## B. Audiencias prioritarias

### B.1 Audiencias aprobadas

- directores generales;
- propietarios;
- directores comerciales;
- directores de marketing;
- CFOs y responsables de inversión;
- empresas que necesitan dirección, coordinación y resultados medibles.

### B.2 Consecuencias editoriales

**[Aprobado]** El contenido debe:

- hablar de problemas, decisiones, inversión, coordinación y resultados;
- distinguir dirección estratégica, integración y ejecución;
- hacer explícito el alcance y los límites de cada afirmación;
- evitar jerga táctica sin contexto comercial;
- evitar métricas, casos, clientes o beneficios no comprobables;
- permitir lectura exploratoria y lectura ejecutiva rápida.

**[Recomendación]** Cada sección debería responder una sola pregunta comercial y
mantener el texto principal dentro de una medida de lectura de `60–72ch`. Las listas
deben utilizarse solo cuando faciliten comparar elementos, no para fragmentar todo el
discurso.

---

## C. Arquitectura propuesta de la Home

### C.1 Principios estructurales

- **[Aprobado]** La estructura central y el orden semántico son estables.
- **[Aprobado]** Sanity administra contenido estructurado, no la composición visual
  libre.
- **[Aprobado]** El CMS no puede reordenar secciones, insertar bloques arbitrarios ni
  seleccionar layouts.
- **[Aprobado]** Servicio destacado puede aparecer o desaparecer mediante una única
  referencia editorial.
- **[Aprobado]** Evidencia y resultados puede omitirse como sección completa cuando no
  exista material verificable suficiente.
- **[Recomendación]** Las imágenes opcionales pueden omitirse sin desactivar el
  contenido textual de su sección.
- **[Recomendación]** La ausencia de artículos modifica el contenido interno de
  Análisis, pero no elimina la sección.
- **[Recomendación]** No deben existir interruptores `enabled` generales. La
  opcionalidad debe expresarse mediante datos nulos solo donde este documento la
  permita.

### C.2 Orden recomendado

| Orden | Bloque funcional                   | Función comercial                                             | Estado                                      |
| ----: | ---------------------------------- | ------------------------------------------------------------- | ------------------------------------------- |
|     0 | Skip link, encabezado y navegación | Acceso, orientación y navegación por teclado                  | Obligatorio                                 |
|     1 | Hero                               | Declarar posicionamiento y establecer la primera jerarquía    | Obligatorio                                 |
|     2 | Contexto de decisión               | Enmarcar el problema de dirección, coordinación e inversión   | Obligatorio                                 |
|     3 | Ecosistema e integración           | Explicar qué integra CCV y por qué la integración importa     | Obligatorio                                 |
|     4 | Servicio destacado                 | Abrir una ruta comercial concreta hacia un servicio vigente   | Opcional                                    |
|     5 | Modelo de trabajo                  | Hacer comprensible el enfoque sin convertirlo en un catálogo  | Obligatorio                                 |
|     6 | Evidencia y resultados             | Respaldar el enfoque solo con información verificable         | Opcional; se omite sin evidencia suficiente |
|     7 | CCV y experiencia                  | Explicar quién dirige o integra el trabajo y con qué criterio | Obligatorio                                 |
|     8 | Especialización y contexto         | Delimitar dónde el enfoque resulta pertinente                 | Obligatorio                                 |
|     9 | Análisis                           | Conectar pensamiento editorial con problemas comerciales      | Obligatorio; tarjetas variables             |
|    10 | Contacto                           | Ofrecer correo y LinkedIn como siguientes acciones directas   | Obligatorio                                 |
|    11 | Footer                             | Identidad, navegación secundaria y datos legales aprobados    | Obligatorio                                 |

Los nombres de la tabla son etiquetas de arquitectura, no headings públicos.

### C.3 Función y contenido de cada sección

#### 0. Encabezado y navegación

- **Código:** semántica, orden, comportamiento responsive, navegación de teclado,
  indicador de foco, anclas y límites de ítems.
- **Sanity:** no administra el orden de navegación inicial.
- **Contenido:** marca, enlaces estables aprobados y enlaces legales.
- **Restricción:** no incorporar automáticamente todos los servicios a la navegación.

#### 1. Hero

- **Código:** posición y semántica únicas del H1, layout, jerarquía, fallback, posición
  de medios y comportamiento responsive.
- **Sanity:** H1, subtítulo, imagen opcional y texto alternativo condicionado.
- **Obligatorio:** H1 y subtítulo para publicación; deben aprobarse editorialmente.
- **Opcional:** imagen.

#### 2. Contexto de decisión

- **Código:** orden, layout y jerarquía H2.
- **Sanity:** eyebrow opcional, heading, introducción y entre dos y cuatro puntos
  estructurados.
- **Obligatorio:** heading e introducción.
- **Opcional:** eyebrow y puntos adicionales después del mínimo.
- **Restricción:** no permitir un bloque Portable Text irrestricto.

#### 3. Ecosistema e integración

- **Código:** composición asimétrica y número máximo de elementos.
- **Sanity:** heading, introducción y entre tres y cinco dimensiones estructuradas,
  cada una con título y descripción.
- **Obligatorio:** heading, introducción y tres dimensiones.
- **Opcional:** imagen editorial con alt.
- **Restricción:** las dimensiones explican relaciones; no deben parecer tarjetas de
  servicios independientes.

#### 4. Servicio destacado

- Se rige por la sección E de este documento.
- La única configuración de la Home es una referencia opcional
  `homePage.featuredService` a un documento `commercialOffer`.
- No debe incluir un segundo interruptor de visibilidad ni campos duplicados.

#### 5. Modelo de trabajo

- **Código:** secuencia visual, numeración y límites.
- **Sanity:** heading, introducción y entre tres y cinco etapas ordenadas.
- **Obligatorio:** heading y al menos tres etapas, cada una con nombre y descripción.
- **Opcional:** nota de alcance.
- **Restricción:** no permitir que el editor elija iconos, colores o variantes de
  layout.

#### 6. Evidencia y resultados

- **Código:** arquitectura, reglas de omisión y etiqueta semántica.
- **Sanity:** heading, texto de encuadre y elementos de evidencia estructurada.
- **Opcional:** la sección completa.
- **Regla de omisión:** si no existe material verificable suficiente, no se renderiza
  heading, encuadre, retícula ni espacio visual.
- **Restricción:** toda cifra, cliente, resultado o cita necesita fuente o aprobación
  documentada.

#### 7. CCV y experiencia

- **Código:** composición y relación con la navegación.
- **Sanity:** heading, descripción, perfil de liderazgo aprobado e imagen opcional.
- **Obligatorio:** heading y descripción.
- **Opcional:** imagen y datos estructurados de experiencia.
- **Restricción:** no inferir biografía, credenciales ni experiencia.

#### 8. Especialización y contexto

- **Código:** estructura y tratamiento visual.
- **Sanity:** heading, texto y hasta cuatro contextos o sectores estructurados.
- **Obligatorio:** heading y texto.
- **Opcional:** lista de contextos después del mínimo editorial aprobado.
- **Alcance:** debe permitir comunicar experiencia prioritaria en servicios
  financieros, fintech, negocios complejos y otros sectores respaldados por
  experiencia verificable.
- **Restricción:** no presentar a CCV como una firma limitada exclusivamente a IFNBs ni
  inferir experiencia sectorial no comprobada.
- **Pendiente editorial:** heading y copy definitivo.

#### 9. Análisis

- Se rige por la sección F.
- **Código:** query, número máximo, fallback, tarjeta editorial y enlace al índice.
- **Sanity:** heading e introducción de la sección; selección de artículos mediante
  los campos existentes de Article.

#### 10. Contacto

- Se rige por la sección G.
- **Código:** semántica, presentación de enlaces y estados interactivos.
- **Sanity:** heading e instrucción de contacto en Home; correo y LinkedIn en Site
  Settings.

#### 11. Footer

- **Código:** componente y estructura.
- **Sanity:** datos globales ya previstos en Site Settings.
- **Restricción:** no duplicar correo, LinkedIn, nombre legal o locale en Home.

### C.4 Modelo editorial recomendado para la Home

**[Recomendación]** Crear en una fase posterior un singleton `homePage`, separado de
`siteSettings`.

La separación evita mezclar configuración global con contenido narrativo y permite:

- validar la integridad de la Home como una unidad;
- mantener un orden de campos equivalente al orden de lectura;
- mostrar grupos editoriales comprensibles;
- conservar Site Settings como fuente global de contacto, identidad y SEO por
  defecto.

El singleton debe contener objetos fijos por sección, no un array de page builder:

| Campo sugerido    | Tipo                           | Requisito                             | Comportamiento vacío                |
| ----------------- | ------------------------------ | ------------------------------------- | ----------------------------------- |
| `heroTitle`       | `string`                       | Obligatorio para publicar             | Usa el fallback aprobado            |
| `heroSubtitle`    | `text`                         | Obligatorio para publicar             | Bloquea publicación editorial       |
| `heroImage`       | `image` con hotspot            | Opcional                              | Hero textual                        |
| `heroImageAlt`    | `string`                       | Obligatorio si hay imagen informativa | Error de validación                 |
| `decisionContext` | objeto estructurado            | Obligatorio                           | Bloquea publicación                 |
| `ecosystem`       | objeto estructurado            | Obligatorio                           | Bloquea publicación                 |
| `operatingModel`  | objeto estructurado            | Obligatorio                           | Bloquea publicación                 |
| `featuredService` | referencia a `commercialOffer` | Opcional                              | No renderiza la sección             |
| `evidence`        | objeto estructurado            | Opcional                              | No renderiza la sección             |
| `aboutCcv`        | objeto estructurado            | Obligatorio                           | Bloquea publicación                 |
| `specialization`  | objeto estructurado            | Obligatorio                           | Bloquea publicación                 |
| `analysisIntro`   | objeto corto                   | Obligatorio                           | Utiliza fallback editorial aprobado |
| `contactIntro`    | objeto corto                   | Obligatorio                           | Utiliza fallback editorial aprobado |

**[Recomendación]** “Bloquear publicación” significa mostrar una validación clara en
Studio. Como la validación de schema no protege mutaciones directas por API, una
implementación futura también debe validar las proyecciones públicas durante el build.

### C.5 Qué permanece en código

- posición, semántica única y fallback del H1;
- orden de secciones;
- ids y destinos de anclas;
- jerarquía H1–H3;
- número mínimo y máximo de elementos;
- componentes y variantes del Design System;
- layout, tonos, proporciones y comportamiento responsive;
- reglas de fallback;
- queries y filtros de publicación;
- semántica, accesibilidad, motion y presupuestos de rendimiento;
- generación de metadata y datos estructurados;
- decisión de qué secciones son opcionales;
- rutas base y reglas de publicación.

### C.6 Qué administra Sanity

- H1 y subtítulo del Hero;
- headings, introducciones y contenido estructurado de secciones;
- imágenes y alt text;
- etapas, dimensiones y evidencias dentro de límites definidos;
- referencia al servicio destacado;
- textos introductorios de Análisis y Contacto;
- datos globales existentes de Site Settings;
- artículos y servicios publicados mediante sus documentos propios.

El editor no puede cambiar:

- columnas, retícula o composición;
- colores, tipografía, espaciado, radios o sombras;
- componentes o variantes visuales;
- orden libre de secciones;
- HTML, JavaScript o embeds arbitrarios;
- rutas base, reglas de publicación o fallbacks;
- bloques no previstos por el schema;
- animaciones permitidas, su destino o sus límites.

### C.7 Integridad y fallbacks de datos

- El build técnico debe poder terminar sin credenciales, como ya permite la capa de
  datos actual.
- Si `heroTitle` no está disponible, el frontend utiliza el H1 aprobado como fallback.
- Un build sin datos no debe inventar contenido ni publicar una Home aparentemente
  completa.
- **[Recomendación]** El proceso de release debe distinguir “build técnicamente
  correcto” de “contenido listo para publicar” mediante una comprobación de campos
  obligatorios.
- El HTML inicial debe contener todo el contenido disponible; no debe depender de una
  hidratación de cliente para aparecer.

---

## D. Hero

### D.1 H1

El contenido inicialmente aprobado y fallback de seguridad será exactamente:

> Ecosistemas de marketing para crecimiento comercial.

- Se administra desde `homePage.heroTitle` en Sanity.
- Es obligatorio y debe ser un `string` plano, sin HTML ni formato enriquecido.
- El código fija su posición, elemento `<h1>` y unicidad; el editor solo modifica el
  contenido.
- Solo puede existir un H1 en la Home.
- No debe fragmentarse en varios headings ni introducir saltos de línea editoriales.
- Longitud recomendada: hasta `72` caracteres. Superar la recomendación debe producir
  una advertencia editorial y revisión visual; el límite estricto debe reservarse para
  una longitud que rompa el layout.
- Si el campo falta o la lectura de Sanity falla, el frontend usa el texto aprobado
  como fallback de seguridad.
- Un tratamiento visual en varias líneas no cambia el texto ni el orden del DOM.
- No debe repetirse como `alt`, eyebrow ni texto decorativo.

### D.2 Subtítulo

Su función es explicar, sin repetir el H1:

- qué tipo de dirección e integración ofrece CCV;
- para quién resulta pertinente;
- qué vínculo tiene con decisiones o resultados comerciales.

Restricciones:

- no redactarlo todavía;
- no incluir claims, métricas o garantías no demostrables;
- no describir a CCV principalmente como agencia o ejecutor táctico;
- no añadir una lista de servicios;
- recomendación de `140–240` caracteres y máximo técnico de `280`;
- máximo visual recomendado de tres a cuatro líneas en desktop y cinco en móvil;
- una sola pieza de texto, sin formato libre.

### D.3 Imagen

- Es opcional y nunca sustituye el contenido textual.
- Debe utilizar una proporción aprobada del Design System, preferentemente `source`
  (`2048 / 1117`) o `wide` (`16 / 9`).
- En desktop puede ocupar el lado de mayor tensión visual de una composición
  asimétrica; en móvil debe seguir al texto en el DOM.
- Debe declarar dimensiones o `aspect-ratio` para reservar espacio.
- Solo la imagen realmente responsable del LCP puede cargarse con prioridad.
- El recorte debe configurarse desde hotspot/crop de Sanity y resolverse durante el
  build.
- No debe contener texto generado dentro de la imagen.

### D.4 Responsive y SEO

- Desktop: composición asimétrica dentro de la retícula de doce columnas.
- Tablet: conservar jerarquía; reducir solapamientos y anchura decorativa.
- Móvil: una columna, H1 primero, subtítulo después e imagen al final.
- El H1 y el subtítulo deben existir en el HTML inicial.
- No debe animarse letra por letra ni ocultarse hasta ejecutar JavaScript.

---

## E. Servicio destacado

### E.1 Selección y fuente

- **[Aprobado]** Es opcional.
- **[Aprobado]** `homePage.featuredService` selecciona un documento existente de tipo
  técnico `commercialOffer`, presentado editorial y públicamente como Servicio.
- **[Aprobado]** No duplica título, resumen, imagen, slug ni contenido comercial.
- **[Recomendación]** La query pública debe resolver solo la versión publicada de una
  servicio activo.
- **[Recomendación]** La relación de Home es la única fuente de verdad de “destacada”;
  no debe añadirse un booleano duplicado en cada Servicio.

### E.2 Proyección resumida

La sección puede usar únicamente:

- título principal;
- resumen para tarjetas;
- imagen principal y alt, si existen;
- slug;
- opcionalmente una indicación breve de audiencia si la composición la necesita.

No debe mostrar en Home metodología completa, entregables, evidencia ni SEO fields.

### E.3 Enlace

- Debe enlazar con `EditorialLink` a `/servicios/[slug]/`.
- El texto visible debe describir el destino; no usar “clic aquí”.
- No debe simular un botón comercial principal.
- La tarjeta o bloque no debe depender exclusivamente de un área clicable no
  semántica.

### E.4 Estados y fallbacks

| Estado                               | Comportamiento de la Home                                    |
| ------------------------------------ | ------------------------------------------------------------ |
| Sin referencia                       | Omitir la sección y cerrar el espacio sin hueco visual       |
| Referencia a borrador                | Omitir en la proyección publicada                            |
| Referencia rota                      | Omitir y reportar en validación editorial/build              |
| Servicio retirado                    | Omitir de Home; conservar su URL según la política de retiro |
| Servicio publicado y activo          | Renderizar resumen y enlace                                  |
| Servicio posteriormente no destacado | Omitir de Home; conservar su página publicada                |

No debe aparecer contenido placeholder ni un mensaje técnico al visitante.

---

## F. Integración con Análisis

### F.1 Selección

- Utilizar la query centralizada de artículos destacados ya existente.
- Mostrar hasta tres artículos publicados con `featured == true`.
- Respetar el orden definido por la query vigente: fecha de publicación descendente.
- No permitir duplicar contenido de Article dentro de Home.
- No seleccionar borradores, documentos sin fecha publicable ni contenido marcado
  `noindex` si la política SEO futura determina excluirlo de superficies destacadas.

### F.2 Presentación

- Reutilizar `EditorialCard` y las proyecciones públicas de Article.
- Mostrar solo los campos necesarios: título, excerpt, metadata editorial aprobada,
  imagen/alt y slug.
- Mantener un enlace visible hacia `/analisis/`.
- No convertir la sección en carrusel.

### F.3 Fallback

Si no existen artículos publicados destacados:

- mantener heading e introducción;
- omitir la retícula de tarjetas;
- conservar el enlace al índice `/analisis/`;
- no crear artículos ficticios ni tarjetas vacías.

**[Pendiente]** Aprobar el heading, la introducción y el texto del enlace.

### F.4 Preparación SEO

- Enlaces internos en HTML inicial.
- Títulos de artículo como headings del nivel correcto dentro de la sección.
- Evitar repetir el H1 del artículo como si fuera otro H1 de la Home.
- Las tarjetas no generan por sí solas datos estructurados `Article`; la futura
  decisión debe evitar duplicar o representar contenido que la Home no contiene
  íntegramente.

---

## G. Contacto

- No habrá formularios en esta fase.
- No habrá botones comerciales genéricos.
- Correo y LinkedIn se leen de los campos existentes de `siteSettings`.
- La instrucción breve de contacto se administra desde `homePage.contactIntro`.
- El correo usa un enlace `mailto:` visible y comprensible.
- LinkedIn usa una URL `https` válida, nombre de destino explícito y aviso accesible si
  se decide abrir una pestaña nueva.
- Los datos no deben duplicarse en Home ni en Servicio.
- El lenguaje debe ser directo, sin urgencia artificial ni promesas.
- Los enlaces deben tener foco visible y área táctil mínima de `44 × 44px`.
- Si falta uno de los canales, mostrar el disponible. Si faltan ambos, el release debe
  marcar el contenido como incompleto; no inventar datos.

---

## H. Imágenes

### H.1 Proporciones y uso

| Contexto                | Proporción preferida     | Alternativa                       | Nota                                      |
| ----------------------- | ------------------------ | --------------------------------- | ----------------------------------------- |
| Hero                    | `source` (`2048 / 1117`) | `wide` (`16 / 9`)                 | Una sola candidata a LCP                  |
| Bloque editorial amplio | `wide`                   | `four-three`                      | Según composición aprobada                |
| Servicio destacado      | `four-three`             | `source`                          | Debe coincidir con la página del servicio |
| Tarjeta de Análisis     | `four-three`             | Proporción existente del artículo | Consistencia en la retícula               |
| Retrato                 | `portrait` (`3 / 4`)     | Ninguna libre                     | Solo cuando el contenido lo requiera      |

No debe introducirse una nueva relación de aspecto sin justificarla en el Design
System.

### H.2 Tamaños y carga

- Generar candidatos aproximados de `640`, `960`, `1280`, `1600` y `1920px` cuando
  la fuente lo permita.
- No solicitar una imagen más ancha que su tamaño de render previsto por `sizes`.
- Usar AVIF o WebP cuando el pipeline de Sanity lo soporte; mantener fallback
  compatible.
- Cargar de forma diferida imágenes bajo el primer viewport.
- Evitar preloads múltiples; priorizar solo el recurso LCP confirmado.
- Utilizar `width`/`height` o contenedor con `aspect-ratio`.
- Mantener `object-fit: cover` y un hotspot editorial intencional.

### H.3 Accesibilidad editorial

- Toda imagen informativa requiere alt específico.
- Una imagen puramente decorativa usa `alt=""` y no repite texto cercano.
- El alt describe función o contenido, no comienza con “imagen de”.
- Texto visible, logotipos con información o diagramas no deben incrustarse como
  píxeles sin equivalente accesible.
- La validación condicional debe impedir publicar una imagen informativa sin alt.

### H.4 Exportación estática

- Las URLs y transformaciones se calculan durante el build.
- No usar optimización de imagen que requiera un servidor de Next.js; la configuración
  actual mantiene `images.unoptimized: true`.
- Los assets resultantes y URLs CDN deben existir en el HTML exportado.
- Un fallo de credenciales no debe producir una llamada dinámica incompatible con
  hosting estático.

---

## I. Microinteracciones y movimiento

### I.1 Principios

- El movimiento apoya jerarquía y orientación; no sustituye contenido.
- Hover y focus deben ser equivalentes en claridad, aunque no idénticos visualmente.
- El contenido será visible por defecto y podrá mejorar progresivamente.
- La implementación de layout, contenido, responsive y accesibilidad precede a los
  revelados y al parallax.
- No habrá scroll hijacking, cursores personalizados, texto letra por letra,
  animaciones infinitas ni transiciones de página complejas.

### I.2 Movimiento incluido en V1

- Enlaces editoriales: cambio de indicador o subrayado en `160–220ms`.
- Imágenes enlazadas: escala máxima `1.015` solo si no afecta recorte ni legibilidad.
- Focus: usar el token global de anillo, nunca quitar `outline` sin reemplazo.
- Menú: transición breve mediante los tokens de movimiento existentes, sin retrasar
  apertura, cierre, foco ni navegación de teclado.
- No mover controles de forma que cambie el objetivo táctil.
- Estos estados deben resolverse con CSS siempre que sea posible.

### I.3 Revelados — Fase 4C

- Un revelado discreto puede combinar opacidad y desplazamiento de `16–24px`.
- Duración: `280–520ms`.
- Easing: token `--ease-out`.
- Stagger máximo: `60ms` entre elementos y hasta cinco elementos.
- Aplicar solo a grupos principales elegidos después de revisar la composición; no a
  cada párrafo o control.
- Un fallo de Intersection Observer o JavaScript deja todo visible.

### I.4 Parallax — Fase 4C

- Se permite un único parallax ligero, después de aprobar layout, contenido y
  responsive.
- Su único destino permitido es un visual decorativo de la sección Ecosistema e
  integración.
- Nunca se aplica al texto ni a la imagen LCP del Hero.
- Desplazamiento máximo recomendado: `4%` de la dimensión del contenedor.
- Puede desactivarse en móvil.
- Debe implementarse sin scroll listener continuo cuando exista una alternativa
  eficiente.
- No puede requerir una librería pesada.
- Se elimina si afecta Lighthouse, fluidez, CLS, accesibilidad, causa repaint
  significativo o incumple el presupuesto de JavaScript.

### I.5 Reduced motion

Con `prefers-reduced-motion: reduce`:

- duración efectiva `0.01ms`;
- sin desplazamientos ni parallax;
- sin smooth scroll;
- contenido visible inmediatamente;
- hover/focus conservan una señal estática perceptible.

Todo contenido debe existir y ser visible en el HTML inicial, incluso antes de
JavaScript o si este falla.

---

## J. Rendimiento

### J.1 Presupuesto

- Mantener Server Components por defecto.
- JavaScript propio de interacción de la página: objetivo máximo de `30KB gzip`,
  excluyendo runtime del framework y cargas editoriales que no llegan al cliente.
- No instalar una librería de animación para revelados o parallax simples.
- No añadir estado global para Home.
- Evitar carruseles, video autoplay y observers por componente.

### J.2 Core Web Vitals

Objetivos en el percentil 75, separados para móvil y desktop:

- LCP ≤ `2.5s`;
- CLS ≤ `0.1`;
- INP ≤ `200ms`.

Lighthouse es una señal de laboratorio; INP debe verificarse posteriormente con datos
de campo y puede aproximarse en laboratorio mediante TBT.

### J.3 Lighthouse

Objetivos de revisión:

- Performance: ≥ `90` móvil y ≥ `95` desktop;
- Accessibility: ≥ `95`;
- Best Practices: ≥ `95`;
- SEO: ≥ `95`.

Las cifras deben medirse en un build de producción servido desde la exportación
estática, no solo en el servidor de desarrollo.

### J.4 Prevención de CLS

- dimensiones o proporción reservada para cada imagen;
- fuentes locales con métricas y fallback revisados;
- navegación con espacio estable;
- no insertar el servicio destacado después de hidratar;
- no ocultar/revelar contenido alterando el flujo;
- no cargar banners o avisos no previstos sobre el contenido.

### J.5 Lazy loading

- imágenes bajo el fold: diferidas;
- contenido textual: siempre en HTML inicial;
- JavaScript de movimiento: diferido y no bloqueante;
- módulos de interacción: segmentados al mínimo boundary de cliente.

### J.6 Criterios para retirar una animación

Una animación se elimina si ocurre cualquiera de estas condiciones:

- supera el presupuesto de JavaScript propio;
- empeora de forma reproducible LCP, CLS, TBT o interacción;
- introduce tareas largas o caída visible de frames en dispositivos de gama media;
- requiere ocultar contenido antes de hidratar;
- produce mareo o no se desactiva por reduced motion;
- dificulta selección de texto, foco, lectura o activación táctil;
- obliga a instalar una dependencia visual no justificable.

---

## K. Responsive

### K.1 Reglas generales

- Breakpoints de referencia: `40rem`, `64rem` y `80rem`.
- Móvil parte de una columna y conserva el orden semántico.
- La retícula de doce columnas se activa a partir de `64rem`.
- Márgenes laterales y gaps utilizan los tokens existentes.
- Ninguna sección depende de superposición absoluta para ser comprensible.
- El contenido no debe producir scroll horizontal a `320px`.

### K.2 Matriz por sección

| Sección            | Móvil                                                  | Tablet                                         | Desktop                                              |
| ------------------ | ------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------- |
| Navegación         | Control accesible, touch targets de 44px, orden lógico | Menú compacto o transición aprobada            | Navegación horizontal dentro del contenedor          |
| Hero               | Texto antes de imagen; una columna                     | Jerarquía conservada, dos zonas si hay espacio | Composición asimétrica en 12 columnas                |
| Contexto           | Bloques lineales                                       | Dos zonas cuando no fragmenten lectura         | Texto principal y elementos secundarios desfasados   |
| Ecosistema         | Elementos apilados                                     | Dos columnas cuando quepan                     | Relaciones en retícula, sin mosaico de tarjetas SaaS |
| Servicio destacado | Resumen vertical y enlace                              | Imagen/texto equilibrados                      | Bloque editorial amplio, no modal ni banner          |
| Modelo             | Etapas en orden numérico                               | Dos columnas o secuencia                       | Distribución asimétrica con orden evidente           |
| Evidencia          | Una evidencia por fila                                 | Dos columnas si son comparables                | Retícula limitada; cifras con contexto               |
| CCV                | Texto antes de imagen                                  | Dos zonas                                      | Composición asimétrica                               |
| Especialización    | Texto y lista lineales                                 | Dos zonas                                      | Composición editorial con espacio generoso           |
| Análisis           | Una tarjeta por fila                                   | Hasta dos columnas                             | Hasta tres columnas                                  |
| Contacto           | Enlaces apilados con 44px                              | Espaciado mayor                                | Texto y canales alineados sin falsa CTA              |
| Footer             | Grupos apilados                                        | Dos zonas                                      | Retícula estable                                     |

### K.3 Navegación y legibilidad

- El DOM define el orden correcto, no las propiedades visuales de CSS.
- Longitud de línea de cuerpo: objetivo `60–72ch`.
- H1 usa el token responsive del Design System sin reducirse a un tamaño que pierda
  jerarquía.
- Ningún texto decorativo debe solapar contenido en móvil.
- Los controles deben poder activarse sin hover.

---

## L. SEO

### L.1 Jerarquía

- Un solo H1: el posicionamiento aprobado.
- Cada sección principal usa H2.
- Elementos internos, etapas o tarjetas pueden usar H3.
- No saltar niveles por razones visuales.
- Eyebrow es texto auxiliar, no sustituto de heading.

### L.2 Metadata

- `title` y `description` se obtienen de Site Settings o de campos Home futuros
  explícitos.
- Canonical absoluto basado en `siteUrl`.
- Open Graph con título, descripción, URL, locale e imagen aprobada.
- No usar la imagen del Hero como social image automáticamente si su recorte no es
  apropiado.
- **[Pendiente]** Aprobar title, description, canonical base e imagen social.

### L.3 Datos estructurados

**[Recomendación]**

- `WebSite` para identidad del sitio;
- `Organization` para CCV, únicamente con propiedades verificadas;
- `BreadcrumbList` en páginas internas, no necesario en la raíz;
- no usar `ProfessionalService`, `LocalBusiness`, ratings, precios o áreas servidas
  sin datos aprobados y correspondencia con contenido visible.

JSON-LD es el formato recomendado. El marcado debe representar el contenido visible y
no promete por sí mismo un resultado enriquecido.

### L.4 Enlazado interno

- Enlace a `/analisis/`.
- Enlace al servicio destacado solo cuando esté publicado y activo.
- Enlaces de navegación a anclas estables.
- Servicios permanentes podrán incorporarse después sin alterar la arquitectura
  central.
- La ruta prevista para páginas individuales es `/servicios/[slug]/`.
- La futura ruta `/servicios/` se construirá cuando existan al menos dos servicios
  permanentes publicados.
- No crear enlaces a rutas que no formen parte del build.

### L.5 Indexabilidad

- Contenido y enlaces disponibles en el HTML inicial exportado.
- No depender de click, scroll o JavaScript para insertar texto indexable.
- Home pública con `index,follow` solo cuando el contenido obligatorio esté aprobado.
- No crear afirmaciones comerciales, métricas o schema markup que no puedan
  demostrarse.

---

## M. Accesibilidad

Objetivo mínimo: WCAG 2.2 AA.

### M.1 Teclado y foco

- `SkipLink` como primer enlace operativo.
- Todos los enlaces y controles alcanzables en orden lógico.
- Focus visible con contraste suficiente y sin recorte por overflow.
- Menú móvil cierra/restaura foco de manera predecible.
- Escape debe cerrar cualquier navegación expandida; Home no requiere otros diálogos.

### M.2 Semántica

- `header`, `nav`, `main`, `section`, `article`, `footer` según función real.
- Cada `section` relevante tiene heading accesible.
- Listas reales para grupos de elementos.
- No usar `div` con `onClick` como enlace.
- Textos de enlace describen su destino.

### M.3 Contraste

- Aplicar solo combinaciones permitidas por el Design System.
- Verde no se usa como texto pequeño sobre blanco.
- No comunicar estado solo mediante color.
- El foco conserva contraste en superficies navy y blancas.

### M.4 Imágenes y lectores de pantalla

- Alt requerido para imágenes informativas y vacío para decorativas.
- Evitar redundancia entre alt, caption y texto adyacente.
- Orden de lectura igual al orden semántico.
- Texto decorativo de gran escala debe ocultarse a tecnologías de asistencia si repite
  contenido.

### M.5 Movimiento y touch

- Cumplir la sección I.5.
- Objetivos táctiles mínimos de `44 × 44px`.
- Separación suficiente entre enlaces.
- Ninguna acción depende de drag, hover o precisión fina.

---

## N. Criterios de aceptación

### N.1 Arquitectura y contenido

- [ ] Existe un único H1, su contenido proviene de Sanity y el fallback coincide
      exactamente con el texto aprobado.
- [ ] El campo H1 es obligatorio, plano y no admite HTML ni formato enriquecido.
- [ ] La Home comunica dirección e integración orientadas a crecimiento comercial.
- [ ] No presenta a CCV principalmente como agencia, operador táctico o consultoría
      genérica.
- [ ] El orden de secciones coincide con la arquitectura aprobada.
- [ ] Sanity no puede reordenar secciones ni introducir bloques visuales arbitrarios.
- [ ] Servicio destacado se desactiva mediante ausencia de referencia válida.
- [ ] Evidencia y resultados se omite por completo si no existe material verificable
      suficiente.
- [ ] No hay copy, métricas, casos, clientes o imágenes ficticios.
- [ ] Todo campo obligatorio tiene validación y mensaje editorial comprensible.

### N.2 Servicio destacado

- [ ] Selecciona un Servicio existente mediante referencia a `commercialOffer`.
- [ ] No duplica campos de Servicio.
- [ ] Solo resuelve un Servicio publicado y activo.
- [ ] Omitirla no deja espacios vacíos.
- [ ] Quitarla de Home no retira su página.
- [ ] El enlace apunta a `/servicios/[slug]/` y existe en la exportación.

### N.3 Análisis y contacto

- [ ] Análisis usa artículos publicados destacados existentes.
- [ ] El fallback sin artículos no crea tarjetas falsas.
- [ ] Existe enlace visible a `/analisis/`.
- [ ] Correo y LinkedIn provienen de Site Settings.
- [ ] No existen formularios ni botones comerciales genéricos.

### N.4 Responsive y visual

- [ ] No hay overflow horizontal a partir de `320px`.
- [ ] El orden de lectura móvil coincide con el DOM.
- [ ] La retícula, medidas, espaciado, color y tipografía usan tokens existentes.
- [ ] No se introduce estética de tarjeta para cada bloque.
- [ ] Imágenes reservan espacio y usan proporciones aprobadas.
- [ ] Navegación y enlaces funcionan con touch y teclado.

### N.5 Accesibilidad

- [ ] WCAG 2.2 AA como objetivo mínimo.
- [ ] Skip link y landmarks funcionan.
- [ ] Un solo H1 y headings sin saltos injustificados.
- [ ] Focus visible en toda superficie.
- [ ] Todas las imágenes tienen tratamiento alt correcto.
- [ ] Reduced motion elimina revelados y parallax.
- [ ] Touch targets alcanzan `44 × 44px`.

### N.6 Rendimiento

- [ ] La Home usa Server Components por defecto.
- [ ] JavaScript propio de interacción no supera `30KB gzip`.
- [ ] No se instala una librería visual sin justificación.
- [ ] LCP, CLS e INP cumplen los objetivos definidos.
- [ ] Lighthouse alcanza los umbrales de revisión.
- [ ] Una sola imagen se trata como candidata prioritaria a LCP.
- [ ] No existe contenido oculto dependiente de hidratación.
- [ ] Revelados y parallax solo se incorporan en Fase 4C después de aprobar la
      composición.

### N.7 SEO y exportación

- [ ] Metadata, canonical y Open Graph usan datos aprobados.
- [ ] JSON-LD representa solo datos visibles y verificables.
- [ ] Home y enlaces internos existen en HTML inicial.
- [ ] `output: "export"` permanece activo.
- [ ] El build sin credenciales reales es predecible.
- [ ] Canonicals de Servicios utilizan `/servicios/[slug]/`.
- [ ] El release no publica una Home incompleta por confundir fallback técnico con
      contenido aprobado.
- [ ] `npm run lint`, `npm run typecheck`, `npm run format:check` y `npm run build`
      terminan sin errores al implementar.

---

## O. Alcance de complejidad

### O.1 Incluido en V1

- arquitectura y orden estable de la Home;
- H1 y subtítulo administrables desde el singleton Home;
- fallback aprobado para el H1;
- Servicio destacado mediante una referencia opcional;
- Evidencia y resultados como sección completamente opcional;
- estados hover, indicadores de enlace, focus visible, transición del menú y escala
  discreta de imágenes enlazadas;
- responsive, accesibilidad, fallbacks y HTML inicial completo;
- enlace a `/servicios/[slug]/`.

### O.2 Fase 4C, después de composición y contenido

- revelado discreto de grupos principales;
- un único parallax en un visual decorativo de Ecosistema e integración;
- pruebas de Lighthouse, fluidez, CLS, reduced motion y accesibilidad antes de
  conservar cualquier movimiento.

### O.3 Pospuesto hasta existir necesidad real

- índice `/servicios/`, hasta contar con al menos dos servicios permanentes publicados;
- incorporación de servicios permanentes a navegación;
- campos SEO propios de Home si los defaults de Site Settings resultan suficientes;
- sistemas de animación o dependencias visuales;
- comportamiento editorial adicional que convierta el singleton Home en page builder.

---

## P. Decisiones editoriales pendientes

Estas decisiones no son requisitos aprobados y deben resolverse antes de publicar:

1. subtítulo definitivo del Hero;
2. headings, eyebrows, introducciones y textos de enlace de todas las secciones;
3. contenido verificable para Evidencia y resultados, incluidas fuentes;
4. datos y redacción aprobados de CCV y experiencia;
5. heading y copy de Especialización y contexto;
6. heading e introducción de Análisis;
7. instrucción de contacto;
8. navegación definitiva y etiquetas de anclas;
9. imágenes, crops, alt text e imagen social global;
10. metadata, canonical base y datos estructurados reales;
11. política editorial para artículos `noindex` dentro de módulos destacados;
12. si la Home necesita campos SEO propios o hereda los defaults de Site Settings;
13. criterio de release cuando Sanity no tenga contenido obligatorio;
14. qué visual decorativo concreto de Ecosistema e integración será apto para el
    parallax de Fase 4C.

---

## Referencias técnicas

- Next.js, exportación estática:
  <https://nextjs.org/docs/app/guides/static-exports>
- Sanity, validación:
  <https://www.sanity.io/docs/studio/validation>
- Google Search, introducción a datos estructurados:
  <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>
- Google Search, políticas de datos estructurados:
  <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
- Google Search, datos de Organization:
  <https://developers.google.com/search/docs/appearance/structured-data/organization>
- web.dev, Core Web Vitals:
  <https://web.dev/articles/vitals>
- web.dev, LCP: <https://web.dev/articles/lcp>
- web.dev, CLS: <https://web.dev/articles/cls>
- web.dev, INP: <https://web.dev/articles/inp>
- Chrome for Developers, puntuación de Lighthouse:
  <https://developer.chrome.com/docs/lighthouse/performance/performance-scoring>
