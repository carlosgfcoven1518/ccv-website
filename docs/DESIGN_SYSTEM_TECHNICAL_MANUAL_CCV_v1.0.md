# CCV — Manual técnico del sistema de diseño v1.0

**Marca:** CCV — Coven Creative Ventures  
**Proyecto:** covenpr.com  
**Idioma de interfaz:** Español (México)  
**Estado:** Aprobado para orientar la Fase 2  
**Alcance:** Sistema visual y técnico del frontend  
**Documento base:** `CODEX_BUILD_SPEC_CCV_v1.0.md`

---

## 1. Autoridad, alcance y principios del sistema

### 1.1 Autoridad y alcance

Este manual es la fuente de verdad para construir los componentes visuales de
la Fase 2. Traduce la identidad aprobada de CCV a reglas implementables,
reutilizables y verificables.

En caso de conflicto:

1. Prevalecen el copy, las rutas, las restricciones y los requisitos legales
   definidos en `CODEX_BUILD_SPEC_CCV_v1.0.md`.
2. Este manual gobierna las decisiones visuales y de implementación del
   frontend.
3. Una excepción debe documentarse antes de convertirse en un patrón.

Este manual no autoriza contenido nuevo, datos ficticios, esquemas de Sanity,
SEO, tracking, despliegue ni cambios de arquitectura fuera de la Fase 2.

### 1.2 Identidad y posicionamiento

CCV — Coven Creative Ventures se presenta como una firma de dirección e
integración de marketing orientada a resultados comerciales medibles. La
interfaz debe comunicar criterio senior, precisión comercial y capacidad para
coordinar sistemas complejos.

La estética es:

- editorial contemporánea;
- cinematográfica;
- arquitectónica;
- premium;
- sobria sin parecer corporativa genérica;
- contrastada, asimétrica y espaciosa.

### 1.3 Jerarquía visual

La jerarquía se construye, en este orden, mediante:

1. escala tipográfica;
2. contraste entre navy, blanco e imagen;
3. posición y espacio;
4. ancho de columna;
5. peso tipográfico;
6. verde de acento, solo cuando aporta orientación o estado.

No se debe usar color, borde, sombra y tamaño simultáneamente para forzar la
jerarquía de un mismo elemento.

Cada sección debe tener un foco primario. Los elementos secundarios no deben
competir con el encabezado ni con la imagen principal.

### 1.4 Ritmo

El ritmo debe alternar:

- pasajes de lectura contenidos;
- pausas amplias;
- imágenes de escala cinematográfica;
- momentos de alto contraste;
- secuencias editoriales con divisores o numeración.

Las secciones contiguas no deben repetir automáticamente la misma estructura.
La variación debe provenir de la composición, no de ornamentos nuevos.

### 1.5 Densidad

La densidad predeterminada es baja o media:

- una idea dominante por bloque;
- párrafos breves y legibles;
- máximo recomendado de tres bloques conceptuales visibles en paralelo;
- listas extensas presentadas como secuencias, no como tableros de tarjetas.

La densidad puede aumentar en navegación, pies de página y metadatos, siempre
que se mantengan targets táctiles, contraste y separación perceptible.

### 1.6 Contraste

El contraste debe ser deliberado:

- navy sobre blanco u off-white para lectura;
- blanco sobre navy para secciones de énfasis;
- texto sobre imagen únicamente con una zona de lectura estable y contraste
  validado;
- verde reservado para señales pequeñas y enlaces en contextos controlados.

No se usarán contrastes bajos como recurso estético para texto esencial.

### 1.7 Composición editorial

La composición debe:

- favorecer alineaciones compartidas y desplazamientos intencionales;
- usar un grid de 12 columnas como guía, no como obligación visible;
- combinar columnas de lectura con campos de imagen amplios;
- permitir títulos que excedan el ancho del cuerpo sin exceder el contenedor;
- mantener bordes ópticos consistentes;
- alternar simetría local con asimetría global.

La asimetría no significa desalineación accidental. Todo desplazamiento debe
responder al grid, a una línea tipográfica o a una relación con la imagen.

### 1.8 Fotografía e imagen abstracta

Las imágenes aprobadas aportan temperatura y variación cromática. Se usan como
planos editoriales, no como fondos decorativos repetidos.

- Conservar presencia material, escala y profundidad.
- Evitar filtros que uniformen o “tecnologicen” las imágenes.
- No añadir texto dentro del archivo visual.
- No reemplazar los assets aprobados por imágenes de stock.
- Eliminar el glifo inferior derecho mediante recortes derivados.
- No usar más de una imagen dominante por viewport salvo que la composición lo
  justifique.

### 1.9 Criterios contra una estética genérica

Se prohíbe:

- navegación con apariencia de producto SaaS;
- rejillas repetitivas de tarjetas redondeadas;
- sombras difusas como separación predeterminada;
- degradados tecnológicos genéricos;
- ilustraciones de dashboards o métricas inventadas;
- botones de CTA prominentes;
- iconos decorativos sin función;
- píldoras para cada etiqueta;
- bloques centrados por defecto;
- stock corporativo;
- animaciones permanentes o espectaculares;
- verde usado como relleno de grandes superficies sin aprobación adicional.

Antes de agregar un recurso visual, debe responderse: ¿mejora jerarquía,
comprensión, orientación o atmósfera? Si no, debe omitirse.

---

## 2. Tokens de color

### 2.1 Variables CSS canónicas

```css
:root {
  /* Marca */
  --color-navy: #0e1b2c;
  --color-white: #ffffff;
  --color-accent: #01eb2c;

  /* Neutros funcionales */
  --color-off-white: #f7f7f5;
  --color-text: var(--color-navy);
  --color-text-muted: #5f6873;
  --color-line: rgb(14 27 44 / 16%);
  --color-line-strong: rgb(14 27 44 / 32%);

  /* Estados derivados */
  --color-accent-hover: color-mix(
    in srgb,
    var(--color-accent) 82%,
    var(--color-navy)
  );
  --color-accent-active: color-mix(
    in srgb,
    var(--color-accent) 68%,
    var(--color-navy)
  );
  --color-focus-ring: var(--color-accent);
  --color-selection-bg: var(--color-accent);
  --color-selection-text: var(--color-navy);

  /* Alias semánticos */
  --surface-primary: var(--color-white);
  --surface-secondary: var(--color-off-white);
  --surface-inverse: var(--color-navy);
  --text-primary: var(--color-text);
  --text-secondary: var(--color-text-muted);
  --text-inverse: var(--color-white);
  --border-subtle: var(--color-line);
  --border-strong: var(--color-line-strong);
}
```

`color-mix()` solo se usa para estados no esenciales y debe incluir un fallback
directo antes de la declaración cuando el soporte del navegador objetivo lo
requiera.

### 2.2 Colores principales y fondos

| Token                | Valor       | Uso                                      |
| -------------------- | ----------- | ---------------------------------------- |
| `--color-navy`       | `#0e1b2c`   | Texto, fondo inverso, estructura         |
| `--color-white`      | `#ffffff`   | Fondo principal y texto inverso          |
| `--color-accent`     | `#01eb2c`   | Focus, estado activo y acento controlado |
| `--color-off-white`  | `#f7f7f5`   | Alternancia editorial suave              |
| `--color-text-muted` | `#5f6873`   | Texto secundario sobre fondos claros     |
| `--color-line`       | navy al 16% | Divisores sobre fondos claros            |

