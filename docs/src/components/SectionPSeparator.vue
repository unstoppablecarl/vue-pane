<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { VPane, PText, PNumber, PSeparator, PCheckbox } from 'vue-pane'

const textValue = ref('hello world')
const numberValue = ref(42)
const checkboxValue = ref(true)

const codePSeparator = `<VPane title="Debug">
  <PText v-model="name" label="Name" />
  <PSeparator />
  <PNumber v-model="count" label="Count" />
</VPane>`
</script>

<template>
  <section id="pseparator">
    <h2><a href="#pseparator">PSeparator</a></h2>
    <p>A visual horizontal rule for grouping controls without the overhead of a <code>PFolder</code>.</p>

    <div class="media">
      <div class="demo">
        <div class="demo__code">
          <CodeBlock :code="codePSeparator" />
        </div>
        <div class="demo__result">
          <VPane
            title="Debug"
            style="width:240px"
          >
            <PText
              v-model="textValue"
              label="Name"
            />
            <PSeparator />
            <PNumber
              v-model="numberValue"
              label="Count"
            />
            <PSeparator />
            <PCheckbox
              v-model="checkboxValue"
              label="Active"
            />
          </VPane>
        </div>
      </div>
    </div>
  </section>
</template>
