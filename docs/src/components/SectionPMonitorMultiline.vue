<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PMonitorMultiline } from 'vue-pane'

const props = defineProps<{ monitorVal: number }>()

const checkboxValue = ref(true)
const selectValue = ref('linear')

const codePMonitorMultiline = `<VPane title="Live">
  <PMonitorMultiline
    :value="\`x: \${x}\\ny: \${y}\\nz: \${z}\`"
    label="Position"
  />
</VPane>`
</script>

<template>
  <section id="pmonitor-multiline">
    <h2><a href="#pmonitor-multiline">PMonitorMultiline</a></h2>
    <p>A read-only scrollable textarea for multi-line text. Useful for logging structured output. Use <code>\n</code> to add line breaks.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePMonitorMultiline" />
        </div>
        <div class="demo__result">
          <VPane
            title="Live"
            style="width:240px"
          >
            <PMonitorMultiline
              :value="`signal: ${props.monitorVal.toFixed(2)}\nenabled: ${checkboxValue}\nmode: ${selectValue}`"
              label="State"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>:value</code></td><td>unknown</td><td>Reactive value to display. Converted to string via <code>String()</code>.</td></tr>
        <tr><td><code>:poll</code></td><td>PollingRef&lt;unknown&gt;</td><td>Alternative to <code>:value</code> for polling a plain object property. See <a href="#polling">Polling</a>.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
