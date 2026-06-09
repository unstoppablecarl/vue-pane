<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PPoint2d, PMonitor } from 'vue-pane'

const pointValue = ref({ x: 0, y: 0 })

const codePPoint2d = `<script setup>
const offset = ref({ x: 0, y: 0 })
<\/script>

<VPane title="Debug">
  <!-- Click the crosshair icon to open the canvas picker -->
  <PPoint2d v-model="offset" label="Offset" :min="-1" :max="1" />
</VPane>`
</script>

<template>
  <section id="ppoint2d">
    <h2><a href="#ppoint2d">PPoint2d</a></h2>
    <p>A 2D point picker. Shows inline X and Y number inputs, and an interactive canvas picker that expands inline.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePPoint2d" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PPoint2d
              v-model="pointValue"
              label="Offset"
              :min="-1"
              :max="1"
            />
            <PMonitor
              :value="`${pointValue.x.toFixed(2)}, ${pointValue.y.toFixed(2)}`"
              label="XY"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>v-model</code></td><td><code>{ x: number, y: number }</code></td><td>Bound point object.</td></tr>
        <tr><td><code>:poll</code></td><td>PollingRef&lt;{ x: number, y: number }&gt;</td><td>Alternative to <code>v-model</code> for polling a plain object property. See <a href="#polling">Polling</a>.</td></tr>
        <tr><td><code>min</code></td><td>number</td><td>Minimum for both axes.</td></tr>
        <tr><td><code>max</code></td><td>number</td><td>Maximum for both axes.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
