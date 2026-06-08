<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PNumber } from 'vue-pane'

const numberBasic = ref(42)
const numberRange = ref(50)
const numberStep = ref(0.5)

const codePNumber = `<VPane title="Debug">
  <!-- Drag the label to scrub, click to type -->
  <PNumber v-model="count" label="Count" />
</VPane>`

const codePNumberRange = `<!-- min + max constrains value and adds a range indicator -->
<VPane title="Debug">
  <PNumber v-model="speed" label="Speed" :min="0" :max="100" />
</VPane>`

const codePNumberStep = `<VPane title="Debug">
  <PNumber v-model="amount" label="Amount" :step="0.1" />
</VPane>`
</script>

<template>
  <section id="pnumber">
    <h2><a href="#pnumber">PNumber</a></h2>
    <p>A number input. Drag the label to scrub, or click to type a value directly.</p>

    <h3 id="pnumber-basic">
      <a href="#pnumber-basic">Basic</a>
    </h3>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePNumber" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PNumber
              v-model="numberBasic"
              label="Count"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3 id="pnumber-range">
      <a href="#pnumber-range">Range</a>
    </h3>
    <p>Adding <code>min</code> and <code>max</code> constrains the value and adds a progress indicator.</p>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePNumberRange" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PNumber
              v-model="numberRange"
              label="Speed"
              :min="0"
              :max="100"
            />
          </VPane>
        </div>
      </div>
    </div>

    <h3 id="pnumber-step">
      <a href="#pnumber-step">Step</a>
    </h3>
    <p><code>step</code> sets the increment size used when scrubbing.</p>
    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePNumberStep" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PNumber
              v-model="numberStep"
              label="Amount"
              :step="0.1"
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
        <tr><td><code>label</code></td><td>string</td><td>Row label.</td></tr>
        <tr><td><code>tooltip</code></td><td>string</td><td>Tooltip on hover.</td></tr>
        <tr><td><code>min</code></td><td>number</td><td>Minimum allowed value.</td></tr>
        <tr><td><code>max</code></td><td>number</td><td>Maximum allowed value.</td></tr>
        <tr><td><code>step</code></td><td>number</td><td>Increment size for scrubbing and arrow keys.</td></tr>
      </tbody>
    </table>
  </section>
</template>
