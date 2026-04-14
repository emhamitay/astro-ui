# Astro UI Component Library

A shadcn/ui-based component library for Astro. **No JavaScript required** for these components — all are pure server-rendered HTML. Uses Tailwind CSS + CSS variables for theming.

## Setup

1. Copy `src/styles/globals.css` to your project's `src/styles/`
2. Copy `src/lib/utils.ts` to your project's `src/lib/` (optional — for `cn()` in your own components)
3. Copy desired component files to `src/components/astro/`
4. Import globals.css in your layout: `import '../styles/globals.css'`
5. Import and use components

**Path alias:** examples use `@/components/astro/` — configure in `tsconfig.json`:
```json
{ "paths": { "@/*": ["./src/*"] } }
```

---

## Components

---

### Alert

Description: Highlighted message box for feedback, warnings, or errors. Supports an optional SVG icon — CSS sibling selectors automatically position the icon and indent content beside it.

Files needed: `Alert.astro`, `AlertTitle.astro`, `AlertDescription.astro`

**Props — Alert.astro**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual style |
| `class` | `string` | `''` | Extra Tailwind classes |

**Props — AlertTitle.astro**
| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | `''` |

**Props — AlertDescription.astro**
| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | `''` |

**Usage example:**
```astro
---
import Alert from '@/components/astro/Alert.astro';
import AlertTitle from '@/components/astro/AlertTitle.astro';
import AlertDescription from '@/components/astro/AlertDescription.astro';
---

<!-- Default -->
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
</Alert>

<!-- Destructive with icon -->
<Alert variant="destructive">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
    <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>
```

---

### Avatar

Description: Circular user avatar. Shows an image if `src` is provided, otherwise falls back to initials or text.

Files needed: `Avatar.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | `''` | Image alt text |
| `fallback` | `string` | `''` | Text shown when no image (e.g. initials `'JD'`) |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | `sm`=32px, `default`=40px, `lg`=56px |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Avatar from '@/components/astro/Avatar.astro';
---

<Avatar src="/avatars/jane.jpg" alt="Jane Doe" />
<Avatar fallback="JD" size="lg" />
<Avatar fallback="?" size="sm" />
```

---

### Badge

Description: Small inline label for status, categories, or counts.

Files needed: `Badge.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Visual style |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Badge from '@/components/astro/Badge.astro';
---

<Badge>New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>
```

---

### Breadcrumb

Description: Accessible navigation trail. Accepts a data array — renders links for all items except the last (current page), separated by `›` chevrons.

Files needed: `Breadcrumb.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{ label: string; href?: string }[]` | required | Ordered list of crumbs |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Breadcrumb from '@/components/astro/Breadcrumb.astro';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Components' }, // last item — no href, rendered as current page
];
---

<Breadcrumb items={crumbs} />
```

---

### Button

Description: Polymorphic action element. Renders as `<a>` when `href` is provided, otherwise as `<button>`. Supports 6 variants and 4 sizes.

Files needed: `Button.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | `default`=40px, `sm`=36px, `lg`=44px, `icon`=40×40px square |
| `href` | `string` | — | Renders as `<a>` when provided |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Form button type |
| `disabled` | `boolean` | `false` | Disabled state |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Button from '@/components/astro/Button.astro';
---

<Button>Click me</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Menu</Button>
<Button variant="link" href="/about">About</Button>
<Button size="sm" variant="secondary">Small</Button>
<Button size="icon" aria-label="Settings">
  <svg .../>
</Button>
<Button type="submit">Submit form</Button>
<Button disabled>Unavailable</Button>
```

---

### Card

Description: Contained surface for grouping related content. Composed of up to 5 sub-components: header, title, description, content, footer.

Files needed: `Card.astro`, `CardHeader.astro`, `CardTitle.astro`, `CardDescription.astro`, `CardContent.astro`, `CardFooter.astro`

**Props — all sub-components**
| Sub-component | Props | Description |
|---------------|-------|-------------|
| `Card` | `class?` | Outer rounded border container |
| `CardHeader` | `class?` | Top section, `flex-col`, 24px padding |
| `CardTitle` | `class?` | `<h3>` heading |
| `CardDescription` | `class?` | Muted subtitle `<p>` |
| `CardContent` | `class?` | Main body, 24px padding, no top padding |
| `CardFooter` | `class?` | Bottom row, `flex items-center`, no top padding |

**Usage example:**
```astro
---
import Card from '@/components/astro/Card.astro';
import CardHeader from '@/components/astro/CardHeader.astro';
import CardTitle from '@/components/astro/CardTitle.astro';
import CardDescription from '@/components/astro/CardDescription.astro';
import CardContent from '@/components/astro/CardContent.astro';
import CardFooter from '@/components/astro/CardFooter.astro';
import Button from '@/components/astro/Button.astro';
---

