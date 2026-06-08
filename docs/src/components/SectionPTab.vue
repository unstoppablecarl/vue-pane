<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PTab, PNumber, PCheckbox, PMonitor } from 'vue-pane'

const tabIndex = ref(0)
const tabCount = ref(0)
const tabEnabled = ref(true)

const codePTab = `<script setup>
const tab = ref(0)
<\/script>

<VPane title="Debug">
  <!-- Slot name must match the tab label exactly -->
  <PTab v-model="tab" :tabs="['Settings', 'Info']">
    <template #Settings>
      <PNumber v-model="count" label="Count" :min="0" :max="100" />
      <PCheckbox v-model="enabled" label="Enabled" />
    </template>
    <template #Info>
      <PMonitor :value="count" label="Count" />
      <PMonitor :value="enabled" label="Enabled" />
    </template>
  </PTab>
</VPane>`
</script>

<template>
  <section id="ptab">
    <h2><a href="#ptab">PTab</a></h2>
    <p>A tabbed panel container. Each tab's content is provided as a named slot whose name matches the tab label exactly.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePTab" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PTab
              v-model="tabIndex"
              :tabs="['Settings', 'Info']"
            >
              <template #Settings>
                <PNumber
                  v-model="tabCount"
                  label="Count"
                  :min="0"
                  :max="100"
                />
                <PCheckbox
                  v-model="tabEnabled"
                  label="Enabled"
                />
              </template>
              <template #Info>
                <PMonitor
                  :value="tabCount"
                  label="Count"
                />
                <PMonitor
                  :value="tabEnabled"
                  label="Enabled"
                />
              </template>
            </PTab>
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>v-model</code></td><td>number</td><td>Index of the active tab (default: 0).</td></tr>
        <tr><td><code>tabs</code></td><td>string[]</td><td>Tab labels (required). Each must match a named slot.</td></tr>
        <tr><td><code>tooltips</code></td><td>string[]</td><td>Tooltip for each tab button.</td></tr>
      </tbody>
    </table>
  </section>
</template>
