<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PSlider, PMonitor } from 'vue-pane'

const sliderValue = ref(0.5)

const codePSlider = `<!-- Explicit persistent track — use when the range
     should always be visible, not just while dragging -->
<VPane title="Debug">
  <PSlider v-model="volume" label="Volume"
    :min="0" :max="1" :step="0.01" />
</VPane>`
</script>

<template>
  <section id="pslider">
    <h2><a href="#pslider">PSlider</a></h2>
    <p>An explicit horizontal slider track. Unlike <code>PNumber</code>, the track is always visible rather than appearing only while dragging. Requires <code>min</code> and <code>max</code>.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePSlider" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PSlider
              v-model="sliderValue"
              label="Volume"
              :min="0"
              :max="1"
              :step="0.01"
            />
            <PMonitor
              :value="sliderValue.toFixed(2)"
              label="Value"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>v-model</code></td><td>number</td><td>Bound number value.</td></tr>
        <tr><td><code>:poll</code></td><td>PollingRef&lt;number&gt;</td><td>Alternative to <code>v-model</code> for polling a plain object property. See <a href="#polling">Polling</a>.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
        <tr><td><code>min</code></td><td>number</td><td>Minimum value (default: 0).</td></tr>
        <tr><td><code>max</code></td><td>number</td><td>Maximum value (default: 1).</td></tr>
        <tr><td><code>step</code></td><td>number | null</td><td>Step size.</td></tr>
      </tbody>
    </table>
  </section>
</template>
