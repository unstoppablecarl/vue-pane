<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PColor, PMonitor } from 'vue-pane'

const colorValue = ref('#ff5500')

const codePColor = `<script setup>
const color = ref('#ff5500')
<\/script>

<VPane title="Debug">
  <!-- Click the swatch to open the color picker -->
  <PColor v-model="color" label="Color" />
  <PMonitor :value="color" label="Hex" />
</VPane>`
</script>

<template>
  <section id="pcolor">
    <h2><a href="#pcolor">PColor</a></h2>
    <p>A color picker bound to a hex color string. Click the color swatch to open a floating picker popover.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePColor" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PColor
              v-model="colorValue"
              label="Color"
            />
            <PMonitor
              :value="colorValue"
              label="Hex"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>v-model</code></td><td>string</td><td>Hex color string, e.g. <code>#ff5500</code> or <code>#ff5500ff</code>.</td></tr>
        <tr><td><code>alpha</code></td><td>boolean</td><td>Show the alpha channel control in the picker.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
