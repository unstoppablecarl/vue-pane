# vue-pane

Compact debug panel components for Vue 3. A spiritual replacement for [Tweakpane](https://tweakpane.github.io/docs/) — same visual style, Vue-native API.

**[Documentation](https://unstoppablecarl.github.io/vue-pane/)**

## Features

- Inputs: text, number (drag-to-change), slider, checkbox, select, color picker, 2D point
- Display: single-line monitor, multi-line monitor, graph/sparkline
- Layout: collapsible pane, collapsible folders, tabs, separator
- Folder state persisted to `localStorage` via a `name` prop
- BEM CSS class names (`vp-pane`, `vp-folder__title`, etc.) — fully themeable via CSS custom properties
- TypeScript throughout

## Installation

```sh
npm install vue-pane
```

Import styles once in your app entry:

```ts
import 'vue-pane/dist/vue-pane.css'
```

### Nuxt / source-first bundlers

The package exposes a `"source"` export condition pointing at the raw `.vue` and `.scss` files. Bundlers that understand this condition (Nuxt, Vite with explicit `resolve.conditions: ['source']`) will process the source directly — no CSS import needed, and templates are compiled once by your own build.

```ts
// vite.config.ts — opt in explicitly if needed
export default defineConfig({
  resolve: { conditions: ['source'] },
})
```

## Quick start

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VPane, VPFolder, VPNumber, VPCheckbox, VPButton } from 'vue-pane'

const speed = ref(1)
const enabled = ref(true)
</script>

<template>
  <VPane title="Controls" style="width: 280px">
    <VPNumber v-model="speed" label="Speed" :min="0" :max="10" :step="0.1" />
    <VPCheckbox v-model="enabled" label="Enabled" />
    <VPButton label="Reset" @click="speed = 1; enabled = true" />

    <VPFolder title="Advanced" name="advanced">
      <VPNumber v-model="speed" label="Fine" :step="0.01" />
    </VPFolder>
  </VPane>
</template>
```

---

## Component reference

### `VPane`

Root container. Applies theming (font, colors, shadow, border-radius) to all children.

```vue
<VPane title="My Panel" :expanded="true" style="width: 300px">
  <!-- components -->
</VPane>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Title text. If omitted the header button is hidden and the pane is always open. |
| `expanded` | `boolean` | `true` | Initial open/closed state. Only applies when `title` is set. |
| `disabled` | `boolean` | — | Applies `vp--disabled` — disables pointer events. |
| `hidden` | `boolean` | — | Applies `vp--hidden` — `display: none`. |

---

### `VPFolder`

Collapsible folder. Expanded state is saved to `localStorage` when `name` is provided.

```vue
<VPFolder title="Transform" name="transform">
  <!-- components -->
</VPFolder>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **required** | Folder title. |
| `name` | `string` | — | localStorage key (`vp-folder-{name}`). Without it, state is not persisted. |
| `expanded` | `boolean` | `true` | Initial open/closed state (overridden by localStorage when `name` is set). |
| `disabled` | `boolean` | — | Disables pointer events on the folder. |
| `hidden` | `boolean` | — | Hides the folder. |

---

### `VPText`

Plain text input.

```vue
<VPText v-model="name" label="Name" />
```

| Prop | Type | Description |
|---|---|---|
| `modelValue` | `string` | **required** |
| `label` | `string` | Label text. Omit for full-width input. |

---

### `VPNumber`

Number input with a drag-to-change knob on the left edge. Keyboard: `↑`/`↓` steps by `step`; `Shift+↑`/`↓` steps by `step × 10`.

```vue
<VPNumber v-model="count" label="Count" :min="0" :max="100" :step="1" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `number` | **required** | |
| `label` | `string` | — | |
| `min` | `number` | — | Clamp minimum. |
| `max` | `number` | — | Clamp maximum. |
| `step` | `number` | `1` | Drag and arrow key increment. |

---

### `VPSlider`

Horizontal track-and-knob slider.

```vue
<VPSlider v-model="opacity" label="Opacity" :min="0" :max="1" :step="0.01" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `number` | **required** | |
| `label` | `string` | — | |
| `min` | `number` | `0` | |
| `max` | `number` | `1` | |
| `step` | `number` | `0.01` | |

---

### `VPCheckbox`

Boolean toggle.

```vue
<VPCheckbox v-model="visible" label="Visible" />
```

| Prop | Type | Description |
|---|---|---|
| `modelValue` | `boolean` | **required** |
| `label` | `string` | |

---

### `VPSelect`

Dropdown list.

```vue
<VPSelect v-model="mode" :options="options" label="Mode" />
```

```ts
const options = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease',   label: 'Ease'   },
]
```

| Prop | Type | Description |
|---|---|---|
| `modelValue` | `string \| number` | **required** |
| `options` | `{ value: string \| number; label: string }[]` | **required** |
| `label` | `string` | |

---

### `VPColor`

Color picker. Clicking the swatch opens an inline HSV palette with a hue slider and RGB inputs.

```vue
<VPColor v-model="fill" label="Fill" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | **required** | Hex color string, e.g. `#ff5500`. |
| `label` | `string` | — | |
| `alpha` | `boolean` | `false` | Show alpha channel controls. |

---

### `VPPoint2d`

Two-axis coordinate input. Click the crosshair button to open an interactive 2D canvas picker.

