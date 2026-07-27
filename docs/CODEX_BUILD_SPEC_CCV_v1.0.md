# CCV — Build Specification v1.0

**Project:** covenpr.com  
**Repository owner:** `carlosgfcoven1518`  
**Primary contact:** `carlos@covenpr.com`  
**LinkedIn:** `https://www.linkedin.com/in/carlosgallegosflores/`  
**Language:** Spanish (Mexico)  
**Status:** Approved for implementation  

---

## 0. Operating instruction for Codex

Read this entire specification before writing code. Build the project in small, reviewable commits. Do not substitute approved copy, visual direction, URLs, terminology, or architecture without explicit approval.

The website must feel editorial, senior, contemporary, and commercially precise. It must not look like a generic marketing template, a fintech landing page, or a corporate stock-photo site.

### Non-negotiable language

- H1: **Marketing que produce contratos.**
- Preferred category: **Dirección e integración de marketing.**
- Search category: **Dirección externa de marketing.**
- Vertical: **Marketing para servicios financieros.**
- Use **marketing digital** instead of “performance” or “desempeño” when referring to that capability.
- In visible copy, do not use “agencia”, “freelance”, or synonyms that define CCV by comparison with those categories.
- Do not add CTA buttons. Contact is expressed through direct text links and exact instructions.
- The editorial archive is called **Análisis**, never “Blog”.

---

## 1. Project objective

Build a fast, accessible, indexable website that:

1. Establishes CCV as a firm of direction and integration of marketing.
2. Competes organically for **dirección externa de marketing**.
3. Demonstrates specialization in financial services, IFNBs, fintech, leasing, credit and B2B operations.
4. Converts interest into direct contact through email and LinkedIn.
5. Allows Carlos Gallegos to publish articles, methodologies, perspectives and anonymized cases through a private editorial panel.
6. Supports progressive growth without rebuilding the site.

No ranking position may be guaranteed. The implementation must maximize technical quality, content clarity, crawlability, authority signals and user experience.

---

## 2. Approved architecture

### Public routes at launch

- `/` — Commercial Home, one continuous page.
- `/analisis/` — Editorial archive.
- `/analisis/[slug]/` — Published article, methodology, perspective or anonymized case.
- `/aviso-de-privacidad/` — Integral privacy notice.
- `/404.html` — Custom static 404.

### SEO pillar routes to build as templates

- `/direccion-externa-marketing/`
- `/marketing-servicios-financieros/`

These pillar routes must not be included in the sitemap or navigation until each has unique, approved copy. Do not publish duplicated or thin content.

### Anchor navigation on Home

- `#direccion-marketing`
- `#ecosistemas`
- `#modelo`
- `#ccv`
- `#servicios-financieros`
- `#resultados`
- `#experiencia`
- `#analisis`
- `#contacto`

The logo returns to the top of the Home.

---

## 3. Technology stack

### Web

- Next.js, latest stable version compatible with this specification.
- App Router.
- TypeScript with strict mode.
- Static export using `output: 'export'`.
- `trailingSlash: true` for cPanel-compatible directory routes.
- No server routes, middleware, server actions or runtime dependencies that cannot work in a static export.
- Prefer semantic React Server Components. Add client components only for interaction that genuinely requires browser APIs.

### Styling

- Modern CSS with CSS Modules and global design tokens.
- Avoid a large UI framework.
- Avoid template-like component libraries.
- Use CSS Grid and Flexbox.
- Use container queries where they improve responsive behavior.

### Motion

- Prefer CSS transitions and a small IntersectionObserver utility.
- Do not add GSAP or a large animation framework for launch.
- All effects must respect `prefers-reduced-motion`.

### Content

- Sanity Studio, hosted on Sanity-managed hosting.
- Sanity Content Lake as the editorial source.
- Official Sanity client and Portable Text renderer.

### Repository

Recommended monorepo structure:

```text
ccv-website/
├── apps/
│   ├── web/
│   └── studio/
├── docs/
│   ├── CODEX_BUILD_SPEC_CCV_v1.0.md
│   └── copy-home-approved.md
├── .github/
│   └── workflows/
├── package.json
├── package-lock.json
└── README.md
```

Use npm workspaces unless a materially better reason is documented.

---

## 4. Brand assets

The owner will add the following local assets to the repository. Do not source substitutes.

### Logos

- Positive logo SVG: source file `1.svg`
- Negative logo SVG: source file `2.svg`

Rename in repository:

