<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PMonitor } from 'vue-pane'

const props = defineProps<{ monitorVal: number }>()

const checkboxValue = ref(true)
const selectValue = ref('linear')

const codePMonitor = `<!-- :value is reactive, not v-model — display only -->
<VPane title="Live">
  <PMonitor :value="signal.toFixed(2)" label="Signal" />
</VPane>`
</script>

<template>
  <section id="pmonitor">
    <h2><a href="#pmonitor">PMonitor</a></h2>
    <p>A read-only display for a single reactive value. Pass <code>:value</code> directly — there is no <code>v-model</code>.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePMonitor" />
        </div>
        <div class="demo__result">
          <VPane
            title="Live"
            style="width:240px"
          >
            <PMonitor
              :value="props.monitorVal.toFixed(2)"
              label="Signal"
            />
            <PMonitor
              :value="checkboxValue"
              label="Enabled"
            />
            <PMonitor
              :value="selectValue"
              label="Mode"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>:value</code></td><td>unknown</td><td>Reactive value to display. Not a <code>v-model</code>.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
