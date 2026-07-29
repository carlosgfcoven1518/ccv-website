# Componentes base de CCV

Las variantes públicas permitidas están cerradas mediante uniones de
TypeScript:

- `Container`: `reading`, `standard`, `wide`, `full`.
- `Section`: tonos `light`, `offWhite`, `navy`; espacios `compact`,
  `standard`, `spacious`.
- `Stack`: gaps `xs`, `sm`, `md`, `lg`, `xl`; alineación `start`, `center`,
  `stretch`.
- `Grid`: `equal`, `textMedia`, `mediaText`, `editorial`.
- `Eyebrow`: `default`, `inverse`, `accent`.
- `Heading`: tamaños `h1`, `h2`, `h3`, `display`.
- `Text`: tamaños `small`, `body`, `lead`; medidas `narrow`, `body`, `article`,
  `none`.
- `EditorialLink`: `inline`, `standalone`, `inverse`.
- `Navigation`: marca positiva o negativa; comportamiento `afterHero` o
  `transition`.
- `ImageFrame`: cinco proporciones, dos ajustes, cinco posiciones y tres
  overlays.
- `EditorialCard`: con o sin imagen; composición featured opcional.
- `Quote`: `pull` o `blockquote`.
- `Divider`: `subtle`, `strong`, `inverse`, `accent`.

`Footer` y `SkipLink` no tienen variantes visuales abiertas. Todos los
componentes usan CSS Modules, tokens globales y HTML semántico. Solo Navigation
es un Client Component porque administra el menú móvil.

No existe un componente de botón comercial. Los botones quedan reservados para
controles funcionales, como abrir y cerrar la navegación móvil.
