# AstroShadcnComponentsLib

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-wogczsjr)

## Quick start

```bash
# Install the CLI globally (optional)
npm install -g @emhamitay/astro-ui

# Or use directly with npx — no install needed
npx @emhamitay/astro-ui init

# Add individual components
npx @emhamitay/astro-ui add button
npx @emhamitay/astro-ui add card badge separator

# Add all components at once
npx @emhamitay/astro-ui add --all

# List available components
npx @emhamitay/astro-ui list
```

## ⚡ AI Component Selection Guide

**This library only covers the zero-JS use case.** Before reaching for any component, apply this rule:

| Needs JS? | Use |
|-----------|-----|
| ❌ No — purely visual/structural | **Astro component** from `@/components/astro/` |
| ✅ Yes — interactivity, state, open/close, events | **shadcn/ui React component** from `@/components/ui/` |

**Use the Astro version for:** `Button` (link/submit), `Card`, `Badge`, `Avatar`, `Separator`, `Skeleton`, `Progress`, `Input`, `Textarea`, `Label`, `Breadcrumb`, `Table`, `Accordion`, `Checkbox`, `Select` — anything that works as plain HTML.

**Use the shadcn React version for:** `Dialog`, `Sheet`, `Drawer`, `DropdownMenu`, `Popover`, `Tooltip`, `Tabs`, `Switch`, `Slider`, `Toast`, `Sonner` — anything needing click handlers, state, or dynamic behavior.

> The same component type (e.g. `Button`) may use the Astro version in one context and the React version in another, depending on what it needs to *do*.

## Available components

| Component | File | Description |
|-----------|------|-------------|
| Alert | `Alert.astro`, `AlertTitle.astro`, `AlertDescription.astro` | Callout box with optional icon, default and destructive variants |
| Avatar | `Avatar.astro` | Circular image with initials fallback |
| Badge | `Badge.astro` | Inline label, 4 variants |
| Breadcrumb | `Breadcrumb.astro` | Navigation trail from an items array |
| Button | `Button.astro` | Polymorphic — renders `<a>` or `<button>`, 6 variants, 4 sizes |
| Card | `Card.astro` + sub-components | Composed surface: Header, Title, Description, Content, Footer |
| Checkbox | `Checkbox.astro` | Native `<input type="checkbox">` |
| Input | `Input.astro` | Single-line text input |
| Label | `Label.astro` | Accessible form label |
| Progress | `Progress.astro` | Horizontal progress bar |
| Select | `Select.astro` | Native `<select>` |
| Separator | `Separator.astro` | Horizontal or vertical divider |
| Skeleton | `Skeleton.astro` | Animated loading placeholder |
| Table | `Table.astro` | Data-driven table from columns + rows arrays |
| Textarea | `Textarea.astro` | Multi-line text input |