El off-white, el muted y las líneas son neutros funcionales ya presentes en la
Fase 1. No forman una paleta expresiva independiente.

### 2.3 Reglas de uso del verde

El verde:

- señala focus visible;
- puede marcar el estado actual de navegación;
- puede subrayar o acompañar enlaces editoriales;
- puede aparecer en numeración, microetiquetas o un detalle lineal;
- puede usarse como color de selección de texto;
- nunca sustituye por sí solo una etiqueta textual o semántica.

El verde no debe:

- ocupar más de aproximadamente 10% de un viewport típico;
- usarse como fondo de secciones completas;
- colorear párrafos o titulares largos;
- convertirse en un botón CTA;
- aparecer sobre blanco en texto pequeño cuando no alcance contraste AA;
- competir con la paleta interna de una imagen.

### 2.4 Estados interactivos

Los enlaces de texto deben distinguirse sin depender exclusivamente del color.
El estado predeterminado usa subrayado, cambio de grosor de línea o indicador
direccional.

```css
.link {
  color: inherit;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.2em;
}

.link:hover {
  text-decoration-thickness: 0.14em;
}

.link:focus-visible {
  outline: 0.1875rem solid var(--color-focus-ring);
  outline-offset: 0.25rem;
}
```

Los estados disabled solo aplican a controles funcionales. Deben usar el
atributo nativo `disabled` o `aria-disabled` según corresponda y conservar
legibilidad.

### 2.5 Combinaciones permitidas

- Navy sobre blanco: texto principal.
- Navy sobre off-white: texto principal.
- Blanco sobre navy: texto inverso.
- Navy sobre verde: texto corto, iconos o indicadores.
- Verde sobre navy: acento, focus o texto grande validado.
- Blanco sobre imagen: únicamente con contraste comprobado y overlay navy.
- Navy sobre imagen clara: únicamente con zona de lectura comprobada.

### 2.6 Combinaciones prohibidas

- Verde sobre blanco para cuerpo o texto pequeño.
- Verde sobre off-white para información esencial.
- Texto muted sobre imagen.
- Blanco sobre verde para texto pequeño sin validación específica.
- Colores extraídos de imágenes convertidos en tokens globales sin aprobación.
- Opacidad aplicada al contenedor completo cuando reduzca el contraste del
  texto.

### 2.7 Contraste y accesibilidad

Objetivos mínimos:

- texto normal: relación 4.5:1;
- texto grande: relación 3:1;
- componentes y estados gráficos esenciales: relación 3:1;
- focus visible: claramente perceptible respecto del fondo adyacente.

Se considera texto grande el definido por WCAG, no cualquier texto presentado
como titular. Toda combinación sobre imagen se valida con la parte real más
desfavorable del recorte responsive.

No se crearán tokens globales de éxito, advertencia o error hasta que exista un
caso funcional real. Cuando sean necesarios, deberán cumplir WCAG y no
confundirse con el verde de marca.

---

## 3. Tipografía

### 3.1 Familias, pesos y fallbacks

```css
:root {
  --font-display: 'Syne', 'Arial Black', 'Helvetica Neue', Arial, sans-serif;
  --font-body:
    'Outfit', 'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif;
}
```

| Función                       | Familia | Peso |
| ----------------------------- | ------- | ---- |
| H1, H2, H3                    | Syne    | 700  |
| Cuerpo, navegación, etiquetas | Outfit  | 300  |
| Decorativo de gran escala     | Outfit  | 100  |

Reglas:

- cargar únicamente WOFF2 locales;
- usar `font-display: swap`;
- no solicitar fuentes a Google Fonts ni a terceros;
- no simular pesos ausentes;
- Outfit Thin nunca se usa por debajo de `2.25rem` (36 px);
- los fallbacks se mantienen hasta instalar y verificar los archivos finales.

### 3.2 Escala tipográfica responsive

```css
:root {
  --text-xs: clamp(0.75rem, 0.72rem + 0.12vw, 0.8125rem);
  --text-sm: clamp(0.875rem, 0.84rem + 0.16vw, 0.9375rem);
  --text-body: clamp(1.0625rem, 1.01rem + 0.24vw, 1.25rem);
  --text-lead: clamp(1.25rem, 1.12rem + 0.55vw, 1.625rem);
  --text-h3: clamp(1.5rem, 1.28rem + 0.95vw, 2.125rem);
  --text-h2: clamp(2.25rem, 1.66rem + 2.55vw, 4.5rem);
  --text-h1: clamp(3rem, 1.68rem + 5.65vw, 7.75rem);
  --text-display: clamp(3.5rem, 1.45rem + 8.75vw, 11rem);
}
```

La escala es una referencia canónica. Un componente puede seleccionar un token,
pero no introducir un tamaño arbitrario.

### 3.3 Line-height y tracking

| Estilo     | Line-height | Tracking               |
| ---------- | ----------- | ---------------------- |
| H1         | `0.9–0.98`  | `-0.035em` a `-0.02em` |
| H2         | `0.98–1.05` | `-0.025em` a `-0.01em` |
| H3         | `1.08–1.15` | `-0.015em` a `0`       |
| Lead       | `1.35–1.5`  | `-0.005em` a `0`       |
| Cuerpo     | `1.55–1.7`  | `0`                    |
| Etiqueta   | `1.2–1.4`   | `0.08em–0.14em`        |
| Navegación | `1.2`       | `0.01em–0.04em`        |
| Cita       | `1.15–1.3`  | `-0.015em`             |
| Decorativo | `0.82–0.95` | `-0.04em–-0.015em`     |

Se prohíben valores de line-height menores a `1.5` para cuerpo de lectura
prolongada.

### 3.4 Anchos de lectura

```css
:root {
  --measure-narrow: 45ch;
  --measure-body: 62ch;
  --measure-article: 72ch;
  --measure-wide: 84ch;
}
```

- Cuerpo comercial: ideal de 52–62 caracteres.
- Artículo largo: máximo aproximado de 68–74 caracteres.
- Lead: 40–55 caracteres.
- Titulares: controlar saltos con `text-wrap: balance` y un `max-width`.
- Párrafos: usar `text-wrap: pretty` donde tenga soporte.

### 3.5 Reglas por estilo

#### H1

- Un solo H1 por página.
- Syne Bold, token `--text-h1`.
- Máximo recomendado: 12–16 palabras por bloque visual.
- No centrar por defecto.
- No colorear palabras aisladas de verde como recurso automático.

#### H2

- Syne Bold, token `--text-h2`.
- Introduce una sección sustantiva.
- Puede ocupar de 7 a 10 columnas en desktop.
- Debe conservar jerarquía clara frente al H3.

#### H3

- Syne Bold, token `--text-h3`.
- Se usa en secuencias o subsecciones reales.
- No se reemplaza por texto grande sin semántica.

#### Cuerpo y lead

- Outfit Light.
- `--text-body` para párrafos.
- `--text-lead` para introducciones breves.
- No usar Outfit Thin para lectura.

