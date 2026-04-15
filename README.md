# Astro UI

> **shadcn/ui component library for Astro — zero JS, full theming, instant install via CLI**

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-wogczsjr)

Pure Astro components that match the [shadcn/ui](https://ui.shadcn.com) design system. No React, no hydration overhead — all components are server-rendered HTML styled with Tailwind CSS and CSS custom properties.

---

## Features

- **Zero JavaScript** — all components are static Astro files
- **Full theming** — 6 built-in themes via CSS variables; easily customizable
- **shadcn/ui design tokens** — semantic color tokens (`primary`, `muted`, `destructive`, …)
- **Dark mode** — add `class="dark"` to `<html>` and every component responds automatically
- **CLI installer** — pick and install individual components into any Astro project

---

## Quick start

```bash
# Install globals.css + utils.ts
npx astro-ui init

# Add individual components
npx astro-ui add button
npx astro-ui add card badge separator

# Add everything at once
npx astro-ui add --all
```

---

## Available components

| Component | Files | Notes |
|-----------|-------|-------|
| Accordion | `Accordion.astro` | Native `<details>`/`<summary>` |
| Alert | `Alert.astro`, `AlertTitle.astro`, `AlertDescription.astro` | |
| Avatar | `Avatar.astro` | Image + fallback initials |
| Badge | `Badge.astro` | |
| Breadcrumb | `Breadcrumb.astro` | |
| Button | `Button.astro` | Renders as `<a>` when `href` is set |
| Card | `Card.astro` + 5 sub-components | |
| Checkbox | `Checkbox.astro` | Native `<input type="checkbox">` |
| Input | `Input.astro` | |
| Label | `Label.astro` | |
| Progress | `Progress.astro` | |
| Select | `Select.astro` | Native `<select>` |
| Separator | `Separator.astro` | Horizontal or vertical |
| Skeleton | `Skeleton.astro` | |
| Table | `Table.astro` | Data-driven |
| Textarea | `Textarea.astro` | |

See [COMPONENTS.md](./COMPONENTS.md) for full prop tables and usage examples.

---

## Manual setup

1. Copy `src/styles/globals.css` → your project's `src/styles/`
2. Optionally copy `src/lib/utils.ts` → your project's `src/lib/`
3. Copy desired component files → `src/components/astro/`
4. Import `globals.css` in your layout
5. Import and use components

Configure the `@/` path alias in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Theming

All components use CSS custom properties defined in `globals.css`. Override any token on `:root` (light) or `.dark` (dark mode):

```css
:root {
  --primary: 221 83% 53%;       /* blue */
  --radius: 0.75rem;            /* rounder corners */
}
```

---

## License

MIT © [emhamitay](https://github.com/emhamitay)
