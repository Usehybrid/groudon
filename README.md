<div align="center">
  <img src=".github/assets/groudon.png" alt="Groudon" width="180" />

  <h1>Groudon</h1>

  <p><strong>ZenAdmin typography — one type scale as tokens, every zap-* class, any root font size.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/@hybr1d-tech/groudon"><img src="https://img.shields.io/npm/v/%40hybr1d-tech%2Fgroudon?color=E62829&label=npm" alt="npm version" /></a>
    <img src="https://img.shields.io/badge/CSS-Lightning%20CSS-E62829" alt="Lightning CSS" />
    <img src="https://img.shields.io/badge/font-Instrument%20Sans-E62829" alt="Instrument Sans" />
  </p>
</div>

---

Groudon is the single source of ZenAdmin's type scale. [Charizard](https://github.com/Usehybrid/charizard)
bundles it into `@hybr1d-tech/charizard/styles.css`, so apps that use Charizard get it with no extra
import. Apps without Charizard (the Next.js sites) import it directly.

## Installation

```bash
pnpm add @hybr1d-tech/groudon
```

## Usage

```css
@import '@hybr1d-tech/groudon'; /* tokens + utilities */
```

```tsx
<h1 className={clsx(classes.title, 'zap-hero-semibold')}>Page title</h1>
<p className="zap-content-regular">Body copy</p>
```

| Entry point                            | Contents                                      |
| -------------------------------------- | --------------------------------------------- |
| `@hybr1d-tech/groudon`                 | tokens + utilities (`dist/groudon.css`)       |
| `@hybr1d-tech/groudon/tokens.css`      | custom properties only                        |
| `@hybr1d-tech/groudon/utilities.css`   | `zap-*` classes only (needs the tokens)       |
| `@hybr1d-tech/groudon/classes`         | `zapTextClasses` array + `ZapTextClass` type  |

### Root font size

Every size is authored in design pixels and rendered in `rem` through one token:

```css
--zap-px: calc(1rem / var(--zap-base-font-size)); /* one design pixel */
```

`--zap-base-font-size` defaults to `16`, the browser default. An app whose `<html>` font size is not
16px declares it once, unitless, next to the rule that sets it:

```css
html {
  font-size: 13px;
}
:root {
  --zap-base-font-size: 13;
}
```

Set it on `:root`, not `html`: groudon's default lives on `:root`, which outranks an `html`
selector, and the override must load after groudon. Every token then renders at its design size (`zap-hero-*` is 20px in both apps) and still scales
with the root. Groudon never sets the root font size itself, so an app on the browser default keeps
honouring the user's font-size preference.

Use the tokens in component CSS instead of hard-coding sizes:

```css
.title {
  font-size: var(--zap-text-heading-size);
  line-height: var(--zap-text-heading-line-height);
  padding: calc(12 * var(--zap-px));
}
```

## Type scale

| Level      | Classes                                | Size / line height | Token prefix              |
| ---------- | -------------------------------------- | ------------------ | ------------------------- |
| Hero       | `zap-hero-{medium,semibold,bold}`      | 20 / 28            | `--zap-text-hero-*`       |
| Lead       | `zap-lead-{medium,semibold,bold}`      | 18 / 24            | `--zap-text-lead-*`       |
| Heading    | `zap-heading-{medium,semibold,bold}`   | 16 / 20            | `--zap-text-heading-*`    |
| Content    | `zap-content-{regular,medium,semibold}`| 14 / 20            | `--zap-text-content-*`    |
| Subcontent | `zap-subcontent-{regular,medium,semibold}` | 12 / 18        | `--zap-text-subcontent-*` |
| Caption    | `zap-caption-{regular,medium,semibold}`| 11 / 16            | `--zap-text-caption-*`    |
| Button     | `zap-button`, `zap-button-small`       | 14 / 24, 12 / 20   | `--zap-text-button-*`     |
| Link       | `zap-link`, `zap-link-small`           | content, subcontent | `--zap-link-color`       |
| Internal link | `zap-internallink`, `zap-internallink-small` | content, subcontent | `--zap-link-color` |

Other tokens: `--zap-font-sans`, `--zap-letter-spacing` (0.2px), `--zap-weight-{regular,medium,semibold,bold}`.
Groudon sets `font-family` and `font-feature-settings` on `:root` but does not load the font: load
Instrument Sans in the app (Google Fonts `<link>` or `next/font`) and, with `next/font`, point
`--zap-font-sans` at its variable.

## Migrating from 0.x / a local `_typography.css`

| Before                                   | After                                   |
| ---------------------------------------- | --------------------------------------- |
| `--base-font-size: 16px`                 | `--zap-base-font-size: 16` (unitless)   |
| `--letter-spacing`                       | `--zap-letter-spacing`                  |
| `--link-color`                           | `--zap-link-color`                      |
| `--line-height-142` / `-166`             | `--zap-text-content-line-height` / `--zap-text-button-small-line-height` |
| `--line-height-145` / `-150` / `-171`    | `--zap-text-caption-line-height` / `--zap-text-subcontent-line-height` / `--zap-text-button-line-height` |

The class names are unchanged. 0.x shipped `calc(20 / var(--base-font-size) * 1rem)`, which divides
a number by a length and is invalid CSS, so its published build was effectively empty.

## Development

```bash
pnpm install
pnpm build   # Lightning CSS: src/ → dist/ (bundled, minified) + dist/classes.{js,d.ts}
```

Sources live in `src/` (`tokens.css`, `utilities.css`, `index.css`). Publishing is a `v*` tag push;
CI builds and publishes.

---

<div align="center">
  <sub>Groudon artwork © Nintendo / Creatures Inc. / GAME FREAK inc. Used as a mascot for this fan-named project.</sub>
</div>