```text
apps/web/public/brand/ccv-logo-positive.svg
apps/web/public/brand/ccv-logo-negative.svg
```

### Fonts

- Syne Bold — headings.
- Outfit Light — body and navigation.
- Outfit Thin — large decorative type only; never small body copy.

Load locally with `next/font/local` or standards-compliant `@font-face`. Provide WOFF2 derivatives for production. Do not fetch fonts from third-party CDNs.

### Approved image system

Four approved abstract editorial images exist at 2048 × 1117. Create optimized derivatives and rename:

1. `Gemini_Generated_Image_sb7xlhsb7xlhsb7x.png` → `hero-contracts`
2. `Gemini_Generated_Image_rw9rwwrw9rwwrw9r.png` → `ecosystem-acquisition`
3. `Gemini_Generated_Image_nlhj7nnlhj7nnlhj.png` → `external-direction`
4. `Gemini_Generated_Image_80et7h80et7h80et.png` → `financial-services`

**Important:** each source includes a small corner glyph in the lower-right area. Produce clean crops/derivatives that exclude it. Never publish the glyph.

Generate AVIF and WebP derivatives at appropriate widths, for example 640, 960, 1280, 1600 and 1920 px. Preserve the source files outside the public production folder.

---

## 5. Visual system

### Core colors

```css
--navy: #0e1b2c;
--white: #ffffff;
--off-white: #f7f7f5;
--text: #0e1b2c;
--muted: #5f6873;
--line: rgba(14, 27, 44, 0.16);
```

The approved images provide the wider accent palette. Do not introduce arbitrary brand colors. The site should use navy and white as the stable structure, with image color supplying warmth and variation.

### Typography

- Display / H1 / H2: Syne Bold.
- Body / labels / navigation: Outfit Light.
- Decorative oversized fragments only: Outfit Thin.
- Do not use Outfit Thin below 36 px.
- Body copy target: 18–21 px desktop; 17–19 px mobile.
- Long-form article body: maximum readable line length of approximately 68–74 characters.

### Composition

- Editorial, asymmetrical, spacious.
- Large type and disciplined negative space.
- Alternate white editorial sections with full-width or large image moments.
- Avoid card grids unless the content genuinely requires them.
- Avoid rounded “SaaS cards”, gradient buttons and decorative dashboards.
- Navigation must be quiet and compact.

---

## 6. Intro animation

Retain the concept of the current covenpr.com entry animation, rebuilt cleanly.

Requirements:

- Full-screen navy overlay.
- Negative CCV mark or typographic mark.
- Maximum total duration: 1.2 seconds.
- Content loads underneath; animation must not block HTML rendering or indexing.
- Show once per browser session using `sessionStorage`.
- Skip entirely for `prefers-reduced-motion: reduce`.
- User may dismiss immediately with click, keypress or tap.
- Do not delay Largest Contentful Paint for the hero.

---

## 7. Home structure and visual treatment

### 7.1 Header

- Positive or negative logo depending on background.
- Desktop nav: Dirección de marketing · IFNBs y fintech · Análisis · CCV · Contacto.
- Mobile: accessible menu button; no animated full-screen spectacle.
- Sticky after the hero or use a transparent-to-white transition.
- Contact links are text links, not button shapes.

### 7.2 Hero — `#top`

**Eyebrow:** DIRECCIÓN E INTEGRACIÓN DE MARKETING  
**H1:** Marketing que produce contratos.

**Copy:**

CCV diseña y dirige estrategias integradas de adquisición multicanal para productos financieros de largo plazo.

Coordinamos investigación, comunicación, medios, marketing digital, reputación y seguimiento comercial bajo una sola dirección. El objetivo es convertir demanda en colocaciones efectivas y medir el valor que cada relación genera durante su vigencia.

**Closing line:** Adquisición eficiente. Canales integrados. Valor comercial de largo plazo.

**Visual:** use `hero-contracts` as a wide visual plane. The text must remain real HTML. Do not place text inside the image.

Recommended desktop layout: text occupies approximately 55–60% width; visual plane occupies the remaining area or sits behind with controlled contrast. Mobile stacks text before image.

### 7.3 One direction — `#direccion-marketing`

**H2:** Convertimos demanda en colocación.

Las empresas pueden contar con equipos internos, especialistas, plataformas, campañas y canales activos. El problema aparece cuando cada parte trabaja con prioridades, métricas y tiempos distintos.

