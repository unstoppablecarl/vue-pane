<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PSelect, PMonitor } from 'vue-pane'

const selectValue = ref('linear')
const selectOptions = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'bounce', label: 'Bounce' },
]

const codePSelect = `<script setup>
const mode = ref('linear')
const options = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease',   label: 'Ease' },
  { value: 'bounce', label: 'Bounce' },
]
<\/script>

<VPane title="Debug">
  <PSelect v-model="mode" label="Mode" :options="options" />
  <PMonitor :value="mode" label="Value" />
</VPane>`
</script>

<template>
  <section id="pselect">
    <h2><a href="#pselect">PSelect</a></h2>
    <p>A dropdown select for choosing one value from a list of options.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePSelect" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PSelect
              v-model="selectValue"
              label="Mode"
              :options="selectOptions"
            />
            <PMonitor
              :value="selectValue"
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
        <tr><td><code>v-model</code></td><td>string | number</td><td>Bound selected value.</td></tr>
        <tr><td><code>options</code></td><td><code>{ value, label }[]</code></td><td>Array of selectable options (required).</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