<Card class="w-96">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Project settings go here.</p>
  </CardContent>
  <CardFooter class="justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

---

### Input

Description: Single-line text input. Full-width by default, styled to match the design system.

Files needed: `Input.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Initial value |
| `name` | `string` | — | Form field name |
| `id` | `string` | — | Element ID (pair with Label) |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Input from '@/components/astro/Input.astro';
import Label from '@/components/astro/Label.astro';
---

<div class="grid gap-2">
  <Label for="email">Email</Label>
  <Input type="email" id="email" name="email" placeholder="you@example.com" required />
</div>

<Input type="search" placeholder="Search..." class="max-w-sm" />
<Input type="file" />
<Input disabled placeholder="Disabled input" />
```

---

### Label

Description: Accessible form label that pairs with Input, Textarea, and other form elements via `for`/`id`.

Files needed: `Label.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `for` | `string` | — | ID of the associated form element |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Label from '@/components/astro/Label.astro';
import Input from '@/components/astro/Input.astro';
---

<Label for="username">Username</Label>
<Input id="username" name="username" placeholder="Enter username" />
```

---

### Progress

Description: Horizontal progress bar. Value is clamped to 0–100 range automatically.

Files needed: `Progress.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value |
| `max` | `number` | `100` | Maximum value |
| `class` | `string` | `''` | Extra classes (set width here) |

**Usage example:**
```astro
---
import Progress from '@/components/astro/Progress.astro';
---

<Progress value={60} class="w-full" />
<Progress value={3} max={10} class="w-64" />
<Progress value={100} class="w-full" />
```

---

### Separator

Description: Thin divider line, horizontal or vertical.

Files needed: `Separator.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Separator from '@/components/astro/Separator.astro';
---

<!-- Horizontal divider -->
<Separator class="my-4" />

<!-- Vertical divider inside a flex row -->
<div class="flex h-5 items-center gap-4">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>
```

---

### Skeleton

Description: Animated loading placeholder. Size and shape are set entirely by the consumer via `class`. No slot content.

Files needed: `Skeleton.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `''` | **Required in practice** — sets width, height, shape |

**Usage example:**
```astro
---
import Skeleton from '@/components/astro/Skeleton.astro';
---

<!-- Text line skeletons -->
<Skeleton class="h-4 w-64" />
<Skeleton class="h-4 w-48" />

<!-- Avatar skeleton -->
<Skeleton class="h-12 w-12 rounded-full" />

<!-- Card skeleton -->
<div class="flex items-center gap-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-48" />
    <Skeleton class="h-4 w-32" />
  </div>
</div>
```

---

### Table

Description: Data-driven table component. Accepts column definitions and row data — renders accessible `<table>` markup with hover states.

Files needed: `Table.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `{ key: string; header: string; class?: string }[]` | required | Column definitions |
| `rows` | `Record<string, string \| number>[]` | required | Row data — keys must match column `key` values |
| `caption` | `string` | — | Optional `<caption>` element |
| `class` | `string` | `''` | Extra classes on `<table>` |

**Usage example:**
```astro
---
import Table from '@/components/astro/Table.astro';

const columns = [
  { key: 'invoice', header: 'Invoice' },
  { key: 'status', header: 'Status' },
  { key: 'method', header: 'Method' },
  { key: 'amount', header: 'Amount', class: 'text-right' },
];

