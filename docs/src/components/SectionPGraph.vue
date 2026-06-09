<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'
import { VPane, PGraph } from 'vue-pane'

const props = defineProps<{ graphValues: number[] }>()

const codePGraph = `<script setup>
// Shift new values in to keep a rolling window
const values = ref([10, 40, 20, 80])
setInterval(() => {
  values.value = [...values.value.slice(1), Math.random() * 100]
}, 300)
<\/script>

<VPane title="Debug">
  <PGraph :values="values" label="Signal" />
</VPane>`
</script>

<template>
  <section id="pgraph">
    <h2><a href="#pgraph">PGraph</a></h2>
    <p>A sparkline chart for an array of numbers. Push new samples into the array to create a rolling history graph.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePGraph" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PGraph
              :values="props.graphValues"
              label="Signal"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>:values</code></td><td>number[]</td><td>Array of data points to plot.</td></tr>
        <tr><td><code>:poll</code></td><td>PollingRef&lt;number&gt;</td><td>Alternative to <code>:values</code> — polls a single value and accumulates a rolling history internally. See <a href="#polling">Polling</a>.</td></tr>
        <tr><td><code>:history-length</code></td><td>number</td><td>Number of samples to keep when using <code>:poll</code> (default: <code>100</code>).</td></tr>
        <tr><td><code>min</code></td><td>number</td><td>Fixed y-axis minimum. Auto-computed from data if omitted.</td></tr>
        <tr><td><code>max</code></td><td>number</td><td>Fixed y-axis maximum. Auto-computed from data if omitted.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