#### Etiquetas y navegación

- Outfit Light, `--text-xs` o `--text-sm`.
- Mayúsculas solo en eyebrows y etiquetas breves.
- No escribir párrafos completos en mayúsculas.

#### Citas

- Syne Bold u Outfit Light según jerarquía.
- No usar comillas ornamentales gigantes por defecto.
- Mantener atribución semántica cuando exista.

#### Texto decorativo

- Outfit Thin, mínimo 36 px.
- `aria-hidden="true"` cuando repita información visible.
- Nunca contiene información indispensable.

### 3.6 Comportamiento móvil y desktop

- La escala fluida debe evitar saltos bruscos.
- En móvil se prioriza el orden de lectura sobre la composición visual.
- No reducir cuerpo por debajo de 17 px.
- Evitar líneas de titulares de una sola palabra salvo decisión editorial
  intencional.
- En pantallas grandes, limitar el tamaño máximo; no escalar indefinidamente.
- Verificar castellano real, palabras largas y acentos antes de aprobar saltos.

---

## 4. Espaciado

### 4.1 Escala base

La unidad base es `0.25rem` (4 px). Los tokens permitidos son:

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  --space-40: 10rem;

  --gutter-inline: clamp(1.25rem, 3.5vw, 4.5rem);
  --section-block-sm: clamp(4rem, 8vw, 7rem);
  --section-block-md: clamp(5.5rem, 11vw, 10rem);
  --section-block-lg: clamp(7rem, 15vw, 14rem);
}
```

### 4.2 Márgenes y padding de sección

- Sección compacta: `--section-block-sm`.
- Sección estándar: `--section-block-md`.
- Sección de pausa o imagen dominante: `--section-block-lg`.
- Padding lateral: siempre `--gutter-inline` mediante Container.
- No duplicar padding lateral en Container y Section.
- No usar margen superior para compensar un componente mal compuesto.

### 4.3 Separaciones tipográficas

- Eyebrow a heading: `--space-4` a `--space-6`.
- Heading a lead: `--space-6` a `--space-10`.
- Heading a cuerpo: `--space-8` a `--space-12`.
- Entre párrafos: `1em` a `1.4em`.
- Contenido a enlace editorial: `--space-6` a `--space-8`.
- Bloques de una secuencia: `--space-12` a `--space-20`.

### 4.4 Ritmo responsive

Los tokens fluidos gobiernan el ritmo. No se crearán versiones completas
“mobile” y “desktop” de cada espacio si `clamp()` resuelve la transición.

En móvil:

- conservar al menos `--space-16` entre secciones diferenciadas;
- evitar espacios vacíos que oculten la relación entre título y contenido;
- apilar columnas con gaps de `--space-8` a `--space-12`.

En desktop:

- usar espacio para sostener la asimetría;
- evitar que el contenido se disperse más allá de sus líneas de alineación;
- no convertir todos los espacios verticales en `--space-32`.

### 4.5 Regla contra valores arbitrarios

Todo `margin`, `padding` o `gap` debe usar un token. Se permite un valor local
solo para:

- corrección óptica demostrable;
- safe-area del dispositivo;
- borde de 1 px;
- cálculo geométrico documentado.

La excepción debe incluir un comentario breve en el CSS Module.

---

## 5. Layout

### 5.1 Anchos máximos

```css
:root {
  --container-max: 90rem;
  --container-wide: 105rem;
  --container-reading: 72ch;
  --gutter-inline: clamp(1.25rem, 3.5vw, 4.5rem);
}
```

- `standard`: máximo de 90 rem.
- `wide`: máximo de 105 rem para imágenes y composiciones especiales.
- `full`: ancho completo, con contenido interno contenido cuando corresponda.
- `reading`: máximo de 72 ch.

En pantallas ultraanchas, el contenido permanece contenido; el fondo o la
imagen pueden extenderse al viewport.

### 5.2 Contenedor

Patrón canónico:

```css
.container {
  width: min(100% - (2 * var(--gutter-inline)), var(--container-max));
  margin-inline: auto;
}
```

Para evitar problemas de soporte o cálculo, puede implementarse con
`max-width`, `padding-inline` y un wrapper de ancho completo, siempre que la API
permanezca consistente.

### 5.3 Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-row-gap, var(--space-12))
    var(--grid-column-gap, clamp(1rem, 2vw, 2rem));
}
```

Composiciones recomendadas:

- Hero: texto 7 columnas, imagen 5; puede variar a 6/6.
- Texto editorial: inicio en columna 2 o 3, ancho 7–8.
- Imagen dominante: 8–12 columnas.
- Secuencia: índice 2, contenido 7–8, aire restante.
- Cita: 7–10 columnas, desplazada respecto del cuerpo.

No usar grid de 12 columnas en móvil. Los componentes colapsan a una columna y
preservan el orden del DOM.

### 5.4 Breakpoints

```css
/* Compacto: base, menor a 40rem */
@media (min-width: 40rem) {
  /* Intermedio */
}

@media (min-width: 64rem) {
  /* Amplio */
}

@media (min-width: 80rem) {
  /* Editorial extendido */
}
```

Los breakpoints responden al contenido, no a modelos de dispositivo. No se
añadirá un breakpoint nuevo para resolver un único valor aislado; primero se
revisará la composición.

Usar container queries cuando:

- EditorialCard viva en columnas de diferente ancho;
- ImageFrame cambie proporción según su contenedor;
- una composición reusable dependa del espacio asignado y no del viewport.

### 5.5 Asimetría

Permitido:

- columnas de diferente ancho;
- imagen que rebasa un borde interno, sin causar overflow horizontal;
- encabezados desplazados una o dos columnas;
- alternancia izquierda/derecha entre secciones;
- espacio negativo intencional;
- alineación de una cita con un punto distinto al cuerpo.

No permitido:

- offsets en píxeles sin relación con el grid;
- orden visual que contradiga el DOM;
- solapamiento que cubra texto;
- elementos flotantes sin anclaje;
- desalineaciones distintas en bloques equivalentes.

### 5.6 Pantallas pequeñas

- El orden del DOM es el orden de lectura.
- Texto antes que imagen cuando lo exige la especificación.
- Una sola columna por defecto.
- No hay scroll horizontal.
- Los elementos full-bleed deben calcular el viewport sin romper safe areas.
- Navegación móvil usa un control claro y un panel sencillo, no un espectáculo
  full-screen.

---

## 6. Superficies y bordes

### 6.1 Bordes y separadores

```css
:root {
  --border-width: 1px;
  --border-subtle: var(--color-line);
  --border-strong: var(--color-line-strong);
}
```

- Usar líneas horizontales para secuencias, transiciones y metadatos.
- Preferir border-block sobre cajas completas.
- En navy, usar blanco al 18–28% como línea local.
- Un separador nunca sustituye espacio insuficiente.

### 6.2 Radios

```css
:root {
  --radius-none: 0;
  --radius-control: 0.25rem;
  --radius-media: 0;
}
```

La identidad usa bordes rectos. El radio de 4 px se reserva para controles
funcionales cuando mejora el reconocimiento. No se usan tarjetas o imágenes con
radios grandes.

