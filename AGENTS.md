## Brand design system

Color and font tokens live in `src/styles/global.css` under the Tailwind v4
`@theme` block, and are applied globally via `src/layouts/Layout.astro`.
**Always use these tokens — never hardcode hex values or font names in
components.**

### Colors

| Token           | Hex       | Usage                          |
| --------------- | --------- | ------------------------------ |
| `background`    | `#FEFFEF` | Page/app background            |
| `soft-lime`     | `#EDF3B3` | Secondary surface / accent     |
| `soft-blue`     | `#CFEAFF` | Secondary surface / accent     |
| `pale-blue`     | `#E4F3FF` | Auto-translation notice background (`ContentCard.astro`) |
| `strong-blue`   | `#0F7FD4` | Buttons, links                 |
| `bright-lime`   | `#EAF261` | CTAs, highlights                |
| `foreground`    | `#111111` | Near-black body/heading text   |
| `charcoal`      | `#1A1A1A` | Dark backing panels (e.g. carousel) |

Use as Tailwind utilities, e.g. `bg-strong-blue`, `text-foreground`,
`bg-soft-lime`.

### Fonts

- **Headings** — "Bricolage Grotesque" via the `font-heading` utility
  (applied by default to `h1`–`h6` globally).
- **Body** — "DM Sans" via the `font-sans` utility (applied to `<body>` in
  `Layout.astro`).
- **Stat badges only** — "Inter" via the `font-stat` utility. Scoped to the
  white stat-badge numbers/captions in the "Some of my work" case-study
  cards (`src/components/WorkCards.astro`) — do not use it for headings or
  general body copy, which stay on `font-heading`/`font-sans`.

All three are self-hosted through Fontsource (`@fontsource/bricolage-grotesque`,
`@fontsource/dm-sans`, `@fontsource/inter`) — no external font requests.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