const rows = [
  { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV-003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
];
---

<Table columns={columns} rows={rows} caption="Recent invoices" />
```

---

### Textarea

Description: Multi-line text input. Full-width, resizable.

Files needed: `Textarea.astro`

**Props**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Initial content |
| `name` | `string` | — | Form field name |
| `id` | `string` | — | Element ID |
| `rows` | `number` | `3` | Visible row count |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `class` | `string` | `''` | Extra classes |

**Usage example:**
```astro
---
import Textarea from '@/components/astro/Textarea.astro';
import Label from '@/components/astro/Label.astro';
---

<div class="grid gap-2">
  <Label for="message">Your message</Label>
  <Textarea id="message" name="message" placeholder="Type your message here..." rows={5} />
</div>
```

---

## Composing Components

Real-world patterns combining multiple components:

```astro
---
// Login form
import Card from '@/components/astro/Card.astro';
import CardHeader from '@/components/astro/CardHeader.astro';
import CardTitle from '@/components/astro/CardTitle.astro';
import CardDescription from '@/components/astro/CardDescription.astro';
import CardContent from '@/components/astro/CardContent.astro';
import CardFooter from '@/components/astro/CardFooter.astro';
import Input from '@/components/astro/Input.astro';
import Label from '@/components/astro/Label.astro';
import Button from '@/components/astro/Button.astro';
import Separator from '@/components/astro/Separator.astro';
---

<Card class="w-96">
  <CardHeader>
    <CardTitle>Sign in</CardTitle>
    <CardDescription>Enter your credentials to continue.</CardDescription>
  </CardHeader>
  <CardContent class="grid gap-4">
    <div class="grid gap-2">
      <Label for="email">Email</Label>
      <Input type="email" id="email" name="email" placeholder="you@example.com" />
    </div>
    <div class="grid gap-2">
      <Label for="password">Password</Label>
      <Input type="password" id="password" name="password" />
    </div>
  </CardContent>
  <CardFooter class="flex-col gap-3">
    <Button type="submit" class="w-full">Sign in</Button>
    <Separator />
    <Button variant="outline" href="/signup" class="w-full">Create account</Button>
  </CardFooter>
</Card>
```

```astro
---
// User profile row
import Avatar from '@/components/astro/Avatar.astro';
import Badge from '@/components/astro/Badge.astro';
import Button from '@/components/astro/Button.astro';
---

<div class="flex items-center justify-between p-4 border rounded-lg">
  <div class="flex items-center gap-3">
    <Avatar src="/jane.jpg" alt="Jane Doe" />
    <div>
      <p class="font-medium">Jane Doe</p>
      <p class="text-sm text-muted-foreground">jane@example.com</p>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <Badge variant="secondary">Admin</Badge>
    <Button variant="ghost" size="sm">Edit</Button>
  </div>
</div>
```

---

## Theming

All components use CSS custom properties (variables) defined in `globals.css`. Swap color themes by redefining variables on `:root` (light) and `.dark` (dark mode).

**Core token structure** (values are HSL channel triples, used as `hsl(var(--token))`):

| Variable | Purpose |
|----------|---------|
| `--background` / `--foreground` | Page background and default text |
| `--card` / `--card-foreground` | Card surface |
| `--primary` / `--primary-foreground` | Primary action color (default Button) |
| `--secondary` / `--secondary-foreground` | Secondary surfaces and actions |
| `--muted` / `--muted-foreground` | Subtle backgrounds and dimmed text |
| `--accent` / `--accent-foreground` | Hover highlights (ghost/outline) |
| `--destructive` / `--destructive-foreground` | Danger/error state |
| `--border` | Border color |
| `--input` | Input border color |
| `--ring` | Focus ring color |
| `--radius` | Base border radius (`0.5rem`) |

**Dark mode:** Add class `dark` to `<html>`. All components respond automatically — no per-component changes needed.

**Customizing the theme:** Override any token in your own CSS:
```css
:root {
  --primary: 221 83% 53%;          /* blue instead of black */
  --primary-foreground: 0 0% 100%;
  --radius: 0.75rem;               /* rounder corners */
}
```

**HSL format note:** Tailwind's `bg-primary` maps to `background-color: hsl(var(--primary))`. Define token values as bare `H S% L%` triples (no `hsl()` wrapper) so Tailwind can inject opacity modifiers like `bg-primary/80`.
