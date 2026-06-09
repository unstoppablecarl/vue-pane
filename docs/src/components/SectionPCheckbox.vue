<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PCheckbox, PMonitor } from 'vue-pane'

const checkboxValue = ref(true)

const codePCheckbox = `<VPane title="Debug">
  <PCheckbox v-model="enabled" label="Enabled" />
  <PMonitor :value="enabled" label="Value" />
</VPane>`
</script>

<template>
  <section id="pcheckbox">
    <h2><a href="#pcheckbox">PCheckbox</a></h2>
    <p>A checkbox input bound to a boolean value.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePCheckbox" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PCheckbox
              v-model="checkboxValue"
              label="Enabled"
            />
            <PMonitor
              :value="checkboxValue"
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
        <tr><td><code>v-model</code></td><td>boolean</td><td>Bound boolean value.</td></tr>
        <tr><td><code>:poll</code></td><td>PollingRef&lt;boolean&gt;</td><td>Alternative to <code>v-model</code> for polling a plain object property. See <a href="#polling">Polling</a>.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