CCV establece una sola dirección para conectar los objetivos del negocio con cada decisión de marketing. Definimos prioridades, coordinamos las capacidades necesarias y evaluamos el marketing digital por su contribución comercial.

Ordenamos el sistema para que investigación, estrategia, comunicación, medios, marketing digital y ventas trabajen hacia el mismo resultado.

Treatment: large white text section. Use a restrained horizontal rule or oversized typographic marker; no image is required.

### 7.4 Acquisition ecosystems — `#ecosistemas`

**H2:** La confianza no la produce una pieza aislada. La produce la consistencia del conjunto.

Una decisión financiera de largo plazo rara vez se toma después de ver un anuncio.

La persona investiga, compara, consulta el sitio, revisa la reputación de la empresa, habla con un asesor, evalúa las condiciones y busca señales que confirmen que está tomando una buena decisión.

**Emphasis:** Por eso construimos ecosistemas de adquisición.

Integramos publicidad, contenido, presencia digital, comunicación financiera, reputación, experiencia comercial y seguimiento dentro de un mismo sistema. Cada punto de contacto sostiene la misma promesa y ayuda a conducir la relación hacia un compromiso formal.

**Pull quote:** Cada canal cumple una función. Todos responden al mismo sistema.

Visual: `ecosystem-acquisition`, large 4:3 or full-width crop. Optional very light parallax, maximum 4% travel.

### 7.5 External direction model — `#modelo`

**H2:** Tomamos responsabilidad sobre el conjunto.

CCV funciona como una dirección externa de marketing para empresas que necesitan criterio senior, capacidad de ejecución y control sobre una operación formada por distintos equipos y especialistas.

Render five stages as an editorial sequence, not SaaS cards:

1. **Diagnóstico** — Analizamos el negocio, el producto, la audiencia, la inversión, el proceso comercial y los resultados actuales para identificar dónde se está perdiendo valor.
2. **Estrategia** — Definimos el problema que marketing debe resolver, las prioridades, los segmentos, la propuesta comercial y los indicadores que permitirán evaluar el marketing digital.
3. **Integración** — Coordinamos equipos internos, medios, creatividad, contenido, tecnología, reputación y marketing digital bajo una misma dirección.
4. **Ejecución** — Supervisamos el trabajo, tomamos decisiones, corregimos desviaciones y activamos las capacidades necesarias para llevar la estrategia al mercado.
5. **Medición** — Relacionamos la actividad de marketing con prospectos calificados, colocaciones, costo de adquisición, conversión, rentabilidad y valor de vida del cliente.

Visual: `external-direction`, used as a contrasting image break adjacent to or after the sequence.

### 7.6 What CCV is — `#ccv`

**H2:** CCV reúne y dirige las capacidades que cada objetivo comercial requiere.

CCV es una firma de dirección e integración de marketing. Establecemos una sola dirección sobre investigación, estrategia, comunicación, medios, marketing digital, reputación y operación comercial.

Para cada proyecto configuramos un equipo a la medida, formado por especialistas seleccionados de acuerdo con el problema que debe resolverse. Definimos responsabilidades, coordinamos el trabajo y evaluamos el resultado como un sistema completo.

La estructura puede cambiar de un proyecto a otro. La responsabilidad sobre la dirección permanece.

**Pull quote:** Una sola dirección. Las capacidades adecuadas para cada proyecto.

Treatment: navy background, white text, no image required. Use the negative logo subtly.

### 7.7 Specialization — `#servicios-financieros`

**H2:** Adquisición eficiente de clientes para productos financieros de largo plazo.

En servicios financieros, generar prospectos es solamente una parte del proceso.

El marketing debe atraer a las personas correctas, explicar productos complejos, construir confianza, coordinarse con ventas y contribuir a producir solicitudes calificadas, contratos y colocaciones.

CCV diseña y dirige estrategias para instituciones financieras no bancarias, fintech, arrendadoras, empresas de crédito, factoraje y organizaciones B2B con procesos comerciales complejos.

Trabajamos sobre problemas como la calidad de la demanda, la conversión entre marketing y ventas, la expansión hacia nuevas ciudades, la explicación de productos, la coordinación de canales y la atribución comercial de la inversión.

Visual: `financial-services`, large horizontal crop.

### 7.8 Commercial results — `#resultados`

**H2:** Marketing medido en colocaciones, contratos y valor de largo plazo.

Dirigimos operaciones de adquisición en las que la inversión se evalúa contra resultados comerciales efectivos, además de las métricas intermedias necesarias para optimizar cada canal.