```vue
<VPPoint2d v-model="position" label="Position" :min="-1" :max="1" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `{ x: number; y: number }` | **required** | |
| `label` | `string` | — | |
| `min` | `number` | `-1` | Range minimum for both axes. |
| `max` | `number` | `1` | Range maximum for both axes. |

---

### `VPButton`

Clickable action button.

```vue
<VPButton label="Apply" @click="apply" />
```

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | **required** |

| Event | Description |
|---|---|
| `click` | Emitted on button press. |

---

### `VPSeparator`

Horizontal rule for visual grouping.

```vue
<VPSeparator />
```

---

### `VPTab`

Tab container with named slots per tab. Slot names match the strings in the `tabs` array.

```vue
<VPTab :tabs="['Settings', 'Info']" v-model="activeTab">
  <template #Settings>
    <VPNumber v-model="speed" label="Speed" />
  </template>
  <template #Info>
    <VPMonitor :value="speed" label="Speed" />
  </template>
</VPTab>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `string[]` | **required** | Tab labels (also the slot names). |
| `modelValue` | `number` | `0` | Active tab index. |

---

### `VPMonitor`

Read-only single-line display.

```vue
<VPMonitor :value="fps" label="FPS" />
```

| Prop | Type | Description |
|---|---|---|
| `value` | `unknown` | **required** — rendered with `{{ value }}`. |
| `label` | `string` | |

---

### `VPMonitorMulti`

Read-only multi-line display (3 rows).

```vue
<VPMonitorMulti :value="`x: ${pos.x}\ny: ${pos.y}`" label="Position" />
```

| Prop | Type | Description |
|---|---|---|
| `value` | `unknown` | Rendered verbatim. Use `\n` for line breaks. |
| `label` | `string` | |

---

### `VPGraph`

Sparkline chart. Pass a rolling array of numbers; the component normalises the range automatically.

```vue
<VPGraph :values="history" label="FPS" />
```

| Prop | Type | Description |
|---|---|---|
| `values` | `number[]` | **required** |
| `label` | `string` | |
| `min` | `number` | Auto from data. |
| `max` | `number` | Auto from data. |

---

### `VPLabel`

Layout primitive that pairs a label with any arbitrary content. Used internally by all inputs — available for custom components.

```vue
<VPLabel label="Custom">
  <MyWidget />
</VPLabel>
```

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Omit for full-width (no-label) layout. |

---

## Theming

Override the default dark theme by setting CSS custom properties on any ancestor element (or `:root`).

```css
.my-app {
  --vp-base-background-color:    #1e1e2e;
  --vp-container-foreground-color: #cdd6f4;
  --vp-input-background-color:   rgba(205, 214, 244, 0.06);
  --vp-blade-value-width:        180px;
  --vp-container-unit-size:      22px;
}
```

### Full variable reference

| Variable | Default | Description |
|---|---|---|
| `--vp-base-background-color` | `#28292e` | Pane background |
| `--vp-base-border-radius` | `6px` | Pane corner radius |
| `--vp-base-font-family` | `Roboto Mono, monospace` | Font stack |
| `--vp-base-shadow-color` | `rgba(0,0,0,0.2)` | Drop shadow |
| `--vp-blade-border-radius` | `2px` | Input element corner radius |
| `--vp-blade-horizontal-padding` | `4px` | Input horizontal padding |
| `--vp-blade-value-width` | `160px` | Width of the value column |
| `--vp-button-background-color` | `#adafb8` | Button fill |
| `--vp-button-foreground-color` | `#28292e` | Button text |
| `--vp-container-background-color` | `rgba(...)` | Folder/tab header fill |
| `--vp-container-foreground-color` | `#bbbcc4` | Folder/tab header text |
| `--vp-container-unit-size` | `20px` | Row height |
| `--vp-container-unit-spacing` | `4px` | Gap between rows |
| `--vp-container-vertical-padding` | `4px` | Folder content top/bottom padding |
| `--vp-input-background-color` | `rgba(...)` | Input fill |
| `--vp-input-foreground-color` | `#bbbcc4` | Input text |
| `--vp-label-foreground-color` | `rgba(...)` | Label text (slightly dimmed) |
| `--vp-monitor-background-color` | `rgba(...)` | Monitor/display fill |
| `--vp-monitor-foreground-color` | `rgba(...)` | Monitor text |
| `--vp-groove-foreground-color` | `rgba(...)` | Separator line colour |

---

## TypeScript

All components are typed. Named exports only — import what you need:

```ts
import type { } from 'vue-pane' // no public types beyond the components themselves
import { VPane, VPNumber, VPColor } from 'vue-pane'
```

---

## CSS class names

Classes follow BEM with a `vp-` prefix. Useful for targeted overrides:

```css
/* make all labels uppercase */
.vp-label__text { text-transform: uppercase; }

/* widen value column in one pane only */
#my-pane { --vp-blade-value-width: 200px; }
```

Global state classes applied automatically:

| Class | Description |
|---|---|
| `vp--disabled` | Pointer events off, element dimmed |
| `vp--hidden` | `display: none` |
| `vp--first` | First visible child in a container |
| `vp--last` | Last visible child |

---

## Monorepo

```
packages/vue-pane/   ← npm package
apps/example/        ← development example app
```

```sh
pnpm dev        # start the example app (resolves vue-pane from source, no build needed)
pnpm build      # build the package
```
