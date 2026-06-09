# vue-pane

Compact debug panel components for Vue 3. A spiritual replacement for [Tweakpane](https://tweakpane.github.io/docs/) — same visual style, Vue-native API.

**[Documentation](https://unstoppablecarl.github.io/vue-pane/)**

## Features

- Inputs: text, number (drag-to-change), slider, checkbox, select, color picker, 2D point
- Display: single-line monitor, multiline monitor, graph/sparkline
- Layout: collapsible pane, collapsible folders, tabs, separator
- Pane and folder state persisted to `localStorage` via the `id` prop
- Polling: `pollingRef` reads plain (non-reactive) JS objects on an interval — pauses automatically when the pane is collapsed

## Installation

```sh
npm install vue-pane
```

Import styles once in your app entry:

```ts
import 'vue-pane/dist/vue-pane.css'
```

### Nuxt / source-first bundlers

The package exposes a `"source"` export condition pointing at the raw `.vue` and `.scss` files. Bundlers that understand this condition (Nuxt, Vite with explicit `resolve.conditions: ['source']`) will process the source directly — no CSS import needed.

```ts
// vite.config.ts
export default defineConfig({
  resolve: { conditions: ['source'] },
})
```

## Quick start

```vue
<script setup>
import { ref } from 'vue'
import { VPane, PNumber, PCheckbox, PMonitor, pollingRef } from 'vue-pane'

const speed = ref(1)
const enabled = ref(true)
</script>

<template>
  <VPane title="Controls" style="width: 280px">
    <PNumber v-model="speed" label="Speed" :min="0" :max="10" :step="0.1" />
    <PCheckbox v-model="enabled" label="Enabled" />
    <PMonitor :value="speed" label="Speed" />
  </VPane>
</template>
```

## Development

```sh
pnpm dev        # start the example app (resolves vue-pane from source, no build needed)
pnpm build      # build the package
```