### 6.3 Sombras

No existe una sombra global predeterminada. Las sombras:

- no se usan para elevar tarjetas;
- no se aplican a navegación sticky como patrón automático;
- pueden aparecer solo cuando un overlay funcional necesita separarse de una
  imagen o fondo complejo;
- deben ser sobrias, localizadas y justificadas.

### 6.4 Tarjetas

Usar EditorialCard solo cuando hay una unidad repetible con destino,
metadatos y jerarquía propios, por ejemplo un artículo publicado.

No usar tarjeta para:

- cada párrafo;
- cada etapa del modelo;
- cada servicio;
- citas aisladas;
- contenido que funciona mejor como secuencia o columna editorial.

Una tarjeta no implica borde, fondo, sombra ni radio. Puede ser únicamente una
composición semántica con imagen, metadatos, título y enlace.

---

## 7. Componentes base de la Fase 2

Las APIs son propuestas normativas. Se deben mantener pequeñas, tipadas y
semánticas. No deben aceptar objetos genéricos de “estilos” que permitan eludir
los tokens.

### 7.1 Container

**Propósito:** controlar ancho máximo y gutters horizontales.

```ts
type ContainerProps = {
  children: React.ReactNode;
  as?: 'div' | 'section';
  size?: 'reading' | 'standard' | 'wide' | 'full';
  className?: string;
};
```

**Variantes:** `reading`, `standard` por defecto, `wide`, `full`.

**Responsive:** gutter fluido; ancho limitado en pantallas grandes.

**Accesibilidad:** `as="section"` solo con nombre accesible o heading
relacionado. Container no agrega landmarks por defecto.

**Uso correcto:** envolver el contenido interno de una Section.

**Uso incorrecto:** anidar varios Container para corregir alineaciones o usar
`full` para cuerpo largo.

### 7.2 Section

**Propósito:** representar una región temática y controlar superficie y ritmo
vertical.

```ts
type SectionProps = {
  children: React.ReactNode;
  id?: string;
  as?: 'section' | 'div';
  tone?: 'light' | 'offWhite' | 'navy';
  spacing?: 'compact' | 'standard' | 'spacious';
  labelledBy?: string;
  className?: string;
};
```

**Variantes:** tono y tres niveles de espacio.

**Responsive:** padding vertical fluido.

**Accesibilidad:** usar `section` cuando contenga heading; conectar
`aria-labelledby` mediante `labelledBy`. No agregar `role="region"` a todas.

**Uso correcto:** agrupar una sección aprobada de Home.

**Uso incorrecto:** crear una Section para cada párrafo o aplicar navy solo
como decoración sin jerarquía.

### 7.3 Stack

**Propósito:** organizar elementos verticalmente con gaps tokenizados.

```ts
type StackProps = {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'ol' | 'ul';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'stretch';
  className?: string;
};
```

**Variantes:** cinco gaps mapeados a tokens; `start` por defecto.

**Responsive:** mantiene flujo; el gap puede usar token fluido.

**Accesibilidad:** conservar `ol` o `ul` cuando los hijos sean una lista.

**Uso correcto:** eyebrow, heading y cuerpo como grupo.

**Uso incorrecto:** usar Stack para simular grid o cambiar el orden visual.

### 7.4 Grid

**Propósito:** componer relaciones editoriales de columnas.

```ts
type GridProps = {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'ol' | 'ul';
  layout?: 'equal' | 'textMedia' | 'mediaText' | 'editorial';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
};
```

**Variantes:** patrones aprobados, no número libre de columnas.

**Responsive:** una columna en compacto; composiciones de 12 columnas desde
`64rem` o según container query.

**Accesibilidad:** el DOM mantiene el orden lógico; `mediaText` no debe depender
de `order` si altera lectura.

**Uso correcto:** relación texto/imagen o secuencia editorial.

**Uso incorrecto:** grid de tarjetas genéricas o props como `columns={7}` sin
una necesidad repetible.

### 7.5 Eyebrow

**Propósito:** proporcionar contexto breve antes de un heading.

```ts
type EyebrowProps = {
  children: React.ReactNode;
  as?: 'p' | 'span';
  tone?: 'default' | 'inverse' | 'accent';
  marker?: boolean;
  className?: string;
};
```

**Variantes:** tono; marcador lineal opcional.

**Responsive:** escala pequeña estable; puede envolver, no truncar.

**Accesibilidad:** texto real, no heading; evitar mayúsculas escritas cuando CSS
pueda presentarlas visualmente.

**Uso correcto:** categoría o contexto de sección.

**Uso incorrecto:** párrafos, slogans largos o etiquetas ficticias.

### 7.6 Heading

**Propósito:** aplicar semántica y estilos de jerarquía de forma separada.

```ts
type HeadingProps = {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3';
  size?: 'h1' | 'h2' | 'h3' | 'display';
  tone?: 'default' | 'inverse';
  measure?: 'narrow' | 'standard' | 'wide';
  balance?: boolean;
  id?: string;
  className?: string;
};
```

**Variantes:** nivel semántico explícito y tamaño visual limitado.

**Responsive:** escala `clamp()`; `balance` activado por defecto para H1/H2 si
no perjudica el castellano.

**Accesibilidad:** no saltar niveles; un H1 por página; no usar heading solo por
apariencia.

**Uso correcto:** `as="h2" size="h1"` si una composición justificada requiere
escala mayor conservando jerarquía.

**Uso incorrecto:** elegir `as` por tamaño, insertar saltos `<br>` para forzar
desktop o destacar palabras únicamente con color.

### 7.7 Text

**Propósito:** unificar estilos legibles de cuerpo, lead y metadatos.

```ts
type TextProps = {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'small' | 'body' | 'lead';
  tone?: 'default' | 'muted' | 'inverse';
  measure?: 'narrow' | 'body' | 'article' | 'none';
  className?: string;
};
```

**Variantes:** tamaño, tono y medida.

**Responsive:** cuerpo nunca menor a 17 px; medidas se adaptan al contenedor.

**Accesibilidad:** usar `p` por defecto; `muted` conserva AA.

**Uso correcto:** copy aprobado en párrafos.

**Uso incorrecto:** usar `div` para todos los textos o Outfit Thin en cuerpo.

### 7.8 EditorialLink

**Propósito:** enlaces de contacto, navegación contextual y lectura adicional.

```ts
type EditorialLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: 'inline' | 'standalone' | 'inverse';
  external?: boolean;
  showArrow?: boolean;
  className?: string;
};
```

**Variantes:** inline, standalone e inverse; flecha tipográfica opcional.

**Responsive:** target mínimo de 44 px cuando funcione como elemento aislado;
los enlaces inline respetan el flujo del párrafo.

**Accesibilidad:** focus visible; destino discernible; enlaces externos no
abren nueva pestaña por defecto. Si lo hacen, deben indicarlo.

**Uso correcto:** `mailto:`, LinkedIn y enlaces a Análisis.

**Uso incorrecto:** darle forma de botón CTA, escribir “haz clic aquí” o ocultar
la URL de contacto aprobada cuando debe ser visible.

### 7.9 Navigation

**Propósito:** proporcionar navegación primaria desktop y móvil.