Conectamos marketing con el proceso comercial para responder preguntas concretas: cuánto cuesta producir una colocación, qué parte de la demanda llega a formalización, qué valor incorpora cada contrato a la cartera y cuánto puede generar la relación durante su vigencia.

En productos a plazo, el costo de adquisición es el punto de partida. La medición completa considera duración contractual, margen, permanencia, riesgo, renovación y valor de vida del cliente.

**Pull quote:** El resultado no es la campaña. Es el compromiso comercial que la campaña ayuda a producir.

No publish client-identifiable figures at launch.

### 7.9 Experience — `#experiencia`

**H2:** Una firma dirigida por experiencia y construida alrededor de cada proyecto.

CCV es dirigida por Carlos Gallegos, profesional de marketing con 22 años de experiencia en investigación de mercados, segmentación, estrategia, campañas integradas, medios, marketing digital, reputación y dirección de equipos.

Su trayectoria incluye Nielsen en México y Silicon Valley, donde participó en proyectos de investigación, consumer intelligence y desarrollo de negocios para compañías internacionales y marcas Fortune 500.

Posteriormente dirigió durante diez años una firma full service y ha trabajado directamente con CEOs, directores generales, CFOs y equipos comerciales en servicios financieros, fintech, fitness, educación, agronegocios y B2B.

Alrededor de esta dirección, CCV reúne especialistas en investigación, creatividad, medios, tecnología, contenido, reputación, producción y marketing digital. La composición del equipo responde a las necesidades del proyecto, sin imponer capacidades innecesarias.

Esta combinación permite trabajar con una visión multidisciplinaria: desde el comportamiento de la audiencia y la estrategia del negocio hasta la ejecución de cada canal y su consecuencia comercial.

**Pull quote:** Dirección central, experiencia internacional y equipos configurados para cada objetivo.

### 7.10 Analysis preview — `#analisis`

**H2:** Marketing explicado desde el negocio.

Publicamos análisis sobre adquisición, dirección de marketing, servicios financieros, segmentación, medios, marketing digital y crecimiento comercial.

Cada texto parte de un problema real, revisa sus causas y busca llegar a una decisión útil. El archivo reúne artículos, metodologías, perspectivas sectoriales y casos anonimizados.

Show up to three featured published items from Sanity. If none exist, show only the introduction and a text link to `/analisis/`. Do not create fake articles.

### 7.11 Contact — `#contacto`

**H2:** Hablemos del problema que marketing debe resolver.

Revisamos la operación, la estrategia, los canales, los recursos y el proceso comercial para identificar dónde se está perdiendo valor y qué debe cambiar para producir mejores resultados.

Para solicitar información sobre dirección externa de marketing, estrategias de adquisición o proyectos para servicios financieros, escribe a:

**carlos@covenpr.com**

También puedes contactar a Carlos Gallegos a través de LinkedIn:

