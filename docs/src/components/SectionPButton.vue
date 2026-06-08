<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PButton, PMonitor } from 'vue-pane'

const clickCount = ref(0)

const codePButton = `<script setup>
const clicks = ref(0)
<\/script>

<VPane title="Debug">
  <PButton label="Increment" @click="clicks++" />
  <PButton label="Reset" @click="clicks = 0" />
  <PMonitor :value="clicks" label="Clicks" />
</VPane>`
</script>

<template>
  <section id="pbutton">
    <h2><a href="#pbutton">PButton</a></h2>
    <p>A full-width button that emits a <code>click</code> event when pressed. Useful for triggering actions — reset, randomize, export, etc.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePButton" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PButton
              label="Increment"
              @click="clickCount++"
            />
            <PButton
              label="Reset"
              @click="clickCount = 0"
            />
            <PMonitor
              :value="clickCount"
              label="Clicks"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>label</code></td><td>string</td><td>Button text (required).</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