```ts
type NavigationItem = {
  label: string;
  href: string;
};

type NavigationProps = {
  items: readonly NavigationItem[];
  logoVariant?: 'positive' | 'negative';
  currentHref?: string;
  stickyBehavior?: 'afterHero' | 'transition';
};
```

**Variantes:** logo positivo/negativo; comportamiento sticky aprobado.

**Responsive:** lista horizontal amplia; menú compacto accesible en móvil. La
navegación puede requerir un Client Component exclusivamente para el estado del
menú.

**Accesibilidad:** landmark `nav` con nombre; botón con `aria-expanded`,
`aria-controls` y label; Escape cierra; focus se gestiona; navegación por
teclado completa.

**Uso correcto:** enlaces aprobados y logo que vuelve al inicio.

**Uso incorrecto:** menú full-screen espectacular, hamburger sin nombre,
scroll-lock defectuoso o estado activo indicado solo por verde.

### 7.10 Footer

**Propósito:** cerrar la página con identidad, descripción y enlaces aprobados.

```ts
type FooterProps = {
  navigation: readonly NavigationItem[];
  email?: string;
  linkedInUrl?: string;
  logoVariant?: 'positive' | 'negative';
};
```

**Variantes:** una composición principal; ajustes por disponibilidad de
contacto aprobado.

**Responsive:** columnas en amplio, stack en compacto.

**Accesibilidad:** elemento `footer`; navegación secundaria nombrada; enlaces
de contacto descriptivos; orden lógico.

**Uso correcto:** contenido exacto aprobado.

**Uso incorrecto:** newsletter, redes no aprobadas, formulario o sitemap
inventado.

### 7.11 ImageFrame

**Propósito:** controlar proporción, recorte, posición y carga de una imagen.

```ts
type ImageFrameProps = {
  src: string;
  alt: string;
  aspect?: 'source' | 'landscape' | 'editorial' | 'portrait' | 'wide';
  fit?: 'cover' | 'contain';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  priority?: boolean;
  sizes: string;
  decorative?: boolean;
  overlay?: 'none' | 'navySoft' | 'navyStrong';
  className?: string;
};
```

**Variantes:** proporciones y overlays predefinidos.

**Responsive:** puede cambiar `aspect-ratio` mediante container query; usa
derivados y `sizes` reales.

**Accesibilidad:** `alt=""` cuando `decorative`; alt específico cuando aporta
contenido; nunca duplicar caption. `decorative` y alt descriptivo son
incompatibles.

**Uso correcto:** assets abstractos aprobados y recortados sin glifo.

**Uso incorrecto:** `fill` sin contenedor dimensionado, texto rasterizado,
overlay para ocultar un recorte incorrecto o alt promocional genérico.

### 7.12 EditorialCard

**Propósito:** representar una pieza editorial publicada con destino propio.

```ts
type EditorialCardProps = {
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
};
```

**Variantes:** con o sin imagen; featured altera composición, no añade ornamento.

**Responsive:** layout interno mediante container query; stack en ancho
compacto.

**Accesibilidad:** heading con nivel decidido por el contexto; un destino
principal claro; fecha con `dateTime`; imagen con alt adecuado.

**Uso correcto:** artículos reales obtenidos de Sanity.

**Uso incorrecto:** artículos falsos, toda la tarjeta con enlaces anidados,
badges decorativos o card para etapas del modelo comercial.

### 7.13 Quote

**Propósito:** destacar una frase aprobada sin romper la continuidad editorial.

```ts
type QuoteProps = {
  children: React.ReactNode;
  attribution?: string;
  variant?: 'pull' | 'blockquote';
  tone?: 'default' | 'inverse';
  className?: string;
};
```

**Variantes:** `pull` para énfasis del propio texto; `blockquote` para cita con
fuente.

**Responsive:** ancho controlado; escala fluida.

**Accesibilidad:** `blockquote` solo para una cita real; attribution en `cite`
cuando corresponda. Pull quote duplicada puede marcarse `aria-hidden` solo si
el texto completo ya aparece inmediatamente en el DOM.

**Uso correcto:** pull quotes aprobadas en la especificación.

**Uso incorrecto:** inventar atribuciones, añadir comillas decorativas que se
lean o duplicar texto para lectores de pantalla.

### 7.14 Divider

**Propósito:** separar etapas o bloques relacionados de forma sobria.

```ts
type DividerProps = {
  tone?: 'subtle' | 'strong' | 'inverse' | 'accent';
  spacing?: 'sm' | 'md' | 'lg';
  decorative?: boolean;
  className?: string;
};
```

**Variantes:** cuatro tonos; accent solo para usos puntuales.

**Responsive:** ancho del contenedor; espacio tokenizado.

**Accesibilidad:** `<hr>` cuando represente cambio temático; `aria-hidden` y
elemento no semántico cuando sea puramente visual.

**Uso correcto:** secuencia editorial o transición temática real.

**Uso incorrecto:** separar cada párrafo o sustituir jerarquía tipográfica.

### 7.15 Control funcional de utilidad

No existe un componente Button de CTA. Si un control funcional es necesario
—por ejemplo, menú móvil o descartar la intro— debe:

- usar `<button type="button">`;
- tener nombre accesible;
- alcanzar aproximadamente 44 × 44 px;
- mostrar focus visible;
- tener estados hover, active y disabled;
- no parecer un CTA comercial;
- no reutilizarse como enlace.

Una API mínima puede aceptar `children`, `aria-label`, `onClick`, `disabled`,
`aria-expanded` y `aria-controls`. No debe aceptar variantes de marketing.

---

## 8. Movimiento

### 8.1 Principios

El movimiento:

- explica aparición, cambio de estado o relación espacial;
- es breve, reversible y no bloquea contenido;
- conserva la legibilidad durante toda la transición;
- usa CSS antes que JavaScript;
- no retrasa LCP ni interacción;
- se elimina cuando no aporta comprensión.

### 8.2 Tokens

