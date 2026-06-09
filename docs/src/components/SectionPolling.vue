<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'

const codePollingRef = `import { pollingRef } from 'vue-pane'

// Polls renderer.fps every 100ms (default interval)
const fps = pollingRef(renderer, 'fps')

// Custom interval in ms
const drawCalls = pollingRef(renderer, 'drawCalls', 200)

// Composes with Vue reactivity like any other ref
const fpsRounded = computed(() => Math.round(fps.value))`

const codePollingComponents = `<script setup>
import { pollingRef } from 'vue-pane'

const fps      = pollingRef(renderer, 'fps')
const memory   = pollingRef(renderer, 'memory')
<\/script>

<template>
  <VPane title="Renderer">
    <!-- :poll is an alternative to v-model for plain-object sources -->
    <PNumber :poll="fps"    label="FPS"    :readonly="true" />
    <PNumber :poll="memory" label="Memory" :readonly="true" />
    <PGraph  :poll="fps"    label="FPS"    :history-length="60" />
  </VPane>
</template>`

const codeUsePolling = `import { pollingRef, usePolling } from 'vue-pane'

// Create the ref outside any component — e.g. in a store
const fps = pollingRef(renderer, 'fps')

// Inside a component setup that lives inside a VPane/PFolder:
usePolling(fps)

// Now use fps like any other ref
watch(fps, val => console.log('fps:', val))`
</script>

<template>
  <section id="polling">
    <h2><a href="#polling">Polling</a></h2>
    <p>
      vue-pane includes a polling system for displaying values from plain (non-reactive) JS objects —
      useful for game engine state, WebAssembly memory, or any object you don't control.
      The timer only runs while at least one consuming component is mounted and visible (all ancestor panes expanded).
    </p>

    <h3 id="polling-pollingref">
      <a href="#polling-pollingref">pollingRef</a>
    </h3>
    <p>
      Creates a reactive <code>Ref&lt;T&gt;</code> that polls an object property on an interval.
      It is a standard Vue ref and composes with <code>computed</code>, <code>watch</code>, and any other reactive API.
    </p>
    <div class="media">
      <div class="code-block">
        <CodeBlock
          :code="codePollingRef"
          lang="typescript"
        />
      </div>
    </div>
    <table>
      <thead><tr><th>Parameter</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>obj</code></td><td>object</td><td>The plain object to read from.</td></tr>
        <tr><td><code>key</code></td><td>keyof obj</td><td>The property key to poll. Type-checked against <code>obj</code>.</td></tr>
        <tr><td><code>interval</code></td><td>number</td><td>Poll interval in ms (default: <code>100</code>).</td></tr>
      </tbody>
    </table>

    <h3 id="polling-components">
      <a href="#polling-components">Using with components</a>
    </h3>
    <p>
      All input and display components accept an optional <code>:poll</code> prop as an alternative to <code>v-model</code>.
      The component manages subscribe and unsubscribe automatically based on mount state and pane visibility.
      Multiple components can share the same <code>pollingRef</code> — they share a single timer.
    </p>
    <div class="media">
      <div class="code-block">
        <CodeBlock :code="codePollingComponents" />
      </div>
    </div>

    <h3 id="polling-usepolling">
      <a href="#polling-usepolling">usePolling</a>
    </h3>
    <p>
      Connects a <code>pollingRef</code> to pane visibility manually — useful when you want to use the ref
      in a <code>watch</code> or <code>computed</code> rather than passing it to a component.
      Call inside a component that is a descendant of a <code>VPane</code> or <code>PFolder</code>.
    </p>
    <div class="media">
      <div class="code-block">
        <CodeBlock
          :code="codeUsePolling"
          lang="typescript"
        />
      </div>
    </div>
  </section>
</template>
