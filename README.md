# AstroShadcnComponentsLib

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
npx @emhamitay/astro-ui init

# Add individual components
npx @emhamitay/astro-ui add button
npx @emhamitay/astro-ui add card badge separator

# Add everything at once
npx @emhamitay/astro-ui add --all
```

---

## ⚡ AI Component Selection Guide

**This library only covers the zero-JS use case.** Before reaching for any component, apply this rule:

| Needs JS? | Use |
|-----------|-----|
| ❌ No — purely visual/structural | **Astro component** from `@/components/astro/` |
| ✅ Yes — interactivity, state, open/close, events | **shadcn/ui React component** from `@/components/ui/` |

**Use the Astro version for:** `Button` (link/submit), `Card`, `Badge`, `Avatar`, `Separator`, `Skeleton`, `Progress`, `Input`, `Textarea`, `Label`, `Breadcrumb`, `Table`, `Accordion`, `Checkbox`, `Select` — anything that works as plain HTML.

**Use the shadcn React version for:** `Dialog`, `Sheet`, `Drawer`, `DropdownMenu`, `Popover`, `Tooltip`, `Tabs`, `Switch`, `Slider`, `Toast`, `Sonner` — anything needing click handlers, state, or dynamic behavior.

> The same component type (e.g. `Button`) may use the Astro version in one context and the React version in another, depending on what it needs to *do*.

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