```css
:root {
  --duration-instant: 80ms;
  --duration-fast: 160ms;
  --duration-base: 280ms;
  --duration-slow: 520ms;
  --duration-intro-max: 1200ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### 8.3 Entrada de elementos

- Opacidad de 0 a 1.
- Traslación máxima recomendada: 16–24 px.
- Duración: 280–520 ms.
- Stagger máximo: 60 ms entre elementos y no más de cinco elementos.
- El contenido existe y ocupa espacio antes de animarse.
- Si IntersectionObserver falla, el contenido permanece visible.

### 8.4 Hover y focus

- Enlaces: 160 ms para grosor, color o desplazamiento de indicador de hasta
  4 px.
- Imágenes enlazadas: escala máxima `1.015`; no aplicar en touch ni reduced
  motion.
- Focus aparece de inmediato; no animar su presencia de forma que se retrase.
- No mover bloques completos al hacer hover.

### 8.5 Scroll e intro

- Parallax opcional: máximo 4% de recorrido.
- No usar scroll-jacking.
- No vincular animaciones complejas a cada píxel del scroll.
- La intro dura como máximo 1.2 s, se muestra una vez por sesión y puede
  descartarse con click, tecla o tap.
- La intro no bloquea HTML, indexación ni carga del Hero.

### 8.6 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Además:

- omitir por completo la intro;
- desactivar parallax y escalas;
- mostrar inmediatamente elementos de entrada;
- no depender de una transición para comunicar estado.

### 8.7 Prohibiciones

- loops decorativos;
- autoplay de video;
- fondos en movimiento;
- texto que aparezca carácter por carácter;
- blur prolongado;
- desplazamientos que causen mareo;
- GSAP u otra librería grande para la Fase 2;
- animaciones que oculten contenido por defecto sin fallback.

---

## 9. Imágenes

### 9.1 Assets aprobados

| Uso                   | Nombre derivado         |
| --------------------- | ----------------------- |
| Hero                  | `hero-contracts`        |
| Ecosistema            | `ecosystem-acquisition` |
| Dirección externa     | `external-direction`    |
| Servicios financieros | `financial-services`    |

Los originales permanecen fuera del directorio público. Los derivados no
incluyen el glifo inferior derecho.

### 9.2 Formatos y tamaños

- AVIF como primera opción.
- WebP como fallback.
- PNG original nunca se sirve cuando exista derivado apropiado.
- Anchos objetivo: 640, 960, 1280, 1600 y 1920 px.
- Mantener relación de aspecto declarada para evitar CLS.
- No generar tamaños mayores que la fuente útil.

Ejemplo:

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /images/hero-contracts-640.avif   640w,
      /images/hero-contracts-1280.avif 1280w,
      /images/hero-contracts-1920.avif 1920w
    "
  />
  <source
    type="image/webp"
    srcset="
      /images/hero-contracts-640.webp   640w,
      /images/hero-contracts-1280.webp 1280w,
      /images/hero-contracts-1920.webp 1920w
    "
  />
  <img
    src="/images/hero-contracts-1280.webp"
    alt=""
    width="2048"
    height="1117"
    sizes="(min-width: 80rem) 44vw, (min-width: 64rem) 48vw, 100vw"
  />
</picture>
```

La implementación puede usar `next/image` con `unoptimized` si conserva
derivados, dimensiones y `sizes`. No se depende de un optimizador runtime.

### 9.3 Proporciones

```css
:root {
  --ratio-source: 2048 / 1117;
  --ratio-wide: 16 / 9;
  --ratio-editorial: 4 / 3;
  --ratio-portrait: 3 / 4;
}
```

- Hero: fuente o wide según composición.
- Ecosistema: 4:3 o full-width.
- Dirección externa: fuente o 4:3 como corte de contraste.
- Servicios financieros: horizontal amplio.
- Article card futura: 4:3, solo con contenido real.

### 9.4 Recorte y posicionamiento

- `object-fit: cover` para planos editoriales.
- `object-fit: contain` solo para logos o assets que no admiten recorte.
- Definir `object-position` por asset y breakpoint cuando sea necesario.
- Revisar cada derivado para garantizar que el glifo no aparezca.
- No aplicar el mismo recorte a todas las proporciones.
- No usar transforms para ocultar permanentemente el glifo.

### 9.5 Tratamiento cinematográfico

- Escala amplia.
- Contraste con zonas de espacio negativo.
- Bordes rectos.
- Color original preservado.
- Overlay navy uniforme o direccional solo para legibilidad.
- Overlay recomendado entre 20% y 60%, validado en el recorte real.
- No usar filtros sepia, neón, duotono o gradientes tecnológicos.

### 9.6 Carga responsive

- Preload solo del asset de Hero realmente usado.
- `fetchpriority="high"` únicamente para el LCP.
- `loading="lazy"` debajo del fold.
- `decoding="async"` cuando corresponda.
- `sizes` debe describir el layout real, no usar `100vw` por defecto.
- Establecer width/height o `aspect-ratio`.

### 9.7 Texto alternativo

- Imágenes abstractas decorativas: `alt=""`.
- Imagen editorial informativa: descripción específica y neutral.
- No comenzar con “imagen de”.
- No repetir el caption.
- No incluir keywords promocionales.
- Logo enlazado: el enlace debe tener nombre “CCV — Inicio”; el alt se ajusta
  para evitar duplicación.

### 9.8 Texto dentro de imágenes

Se prohíbe:

- rasterizar H1, H2, cifras o instrucciones;
- inventar textos, etiquetas o logotipos dentro del asset;
- depender de texto generado por IA en una imagen;
- usar una imagen como sustituto de HTML indexable.

Todo texto visible debe ser HTML real salvo el logotipo aprobado.

---

## 10. Accesibilidad

### 10.1 Objetivo

Cumplir WCAG 2.2 AA y alcanzar 95+ en la evaluación de accesibilidad de
Lighthouse, sin tratar la puntuación automática como sustituto de pruebas
manuales.

### 10.2 Navegación por teclado

- Todo control funciona con teclado.
- El orden de focus sigue el DOM.
- No usar `tabindex` positivo.
- Escape cierra menú e intro cuando estén abiertos.
- El focus no queda atrapado salvo en un modal real.
- Al cerrar un overlay, el focus regresa al control que lo abrió.

### 10.3 Focus visible

```css
:focus-visible {
  outline: 0.1875rem solid var(--color-focus-ring);
  outline-offset: 0.25rem;
}
```

- No eliminar outline sin reemplazo.
- En fondo verde, usar un anillo navy o combinación de doble anillo.
- El focus no debe quedar cortado por `overflow: hidden`.

### 10.4 Semántica

- Un H1 por página.
- Jerarquía H2/H3 ordenada.
- `header`, `nav`, `main`, `section`, `article`, `aside` y `footer` según su
  función real.
- Listas reales para secuencias y navegación.
- Botón para acciones; enlace para navegación.
- `aria-*` solo cuando HTML nativo no sea suficiente.

### 10.5 Skip link

Debe ser el primer enlace focusable:

```html
<a class="skipLink" href="#main-content">Ir al contenido principal</a>
```

Permanece fuera de vista hasta focus y se muestra con contraste suficiente. El
destino `main` debe existir una sola vez.

### 10.6 Contraste

- Aplicar los mínimos de la sección 2.7.
- Validar hover, active, focus y disabled.
- Validar texto sobre cada recorte responsive.
- No comunicar estado únicamente mediante verde.

### 10.7 Movimiento

- Respetar `prefers-reduced-motion`.
- Intro omitida en reduced motion.
- No desplazar grandes áreas inesperadamente.
- Los controles de pausa son obligatorios si se introduce movimiento continuo;
  la Fase 2 no debe introducirlo.

### 10.8 Targets táctiles

- Aproximadamente 44 × 44 CSS px para controles aislados.
- Los enlaces inline pueden mantener su caja tipográfica natural.
- Separación suficiente entre destinos contiguos.
- El botón del menú debe conservar el target aunque el icono sea menor.

### 10.9 Lectura móvil

- Texto de cuerpo mínimo de 17 px.
- Zoom no bloqueado.
- Sin scroll horizontal a 320 px.
- Sin texto truncado para contenido esencial.
- Orientación vertical y horizontal funcional.
- Safe areas respetadas en overlays y navegación sticky.

### 10.10 Pruebas manuales mínimas