**linkedin.com/in/carlosgallegosflores/**

Incluye el nombre de la empresa, el objetivo comercial y una breve descripción de la operación actual. Responderemos para determinar si existe un punto de partida concreto.

**Closing line:** La conversación comienza con el problema que marketing debe resolver.

Use `mailto:` and the full LinkedIn URL as visible, accessible text links. No form at launch.

### 7.12 Footer

**CCV · DIRECCIÓN E INTEGRACIÓN DE MARKETING**

Dirigimos investigación, estrategia, comunicación, medios, marketing digital, equipos y especialistas para convertir demanda en colocaciones y actividad de marketing en valor comercial de largo plazo.

Links: Dirección de marketing · IFNBs y fintech · Análisis · CCV · Contacto · Aviso de privacidad.

---

## 8. Sanity editorial model

### Document type: `article`

Required fields:

- `title` — string, max 90 characters.
- `slug` — generated, editable, unique.
- `contentType` — `analysis | methodology | perspective | case`.
- `excerpt` — 140–220 characters.
- `publishedAt` — datetime.
- `updatedAtEditorial` — optional datetime.
- `author` — reference.
- `categories` — references.
- `heroImage` — image with hotspot.
- `heroImageAlt` — required unless decorative.
- `body` — Portable Text.
- `sources` — array of objects: source title, publisher, URL, publication date, access date, notes.
- `relatedArticles` — manual references, max 4.
- `featured` — boolean.
- `statusLabel` — optional editorial label.
- `seo` object:
  - `metaTitle`
  - `metaDescription`
  - `focusQuery`
  - `canonicalUrl`
  - `noIndex`
  - `ogImage`

Validation:

- Published content requires title, slug, excerpt, author, published date, body, meta title and meta description.
- Slug changes after publication must display a warning.
- Prevent more than three featured articles.

### Document type: `author`

- name
- role
- short bio
- long bio
- image
- LinkedIn URL
- credentials / experience highlights

Create Carlos Gallegos as the initial author.

### Document type: `category`

Initial categories:

- Dirección de marketing
- IFNBs y fintech
- Adquisición y colocación
- Investigación y segmentación
- Medios y marketing digital
- Marketing y ventas

### Singleton: `siteSettings`

- site title
- default SEO description
- public email
- LinkedIn URL
- featured article references
- social sharing image
- organization details

### Editorial experience

- Spanish field labels.
- Clear grouping: Contenido, Publicación, SEO, Fuentes, Relaciones.
- Preview cards show title, type, date and status.
- Desk structure separates drafts, published, featured and content types.
- Drafts remain private until publication and rebuild.

---

## 9. Sanity-to-site publishing workflow

1. Editor publishes an article in Sanity Studio.
2. A Sanity document webhook fires only for relevant published document changes.
3. The webhook invokes a GitHub Actions workflow through `repository_dispatch` or an equivalent secure endpoint.
4. GitHub Actions fetches content, builds the static Next.js site and deploys the `out/` folder to cPanel.
5. The deployment must be atomic where practical: upload to a temporary directory, then replace production, or mirror only after a successful build.

Security:

- Use a fine-grained token with the minimum repository permissions required.
- Store all deployment credentials in GitHub Actions Secrets.
- Never commit Sanity tokens, cPanel credentials, FTP passwords, private keys or personal tokens.
- Public Sanity read operations should use a read-only public dataset only if appropriate. Otherwise use a read token during build stored as a secret.

Static-export limitation: no live public draft preview is required for launch. Draft review occurs inside Studio; publication triggers a rebuild.

---

## 10. SEO and generative-search readiness

### Technical SEO

- One H1 per page.
- Semantic hierarchy of H2/H3.
- Unique title, meta description and canonical URL for every indexable page.
- Static, crawlable HTML for all primary content.
- Generate `sitemap.xml` from approved static routes and published Sanity documents.
- Generate `robots.txt`.
- Generate RSS feed for Análisis.
- Add Open Graph and social metadata.
- Add breadcrumb navigation on article and pillar pages.
- No index for drafts, preview URLs, Studio or unpublished pillar pages.
- Clean Spanish slugs, lowercase, hyphenated, no accents.

### Structured data

Home:

- `Organization`
- `WebSite`
- `ProfessionalService` where appropriate and non-duplicative.

Articles:

- `Article` or `BlogPosting`
- `BreadcrumbList`
- author entity linked consistently.

Do not invent ratings, reviews, awards, locations or business data.

### Content quality signals

- Visible author and author biography.
- Publication and update dates.
- Source/reference section on analytical articles.
- Original explanations, methodologies and cases.
- Clear definitions of CAC, CLTV, placement and contract value when used.
- Internal links between articles, Home and future pillar pages.
- No keyword stuffing.

An optional `llms.txt` may be generated as a discovery aid, but it must never be presented as a ranking guarantee or substitute for crawlable HTML and structured content.

---

## 11. Accessibility

Target WCAG 2.2 AA.

- Keyboard-accessible navigation and menu.
- Visible focus states.
- Correct landmarks and heading order.
- Skip-to-content link.
- Decorative abstract images use empty alt text.
- Editorial images use specific, non-promotional alt text.
- Contrast validated for text over imagery.
- Motion disabled or simplified with reduced-motion preference.
- Minimum touch target around 44 × 44 CSS px where applicable.
- No critical information conveyed by color alone.

---

## 12. Performance requirements

Targets under normal production conditions:

- Lighthouse Performance: 90+ mobile, 95+ desktop.
- Accessibility, Best Practices and SEO: 95+.
- LCP target: under 2.5 s.
- CLS target: under 0.1.
- INP target: under 200 ms.

Implementation rules:

- Preload only the font files and hero asset that are truly critical.
- Use `font-display: swap`.
- Set image dimensions or aspect ratios to prevent layout shift.
- Lazy-load below-the-fold images.
- Avoid autoplay video.
- Avoid large client-side bundles.
- No third-party tracking before consent.
- Intro animation must not block page rendering.

---

## 13. Analytics, privacy and consent

At launch:

- Google Search Console verification.
- GA4 only after consent, if enabled.
- Track outbound email and LinkedIn clicks as events only after the appropriate consent category.
- Prepare disabled integrations for Google Ads, Meta Pixel, LinkedIn Insight Tag and email/CRM tools. Do not load them merely because placeholders exist.
- Consent banner must support Necessary and Analytics categories at minimum; add Advertising only when advertising tags are activated.
- Default state: non-essential tags blocked.
- Link the integral privacy notice from the footer.

Any activation of additional tracking must be reflected in the privacy notice before release.

---

## 14. Deployment to Akky / cPanel

### Preferred method

Use SFTP/SSH if the Akky plan exposes shell access.

### Fallback

Use FTPS through a dedicated cPanel FTP account restricted to the site directory.

### GitHub Actions triggers

- push to `main`
- manual `workflow_dispatch`
- Sanity-triggered `repository_dispatch`

### Required secrets, depending on protocol

SFTP:

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`
- `DEPLOY_PATH`

FTPS:

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_PASSWORD`
- `DEPLOY_PATH`

Sanity:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` if the dataset is private
- `SANITY_AUTH_TOKEN` for Studio deployment

The exact production path and protocol are deployment-stage inputs; they do not block initial coding.

---

## 15. Quality assurance and acceptance criteria

The first production release is accepted only when:

1. Every approved Home section is present with exact approved copy.
2. No visible use of the prohibited category language appears.
3. The four approved images are optimized, correctly assigned and free of the corner glyph.
4. Navigation works on desktop, mobile and keyboard.
5. Intro animation appears once per session and respects reduced motion.
6. `/analisis/` and article templates render from Sanity.
7. A test article can be drafted, published, rebuilt and deployed without code changes.
8. Sitemap, robots, RSS, canonicals and structured data validate.
9. Privacy notice is linked.
10. Email and LinkedIn links work.
11. No secrets appear in the repository or browser bundle.
12. The static build completes with zero TypeScript errors and zero broken links.
13. Lighthouse targets are substantially met or deviations are documented.
14. The site works in current Chrome, Safari, Firefox and Edge, plus iOS Safari and Android Chrome.
15. Production deployment can be reproduced from GitHub Actions.

---

## 16. Build phases

### Phase 1 — Repository and technical skeleton

- Create repo structure.
- Configure Next.js static export.
- Configure TypeScript, linting and formatting.
- Add design tokens and local font loading.
- Add basic route structure.
- Commit: `chore: initialize CCV web and studio workspace`.

### Phase 2 — Home visual shell

- Header, intro animation and Hero.
- Implement all Home sections with approved copy.
- Add four optimized images.
- Responsive layout and reduced-motion behavior.

### Phase 3 — Sanity Studio

- Create project and schemas.
- Spanish Studio labels and desk structure.
- Add test author/category/article.
- Deploy Studio to Sanity-managed hosting.

### Phase 4 — Analysis frontend

- Archive, article template, Portable Text components.
- Sources, author, related content and breadcrumbs.
- RSS, sitemap and metadata.

### Phase 5 — SEO, privacy and analytics shell

- Structured data.
- Canonical and social metadata.
- Consent management.
- Search Console verification hooks.

### Phase 6 — CI/CD and Akky deployment

- Build workflow.
- SFTP or FTPS deployment.
- Sanity publish webhook.
- Rollback notes and deployment documentation.

### Phase 7 — QA and launch

- Accessibility, responsive, browser and performance tests.
- Content review.
- Production deploy.
- Submit sitemap to Search Console.

---

## 17. Work that must not be invented

Do not fabricate:

- client results;
- case-study figures;
- testimonials;
- client names or logos;
- awards;
- office locations beyond approved legal information;
- team members;
- article bodies not supplied by the owner;
- tracking IDs;
- social accounts;
- pillar-page copy.

Use clear TODO markers in code for missing approved inputs. Hide incomplete public sections rather than publishing filler.

---

## 18. Immediate Codex task

Start with **Phase 1 only**.

Deliver:

1. Proposed repository tree.
2. `package.json` workspace setup.
3. Next.js static-export skeleton.
4. Sanity Studio skeleton.
5. Global design tokens.
6. Local font declarations with placeholder paths.
7. Empty route components for Home, Analysis, Article and Privacy Notice.
8. README with local development commands.
9. No deployment credentials and no fake content.

After Phase 1, stop and request review before implementing the visual Home.

