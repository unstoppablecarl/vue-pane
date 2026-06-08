<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PText, PMonitor } from 'vue-pane'

const textValue = ref('hello world')

const codePText = `<script setup>
const message = ref('hello world')
<\/script>

<VPane title="Debug">
  <PText v-model="message" label="Message" />
  <PMonitor :value="message" label="Live" />
</VPane>`
</script>

<template>
  <section id="ptext">
    <h2><a href="#ptext">PText</a></h2>
    <p>A text input bound to a string value via <code>v-model</code>.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePText" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PText
              v-model="textValue"
              label="Message"
            />
            <PMonitor
              :value="textValue"
              label="Live"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3>Props</h3>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code>v-model</code></td><td>string</td><td>Bound string value.</td></tr>
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
      </tbody>
    </table>
  </section>
</template>