- Recorrido completo con Tab y Shift+Tab.
- Activación con Enter y Space según control.
- Escape en menú e intro.
- VoiceOver en Safari o lector equivalente.
- Zoom al 200%.
- Reflow a 320 CSS px.
- Reduced motion.
- Modo de alto contraste cuando esté disponible.

---

## 11. Performance

### 11.1 Presupuestos y objetivos

Objetivos de producción:

- Lighthouse Performance: 90+ móvil, 95+ desktop;
- Accessibility, Best Practices y SEO: 95+;
- LCP menor a 2.5 s;
- CLS menor a 0.1;
- INP menor a 200 ms.

Presupuestos recomendados para Fase 2:

- JavaScript propio de interacción inicial: idealmente menor a 30 KB gzip;
- cero librerías visuales nuevas;
- cero frameworks de animación;
- máximo tres archivos WOFF2 críticos;
- Hero responsive servido lo más cerca posible del tamaño de presentación;
- ninguna imagen below-the-fold cargada eager;
- cero requests de fuentes o imágenes a terceros.

Los presupuestos deben evaluarse con el build real; no son autorización para
degradar los objetivos Core Web Vitals.

### 11.2 CSS

- CSS global para reset, fuentes, tokens y estilos base.
- CSS Modules para componentes y composiciones.
- Evitar selectores profundos y alta especificidad.
- Eliminar reglas no usadas al retirar componentes.
- Preferir Grid, Flexbox y container queries.
- No incorporar runtime CSS-in-JS al frontend.

### 11.3 Fuentes

- WOFF2 locales.
- Subsets solo si preservan español, puntuación y símbolos necesarios.
- `font-display: swap`.
- Preload únicamente Syne Bold y Outfit Light si son realmente críticos.
- Outfit Thin no se preloads por defecto.
- Verificar CLS al cambiar de fallback a fuente final.

### 11.4 Imágenes

- Derivados AVIF/WebP.
- Dimensiones o aspect ratio obligatorios.
- Hero prioritario; resto lazy.
- Evitar imágenes CSS cuando necesitan semántica o responsive sources.
- No usar base64 para imágenes grandes.

### 11.5 JavaScript

- Server Components por defecto.
- Client Components solo para menú, intro e IntersectionObserver.
- Utilidad de reveal compartida, pequeña y con fallback.
- No hidratar secciones estáticas.
- No instalar estado global.
- No usar JavaScript para layout que CSS puede resolver.

### 11.6 Animaciones

- `transform` y `opacity` como propiedades principales.
- Evitar animar `width`, `height`, `top` o filtros pesados.
- No promover indiscriminadamente capas con `will-change`.
- Desregistrar observers cuando termina la animación.

### 11.7 Exportación estática

Toda implementación debe funcionar con:

```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
```

Se prohíben:

- route handlers;
- middleware;
- Server Actions;
- optimización de imágenes runtime;
- lectura de secretos en el navegador;
- APIs que requieran servidor Next.js en producción.

El build debe producir `apps/web/out/` sin errores TypeScript.

---

## 12. Convenciones de implementación

### 12.1 Estructura recomendada para Fase 2

```text
apps/web/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Container/
│   │   │   ├── Container.module.css
│   │   │   ├── Container.tsx
│   │   │   └── index.ts
│   │   ├── Grid/
│   │   ├── Section/
│   │   └── Stack/
│   ├── navigation/
│   │   ├── Footer/
│   │   └── Navigation/
│   ├── typography/
│   │   ├── Eyebrow/
│   │   ├── Heading/
│   │   └── Text/
│   └── editorial/
│       ├── Divider/
│       ├── EditorialCard/
│       ├── EditorialLink/
│       ├── ImageFrame/
│       └── Quote/
├── lib/
│   └── motion/
└── public/
    ├── brand/
    ├── fonts/
    └── images/
```

Crear únicamente carpetas que tengan una implementación real. No generar
barrels globales que oculten dependencias o introduzcan ciclos.

### 12.2 Nombres

- Componentes: PascalCase.
- Archivos de componente: `ComponentName.tsx`.
- CSS Module: `ComponentName.module.css`.
- Hooks: `useDescriptiveName.ts`.
- Utilidades: camelCase.
- Tokens CSS: kebab-case semántico.
- Props booleanas: prefijos `is`, `has`, `show` o un significado verbal claro.
- Assets: minúsculas, guiones y sufijo de ancho/formato.

### 12.3 Estrategia CSS

Global:

- `@font-face`;
- reset mínimo;
- tokens;
- estilos de `html`, `body`, selección y focus base;
- utilidades de accesibilidad estrictamente globales.

CSS Modules:

- estilos de componente;
- variantes mediante `data-*` o clases explícitas;
- media y container queries locales;
- composición específica.

No usar:

- estilos inline para valores permanentes;
- selectores por estructura frágil;
- `!important`, salvo override de reduced motion documentado;
- valores mágicos;
- duplicación de tokens en módulos.

### 12.4 Variables CSS

- Definir tokens globales en `:root`.
- Usar alias semánticos para superficies y texto.
- Un token nuevo requiere al menos dos usos previstos o una necesidad global
  inequívoca.
- Los valores específicos de una imagen pueden ser variables locales del
  componente.
- No exponer props para cada variable CSS.

### 12.5 TypeScript

- `strict: true`.
- No usar `any`.
- Props con uniones cerradas.
- `React.ReactNode` para composición.
- Enlaces y listas inmutables cuando sea práctico.
- No duplicar tipos equivalentes.
- Componentes Server por defecto; `'use client'` en el límite más pequeño
  posible.

### 12.6 Composición

- Preferir children y primitivas pequeñas.
- Section compone Container; no debe duplicar toda su API.
- Heading separa nivel semántico y tamaño.
- Las secciones de Home pueden tener componentes propios cuando su composición
  no sea reusable.
- No convertir cada fragmento de copy en un componente.
- No crear un “mega componente” con docenas de variantes.

### 12.7 Dependencias

No instalar:

- UI kits;
- librerías de componentes;
- frameworks CSS;
- librerías de animación;
- paquetes de iconos completos;
- CSS-in-JS para el frontend;
- utilidades que repliquen unas pocas líneas de código estable.

Una dependencia nueva requiere:

- necesidad que no pueda resolverse razonablemente con plataforma o stack;
- compatibilidad con Server Components y exportación estática;
- revisión de peso, mantenimiento, licencia y seguridad;
- documentación en el commit correspondiente.

### 12.8 Valores mágicos

Todo valor repetido de color, espacio, duración, medida, radio o ancho debe
provenir de un token. Las correcciones ópticas locales deben:

1. ser específicas;
2. incluir comentario;
3. no repetirse en varios módulos;
4. elevarse a token solo si se convierten en patrón.

### 12.9 Contenido

- El copy aprobado se conserva exactamente.
- No agregar CTA buttons.
- No usar “agencia”, “freelance” ni sinónimos prohibidos en copy visible.
- No crear artículos, cifras, testimonios, logos o casos ficticios.
- Los placeholders técnicos no se muestran públicamente.
- El texto no se inserta en imágenes.

---

## 13. Criterios de aceptación de la Fase 2

