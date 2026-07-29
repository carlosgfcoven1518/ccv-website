# Fuentes locales

Los archivos definitivos todavía no están en el repositorio. Mientras falten,
el frontend usa los fallbacks definidos en `app/globals.css` y no realiza
solicitudes a servicios externos.

Agregar los assets WOFF2 aprobados por el propietario en `public/fonts/` con
estos nombres:

- `syne-bold.woff2`
- `outfit-light.woff2`
- `outfit-thin.woff2`

Después, declarar las tres fuentes con `@font-face` al inicio de
`app/globals.css`, usando los pesos `700`, `300` y `100` respectivamente y
`font-display: swap`.

No se deben descargar sustitutos desde Google Fonts ni otro CDN. Antes de
aprobar la integración, verificar soporte completo de español, ausencia de CLS
perceptible y que Outfit Thin no se utilice por debajo de 36 px.