### 13.1 Alcance y contenido

- [ ] Solo se implementó el alcance aprobado de la Fase 2.
- [ ] Todas las secciones de Home aprobadas están presentes.
- [ ] El copy visible coincide con la especificación.
- [ ] No hay contenido ficticio.
- [ ] No hay CTA buttons comerciales.
- [ ] No aparecen términos prohibidos.
- [ ] No se adelantaron Sanity, SEO, tracking o despliegue.

### 13.2 Consistencia visual

- [ ] Navy, blanco y off-white estructuran la página.
- [ ] El verde se usa de manera limitada y funcional.
- [ ] No hay colores arbitrarios.
- [ ] Syne Bold, Outfit Light y Outfit Thin cumplen sus roles.
- [ ] Outfit Thin no aparece por debajo de 36 px.
- [ ] Espaciado, medidas y duraciones usan tokens.
- [ ] La composición es editorial y asimétrica con alineaciones verificables.
- [ ] No hay estética SaaS, stock corporativo ni tarjetas sistemáticas.
- [ ] Bordes, radios y sombras cumplen este manual.

### 13.3 Componentes

- [ ] Las primitivas implementadas tienen APIs tipadas y pequeñas.
- [ ] Los componentes usan semántica HTML correcta.
- [ ] No existen variantes o props sin uso real.
- [ ] No hay duplicación sustancial de layout o estilos.
- [ ] Navigation funciona en desktop y móvil.
- [ ] Footer contiene únicamente destinos aprobados.
- [ ] No existe un Button de CTA principal.

### 13.4 Responsive

- [ ] No hay scroll horizontal desde 320 px.
- [ ] El orden visual coincide con el DOM.
- [ ] El Hero apila texto antes de imagen en móvil.
- [ ] Las composiciones cambian por contenido, no por dispositivo específico.
- [ ] Los gutters y espacios usan `clamp()`.
- [ ] El contenido permanece contenido en pantallas ultraanchas.
- [ ] Las imágenes usan recortes correctos en compacto, intermedio y amplio.

### 13.5 Imágenes

- [ ] Se usan exclusivamente los cuatro assets aprobados.
- [ ] Ningún derivado contiene el glifo inferior derecho.
- [ ] Existen AVIF y WebP en anchos apropiados.
- [ ] Todas las imágenes tienen dimensiones o aspect ratio.
- [ ] Solo el Hero necesario usa prioridad.
- [ ] Las imágenes below-the-fold son lazy.
- [ ] `sizes` refleja el layout real.
- [ ] Alt vacío o descriptivo según función.
- [ ] No existe texto rasterizado o inventado.

### 13.6 Accesibilidad

- [ ] Existe skip link funcional.
- [ ] Hay un solo H1 y jerarquía ordenada.
- [ ] Navegación completa por teclado.
- [ ] Focus visible en todos los controles y enlaces.
- [ ] El menú móvil anuncia y gestiona su estado.
- [ ] Targets táctiles alcanzan aproximadamente 44 × 44 px cuando aplica.
- [ ] Las combinaciones alcanzan WCAG 2.2 AA.
- [ ] El texto sobre imagen se validó en todos los recortes.
- [ ] Reduced motion omite intro, parallax y reveals.
- [ ] La página funciona con zoom al 200% y reflow a 320 px.
- [ ] Se realizó una prueba básica con lector de pantalla.

### 13.7 Movimiento

- [ ] La intro dura como máximo 1.2 s.
- [ ] La intro aparece una vez por sesión y se puede descartar.
- [ ] El contenido existe debajo de la intro y no se bloquea.
- [ ] Los reveals tienen fallback visible.
- [ ] No hay loops, scroll-jacking o animaciones excesivas.
- [ ] Hover no altera layout ni reduce legibilidad.

### 13.8 Calidad técnica

- [ ] TypeScript pasa sin errores.
- [ ] ESLint pasa sin errores ni warnings.
- [ ] Prettier pasa.
- [ ] `git diff --check` pasa.
- [ ] La exportación estática termina sin errores.
- [ ] `apps/web/out/404.html` existe.
- [ ] No hay rutas de servidor, middleware o Server Actions.
- [ ] No hay secretos en el repositorio o bundle.
- [ ] No hay valores mágicos repetidos.

### 13.9 Performance

- [ ] No se añadieron dependencias visuales innecesarias.
- [ ] Los componentes estáticos permanecen como Server Components.
- [ ] El JavaScript cliente se limita a interacción real.
- [ ] Las fuentes son WOFF2 locales con `font-display: swap`.
- [ ] Solo se preloads recursos realmente críticos.
- [ ] No hay tracking o requests externos.
- [ ] LCP, CLS e INP se miden con un build de producción.
- [ ] Las desviaciones de objetivos se documentan antes de aprobar la fase.

### 13.10 Revisión final

- [ ] Chrome, Safari, Firefox y Edge actuales funcionan.
- [ ] iOS Safari y Android Chrome funcionan.
- [ ] La Home no parece una plantilla SaaS ni una agencia digital convencional.
- [ ] La implementación puede trazarse a este manual y a la especificación.
- [ ] Toda excepción está documentada.

---

## 14. Matriz de trazabilidad y control de cambios

### 14.1 Trazabilidad

| Área                    | Fuente normativa                             |
| ----------------------- | -------------------------------------------- |
| Marca y posicionamiento | Decisiones aprobadas y Build Spec §§0–1      |
| Paleta                  | Decisiones aprobadas, Build Spec §5 y Fase 1 |
| Tipografía              | Build Spec §§4–5 y Fase 1                    |
| Composición             | Build Spec §§5–7                             |
| Movimiento              | Build Spec §§6, 11–12                        |
| Imágenes                | Build Spec §§4, 7, 11–12                     |
| Componentes             | Este manual §7                               |
| Accesibilidad           | Build Spec §11 y este manual §10             |
| Performance             | Build Spec §12 y este manual §11             |
| Implementación          | Build Spec §3 y este manual §12              |
| Aceptación              | Build Spec §§15–16 y este manual §13         |

### 14.2 Decisiones resueltas por esta versión

1. El verde `#01eb2c` es un acento aprobado y controlado, no un fondo
   estructural.
2. Off-white, muted y line son neutros funcionales, no una expansión arbitraria
   de marca.
3. Los breakpoints de referencia son 40, 64 y 80 rem; las container queries se
   prefieren cuando la decisión depende del componente.
4. El grid editorial usa 12 columnas en pantallas amplias y una columna en
   compacto.
5. La exportación estática usa derivados preconstruidos; no depende de
   optimización runtime.
6. Los fallbacks tipográficos permanecen hasta integrar y verificar WOFF2.
7. No hay un componente Button de marketing.

### 14.3 Control de cambios

| Versión | Estado                 | Cambio                                 |
| ------- | ---------------------- | -------------------------------------- |
| 1.0     | Aprobado para revisión | Definición inicial del sistema técnico |

Toda modificación posterior debe:

- conservar el número de versión anterior en Git;
- describir la razón y el impacto;
- identificar tokens, componentes y criterios afectados;
- evitar cambios silenciosos durante la implementación;
- recibir revisión antes de considerarse fuente de verdad.
